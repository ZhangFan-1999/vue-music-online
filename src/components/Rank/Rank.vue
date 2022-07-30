<template>
  <div class="rank">
    <div
      @click="selectItem(item.id)"
      class="item"
      v-for="item of list"
      :key="item.id"
    >
      <div class="img">
        <img v-lazy="item.coverImgUrl" alt="" srcset="" />
      </div>
      <div class="info">
        <div class="name">{{ item.name }}</div>
        <div class="des">{{ item.updateFrequency }}</div>
      </div>
    </div>
    <van-loading type="spinner" vertical v-if="flag">加载中</van-loading>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getTopList } from "@/api/index";
export default {
  data() {
    return {
      list: [],
      flag: true,
    };
  },
  methods: {
    // 获取排行榜数据
    _getTopList() {
      getTopList().then((res) => {
        if (res.status == 200) {
          this.list = res.data.list;
          this.flag = false;
        }
      });
    },
    //
    selectItem(id) {
      this.$router.push(`/toplist/${id}`);
    },
  },
  created() {
    this._getTopList();
  },
};
</script>
<style scoped>
.van-loading {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.rank {
  position: fixed;
  top: 88px;
  bottom: 70px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
.item {
  width: 100%;
  display: flex;
  height: 107px;
  padding: 20px;
  box-sizing: border-box;
}
.img img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.info {
  flex: 4;
}
.img {
  flex: 1;
}
.name {
  width: 100%;
  font-size: 15px;
  color: #fff;
  margin-left: 20px;
  margin-top: 10px;
}
.des {
  font-size: 12px;
  width: 100%;
  color: #636363;
  margin-left: 20px;
  margin-top: 10px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>