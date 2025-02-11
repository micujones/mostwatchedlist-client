import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const UpdateUserView = ({ user, token }) => {
    // User data variables
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    const birthday = user.birthday;

    useEffect(() => {
        console.log('User:', user);
    }, [user]);

    // Modal variables
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Input functions
    const handleUpdate = () => {
        const updatedData = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        };
        console.log('Original user:', user);
        console.log('Updated user:', updatedData);

        // fetch(
        //     `https://mostwatchedlist-f9604e12841c.herokuapp.com/users/${user.username}`,
        //     {
        //         method: 'PUT',
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(updatedData),
        //     }
        // )
        //     .then((response) => {
        //         console.log(response.body);
        //         if (response.ok) {
        //             alert('Your changes have been saved.');
        //             console.log(updatedData);
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    function checkInputUpdated(elementId) {
        const input = document.querySelectorAll(`${elementId} > .form-control`);
        for (let i = 0; i < input.length; i++) {
            switch (input[i].value) {
                case '':
                case null:
                    updateEmptyValue(input[i].id);
                    break;
            }
        }
        return true;
    }

    function updateEmptyValue(inputId) {
        switch (inputId) {
            case 'username':
                setUsername(user.username);
                break;
            case 'password':
                setPassword(user.password);
                break;
            case 'email':
                setEmail(user.email);
                break;
        }
    }

    function inputAlert() {
        alert('Nope.');
    }

    return (
        <>
            <Button variant="primary" size="sm" onClick={handleShow}>
                Update Info
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group id="update-info">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            id="username"
                            value={username}
                            placeholder={user.username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Text>
                            Username must be at least 7 characters and cannot
                            contain non-alphanumeric characters.
                        </Form.Text>
                    </Form.Group>
                    <br />
                    <Form.Group id="update-info">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            id="password"
                            value={password}
                            placeholder="•••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Text>
                            Password must be at least 10 characters.
                        </Form.Text>
                    </Form.Group>
                    <br />
                    <Form.Group id="update-info">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            id="email"
                            type="email"
                            value={email}
                            placeholder={user.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={
                            () => {
                                checkInputUpdated('#update-info');
                                handleUpdate();
                            }
                            // checkInputUpdated('#update-info') ?

                            // : inputAlert
                        }
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
