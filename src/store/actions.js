import * as types from '@/store/mutationTypes'
import { saveSong, deleteSong, saveAlbum, deleteAlbum } from "@/assets/utils"

//设置当前播放的歌曲
export const setCurrentSong = function (ctx, data) {
  ctx.commit(types.SET_CURRENTSONG, data)
}
// 设置播放器状态
export const setPlaying = function (ctx, data) {
  ctx.commit(types.SET_PLAYING, data)
}
// 设置当前播放歌曲的信息
export const setCurrentSongInfo = function (ctx, data) {
  ctx.commit(types.SET_CURRENTSONG_INFO, data)
}
// 设置当前播放列表
export const setPlayList = function (ctx, data) {
  ctx.commit(types.SET_PLAYLIST, data)
}
// 获取当前播放歌曲的索引
export const setCurrentSongIndex = function (ctx, data) {
  ctx.commit(types.SET_CURRENTSONG_INDEX, data)
}
// 获取当前播放模式
export const setPlayMode = function (ctx, data) {
  ctx.commit(types.SET_PLAY_MODE, data)
}
// 收藏歌曲
export const setFavoriteSong = function (ctx, data) {
  ctx.commit(types.SET_FAVORITE_SONG, saveSong(data))
}
// 收藏歌单
export const setFavoriteAlbum = function (ctx, data) {
  ctx.commit(types.SET_FAVORITE_ALBUM, saveAlbum(data))
}
// 删除收藏歌曲
export const delFavoriteSong = function (ctx, data) {
  ctx.commit(types.SET_FAVORITE_SONG, deleteSong(data))
}

// 删除收藏的歌单
export const delFavoriteAlbum = function (ctx, data) {
  ctx.commit(types.SET_FAVORITE_ALBUM, deleteAlbum(data))
}