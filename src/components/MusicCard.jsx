import { Component } from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../css/MusicCard.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleChange = async ({ target }) => {
    const { music, onRemoveSong } = this.props;
    this.setState({
      isChecked: target.checked,
      isLoading: true,
    });

    if (target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
      await onRemoveSong(music);
    }

    this.setState({
      isLoading: false,
    });
  };

  getFavorites = async () => {
    const { music } = this.props;
    const local = await getFavoriteSongs();
    this.setState({
      isChecked: local.some((element) => element.trackId === music.trackId),
    });
  };

  render() {
    const { music } = this.props;
    const { isChecked, isLoading } = this.state;
    const { trackName, previewUrl, trackId } = music;
    return (

      <div className="player-music">
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        {isLoading
          ? (
            <div className="loading-favorite">
              <Loading />
            </div>)
          : (
            <label
              htmlFor={ `fav-${trackId}` }
            >
              <input
                type="checkbox"
                id={ `fav-${trackId}` }
                data-testid={ `checkbox-music-${trackId}` }
                checked={ isChecked }
                onChange={ (event) => this.handleChange(event) }
                style={ { display: 'none' } }
              />
              <p className="heart-fav">
                {
                  isChecked
                    ? (
                      <AiFillHeart
                        size={ 20 }
                        color="#EC5050"
                      />
                    )

                    : (
                      <AiOutlineHeart
                        size={ 20 }
                      />
                    )
                }
              </p>
              <span style={ { display: 'none' } }>Favorita</span>
            </label>
          )}

      </div>

    );
  }
}

export default MusicCard;

MusicCard.defaultProps = {
  onRemoveSong: () => {},
};

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  onRemoveSong: PropTypes.func,
};
