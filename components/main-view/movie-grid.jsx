import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Form from 'react-bootstrap/Form';

import Col from 'react-bootstrap/Col';

export const MovieGrid = ({ movies }) => {
    const [grid, setGrid] = useState(
        movies.map((movie) => (
            <Col className="mb-3" key={movie.id} md={3}>
                <MovieCard movie={movie} />
            </Col>
        ))
    );

    const showSearchResults = (event) => {
        const value = event.target.value;

        setGrid(
            movies.map(function (movie) {
                if (movie.title.toLowerCase().includes(value.toLowerCase())) {
                    return (
                        <Col className="mb-3" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    );
                }
            })
        );
    };

    return (
        <>
            {/* search bar */}
            <Form.Control
                type="text"
                placeholder="Search movies by title"
                onChange={showSearchResults}
            />
            {grid}
        </>
    );
};
