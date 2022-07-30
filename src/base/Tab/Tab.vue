<template>
  <div class="tab">
    <router-link tag="div" class="tab_item" to="/recommend">
      <span class="text">推荐</span>
    </router-link>
    <router-link tag="div" class="tab_item" to="/rank">
      <span class="text">排行</span>
    </router-link>
    <router-link tag="div" class="tab_item" to="/search">
      <span class="text">搜索</span>
    </router-link>
    <router-link tag="div" class="tab_item" to="/favorite">
      <span class="text">我的收藏</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.tab {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  display: flex;
  background-color: #222;
}
.tab_item {
  flex: 1;
  text-align: center;
  color: #8f8f8f;
}

.text {
  padding-bottom: 5px;
}
.router-link-active .text {
  color: #ffcd32;
  border-bottom: 2px solid #ffcd32;
}
</style>