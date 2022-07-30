<template>
  <div class="favorite">
    <!-- 收藏的歌曲 -->
    <div class="songList">
      <div class="list">
        <div class="item" 
          v-for="(item,index) of this.favoriteSong"
          @click="playSong(item, index)"
          :key="index"
          >
          <p class="songName">{{item.al.name}}</p>
          <p class="songAr"><span class="icon">SQ</span>{{item.ar[0].name}}</p>
        </div>
      </div>
      <p class="info" v-if="!this.favoriteSong.length">收藏列表为空！</p>
    </div>
    <van-loading type="spinner" vertical v-if="loading">加载中</van-loading>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { getSongUrl, getListInfo } from "@/api/index.js";
export default {
  data() {
    return {

      loading:false
    };
  },
  computed:{
    ...mapGetters(["favoriteSong","favoriteAlbum"]),
  },
  methods: {
    ...mapActions([
      "setPlaying",
      "setCurrentSong",
      "setCurrentSongInfo",
      "setPlayList",
      "setCurrentSongIndex",
      "setPlayMode",
    ]),
     // 点击歌单跳转页面
    selectItem(id) {
      this.$router.push(`/recommendlist/${id}`);
    },
    // 点击播放
    playSong(song, index) {
      console.log("123");
      this.loading=true
      // 每次在点击歌曲列表的一首歌时就重置当前播放器的状态
      // 也就是从头开始播放
      this.setPlaying(false)
      this.setCurrentSong({})
      this.setCurrentSongInfo({})
      
      getSongUrl(song.id).then((res) => {
        if (res.status == 200) {
          this.setCurrentSong(res.data.data[0]);
          // 设置播放器的状态
          this.setPlaying(true);
          this.setPlayList(this.favoriteSong);
          this.setCurrentSongIndex(index);
          this.loading=false
        }
      });
      // 歌曲的相关信息
      this.setCurrentSongInfo(this.favoriteSong[index]);
    },
    getSongs() {
      this.flag = true;
    },
    getList() {
      this.flag = false;
    },
    // 收藏的切换
    toggleSong() {
      if (this.flag) {
        return "songs active";
      } else {
        return "songs";
      }
    },
    toggleLists() {
      if (!this.flag) {
        return "lists active";
      } else {
        return "lists";
      }
    },
  },
};
</script>
<style scoped>
.info{
  position: absolute;
  width: 100%;
  top: 100px;
  color: #636363;
  text-align: center;
}
.van-loading {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.album ul {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.album {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.album li {
  text-align: center;
  display: flex;
  height: 64px;
  width: 100%;
  margin: 10px;
  overflow: hidden;
}
.albumImg {
  flex: 1;
  margin-right: 10px;
}
.albumImg img {
  width: 80%;
  height: 90%;
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
  width: 100%;
}
.albumDes {
  color: #636363;
  font-size: 12px;
  margin-top: 10px;
}
.list {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.list .item {
  height: 64px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 30px 10px 30px;
}
.icon {
  border: #ffcd32 1px solid;
  color: #ffcd32;
  padding: 1px 3px;
  margin-right: 5px;
  border-radius: 3px;
}
.songName {
  color: #fff;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.songAr {
  color: #636363;
  font-size: 10px;
  margin-top: 6px;
}
.songList {
  position: absolute;
  width: 100%;
  top: 22px;
  bottom: 0;
  overflow-y: scroll;
}
.albumList {
  position: absolute;
  top: 22px;
  width: 100%;
  bottom: 0;
  overflow-y: scroll;
}
.favorite {
  position: absolute;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 70px;
}
.active {
  color: #ffcd32 !important;
}
.switch {
  width: 100%;
  display: flex;
}
.songs {
  flex: 1;
  color: #fff;
  text-align: center;
}
.lists {
  flex: 1;
  color: #fff;
  text-align: center;
}
.switch-wrap {
  width: 100%;
  height: 40px;
}
.v-enter-active {
  transition: all 0.4s ease;
}
.v-enter,
.v-leave-to {
  transform: translateX(20%);
  opacity: 0;
}
</style>
