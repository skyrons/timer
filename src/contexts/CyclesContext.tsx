import { createContext, ReactNode, useReducer, useState } from "react"
import { Cycle, cyclesReducer } from "../reducers/cycles";

interface CreateCycleData {
   task: string;
   minutesAmount: number;
}

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

export function CyclesContextProvider({ 
  children 
}: CyclesContextsProviderProps) {
  const [cyclesState , dispatch] = useReducer(
    cyclesReducer, {
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