import React, { useState } from 'react';

export const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    return (
        <form action="">
            <label>Username
                <input type="text"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required />
            </label>
            <label>Password
                <input type="password" 
                value={password} 
                onChange={(e) => setUsername(e.target.value)} 
                required/>
            </label>
            <button type="submit">SUBMIT</button>
        </form>
    )
}