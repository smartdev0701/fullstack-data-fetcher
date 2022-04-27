import React, { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    return (
        <div>
            <form
                method="POST"
                action="#"
                onSubmit={async (evt) => {
                    evt.preventDefault()
                    await fetch('http://localhost:4000/login', {
                        method: 'POST',
                        body: JSON.stringify({ username, password }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    })
                }}
            >
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        value={username}
                        onChange={(evt) => setUsername(evt.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
