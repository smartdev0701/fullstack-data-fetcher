import React, { useState } from 'react'

const Signup = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    return (
        <div>
            <form
                action="#"
                method="POST"
                onSubmit={async (evt) => {
                    evt.preventDefault()
                    await fetch('http://localhost:4000/signup', {
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
                <div>
                    <label htmlFor="c-password">Confirm Password</label>
                    <input
                        name="c-password"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}
export default Signup
