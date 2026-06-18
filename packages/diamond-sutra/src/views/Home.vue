<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(false)
onMounted(() => { setTimeout(() => visible.value = true, 100) })

const scriptures = [
  {
    key: 'diamond',
    name: '金刚经',
    subtitle: 'Vajracchedikā Prajñāpāramitā',
    desc: '能断一切法，能破一切障。金刚般若，照见诸相非相。',
    color: '#b8860b',
    bg: 'rgba(184, 134, 11, 0.06)',
    border: 'rgba(184, 134, 11, 0.2)',
    light: '#d4a017',
  },
  {
    key: 'tao',
    name: '道德经',
    subtitle: 'Tao Te Ching',
    desc: '道可道非常道。无为而无不为，玄之又玄，众妙之门。',
    color: '#2d6a4a',
    bg: 'rgba(45, 106, 74, 0.06)',
    border: 'rgba(45, 106, 74, 0.2)',
    light: '#3d8a5f',
  },
  {
    key: 'yijing',
    name: '易经',
    subtitle: 'I Ching · Book of Changes',
    desc: '易有太极，是生两仪。六十四卦，观象玩辞，变易无穷。',
    color: '#8b4513',
    bg: 'rgba(139, 69, 19, 0.06)',
    border: 'rgba(139, 69, 19, 0.2)',
    light: '#a0522d',
  },
  {
    key: 'heart',
    name: '心经',
    subtitle: 'Prajñāpāramitā Hṛdaya',
    desc: '照见五蕴皆空，度一切苦厄。色即是空，空即是色。',
    color: '#c04040',
    bg: 'rgba(192, 64, 64, 0.06)',
    border: 'rgba(192, 64, 64, 0.2)',
    light: '#d46050',
  },
  {
    key: 'pure',
    name: '清静经',
    subtitle: 'Qing Jing Sutra',
    desc: '人能常清静，天地悉皆归。湛然常寂，寂无所寂。',
    color: '#3a7a8a',
    bg: 'rgba(58, 122, 138, 0.06)',
    border: 'rgba(58, 122, 138, 0.2)',
    light: '#4a9aaa',
  },
  {
    key: 'yin',
    name: '阴符经',
    subtitle: 'Yin Fu Sutra',
    desc: '观天之道，执天之行。宇宙在乎手，万化生乎身。',
    color: '#6048a0',
    bg: 'rgba(96, 72, 160, 0.06)',
    border: 'rgba(96, 72, 160, 0.2)',
    light: '#7a5ec0',
  },
  {
    key: 'higher',
    name: '高维智慧',
    subtitle: 'Higher Dimensions',
    desc: '量子与华严，物理与法界，多维融通，圆融无碍。',
    color: '#3058c0',
    bg: 'rgba(48, 88, 192, 0.06)',
    border: 'rgba(48, 88, 192, 0.2)',
    light: '#4070d8',
  },
  {
    key: 'wang',
    name: '王阳明心学',
    subtitle: 'Wang Yangming',
    desc: '心即理，致良知，知行合一。此心光明，亦复何言。',
    color: '#8b4513',
    bg: 'rgba(139, 69, 19, 0.06)',
    border: 'rgba(139, 69, 19, 0.2)',
    light: '#a0522d',
  },
  {
    key: 'huineng',
    name: '六祖慧能',
    subtitle: 'The Sixth Patriarch',
    desc: '本来无一物，何处惹尘埃。佛法在世间，不离世间觉。',
    color: '#4a148c',
    bg: 'rgba(74, 20, 140, 0.06)',
    border: 'rgba(74, 20, 140, 0.2)',
    light: '#6a1b9a',
  },
  {
    key: 'masters',
    name: '现代佛法师',
    subtitle: 'Modern Buddhist Masters',
    desc: '虚云·印光·一行·星云·圣严·证严·索达吉——当代大德智慧。',
    color: '#006064',
    bg: 'rgba(0, 96, 100, 0.06)',
    border: 'rgba(0, 96, 100, 0.2)',
    light: '#00838f',
  },
]

const features = [
  { t: '原典全文', d: '鸠摩罗什译本三十二品全文，一字不差，逐品深入', c: '#b8860b', icon: '经' },
  { t: '九脉融通', d: '六经·阳明心学·六祖坛经·现代法师，九脉融汇参究', c: '#6048a0', icon: '融' },
  { t: '现实场景', d: '两千年般若智慧映射当代生活，学以致用，当下受用', c: '#5a8a40', icon: '境' },
  { t: '儒释道汇通', d: '贯通三家根本智慧，参究心性之道的深层交汇', c: '#7048a0', icon: '通' },
  { t: '高维视角', d: '量子物理·传统宇宙观·大德实证，多维融通', c: '#3058c0', icon: '维' },
  { t: '圣贤问答', d: '每品十道自省之问，古今圣贤智慧作答，日日修行', c: '#c06030', icon: '问' },
  { t: '阳明心学', d: '心即理·致良知·知行合一，以心学智慧参悟金刚般若', c: '#8b4513', icon: '心' },
  { t: '六祖慧能', d: '本来无一物·何处惹尘埃，禅宗智慧直指人心', c: '#4a148c', icon: '禅' },
  { t: '现代法师', d: '虚云·印光·一行·星云·圣严·证严——当代大德开示', c: '#006064', icon: '师' },
]

const stats = [
  { v: '32', l: '品 目' },
  { v: '9', l: '脉 融 通' },
  { v: '5176', l: '字 原 文' },
  { v: '320', l: '道 问 答' },
]
</script>

<template>
  <div class="bg-paper">
    <!-- ═══════════ HERO — 能量门户 ═══════════ -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <!-- Glow orbs -->
      <div class="glow-orb glow-orb-warm w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] top-1/4 left-1/2 -translate-x-1/2" />
      <div class="glow-orb glow-orb-cool w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] top-2/3 left-1/4" />

      <!-- Mandala rings -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="absolute w-[min(90vw,800px)] h-[min(90vw,800px)] rounded-full border anim-spin-slow" style="border-color: rgba(180,130,30,0.05);" />
        <div class="absolute w-[min(70vw,620px)] h-[min(70vw,620px)] rounded-full border anim-spin-slow" style="border-color: rgba(48,88,192,0.06); animation-direction: reverse; animation-duration: 140s;" />
        <div class="absolute w-[min(50vw,440px)] h-[min(50vw,440px)] rounded-full border anim-spin-slow" style="border-color: rgba(96,72,160,0.06); animation-duration: 160s;" />
        <div class="absolute w-[min(30vw,260px)] h-[min(30vw,260px)] rounded-full border anim-spin-slow" style="border-color: rgba(184,134,11,0.08); animation-direction: reverse; animation-duration: 100s;" />
        <div class="absolute w-40 h-40 rounded-full anim-breathe blur-3xl" style="background: radial-gradient(circle, rgba(200,150,50,0.08), rgba(48,88,192,0.04), transparent);" />
      </div>

      <div class="relative z-10 text-center content-width py-24 sm:py-36">
        <!-- Ornament -->
        <div class="flex items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div class="gold-line w-12 sm:w-20" />
          <span class="text-[12px] sm:text-sm tracking-[0.5em] font-mono" style="color: #b8a080;">· 般 若 融 通 ·</span>
          <div class="gold-line w-12 sm:w-20" />
        </div>

        <!-- Subtitle -->
        <p class="text-[12px] sm:text-sm tracking-[0.4em] mb-6 transition-all duration-1000"
           style="color: #b8a080;"
           :style="{ opacity: visible ? 1 : 0 }">
          VAJRACCHEDIKĀ PRAJÑĀPĀRAMITĀ · 融通万象
        </p>

        <!-- Main title -->
        <h1 class="text-[clamp(2.925rem,7vw,7.125rem)] font-black tracking-[0.2em] mb-6 transition-all duration-1000 delay-100"
            :style="{ color: '#5a4020', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }">
          金 刚 经
        </h1>

        <p class="text-[clamp(1.125rem,2vw,1.625rem)] tracking-[0.4em] mb-3 transition-all duration-1000 delay-300"
           style="color: #8b6914;"
           :style="{ opacity: visible ? 1 : 0 }">
          金刚般若波罗蜜经
        </p>

        <p class="text-sm sm:text-base tracking-[0.3em] mb-16 transition-all duration-1000 delay-400"
           style="color: #b8a080;"
           :style="{ opacity: visible ? 1 : 0 }">
          能断金刚般若波罗蜜多经 · 九脉融通 · 明心见性
        </p>

        <!-- Core quote -->
        <div class="transition-all duration-1000 delay-600 mb-16"
             :style="{ opacity: visible ? 1 : 0 }">
          <p class="text-lg sm:text-xl tracking-widest leading-loose max-w-xl mx-auto italic" style="color: #5a4a30;">
            「凡所有相，皆是虚妄。<br/>若见诸相非相，即见如来。」
          </p>
          <p class="text-sm tracking-wider mt-4" style="color: #a09080;">— 《金刚经》第五品 · 如理实见分</p>
        </div>

        <!-- CTA buttons — 两部经典入口 -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-900"
             :style="{ opacity: visible ? 1 : 0 }">
          <button @click="router.push('/diamond')" class="btn-primary">
            金刚经 · 三十二品
          </button>
          <button @click="router.push('/tao')" class="btn-ghost" style="border-color: rgba(45,106,74,0.3); color: #2d6a4a;">
            道德经 · 八十一章
          </button>
          <button @click="router.push('/yijing')" class="btn-ghost" style="border-color: rgba(139,69,19,0.3); color: #8b4513;">
            易经 · 六十四卦
          </button>
        </div>

        <!-- Scroll hint -->
        <div class="mt-20 anim-breathe">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: rgba(180, 130, 30, 0.2);">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>

    <!-- ═══════════ 六经融通 CARDS ═══════════ -->
    <section class="py-20 sm:py-28 content-width">
      <div class="text-center mb-14 sm:mb-18">
        <h2 class="text-3xl sm:text-4xl tracking-[0.25em] font-bold" style="color: #5a4020;">九 脉 融 通</h2>
        <p class="text-base tracking-wider mt-3" style="color: #8a7a60;">一法通，万法通。九脉智慧，一心圆融。</p>
        <div class="gold-line-heavy w-32 mx-auto mt-6" />
      </div>

      <div class="bento-grid-3">
        <div v-for="(s, i) in scriptures" :key="s.key"
          class="scripture-card group"
          :style="{
            background: s.bg,
            borderColor: s.border,
            transitionDelay: `${i * 80}ms`,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: `all 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 80}ms`,
          }"
          @click="s.key === 'diamond' ? router.push('/diamond') : s.key === 'tao' ? router.push('/tao') : s.key === 'yijing' ? router.push('/yijing') : router.push('/diamond/1')">
          <!-- Header -->
          <div class="flex items-center gap-3 mb-5">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110"
                 :style="{ background: s.color, boxShadow: `0 2px 12px ${s.color}33` }">
              {{ s.name.charAt(0) }}
            </div>
            <div>
              <h3 class="text-lg font-semibold tracking-[0.15em]" :style="{ color: s.color }">{{ s.name }}</h3>
              <p class="text-[12px] tracking-[0.15em] font-mono mt-0.5" style="color: #b8a898;">{{ s.subtitle }}</p>
            </div>
          </div>

          <!-- Description -->
          <p class="text-base leading-relaxed tracking-wide" style="color: #5a4a30;">
            {{ s.desc }}
          </p>

          <!-- Bottom bar -->
          <div class="mt-5 h-0.5 rounded-full transition-all duration-300 opacity-30 group-hover:opacity-100"
               :style="{ background: s.color }" />
        </div>
      </div>
    </section>

    <!-- ═══════════ 系统特性 ═══════════ -->
    <section class="py-20 sm:py-28 content-width">
      <div class="text-center mb-14 sm:mb-18">
        <h2 class="text-3xl sm:text-4xl tracking-[0.25em] font-bold" style="color: #5a4020;">系 统 特 性</h2>
        <p class="text-base tracking-wider mt-3" style="color: #8a7a60;">融通万象，明心见性</p>
        <div class="gold-line-heavy w-32 mx-auto mt-6" />
      </div>

      <div class="bento-grid-3">
        <div v-for="(f, i) in features" :key="i"
          class="card card-hover" style="padding: 2rem;">
          <div class="w-11 h-11 rounded-lg flex items-center justify-center mb-5 text-base font-bold transition-transform duration-300 group-hover:scale-110"
               :style="{ background: `${f.c}14`, color: f.c }">
            {{ f.icon }}
          </div>
          <h3 class="text-xl font-semibold tracking-[0.15em] mb-3" style="color: #5a4020;">{{ f.t }}</h3>
          <p class="text-base leading-relaxed tracking-wide" style="color: #6b5d4a;">{{ f.d }}</p>
        </div>
      </div>
    </section>

    <!-- ═══════════ STATS + QUOTE ═══════════ -->
    <section class="py-16 sm:py-24 content-width">
      <!-- Stats card -->
      <div class="card text-center" style="padding: 3rem 2rem;">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          <div v-for="s in stats" :key="s.l">
            <div class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-3" style="background: linear-gradient(135deg, #8b6914, #d4a017, #3058c0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              {{ s.v }}
            </div>
            <div class="text-sm sm:text-base tracking-[0.3em]" style="color: #a09080;">{{ s.l }}</div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="mt-16 sm:mt-20 mx-auto text-center" style="max-width: 720px;">
        <p class="text-base sm:text-lg leading-loose tracking-wide" style="color: #5a4a30;">
          《金刚般若波罗蜜经》是般若经系列中最重要的经典之一。自姚秦鸠摩罗什三藏法师译为汉文，一千六百余年间启发无数修行者开悟见性。本系统将三十二品经文逐品呈现，融合道德经、心经、清静经、阴符经及高维智慧，以核心要义提炼、现实生活场景、儒释道三家汇通、历代大德修行感悟、现代实修指南，以及每品专属「日常十问」自省系统，将古老智慧转化为当代生活的实修指南。
        </p>
        <p class="text-base tracking-wider mt-6" style="color: #a09080;">
          愿以此功德，普及于一切。我等与众生，皆共成佛道。
        </p>
      </div>
    </section>
  </div>
</template>
