import { Component } from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Flex, Text } from '@chakra-ui/layout';
import { Checkbox, FormLabel } from '@chakra-ui/react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { PlayerMusicCard } from '../styles/PlayerMusicCard';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
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
    });

    if (target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
      await onRemoveSong(music);
    }
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
    const { isChecked } = this.state;
    const { trackName, previewUrl, trackId } = music;
    return (

      <Flex
        direction={ { base: 'column', md: 'row' } }
        align="center"
      >
        <Text
          { ...PlayerMusicCard.baseStyle }
        >
          {trackName}
        </Text>
        <Flex align="center">
          <audio
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>

          <FormLabel
            htmlFor={ `fav-${trackId}` }
          >
            <Checkbox
              id={ `fav-${trackId}` }
              data-testid={ `checkbox-music-${trackId}` }
              isChecked={ isChecked }
              onChange={ (event) => this.handleChange(event) }
              style={ { display: 'none' } }
            />
            <Text ml={ { base: '10px', md: '52px' } }>
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
            </Text>
          </FormLabel>
        </Flex>
      </Flex>

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
