import { createContext, useContext, useReducer } from 'react'
const AuthContext = createContext()

const reducer = (state, action) => {
    if (action.type == 'LOGIN') {
        const obj = saveToken(state, action)
        return obj
    }
    else if (action.type == 'LOGOUT') {
        const obj = clearToken()
        return obj
    } else {
        return state
    }
}

const initState = () => {
    const token = localStorage.getItem('token')
    let headers = null
    let employee = localStorage.getItem('employee')
    employee = JSON.parse(employee)
    if(token) {
        headers = { authorization: token }
    }
    return {
        token,
        headers,
        employee,
        isAuth: !!token,
    }
}

const saveToken = (state, { payload }) => {
    const { user, token } = payload
    const headers = { authorization: token }
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))
    return {
        ...state,
        token,
        headers,
        user,
        isAuth: true,
    }
}

const clearToken = () => {
    localStorage.clear()
    return {
        isAuth: false,
        employee: null,
        token: null,
    }
}

const useAuth = () => {
    return useContext(AuthContext)
}

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initState())
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export { useAuth, AuthProvider }