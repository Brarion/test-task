import Vue from "vue"
import VueRouter from "vue-router"
import Staff from "../views/Staff.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "Сотрудники",
		component: Staff
	}
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
