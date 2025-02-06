// Allow a user to update their user information (username, password, email, date of birth);
// Allow a user to deregister;

import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ movies }) => {
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
