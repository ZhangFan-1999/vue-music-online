import * as types from '@/store/mutationTypes'
const mutations = {
  [types.SET_CURRENTSONG](state, data) {
    state.currentSong = data
  },
  [types.SET_PLAYING](state, data) {
    state.playing = data
  },
  [types.SET_CURRENTSONG_INFO](state, data) {
    state.currentSongInfo = data
  },
  [types.SET_PLAYLIST](state, data) {
    state.playList = data
  },
  [types.SET_CURRENTSONG_INDEX](state, data) {
    state.currentSongIndex = data
  },
  [types.SET_PLAY_MODE](state, data) {
    state.playMode = data
  },
  [types.SET_FAVORITE_SONG](state, data) {
    state.favoriteSong = data
  },
  [types.SET_FAVORITE_ALBUM](state, data) {
    state.favoriteAlbum = data
  },
}
export default mutations