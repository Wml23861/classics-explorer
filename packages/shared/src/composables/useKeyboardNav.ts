import { onMounted, onUnmounted, type Ref } from 'vue'

export function useKeyboardNav(handlers: {
  onPrev?: () => void
  onNext?: () => void
  onZen?: () => void
}) {
  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' && handlers.onPrev) {
      handlers.onPrev()
    } else if (e.key === 'ArrowRight' && handlers.onNext) {
      handlers.onNext()
    } else if (e.key === 'z' && !e.ctrlKey && !e.metaKey && handlers.onZen) {
      handlers.onZen()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKey))
  onUnmounted(() => window.removeEventListener('keydown', onKey))
}
