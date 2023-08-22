import axios from "axios";
import {useEffect, useState} from "react";
import {Training} from "./Training.tsx";
import {UserData} from "./UserData.tsx";

export default function PlayerHomepage() {
    const [user, setUser] = useState<UserData>()
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [status, setStatus] = useState<string| null>("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [successMessageColor, setSuccessMessageColor] = useState<string>("");
    const fetchTrainings = async () => {
        try {
            const response = await axios.get("/api/training");
            setTrainings(response.data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Trainings:", error);
        }
    };
    function me() {
        axios.get("/api/users/me")
            .then((response) => {
                setUser(response.data)
            })
    }

    useEffect(() => {
        me()
        fetchTrainings();
    }, []);

    const handleStatusChange = (trainingId: string, newStatus: string) => {

        const updatedTrainings = trainings.map((training) => {
            if (training.id === trainingId) {
                return { ...training, status: newStatus };
            }
            return training;
        });

        setTrainings(updatedTrainings);
        if (newStatus === "Accepted") {
            setSuccessMessage(user?.name +" has accepted for this training.");
            setSuccessMessageColor("green");
        } else if (newStatus === "Rejected") {
            setSuccessMessage(user?.name +" cancelled for this training .");
            setSuccessMessageColor("gray");
        }
        setTimeout(() => {
            setSuccessMessage(null);
        }, 2000);
        setStatus(null);
    };
    const toggleStatusPopup = (trainingId: string, currentStatus: string) => {
        if (currentStatus !== "In_Planning") {
            setStatus(status === trainingId ? null : trainingId);
        }
    };
    return (
        <>
            <h2>Your Trainings {user?.name}</h2>
            <div className="training-container">
                {successMessage && <div className="success-message" style={{ backgroundColor: successMessageColor }}>{successMessage}</div>}
                <table className="training-table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trainings.map((training) => (
                        <tr key={training.id}>
                            <td>{new Date(training.date).toLocaleDateString()}</td>
                            <td>
                                {new Date(training.date).toLocaleTimeString().slice(0, 5)}
                            </td>
                            <td>{training.art}</td>
                            <td className={`status-cell ${training.status === "In_Planning" ? "disabled" : ""}`}>
                                {status === training.id ? (
                                    <div className="status-popup">
                                        <button
                                            className="action-btn"
                                            onClick={() => handleStatusChange(training.id, "Accepted")}
                                        >
                                            ✔
                                        </button>
                                        <button
                                            className="action-btnx"
                                            onClick={() => handleStatusChange(training.id, "Rejected")}
                                        >
                                            ✘
                                        </button>
                                    </div>
                                ) : (
                                    <span
                                        className="status-btn"
                                        onClick={() => toggleStatusPopup(training.id, training.status)}

                                    >
                                            {training.status}
                                        </span>
                                )}
                                {training.status === "In_Planning" && <div className="disabled-overlay" />}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

