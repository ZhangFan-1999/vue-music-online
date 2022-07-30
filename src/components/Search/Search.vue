<template>
  <div class="search">
    <div class="searchBox">
      <div class="searchWrap">
        <van-icon name="search" />
        <input
          class="input"
          type="text"
          v-model="value"
          placeholder="输入歌手、歌曲"
        />
        <div class="goSear" @click="handleOpts">
          {{ opts }}
        </div>
      </div>
    </div>
    <div class="advise" v-if="!searchRes.length > 0">
      <div
        @click="getSong(item.first)"
        class="item"
        v-for="(item, index) of hots"
        :key="index"
      >
        {{ item.first }}
      </div>
    </div>
    <div class="resList" v-if="searchRes">
      <div
        class="res"
        v-for="(item, index) of searchRes"
        @click="handlePlay(item, index)"
        :key="index"
      >
        <p class="songName">{{ item.name }}</p>
        <p class="songAr"><span class="icon">SQ</span>{{ item.ar[0].name }}</p>
      </div>
    </div>
    <van-loading type="spinner" vertical v-if="flag"></van-loading>
  </div>
</template>
<script>
import { getHots, getSearchRes, getSongInfo, getSongUrl } from "@/api/index";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      hots: [],
      value: "",
      opts: "",
      searchRes: [],
      flag: false,
    };
  },
  watch: {
    // 监听输入框value
    value() {
      if (this.value.length == 0) {
        this.opts = "";
        this.searchRes = [];
      } else if (this.searchRes.length == 0) {
        this.opts = "搜索";
      }
    },
    searchRes() {
      if (this.searchRes.length != 0) {
        this.opts = "取消";
      }
    },
  },
  computed: {
    ...mapGetters(["playing", "playList"]),
  },
  methods: {
    ...mapActions([
      "setCurrentSongIndex",
      "setPlaying",
      "setCurrentSong",
      "setCurrentSongInfo",
      "setPlayMode",
      "setPlayList",
    ]),
    // 搜索热词
    getSong(keyWord) {
      this.flag = true;
      this.value = keyWord;
      getSearchRes(keyWord).then((res) => {
        if (res.status == 200) {
          this.searchRes = res.data.result.songs;
          this.flag = false;
        }
      });
    },
    // 初始化搜索框
    _initSearch() {
      if (this.value.length == 0) {
        this.search = " ";
      }
    },
    // 热搜推荐
    _getHots() {
      this.flag = true;
      getHots().then((res) => {
        if (res.status == 200) {
          this.hots = res.data.result.hots.splice(1, 6);
          this.flag = false;
        }
      });
    },
    // 获取搜索结果
    handleOpts() {
      if (this.opts == "搜索") {
        this.flag = true;
        getSearchRes(this.value).then((res) => {
          if (res.status == 200) {
            this.searchRes = res.data.result.songs;
            this.flag = false;
          }
        });
      } else {
        this.searchRes = [];
        this.value = "";
      }
    },
    // 播放搜索结果
    handlePlay(item, index) {
      this.flag = true;
      // 每次在点击歌曲列表的一首歌时就重置当前播放器的状态
      // 也就是从头开始播放
      this.setPlaying(false)
      this.setCurrentSong({})
      this.setCurrentSongInfo({})
      
      getSongUrl(item.id).then((res) => {
        if (res.status == 200) {
          this.flag = false;
          this.setCurrentSong(res.data.data[0]);
          this.setPlayList(this.searchRes);
          this.setCurrentSongInfo(this.playList[index]);
          this.setCurrentSongIndex(index);
          this.setPlaying(true);
        }
      });
    },
  },
  created() {
    this._getHots();
    this._initSearch();
  },
};
</script>
<style scoped>
.search {
  position: fixed;
  top: 88px;
  bottom: 70px;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
.searchBox {
  margin: 20px;
  flex: 1;
}
.searchWrap {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #333333;
  border-radius: 6px;
  line-height: 30px;
}
.van-icon-search {
  color: #636363;
  margin-left: 5px;
  text-align: center;
  font-size: 18px;
  flex: 1;
}
.input {
  width: 60%;
  border: none;
  outline: none;
  background-color: transparent;
  color: #636363;
  margin-left: 8px;
  flex: 8;
  font-size: 14px;
}
.goSear {
  flex: 3;
  text-align: center;
  color: #636363;
  font-size: 14px;
}
.advise {
  margin: 20px;
  flex: 12;
  overflow: hidden;
}
.item {
  width: 33%;
  float: right;
  text-align: center;
  color: #636363;
  margin: 8px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}
.resList {
  flex: 12;
  overflow-y: scroll;
}
.res {
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
.icon {
  border: #ffcd32 1px solid;
  color: #ffcd32;
  padding: 1px 3px;
  margin-right: 5px;
  border-radius: 3px;
}
.van-loading {
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>