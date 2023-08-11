import {useEffect,  useState} from 'react'
import './App.css'
import axios from "axios";
import {Training} from "./Training.tsx";
import MyCalendar from "./MyCalender.tsx";
import LoginPage from "./LoginPage.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./HomePage.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import PlayerHomepage from "./Player-Homepage.tsx";
import LogoutButton from "./LogoutButton.tsx";

function App() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [user,setUser]= useState<string>()

    const navigate = useNavigate()

    const fetchTrainings = async () => {
        try {
            const response = await axios.get("/api/training");
            setTrainings(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Fehler beim Abrufen der Trainings:", error);
        }
    };
function login(username:string,password:string){
    axios.post("/api/users/login",null,{auth: {username, password}})
        .then((response) =>{
            setUser(response.data)
            navigate("/")
        })
}
function me(){
    axios.get("/api/users/me")
        .then((response) =>{
            setUser(response.data)
        })
}

    useEffect(() => {
        me()
        fetchTrainings();
    }, []);
    const isLoginPage = () => {
        return location.pathname === '/login';
    };

    return (
        <>
            <Routes>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path="/" element={<HomePage trainings={trainings} user={user} fetchTrainings={fetchTrainings}/>}/>
                    <Route path = "/kalender" element={<MyCalendar fetchTrainings={fetchTrainings} ></MyCalendar>}/>
                    <Route path = "/player-homepage" element={<PlayerHomepage ></PlayerHomepage>}/>
                </Route>
                <Route path ="/login" element={<LoginPage onLogin={login}></LoginPage>}/>
            </Routes>
            {!isLoginPage() && <LogoutButton onLogoutSuccess={() => setUser(undefined)}/>}


        </>
    )
}

export default App
