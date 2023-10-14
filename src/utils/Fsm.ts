export interface FsmState<T> {
    status: T
    transitions: T[]
    onEnter?: (params: { prevStatus: T, status: T }) => Promise<void>
    onExit?: () => Promise<void>
}

export class Fsm<T extends string | number> {
    private states: Map<T, FsmState<T>> = new Map()
    private currentState: T | null = null

    constructor(states: FsmState<T>[]) {
        states.forEach(state => this.addState(state))
    }

    private addState(state: FsmState<T>) {
        this.states.set(state.status, state)
    }

    async transitionTo(newState: T): Promise<void> {
        if (this.currentState === newState) return

        const currentStateObj = this.states.get(this.currentState)
        if (currentStateObj && !currentStateObj.transitions.includes(newState)) return

        const nextState = this.states.get(newState)
        if (!nextState) throw new Error(`FSM: ${this.currentState} => ${newState}. Unknown state ${newState}`)

        await currentStateObj?.onExit?.()
        await nextState?.onEnter?.({
            status: newState,
            prevStatus: this.currentState,
        })

        this.currentState = newState
    }

    getCurrentState(): T | null {
        return this.currentState
    }

    setInitialState(state: T): void {
        if (this.currentState !== null) return
        if (!this.states.has(state)) return
        this.currentState = state
    }
}
