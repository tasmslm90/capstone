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
            onLogoutSuccess();
            navigate("/login");

        } catch (error) {
            console.error("Fehler beim Ausloggen:", error);
        }
    };

    return (

        <div className="logout-button-container">
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>

    );
};

export default LogoutButton;