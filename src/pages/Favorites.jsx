import { Component } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import fundo3 from '../img/fundo3.png';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import ampulheta from '../img/ampulheta.gif';
import HiddenMenu from '../components/HiddenMenu';

class Favorites extends Component {
  state = {
    isLoading: true,
    favoriteSongs: [],
    isMobile: true,
  };

  async componentDidMount() {
    await this.fetchFavoriteSongs();
    this.setState({ isLoading: false });
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

  fetchFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  };

  handleRemoveSong = async (music) => {
    await removeSong(music);
    await this.fetchFavoriteSongs();
  };

  render() {
    const { isLoading, favoriteSongs, isMobile } = this.state;

    return (
      <Flex minH="100vh">
        {!isMobile
          && <Header />}

        <Flex
          align="flex-end"
          direction="column"
          w={ { base: '100%', lg: 'calc(100% - 250px)' } }
        >
          <Flex
            bgImage={ fundo3 }
            bgSize="cover"
            h="178px"
            w="100%"
          >
            {isMobile
            && (
              <Flex
                zIndex="2"
                m="10px 0 0 10px"
              >
                <HiddenMenu />
              </Flex>)}
            <Flex
              justify="center"
              align="center"
              w="100%"
            >
              <Heading
                color="white"
                fontSize="20px"
                fontWeight="700"
                lineHeight="20px"
                textAlign="center"
              >
                Músicas Favoritas
              </Heading>
            </Flex>
          </Flex>

          <Flex
            align="center"
            bg="#e4e9f0"
            justify="center"
            minH="calc(100% - 178px)"
            w="100%"
          >
            <Box>
              {isLoading ? (
                <Flex
                  align="center"
                  direction="column"
                  justify="center"
                  w="100%"
                >
                  <Image
                    src={ ampulheta }
                    alt="ampulheta"
                    boxSize={ { base: '30px', md: '50px' } }
                  />
                  <Loading color="#C0C3C9" size={ { base: '35px', md: '70px' } } />
                </Flex>
              ) : (
                <>
                  <Flex
                    direction="column"
                    mt="38px"
                  >
                    {favoriteSongs.map((music) => (
                      <MusicCard
                        key={ music.trackId }
                        music={ music }
                        onRemoveSong={ this.handleRemoveSong }
                      />
                    ))}
                  </Flex>
                  <Flex>
                    {favoriteSongs.length === 0
                  && (
                    <Heading
                      color="#c0c3c9"
                      fontSize="23px"
                      fontWeight="400"
                      lineHeight="50px"
                      textAlign="center"
                    >
                      Você não possui músicas favoritas
                    </Heading>)}
                  </Flex>
                </>
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default Favorites;
