<template>
  <div class="playBox">
    <transition>
      <div class="m_player" v-show="!full">
        <div class="songImg" @click="toFull">
          <div class="imgBox">
            <!-- 默认图片 -->
            <img
              v-if="!currentSongInfo.id"
              @click="toFull"
              src="../../assets/logo.png"
              alt=""
              srcset=""
            />
            <!-- 真实歌曲图片 -->
            <img
              v-if="currentSongInfo.id"
              :src="currentSongInfo.al.picUrl + '?param=100y100'"
              alt=""
              srcset=""
            />
          </div>
        </div>
        <div class="songInfo" @click="toFull">
          <p class="noSong" v-if="!currentSong.id">单击可查看歌词</p>
          <p class="songName" v-if="currentSong.id">
            {{ currentSongInfo.name }}
          </p>
          <p class="artist" v-if="currentSongInfo.id">
            {{ currentSongInfo.ar[0].name }}
          </p>
        </div>
        <div class="opts">
          <div @click="handleClick" :class="togglePlay()"></div>
        </div>
        <div class="list" @click="showPop">
          <span class="iconfont icon-liebiao"></span>
        </div>
      </div>
    </transition>
    <!-- 全屏展示 -->
    <transition>
      <div class="f_player" v-if="full">
        <div class="f_header">
          <span @click="toMini" class="iconfont icon-xiangxia2"></span>
          <span class="f_name"></span>
          <span class="f_opts"></span>
        </div>
        <p class="f_name">{{ currentSongInfo.name }}</p>
        <p class="f_ar">{{ currentSongInfo.ar[0].name }}</p>
        <!-- 歌词部分 -->
        <div class="lyric">
          <ul class="scrollul">
            <li ref="lyricLine" class="lyricLine" v-for="(item,index) of this.lyric.lrcArr" :key="index">{{item}}</li>
          </ul>
        </div>
        <!-- 进度条 -->
        <Progress
          :startT="this.format(this.currentTime)"
          :endT="this.format(this.duration)"
          @percentChange="percentChange" 
          :percent="this.percent()">
        </Progress>
        <!-- 播放器控件 -->
        <div class="options">
          <div @click="changeMode" :class="togglePlayMode()"></div>
          <div
            @click="pre()"
            class="pre iconfont icon-shangyishoushangyige"
          ></div>
          <div @click="handleClick" :class="togglePlay()"></div>
          <div
            @click="next()"
            class="next iconfont icon-xiayigexiayishou"
          ></div>
          <div @click="handleFavorite" :class="toggleFavorite()"></div>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      @ended="songEnd"
      @canplay="canPlay"
      @timeupdate="updateTime"
      :src="currentSong.url"
    ></audio>
    <van-loading type="spinner" vertical v-if="flag">加载中</van-loading>
    <van-popup 
      v-model="show" 
      position="bottom" 
      :style="{ height: '50%' }"
      round
      duration="0.2"
      >
        <div
          class="item"
          @click="playSong(item, index)"
          v-for="(item, index) of playList"
          :key="index"
          >
          <p class="songName">{{ item.name }}</p>
          <p class="songAr">
            <span class="icon">SQ</span>{{ item.ar[0].name }}
          </p>
        </div>
      </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast,Popup } from "vant";
import Lyric from "../../assets/lyric"
import Progress from "./Progress"
Vue.use(Toast);
Vue.use(Popup);
import { mapActions, mapGetters } from "vuex";
import { getSongUrl,getLyric } from "@/api/index";
export default {
  data() {
    return {
      full: false,
      flag:false,
      duration:0,
      currentTime:0,
      show:false,
      lyric:{},
      currentLineNum:0
    };
  },
  watch:{
    currentTime(){
      this.currentLineNum=this.lyric._timeFomatter(this.currentTime)
      // 打开全屏进行如下操作
      if(this.full){
        let dis=this.$refs.lyricLine[10].clientHeight
        this.lyric._scroll(dis,"lyricLine",this.currentLineNum,'.scrollul')
      }
    }
  },
  components:{
    Progress
  },
  computed: {
    ...mapGetters([
      "playList",
      "currentSong",
      "currentSongIndex",
      "currentSongInfo",
      "playing",
      "playMode",
      "favoriteSong",
      "favoriteAlbum",
      "favoriteSongIndex"
    ]),
  },
  methods: {
    ...mapActions([
      "setCurrentSongIndex",
      "setPlaying",
      "setCurrentSong",
      "setCurrentSongInfo",
      "setPlayMode",
      "setFavoriteSong",
      "setFavoriteAlbum",
      "delFavoriteSong",
      "delFavoriteAlbum",
      "setPlayList"
    ]),
    percentChange(percent){
      this.$refs.audio.currentTime=this.duration*percent
      // 这里需要重新计算得到最新currentLineNum
      let index =this.lyric._timeFomatter(this.currentTime)
      if(this.full&&this.currentLineNum>6){
        this.lyric._scrollToCurrent(index,".scrollul")
      }
    },

    // 获取歌词
    getSongLyric(){
      if(this.currentSong.id){
        getLyric(this.currentSong.id).then((res)=>{
          if(res.status==200){
            let lyricRes=res.data.lrc.lyric
            this.lyric=new Lyric(lyricRes)
            this.lyric._init()
            this.$refs.audio.play()
          }
        })
      }
    },
    //打开全屏
    toFull() {
      if (!this.currentSongInfo.id) {
        return Toast({
          duration: 1000,
          message: "当前无播放歌曲",
        });
      } else {
        // 打开全屏后自动将歌词滚动到当前位置（重要）
        this.full = true;
        if(this.full){
          this.lyric._scrollToCurrent(this.currentLineNum,".scrollul")
        }
      }
    },

    // 控制弹出层的显示与隐藏
    showPop(){
      this.show=true
    },
    // 歌曲时间的处理
    updateTime(e){
      this.currentTime=e.target.currentTime
    
    },
     // 时间格式化
    pad(num){
      var n=2
      let len=num.toString().length
      if(len<n){
        num='0'+num
        len++
      }
      return num
    },
    format(time){
      time=time | 0
      const minute = time / 60 | 0
      const second = this.pad(time % 60)
      return `${minute}:${second}`
    },
     // 进度条百分比
    percent(){
      return (this.currentTime / this.duration)*100
    },
    // 点击收藏歌曲
    handleFavorite() {
      if(this.isFavorited()==-1){
        this.setFavoriteSong(this.currentSongInfo)
        Toast({
          message:"收藏成功",
          duration:1000
        })
      }else{
        this.delFavoriteSong(this.favoriteSongIndex)
        Toast({
          message:"取消收藏",
          duration:1000
        })
      }
    },
    // 判断当前歌曲是否已收藏
    isFavorited(){
      const index=this.favoriteSong.findIndex((item)=>{
        return item.id===this.currentSong.id
        })
      // 没找到就返回-1，找到了就返回索引值
      return index
    },
    // 收藏样式切换
    toggleFavorite() {
      if (this.isFavorited()==-1) {
        return "favorite iconfont icon-xiai";
      } else {
        return "liked iconfont icon-xiai";
      }
    },
    // 切换播放模式
    changeMode() {
      this.playMode == 1 ? this.setPlayMode(0) : this.setPlayMode(1);
      if (this.playMode == 1) {
        Toast({
          duration: 1000,
          message: "单曲循环",
        });
      } else {
        Toast({
          duration: 1000,
          message: "列表循环",
        });
      }
    },
    // 处理切换播放模式图标
    togglePlayMode() {
      if (this.playMode == 1) {
        return "iconfont mode icon-icon-danquxunhuan1";
      } else {
        return "iconfont mode icon-icon-danquxunhuan";
      }
    },
    // 切换专辑图片的旋转
    toggleRotate() {
      if (this.playing) {
        return "play animate";
      } else {
        return "pause animate";
      }
    },

    //退出全屏
    toMini() {
      this.full = false;
    },

    // 当歌曲获取到url可以播放的时候
    canPlay() {  
      this.getSongLyric()
      // 切歌后将歌词滚动到开头（重要）
      if(this.full){
        // 滚动歌词到顶部
        this.lyric._scrollToTop(".scrollul")
      }
      this.duration = this.$refs.audio.duration;
    },
    // 当前歌曲播放结束后
    songEnd() {
      if (this.playMode == 1) {
        // 如果播放模式是1，就单曲循环循环
        this.loop()
        this.$refs.audio.play()
      } else {
        // 否则按照顺序播放下一首
        this.next();
      }
    },
    // 手动写单曲循环（重要）
    loop(){
      let index=this.currentSongIndex
      getSongUrl(this.playList[index].id).then((res)=>{
        if (res.status == 200) {
          this.setCurrentSong(res.data.data[0]);
          this.setCurrentSongIndex(index);
          this.setCurrentSongInfo(this.playList[index]);
        }
      })
    },
    // 播放下一首
    next() {
      this.flag = true;
      // 否则就按照播放列表的顺序播放
      let index = this.currentSongIndex + 1;
      if (index == this.playList.length) {
        index = 0;
      }
      getSongUrl(this.playList[index].id).then((res) => {
        if (res.status == 200) {
          this.flag = false;
          this.setCurrentSong(res.data.data[0]);
          this.setCurrentSongIndex(index);
          this.setCurrentSongInfo(this.playList[index]);
          this.setPlaying(true);
        }
      });
    },
    // 播放下一首
    pre() {
      this.flag = true;
      let index = this.currentSongIndex - 1;
      if (index == -1) {
        index = this.playList.length - 1;
      }
      getSongUrl(this.playList[index].id).then((res) => {
        if (res.status == 200) {
          this.flag = false;
          this.setCurrentSong(res.data.data[0]);
          this.setCurrentSongIndex(index);
          this.setCurrentSongInfo(this.playList[index]);
          this.setPlaying(true);
        }
      });
    },
    // 播放暂停图标切换
    togglePlay() {
      if (!this.playing) {
        return "iconfont icon-zanting";
      } else {
        return "iconfont icon-zanting1";
      }
    },
    // 处理播放暂停
    handleClick() {
      if (this.currentSong.id) {
        if (this.playing) {
          this.$refs.audio.pause();
          this.setPlaying(false);
        } else {
          this.$refs.audio.play();
          this.setPlaying(true);
        }
      } else {
        console.log("no songs!!!");
      }
    },
  },
};
</script>
<style scoped>
.lyric{
  position: relative;
  top: 50px;
  height: 60%;
  overflow: hidden;
}
.lyric>ul{
  width: 100%;
  height: 100%;
  transform: translate3d(0,0,0);
  /* transition: all .8s ease-out; */
}
.lyricLine{
  width: 100%;
  text-align:center;
  color: #fff;
  padding: 5px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.active{
  width: 100%;
  text-align:center;
  color: #fff;
  padding: 5px;
  color: #ffcd32;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.title{
  text-align: center;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  color: #ffcd32;
  margin-top: 10px;
  position: fixed;
  top: 0;
  left: 0;
}
.icon {
  border: #ffcd32 1px solid;
  color: #ffcd32;
  padding: 1px 3px;
  margin-right: 5px;
  border-radius: 3px;
}
.item {
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
.van-popup{
  background-color: #333;
  position: absolute;
}
.van-progress{
  width: 70%;
  left: 50%;
  top: 7px;
  transform: translateX(-50%);
}
.van-loading {
  text-align: center;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
}
.icon-danquxunhuan {
  font-size: 18px !important;
  font-weight: bolder;
}
.options {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 30px;
  display: flex;
}
.options div {
  flex: 1;
  text-align: center;
  color: #ffcd32;
  font-size: 35px;
  font-weight: lighter;
}
.options .mode {
  font-size: 30px;
  line-height: 35px;
}
.options .favorite {
  font-size: 25px;
  line-height: 35px;
  color: #8f8f8f;
}
.liked {
  font-size: 25px !important;
  line-height: 35px;
  color: #e5404f !important;
}
.f_img {
  width: 100%;
  height: 300px;
  position: relative;
  margin-top: 20px;
}
.f_img img {
  width: 70%;
  border-radius: 50%;
  border: 10px solid #333333;
  position: absolute;
  left: 13%;
  top: 0;
}
.f_ar {
  width: 100%;
  font-size: 12px;
  color: #8f8f8f;
  text-align: center;
  margin-top: 5px;
}
.f_header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 10px;
  display: flex;
}
.f_opts {
  flex: 1;
}
.icon-xiangxia2 {
  font-size: 14px;
  color: #ffcd32;
  font-size: 28px;
  flex: 1;
  font-weight: bolder;
}
.f_name {
  width: 60%;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.playBox {
  width: 100%;
  height: 100%;
}
.f_player {
  width: 100%;
  height: 100%;
  background-color: #222;
  position: relative;
}
.scroll{
  position: absolute;
  width: 100%;
  height: 50%;
  overflow: hidden;
}
.text{
  text-align: center;
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #98918e;
}
.current{
  color:#ffcd32;
  font-size: 18px;
}
.noLyric{
  margin-top: 15px;
  width: 100%;
  text-align: center;
  color: #98918e;
}
.m_player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #333333;
  display: flex;
}
.songName {
  margin-top: 10px;
  font-size: 16px;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.artist {
  color: #8f8f8f;
  font-size: 13px;
  margin-top: 5px;
}
.noSong {
  height: 100%;
  line-height: 70px;
  color: #fff;
  font-size: 14px;
}
.songImg {
  flex: 1.5;
}
.songImg img {
  width: 75%;
  height: 80%;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
}
.songInfo {
  flex: 4;
  overflow: hidden;
}
.icon-liebiao {
  color: #ffcd32;
  font-size: 23px;
}
.list {
  flex: 1;
  text-align: center;
  line-height: 70px;
}
.opts {
  flex: 1;
  text-align: center;
  line-height: 70px;
}
.icon-zanting {
  color: #ffcd32;
  font-size: 34px !important;
}
.icon-zanting1 {
  color: #ffcd32;
  font-size: 35px !important;
}
.imgBox {
  width: 100%;
  height: 100%;
  position: relative;
}
.v-enter {
  transform: translateY(100%);
}
.v-enter-to,
.v-leave {
  transition: all 0.4s ease;
}
</style>