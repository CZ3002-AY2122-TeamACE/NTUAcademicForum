import Vue from "vue";
import VueRouter  from "vue-router";
import App from "@/App";
import SwapIndex from "@/components/SwapIndex";
import AddSwapIndex from "@/components/AddSwapIndex";


Vue.use(VueRouter);
export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/view", component: SwapIndex },
        { path: "/add", component:  AddSwapIndex},
        { path: "*", redirect: "/"}
    ]
})