import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Chapters from '../views/Chapters.vue'
import ChapterDetail from '../views/ChapterDetail.vue'

const routes: RouteRecordRaw[] = [
  { path: '/',              name: 'Home',          component: Home,          meta: { title: '金刚经 · 道德经 · 融通万象' } },
  { path: '/diamond',       name: 'DiamondList',   component: Chapters,      meta: { title: '金刚经 · 三十二品', sutra: 'diamond' } },
  { path: '/diamond/:id',   name: 'DiamondDetail', component: ChapterDetail,  meta: { title: '', sutra: 'diamond' } },
  { path: '/tao',           name: 'TaoList',       component: Chapters,      meta: { title: '道德经 · 八十一章', sutra: 'taoist' } },
  { path: '/tao/:id',       name: 'TaoDetail',     component: ChapterDetail,  meta: { title: '', sutra: 'taoist' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router
