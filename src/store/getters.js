import state from "./state"

export const currentSong = state => state.currentSong

export const playing = state => state.playing

export const currentSongInfo = state => state.currentSongInfo

export const playList = state => state.playList

export const currentSongIndex = state => state.currentSongIndex

export const playMode = state => state.playMode

export const favoriteSong = state => state.favoriteSong

export const favoriteAlbum = state => state.favoriteAlbum

export const favoriteSongIndex = state => {
  var arr = state.favoriteSong
  var index = 0;
  var num = -1;
  for (var i = 0; i < arr.length; i++) {
    num++
    if (arr[i].id == state.currentSong.id) {
      index = num
    }
  }
  return index
}

