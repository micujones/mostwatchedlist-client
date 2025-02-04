import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export const MovieView = ({ movies, user }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

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
                <Button onClick={() => addMovieToFavorites(user, movie)}>
                    Favorite
                </Button>
            </Link>
        </div>
    );
};

function addMovieToFavorites(user, movie) {
    user.favoriteMovies.push(movie._id);
}

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
