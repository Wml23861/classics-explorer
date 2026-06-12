<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const showScrollTop = ref(false)
const scrollProgress = ref(0)

function onScroll() {
  showScrollTop.value = window.scrollY > 600
  const h = document.documentElement
  scrollProgress.value = (h.scrollHeight - h.clientHeight) > 0
    ? Math.min((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100, 100)
    : 0
}
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="bg-paper min-h-screen flex flex-col">
    <div class="reading-bar" :style="{ width: scrollProgress + '%' }" />
    <AppHeader />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
    <transition name="page">
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-0 z-50 transition-all duration-300 shadow-md"
        style="background: #fefcf7; border: 1px solid rgba(180,130,30,0.25); color: #b8860b;"
        aria-label="返回顶部"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </transition>
  </div>
</template>
