import { createContext, useContext, useEffect, useState } from "react"
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth.js';
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
            if (Array.isArray(error.response.data))
                setErrors(error.response.data)
            else
                setErrors([error.response.data.message])
            console.log(errors)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
            if (Array.isArray(error.response.data)){
                console.log("isArray")
                setErrors(error.response.data)
            }
            else{
                console.log("noArray")
                setErrors([error.response.data.message])
            }
            console.log(errors)
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                return
            }

            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                loading,
                user,
                isAuthenticated,
                errors
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}