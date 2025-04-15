import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../../src/index.scss';

export const SignupView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        };

        fetch('https://mostwatchedlist-f9604e12841c.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            if (response.ok) {
                alert('Signup successful!');
                window.location.reload();
            } else {
                alert('Signup failed.');
            }
        });
    };

    return (
        <>
            <div style={{ paddingTop: '16px', textAlign: 'center' }}>
                <h2>Learn more about the best movies!</h2>
            </div>
            <div className="form-page">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-row">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="form-row">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            className="input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        ></Form.Control>
                        <Form.Text className="prompt">
                            Username must be at least 7 characters and cannot
                            contain non-alphanumeric characters.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="form-row">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></Form.Control>
                        <Form.Text className="prompt">
                            Password must be at least 10 characters.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="form-row">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            className="input"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Button variant="dark" className="button" type="submit">
                        Signup
                    </Button>
                </Form>
            </div>
        </>
    );
};
