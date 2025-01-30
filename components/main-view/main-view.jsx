import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';

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
        <Row>
            {!user ? (
                <>
                    <LoginView
                        onLoggedIn={(user) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </>
            ) : selectedMovie ? (
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
            ) : movies.length === 0 ? (
                <div>The list is empty.</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
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
