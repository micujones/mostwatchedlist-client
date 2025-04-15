import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import './movie-card.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import addIcon from '../../src/images/icon-add.svg';
import trashIcon from '../../src/images/icon-trash.svg';

export const MovieCard = ({ movie, user, setUser }) => {
    // const [favorited, setFavorited] = useState(
    //     user.favoriteMovies.includes(movie.id)
    // );
    // const [icon, setIcon] = useState();

    // Update "favorited" when removing a movie
    // useEffect(() => {
    //     setFavorited(user.favoriteMovies.includes(movie.id));
    // }, [user]);

    // useEffect(() => {
    //     favorited ? setIcon(trashIcon) : setIcon(addIcon);
    // }, [favorited]);

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
                setFavorited(user.favoriteMovies.includes(movie.id)); // Returns true
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
                }
                const remainingMovies = user.favoriteMovies.filter(
                    (m) => m !== movie.id
                );
                setUser((prevUser) => ({
                    ...prevUser,
                    favoriteMovies: remainingMovies,
                }));
                alert(`${movie.title} was removed from favorites.`);
            })
            .catch((error) => {
                alert('Something went wrong.');
                console.log(error);
            });
    };

    const setIconFunction = () => {
        icon === addIcon
            ? addMovieToFavorites(event)
            : removeMovieFromFavorites(event);
    };

    return (
        <>
            <Card className="card h-100">
                <Card.Img
                    variant="top"
                    className="card-image"
                    src={movie.image}
                />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Directed by {movie.director.name}</Card.Text>
                </Card.Body>
                <Card.Footer className="interact-buttons">
                    <Button
                        className="more-info-btn"
                        as={Link}
                        to={`/movies/${encodeURIComponent(movie.id)}`}
                    >
                        More info
                    </Button>
                    {/* <Button
                        onClick={setIconFunction}
                        variant={`${icon === addIcon ? 'success' : 'danger'}`}
                        size="sm"
                    >
                        <img
                            src={icon}
                            className={`${
                                icon === addIcon ? 'add-icon' : 'trash-icon'
                            }`}
                        />
                    </Button> */}
                </Card.Footer>
            </Card>
        </>
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
