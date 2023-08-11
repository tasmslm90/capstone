import {FormEvent, useEffect, useState} from 'react';
import {Training} from "./Training.tsx";


type Props ={

    editedTraining : (editedTraining: Training)=> void
    training:Training
}
export default function EditForm(props:Props ) {

    const[date, setDate]= useState<string>("")
    const[type, setType]= useState<string>("")

    useEffect(() => {
        setDate(props.training.date)
        setType(props.training.art)


    },[])
    function editTraining(event:FormEvent){
        event.preventDefault()
        props.editedTraining({id:props.training.id,date:date,art:type});


    }

    return (
        <form onSubmit={editTraining}>
            <input value={date}  onChange={(event)=> setDate(event.target.value)}/>
            <input value={type} onChange={(event)=> setType(event.target.value)}/>
            <button>Save</button>

        </form>
    );
}
