import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card
            className="h-100"
            style={{ cursor: 'pointer' }}
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {/* imagePath is the key name in the database */}
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Directed by {movie.director.name}</Card.Text>
            </Card.Body>
        </Card>
    );
};

MovieCard.propType = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.object.isRequired,
        actors: PropTypes.array.isRequired,
        genre: PropTypes.object,
        image: PropTypes.string,
        featured: PropTypes.bool,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};
