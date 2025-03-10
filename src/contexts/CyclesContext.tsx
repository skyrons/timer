import { createContext, ReactNode, useReducer, useState } from "react"

interface CreateCycleData {
   task: string;
   minutesAmount: number;
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
};

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPased: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextsProviderProps {
  children: ReactNode
}

interface CyclesStates {
  cycles: Cycle[],
  activeCycleId: string | null
}
export function CyclesContextProvider({ 
  children 
}: CyclesContextsProviderProps) {
  const [cyclesState , dispatch] = useReducer(
    (state: CyclesStates, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId){
                return { ...cycle, interruptDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId){
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        default:
          return state;
      }
    }, {
    cycles: [],
    activeCycleId: null,
    },
  )

  const [amountSecondsPased, setAmountSecondsPased] = useState(0)

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPased(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
        
    const newCycle: Cycle = {
        id: String(new Date().getTime()),
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date()
    };

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      },
    })

    setAmountSecondsPased(0)

    // reset();
  }

  function interruptCurrentCycle(){
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })

  }

  function markCurrentCycleAsFinished(){
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })
  }

  return(
    <CyclesContext.Provider 
      value={{
        cycles,
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished,
        amountSecondsPased,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}>
      {children}             
  </CyclesContext.Provider>
  )
  
}