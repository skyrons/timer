import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";


const newCycleFormValidationSchema = zodResolver.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(1, 'Minutes must be greater than five.')
        .max(60, 'Minutes must be less than 60.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
export function NewCycleForm (){
    
    const { register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })
    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestions"
                {...register('task')}
                disabled={!!activeCycle}
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
                min={1}
                max={60}
                {...register('minutesAmount', {valueAsNumber: true})}
                disabled={!!activeCycle}
            />

            <span>minutos.</span>
        </FormContainer>
    )
    
}