import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCoutdownButton, 
    TaskInput 
} from "./styles";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'Minutes must be greater than five.')
        .max(60, 'Minutes must be less than 60.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
}

export function Home (){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPased, setAmountSecondsPased] = useState(0)

    const { register, handleSubmit, watch, reset} = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    useEffect(() => {
        if(activeCycle){
            setInterval(() =>{
                setAmountSecondsPased(
                    differenceInSeconds( new Date(), activeCycle.startDate)
                )
            }, 1000)
        }
    })

    function handleCreateNewCycle(data: NewCycleFormData) {
        
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        };

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(newCycle.id);

        reset();
    }

    const totalSeconds =  activeCycle ? activeCycle.minutesAmount * 60 : 0 
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPased : 0

    const minutesAmount = Math.floor(currentSeconds/60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                    </datalist>

                    <label htmlFor="munitesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount"
                        placeholder="00"

                        step="5"
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCoutdownButton disabled={isSubmitDisabled} >
                    <Play size={24}/>
                    Começar
                </StartCoutdownButton >
            </form>
        </HomeContainer>
    )
}