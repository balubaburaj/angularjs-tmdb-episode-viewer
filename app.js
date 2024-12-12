angular
  .module("myApp", [])
  .controller("EpisodeListCtrl", function ($scope, $http, $cacheFactory) {
    $scope.showId = ""; //57532; // Replace with your actual show ID
    $scope.apiKey = ""; // Replace with your TMDB API key
    $scope.apiKeyInputType = "password";
    $scope.toggleInputType = function () {
      $scope.apiKeyInputType =
        $scope.apiKeyInputType === "password" ? "text" : "password";
    };

    $scope.seasons = [];
    $scope.episodes = [];
    $scope.selectedSeason = null;

    const episodeCache = $cacheFactory("episodeCache");
    const seasonsCache = $cacheFactory("seasonsCache");
    $scope.IsSeasonLoading = false;
    $scope.ShowDetails = "";

    $scope.getEpisodesDetails = function (showId) {
      $scope.IsSeasonLoading = true;
      const apiUrl = `https://api.themoviedb.org/3/tv/${showId}?api_key=${$scope.apiKey}`;

      // Check if seasons data is already cached
      const cachedSeasons = seasonsCache.get(apiUrl);
      debugger;
      if (cachedSeasons) {
        $scope.seasons = cachedSeasons;
        $scope.IsSeasonLoading = false;
      } else {
        $http
          .get(apiUrl)
          .then((response) => {
            $scope.ShowDetails = response.data;
            $scope.seasons = response.data.seasons;
            seasonsCache.put(apiUrl, $scope.seasons);
            $scope.IsSeasonLoading = false;
          })
          .catch((error) => {
            console.error("Error fetching seasons:", error);
          });
      }
    };

    $scope.IsEpisodeLoading = false;

    $scope.episodeListFetchBySeason = function (showId, seasonNumber) {
      $scope.IsEpisodeLoading = true;

      const apiUrl =
        `https://api.themoviedb.org/3/tv/${showId}?api_key=${$scope.apiKey}&append_to_response=season/` +
        seasonNumber;

      // Check if episodes data is already cached
      const cachedEpisodes = episodeCache.get(apiUrl);
      debugger;
      if (cachedEpisodes) {
        $scope.episodes = cachedEpisodes;
        $scope.episodes.sort((a, b) => a.isChecked - b.isChecked);
        $scope.IsEpisodeLoading = false;
      } else {
        $http
          .get(apiUrl)
          .then((response) => {
            const episodes = response.data["season/" + seasonNumber].episodes;
            $scope.episodes = episodes.map((episode) => {
              episode.isChecked = false;
              return episode;
            });

            // Store the fetched data in the cache
            episodeCache.put(apiUrl, $scope.episodes);

            // Sort episodes by isChecked property
            $scope.episodes.sort((a, b) => a.isChecked - b.isChecked);
            $scope.IsEpisodeLoading = false;
          })
          .catch((error) => {
            console.error("Error fetching episodes:", error);
          });
      }
    };

    // ... other code ...
    $scope.lastSelectedText = "";
    $scope.titleSelected = "";
    $scope.toggleEpisode = function (episode) {
      if ($scope.lastSelectedText.length >= 3) {
        $scope.lastSelectedText += "-";
      }
      if ($scope.lastSelectedText.length == 0) {
        $scope.lastSelectedText =
          $scope.ShowDetails.name +
          ".S" +
          episode.season_number.toString().padStart(2, "0") +
          $scope.lastSelectedText;
      }
      $scope.titleSelected += episode.name + "-";
      $scope.filterEpisodes = "";
      const episodeNumber = episode.episode_number.toString().padStart(2, "0");
      var text = $scope.lastSelectedText + "E" + episodeNumber;
      $scope.lastSelectedText = text;
    };

    $scope.copyToClipboard = function () {
      const textArea = document.createElement("textarea");
      textArea.value = $scope.lastSelectedText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      $scope.lastSelectedText = "";
      $scope.titleSelected = "";
    };
  });
