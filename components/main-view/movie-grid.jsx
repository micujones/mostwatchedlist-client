import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Form from 'react-bootstrap/Form';

import Col from 'react-bootstrap/Col';

import './main-view.scss';

export const MovieGrid = ({ movies, user, setUser }) => {
    const [grid, setGrid] = useState(
        movies.map((movie) => (
            <Col className="mb-3" key={movie.id} md={3}>
                <MovieCard movie={movie} user={user} setUser={setUser} />
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
            <div className="search-bar-container">
                <Form.Control
                    className="search-bar"
                    type="text"
                    placeholder="Search movies by title"
                    onChange={showSearchResults}
                />
            </div>

            {grid}
        </>
    );
};
