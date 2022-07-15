<template>
  <div id="blog-header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router
             text-color="#409eff"
             active-text-color="#ffd04b">
      <el-menu-item index="/">博客</el-menu-item>
      <el-menu-item index="/addBlog">写博客</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "BlogHeader",
  data() {
    return {
      activeIndex: '/'
    }
  },
  watch: {
    $route() {
      this.activeIndex = this.$route.path
    }
  }
}
</script>

<style scoped>
#blog-header {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  z-index: 999;
}

.el-menu-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

:deep(.el-menu-item) {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 2px;
}
</style>