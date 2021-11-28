<template>
    <div class="div-history">
        <!-- Header History -->
        <div class="header" @click="goBack()">
            <div class="wrap-header">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
                <span>History</span>
            </div>

            <div class="delete-history" @click="removeHistory()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
            </div>
        </div>

        <!-- History List -->
        <div v-if="histories.length > 0" class="history-list">
            <p v-for="(item, index) in histories" :key="index">{{item}}</p>
        </div>

        <!-- If History Empty -->
        <div v-else class="empty-history">
            <p>calculation history is empty</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { defineEmits, computed } from 'vue'

    // Emit declaration
    const emit = defineEmits(['go-back'])

    // Variable
    const histories = computed(() => {
        return JSON.parse(localStorage.getItem("history") || '[]')
    })

    // Function go back to calculator
    const goBack = () => {
        emit('go-back', false)
    }

    // Function remove history from local storage
    const removeHistory = () => {
        localStorage.removeItem('history')
    }
</script>