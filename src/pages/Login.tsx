import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()
    return (
        <div>
            <form
                method="POST"
                action="#"
                onSubmit={async (evt) => {
                    evt.preventDefault()
                    const res = await fetch(`${API_URL}/login`, {
                        method: 'POST',
                        body: JSON.stringify({ username, password }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    })

                    if (res.status === 204)
                        navigate('/states', { replace: true })
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
                        type="password"
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
