import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

        console.log(data);

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
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                ></Form.Control>
            </Form.Group>
            <Button variant="dark" className="button" type="submit">
                Signup
            </Button>
        </Form>
    );
};
