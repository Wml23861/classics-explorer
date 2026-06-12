<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)

function navigate(path: string) { mobileMenuOpen.value = false; router.push(path) }
function isActive(path: string) { return path === '/' ? route.path === '/' : route.path.startsWith(path) }

const navItems = [
  { path: '/', label: '首页', icon: '家' },
  { path: '/diamond', label: '金刚经', icon: '般' },
  { path: '/tao', label: '道德经', icon: '道' },
]
</script>

<template>
  <header class="sticky top-0 z-50 zen-hide" style="background: rgba(247, 243, 235, 0.9); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(180, 130, 30, 0.12);">
    <nav class="content-width">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <button @click="navigate('/')" class="flex items-center gap-3 group cursor-pointer bg-transparent border-none">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300 group-hover:scale-105"
               style="background: linear-gradient(135deg, #d4a017, #b8860b); color: #fff; box-shadow: 0 2px 16px rgba(180, 130, 30, 0.25);">
            般
          </div>
          <div class="hidden sm:block text-left">
            <div class="text-base font-semibold tracking-[0.15em]" style="color: #8b6914;">金刚般若波罗蜜经</div>
            <div class="text-[12px] tracking-[0.2em] mt-0.5" style="color: #b8a080;">融通万象 · 明心见性</div>
          </div>
        </button>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <button v-for="item in navItems" :key="item.path"
            @click="navigate(item.path)"
            class="relative px-4 py-2 text-base tracking-[0.15em] transition-all duration-300 cursor-pointer bg-transparent border-none rounded-lg"
            :style="isActive(item.path) ? 'color: #8b6914; background: rgba(184,134,11,0.06);' : 'color: #8a7a60;'">
            {{ item.label }}
          </button>
        </div>

        <!-- Mobile menu toggle -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 cursor-pointer bg-transparent border-none" style="color: #8b6914;" aria-label="菜单">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Nav -->
      <transition name="page">
        <div v-if="mobileMenuOpen" class="md:hidden py-3 border-t" style="border-color: rgba(180, 130, 30, 0.1);">
          <div class="flex flex-col gap-1">
            <button v-for="item in navItems" :key="item.path"
              @click="navigate(item.path)"
              class="px-4 py-3 text-left rounded-lg text-base tracking-[0.15em] transition-all duration-200 cursor-pointer bg-transparent border-none"
              :style="isActive(item.path) ? 'color: #8b6914; background: rgba(184,134,11,0.06);' : 'color: #6b5d4a;'">
              {{ item.label }}
            </button>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>
