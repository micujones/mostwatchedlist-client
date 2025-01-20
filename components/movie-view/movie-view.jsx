import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <img src={movie.imagePath} width="300px" />
            <h1>{movie.title}</h1>
            <p>Starring {movie.actors[0]} and {movie.actors[1]}</p>
            <p>Directed by {movie.director.name}</p>
            <p>{movie.description}</p>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
}

MovieView.propType = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        directors: PropTypes.object.isRequired,
        actors: PropTypes.array.isRequired,
        genre: PropTypes.object,
        image: PropTypes.string,
        featured: PropTypes.bool
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}