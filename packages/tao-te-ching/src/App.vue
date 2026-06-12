<script setup lang="ts">
import { onUnmounted } from 'vue'
import AppHeader from '@shared/components/AppHeader.vue'
import AppFooter from '@shared/components/AppFooter.vue'
import ProgressBar from '@shared/components/ProgressBar.vue'
import { useScrollProgress } from '@shared/composables/useScrollProgress'

const { progress, showScrollTop, scrollToTop } = useScrollProgress()

const scriptureDots = [
  { name: '道德经', color: '#2d6a4a' },
  { name: '金刚经', color: '#b8860b' },
  { name: '论语',   color: '#c04040' },
  { name: '庄子',   color: '#3a7a8a' },
  { name: '孙子',   color: '#6048a0' },
  { name: '高维',   color: '#3058c0' },
]
</script>

<template>
  <div data-theme="taoist" class="min-h-screen flex flex-col" style="background: var(--color-bg);">
    <ProgressBar :progress="progress" />
    <AppHeader
      logo="道"
      title="道德经"
      subtitle="道法自然 · 玄同有无"
      :nav-items="[
        { path: '/', label: '首页', icon: '首' },
        { path: '/chapters', label: '八十一章', icon: '章' },
      ]"
      home-path="/"
      @navigate="(path: string) => $router.push(path)"
    />

    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <AppFooter
      logo="道"
      title="道德经"
      subtitle="道法自然 · 玄同有无 · 大制不割"
      :scriptures="scriptureDots"
      closing-quote="有物混成，先天地生。<br/>寂兮寥兮，独立而不改，周行而不殆，<br/>可以为天下母。"
      closing-quote-attribution="— 《道德经》第二十五章"
      copyright-name="道门参究"
      author-name="王明龙"
      dedication="上善若水。水善利万物而不争，处众人之所恶，故几于道。"
    />

    <transition name="page">
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-0 z-50 transition-all duration-300 shadow-md"
        style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-primary);"
        aria-label="返回顶部"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </transition>
  </div>
</template>
