// Allow a user to update their user information (username, password, email, date of birth);
// Allow a user to deregister;

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { MovieCard } from '../movie-card/movie-card';
import { UpdateUserView } from './update-user-view';
import { DeleteUserView } from './delete-user-view';

export const ProfileView = ({ movies, user, setUser }) => {
    const favoriteMovies = movies.filter((movie) =>
        user.favoriteMovies.includes(movie.id)
    );

    return (
        <>
            <div style={{ paddingTop: '24px' }}>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
                <Row>
                    <Stack direction="horizontal" gap={2}>
                        <UpdateUserView user={user} setUser={setUser} />
                        <DeleteUserView user={user} />
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
