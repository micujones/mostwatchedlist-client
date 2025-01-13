import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export const MainView = () => {
    const [ movies, setMovies ] = useState([
        {
            title: 'Cruella',
            description: 'In 1970s London amidst the punk rock revolution, a young grifter named Estella de Ville is determined to make a name for herself in the fashion world. However, her path to success takes a dark turn as she becomes obsessed with fur, leading her to transform into the infamous and psychopathic Cruella de Vil.',
            genre: {
                name: 'Crime',
                description: 'Crime films explore the world of criminal activity, often focusing on themes of corruption, violence, and the pursuit of power.'
            },
            director: {
                name: 'Craig Gillespie',
                bio: 'Craig Gillespie is an Australian film director and screenwriter. He is best known for directing the films I, Tonya (2017) and Cruella (2021).'
            },
            actors: [ 'Emma Stone', 'Emma Thompson', 'Paul Walter Hauser', 'Joel Fry' ],
            imagePath: 'https://wallpapercat.com/w/full/3/4/5/35957-3840x2160-desktop-4k-cruella-2021-background-photo.jpg',
            featured: true
        },
        {
            title: 'Joker',
            description: 'A failed comedian begins a slow descent into madness as he transforms into a criminal mastermind.',
            genre: {
                name: 'Thriller',
                description: 'Thriller movies are a genre of suspenseful films that aim to evoke feelings of excitement, anxiety, and fear in viewers, often by focusing on a protagonist facing a dangerous or mysterious situation.'
            },
            director: {
                name: 'Todd Phillips',
                bio: 'Todd Phillips is an American film director and screenwriter known for his work in comedy and dark comedy.'
            },
            actors: [ 'Joaquin Phoenix', 'Zazie Beetz', 'Frances Conroy', 'Robert De Niro' ],
            imagePath: 'https://preview.redd.it/mmd6h3266jn51.jpg?width=640&crop=smart&auto=webp&s=bd7fd0c5c6c3b3e7bd8f1139cbb6042b7801c3fb',
            featured: true
        },
        {
            title: 'Zootopia',
            description: 'In a mammal metropolis where predator and prey live side-by-side, a determined rabbit cop and a cynical fox must work together to uncover a conspiracy.',
            genre: {
                name: 'Adventure',
                description: 'Adventure movies involve exciting and often perilous journeys, featuring protagonists who face challenges, overcome obstacles, and explore unknown or exotic locations.'
            },
            director: {
                name: 'Byron Howard',
                bio: 'Byron Howard is an American animator, film director, screenwriter, and voice actor. He is best known for his work at Walt Disney Animation Studios, where he co-directed the films Tangled (2010), Zootopia (2016), and Encanto (2021).'
            },
            actors: [ 'Ginnifer Goodwin', 'Jason Bateman', 'Idris Elba', 'Jenny Slate' ],
            imagePath: 'https://wallpapercat.com/w/full/6/6/3/153831-3840x2160-desktop-4k-zootopia-wallpaper-image.jpg',
            featured: true
        }
    ])

    const [selectedMovie, setSelectedMovie] = useState(null);
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