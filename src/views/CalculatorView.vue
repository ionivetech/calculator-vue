<template>
  <div class="card-calculator">
    <!-- Button History -->
    <div v-if="!isHistory" class="btn-history" @click="seeHistory()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
      </svg>

      <span>History</span>
    </div>

    <component :is="isHistory ? History : Calculator" @go-back="goBack"/>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Calculator from '@/components/Calculator.vue'
  import History from '@/components/History.vue'

  // Variable
  const isHistory = ref<boolean>(false)

  // Function see all history calculation
  const seeHistory = () => {
    isHistory.value = true
  }

  // Function emit go back to calculator
  const goBack = (event: boolean) => {
    isHistory.value = event
  }
</script>
