import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormView from '../views/FormView.vue'
import SuccessView from '../views/SuccessView.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView
	},
	{
		path: '/form',
		name: 'Form',
		component: FormView
	},
	{
		path: '/success',
		name: 'Success',
		component: SuccessView
	}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;

