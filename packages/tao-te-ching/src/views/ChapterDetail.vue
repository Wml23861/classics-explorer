<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { chapters } from '../data'
import { useFontSize } from '@shared/composables/useFontSize'
import { useKeyboardNav } from '@shared/composables/useKeyboardNav'
import { useZenMode } from '@shared/composables/useZenMode'

const route = useRoute()
const router = useRouter()

const chapterId = computed(() => parseInt(route.params.id as string))
const chapter = computed(() => chapters.find(c => c.id === chapterId.value))
const prev = computed(() => chapters.find(c => c.id === chapterId.value - 1))
const next = computed(() => chapters.find(c => c.id === chapterId.value + 1))

const { zen, toggleZen } = useZenMode()
const { className: fontClass, increase, decrease } = useFontSize()
useKeyboardNav({
  onPrev: () => prev.value && go(prev.value.id),
  onNext: () => next.value && go(next.value.id),
  onZen: toggleZen,
})

const bar = ref(0)
function onScroll() {
  const h = document.documentElement
  bar.value = (h.scrollHeight - h.clientHeight) > 0
    ? Math.min((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100, 100)
    : 0
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const sect = ref('')
const ids = ['original', 'essence', 'fiveMirrors', 'scenarios', 'rushidao', 'sixFold', 'celebrity', 'classics', 'higher', 'wangYangming', 'huineng', 'modernMasters', 'relationships', 'insights', 'modern', 'meditation', 'energy', 'questions', 'creator']
function spy() {
  for (const id of [...ids].reverse()) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= 160) { sect.value = id; break }
  }
}
onMounted(() => window.addEventListener('scroll', spy, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', spy))

function go(id: number) { router.push(`/chapter/${id}`); nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
function to(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

const copied = ref<string | null>(null)
function copy(t: string, id: string) { navigator.clipboard.writeText(t); copied.value = id; setTimeout(() => copied.value = null, 2000) }

const sectionLabels: Record<string, string> = {
  original: '原文', essence: '要义', fiveMirrors: '道门五镜', scenarios: '场景', rushidao: '汇通',
  sixFold: '六维', celebrity: '名人', classics: '融通', higher: '高维', wangYangming: '心学', huineng: '禅宗',
  modernMasters: '道家学者', relationships: '人伦', insights: '感悟', modern: '现代修行',
  meditation: '冥想', energy: '能量', questions: '问答', creator: '创作者',
}
const sectionChars: Record<string, string> = {
  original: '原', essence: '义', fiveMirrors: '镜', scenarios: '境', rushidao: '通',
  sixFold: '六', celebrity: '名', classics: '融', higher: '维', wangYangming: '王', huineng: '禅',
  modernMasters: '师', relationships: '伦', insights: '悟', modern: '行',
  meditation: '静', energy: '能', questions: '问', creator: '明',
}

const classicSources = [
  { key: 'diamondSutra', label: '金刚经', color: '#b8860b', icon: '金' },
  { key: 'analects', label: '论语', color: '#c04040', icon: '论' },
  { key: 'artOfWar', label: '孙子兵法', color: '#6048a0', icon: '兵' },
  { key: 'zhuangZi', label: '庄子', color: '#3a7a8a', icon: '庄' },
]

const dimSources = [
  { key: 'cosmogony', label: '宇宙生成论', color: '#2d6a4a', icon: '宇' },
  { key: 'systemsView', label: '系统观', color: '#3a7a8a', icon: '系' },
  { key: 'empiricalPractice', label: '内证实修', color: '#3058c0', icon: '证' },
]

const relations = [
  { key: 'romantic', label: '爱情', color: '#c04040', icon: '爱' },
  { key: 'family', label: '亲情', color: '#c06030', icon: '亲' },
  { key: 'friendship', label: '友情', color: '#2d6a4a', icon: '友' },
  { key: 'strangers', label: '陌路', color: '#3a7a8a', icon: '陌' },
]

const celebSources = [
  { key: 'foreignAncient', label: '外国古代', color: '#6048a0', icon: '外' },
  { key: 'foreignModern', label: '外国现代', color: '#3058c0', icon: '今' },
  { key: 'chineseAncient', label: '中国古代', color: '#b8860b', icon: '古' },
  { key: 'chineseModern', label: '中国现代', color: '#c04040', icon: '中' },
]

const mirrorDefs = [
  { key: 'mystery', label: '玄', pinyin: 'Xuán', desc: '道的深不可测', color: '#2d3a5a' },
  { key: 'emptiness', label: '虚', pinyin: 'Xū', desc: '心性的空灵', color: '#3a6a5a' },
  { key: 'softness', label: '柔', pinyin: 'Róu', desc: '柔弱胜刚强', color: '#4a8a6a' },
  { key: 'return', label: '反', pinyin: 'Fǎn', desc: '道的循环运动', color: '#6a6040' },
  { key: 'spontaneity', label: '自然', pinyin: 'Zìrán', desc: '万物自化', color: '#3a6a4a' },
]

const sixFoldDefs = [
  { key: 'yiJing', label: '易经', color: '#b8860b', icon: '易' },
  { key: 'zhuangZi', label: '庄子', color: '#3a7a8a', icon: '庄' },
  { key: 'maoZeDong', label: '毛泽东思想', color: '#c04040', icon: '毛' },
  { key: 'confucian', label: '儒家', color: '#c06030', icon: '儒' },
  { key: 'chanZong', label: '禅宗', color: '#4a148c', icon: '禅' },
  { key: 'westernPhilosophy', label: '西方哲学', color: '#3058c0', icon: '西' },
]
</script>

<template>
  <div v-if="chapter" class="tao-bg min-h-screen">
    <!-- Reading progress -->
    <div class="reading-bar" :style="{ width: bar + '%' }" />

    <!-- Floating sidebar -->
    <aside class="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5 zen-hide">
      <button @click="toggleZen" class="w-8 h-8 rounded-full border flex items-center justify-center text-xs cursor-pointer transition-all"
        style="background: var(--color-surface); border-color: var(--color-border); color: var(--color-text-muted);"
        :title="zen ? '退出禅模式' : '禅模式'">Z</button>
      <button @click="decrease" class="w-8 h-8 rounded-full border flex items-center justify-center text-sm cursor-pointer transition-all"
        style="background: var(--color-surface); border-color: var(--color-border); color: var(--color-text-muted);">-</button>
      <button @click="increase" class="w-8 h-8 rounded-full border flex items-center justify-center text-sm cursor-pointer transition-all"
        style="background: var(--color-surface); border-color: var(--color-border); color: var(--color-text-muted);">+</button>
      <template v-for="id in ids" :key="id">
        <button v-if="chapter?.fiveMirrors || id !== 'fiveMirrors'"
          v-show="chapter?.sixFoldAnalysis || id !== 'sixFold'"
          @click="to(id)"
          class="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] cursor-pointer transition-all"
          :style="sect === id
            ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: '#fff' }
            : { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }"
          :title="sectionLabels[id]">
          {{ sectionChars[id] }}
        </button>
      </template>
    </aside>

    <!-- Content -->
    <article :class="[fontClass, 'content-width py-12 md:py-20']" style="padding-right: 5rem;">

      <!-- Header -->
      <div class="text-center mb-12">
        <div class="text-xs tracking-[0.3em] mb-3" style="color: var(--color-text-muted);">
          {{ chapter.id <= 37 ? '道经' : '德经' }} · {{ String(chapter.id).padStart(2, '0') }}/81
        </div>
        <h1 class="text-3xl md:text-4xl font-semibold tracking-[0.2em] mb-4" style="color: var(--color-text);">
          {{ chapter.title }}
        </h1>
        <p class="text-lg tracking-[0.1em] leading-relaxed" style="color: var(--color-text-secondary);">
          {{ chapter.subtitle }}
        </p>
        <div class="flex justify-center gap-4 mt-6 text-xs tracking-[0.1em]" style="color: var(--color-text-muted);">
          <span>{{ chapter.tags?.join(' · ') }}</span>
        </div>

        <!-- Prev/Next -->
        <div class="flex justify-between mt-8">
          <button v-if="prev" @click="go(prev.id)"
            class="text-sm tracking-[0.1em] cursor-pointer bg-transparent border-none transition-opacity hover:opacity-70"
            style="color: var(--color-text-muted);">
            ← 第{{ prev.id }}章
          </button>
          <div v-else />
          <button v-if="next" @click="go(next.id)"
            class="text-sm tracking-[0.1em] cursor-pointer bg-transparent border-none transition-opacity hover:opacity-70"
            style="color: var(--color-text-muted);">
            第{{ next.id }}章 →
          </button>
        </div>
      </div>

      <!-- Original -->
      <section id="original" class="section-paper">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold tracking-[0.15em]" style="color: var(--color-primary);">原文</h2>
          <button @click="copy(chapter.original, 'original')"
            class="text-xs cursor-pointer bg-transparent border px-2 py-1 rounded transition-all"
            style="color: var(--color-text-muted); border-color: var(--color-border);">
            {{ copied === 'original' ? '已复制' : '复制' }}
          </button>
        </div>
        <div class="sutra-text whitespace-pre-line" style="color: var(--color-text);">{{ chapter.original }}</div>
      </section>

      <!-- Essence -->
      <section id="essence" class="section-paper">
        <h2 class="text-lg font-semibold tracking-[0.15em] mb-4" style="color: var(--color-primary);">核心要义</h2>
        <div class="leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text);">{{ chapter.essence }}</div>
      </section>

      <!-- Five Mirrors -->
      <section v-if="chapter.fiveMirrors" id="fiveMirrors" class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.15em] mb-6 text-center" style="color: var(--color-text);">道门五镜</h2>
        <div class="flex flex-col gap-4">
          <div v-for="m in mirrorDefs" :key="m.key" class="mirror-card" :style="{ borderLeft: `4px solid ${m.color}` }">
            <div class="flex items-center gap-3 mb-3">
              <div class="mirror-icon" :style="{ background: m.color }">{{ m.label }}</div>
              <div>
                <div class="font-semibold tracking-[0.1em]" style="color: var(--color-text);">{{ m.pinyin }}</div>
                <div class="text-xs tracking-[0.05em]" style="color: var(--color-text-muted);">{{ m.desc }}</div>
              </div>
            </div>
            <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">
              {{ (chapter.fiveMirrors as any)[m.key] }}
            </div>
          </div>
        </div>
      </section>

      <!-- Scenarios -->
      <section id="scenarios" class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.15em] mb-6 text-center" style="color: var(--color-text);">当下体道</h2>
        <div class="flex flex-col gap-4">
          <div v-for="(s, i) in chapter.scenarios" :key="i" class="section-paper">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                   style="background: var(--color-primary);">{{ i + 1 }}</div>
              <div>
                <h3 class="text-base font-semibold mb-2 tracking-[0.05em]" style="color: var(--color-text);">{{ s.title }}</h3>
                <p class="text-sm leading-relaxed tracking-[0.04em]" style="color: var(--color-text-secondary);">{{ s.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- RuShiDao -->
      <section id="rushidao" class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.15em] mb-6 text-center" style="color: var(--color-text);">儒释道汇通</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="section-paper" style="border-left: 4px solid #c06030;">
            <h3 class="font-semibold tracking-[0.1em] mb-2" style="color: #c06030;">儒家</h3>
            <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">{{ chapter.ruShiDao.confucian }}</div>
          </div>
          <div class="section-paper" style="border-left: 4px solid #b8860b;">
            <h3 class="font-semibold tracking-[0.1em] mb-2" style="color: #b8860b;">佛家</h3>
            <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">{{ chapter.ruShiDao.buddhist }}</div>
          </div>
          <div class="section-paper" style="border-left: 4px solid #2d6a4a;">
            <h3 class="font-semibold tracking-[0.1em] mb-2" style="color: #2d6a4a;">道家</h3>
            <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">{{ chapter.ruShiDao.taoist }}</div>
          </div>
        </div>
      </section>

      <!-- Six Fold Analysis -->
      <section v-if="chapter.sixFoldAnalysis" id="sixFold" class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.15em] mb-6 text-center" style="color: var(--color-text);">六维分析</h2>
        <div class="six-grid">
          <div v-for="f in sixFoldDefs" :key="f.key" class="section-paper" :style="{ borderLeft: `4px solid ${f.color}` }">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">{{ f.icon }}</span>
              <h3 class="font-semibold tracking-[0.08em]" style="color: var(--color-text);">{{ f.label }}</h3>
            </div>
            <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">
              {{ (chapter.sixFoldAnalysis as any)[f.key] }}
            </div>
          </div>
        </div>
      </section>

      <!-- Celebrity Analysis -->
      <section v-if="chapter.celebrityAnalysis" id="celebrity" class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.15em] mb-6 text-center" style="color: var(--color-text);">古今中外 · 名人视角</h2>
        <div class="bento-grid">
          <div v-for="c in celebSources" :key="c.key" class="section-paper" :style="{ borderLeft: `4px solid ${c.color}` }">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">{{ c.icon }}</span>
              <h3 class="font-semibold tracking-[0.08em]" style="color: var(--color-text);">{{ c.label }}</h3>
            </div>
            <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">
              {{ (chapter.celebrityAnalysis as any)[c.key] }}
            </div>
          </div>
        </div>
      </section>

      <!-- Classics Bridge -->
      <section v-if="chapter.classicsBridge" id="classics" class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.15em] mb-6 text-center" style="color: var(--color-text);">四经融通</h2>
        <div class="bento-grid">
          <div v-for="s in classicSources" :key="s.key" class="section-paper" :style="{ borderLeft: `4px solid ${s.color}` }">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">{{ s.icon }}</span>
              <h3 class="font-semibold tracking-[0.08em]" style="color: var(--color-text);">{{ s.label }}</h3>
            </div>
            <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">
              {{ (chapter.classicsBridge as any)[s.key] || '此经与此章之对话，待深入参究。' }}
            </div>
          </div>
        </div>
      </section>

      <!-- Higher Dimension -->
      <section v-if="chapter.higherDimension" id="higher" class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.15em] mb-6 text-center" style="color: var(--color-text);">高维视角</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="d in dimSources" :key="d.key" class="section-paper" :style="{ borderLeft: `4px solid ${d.color}` }">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">{{ d.icon }}</span>
              <h3 class="font-semibold tracking-[0.08em]" style="color: var(--color-text);">{{ d.label }}</h3>
            </div>
            <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">
              {{ (chapter.higherDimension as any)[d.key] || '此维度待深入探索。' }}
            </div>
          </div>
        </div>
      </section>

      <!-- Wang Yangming -->
      <section v-if="chapter.wangYangming" id="wangYangming" class="section-paper" style="border-left: 4px solid #8b4513;">
        <h2 class="text-lg font-semibold tracking-[0.1em] mb-3" style="color: #8b4513;">王阳明心学</h2>
        <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">{{ chapter.wangYangming }}</div>
      </section>

      <!-- Huineng -->
      <section v-if="chapter.huineng" id="huineng" class="section-paper" style="border-left: 4px solid #4a148c;">
        <h2 class="text-lg font-semibold tracking-[0.1em] mb-3" style="color: #4a148c;">六祖慧能 · 禅道对话</h2>
        <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">{{ chapter.huineng }}</div>
      </section>

      <!-- Modern Masters -->
      <section v-if="chapter.modernMasters" id="modernMasters" class="section-paper" style="border-left: 4px solid #2a5a5a;">
        <h2 class="text-lg font-semibold tracking-[0.1em] mb-3" style="color: #2a5a5a;">近现代道家学者</h2>
        <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">{{ chapter.modernMasters }}</div>
      </section>

      <!-- Relationship Wisdom -->
      <section v-if="chapter.relationshipWisdom" id="relationships" class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.15em] mb-6 text-center" style="color: var(--color-text);">人伦修行</h2>
        <div class="bento-grid">
          <div v-for="r in relations" :key="r.key" class="section-paper" :style="{ borderLeft: `4px solid ${r.color}` }">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">{{ r.icon }}</span>
              <h3 class="font-semibold tracking-[0.08em]" style="color: var(--color-text);">{{ r.label }}</h3>
            </div>
            <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">
              {{ (chapter.relationshipWisdom as any)[r.key] }}
            </div>
          </div>
        </div>
      </section>

      <!-- Insights -->
      <section id="insights" class="section-paper">
        <h2 class="text-lg font-semibold tracking-[0.1em] mb-3" style="color: var(--color-primary);">修行感悟</h2>
        <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">{{ chapter.insights }}</div>
      </section>

      <!-- Modern Practice -->
      <section id="modern" class="section-paper">
        <h2 class="text-lg font-semibold tracking-[0.1em] mb-3" style="color: var(--color-primary);">现代修行指南</h2>
        <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">{{ chapter.modernPractice }}</div>
      </section>

      <!-- Meditation Guide -->
      <section v-if="chapter.meditationGuide" id="meditation" class="section-paper" style="border-left: 4px solid #4a8a6a;">
        <h2 class="text-lg font-semibold tracking-[0.1em] mb-3" style="color: #4a8a6a;">道门冥想引导</h2>
        <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line italic" style="color: var(--color-text-secondary);">{{ chapter.meditationGuide }}</div>
      </section>

      <!-- Energy Practice -->
      <section v-if="chapter.energyPractice" id="energy" class="section-paper" style="border-left: 4px solid #3a6a4a;">
        <h2 class="text-lg font-semibold tracking-[0.1em] mb-3" style="color: #3a6a4a;">能量实修</h2>
        <div class="text-sm leading-relaxed tracking-[0.04em] whitespace-pre-line" style="color: var(--color-text-secondary);">{{ chapter.energyPractice }}</div>
      </section>

      <!-- Awakening Insight -->
      <section v-if="chapter.awakeningInsight" class="text-center py-12">
        <div class="max-w-lg mx-auto px-8 py-6 rounded-xl" style="background: color-mix(in srgb, var(--color-primary) 5%, transparent); border: 1px solid var(--color-border);">
          <p class="text-xl leading-relaxed tracking-[0.1em] italic" style="color: var(--color-primary);">{{ chapter.awakeningInsight }}</p>
        </div>
      </section>

      <!-- Questions & Answers -->
      <section id="questions" class="mb-8">
        <h2 class="text-xl font-semibold tracking-[0.15em] mb-6 text-center" style="color: var(--color-text);">自省十问</h2>

        <template v-if="chapter.questionAnswers && chapter.questionAnswers.length > 0">
          <div v-for="(qa, i) in chapter.questionAnswers" :key="i" class="section-paper mb-4">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                   style="background: var(--color-primary);">{{ i + 1 }}</div>
              <p class="font-semibold tracking-[0.04em]" style="color: var(--color-text);">{{ qa.question }}</p>
            </div>
            <div class="text-sm leading-relaxed tracking-[0.04em] pl-10" style="color: var(--color-text-secondary);">{{ qa.answer }}</div>
          </div>
        </template>

        <template v-else>
          <div v-for="(q, i) in chapter.questions" :key="i" class="section-paper mb-3">
            <div class="flex items-start gap-3">
              <div class="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                   style="background: var(--color-primary);">{{ i + 1 }}</div>
              <p class="tracking-[0.04em]" style="color: var(--color-text);">{{ q }}</p>
            </div>
          </div>
        </template>
      </section>

      <!-- Creator Note -->
      <section v-if="chapter.creatorNote" id="creator" class="text-center py-12">
        <div class="gold-line w-48 mx-auto mb-8" />
        <h2 class="text-lg font-semibold tracking-[0.15em] mb-4" style="color: var(--color-text-muted);">创作者说</h2>
        <div class="max-w-lg mx-auto text-sm leading-relaxed tracking-[0.04em] italic whitespace-pre-line" style="color: var(--color-text-secondary);">
          {{ chapter.creatorNote }}
        </div>
      </section>

    </article>
  </div>

  <!-- Not Found -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="text-6xl mb-4 opacity-30">?</div>
      <p class="text-lg tracking-[0.1em]" style="color: var(--color-text-muted);">此章不存在</p>
      <button @click="router.push('/chapters')" class="mt-4 px-4 py-2 rounded-full text-sm cursor-pointer bg-transparent"
        style="color: var(--color-primary); border: 1px solid var(--color-border);">返回目录</button>
    </div>
  </div>
</template>
