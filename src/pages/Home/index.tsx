import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator, StartCoutdownButton } from "./styles";

export function Home (){
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <input type="text" id="task" />

                    <label htmlFor="munitesAmount">durante</label>
                    <input type="number" id="minutesAmount"/>

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCoutdownButton >
                    <Play size={24}/>
                    Começar
                </StartCoutdownButton >
            </form>
        </HomeContainer>
    )
}