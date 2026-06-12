<script setup lang="ts">
defineProps<{
  id: number
  title: string
  subtitle: string
  tags?: string[]
  totalChapters: number
  linkPath: string
}>()

function badgeColor(id: number): string {
  const colors = [
    '#b8860b', '#2d6a4a', '#c04040', '#3a7a8a', '#6048a0', '#3058c0',
    '#c06030', '#5a8a40', '#b05050', '#3a6a8a', '#7058b0', '#2870b0',
    '#d4a017', '#307050', '#d46050', '#408090', '#7a5ec0', '#4070c8',
    '#b06820', '#408050', '#c05040', '#3a7080', '#6850a0', '#3860b0',
    '#c08830', '#386040', '#b84040', '#4a8090', '#5a48a0', '#305090',
    '#a06020', '#406050',
  ]
  return colors[(id - 1) % colors.length]
}
</script>

<template>
  <router-link :to="linkPath" class="group block no-underline">
    <div class="card card-hover h-full flex flex-col" style="padding: 1.75rem;">
      <!-- Top row: number + index -->
      <div class="flex items-start justify-between mb-5">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-sm transition-transform duration-300 group-hover:scale-110"
             :style="{ background: badgeColor(id) }">
          {{ id }}
        </div>
        <span class="text-[12px] tracking-[0.2em] font-mono" style="color: var(--color-text-muted);">
          {{ String(id).padStart(2, '0') }}/{{ totalChapters }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-semibold tracking-[0.12em] mb-3 transition-colors" style="color: var(--color-primary);">
        {{ title }}
      </h3>

      <!-- Subtitle -->
      <p class="text-base leading-relaxed tracking-wide mb-5 line-clamp-2 flex-1" style="color: var(--color-text-secondary);">
        {{ subtitle }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mb-5">
        <span v-for="tag in (tags?.slice(0, 3) || [])" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <!-- Arrow -->
      <div class="flex justify-end">
        <div class="w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]"
             style="color: var(--color-text-muted); border-color: var(--color-border);">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </router-link>
</template>
