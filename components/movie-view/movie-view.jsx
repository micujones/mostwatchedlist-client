import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export const MovieView = ({ movies, user, setUser }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    const addMovieToFavorites = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        fetch(
            `https://mostwatchedlist-f9604e12841c.herokuapp.com/users/${user.username}/movies/${movie.id}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong.');
                } else {
                    user.favoriteMovies.push(movie.id);
                    alert(
                        `${movie.title} was added to ${user.username}'s favorites!`
                    );
                }
            })
            .catch((error) => {
                alert('Something went wrong.');
                console.log(error);
            });
    };

    const removeMovieFromFavorites = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

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
                    throw new Error('Something went wrong.');
                } else {
                    const remainingMovies = user.favoriteMovies.filter(
                        (m) => m !== movie.id
                    );
                    setUser((prevUser) => ({
                        ...prevUser,
                        favoriteMovies: remainingMovies,
                    }));
                    alert(`${movie.title} was removed from favorites.`);
                }
            })
            .catch((error) => {
                alert('Something went wrong.');
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
