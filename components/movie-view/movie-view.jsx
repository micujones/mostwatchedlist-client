import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';

export const MovieView = ({ movies, user, token }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    const addMovieToFavorites = (event) => {
        // Prevents default behavior of reloading page
        event.preventDefault();

        const data = {
            id: movie.id,
            title: movie.title,
            description: movie.description,
            director: movie.director,
            actors: movie.actors,
            genre: movie.genre,
            image: movie.image,
            featured: movie.featured,
        };

        fetch(
            `https://mostwatchedlist-f9604e12841c.herokuapp.com/users/${user.username}/movies/${movie.id}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    body: JSON.stringify(data),
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    user.favoriteMovies.push(data.id);
                    alert(
                        `${movie.title} was add to ${user.username}'s favorites!`
                    );
                }
            })
            .catch((error) => {
                alert('Something broke.');
                console.log(error);
            });
    };

    const removeMovieFromFavorites = (event) => {
        // Prevents default behavior of reloading page
        event.preventDefault();

        fetch(
            `https://mostwatchedlist-f9604e12841c.herokuapp.com/users/${user.username}/movies/${movie.id}`,
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
                    alert(`${movie.title} was removed from favorites.`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <img src={movie.image} width="100%" />
            <h1>{movie.title}</h1>
            <p>
                Starring {movie.actors[0]} and {movie.actors[1]}
            </p>
            <p>Directed by {movie.director.name}</p>
            <p>{movie.description}</p>
            <Link to={`/`}>
                <Button variant="dark" className="button">
                    Back
                </Button>
                <Button onClick={addMovieToFavorites}>Favorite</Button>
                <Button onClick={removeMovieFromFavorites}>Remove</Button>
            </Link>
        </div>
    );
};

MovieView.propType = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.object.isRequired,
        actors: PropTypes.array.isRequired,
        genre: PropTypes.object,
        image: PropTypes.string,
        featured: PropTypes.bool,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};
