import { Play } from "phosphor-react";
import { 
        CountdownContainer, 
        FormContainer, 
        HomeContainer, 
        MinutesAmountInput, 
        Separator, 
        StartCoutdownButton, 
        TaskInput } from "./styles";

import { useForm } from "react-hook-form";

export function Home (){
    const { register, handleSubmit, watch} = useForm()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleCreateNewCycle(data: any) {
        console.log(data)
    }

    const task = watch('task')
    const isDisabled = !task

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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCoutdownButton disabled={isDisabled} >
                    <Play size={24}/>
                    Começar
                </StartCoutdownButton >
            </form>
        </HomeContainer>
    )
}