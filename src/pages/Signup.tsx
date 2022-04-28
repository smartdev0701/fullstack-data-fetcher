import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

const Signup = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const navigate = useNavigate()
    return (
        <div>
            <form
                action="#"
                method="POST"
                onSubmit={async (evt) => {
                    evt.preventDefault()
                    if (password !== confirmPassword) {
                        setPassword('')
                        setConfirmPassword('')
                        alert(
                            'Password does not match. Please try to input the password again.'
                        )
                        return
                    }
                    const res = await fetch(`${API_URL}/signup`, {
                        method: 'POST',
                        body: JSON.stringify({ username, password }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    })
                    if (res.status === 204) {
                        alert('User has been created successfully.')
                        navigate('/states', { replace: true })
                    }
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
                <div>
                    <label htmlFor="c-password">Confirm Password</label>
                    <input
                        name="c-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(evt) => setConfirmPassword(evt.target.value)}
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}
export default Signup
