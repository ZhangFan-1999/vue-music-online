import Storage from "good-storage"
var FAVORITESONGS_KEY = 'favoriteSongs'
var PLAYHISTORY_KEY = "playHistory"
var FAVORITEALBUM_KEY = 'favoriteAlbum'
function insertArray(arr, val, compare, maxlen) {
  // 返回符合条件的第一个元素的位置
  const index = arr.findIndex(compare)
  // 如果在第0位元素就找到相同的不进行任何操作
  // 直接返回原来的local中的数据
  if (index === 0) {
    return
  }
  // 如果在别的位置上找到相同的元素，那就把找到的元素删除掉
  // 同时将新添加的unshift到第0位上
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 也会处理从来没有添加过（第一次添加，findIndex会返回-1）的元素
  arr.unshift(val)
  // 如果数组的长度超出限制就把数组的最后一项pop掉
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}
// 保存收藏歌曲
export function saveSong(data) {
  let favorites = Storage.get(FAVORITESONGS_KEY, [])
  insertArray(favorites, data, (item) => {
    return item.id === data.id
  }, 100)
  Storage.set(FAVORITESONGS_KEY, favorites)
  return favorites
}
// 保存收藏的歌单
export function saveAlbum(data) {
  let albums = Storage.get(FAVORITEALBUM_KEY, [])
  insertArray(albums, data, (item) => {
    return item.id === data.id
  }, 100)
  Storage.set(FAVORITEALBUM_KEY, albums)
  return albums
}
// 保存播放历史
export function saveHistory(data) {
  let history = Storage.get(PLAYHISTORY_KEY, [])
  insertArray(history, data, (item) => {
    return item.id === data.id
  }, 100)
  Storage.set(PLAYHISTORY_KEY, history)
  return history
}
//保存用户信息
export function saveUserInfo(data) {
  Storage.set("userInfo", data);
  return data
}
export function savePlayList(data) {
  Storage.set("userPlayList", data)
  return data
}
// 清空历史播放
export function clearHistory() {
  Storage.remove(PLAYHISTORY_KEY)
  return []
}

export function deleteSong(index) {
  let favorites = Storage.get(FAVORITESONGS_KEY)
  // 根据索引删除元素
  favorites.splice(index, 1)
  Storage.set(FAVORITESONGS_KEY, favorites)
  return favorites
}
export function deleteAlbum(id) {
  let albums = Storage.get(FAVORITEALBUM_KEY)
  for (let i = 0; i < albums.length; i++) {
    if (albums[i].id == id) {
      albums.splice(i, 1)
      Storage.set(FAVORITEALBUM_KEY, albums)
      return albums
    }
  }
}
// 退出登录
export function clearUserInfo() {
  Storage.remove("userInfo")
  Storage.remove("userPlayList")
  return {}
}

export function loadSong() {
  return Storage.get(FAVORITESONGS_KEY, [])
}

export function loadAlbum() {
  return Storage.get(FAVORITEALBUM_KEY, [])
}

export function loadHistory() {
  return Storage.get(PLAYHISTORY_KEY, [])
}

export function loadUserInfo() {
  return Storage.get("userInfo", {})
}
export function loadUserPlayList() {
  return Storage.get("userPlayList")
}