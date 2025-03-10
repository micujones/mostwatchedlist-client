import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const DeleteUserView = ({ user }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteUser = () => {
        const token = localStorage.getItem('token');

        fetch(
            `https://mostwatchedlist-f9604e12841c.herokuapp.com/users/${user.username}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    alert('Something went wrong.');
                    throw new Error('Something went wrong.');
                } else {
                    alert(`${user.username} was deregistered.`);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Button variant="danger" size="sm" onClick={handleShow}>
                Delete Account
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you would like to deregister? <br />
                    This action
                    <strong> cannot</strong> be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
