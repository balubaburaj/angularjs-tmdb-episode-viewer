# TMDB Episode Manager
This AngularJS 1.8 application helps you manage and organize your TV show episode collection. It utilizes the TMDB API to fetch episode details and provides features for filtering, selecting, and copying episode information.

## Features
 - Secure API Key Input: Enter your TMDB API key for secure access to show data.
 - Show Details Fetching: View information about a specific TV show, including seasons.
 - Season Selection: Choose a particular season to display its episodes.
 - Episode Listing: See a list of all episodes in the selected season with checkboxes.
 - Episode Search: Filter episodes by name to quickly find specific ones.
 - Episode Selection and Copying: Select multiple episodes using checkboxes and copy their formatted names to the clipboard for easy renaming of files or other purposes.
 - Caching: Leverages `$cacheFactory` to store API responses and improve performance.

## Using the Application
 - Obtain a TMDB API Key: Create an account on [TMDB](https://www.themoviedb.org/) and generate an API key.
 - Clone the Repository: Clone this repository to your local machine using `git clone https://github.com/balubaburaj/angularjs-tmdb-episode-viewer.git`
 - Install Dependencies: Navigate to the project directory and run `npm install` to install required dependencies.
 - Configure API Key: Open `app.js` and replace the placeholder value of `$scope.apiKey` with your actual TMDB API key. Or you can enter it in a text box
 - Run the Application: Open `index.html` in your web browser. You'll be presented with an interface to enter the show's TMDB ID and select functionalities.

## Potential Use Cases
 - Renaming Downloaded Episodes: Use the copied episode names, including show name, season number, and episode number, to accurately rename downloaded TV show episodes.
 - Organizing Media Libraries: Organize your media library by category based on episode selection.
 - Tracking Watched Episodes: Keep track of watched and unwatched episodes, assisting with TV show progress tracking.
 - Custom Scripts and Automation: Utilize the copied episode information as input for custom scripts or automation tasks to further manage your collection.

## Development & Contribution
Feel free to fork this repository and contribute to its development. The code is well-structured and utilizes AngularJS best practices for easy extension.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
