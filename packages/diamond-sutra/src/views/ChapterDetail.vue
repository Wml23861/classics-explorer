<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { chapters as diamondChapters } from '../data/index'
import { taoChapters } from '../data/tao-te-ching/index'

const route = useRoute()
const router = useRouter()

const sutraType = computed(() => (route.meta.sutra as string) || 'diamond')
const isDiamond = computed(() => sutraType.value === 'diamond')
const chapterList = computed(() => isDiamond.value ? diamondChapters : taoChapters)
const linkPrefix = computed(() => isDiamond.value ? '/diamond' : '/tao')

const chapterId = computed(() => parseInt(route.params.id as string))
const chapter = computed(() => chapterList.value.find(c => c.id === chapterId.value))
const prev = computed(() => chapterList.value.find(c => c.id === chapterId.value - 1))
const next = computed(() => chapterList.value.find(c => c.id === chapterId.value + 1))

const zen = ref(false)
function toggleZen() { zen.value = !zen.value; document.documentElement.classList.toggle('zen-mode', zen.value) }
onUnmounted(() => document.documentElement.classList.remove('zen-mode'))

const bar = ref(0)
function onScroll() { const h = document.documentElement; bar.value = (h.scrollHeight - h.clientHeight) > 0 ? Math.min((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100, 100) : 0 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const sect = ref('')
const ids = ['original', 'essence', 'fiveMirrors', 'scenarios', 'rushidao', 'fourFold', 'celebrity', 'classics', 'higher', 'wangYangming', 'huineng', 'modernMasters', 'relationships', 'insights', 'modern', 'meditation', 'energy', 'questions', 'creator']
function spy() { for (const id of [...ids].reverse()) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 160) { sect.value = id; break } } }
onMounted(() => window.addEventListener('scroll', spy, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', spy))

const time = computed(() => {
  if (!chapter.value) return ''
  const c = chapter.value
  const t = [c.original, c.essence, c.insights, c.modernPractice,
    ...c.scenarios.map(s => s.title + s.desc),
    c.ruShiDao.confucian, c.ruShiDao.buddhist, c.ruShiDao.taoist,
    c.wangYangming ?? '', c.huineng ?? '', c.modernMasters ?? '',
    c.relationshipWisdom?.romantic ?? '', c.relationshipWisdom?.family ?? '',
    c.relationshipWisdom?.friendship ?? '', c.relationshipWisdom?.strangers ?? '',
    c.meditationGuide ?? '', c.energyPractice ?? '', c.awakeningInsight ?? '', c.creatorNote ?? '',
    c.celebrityAnalysis?.foreignAncient ?? '', c.celebrityAnalysis?.foreignModern ?? '',
    c.celebrityAnalysis?.chineseAncient ?? '', c.celebrityAnalysis?.chineseModern ?? '',
  ]
  if (isDiamond.value) {
    t.push(
      c.classicsBridge?.taoTeChing ?? '', c.classicsBridge?.heartSutra ?? '',
      c.classicsBridge?.qingJingSutra ?? '', c.classicsBridge?.yinFuSutra ?? '',
      c.higherDimension?.physics ?? '', c.higherDimension?.cosmology ?? '', c.higherDimension?.empirical ?? '',
      c.fiveMirrors?.stillness ?? '', c.fiveMirrors?.purity ?? '', c.fiveMirrors?.reverence ?? '',
      c.fiveMirrors?.mirror ?? '', c.fiveMirrors?.realm ?? '',
      c.fourFoldAnalysis?.yiJing ?? '', c.fourFoldAnalysis?.zhuangZi ?? '',
      c.fourFoldAnalysis?.maoZeDong ?? '', c.fourFoldAnalysis?.chanZong ?? '',
    )
  } else {
    t.push(
      c.taoistClassicsBridge?.diamondSutra ?? '', c.taoistClassicsBridge?.analects ?? '',
      c.taoistClassicsBridge?.artOfWar ?? '', c.taoistClassicsBridge?.zhuangZi ?? '',
      c.taoistHigherDimension?.cosmogony ?? '', c.taoistHigherDimension?.systemsView ?? '', c.taoistHigherDimension?.empiricalPractice ?? '',
      c.taoistFiveMirrors?.mystery ?? '', c.taoistFiveMirrors?.emptiness ?? '', c.taoistFiveMirrors?.softness ?? '',
      c.taoistFiveMirrors?.return ?? '', c.taoistFiveMirrors?.spontaneity ?? '',
      c.sixFoldAnalysis?.yiJing ?? '', c.sixFoldAnalysis?.zhuangZi ?? '', c.sixFoldAnalysis?.maoZeDong ?? '',
      c.sixFoldAnalysis?.confucian ?? '', c.sixFoldAnalysis?.chanZong ?? '', c.sixFoldAnalysis?.westernPhilosophy ?? '',
    )
  }
  return `约 ${Math.ceil(t.join('').length / 450)} 分钟阅读`
})

const fs = ref(0)
function fSize(d: number) { fs.value = Math.max(-1, Math.min(2, fs.value + d)) }
const fClass = computed(() => ({ '-1': 'prose-sm', '0': 'prose-base', '1': 'prose-lg', '2': 'prose-xl' }[fs.value] || 'prose-base'))

function go(id: number) { router.push(`${linkPrefix.value}/${id}`); nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
function to(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' && prev.value) go(prev.value.id)
  else if (e.key === 'ArrowRight' && next.value) go(next.value.id)
  else if (e.key === 'z' && !e.ctrlKey && !e.metaKey) toggleZen()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

const copied = ref<string | null>(null)
function copy(t: string, id: string) { navigator.clipboard.writeText(t); copied.value = id; setTimeout(() => copied.value = null, 2000) }

const sectionLabels: Record<string, string> = {
  original: '原文', essence: '要义', fiveMirrors: '五镜', scenarios: '场景', rushidao: '汇通',
  fourFold: '四维', celebrity: '名人', classics: '融通', higher: '高维', wangYangming: '心学', huineng: '六祖',
  modernMasters: '法师', relationships: '人伦', insights: '感悟', modern: '现代',
  meditation: '冥想', energy: '能量', questions: '问答', creator: '创作者',
}
const sectionChars: Record<string, string> = {
  original: '原', essence: '义', fiveMirrors: '镜', scenarios: '境', rushidao: '通',
  fourFold: '四', celebrity: '名', classics: '融', higher: '维', wangYangming: '王', huineng: '慧',
  modernMasters: '师', relationships: '伦', insights: '悟', modern: '行',
  meditation: '静', energy: '能', questions: '问', creator: '明',
}

// Diamond classics bridge sources
const classicSources = [
  { key: 'taoTeChing', label: '道德经', color: '#2d6a4a', icon: '道' },
  { key: 'heartSutra', label: '心经', color: '#c04040', icon: '心' },
  { key: 'qingJingSutra', label: '清静经', color: '#3a7a8a', icon: '清' },
  { key: 'yinFuSutra', label: '阴符经', color: '#6048a0', icon: '符' },
]

// Taoist classics bridge sources
const taoClassicSources = [
  { key: 'diamondSutra', label: '金刚经', color: '#b8860b', icon: '金' },
  { key: 'analects', label: '论语', color: '#c04040', icon: '论' },
  { key: 'artOfWar', label: '孙子兵法', color: '#6048a0', icon: '兵' },
  { key: 'zhuangZi', label: '庄子', color: '#3a7a8a', icon: '庄' },
]

const dimSources = [
  { key: 'physics', label: '量子物理', color: '#3058c0', icon: '物' },
  { key: 'cosmology', label: '传统宇宙观', color: '#6048a0', icon: '宇' },
  { key: 'empirical', label: '大德实证', color: '#b8860b', icon: '证' },
]

const taoDimSources = [
  { key: 'cosmogony', label: '宇宙生成论', color: '#2d6a4a', icon: '宇' },
  { key: 'systemsView', label: '系统观', color: '#3a7a8a', icon: '系' },
  { key: 'empiricalPractice', label: '内证实修', color: '#3058c0', icon: '证' },
]
</script>

<template>
  <div v-if="chapter" class="bg-paper min-h-screen">
    <div class="reading-bar" :style="{ width: bar + '%' }" />

    <!-- FLOATING NAV DOTS -->
    <div class="fixed top-20 right-3 sm:right-5 z-40 flex flex-col gap-2 zen-hide">
      <button @click="toggleZen"
        class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-0"
        :style="zen ? { background: '#8b6914', color: '#fff' } : { background: '#fefcf7', color: '#8a7a60', border: '1px solid rgba(180,150,100,0.25)' }"
        title="禅读模式 (Z)">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
      <button @click="fSize(-1)"
        class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer border-0"
        style="background: #fefcf7; color: #8a7a60; border: 1px solid rgba(180,150,100,0.25);" title="缩小字号">A-</button>
      <button @click="fSize(1)"
        class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer border-0"
        style="background: #fefcf7; color: #8a7a60; border: 1px solid rgba(180,150,100,0.25);" title="放大字号">A+</button>
      <div class="w-8 h-px my-1" style="background: rgba(180,150,100,0.2);" />
      <button v-for="id in ids" :key="id" @click="to(id)"
        class="w-8 h-8 rounded-full flex items-center justify-center text-[12px] tracking-widest font-mono transition-all duration-300 cursor-pointer border-0"
        :style="sect === id ? { background: '#8b6914', color: '#fff' } : { background: '#fefcf7', color: '#a09080', border: '1px solid rgba(180,150,100,0.2)' }"
        :title="sectionLabels[id]">
        {{ sectionChars[id] }}
      </button>
    </div>

    <!-- HEADER -->
    <section class="relative pt-16 pb-10 sm:pt-28 sm:pb-16 content-width text-center zen-hide">
      <div class="mb-8 flex items-center justify-center gap-4">
        <div class="gold-line w-14" />
        <span class="text-[12px] tracking-[0.4em] font-mono" style="color: #b8a080;">{{ isDiamond ? '第' + chapter.id + '品' : (chapter.id <= 37 ? '道经 · 第' + chapter.id + '章' : '德经 · 第' + chapter.id + '章') }}</span>
        <div class="gold-line w-14" />
      </div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[0.2em] mb-6" style="color: #5a4020;">{{ chapter.title }}</h1>
      <p class="text-base sm:text-lg tracking-wider leading-relaxed italic max-w-2xl mx-auto" style="color: #6b5d4a;">{{ chapter.subtitle }}</p>
      <div class="flex items-center justify-center gap-5 mt-6">
        <span class="text-sm tracking-wider" style="color: #a09080;">{{ time }}</span>
        <span style="color: #c8b898;">·</span>
        <span class="text-sm tracking-wider" style="color: #a09080;">{{ chapter.original.length }} 字原文</span>
      </div>
      <div class="gold-line-heavy w-36 mx-auto mt-10" />
    </section>

    <!-- TOP NAV -->
    <div class="content-width mb-8 sm:mb-12 zen-hide">
      <div class="flex items-center justify-between">
        <button v-if="prev" @click="go(prev.id)"
          class="flex items-center gap-2 px-4 py-2 text-base tracking-wider cursor-pointer rounded-full transition-all duration-300 border-0"
          style="background: #fefcf7; color: #6b5d4a; border: 1px solid rgba(180,150,100,0.2);">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          {{ isDiamond ? '上一品' : '上一章' }}
        </button>
        <div v-else />
        <router-link :to="isDiamond ? '/diamond' : '/tao'" class="text-sm tracking-[0.2em] no-underline" style="color: #a09080;">返回目录</router-link>
        <button v-if="next" @click="go(next.id)"
          class="flex items-center gap-2 px-4 py-2 text-base tracking-wider cursor-pointer rounded-full transition-all duration-300 border-0"
          style="background: #fefcf7; color: #6b5d4a; border: 1px solid rgba(180,150,100,0.2);">
          {{ isDiamond ? '下一品' : '下一章' }}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>

    <div v-if="zen" class="text-center text-sm tracking-wider py-3" style="color: #c8b898;">← {{ isDiamond ? '上一品' : '上一章' }} | → {{ isDiamond ? '下一品' : '下一章' }} | Z 退出禅读</div>

    <!-- CONTENT BODY -->
    <div class="pb-32 sm:pb-40 content-width space-y-14 sm:space-y-20" :class="fClass">

      <!-- 1. 原文 -->
      <section id="original" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: #8b6914;" />
          <h2 class="section-header-title" style="color: #8b6914;">原 文</h2>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(180,130,30,0.15), transparent);" />
          <button @click="copy(chapter.original, 'original')" class="text-sm cursor-pointer bg-transparent border-none transition-colors ml-auto" :style="{ color: copied === 'original' ? '#5a8a40' : '#b8a080' }" title="复制">{{ copied === 'original' ? '✓ 已复制' : '复制' }}</button>
        </div>
        <div class="sutra-text space-y-4">
          <p v-for="(para, pi) in chapter.original.split('\n').filter(Boolean)" :key="pi" style="text-indent: 2em; margin-bottom: 1.25rem;">{{ para }}</p>
        </div>
        <div v-if="isDiamond" class="mt-10 pt-8 border-t" style="border-color: rgba(180,150,100,0.15);">
          <p class="text-sm tracking-[0.15em]" style="color: #a09080;">姚秦 · 三藏法师鸠摩罗什 译</p>
        </div>
        <div v-else class="mt-10 pt-8 border-t" style="border-color: rgba(180,150,100,0.15);">
          <p class="text-sm tracking-[0.15em]" style="color: #a09080;">春秋 · 老子 著</p>
        </div>
      </section>
      <div class="gold-line" />

      <!-- 2. 核心要义 -->
      <section id="essence" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: #b8860b;" />
          <h2 class="section-header-title" style="color: #b8860b;">核 心 要 义</h2>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(184,134,11,0.12), transparent);" />
        </div>
        <div class="sutra-text space-y-5">
          <p v-for="(para, pi) in chapter.essence.split('\n').filter(Boolean)" :key="pi">{{ para }}</p>
        </div>
      </section>
      <div class="gold-line" />

      <!-- 3. 五镜分析 — 金刚经: 静净敬镜境 -->
      <section v-if="isDiamond && chapter.fiveMirrors" id="fiveMirrors" class="section-paper" style="background: linear-gradient(135deg, #fefcf7 0%, rgba(139,105,20,0.02) 50%, rgba(48,88,192,0.02) 100%);">
        <div class="section-header">
          <div class="section-header-bar" style="background: linear-gradient(180deg, #3a7a8a, #b8860b, #8b4513, #3058c0, #6048a0);" />
          <h2 class="section-header-title" style="color: #8b6914;">五 镜 分 析</h2>
          <span class="section-header-subtitle">静 · 净 · 敬 · 镜 · 境 — 五重般若观照</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(139,105,20,0.15), transparent);" />
        </div>
        <div class="space-y-5">
          <div class="five-mirror-card" style="border-left: 4px solid #3a7a8a;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(58,122,138,0.1); color: #3a7a8a;">静</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #2c5a68;">内观寂静</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.fiveMirrors.stillness }}</p></div>
          <div class="five-mirror-card" style="border-left: 4px solid #b8860b;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(184,134,11,0.1); color: #b8860b;">净</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #8b6914;">心性清净</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.fiveMirrors.purity }}</p></div>
          <div class="five-mirror-card" style="border-left: 4px solid #8b4513;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(139,69,19,0.1); color: #8b4513;">敬</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #6b3410;">恭敬虔诚</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.fiveMirrors.reverence }}</p></div>
          <div class="five-mirror-card" style="border-left: 4px solid #3058c0;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(48,88,192,0.1); color: #3058c0;">镜</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #2048a0;">般若明镜</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.fiveMirrors.mirror }}</p></div>
          <div class="five-mirror-card" style="border-left: 4px solid #6048a0;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(96,72,160,0.1); color: #6048a0;">境</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #4838a0;">证悟境界</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.fiveMirrors.realm }}</p></div>
        </div>
      </section>

      <!-- 3b. 道门五镜 — 道德经: 玄虚柔反自然 -->
      <section v-if="!isDiamond && chapter.taoistFiveMirrors" id="fiveMirrors" class="section-paper" style="background: linear-gradient(135deg, #fefcf7 0%, rgba(45,106,74,0.02) 50%, rgba(58,122,138,0.02) 100%);">
        <div class="section-header">
          <div class="section-header-bar" style="background: linear-gradient(180deg, #2d3a5a, #3a6a5a, #4a8a6a, #6a6040, #3a6a4a);" />
          <h2 class="section-header-title" style="color: #2d6a4a;">道 门 五 镜</h2>
          <span class="section-header-subtitle">玄 · 虚 · 柔 · 反 · 自然 — 五重道门参究</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(45,106,74,0.15), transparent);" />
        </div>
        <div class="space-y-5">
          <div class="five-mirror-card" style="border-left: 4px solid #2d3a5a;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(45,58,90,0.1); color: #2d3a5a;">玄</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #2d3a5a;">道的深不可测</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.taoistFiveMirrors.mystery }}</p></div>
          <div class="five-mirror-card" style="border-left: 4px solid #3a6a5a;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(58,106,90,0.1); color: #3a6a5a;">虚</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #3a6a5a;">心性的空灵</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.taoistFiveMirrors.emptiness }}</p></div>
          <div class="five-mirror-card" style="border-left: 4px solid #4a8a6a;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(74,138,106,0.1); color: #4a8a6a;">柔</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #4a8a6a;">柔弱胜刚强</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.taoistFiveMirrors.softness }}</p></div>
          <div class="five-mirror-card" style="border-left: 4px solid #6a6040;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(106,96,64,0.1); color: #6a6040;">反</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #6a6040;">道的循环运动</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.taoistFiveMirrors.return }}</p></div>
          <div class="five-mirror-card" style="border-left: 4px solid #3a6a4a;"><div class="five-mirror-header"><div class="five-mirror-icon" style="background: rgba(58,106,74,0.1); color: #3a6a4a;">自然</div><h3 style="font-size: 1.175rem; font-weight: 700; letter-spacing: 0.15em; color: #3a6a4a;">万物自化</h3></div><p style="font-size: var(--text-body-sm); line-height: 2; color: #4a3a20; padding-left: 0.25rem;">{{ chapter.taoistFiveMirrors.spontaneity }}</p></div>
        </div>
      </section>
      <div v-if="chapter.fiveMirrors || chapter.taoistFiveMirrors" class="gold-line" />

      <!-- 3. 现实场景 -->
      <section id="scenarios" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: #5a8a40;" />
          <h2 class="section-header-title" style="color: #5a8a40;">现 实 场 景</h2>
          <span class="section-header-subtitle">{{ isDiamond ? '当代生活中的般若智慧' : '当代生活中的道家智慧' }}</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(90,138,64,0.1), transparent);" />
        </div>
        <div class="space-y-4">
          <div v-for="(sc, si) in chapter.scenarios" :key="si" class="numbered-item">
            <div class="numbered-badge" style="background: rgba(90,138,64,0.08); color: #5a8a40;">{{ si + 1 }}</div>
            <div class="flex-1">
              <h4 style="font-size: var(--text-body-sm); font-weight: 600; letter-spacing: 0.12em; margin-bottom: 0.5rem; color: #4a7030;">{{ sc.title }}</h4>
              <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ sc.desc }}</p>
            </div>
          </div>
        </div>
      </section>
      <div class="gold-line" />

      <!-- 4. 儒释道汇通 -->
      <section id="rushidao" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: #7048a0;" />
          <h2 class="section-header-title" style="color: #7048a0;">儒 释 道 汇 通</h2>
          <span class="section-header-subtitle">三家智慧的交汇与互照</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(112,72,160,0.1), transparent);" />
        </div>
        <div class="space-y-4">
          <div v-if="chapter.ruShiDao.confucian" class="numbered-item" style="border-left: 3px solid rgba(176,80,80,0.3);">
            <div class="numbered-badge" style="background: rgba(176,80,80,0.08); color: #b05050;">儒</div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30; padding-top: 0.25rem;">{{ chapter.ruShiDao.confucian }}</p>
          </div>
          <div v-if="chapter.ruShiDao.buddhist" class="numbered-item" style="border-left: 3px solid rgba(184,134,11,0.3);">
            <div class="numbered-badge" style="background: rgba(184,134,11,0.08); color: #b8860b;">释</div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30; padding-top: 0.25rem;">{{ chapter.ruShiDao.buddhist }}</p>
          </div>
          <div v-if="chapter.ruShiDao.taoist" class="numbered-item" style="border-left: 3px solid rgba(90,138,64,0.3);">
            <div class="numbered-badge" style="background: rgba(90,138,64,0.08); color: #5a8a40;">道</div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30; padding-top: 0.25rem;">{{ chapter.ruShiDao.taoist }}</p>
          </div>
        </div>
      </section>
      <div class="gold-line" />

      <!-- 4.5 四维分析 — 金刚经专用 -->
      <section v-if="isDiamond && chapter.fourFoldAnalysis" id="fourFold" class="section-paper" style="background: linear-gradient(135deg, #fefcf7 0%, rgba(139,105,20,0.02) 50%, rgba(48,88,192,0.02) 100%);">
        <div class="section-header">
          <div class="section-header-bar" style="background: linear-gradient(180deg, #2d6a4a, #c04040, #8b6914, #4a148c);" />
          <h2 class="section-header-title" style="color: #5a4020;">四 维 分 析</h2>
          <span class="section-header-subtitle">易经 · 庄子 · 毛泽东思想 · 禅宗</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(90,64,32,0.1), transparent);" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #2d6a4a;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #2d6a4a;">易</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #2d6a4a; letter-spacing: 0.1em;">易 经</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.fourFoldAnalysis.yiJing }}</p></div>
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #c04040;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #c04040;">庄</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #c04040; letter-spacing: 0.1em;">庄 子</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.fourFoldAnalysis.zhuangZi }}</p></div>
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #8b6914;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #8b6914;">毛</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #8b6914; letter-spacing: 0.1em;">毛 泽 东 思 想</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.fourFoldAnalysis.maoZeDong }}</p></div>
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #4a148c;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #4a148c;">禅</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #4a148c; letter-spacing: 0.1em;">禅 宗</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.fourFoldAnalysis.chanZong }}</p></div>
        </div>
      </section>

      <!-- 4.5b 六维分析 — 道德经专用 -->
      <section v-if="!isDiamond && chapter.sixFoldAnalysis" id="fourFold" class="section-paper" style="background: linear-gradient(135deg, #fefcf7 0%, rgba(45,106,74,0.02) 50%, rgba(48,88,192,0.02) 100%);">
        <div class="section-header">
          <div class="section-header-bar" style="background: linear-gradient(180deg, #2d6a4a, #3a7a8a, #c04040, #c06030, #4a148c, #3058c0);" />
          <h2 class="section-header-title" style="color: #5a4020;">六 维 分 析</h2>
          <span class="section-header-subtitle">易经 · 庄子 · 毛泽东思想 · 儒家 · 禅宗 · 西方哲学</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(90,64,32,0.1), transparent);" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #b8860b;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #b8860b;">易</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #b8860b; letter-spacing: 0.1em;">易 经</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.sixFoldAnalysis.yiJing }}</p></div>
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #3a7a8a;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #3a7a8a;">庄</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #3a7a8a; letter-spacing: 0.1em;">庄 子</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.sixFoldAnalysis.zhuangZi }}</p></div>
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #c04040;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #c04040;">毛</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #c04040; letter-spacing: 0.1em;">毛泽东思想</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.sixFoldAnalysis.maoZeDong }}</p></div>
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #c06030;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #c06030;">儒</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #c06030; letter-spacing: 0.1em;">儒 家</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.sixFoldAnalysis.confucian }}</p></div>
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #4a148c;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #4a148c;">禅</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #4a148c; letter-spacing: 0.1em;">禅 宗</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.sixFoldAnalysis.chanZong }}</p></div>
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #3058c0;"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #3058c0;">西</div><h3 style="font-size: 1.125rem; font-weight: 700; color: #3058c0; letter-spacing: 0.1em;">西方哲学</h3></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.sixFoldAnalysis.westernPhilosophy }}</p></div>
        </div>
      </section>
      <div v-if="chapter.fourFoldAnalysis || chapter.sixFoldAnalysis" class="gold-line" />

      <!-- 4.6 名人分析 — 古今中外名人视角 -->
      <section v-if="chapter.celebrityAnalysis" id="celebrity" class="section-paper" style="background: linear-gradient(135deg, #fefcf7 0%, rgba(139,105,20,0.02) 50%, rgba(192,64,64,0.02) 100%);">
        <div class="section-header">
          <div class="section-header-bar" style="background: linear-gradient(180deg, #3058c0, #8b4513, #c04040, #2d6a4a);" />
          <h2 class="section-header-title" style="color: #5a4020;">名 人 视 角</h2>
          <span class="section-header-subtitle">外国古代 · 外国现代 · 中国古代 · 中国现代</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(90,64,32,0.1), transparent);" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- 外国古代名人 -->
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #3058c0;">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #3058c0;">外</div>
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #3058c0; letter-spacing: 0.1em;">外 国 古 代</h3>
              <span style="font-size: 0.825rem; color: #a09080; letter-spacing: 0.1em;">苏格拉底 · 奥勒留 · 柏拉图</span>
            </div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.celebrityAnalysis.foreignAncient }}</p>
          </div>

          <!-- 外国现代名人 -->
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #8b4513;">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #8b4513;">外</div>
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #8b4513; letter-spacing: 0.1em;">外 国 现 代</h3>
              <span style="font-size: 0.825rem; color: #a09080; letter-spacing: 0.1em;">荣格 · 弗兰克尔 · 爱因斯坦</span>
            </div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.celebrityAnalysis.foreignModern }}</p>
          </div>

          <!-- 中国古代名人 -->
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #c04040;">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #c04040;">中</div>
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #c04040; letter-spacing: 0.1em;">中 国 古 代</h3>
              <span style="font-size: 0.825rem; color: #a09080; letter-spacing: 0.1em;">孔子 · 老子 · 诸葛亮 · 王阳明</span>
            </div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.celebrityAnalysis.chineseAncient }}</p>
          </div>

          <!-- 中国现代名人 -->
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #2d6a4a;">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background: #2d6a4a;">中</div>
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #2d6a4a; letter-spacing: 0.1em;">中 国 现 代</h3>
              <span style="font-size: 0.825rem; color: #a09080; letter-spacing: 0.1em;">鲁迅 · 南怀瑾 · 钱钟书</span>
            </div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.celebrityAnalysis.chineseModern }}</p>
          </div>
        </div>
      </section>
      <div v-if="chapter.celebrityAnalysis" class="gold-line" />

      <!-- 5. 多经融通 — Diamond version -->
      <section v-if="isDiamond" id="classics" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: linear-gradient(180deg, #b8860b, #2d6a4a, #c04040, #6048a0);" />
          <h2 class="section-header-title" style="color: #6048a0;">多 经 融 通</h2>
          <span class="section-header-subtitle">以金刚经为体，融汇经典智慧</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(96,72,160,0.1), transparent);" />
        </div>
        <div v-if="chapter.classicsBridge" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="src in classicSources" :key="src.key" v-show="(chapter.classicsBridge as any)[src.key]" class="card card-hover" style="padding: 1.5rem;"><div class="flex items-center gap-3 mb-4"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" :style="{ background: src.color }">{{ src.icon }}</div><span class="text-base font-semibold tracking-[0.15em]" :style="{ color: src.color }">{{ src.label }}</span></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ (chapter.classicsBridge as any)[src.key] }}</p></div>
        </div>
        <div v-else class="text-center py-8"><p class="text-base tracking-wider" style="color: #a09080;">此品融通内容正在精心编撰中，敬请期待。</p></div>
      </section>

      <!-- 5b. 四经融通 — Taoist version -->
      <section v-if="!isDiamond" id="classics" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: linear-gradient(180deg, #b8860b, #c04040, #6048a0, #3a7a8a);" />
          <h2 class="section-header-title" style="color: #2d6a4a;">四 经 融 通</h2>
          <span class="section-header-subtitle">金刚经 · 论语 · 孙子兵法 · 庄子</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(45,106,74,0.1), transparent);" />
        </div>
        <div v-if="chapter.taoistClassicsBridge" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="src in taoClassicSources" :key="src.key" v-show="(chapter.taoistClassicsBridge as any)[src.key]" class="card card-hover" style="padding: 1.5rem;"><div class="flex items-center gap-3 mb-4"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" :style="{ background: src.color }">{{ src.icon }}</div><span class="text-base font-semibold tracking-[0.15em]" :style="{ color: src.color }">{{ src.label }}</span></div><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ (chapter.taoistClassicsBridge as any)[src.key] }}</p></div>
        </div>
        <div v-else class="text-center py-8"><p class="text-base tracking-wider" style="color: #a09080;">此章融通内容正在精心编撰中，敬请期待。</p></div>
      </section>
      <div class="gold-line" />

      <!-- 6. 高维视角 — Diamond version -->
      <section v-if="isDiamond" id="higher" class="section-paper">
        <div class="section-header"><div class="section-header-bar" style="background: linear-gradient(180deg, #3058c0, #6048a0, #b8860b);" /><h2 class="section-header-title" style="color: #3058c0;">高 维 视 角</h2><span class="section-header-subtitle">量子物理 · 传统宇宙观 · 大德实证</span><div class="section-header-line" style="background: linear-gradient(90deg, rgba(48,88,192,0.1), transparent);" /></div>
        <div v-if="chapter.higherDimension" class="space-y-4">
          <div v-for="ds in dimSources" :key="ds.key" v-show="(chapter.higherDimension as any)[ds.key]" class="numbered-item" :style="{ borderLeft: `3px solid ${ds.color}33` }"><div class="numbered-badge" :style="{ background: `${ds.color}14`, color: ds.color }">{{ ds.icon }}</div><div><h4 style="font-size: var(--text-body-sm); font-weight: 600; letter-spacing: 0.12em; margin-bottom: 0.5rem;" :style="{ color: ds.color }">{{ ds.label }}</h4><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ (chapter.higherDimension as any)[ds.key] }}</p></div></div>
        </div>
        <div v-else class="text-center py-8"><p class="text-base tracking-wider" style="color: #a09080;">此品高维视角内容正在精心编撰中，敬请期待。</p></div>
      </section>

      <!-- 6b. 高维视角 — Taoist version -->
      <section v-if="!isDiamond" id="higher" class="section-paper">
        <div class="section-header"><div class="section-header-bar" style="background: linear-gradient(180deg, #2d6a4a, #3a7a8a, #3058c0);" /><h2 class="section-header-title" style="color: #2d6a4a;">高 维 视 角</h2><span class="section-header-subtitle">宇宙生成论 · 系统观 · 内证实修</span><div class="section-header-line" style="background: linear-gradient(90deg, rgba(45,106,74,0.1), transparent);" /></div>
        <div v-if="chapter.taoistHigherDimension" class="space-y-4">
          <div v-for="ds in taoDimSources" :key="ds.key" v-show="(chapter.taoistHigherDimension as any)[ds.key]" class="numbered-item" :style="{ borderLeft: `3px solid ${ds.color}33` }"><div class="numbered-badge" :style="{ background: `${ds.color}14`, color: ds.color }">{{ ds.icon }}</div><div><h4 style="font-size: var(--text-body-sm); font-weight: 600; letter-spacing: 0.12em; margin-bottom: 0.5rem;" :style="{ color: ds.color }">{{ ds.label }}</h4><p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ (chapter.taoistHigherDimension as any)[ds.key] }}</p></div></div>
        </div>
        <div v-else class="text-center py-8"><p class="text-base tracking-wider" style="color: #a09080;">此章高维视角内容正在精心编撰中，敬请期待。</p></div>
      </section>
      <div class="gold-line" />

      <!-- 7. 王阳明心学 -->
      <section v-if="chapter.wangYangming" id="wangYangming" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: #8b4513;" />
          <h2 class="section-header-title" style="color: #8b4513;">王 阳 明 心 学</h2>
          <span class="section-header-subtitle">致良知 · 知行合一</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(139,69,19,0.1), transparent);" />
        </div>
        <div class="sutra-text space-y-5">
          <p v-for="(para, pi) in chapter.wangYangming.split('\n').filter(Boolean)" :key="pi">{{ para }}</p>
        </div>
      </section>
      <div v-if="chapter.wangYangming" class="gold-line" />

      <!-- 8. 六祖慧能 -->
      <section v-if="chapter.huineng" id="huineng" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: #4a148c;" />
          <h2 class="section-header-title" style="color: #4a148c;">六 祖 慧 能</h2>
          <span class="section-header-subtitle">本来无一物 · 何处惹尘埃</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(74,20,140,0.1), transparent);" />
        </div>
        <div class="sutra-text space-y-5">
          <p v-for="(para, pi) in chapter.huineng.split('\n').filter(Boolean)" :key="pi">{{ para }}</p>
        </div>
      </section>
      <div v-if="chapter.huineng" class="gold-line" />

      <!-- 9. 现代大师/学者 -->
      <section v-if="chapter.modernMasters" id="modernMasters" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" :style="{ background: isDiamond ? '#006064' : '#2a5a5a' }" />
          <h2 class="section-header-title" :style="{ color: isDiamond ? '#006064' : '#2a5a5a' }">{{ isDiamond ? '现 代 佛 法 师' : '近 现 代 道 家 学 者' }}</h2>
          <span class="section-header-subtitle">{{ isDiamond ? '当代大德的智慧开示' : '道家思想的当代传承与发扬' }}</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(0,96,100,0.1), transparent);" />
        </div>
        <div class="sutra-text space-y-5">
          <p v-for="(para, pi) in chapter.modernMasters.split('\n').filter(Boolean)" :key="pi">{{ para }}</p>
        </div>
      </section>
      <div v-if="chapter.modernMasters" class="gold-line" />

      <!-- 10. 人伦修行 — 四种关系中的般若智慧 -->
      <section v-if="chapter.relationshipWisdom" id="relationships" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: linear-gradient(180deg, #e91e63, #ff9800, #4caf50, #607d8b);" />
          <h2 class="section-header-title" style="color: #c04040;">人 伦 修 行</h2>
          <span class="section-header-subtitle">以本品智慧观照世间一切关系</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(192,64,64,0.1), transparent);" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- 爱情 -->
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #e91e63;">
            <div class="flex items-center gap-2 mb-3">
              <span style="font-size: 1.375rem;">💗</span>
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #c2185b; letter-spacing: 0.1em;">爱 情 篇</h3>
              <span style="font-size: 0.825rem; color: #a09080; letter-spacing: 0.1em;">女友·妻子·伴侣</span>
            </div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.relationshipWisdom.romantic }}</p>
          </div>

          <!-- 亲情 -->
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #ff9800;">
            <div class="flex items-center gap-2 mb-3">
              <span style="font-size: 1.375rem;">🧡</span>
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #e65100; letter-spacing: 0.1em;">亲 情 篇</h3>
              <span style="font-size: 0.825rem; color: #a09080; letter-spacing: 0.1em;">儿女·父母·兄弟姐妹</span>
            </div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.relationshipWisdom.family }}</p>
          </div>

          <!-- 友情 -->
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #4caf50;">
            <div class="flex items-center gap-2 mb-3">
              <span style="font-size: 1.375rem;">💚</span>
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #2e7d32; letter-spacing: 0.1em;">友 情 篇</h3>
              <span style="font-size: 0.825rem; color: #a09080; letter-spacing: 0.1em;">朋友·同事·知己</span>
            </div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.relationshipWisdom.friendship }}</p>
          </div>

          <!-- 陌生人 -->
          <div class="card card-hover" style="padding: 1.5rem; border-left: 3px solid #607d8b;">
            <div class="flex items-center gap-2 mb-3">
              <span style="font-size: 1.375rem;">💙</span>
              <h3 style="font-size: 1.125rem; font-weight: 700; color: #37474f; letter-spacing: 0.1em;">陌 路 篇</h3>
              <span style="font-size: 0.825rem; color: #a09080; letter-spacing: 0.1em;">好人·坏人·善人·恶人</span>
            </div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #5a4a30;">{{ chapter.relationshipWisdom.strangers }}</p>
          </div>
        </div>
      </section>
      <div v-if="chapter.relationshipWisdom" class="gold-line" />

      <!-- 11. 修行感悟 -->
      <section id="insights" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: #b05050;" />
          <h2 class="section-header-title" style="color: #b05050;">修 行 感 悟</h2>
          <span class="section-header-subtitle">{{ isDiamond ? '历代大德行者证悟心得' : '历代道门学者参悟心得' }}</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(176,80,80,0.08), transparent);" />
        </div>
        <div class="sutra-text space-y-5">
          <p v-for="(para, pi) in chapter.insights.split('\n').filter(Boolean)" :key="pi">{{ para }}</p>
        </div>
      </section>
      <div class="gold-line" />

      <!-- 11. 现代修行指南 -->
      <section id="modern" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: #3078a0;" />
          <h2 class="section-header-title" style="color: #3078a0;">现 代 修 行 指 南</h2>
          <span class="section-header-subtitle">如何在当代生活中修行此品</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(48,120,160,0.1), transparent);" />
        </div>
        <div class="sutra-text space-y-5">
          <p v-for="(para, pi) in chapter.modernPractice.split('\n').filter(Boolean)" :key="pi">{{ para }}</p>
        </div>
      </section>
      <div class="gold-line" />

      <!-- 12. 冥想引导 -->
      <section v-if="chapter.meditationGuide" id="meditation" class="section-paper" style="background: linear-gradient(135deg, #fefcf7 0%, rgba(58,122,138,0.03) 100%);">
        <div class="section-header">
          <div class="section-header-bar" style="background: #3a7a8a;" />
          <h2 class="section-header-title" style="color: #3a7a8a;">冥 想 引 导</h2>
          <span class="section-header-subtitle">静心内观，与本品智慧相应</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(58,122,138,0.1), transparent);" />
        </div>
        <div class="sutra-text space-y-4" style="font-style: italic;">
          <p v-for="(para, pi) in chapter.meditationGuide.split('\n').filter(Boolean)" :key="pi">{{ para }}</p>
        </div>
      </section>
      <div v-if="chapter.meditationGuide" class="gold-line" />

      <!-- 13. 能量实修 -->
      <section v-if="chapter.energyPractice" id="energy" class="section-paper" style="background: linear-gradient(135deg, #fefcf7 0%, rgba(48,88,192,0.03) 100%);">
        <div class="section-header">
          <div class="section-header-bar" style="background: #3058c0;" />
          <h2 class="section-header-title" style="color: #3058c0;">能 量 实 修</h2>
          <span class="section-header-subtitle">将经文智慧化为身心能量</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(48,88,192,0.1), transparent);" />
        </div>
        <div class="sutra-text space-y-4">
          <p v-for="(para, pi) in chapter.energyPractice.split('\n').filter(Boolean)" :key="pi">{{ para }}</p>
        </div>
      </section>
      <div v-if="chapter.energyPractice" class="gold-line" />

      <!-- 14. 明心见性 -->
      <section v-if="chapter.awakeningInsight" class="text-center py-10 sm:py-14" style="margin:10px">
        <div class="gold-line-heavy w-32 mx-auto mb-8" />
        <div class="inline-block px-8 py-6 rounded-2xl" style="padding:10px;background: linear-gradient(135deg, rgba(184,134,11,0.06), rgba(48,88,192,0.04)); border: 1px solid rgba(184,134,11,0.15);">
          <p class="text-sm tracking-[0.4em] mb-3" style="color: #b8a080;">明 心 见 性</p>
          <p class="text-xl sm:text-2xl tracking-widest leading-relaxed font-semibold" style="color: #5a4020;">{{ chapter.awakeningInsight }}</p>
        </div>
        <div class="gold-line-heavy w-32 mx-auto mt-8" />
      </section>
      <div v-if="chapter.awakeningInsight" class="gold-line" />

      <!-- 15. 日常十问 -- 含圣贤回答 -->
      <section id="questions" class="section-paper">
        <div class="section-header">
          <div class="section-header-bar" style="background: #c08040;" />
          <h2 class="section-header-title" style="color: #c08040;">日 常 十 问</h2>
          <span class="section-header-subtitle">以此十问，日日自省 · 圣贤智慧，如法作答</span>
          <div class="section-header-line" style="background: linear-gradient(90deg, rgba(192,128,64,0.1), transparent);" />
        </div>

        <!-- with answers -->
        <div v-if="chapter.questionAnswers?.length" class="space-y-4">
          <div v-for="(qa, qi) in chapter.questionAnswers" :key="qi"
            class="card card-hover" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <div class="flex items-start gap-4">
              <div class="numbered-badge" style="background: rgba(192,128,64,0.08); color: #c08040; min-width: 2.25rem;">{{ qi + 1 }}</div>
              <p style="font-size: var(--text-body); font-weight: 600; color: #2c2416; line-height: 1.9; padding-top: 0.125rem;">{{ qa.question }}</p>
            </div>
            <div class="answer-block" style="margin-left: 3.25rem;">
              <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #4a3a20;">{{ qa.answer }}</p>
            </div>
          </div>
        </div>

        <!-- fallback: questions only -->
        <div v-else class="space-y-3">
          <div v-for="(q, qi) in chapter.questions" :key="qi" class="numbered-item">
            <div class="numbered-badge" style="background: rgba(192,128,64,0.08); color: #c08040;">{{ qi + 1 }}</div>
            <p style="font-size: var(--text-body-sm); line-height: 1.9; color: #2c2416; padding-top: 0.125rem;">{{ q }}</p>
          </div>
        </div>
      </section>
    </div>

    <!-- 16. 创作者说 -->
    <section v-if="chapter.creatorNote" id="creator" class="content-width py-8 sm:py-10 zen-hide">
      <div class="card" style="padding: 1.5rem 2rem; border-left: 3px solid #b8860b; background: linear-gradient(135deg, rgba(184,134,11,0.04), rgba(48,88,192,0.02)); border-radius: 0.75rem;">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
               style="background: linear-gradient(135deg, #d4a017, #b8860b); box-shadow: 0 2px 8px rgba(184,134,11,0.2);">
            王
          </div>
          <span style="font-size: 1rem; font-weight: 700; color: #8b6914; letter-spacing: 0.2em;">创 作 者 说</span>
        </div>
        <p style="font-size: var(--text-body-sm); line-height: 2; color: #5a4a30; font-style: italic;">{{ chapter.creatorNote }}</p>
      </div>
    </section>
    <div v-if="chapter.creatorNote" class="gold-line" />

    <!-- BOTTOM NAV -->
    <div class="content-width pb-20 sm:pb-28 zen-hide">
      <div class="gold-line-heavy mb-12" />
      <div class="flex items-center justify-between">
        <button v-if="prev" @click="go(prev.id)"
          class="group flex flex-col items-start gap-1.5 px-4 py-3 text-left rounded-xl transition-all duration-300 cursor-pointer bg-transparent border-none">
          <span class="text-sm tracking-wider" style="color: #a09080;">← {{ isDiamond ? '上一品' : '上一章' }}</span>
          <span class="text-base tracking-wider transition-colors" style="color: #6b5d4a;">{{ prev.title }}</span>
        </button>
        <router-link :to="isDiamond ? '/diamond' : '/tao'" class="text-sm tracking-[0.2em] no-underline" style="color: #a09080;">返回目录</router-link>
        <button v-if="next" @click="go(next.id)"
          class="group flex flex-col items-end gap-1.5 px-4 py-3 text-right rounded-xl transition-all duration-300 cursor-pointer bg-transparent border-none">
          <span class="text-sm tracking-wider" style="color: #a09080;">{{ isDiamond ? '下一品' : '下一章' }} →</span>
          <span class="text-base tracking-wider transition-colors" style="color: #6b5d4a;">{{ next.title }}</span>
        </button>
      </div>
      <div class="mt-10 flex justify-center gap-2 flex-wrap">
        <span v-for="tag in chapter.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>

  <!-- NOT FOUND -->
  <div v-else class="min-h-screen flex items-center justify-center bg-paper">
    <div class="text-center">
      <div class="text-8xl font-black mb-4" style="color: #8b6914;">?</div>
      <p class="tracking-wider mb-8" style="color: #6b5d4a;">此品不存在</p>
      <router-link to="/" class="inline-block px-6 py-3 text-base tracking-wider no-underline rounded-full transition-all duration-300" style="color: #8b6914; background: #fefcf7; border: 1px solid rgba(180,130,30,0.2);">返回首页</router-link>
    </div>
  </div>
</template>

<style scoped>
.five-mirror-card {
  padding: 1.5rem 1.75rem;
  border-radius: 0.75rem;
  background: #fefcf7;
  transition: all 0.3s ease;
}
.five-mirror-card:hover {
  background: #fdf9f0;
  transform: translateX(2px);
}
.five-mirror-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.five-mirror-icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}
</style>
