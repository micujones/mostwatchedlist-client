import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export const MainView = () => {
    const [ movies, setMovies ] = useState([])

    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        fetch('https://mostwatchedlist-f9604e12841c.herokuapp.com/movies')
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.title,
                        description: movie.description,
                        director: movie.director,
                        actors: movie.actors,
                        genre: movie.genre,
                        image: movie.imagePath,
                        featured: movie.featured
                    }
                });

                setMovies(moviesFromApi);
            });
    })

    if (selectedMovie) {
        return (
            <MovieView 
                movie={selectedMovie} 
                onBackClick={() => {
                    setSelectedMovie(null)
            }}/>
        )
    }

    if (movies.length === 0) {
        return <div>This list is empty.</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movies.indexOf(movie)}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
}