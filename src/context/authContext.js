import {createContext , useContext } from 'react';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut , GoogleAuthProvider, signInWithPopup  , sendPasswordResetEmail}  from 'firebase/auth';
import {auth} from '../Services/Firebase/index';
import {useEffect ,useState} from 'react';
import React from 'react';

export const authContext = createContext();



export const useAuth = () =>{
const context = useContext(authContext)
if (!context) throw new Error('no hay un provider')
return context
}

function AuthContextProvider ({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [ LogOut, setLogOut ] = useState(true)


    const signup = (email,password) => createUserWithEmailAndPassword(auth , email , password)
    
    const login = async (email,password) =>  signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const loginWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider()
       return signInWithPopup(auth, googleProvider)
    }

    const resetPassword = (email) => sendPasswordResetEmail(auth,email)

    useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        });
        return () => unsubscribe();
    },[])

    return (
        <authContext.Provider value={{signup,login, user , logout,loginWithGoogle, resetPassword} }>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider