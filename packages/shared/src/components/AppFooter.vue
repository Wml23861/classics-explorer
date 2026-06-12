<script setup lang="ts">
export interface ScriptureDot {
  name: string
  color: string
}

defineProps<{
  logo: string
  title: string
  subtitle: string
  scriptures: ScriptureDot[]
  closingQuote: string
  closingQuoteAttribution: string
  copyrightName: string
  authorName: string
  dedication: string
}>()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="zen-hide border-t" style="background: color-mix(in srgb, var(--color-bg) 70%, transparent); border-color: var(--color-border);">
    <div class="content-width py-16">
      <div class="flex flex-col items-center text-center gap-6">
        <!-- Logo -->
        <div class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg"
             style="background: linear-gradient(135deg, var(--color-primary-light, #d4a017), var(--color-primary)); color: #fff; box-shadow: 0 2px 24px color-mix(in srgb, var(--color-primary) 20%, transparent);">
          {{ logo }}
        </div>

        <div>
          <p class="text-base font-semibold tracking-[0.2em]" style="color: var(--color-primary);">{{ title }}</p>
          <p class="text-[12px] tracking-[0.2em] mt-1.5" style="color: var(--color-text-muted);">{{ subtitle }}</p>
        </div>

        <!-- Scripture color dots -->
        <div class="flex items-center gap-2">
          <div v-for="s in scriptures" :key="s.name"
            class="w-2.5 h-2.5 rounded-full transition-transform duration-300 hover:scale-150"
            :style="{ background: s.color }"
            :title="s.name" />
        </div>

        <div class="gold-line w-56" />

        <blockquote class="text-base tracking-wider leading-relaxed max-w-md italic" style="color: var(--color-text-secondary);" v-html="closingQuote" />

        <cite class="text-sm not-italic" style="color: var(--color-text-muted);">{{ closingQuoteAttribution }}</cite>

        <div class="text-[13px] tracking-wider" style="color: var(--color-text-muted);">
          &copy; {{ year }} {{ copyrightName }} · {{ authorName }}
        </div>

        <p class="text-sm tracking-wider max-w-lg leading-relaxed" style="color: var(--color-text-muted);">
          {{ dedication }}
        </p>
      </div>
    </div>
  </footer>
</template>
