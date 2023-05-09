import  { createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import {base_url} from '../base_url'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{

    
    let history = useNavigate()
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null)
    let [user,setUser] = useState(() => localStorage.getItem('authTokens')? jwt_decode(localStorage.getItem('authTokens')): null)
    let [loading,setLoading] = useState(true)

    let loginUser = async (e)=>{
        e.preventDefault()
        console.log('Form Submitted')
        let response = await fetch(`${base_url}api/token/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username': e.target.username.value, 'password':e.target.password.value})
        })
    let data = await response.json();
   
    if(response.status === 200){
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens',JSON.stringify(data))
        history('/')
    }else {
        alert("Something went wrong in Authentication")
    }
    }

    let logoutUser=() => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')
    }
    let updateToken = async ()=> {
        // let response = await fetch(`https://songapp-react-django-nimra-dot-cloud-work-314310.ew.r.appspot.com/api/token/refresh/`, {

        let response = await fetch(`${base_url}api/token/refresh/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null :children}
        </AuthContext.Provider>
    )
}