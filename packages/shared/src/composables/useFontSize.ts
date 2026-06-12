import { ref, computed } from 'vue'

export function useFontSize(initial = 0) {
  const level = ref(initial)

  function increase() { if (level.value < 2) level.value++ }
  function decrease() { if (level.value > -1) level.value-- }

  const className = computed(() => {
    const map: Record<number, string> = { [-1]: 'prose-sm', 0: 'prose-base', 1: 'prose-lg', 2: 'prose-xl' }
    return map[level.value] || 'prose-base'
  })

  return { level, increase, decrease, className }
}
