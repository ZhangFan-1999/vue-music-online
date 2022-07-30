import { loadSong, loadAlbum } from "@/assets/utils"
const state = {
  currentSong: {},
  currentSongInfo: {},
  currentSongIndex: 0,
  playList: [],
  playing: false,
  playMode: 1,
  favoriteSong: loadSong(),
  favoriteAlbum: loadAlbum()
}
export default state