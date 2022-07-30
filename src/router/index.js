import Vue from 'vue'
import Router from 'vue-router'
import Recommend from "@/components/Recommend/Recommend"
import Search from "@/components/Search/Search"
import Rank from "@/components/Rank/Rank"
import Favorite from "@/components/Favorite/Favorite"
import songList from "@/components/songList/songList"




Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
        path: "/",
        redirect: "/recommend"
    }, {
        path: "/recommend",
        component: Recommend,
        children: [{
            path: "/recommendlist/:id",
            component: songList
        }]
    }, {
        path: "/rank",
        component: Rank,
        children: [{
            path: "/topList/:id",
            component: songList
        }]
    }, {
        path: "/search",
        component: Search
    }, {
        path: "/favorite",
        component: Favorite
    },]
})