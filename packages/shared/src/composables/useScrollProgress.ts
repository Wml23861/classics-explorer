import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollProgress() {
  const progress = ref(0)
  const showScrollTop = ref(false)

  function onScroll() {
    showScrollTop.value = window.scrollY > 600
    const h = document.documentElement
    progress.value = (h.scrollHeight - h.clientHeight) > 0
      ? Math.min((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100, 100)
      : 0
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { progress, showScrollTop, scrollToTop }
}
