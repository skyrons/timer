import { HistoryContainer, HistoryList, Status } from "./styles";

export function History (){
    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Início</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nome da tarefa</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                                <Status statusColor="green">
                                    Concluído
                                </Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Nome da tarefa</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                                <Status statusColor="yellow">
                                    Em andamento
                                </Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Nome da tarefa</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                                <Status statusColor="green">
                                    Concluído
                                </Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Nome da tarefa</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                                <Status statusColor="red">
                                    Interrompido
                                </Status>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
        
    )
}