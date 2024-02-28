import { useState, createContext} from 'react'
import axios from "axios"


export const UserContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});


export default function UserProvider(props) {
    
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        tedList: [],
        errMsg: ""
    }
    
    
        const [userState, setUserState] = useState(initState)


   async function signup(creds){
    try {
        const res = await axios.post("/api/auth/signup", (creds))
        const {token, user} = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

        setUserState({
          ...userState,
            token: token,
            user: user
        })
    } catch (err) {
        handleAuthErr(err.response.data.errMsg)
        console.log(err)
    }
    }

    async function login(creds){
        try {
            const res = await axios.post("/api/auth/login", creds)
            const {token, user} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState({
              ...userState,
                token: token,
                user: user
            })
            console.log('login succesful')
        } catch (err) {
            handleAuthErr(err.response.data.errMsg)
            console.log(err)
        }
    }

    function handleAuthErr(errMsg) {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function resetAuthErr() {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        })
        )
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            posts: [],
            errMsg: ''
        })
    }

   

 



    return (
        <UserContext.Provider value = {{userAxios, signup, login, ...userState, resetAuthErr, logout}}>
            {props.children}
        </UserContext.Provider>
    )
}