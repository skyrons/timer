import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCoutdownButton, TaskInput } from "./styles";

export function Home (){
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        type="text" 
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
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

                <StartCoutdownButton disabled>
                    <Play size={24}/>
                    Começar
                </StartCoutdownButton >
            </form>
        </HomeContainer>
    )
}