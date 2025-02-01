// Add a user Profile view (linked to the main navigation menu for authenticated users). As per your project brief, this view should:
// Display user information. You can obtain the logged in user information by using the /users endpoint and then filtering the returning list by comparing the usernames;
// Allow a user to update their user information (username, password, email, date of birth);
// Allow a user to deregister;
// Display a user's favorite movies as a list. For this you’ll need to filter the movies array with something like let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id)). With this, favoriteMovies is just a regular array of movie objects which could, for example, be displayed as movie cards (the MovieCard components would need to be passed to the ProfileView component and rendered there);
// Add a “Favorite” button to your MovieCard and/or MovieView components, so that logged in users can select a movie to store in their list of favorites;
// Allow a user to remove a movie from their list of favorites.

export const ProfileView = ({ user }) => {};
