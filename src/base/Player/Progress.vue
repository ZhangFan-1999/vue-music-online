<template>
<div class="wrapper">
  <span class="startT">{{startT}}</span>
  <div class="progress">
    <div class="track" @click="progressClick" ref="track">
      <div ref="inner" class="inner" :style="{width:this.distance+'px'}"></div>
      <div class="point"
          ref="point"
          :style="{left:this.distance-2+'px'}"
          @touchstart.prevent="pointStart"
          @touchmove.prevent="pointMove"
          @touchend="pointEnd">
      </div>
    </div>
  </div>
  <span class="endT">{{endT}}</span>
</div>
</template>
<script>
export default {
  data(){
    return{
      distance:0,
      deltaX:0
    }
  },
  created(){
    this.touch={}
  },
  mounted(){
    this.progressDis()
  },
  props:{
    percent:{
      type:Number
    },
    startT:{
      type:String
    },
    endT:{
      type:String
    }
  },
  watch:{
    percent(){
      this.progressDis()
    }
  },
  methods:{
    // 计算进度条长度
    progressDis(){
      const eleDom=document.querySelector('.track')
      const width=getComputedStyle(eleDom).width
      const widthNum=parseInt(width)
      const progressWid=(widthNum*this.percent)/100
      // 当前进度条的长度
      this.distance=progressWid
    },
    pointStart(e){
      this.touch.init=true
      this.touch.startX=e.touches[0].pageX
    },
    pointMove(e){
      let innerWid=this.$refs.inner.clientWidth
      let trackWid=this.$refs.track.clientWidth
      if(innerWid<=0){
        this.$refs.inner.style.width=0
        this.$refs.point.style.left=0
        return
      }
      if(innerWid>=trackWid){
        this.$refs.inner.style.width=0
        this.$refs.point.style.left=0
        return 
      }
      if(!this.touch.init){
        return
      }
      // deltaX就是实际上拖动的距离
      let deltaX=e.touches[0].pageX-this.touch.startX
      this.$refs.inner.style.width=this.distance+deltaX+"px"
      this.$refs.point.style.left=this.distance+deltaX+"px"
    },
    pointEnd(){
      this.touch.init=false
      let innerWid=this.$refs.inner.clientWidth
      this.distance=innerWid
      this.tirggerPercent(innerWid)
    },
    tirggerPercent(innerWid){
      let trackWid=this.$refs.track.clientWidth
      let percent=innerWid/trackWid
      this.$emit("percentChange",percent)
    },
    // 点击进度条
    progressClick(e){
      this.tirggerPercent(e.offsetX)
    }

  }
}
</script>
<style scoped>
.inner{
  height: 5px;
  width: 0;
  border-radius: 4px;
  background-color: #ffcd32;
}
.point{
  position: absolute;
  top: -4px;
  left: 0;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #ffcd32;
  border: 2px solid #ccc;
}
.track{
  position: relative;
  top: 7px;
  width: 100%;
  height: 5px;
  background-color: #888888;
  border-radius: 4px;
}
.startT{
  color: #888;
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
}
.endT{
  color: #888;
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
}
.wrapper{
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 90px;
  line-height: 20px;
}
.progress{
  width: 70%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>