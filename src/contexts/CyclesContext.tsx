import { createContext, ReactNode, useReducer, useState } from "react"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducers";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

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

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPased(0)

    // reset();
  }

  function interruptCurrentCycle(){
    dispatch(interruptCurrentCycleAction())

  }

  function markCurrentCycleAsFinished(){
    dispatch(markCurrentCycleAsFinishedAction())
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