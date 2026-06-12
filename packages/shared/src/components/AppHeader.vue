<script setup lang="ts">
import { ref } from 'vue'

export interface NavItem {
  path: string
  label: string
  icon?: string
}

const props = defineProps<{
  logo: string
  title: string
  subtitle: string
  navItems: NavItem[]
  homePath?: string
}>()

const emit = defineEmits<{
  navigate: [path: string]
}>()

const mobileMenuOpen = ref(false)
const route = typeof window !== 'undefined' ? undefined : undefined

const currentPath = ref(window?.location?.hash?.replace('#', '') || '/')

function isActive(path: string) {
  if (path === '/') return currentPath.value === '/'
  return currentPath.value.startsWith(path)
}

function navigate(path: string) {
  mobileMenuOpen.value = false
  currentPath.value = path
  emit('navigate', path)
}

// Update active state on hash change
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash.replace('#', '') || '/'
  })
}
</script>

<template>
  <header class="sticky top-0 z-50 zen-hide" style="background: color-mix(in srgb, var(--color-bg) 90%, transparent); backdrop-filter: blur(20px); border-bottom: 1px solid var(--color-border);">
    <nav class="content-width">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <button @click="navigate(homePath || '/')" class="flex items-center gap-3 group cursor-pointer bg-transparent border-none">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300 group-hover:scale-105"
               style="background: linear-gradient(135deg, var(--color-primary-light, #d4a017), var(--color-primary)); color: #fff; box-shadow: 0 2px 16px color-mix(in srgb, var(--color-primary) 25%, transparent);">
            {{ logo }}
          </div>
          <div class="hidden sm:block text-left">
            <div class="text-base font-semibold tracking-[0.15em]" style="color: var(--color-primary);">{{ title }}</div>
            <div class="text-[12px] tracking-[0.2em] mt-0.5" style="color: var(--color-text-muted);">{{ subtitle }}</div>
          </div>
        </button>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <button v-for="item in navItems" :key="item.path"
            @click="navigate(item.path)"
            class="relative px-4 py-2 text-base tracking-[0.15em] transition-all duration-300 cursor-pointer bg-transparent border-none rounded-lg"
            :style="isActive(item.path)
              ? { color: 'var(--color-primary)', background: 'color-mix(in srgb, var(--color-primary) 6%, transparent)' }
              : { color: 'var(--color-text-secondary)' }">
            {{ item.label }}
          </button>
        </div>

        <!-- Mobile menu toggle -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 cursor-pointer bg-transparent border-none" :style="{ color: 'var(--color-primary)' }" aria-label="菜单">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Nav -->
      <transition name="page">
        <div v-if="mobileMenuOpen" class="md:hidden py-3 border-t" style="border-color: var(--color-border);">
          <div class="flex flex-col gap-1">
            <button v-for="item in navItems" :key="item.path"
              @click="navigate(item.path)"
              class="px-4 py-3 text-left rounded-lg text-base tracking-[0.15em] transition-all duration-200 cursor-pointer bg-transparent border-none"
              :style="isActive(item.path)
                ? { color: 'var(--color-primary)', background: 'color-mix(in srgb, var(--color-primary) 6%, transparent)' }
                : { color: 'var(--color-text-secondary)' }">
              {{ item.label }}
            </button>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>
