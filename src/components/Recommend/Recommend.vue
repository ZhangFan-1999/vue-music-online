<template>
  <div class="recommend" ref="wrapper">
    <div class="content">
      <van-swipe
        class="swipe"
        :height="140"
        :autoplay="5000"
        indicator-color="white"
      >
        <van-swipe-item v-for="(item, index) of banners" :key="index">
          <img v-lazy="item.imageUrl" alt="" />
        </van-swipe-item>
      </van-swipe>
      <h1 class="title" v-if="!flag">热门歌单推荐</h1>
      <div class="album">
        <ul>
          <li
            @click="selectItem(item.id)"
            v-for="(item, index) of album"
            :key="index"
          >
            <div class="albumImg">
              <img v-lazy="item.picUrl" alt="" srcset="" />
            </div>
            <div class="albumInfo">
              <p class="albumName">{{ item.name }}</p>
              <p class="albumDes">热门推荐</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <van-loading type="spinner" v-if="flag" />
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template> 
<script>
import { getBanners, getSongList } from "@/api/index";
export default {
  data() {
    return {
      flag: true,
      banners: [],
      album: [],
    };
  },
  mounted() {},

  methods: {
    // 获取轮播图数据
    _getBanners() {
      getBanners().then((res) => {
        if (res.status == 200) {
          this.banners = res.data.banners.splice(1, 6);
          this.flag = false;
        }
      });
    },
    // 获取歌单数据
    _getSongList() {
      getSongList().then((res) => {
        if (res.status == 200) {
          this.album = res.data.result;
          this.flag = false;
        }
      });
    },
    // 点击歌单跳转页面
    selectItem(id) {
      this.$router.push(`/recommendlist/${id}`);
    },
  },
  created() {
    this._getBanners();
    this._getSongList();
  },
};
</script>
<style scoped>
.recommend {
  position: fixed;
  top: 88px;
  bottom: 70px;
  width: 100%;
  overflow-y: scroll;
}
.van-loading {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.content {
  width: 100%;
  z-index: 10;
  transition: all 0.3s;
}
.swipe img {
  width: 100%;
  height: 100%;
}
.title {
  height: 65px;
  line-height: 65px;
  text-align: center;
  color: #ffcd32;
  font-size: 14px;
  font-weight: normal;
}
.album li {
  height: 85px;
  text-align: center;
  margin: 0 20px 20px 20px;
  display: flex;
  overflow: hidden;
}
.albumImg {
  flex: 1.5;
  margin-right: 10px;
}
.albumImg img {
  width: 80%;
  height: 80%;
  border-radius: 10px;
}
.albumInfo {
  flex: 4;
  display: flex;
  flex-direction: column;
}

.albumName {
  overflow: hidden;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.albumInfo p {
  text-align: left;
}
.albumDes {
  color: #636363;
  font-size: 14px;
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
.van-loading {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>