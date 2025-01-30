import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const MainView = () => {
    // User data variables
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    // Movie data variables
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) return;

        fetch('https://mostwatchedlist-f9604e12841c.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty.</div>
            ) : (
                <>
                    <Row className="mb-3" style={{ padding: '10px 0px' }}>
                        <Col md={{ span: 1, offset: 11 }}>
                            <Button
                                variant="dark"
                                className="button"
                                onClick={() => {
                                    setUser(null);
                                    setToken(null);
                                    localStorage.clear();
                                }}
                            >
                                Logout
                            </Button>
                        </Col>
                    </Row>

                    {movies.map((movie) => (
                        <Col className="mb-3" key={movie._id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );

    {
        /* let similarMovies = movies.filter(
            (movie) =>
                selectedMovie.genre.name === movie.genre.name &&
                movie.title != selectedMovie.title
        ); */
    }
};
