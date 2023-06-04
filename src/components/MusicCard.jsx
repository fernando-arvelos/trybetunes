import { Component } from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../css/MusicCard.css';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Checkbox, FormLabel } from '@chakra-ui/react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import { PlayerMusicCard } from '../styles/PlayerMusicCard';

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

      <Flex align="center">
        <Text
          { ...PlayerMusicCard.baseStyle }
        >
          {trackName}
        </Text>
        <audio
          src={ previewUrl }
          controls
          style={ { height: '56px', width: '371px' } }
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>

        {isLoading
          ? (
            <Box
              color="#003be5"
              fontSize="11px"
              fontWeight="400"
              lineHeight="18px"
            >
              <Loading />
            </Box>)
          : (
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
              <Text ml="52px">
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
          )}

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
