import { createContext, useState, useEffect } from "react";
import { 
        onAuthStateChangeListener, 
        createUserDocumentFromAuth 
    } from '../utils/firebase.utils'
// the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser:()=>null,
});

export const UserProvider = ({children})=>{
    const [ currentUser, setCurrentUser ] = useState(null)
    const value = {currentUser, setCurrentUser}

    useEffect(()=>{
        const unsubscribe = onAuthStateChangeListener((user)=>{
            setCurrentUser(user);
            user && createUserDocumentFromAuth(user);
        })
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

