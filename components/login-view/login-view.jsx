import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../../src/index.scss';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        // Prevents default behavior of reloading page
        event.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        fetch('https://mostwatchedlist-f9604e12841c.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);
                    onLoggedIn(data.user, data.token);
                    // window.location.reload();
                } else {
                    alert('User does not exist.');
                }
            })
            .catch((e) => {
                alert('Something broke.');
            });
    };

    return (
        <>
            <div style={{ paddingTop: '16px', textAlign: 'center' }}>
                <h2>Welcome back!</h2>
            </div>
            <div className="form-page">
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        controlId="formUsername"
                        style={{ paddingBottom: '16px' }}
                    >
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            className="input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group
                        controlId="formPassword"
                        style={{ paddingBottom: '16px' }}
                    >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Button variant="dark" className="button" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </>
    );
};
