import  {useEffect, useState} from 'react';
import {Training} from "./Training.tsx";

type Props ={
    training:Training
}
export default function EditForm(props:Props) {
    const[type, setType]= useState<string>("")
    useEffect(() => {
        setType(props.training.art)

    },[])
    return (
        <form>

            <input value={type} />

        </form>
    );
}
