<template>
  <el-card id="single-blog">
    <el-row>
      <el-col :span="2">
        <el-button icon="el-icon-arrow-left" @click="$router.go(-1)" type="primary" plain></el-button>
      </el-col>
      <el-col :span="20">
        <h1 class="page-title">{{ blog.title }}</h1>
      </el-col>
    </el-row>
    <el-divider content-position="right">{{ blog.author }}</el-divider>
    <div v-html="blog.content" v-highlight></div>
    <el-divider content-position="right">{{ blog.createTime }}</el-divider>
    <!--    <el-button type="primary" icon="el-icon-edit">编辑</el-button>-->
        <el-button @click="deleteBlogById">删除</el-button>
  </el-card>
</template>

<script>
// 引入 Typora 导出的 css 样式
import '@/assets/css/blog.css'
import {marked} from 'marked'

export default {
  name: "SingleBlog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    }
  },
  created() {
    this.getBlogById()
  },
  methods: {
    /**
     * 根据 id 获取博客信息
     * @returns {Promise<ElMessageComponent>}
     */
    async getBlogById() {
      const {data: res} = await this.$get(`/blog/${this.id}`)
      if (res.status !== 200) return this.$message.error('博客信息获取失败!')
      this.blog = res.data
      this.blog.content = await marked(res.data.content)
    },
    /**
     *
     * @returns {Promise<ElMessageComponent>}
     */
    async deleteBlogById() {
      const {data: res} = await this.$del(`/blog/del/${this.id}`)
      if (res.status !== 200) return this.$message.error('删除博客失败!')
      this.$message.success('删除博客成功!')
      setTimeout(() => {
        this.$router.replace('/')
      }, 1000)
    }
  }
}
</script>

<style scoped>
#single-blog {
  max-width: 960px;
  margin: 30px auto;
}

.page-title {
  text-align: center;
  border-bottom: none;
  margin: 0;
  color: #515151;
  font-weight: bold;
  font-size: 30px;
}

.el-divider--horizontal {
  margin-bottom: 50px;
}
</style>