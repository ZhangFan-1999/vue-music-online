const reg = /\[(\d{2}:\d{2})\.\d{2,3}\](.+)/g

export default class Lyric{
  constructor(lrcStr){
    this.lrcStr=lrcStr
    this.lrcArr=[]
    this.timeArr=[]
    this.timeStrArr=[]
  }
  // 歌词初始化
  _init(){
    let tmp = reg.exec(this.lrcStr)
    // 循环匹配歌词直到匹配不到为止
    while (tmp) {
      this.timeArr.push(tmp[1])
      this.lrcArr.push(tmp[2])
      tmp = reg.exec(this.lrcStr)
    }
  }
  //格式化时间获取当前歌词的行数
  _timeFomatter(currentTime){
    let minutes = parseInt(currentTime / 60)
    let seconds = parseInt(currentTime % 60)
    // 当前格式化好的时间
    let timeStr = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    // 当前时间的字符
    let curSec=timeStr.slice(3)
    let curMin=timeStr.slice(0,2)
    let curTimeStr=curMin+curSec

    //所有歌词时间的秒数
    let arr=[] 
    for (let i = 0; i < this.timeArr.length; i++) {
      let sec=this.timeArr[i].slice(3)
      let min =this.timeArr[i].slice(0,2)
      let str=min+sec
      arr.push(str)
    }
    this.timeStrArr=arr
    for(let i=0;i<this.timeStrArr.length;i++){
      if (curTimeStr > this.timeStrArr[i] && curTimeStr < this.timeStrArr[i + 1]){
        return i
      }else if(this.timeStrArr[i]==curTimeStr){
        return i
      }
    }
  }

  // 歌词滚动
  _scroll(dis,currentClass,currentLine,eleClassName){
    const eleDom=document.querySelector(eleClassName)
    if(eleDom,currentLine>-1){
      // 歌词播放到第七行再开始滚动eleDom
      if(currentLine>6){
        eleDom.style.transform = `translate3d(0,${-(currentLine - 5) * dis + 'px'},0)`;
        eleDom.style.transition =`all .8s ease-out`
      }
      for (var i = 0; i < eleDom.children.length; i++) {
        eleDom.children[i].className = currentClass
      }
      // 给当前播放的歌词高亮显示
      eleDom.children[currentLine].className = 'active'
    }
  }

  // 滚动歌词到顶部
  _scrollToTop(eleClassName){
    const eleDom = document.querySelector(eleClassName)
    eleDom.style.transform = `translate3d(0,${0 + "px"},0)`
  }

  // 将歌词滚动到当前位置
  _scrollToCurrent(currentLine,eleClassName){
    if(currentLine>6){
      setTimeout(() => {
        const eleDom = document.querySelector(eleClassName)
        eleDom.style.transform = `translate3d(0,${-(currentLine - 5) * 35 + "px"},0)` 
        eleDom.children[currentLine].className = 'active'
      }, 100)
    }else{
      setTimeout(()=>{
        const eleDom = document.querySelector(eleClassName)
        eleDom.children[currentLine].className = 'active'
      },100)
    }
  }
  // 当前歌词高亮
  _activeLrc(currentLine,eleClassName){
    setTimeout(()=>{
      const eleDom = document.querySelector(eleClassName)
      eleDom.children[currentLine].className = 'active'
    },100)
  }
}

