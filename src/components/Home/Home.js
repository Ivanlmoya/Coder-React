import {useAuth } from '../../context/authContext';
import React from 'react';

function Home(){

    const {user ,logout , loading} = useAuth();
    console.log(user)

    const handleLogOut = async () =>{
        await logout()
    }

    if (loading) return <h1>loading...</h1>

    return(
        <div>
            <h1>Welcome {user.email}</h1>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default Home