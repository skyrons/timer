import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History (){

    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount}</td>
                                    <td>{cycle.startDate.toISOString()}</td>
                                    <td>
                                        {cycle.finishedDate && (
                                            <Status statusColor="green">Concluído</Status>
                                        )}
                                    </td>

                                    <td>
                                        {cycle.interruptDate && (
                                            <Status statusColor="red">Interrompido</Status>
                                        )}
                                    </td>

                                    <td>
                                        {(!cycle.finishedDate && !cycle.interruptDate) && (
                                            <Status statusColor="yellow">Em Andamento</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
        
    )
}