import {FormEvent, useState} from "react";

type Props = {
    onLogin: (username: string, password: string, role: string) => void
}
export default function LoginPage(props: Props) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [role, setRole] = useState<string>("")

    function onLogin(event: FormEvent) {

        event.preventDefault()
        props.onLogin(username, password, role)

    }

    return (
        <>
            <h2>Welcome to Sports Club</h2>
            <div className={"login"}>
                <form onSubmit={onLogin}>
                    <p>Login</p>
                    <label htmlFor="role">Role:</label>
                    <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                        <option value="">Choose a role</option>
                        <option value="trainer">Trainer</option>
                        <option value="player">Player</option>
                    </select>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username"
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                        type="password"
                    />
                    <button>Login</button>
                    <p>Not registered yet? Register <a href="/register">here</a>.</p>
                </form>
            </div>
        </>
    )
}