<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ChapterCard from '../components/ChapterCard.vue'
import { chapters as diamondChapters } from '../data/index'
import { taoChapters } from '../data/tao-te-ching/index'

const route = useRoute()
const sutraType = computed(() => route.meta.sutra as string || 'diamond')
const isDiamond = computed(() => sutraType.value === 'diamond')

const data = computed(() => isDiamond.value ? diamondChapters : taoChapters)
const total = computed(() => isDiamond.value ? 32 : 81)
const title = computed(() => isDiamond.value ? '金刚般若波罗蜜经' : '道德经')
const subtitle = computed(() => isDiamond.value ? '逐品参究 · 融通六经 · 明心见性' : '逐章参究 · 道法自然 · 玄同有无')
const headerTag = computed(() => isDiamond.value ? '融通万象 · 三十二品' : '道法自然 · 八十一章')
const closingQuote = computed(() => isDiamond.value
  ? '"凡所有相，皆是虚妄。<br/>若见诸相非相，即见如来。"'
  : '"上善若水。水善利万物而不争，<br/>处众人之所恶，故几于道。"')
const closingAttribution = computed(() => isDiamond.value ? '— 第五品 · 如理实见分' : '— 第八章 · 上善若水')
const linkPrefix = computed(() => isDiamond.value ? '/diamond' : '/tao')

// Group into rows of 4
const grouped = computed(() => {
  const g: typeof data.value[] = []
  for (let i = 0; i < data.value.length; i += 4) g.push(data.value.slice(i, i + 4))
  return g
})
</script>

<template>
  <div class="bg-paper min-h-screen">
    <!-- Header -->
    <section class="relative pt-20 sm:pt-28 pb-12 sm:pb-16 content-width text-center">
      <div class="flex items-center justify-center gap-4 mb-5">
        <div class="gold-line w-14" />
        <span class="text-[12px] sm:text-sm tracking-[0.5em] font-mono" style="color: #b8a080;">{{ headerTag }}</span>
        <div class="gold-line w-14" />
      </div>

      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[0.2em] mb-5" style="color: #5a4020;">
        {{ title }}
      </h1>

      <p class="text-base sm:text-lg tracking-[0.25em] max-w-xl mx-auto" style="color: #8a7a60;">
        {{ subtitle }}
      </p>

      <!-- Sutra switcher -->
      <div class="flex items-center justify-center gap-2 mt-8">
        <router-link to="/diamond" class="px-5 py-2 rounded-full text-sm tracking-[0.1em] no-underline transition-all duration-300"
          :style="isDiamond
            ? { background: '#b8860b', color: '#fff' }
            : { background: 'transparent', color: '#8a7a60', border: '1px solid rgba(180,130,30,0.2)' }">
          金刚经 · 三十二品
        </router-link>
        <router-link to="/tao" class="px-5 py-2 rounded-full text-sm tracking-[0.1em] no-underline transition-all duration-300"
          :style="!isDiamond
            ? { background: '#2d6a4a', color: '#fff' }
            : { background: 'transparent', color: '#8a7a60', border: '1px solid rgba(45,106,74,0.2)' }">
          道德经 · 八十一章
        </router-link>
      </div>

      <div class="gold-line-heavy w-48 mx-auto mt-8" />
    </section>

    <!-- Empty state -->
    <section v-if="data.length === 0" class="pb-24 content-width text-center">
      <p class="text-lg tracking-wider" style="color: #8a7a60;">章节正在陆续参究中……</p>
    </section>

    <!-- Bento Grid of Chapters -->
    <section v-else class="pb-24 sm:pb-32 content-width">
      <!-- 道经/德经 section headers for Tao Te Ching -->
      <template v-if="!isDiamond">
        <div v-if="data.filter(c => c.id <= 37).length > 0" class="mb-4 mt-4">
          <h2 class="text-lg font-semibold tracking-[0.15em] px-1" style="color: #5a4020;">
            <span class="w-6 h-[2px] inline-block align-middle mr-3" style="background: #2d6a4a;"></span>道 经
            <span class="text-xs tracking-[0.15em] ml-2 opacity-60">第一章 至 第三十七章</span>
          </h2>
        </div>
        <div class="space-y-5 mb-10">
          <div v-for="(group, gi) in grouped.filter(g => g[0].id <= 37)" :key="'dao-'+gi" class="bento-grid">
            <ChapterCard v-for="chapter in group" :key="chapter.id" :chapter="chapter" :link-prefix="linkPrefix" />
          </div>
        </div>
        <div v-if="data.filter(c => c.id >= 38).length > 0" class="mb-4 mt-10">
          <h2 class="text-lg font-semibold tracking-[0.15em] px-1" style="color: #5a4020;">
            <span class="w-6 h-[2px] inline-block align-middle mr-3" style="background: #2d6a4a;"></span>德 经
            <span class="text-xs tracking-[0.15em] ml-2 opacity-60">第三十八章 至 第八十一章</span>
          </h2>
        </div>
        <div class="space-y-5">
          <div v-for="(group, gi) in grouped.filter(g => g[0].id >= 38)" :key="'de-'+gi" class="bento-grid">
            <ChapterCard v-for="chapter in group" :key="chapter.id" :chapter="chapter" :link-prefix="linkPrefix" />
          </div>
        </div>
      </template>

      <!-- Simple grid for Diamond Sutra -->
      <template v-else>
        <div class="space-y-5">
          <div v-for="(group, gi) in grouped" :key="gi" class="bento-grid">
            <ChapterCard v-for="chapter in group" :key="chapter.id" :chapter="chapter" :link-prefix="linkPrefix" />
          </div>
        </div>
      </template>

      <!-- Bottom quote -->
      <div class="mt-20 sm:mt-28 text-center">
        <div class="gold-line w-24 mx-auto mb-8" />
        <p class="text-base sm:text-lg tracking-wider leading-loose italic max-w-lg mx-auto" style="color: #5a4a30;" v-html="closingQuote" />
        <p class="text-sm tracking-wider mt-3" style="color: #a09080;">{{ closingAttribution }}</p>
        <router-link to="/" class="inline-block mt-8 px-6 py-2.5 text-base tracking-[0.15em] no-underline rounded-full transition-all duration-300 hover:-translate-y-0.5"
          style="background: rgba(180,130,30,0.06); color: #8b6914; border: 1px solid rgba(180,130,30,0.2);">
          返回首页
        </router-link>
      </div>
    </section>
  </div>
</template>
