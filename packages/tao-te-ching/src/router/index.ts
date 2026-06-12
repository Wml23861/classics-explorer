import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chapters from '../views/Chapters.vue'
import ChapterDetail from '../views/ChapterDetail.vue'

const routes = [
  { path: '/',            name: 'Home',          component: Home,          meta: { title: '道德经 · 道法自然' } },
  { path: '/chapters',    name: 'Chapters',      component: Chapters,      meta: { title: '八十一章 · 逐章参究' } },
  { path: '/chapter/:id', name: 'ChapterDetail', component: ChapterDetail, meta: { title: '' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const base = '道德经 · '
  document.title = (to.meta.title as string)
    ? base + (to.meta.title as string)
    : base + '道法自然'
})

export default router
