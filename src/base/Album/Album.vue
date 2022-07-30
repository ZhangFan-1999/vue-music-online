<template>
  <div class="songlist">
    <div class="header">
      <div class="back" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">{{ songList.name }}</div>
      <div class="opt">
        <van-icon name="ellipsis" />
      </div>
    </div>
    <div class="content">
      <div class="album_img">
        <img :src="songList.coverImgUrl" alt="" srcset="" />
      </div>
      <div class="filter">
        <span class="playIcon" @click="playlist" v-if="songList.coverImgUrl">
          点击开始播放
        </span>
      </div>
      <div class="list">
        <div
          class="item"
          @click="playSong(item, index)"
          v-for="(item, index) of songList.tracks"
          :key="index"
        >
          <p class="songName">{{ item.name }}</p>
          <p class="songAr">
            <span class="icon">SQ</span>{{ item.ar[0].name }}
          </p>
        </div>
      </div>
    </div>
    <slot></slot>
    <van-loading type="spinner" vertical v-if="flag">加载中</van-loading>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { getSongUrl } from "@/api/index.js";
export default {
  data() {
    return {
      flag: false,
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["playing", "playList","favoriteAlbum"]),
  },
  props: {
    songList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPlaying",
      "setCurrentSong",
      "setCurrentSongInfo",
      "setPlayList",
      "setCurrentSongIndex",
      "setPlayMode",
      "setFavoriteAlbum",
      "delFavoriteAlbum"
    ]),
    // 点击播放歌单 默认从第一个开始播放
    playlist() {
      // 播放歌单默认是按照顺序播放
      this.setPlayMode(0);
      this.flag = true;
      getSongUrl(this.songList.tracks[0].id).then((res) => {
        if (res.status == 200) {
          this.flag = false;
          this.setCurrentSong(res.data.data[0]);
          this.setPlaying(true);
          this.setPlayList(this.songList.tracks);
          this.setCurrentSongIndex(0);
        }
      });
      // player组件需要用到currentinfo，
      // 但是这样处理可以少一次请求
      // 而不是再去发送一次获取songInfo的请求
      this.setCurrentSongInfo(this.songList.tracks[0]);
    },
    // 点击播放指定歌曲
    playSong(song, index) {
      this.setPlaying(false)
      this.flag = true;
      // 每次重复点击同一首歌时就从头开始播放
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
          this.setPlayList(this.songList.tracks);
          this.setCurrentSongIndex(index);
          this.flag = false;
        }
      });
      // 歌曲的相关信息
      this.setCurrentSongInfo(this.songList.tracks[index]);
    },
    // 返回
    back() {
      this.$router.back();
    },
  },
  created() {
  },
};
</script>
<style scoped>
.noLiked {
  font-size: 25px;
  color: #8f8f8f;
}
.liked {
  font-size: 25px !important;
  color: #e5404f !important;
}
.van-loading {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.icon {
  border: #ffcd32 1px solid;
  color: #ffcd32;
  padding: 1px 3px;
  margin-right: 5px;
  border-radius: 3px;
}
.playIcon {
  color: #ffcd32;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ffcd32;
  border-radius: 16px;
  padding: 6px 10px;
  font-size: 14px;
}
.songlist {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #222;
  width: 100%;
  overflow-y: scroll;
}
.content {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 70px;
  overflow-y: scroll;
  width: 100%;
}
.filter {
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0px;
  left: 0;
  background-color: rgba(7, 17, 27, 0.4);
}
.album_img {
  overflow: hidden;
  width: 100%;
  height: 200px;
  position: relative;
}
.album_img img {
  width: 100%;
  position: absolute;
  top: -90px;
}
.header {
  width: 100%;
  height: 50px;
  display: flex;
  color: #fff;
  z-index: 10;
  position: fixed;
  top: 0;
  background: rgba(7, 17, 27, 0.4);
  line-height: 50px;
}
.back {
  flex: 1;
  text-align: center;
  font-size: 20px;
}
.title {
  flex: 4;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.opt {
  flex: 1;
  text-align: center;
  font-size: 25px;
}
.van-loading {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.list .item {
  height: 64px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 30px 10px 30px;
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
</style>
