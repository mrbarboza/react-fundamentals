var React = require('react');
var PropTypes = require('prop-types');

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text
    }
  }

  render() {
    return (
      <p className='cssload-loader'>
        { this.state.text }
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
}

Loading.defaultProps = {
  text: 'Loading'
}

module.exports = Loading
