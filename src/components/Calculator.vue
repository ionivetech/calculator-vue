<template>
    <div class="div-calculator">
        <!-- Showing Log Calculation -->
        <div class="display">{{ getLog }} {{ current }}</div>

        <!-- Calculation Result -->
        <div class="answer">
            <span>=</span>
            <span>{{ answer }}</span>
        </div>

        <div class="btn btn-number btn-clear" @click="resetButton()">Clear</div>
        <div class="btn btn-operator" @click="operatorPressed('x')">x</div>
        <div class="btn btn-operator" @click="operatorPressed('/')">/</div>

        <div class="btn btn-number" @click="numberPressed(1)">1</div>
        <div class="btn btn-number" @click="numberPressed(2)">2</div>
        <div class="btn btn-number" @click="numberPressed(3)">3</div>
        <div class="btn btn-operator" @click="operatorPressed('+')">+</div>

        <div class="btn btn-number" @click="numberPressed(4)">4</div>
        <div class="btn btn-number" @click="numberPressed(5)">5</div>
        <div class="btn btn-number" @click="numberPressed(6)">6</div>
        <div class="btn btn-operator" @click="operatorPressed('-')">-</div>

        <div class="btn btn-number" @click="numberPressed(7)">7</div>
        <div class="btn btn-number" @click="numberPressed(8)">8</div>
        <div class="btn btn-number" @click="numberPressed(9)">9</div>
        <div class="btn btn-operator" @click="operatorPressed('%')">%</div>

        <div class="btn btn-operator" @click="operatorPressed('+/-')">+/-</div>
        <div class="btn btn-number" @click="numberPressed(0)">0</div>
        <div class="btn btn-operator" @click="operatorPressed('.')">.</div>
        <div class="btn btn-operator" @click="calculate()">=</div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'

    // Vuex variable
    const store = useStore()
    const getLog = computed(() => store.getters.getLog)

    // Variables
    const current = ref<string>('')
    const answer = ref<string>('')
    const firstClicked = ref<boolean>(true)

    // Function number button pressed
    const numberPressed = (number: number): void => {
        if(firstClicked.value) {
            current.value = ""
            firstClicked.value = false
        }
        current.value = `${current.value}${number}`
    }

    // Function operator button pressed
    const operatorPressed = (operator: string): void => {
        switch (operator) {
        case "+":
            addToLog(operator)
            break
        case "-":
            addToLog(operator)
            break
        case "x":
            addToLog(operator)
            break
        case "/":
            addToLog(operator)
            break
        case "%":
            if(current.value != "") {
            current.value = `${parseFloat(current.value) / 100}`
            }
            break
        case ".":
            if(String(current.value).indexOf(".") === -1) {
            current.value = `${current.value}.`
            }
            break
        case "+/-":
            if(current.value != "") {
            current.value = current.value.charAt(0) === "-" ? current.value.slice(1) : `-${current.value}`
            }
        }
    }

    // Function add operator & previous value to log
    const addToLog = (operator: string) => {
        store.commit('setLog', `${firstClicked.value ? answer.value : current.value} ${operator} `)
        current.value = ""
    }

    // Function calculation
    const calculate = (): void => {
        if(!firstClicked.value) {
            let newLog = getLog.value.replace("x", "*")
            answer.value = eval(newLog + current.value)
    
            storeToLocalStorage()
            firstClicked.value = true
        }
    }

    // Function store to local storage
    const storeToLocalStorage = (): void => {
        let result = `${getLog.value + current.value} = ${answer.value}`
        const history = JSON.parse(localStorage.getItem("history") || '[]')
        history.push(result)

        localStorage.setItem('history', JSON.stringify(history))
    }

    // Function reset button
    const resetButton = (): void => {
        store.commit('setLog', '')
        current.value = ""
        answer.value = ""
        firstClicked.value = true
    }
</script>