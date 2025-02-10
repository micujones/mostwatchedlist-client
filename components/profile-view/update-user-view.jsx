import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const UpdateUserView = ({ userId, token }) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        birthday: null,
    });

    // User data variables
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    const birthday = user.birthday;
    const [data, setData] = useState({
        // Body per API https://mostwatchedlist-f9604e12841c.herokuapp.com/documentation#:~:text=JSON%20object%20with%20updated%20user%27s%20data.
        username: username,
        password: password,
        email: email,
        birthday: birthday,
    });

    const getUser = () => {
        fetch(`https://mostwatchedlist-f9604e12841c.herokuapp.com/users/`)
            .then((response) => response.json())
            .then((users) => {
                const currentUser = users.find((u) => u._id === userId);
                setUser(currentUser);
                setUsername(currentUser.username);
                setPassword(currentUser.password);
                setEmail(currentUser.email);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setData({
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        });
        console.log('User:', user);
        console.log('Data:', data);
    }, [user, username, password, email]);

    // Modal variables
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = () => {
        setData({
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        });

        fetch(
            `https://mostwatchedlist-f9604e12841c.herokuapp.com/users/${user.username}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
            .then((response) => {
                console.log(response.body);
                if (response.ok) {
                    alert('Your changes have been saved.');
                    console.log(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const checkInputUpdated = (elementId) => {
        const input = document.getElementById(elementId).value;
        switch (input) {
            case user.username:
            case user.password:
            case user.email:
            case '':
                return false;
            default:
                return true;
        }
    };

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
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            id="update-username"
                            type="text"
                            placeholder={user.username}
                            onSubmit={(e) => {
                                checkInputUpdated('update-username')
                                    ? // && validateInput('update-username')
                                      setUsername(e.target.value)
                                    : console.log('Not valid username input.');
                            }}
                        />
                        <Form.Text>
                            Username must be at least 7 characters and cannot
                            contain non-alphanumeric characters.
                        </Form.Text>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            id="update-password"
                            type="text"
                            placeholder="..."
                            onSubmit={(e) => {
                                checkInputUpdated('update-password')
                                    ? setPassword(e.target.value)
                                    : console.log('Not valid password input.');
                            }}
                        />
                        <Form.Text>
                            Password must be at least 10 characters.
                        </Form.Text>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            id="update-email"
                            type="text"
                            placeholder={user.email}
                            onSubmit={(e) => {
                                checkInputUpdated('update-email')
                                    ? setEmail(e.target.value)
                                    : console.log('Not valid email input.');
                            }}
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
                        onClick={handleUpdate}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
