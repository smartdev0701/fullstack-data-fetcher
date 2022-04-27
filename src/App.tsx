import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import InterstateTrade from './pages/InterstateTrade'
import Login from './pages/Login'
import Signup from './pages/Signup'
import StateEconomySearch from './pages/StateEconomySearch'
import StateSearch from './pages/StateSearch'

export interface User {
    id: number
}

export interface WithUserProps {
    user: User | null
}

function App() {
    const [sessionUser, setSessionUser] = useState<User | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/session', {
                credentials: 'include',
            })
            const user = await response.json()
            console.log(user)
            if (user?.id) {
                setSessionUser(user)
            }
        }
        fetchData()
    }, [])

    const logout = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('http://localhost:4000/logout', {
            method: 'POST',
        })

        if (res.status === 204) setSessionUser(null)
    }

    return (
        <Router>
            <div className="App" style={{ margin: '1rem' }}>
                <header className="App-header">
                    <h1>Focus Fullstack Interview Exercise</h1>
                </header>
                <nav
                    style={{
                        borderBottom: 'solid 1px',
                        paddingBottom: '1rem',
                        marginBottom: '1rem',
                    }}
                >
                    <Link to="/">Home</Link>|{' '}
                    {sessionUser && (
                        <>
                            <Link to="/states">States Search Example</Link>|{' '}
                            <Link to="/trade">Interstate Trade Search</Link>|{' '}
                            <Link to="/economy">State Economy Search</Link> |{' '}
                            {/* <form
                                method="POST"
                                action="#"
                                onSubmit={(e) => logout(e)}
                            >
                                <button type="submit">Sign out</button>
                            </form> */}
                        </>
                    )}
                    <Link to="/login">Login</Link> |{' '}
                    <Link to="/signup">Signup</Link> |{' '}
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/states"
                        element={<StateSearch user={sessionUser} />}
                    />
                    <Route path="/trade" element={<InterstateTrade />} />
                    <Route path="/economy" element={<StateEconomySearch />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
