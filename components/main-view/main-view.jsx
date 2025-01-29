import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

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

    if (!user) {
        return (
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
        );
    }

    if (selectedMovie) {
        let similarMovies = movies.filter(
            (movie) =>
                selectedMovie.genre.name === movie.genre.name &&
                movie.title != selectedMovie.title
        );

        return (
            <>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => {
                        setSelectedMovie(null);
                    }}
                />
                <hr />
                <h2>Similar movies</h2>
                {similarMovies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </>
        );
    }

    if (movies.length === 0) {
        return <div>This list is empty.</div>;
    }

    return (
        <>
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                LOGOUT
            </button>
            <div>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
        </>
    );
};
