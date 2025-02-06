// Add a user Profile view (linked to the main navigation menu for authenticated users). As per your project brief, this view should:
// Display user information. You can obtain the logged in user information by using the /users endpoint and then filtering the returning list by comparing the usernames;
// Allow a user to update their user information (username, password, email, date of birth);
// Allow a user to deregister;
// Display a user's favorite movies as a list. For this you’ll need to filter the movies array with something like let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id)). With this, favoriteMovies is just a regular array of movie objects which could, for example, be displayed as movie cards (the MovieCard components would need to be passed to the ProfileView component and rendered there);
// Add a “Favorite” button to your MovieCard and/or MovieView components, so that logged in users can select a movie to store in their list of favorites;
// Allow a user to remove a movie from their list of favorites.

import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ movies }) => {
    // Reference to user
    const { userId } = useParams();

    const [user, setUser] = useState({
        id: null,
        username: '',
        email: '',
        birthday: null,
        favoriteMovies: [],
    });

    const getUser = () => {
        fetch(`https://mostwatchedlist-f9604e12841c.herokuapp.com/users/`)
            .then((response) => response.json())
            .then((users) => {
                const currentUser = users.find((u) => u._id === userId);
                setUser(currentUser);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    const favoriteMovies = movies.filter((movie) =>
        user.favoriteMovies.includes(movie.id)
    );

    return (
        <>
            {console.log('Opened profile url:', user)}
            {console.log('Favorite movies:', favoriteMovies)}
            <div>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
            </div>
            <br />
            <div>
                <h2>Favorite movies ({favoriteMovies.length}):</h2>
                <Row>
                    {favoriteMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};
