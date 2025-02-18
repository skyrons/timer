import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

import { 
    HomeContainer, 
    StartCoutdownButton, 
    StopCoutdownButton, 
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";



type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

export function Home (){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPased : 0

    const minutesAmount = Math.floor(currentSeconds/60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    

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


    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    },[minutes, seconds, activeCycle])

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <NewCycleForm />
                <Countdown />

                {activeCycle ?  (
                    <StopCoutdownButton onClick={handleInterruptCycle} type="button">
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