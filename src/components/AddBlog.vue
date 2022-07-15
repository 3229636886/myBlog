<template>
  <div id="add-blog">
    <!--添加博客页面-->
    <el-card v-if="!submitSuccess" id="add-blog-card">
      <h1 class="page-title">添加博客</h1>
      <el-form ref="formRef" :model="formData" label-position="top" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="formData.title" placeholder="请输入标题" maxlength="50" show-word-limit
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="intro">
          <el-input type="text" v-model="formData.intro" placeholder="请进行简要描述" maxlength="100" show-word-limit
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="formData.content" style="min-height: 600px" @save="saveContent" ref="editorRef"
                        @imgAdd="imgAdd" @imgDel="imdDel"/>
        </el-form-item>
        <el-form-item prop="categories" label="分类">
          <el-tag :key="tag" v-for="tag in formData.categories" closable :disable-transitions="false"
                  @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="TagInputRef"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-select v-model="formData.author" placeholder="请选择">
            <el-option
                v-for="item in authors"
                :key="item.id"
                :label="item.author"
                :value="item.author">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--添加成功后用于显示博客信息-->
    <el-card id="preview-blog-card" v-if="submitSuccess">
      <el-descriptions title="博客总览" :column="1" direction="vertical">
        <el-descriptions-item label="博客标题">
          <p>{{ formData.title }}</p>
        </el-descriptions-item>
        <el-descriptions-item label="博客内容">
          <div v-html="previewContent" v-highlight></div>
        </el-descriptions-item>
        <el-descriptions-item label="博客分类">
          <el-tag v-for="(category, index) in formData.categories" :key="index" size="small" type="success"
                  effect="dark">
            {{ category }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="博客作者">
          <p>{{ formData.author }}</p>
        </el-descriptions-item>
      </el-descriptions>
      <el-divider content-position="right">{{ formData.createTime }}</el-divider>
      <el-button type="primary" @click="cancel">返回</el-button>
    </el-card>
  </div>
</template>

<script>
// 引入 Typora 导出的 css 样式
import '@/assets/css/blog.css'
import {marked} from 'marked'

export default {
  name: "AddBlog",
  data() {
    return {
      /**
       * 需要提交的数据
       */
      formData: {
        title: '',
        content: '',
        categories: [],
        author: '',
        createTime: '',
        intro: ''
      },
      /**
       * 表单的验证规则
       */
      rules: {
        title: [
          {required: true, message: '文章标题不能为空', trigger: 'blur'}
        ],
        intro: [
          {required: true, message: '描述不能为空', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '内容不能为空', trigger: 'blur'}
        ],
        categories: [
          {type: 'array', required: true, message: '请至少添加一个分类', trigger: 'blur'}
        ],
        author: [
          {required: true, message: '请选择一个作者签名', trigger: 'change'}
        ]
      },
      /**
       * 获取到的作者列表
       */
      authors: [],
      /**
       * 是否提交成功
       */
      submitSuccess: false,
      /**
       * 预览的内容
       */
      previewContent: '',
      /**
       * 显示分类输入框
       */
      inputVisible: false,
      /**
       * 分类输入框的内容
       */
      inputValue: '',
      /**
       * 保存上传图片名字的对象
       */
      images: {},
      /**
       * mavon-editor 内容是否保存
       */
      isSave: false
    }
  },
  created() {
    this.getAuthors()
  },
  methods: {
    /**
     * 提交博客表单
     */
    onSubmit() {
      if (!this.isSave) return this.$message.warning('请先保存博客内容!')
      this.formData.createTime = this.$formateDate()
      this.$refs.formRef.validate(async valid => {
        if (!valid) return this.$message.warning('请完整填写表单!')
        const {data: res} = await this.$post("/blog/addBlog", this.formData)
        if (res.status !== 201) return this.$message.error('添加博客失败!')
        this.$message.success(res.msg)
        this.previewContent = marked(this.formData.content)
        this.submitSuccess = !this.submitSuccess
      })
    },
    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.formRef.resetFields()
    },
    /**
     * 提交成功后返回按钮
     */
    cancel() {
      this.$router.replace('/')
    },
    /**
     * 获取作者
     * @returns {Promise<ElMessageComponent>}
     */
    async getAuthors() {
      const {data: res} = await this.$get('/author/getAuthors')
      if (res.status !== 200) return this.$message.error('获取作者列表信息失败!')
      this.authors = res.data
    },
    /**
     * mavon-editor 保存事件(统一上传图片) 有问题
     */
    async saveContent() {
      this.isSave = true
      this.$message.success('内容保存成功!')
      //   const formData = new FormData()
      //   for (const _img in this.images) {
      //     formData.append(_img, this.images[_img])
      //   }
      //   const {data: res} = await this.$post('/blog/imgs', formData)
      //   if (res.status !== 201) return this.$message.error(res.msg)
      //   this.$message.success(res.msg)
      //   for (const img of res.data) {
      //     // 这里会报错, 所以使用单个图片上传
      //     this.$refs.editorRef.$img2Url(img.pos, img.url)
      //   }
      //   // 将 mavon-editor 中的内容格式化显示在 preview 中
      //   this.previewContent = marked(this.formData.content)
    },
    /**
     * 点击添加按钮显示 Tag 输入框
     */
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.TagInputRef.$refs.input.focus()
      })
    },
    /**
     * 添加分类输入框的的确认事件
     */
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.formData.categories.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    /**
     * 删除分类
     * @param tag
     */
    handleClose(tag) {
      this.formData.categories.splice(this.formData.categories.indexOf(tag), 1)
    },
    /**
     * 添加图片事件
     * @param pos
     * @param file
     * @returns {Promise<ElMessageComponent>}
     */
    async imgAdd(pos, file) {
      const formData = new FormData()
      formData.append('image', file)
      const {data: res} = await this.$post('/blog/img', formData)
      if (res.status !== 201) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.$refs.editorRef.$img2Url(pos, res.url)
      this.images[res.url] = res.name
    },
    /**
     * 删除图片事件
     * @param filename
     * @returns {Promise<ElMessageComponent>}
     */
    async imdDel(filename) {
      const {data: res} = await this.$del(`/blog/img/del/${this.images[filename[0]]}`)
      if (res.status !== 202) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      delete this.images[filename[0]]
    }
  }
}
</script>

<style scoped>
#add-blog-card,
#preview-blog-card {
  max-width: 960px;
  margin: 30px auto;
}

.page-title {
  margin: 30px auto 20px;
  color: #409eff;
}

.page-title {
  margin: 10px 0 20px;
  color: #409eff;
}

:deep(.el-form-item__label) {
  height: 40px;
}

:deep(.el-descriptions__title) {
  font-size: 24px;
  color: #409eff;
}

:deep(.el-descriptions :not(.is-bordered) .el-descriptions-item__cell) {
  font-size: 18px;
}

:deep(.el-descriptions :not(.is-bordered) .el-descriptions-item__cell) p {
  font-size: 14px;
  padding-bottom: 20px;
  margin-left: 20px;
}

/* 分类标签 */
.el-tag,
.button-new-tag,
.input-new-tag {
  margin: 0 0 10px 20px;
}

.input-new-tag {
  width: 90px;
}
</style>