import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
    return (
        <Card
            className="h-100"
            as={Link}
            to={`/movies/${encodeURIComponent(movie.id)}`}
        >
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Directed by {movie.director.name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
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
