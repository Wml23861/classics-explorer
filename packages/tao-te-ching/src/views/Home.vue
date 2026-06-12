<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(false)
onMounted(() => { visible.value = true })

const features = [
  { title: '原典全文', desc: '王弼本为底本，关键处标注马王堆帛书、郭店楚简异文', icon: '经' },
  { title: '道门五镜', desc: '玄 · 虚 · 柔 · 反 · 自然 — 五重门径参究道体', icon: '镜' },
  { title: '六维对话', desc: '易经 / 庄子 / 毛 / 儒家 / 禅宗 / 西方哲学', icon: '维' },
  { title: '四经融通', desc: '与金刚经、论语、孙子兵法、庄子跨经典互参', icon: '融' },
  { title: '高维视角', desc: '宇宙生成论 / 系统科学 / 内证实修', icon: '宇' },
  { title: '古今中外', desc: '外国古今 / 中国古今 — 四位名人道心对话', icon: '名' },
  { title: '十问十答', desc: '每章十问，自省自照，将道化为日用', icon: '问' },
  { title: '道家功法', desc: '心斋 · 坐忘 · 守一 · 导引 — 传统功法的现代转化', icon: '修' },
]

const stats = [
  { value: '81', label: '章', desc: '道经三十七 · 德经四十四' },
  { value: '5',  label: '镜', desc: '玄虚柔反自然' },
  { value: '~5000', label: '言', desc: '五千言道德真经' },
  { value: '810', label: '问答', desc: '八十一路问道' },
]
</script>

<template>
  <div :class="{ 'opacity-100': visible, 'opacity-0': !visible }" class="transition-opacity duration-700">
    <!-- Hero -->
    <section class="tao-hero relative py-24 md:py-32 flex flex-col items-center text-center px-4">
      <div class="relative z-10 max-w-2xl">
        <!-- Subtle decorative circle -->
        <div class="mx-auto mb-10 w-20 h-20 rounded-full flex items-center justify-center"
             style="background: radial-gradient(circle, color-mix(in srgb, var(--color-primary) 20%, transparent), transparent 80%);">
          <span class="text-3xl font-bold" style="color: var(--color-primary);">道</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-semibold tracking-[0.25em] mb-6" style="color: var(--color-text); line-height: 1.3;">
          道 德 经
        </h1>

        <p class="text-xl md:text-2xl tracking-[0.15em] mb-10 italic leading-relaxed" style="color: var(--color-text-secondary);">
          "道可道，非常道；名可名，非常名"
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button @click="router.push('/chapters')"
            class="px-8 py-3 rounded-full text-base tracking-[0.12em] cursor-pointer border-none text-white font-medium transition-all duration-300 hover:opacity-90 shadow-lg"
            style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));">
            逐章参究 · 八十一章
          </button>
          <button @click="router.push('/chapter/1')"
            class="px-8 py-3 rounded-full text-base tracking-[0.12em] cursor-pointer bg-transparent font-medium transition-all duration-300"
            style="border: 1px solid var(--color-border); color: var(--color-primary);">
            直入第一章
          </button>
        </div>
      </div>
    </section>

    <!-- Features grid -->
    <section class="content-width py-16">
      <h2 class="text-center text-2xl font-semibold tracking-[0.2em] mb-12" style="color: var(--color-text);">道 门 参 究 系 统</h2>
      <div class="bento-grid">
        <div v-for="(f, i) in features" :key="i"
          class="card card-hover p-6 flex flex-col gap-3 fade-in-up"
          :style="{ animationDelay: `${i * 80}ms` }">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
               style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));">
            {{ f.icon }}
          </div>
          <h3 class="text-lg font-semibold tracking-[0.08em]" style="color: var(--color-text);">{{ f.title }}</h3>
          <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary);">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="content-width py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="s in stats" :key="s.label" class="text-center p-6 card">
          <div class="text-4xl md:text-5xl font-bold mb-2 text-jade-gradient tracking-[0.05em]">{{ s.value }}</div>
          <div class="text-sm tracking-[0.15em] font-semibold mb-1" style="color: var(--color-primary);">{{ s.label }}</div>
          <div class="text-xs" style="color: var(--color-text-muted);">{{ s.desc }}</div>
        </div>
      </div>
    </section>

    <!-- Bottom description -->
    <section class="content-width py-16 text-center">
      <div class="max-w-xl mx-auto">
        <p class="text-base leading-relaxed tracking-wide" style="color: var(--color-text-secondary);">
          道德经，五千言，八十一章。老子西出函谷，为尹喜留下这部千古不朽的智慧圣典。
          它以"道"为宗，以"德"为用，以"自然"为归——
          在这里，我们将逐章深入，以古今中外的多维视角，
          探寻那不可言说的玄妙之门。
        </p>
        <div class="mt-8">
          <button @click="router.push('/chapters')"
            class="px-8 py-3 rounded-full text-base tracking-[0.12em] cursor-pointer border-none text-white font-medium transition-all duration-300 hover:opacity-90 shadow-lg"
            style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));">
            开始逐章参究
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
