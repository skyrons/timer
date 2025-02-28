import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { useContext } from 'react';

import { 
    HomeContainer, 
    StartCoutdownButton, 
    StopCoutdownButton, 
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'Minutes must be greater than five.')
        .max(60, 'Minutes must be less than 60.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
export function Home (){

    const { activeCycle, createNewCycle, interruptCurrentCycle  } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
            resolver: zodResolver(newCycleFormValidationSchema),
            defaultValues: {
                task: '',
                minutesAmount: 0,
            }
        })
    
    const { handleSubmit, watch} = newCycleForm

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)}>

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ?  (
                    <StopCoutdownButton 
                        onClick={interruptCurrentCycle} 
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