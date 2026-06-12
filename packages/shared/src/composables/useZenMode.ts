import { ref } from 'vue'

export function useZenMode() {
  const zen = ref(false)

  function toggleZen() {
    zen.value = !zen.value
    document.documentElement.classList.toggle('zen-mode', zen.value)
  }

  function disableZen() {
    zen.value = false
    document.documentElement.classList.remove('zen-mode')
  }

  return { zen, toggleZen, disableZen }
}
