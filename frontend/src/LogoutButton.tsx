import axios from "axios";
import {useNavigate} from "react-router-dom";

type LogoutButtonProps = {
    onLogoutSuccess: () => void;
};

const LogoutButton: React.FC<LogoutButtonProps> = ({onLogoutSuccess}) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("/api/users/logout");
            await axios.get("/api/users/me");
            console.log("Logout erfolgreich");
            onLogoutSuccess();
            navigate("/login");

        } catch (error) {
            console.error("Fehler beim Ausloggen:", error);
        }
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;