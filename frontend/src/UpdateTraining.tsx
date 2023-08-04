import {Training} from "./Training.tsx";

export type updatedTraining = {
    setTraining: React.Dispatch<React.SetStateAction<Training[]>>,
    training: Training[]
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    editMode: boolean
}
