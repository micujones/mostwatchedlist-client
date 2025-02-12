import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { element } from 'prop-types';

export const UpdateUserView = ({ user, token }) => {
    // User data variables
    // const [username, setUsername] = useState(user.username);
    // const [password, setPassword] = useState(user.password);
    // const [email, setEmail] = useState(user.email);
    const birthday = user.birthday;

    // useRef versions of variables
    const username = useRef(user.username);
    const password = useRef(user.password);
    const email = useRef(user.email);

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
            username: username.current,
            password: password.current,
            email: email.current,
            birthday: birthday,
        };

        fetch(
            `https://mostwatchedlist-f9604e12841c.herokuapp.com/users/${user.username}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            }
        )
            .then((response) => {
                console.log(response.body);
                if (response.ok) {
                    alert('Your changes have been saved.');
                    console.log(updatedData);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function checkInputUpdated(elementId) {
        const inputArray = document.querySelectorAll(
            `${elementId} > .form-control`
        );

        for (let i = 0; i < inputArray.length; i++) {
            switch (inputArray[i].value) {
                case '':
                case null:
                    updateEmptyValue(inputArray[i].id);
                    break;
            }
        }
    }

    function updateEmptyValue(inputId) {
        switch (inputId) {
            case 'username':
                username.current = user.username;
                break;
            case 'password':
                password.current = user.password;
                break;
            case 'email':
                email.current = user.email;
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
                            placeholder={user.username}
                            onChange={(e) =>
                                (username.current = e.target.value)
                            }
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
                            placeholder="•••••"
                            onChange={(e) =>
                                (password.current = e.target.value)
                            }
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
                            placeholder={user.email}
                            onChange={(e) => (email.current = e.target.value)}
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
                        onClick={() => {
                            checkInputUpdated('#update-info');
                            handleUpdate();
                            handleClose();
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
