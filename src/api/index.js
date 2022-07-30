import axios from "axios"
// 获取轮播图数据
export function getBanners() {
    return axios.get("/banner?type=0")
}
// 获取推荐歌曲
export function getRecommendSongs() {
    return axios.get("/personalized/newsong")
}
// 获取推荐歌单
export function getSongList() {
    return axios.get(`/personalized?limit=10`)
}
//获取歌单详情
export function getListInfo(id) {
    return axios.get(`/playlist/detail?id=${id}`)
}
// 获取歌单评论
export function getListComments(id) {
    return axios.get(`/comment/playlist?id=${id}`)
}
// 获取音乐url
export function getSongUrl(id) {
    return axios.get(`/song/url?id=${id}`)
}
// 获取音乐详细信息
export function getSongInfo(id) {
    return axios.get(`/song/detail?ids=${id}`)
}
// 获取排行榜信息
export function getTopList() {
    return axios.get('/toplist')
}
// 榜单摘要
export function getTopListDes() {
    return axios.get('/toplist/detail')
}
// 获取热搜
export function getHots() {
    return axios.get("/search/hot")
}
// 获取搜索结果
export function getSearchRes(value) {
    return axios.get(`/cloudsearch?keywords=${value}`)
}
// 获取歌词
export function getLyric(id) {
    return axios.get(`/lyric?id=${id}`)
}
