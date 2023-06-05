import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import ampulheta from '../img/ampulheta.gif';
import { AlbumCover } from '../styles/AlbumCover';
import fundo2 from '../img/fundo2.png';
import HiddenMenu from '../components/HiddenMenu';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      infoAlbum: {},
      isLoading: true,
      isMobile: true,
    };
  }

  componentDidMount() {
    this.listMusics();
    this.checkIsMobile();
    window.addEventListener('resize', this.checkIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkIsMobile);
  }

  checkIsMobile = () => {
    const sizeScreen = 960;
    const isMobile = window.innerWidth < sizeScreen;
    this.setState({ isMobile });
  };

  listMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const resultMusics = await getMusics(id);
    this.setState({
      musics: resultMusics.filter((music) => music !== resultMusics[0]),
      infoAlbum: resultMusics[0],
      isLoading: false,
    });
  };

  render() {
    const { musics, infoAlbum, isLoading, isMobile } = this.state;

    return (
      <Flex minH="100%">
        {!isMobile
          && <Header />}
        <Flex
          align="flex-end"
          direction="column"
          w={ { base: '100%', lg: 'calc(100% - 250px)' } }
        >

          <Flex
            bgImage={ fundo2 }
            bgSize="cover"
            h="178px"
            w="100%"
            zIndex="2"
          >
            {isMobile
            && (
              <Flex
                zIndex="2"
                m="10px 0 0 10px"
              >
                <HiddenMenu />
              </Flex>)}
            <Flex align={ { base: 'center', lg: 'normal' } }>
              {!isLoading
                && (
                  <>
                    <Image
                      src={ infoAlbum.artworkUrl100 }
                      alt={ `Imagem da capa do álbum ${infoAlbum.collectionName}` }
                      { ...AlbumCover.baseStyle }
                    />
                    <Flex
                      direction="column"
                      justify="flex-end"
                      mt={ { base: '0px', lg: '29px' } }
                      w={ { base: '218.4px', md: '330px' } }
                    >
                      <Text
                        color="white"
                        fontSize={ { base: '15px', md: '20px' } }
                        fontWeight="700"
                        lineHeight="150%"
                      >
                        { infoAlbum.collectionName}
                      </Text>
                      <Text
                        color="white"
                        fontSize={ { base: '12px', md: '14px' } }
                        fontWeight="400"
                        lineHeight="150%"
                      >
                        { infoAlbum.artistName}
                      </Text>
                    </Flex>
                  </>
                )}
            </Flex>
          </Flex>

          <Flex
            bg="#e4e9f0"
            minH="calc(100vh - 178px)"
            w="100%"
            justify={ { base: 'center', lg: 'normal' } }
          >
            {isLoading
              ? (
                <Flex align="center" justify="center" direction="column" w="100%">
                  <Image
                    src={ ampulheta }
                    alt="ampulheta"
                    boxSize={ { base: '30px', md: '50px' } }
                  />
                  <Loading color="#C0C3C9" size={ { base: '35px', md: '70px' } } />
                </Flex>)
              : (
                <Flex
                  direction="column"
                  m={ { base: '38px 0 0 0', lg: '38px 0 0 323px' } }
                >
                  { musics.map((music) => (
                    <Box key={ music.trackId }>
                      <MusicCard
                        music={ music }
                      />
                    </Box>
                  ))}
                </Flex>
              )}

          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
