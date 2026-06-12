<!--
 * @Author: 王明龙
 * @Date: 2026-05-18 09:30:21
 * @LastEditTime: 2026-05-18 17:29:45
 * @Description: 
-->
<script setup lang="ts">
const year = new Date().getFullYear()

const scriptures = [
  { name: '金刚经', color: '#b8860b' },
  { name: '道德经', color: '#2d6a4a' },
  { name: '心经',   color: '#c04040' },
  { name: '清静经', color: '#3a7a8a' },
  { name: '阴符经', color: '#6048a0' },
  { name: '高维',   color: '#3058c0' },
]
</script>

<template>
  <footer class="zen-hide border-t" style="background: rgba(247, 243, 235, 0.7); border-color: rgba(180, 130, 30, 0.1);">
    <div class="content-width py-16">
      <div class="flex flex-col items-center text-center gap-6">
        <!-- Logo -->
        <div class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg"
             style="background: linear-gradient(135deg, #d4a017, #b8860b); color: #fff; box-shadow: 0 2px 24px rgba(180, 130, 30, 0.2);">
          般
        </div>

        <div>
          <p class="text-base font-semibold tracking-[0.2em]" style="color: #8b6914;">金刚般若波罗蜜经</p>
          <p class="text-[12px] tracking-[0.2em] mt-1.5" style="color: #b8a080;">融通万象 · 明心见性 · 圆融无碍</p>
        </div>

        <!-- Scripture color dots -->
        <div class="flex items-center gap-2">
          <div v-for="s in scriptures" :key="s.name"
            class="w-2.5 h-2.5 rounded-full transition-transform duration-300 hover:scale-150"
            :style="{ background: s.color }"
            :title="s.name" />
        </div>

        <div class="gold-line w-56" />

        <blockquote class="text-base tracking-wider leading-relaxed max-w-md italic" style="color: #5a4a30;">
          "一切有为法，如梦幻泡影<br/>如露亦如电，应作如是观"
          <cite class="block text-sm mt-2 not-italic" style="color: #8a7a60;">— 《金刚经》第三十二品</cite>
        </blockquote>

        <div class="text-[13px] tracking-wider" style="color: #a09080;">
          &copy; {{ year }} 般若融通 · 逐品参究系统 · 王明龙
        </div>

        <p class="text-sm tracking-wider max-w-lg leading-relaxed" style="color: #b8a898;">
          愿以此功德，普及于一切。我等与众生，皆共成佛道。
        </p>
      </div>
    </div>
  </footer>
</template>
