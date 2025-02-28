import { createContext, ReactNode, useState } from "react"

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
  cycles: Cycle;
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
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPased, setAmountSecondsPased] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPased(seconds)
  }

  function markCurrentCycleAsFinished(){
      setCycles( (state) =>
          state.map(cycle => {
              if (cycle.id === activeCycleId){
                  return {...cycle, finishedDate: new Date()}
              } else {
                  return cycle
              }
          }),
      )
  }

  function createNewCycle(data: CreateCycleData) {
        
    const newCycle: Cycle = {
        id: String(new Date().getTime()),
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date()
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPased(0)

    // reset();
}

  function interruptCurrentCycle(){
    setCycles( (state) =>
        state.map(cycle => {
            if (cycle.id === activeCycleId){
                return {...cycle, interruptDate: new Date()}
            } else {
                return cycle
            }
        }),
    )
    setActiveCycleId(null);
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