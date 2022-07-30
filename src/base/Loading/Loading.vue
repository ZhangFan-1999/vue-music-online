<template>
  <div class="loading">
    <div class="loading-content">
      <img width="30" height="30" src="./loading.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      title: "加载中...",
    };
  },
  methods: {
    setTitle(title) {
      this.title = title;
    },
  },
};
</script>

<style scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-content {
  text-align: center;
}

.desc {
  line-height: 20px;
  font-size: 12px;
  color: #fff;
}
</style>
