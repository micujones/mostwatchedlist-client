import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {/* imagePath is the key name in the database */}
            <Card.Img variant="top" src={movie.imagePath} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Directed by {movie.director.name}</Card.Text>
                <Button
                    onClick={() => {
                        onMovieClick(movie);
                    }}
                    variant="link"
                >
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propType = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        directors: PropTypes.object.isRequired,
        actors: PropTypes.array.isRequired,
        genre: PropTypes.object,
        image: PropTypes.string,
        featured: PropTypes.bool,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};
