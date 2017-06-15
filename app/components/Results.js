var React = require('react');
var queryString = require('query-string');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

var api = require('../utils/api');
var PlayerPreview = require('./PlayerPreview');

function Profile(props) {
  return (
    <PlayerPreview avatar={ props.info.avatar_url } username = { props.info.login }>
      <ul className='space-list-items'>
        { props.info.name && <li>{ props.info.name }</li> }
        { props.info.location && <li>{ props.info.location }</li> }
        { props.info.company && <li>{ props.info.companey }</li> }
        <li>Followers: { props.info.followers }</li>
        <li>Following: { props.info.Following }</li>
        <li>Public Repos: { props.info.public_repos }</li>
        { props.info.blog && <li><a href={ props.info.blog }>{ props.info.blog }</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player(props) {
  return (
    <div className='column'>
      <h1 className='header'>{ props.label }</h1>
      <h2 style={{textAlign: 'center'}}>Score: { props.score }</h2>
      <Profile info={ props.profile } />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    var players = queryString.parse(this.props.location.search);

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (results) {
      if (results === null) {
        this.setState(function () {
          return{
            error: 'Looks like there was an error. Check both users exists on Github',
            loading: false,
          }
        })
      }

      this.setState(function () {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    }.bind(this));
  }

  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if (loading === true) {
      return (<div className="cssload-loader">Loading</div>)
    }

    if (error) {
      return (
        <div>
          <p>{ error }</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label="Winner"
          score={ winner.score }
          profile={ winner.profile }
        />

        <Player
          label="Loser"
          score={ loser.score }
          profile={ loser.profile }
        />
      </div>
    )
  }
}

module.exports = Results
