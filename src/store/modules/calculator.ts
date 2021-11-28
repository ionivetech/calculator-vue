// Interface Log
export interface ILog {
    log: string
}

// Vuex calculator modules
export const calculator = {
    state: (): ILog => ({
        log: ''
    }),

    mutations: {
        setLog(state: ILog, value: string) {
            state.log = value
        }
    },

    getters: {
        getLog(state: ILog) {
            return state.log
        }
    }
}