<script setup lang="ts">
import { computed } from 'vue'
import { chapters, daoJing, deJing } from '../data'
import ChapterCard from '@shared/components/ChapterCard.vue'

const daoChapters = computed(() => chapters.filter(c => c.id >= 1 && c.id <= 37))
const deChapters = computed(() => chapters.filter(c => c.id >= 38 && c.id <= 81))
const hasChapters = computed(() => chapters.length > 0)
</script>

<template>
  <div class="content-width py-12">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-semibold tracking-[0.2em] mb-4" style="color: var(--color-text);">道 德 经</h1>
      <p class="text-base tracking-[0.1em]" style="color: var(--color-text-secondary);">八十一章 · 逐章参究</p>
    </div>

    <!-- Empty state -->
    <div v-if="!hasChapters" class="text-center py-20">
      <div class="text-6xl mb-6 opacity-30">🌿</div>
      <p class="text-lg tracking-[0.1em]" style="color: var(--color-text-muted);">
        章节正在陆续参究中……
      </p>
      <p class="text-sm mt-2" style="color: var(--color-text-muted);">
        八十一章，道经三十七，德经四十四
      </p>
    </div>

    <!-- 道经 section -->
    <template v-if="daoChapters.length > 0">
      <div class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.2em] inline-flex items-center gap-3"
            style="color: var(--color-primary);">
          <span class="w-8 h-[2px] inline-block" style="background: var(--color-primary);"></span>
          道 经
          <span class="text-sm tracking-[0.1em] opacity-70">第一章至第三十七章</span>
        </h2>
      </div>
      <div class="bento-grid mb-16">
        <ChapterCard
          v-for="ch in daoChapters" :key="ch.id"
          :id="ch.id"
          :title="ch.title"
          :subtitle="ch.subtitle"
          :tags="ch.tags"
          :total-chapters="81"
          :link-path="`/chapter/${ch.id}`"
        />
      </div>
    </template>

    <!-- 德经 section -->
    <template v-if="deChapters.length > 0">
      <div class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.2em] inline-flex items-center gap-3"
            style="color: var(--color-primary);">
          <span class="w-8 h-[2px] inline-block" style="background: var(--color-primary);"></span>
          德 经
          <span class="text-sm tracking-[0.1em] opacity-70">第三十八章至第八十一章</span>
        </h2>
      </div>
      <div class="bento-grid mb-16">
        <ChapterCard
          v-for="ch in deChapters" :key="ch.id"
          :id="ch.id"
          :title="ch.title"
          :subtitle="ch.subtitle"
          :tags="ch.tags"
          :total-chapters="81"
          :link-path="`/chapter/${ch.id}`"
        />
      </div>
    </template>

    <!-- Footer quote -->
    <div class="text-center py-12">
      <div class="gold-line w-48 mx-auto mb-6" />
      <blockquote class="text-base italic tracking-wider leading-relaxed" style="color: var(--color-text-secondary);">
        "上善若水。水善利万物而不争，处众人之所恶，故几于道。"
      </blockquote>
      <cite class="text-sm mt-3 inline-block not-italic" style="color: var(--color-text-muted);">
        — 《道德经》第八章
      </cite>
    </div>
  </div>
</template>
