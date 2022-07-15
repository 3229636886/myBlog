<template>
  <div id="show-blogs">
    <el-card class="left-card">
      <p>一个自学前端的小菜鸡,立志成为一个什么都学，什么都不会的大菜鸡。--liouyang25<br>
        爱好: 喜欢打游戏，刷短视频，听音乐，吃饭，睡觉......<br>
        个性签名: 积水成渊，蛟龙生焉。--《劝学》
      </p>
    </el-card>
    <el-card class="show-blogs-card">
      <h1 class="page-title">博客总览</h1>
      <el-input placeholder="请输入内容" v-model="queryInfo.search" class="input-with-select" clearable @clear="getBlogs"
                @keydown.enter.native="getBlogs">
        <el-button slot="append" icon="el-icon-search" @click="searchByKey">点击搜索</el-button>
      </el-input>
      <el-card class="single-blog" v-for="blog in blogs.data" :key="blog.id" shadow="hover" v-show="!isEmpty">
        <p class="blog-title" v-rainbow @click="linkToSingleBlog(blog.id)">{{ blog.title }}</p>
        <p class="blog-intro">{{ blog.intro }}</p>
        <el-tag class="blog-category" type="info" v-for="(category,index) in  blog.categories.split(',') " :key="index"
                size="mini">
          {{ category }}
        </el-tag>
        <el-divider content-position="right">{{ blog.createTime }}</el-divider>
      </el-card>
      <el-empty description="暂无数据" v-if="isEmpty"></el-empty>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNumber"
          :page-sizes="[6, 10, 15, 30]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="blogs.total"
          background>
      </el-pagination>
    </el-card>
    <el-card class="right-card">
      <el-calendar v-model="date"></el-calendar>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ShowBlogs",
  data() {
    return {
      /**
       * 保存获取到的博客信息
       */
      blogs: {},
      /**
       * 请求信息
       */
      queryInfo: {
        search: '',
        pageNumber: 1,
        pageSize: 6,
      },
      /**
       * 请求数据是否为空
       */
      isEmpty: false,
      /**
       * 日历组件日期
       */
      date: new Date()
    }
  },
  created() {
    /**
     * 调用获取博客函数
     */
    this.getBlogs()
  },
  methods: {
    /**
     * 获取博客
     * @returns {Promise<void>}
     */
    async getBlogs() {
      const {data: res} = await this.$get("/blog/getBlogs", this.queryInfo)
      if (res.status !== 200) {
        this.$message.warning(`获取数据失败: ${res.msg}`)
        this.isEmpty = true
      } else {
        this.isEmpty = false
        this.blogs = res
      }
    },
    /**
     * 根据 id 获取单个博客信息
     * @param id
     */
    linkToSingleBlog(id) {
      this.$router.push(`/blog/${id}`)
    },
    /**
     * pageSize 改变时会触发
     * @param newSize
     */
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getBlogs()
    },
    /**
     * currentPage 改变时会触发
     * @param newPage
     */
    handleCurrentChange(newPage) {
      this.queryInfo.pageNumber = newPage
      this.getBlogs()
    },
    /**
     * 通过关键词搜索相关博客
     */
    searchByKey() {
      this.getBlogs()
    }
  }
}
</script>

<style scoped>
#show-blogs {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.show-blogs-card {
  width: 744px;
  min-width: 744px;
  margin: 30px 15px;
}

.left-card,
.right-card {
  margin-top: 30px;
  width: 342px;
  min-width: 342px;
}

.page-title {
  margin: 30px auto 20px;
  color: #409eff;
}

.single-blog {
  box-sizing: border-box;
  margin: 20px 0;
  padding: 16px;
}

.blog-title {
  display: inline-flex;
  font-size: 26px;
  margin-bottom: 20px;
  cursor: pointer;
}

.blog-title:hover {
  text-shadow: 0 0 1px #eee;
  overflow: hidden;
  text-decoration-line: underline;
}

.blog-intro {
  padding-bottom: 10px;
}

:deep(.el-divider--horizontal) {
  margin: 24px 0 0;
}

:deep(.el-pagination) {
  text-align: center;
  margin-top: 50px;
  padding-bottom: 80px;
}

.blog-category {
  margin-right: 10px;
}

:deep(.el-calendar__body) {
  padding: 0 20px 35px;
}

:deep(.el-calendar__header) {
  padding: 6px 20px;
}

:deep(.el-calendar__title) {
  font-size: 12px;
}

:deep(.el-button.el-button--plain.el-button--mini) {
  padding: 7px 10px;
}

:deep(.el-calendar-table thead th) {
  padding: 0 0 12px;
  text-align: center;
  background-color: #fff;
  border: none;
}

:deep(.el-calendar-table td) {
  padding: 0;
  background-color: #fff;
}

:deep(.el-calendar-table td.is-selected) {
  background-color: #F2F8FE;
}

:deep(.el-calendar-table .el-calendar-day) {
  height: 36px;
}
</style>