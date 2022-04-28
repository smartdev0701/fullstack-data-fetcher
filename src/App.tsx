import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import { API_URL } from './config'
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

function AppContent() {
    const [sessionUser, setSessionUser] = useState<User | null>(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionUser) return
        const fetchData = async () => {
            const response = await fetch(`${API_URL}/session`, {
                credentials: 'include',
            })
            const user = await response.json()

            if (user?.id) {
                setSessionUser(user)
            }
        }
        fetchData()
    }, [location, sessionUser])

    const logout = async () => {
        const res = await fetch(`${API_URL}/logout`, {
            method: 'POST',
        })

        if (res.status === 204) {
            setSessionUser(null)
            navigate('/', { replace: true })
        }
    }

    return (
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
                {sessionUser ? (
                    <>
                        <Link to="/states">States Search Example</Link>|{' '}
                        <Link to="/trade">Interstate Trade Search</Link>|{' '}
                        <Link to="/economy">State Economy Search</Link> |{' '}
                        <Link to="#" onClick={logout}>
                            Sign out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> |{' '}
                        <Link to="/signup">Signup</Link> |{' '}
                    </>
                )}
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
    )
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App
