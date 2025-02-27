import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { createContext, useState } from 'react';

import { 
    HomeContainer, 
    StartCoutdownButton, 
    StopCoutdownButton, 
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";


interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
};

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPased: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'Minutes must be greater than five.')
        .max(60, 'Minutes must be less than 60.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
export function Home (){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPased, setAmountSecondsPased] = useState(0)

    const newCycleForm = useForm<NewCycleFormData>({
            resolver: zodResolver(newCycleFormValidationSchema),
            defaultValues: {
                task: '',
                minutesAmount: 0,
            }
        })
 
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    
    const { handleSubmit, watch, reset} = newCycleForm

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

    function handleCreateNewCycle(data: NewCycleFormData) {
        
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        };

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(newCycle.id);
        setAmountSecondsPased(0)

        reset();
    }

    function handleInterruptCycle(){
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

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <CyclesContext.Provider 
                value={{
                    activeCycle, 
                    activeCycleId, 
                    markCurrentCycleAsFinished,
                    amountSecondsPased,
                    setSecondsPassed,
                    }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

                {activeCycle ?  (
                    <StopCoutdownButton 
                        onClick={handleInterruptCycle} 
                        type="button">
                    <HandPalm size={24}/>
                    Encerrar
                    </StopCoutdownButton >
                ) : (
                    <StartCoutdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                    </StartCoutdownButton >
                )}

                
            </form>
        </HomeContainer>
    )
}