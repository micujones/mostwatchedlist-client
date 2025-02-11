// Allow a user to update their user information (username, password, email, date of birth);
// Allow a user to deregister;

import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';
import { UpdateUserView } from './update-user-view';
import { DeleteUserView } from './delete-user-view';

export const ProfileView = ({ movies, token }) => {
    // Reference to user in URL
    const { userId } = useParams();

    const [user, setUser] = useState({
        id: null,
        username: '',
        email: '',
        birthday: null,
        favoriteMovies: [],
    });

    const getUser = () => {
        fetch(`https://mostwatchedlist-f9604e12841c.herokuapp.com/users/`)
            .then((response) => response.json())
            .then((users) => {
                const currentUser = users.find((u) => u._id === userId);
                setUser(currentUser);
            });
    };

    const handleUpdate = () => {
        console.log('handling update.');
    };

    useEffect(() => {
        getUser();
    }, []);

    const favoriteMovies = movies.filter((movie) =>
        user.favoriteMovies.includes(movie.id)
    );

    return (
        <>
            <div>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
                {/* <UpdateUserView userId={userId} token={token} /> */}
                <Row>
                    <Stack direction="horizontal" gap={2}>
                        <UpdateUserView user={user} token={token} />
                        <DeleteUserView user={user} token={token} />
                    </Stack>
                </Row>
            </div>
            <br />
            <div>
                <h2>Favorite movies ({favoriteMovies.length}):</h2>
                <Row>
                    {favoriteMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};
