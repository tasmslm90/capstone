import {FormEvent, useEffect, useState} from 'react';
import {Training} from "./Training.tsx";


type Props = {

    onSaveEdit: (editedTraining: Training) => void
    training: Training
    onCancelEdit: () => void;

}
export default function EditForm(props: Props) {

    const [date, setDate] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [status, setStatus] = useState<string>("")


    useEffect(() => {

        setDate(props.training.date)
        setType(props.training.art)
        setStatus(props.training.status)

    }, [])

    function editTraining(event: FormEvent) {
        event.preventDefault()
        props.onSaveEdit({id: props.training.id, date: date, art: type, status:status});

    }
    return (
        <form onSubmit={editTraining}>
            <input value={date} onChange={(event) => setDate(event.target.value)}/>
            <input value={status} onChange={(event) => setStatus(event.target.value)}/>
            <input value={type} onChange={(event) => setType(event.target.value)}/>
            <button type="submit">Save</button>
        </form>
    );
}
