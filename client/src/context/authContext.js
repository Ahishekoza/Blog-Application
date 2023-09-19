import {useContext,createContext,useState, useEffect} from 'react'

const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{
    const [user,SetUser] = useState({
        token:'',
        user:{
            email:'',
            username:''
        }
    })
    
    useEffect(()=>{
        const user = localStorage.getItem('authUser')
        const token = localStorage.getItem('authToken')

        if(user && token){
            const parsedUser = JSON.parse(user)

            SetUser({...user,token:token,user:{email:parsedUser.email,username:parsedUser.username}})
        }
    },[])

    return (
        <AuthContext.Provider value={[user,SetUser]}>{children}</AuthContext.Provider>
    )

}

const useAuth =()=> useContext(AuthContext)

export{
    useAuth,
    AuthContextProvider
}

