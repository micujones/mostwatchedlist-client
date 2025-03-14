import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// React bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './movie-view.scss';
import addIcon from '../../src/images/icon-add.svg';
import trashIcon from '../../src/images/icon-trash.svg';

export const MovieView = ({ movies, user, setUser }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    const [favorited, setFavorited] = useState(
        user.favoriteMovies.includes(movie.id)
    );
    const [icon, setIcon] = useState();

    // Update "favorited" when removing a movie
    useEffect(() => {
        setFavorited(user.favoriteMovies.includes(movie.id));
    }, [user]);

    useEffect(() => {
        favorited ? setIcon(trashIcon) : setIcon(addIcon);
    }, [favorited]);

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
                setFavorited(user.favoriteMovies.includes(movie.id));
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

    const renderIconAction = () => {
        icon === addIcon ? 'Add to favorites' : 'Remove from favorites';
    };

    return (
        <Container>
            <Row>
                <Col>
                    <img src={movie.image} width="100%" />
                </Col>
                <Col>
                    <h1>
                        {movie.title}
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 400, hide: 300 }}
                            overlay={
                                <Tooltip id="button-tooltip-2">
                                    {`${
                                        icon === addIcon
                                            ? 'Add to favorites'
                                            : 'Remove from favorites'
                                    }`}
                                </Tooltip>
                            }
                        >
                            <Button
                                onClick={setIconFunction}
                                variant={`${
                                    icon === addIcon ? 'success' : 'danger'
                                }`}
                                size="sm"
                                style={{ marginLeft: 12 }}
                            >
                                <img src={icon} className="icon" />
                            </Button>
                        </OverlayTrigger>
                    </h1>
                    <p>
                        Starring {movie.actors[0]} and {movie.actors[1]}
                    </p>
                    <p>Directed by {movie.director.name}</p>
                    <p>{movie.description}</p>
                </Col>
            </Row>
        </Container>
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
