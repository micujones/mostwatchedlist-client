import React, { useState } from 'react';

export const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        // Prevents default behavior of reloading page
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        fetch('https://mostwatchedlist-f9604e12841c.herokuapp.com/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Login response: ', data);
                if (data.user) {
                    onLoggedIn(data.user, data.token);
                } else {
                    alert('User does not exist.');
                }
            })
            .catch((e) => {
                alert('Something broke.');
            })
    }

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