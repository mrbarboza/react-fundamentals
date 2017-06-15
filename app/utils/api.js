var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_CLIENT_SECRET";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
  return axios.get('https://api.github.com/users/' + username + params)
    .then(function(user){
      return user.data;
    });
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

function getStarsCount(repos) {
  return repos.data.reduce(function(count, repo){
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  var follwers = profile.followers;
  var totalStars = getStarsCount(repos);

  return (follwers * 3) + totalStars;
}

module.exports = {
  battle: function (players) {


  },

  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI).then(function(response) {
      return response.data.items
    });
  }
}
