<template>
  <div id="app">
    <el-container>
      <el-header>
        <BlogHeader></BlogHeader>
      </el-header>
      <el-main class="el-main ">
        <router-view></router-view>
        <el-backtop target=".el-main" :bottom="80" :visibility-height="500">
          <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">
            UP
          </div>
        </el-backtop>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BlogHeader from "@/components/BlogHeader"

export default {
  name: 'App',
  components: {BlogHeader}
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100vh;
}

:deep(.el-header),
.el-main {
  margin: 0;
  padding: 0;
}

.el-main {
  width: 100vw;
  height: calc(100vh - 60px);
  background-color: #F3F5FB;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ccc;
}
</style>