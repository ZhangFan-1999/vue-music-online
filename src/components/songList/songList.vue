<template>
  <album :songList="songList">
    <van-loading type="spinner" vertical v-if="flag">加载中</van-loading>
  </album>
</template>
<script>
import { getListInfo } from "@/api/index";
import album from "../../base/Album/Album";
export default {
  data() {
    return {
      songList: {},
      flag: true,
    };
  },
  components: {
    album,
  },
  methods: {
    // 获取歌单详情
    _getListInfo() {
      getListInfo(this.$route.params.id).then((res) => {
        if (res.status == 200) {
          this.songList = res.data.playlist;
          this.flag = false;
        }
      });
    },
  },
  created() {
    this._getListInfo();
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
</style>
