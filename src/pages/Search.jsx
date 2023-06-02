import { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Button, FormControl, Image, Input, Link } from '@chakra-ui/react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import ampulheta from '../img/ampulheta.gif';
import HiddenMenu from '../components/HiddenMenu';
import fundo1 from '../img/fundo4.png';
import { buttonStyles } from '../components/ButtonSearch';
import { inputSearch } from '../components/InputSearch';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      resultArtist: '',
      loading: false,
      notFound: false,
      albums: [],
      isMobile: true,
    };
  }

  componentDidMount() {
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  clearInput = () => {
    this.setState({
      artistName: '',
    });
  };

  searchAlbums = async () => {
    this.setState({ loading: true });
    const { artistName } = this.state;
    const resultAlbums = await searchAlbumsAPI(artistName);
    this.setState({ loading: false,
      resultArtist: artistName,
      albums: resultAlbums,
      notFound: resultAlbums.length === 0,
    });
  };

  render() {
    const { artistName, loading,
      resultArtist, albums, notFound, isMobile } = this.state;
    const charArtistName = 2;

    return (
      <Flex minH="100%">
        {!isMobile
          && <Header />}
        <Flex
          w={ ['100%', '100%', 'calc(100% - 250px)', 'calc(100% - 250px)'] }
          direction="column"
          align="flex-end"
          minH="100vh"
        >
          <Flex
            justify={ ['none', 'none', 'center', 'center'] }
            bgImage={ fundo1 }
            bgSize="cover"
            h="178px"
            w="100%"
            direction="column"
          >
            {isMobile
            && (
              <Flex
                zIndex="2"
                mt="10px"
                ml="10px"
              >
                <HiddenMenu />
              </Flex>)}

            <FormControl
              display="flex"
              justifyContent="center"
              mt="20px"
            >
              <Input
                name="artistName"
                value={ artistName }
                onChange={ this.handleChange }
                placeholder="Nome do Artista"
                { ...inputSearch.baseStyle }
              />

              <Button
                type="button"
                data-testid="search-artist-button"
                onClick={ () => {
                  this.searchAlbums();
                  this.clearInput();
                } }
                isDisabled={ artistName.length < charArtistName }
                _disabled={ { bg: 'gray.400', color: 'black' } }
                { ...buttonStyles.baseStyle }
              >
                Procurar
              </Button>
            </FormControl>
          </Flex>

          <Flex bg="#e4e9f0" minH="calc(100% - 178px)" w="100%">
            {loading
              ? (
                <Flex align="center" justify="center" direction="column" w="100%">
                  <Image
                    src={ ampulheta }
                    alt="ampulheta"
                    boxSize={ ['30px', '30px', '50px', '50px'] }
                  />
                  <Loading color="#C0C3C9" size={ ['35px', '35px', '70px', '70px'] } />
                </Flex>)
              : (
                <Box w="100%">
                  {notFound
                    ? (
                      <Flex align="center" justify="center" h="100%" w="100%">
                        <Heading
                          as="h1"
                          color="#c0c3c9"
                          fontSize={ ['15px', '15px', '30px', '30px'] }
                          fontWeight="400"
                        >
                          Nenhum álbum foi encontrado
                        </Heading>
                      </Flex>)
                    : (albums.length > 0
                      && (
                        <Flex align="center" direction="column" justify="center">
                          <Box mt="63px">
                            <Text
                              color="#003be5"
                              fontSize={ ['15px', '15px', '20px', '20px'] }
                              fontStyle="italic"
                              fontWeight="300"
                              textAlign="center"
                            >
                              {`Resultado de álbuns de ${resultArtist.charAt(0)
                                .toUpperCase() + resultArtist.slice(1)}:`}
                            </Text>
                          </Box>
                          <Flex
                            wrap="wrap"
                            justify="center"
                            mt="52.11px"
                          >
                            {albums.map((album, index) => (
                              <Link
                                as={ RouterLink }
                                key={ index }
                                data-testid={ `link-to-album-${album.collectionId}` }
                                to={ {
                                  pathname: `/album/${album.collectionId}`,
                                  state: { resultArtist: albums },
                                } }
                                className="link"
                                textDecor="none"
                                _hover={ { textDecor: 'none' } }
                              >

                                <Image
                                  src={ album.artworkUrl100 }
                                  alt={
                                    `Imagem da capa do álbum ${album.collectionName}`
                                  }
                                  borderRadius="10px"
                                  boxSize="200px"
                                  mr={ ['0px', '0px', '25px', '25px'] }
                                  mb="3px"
                                  mixBlendMode="normal"
                                />
                                <Text
                                  color="#3d495c"
                                  fontSize="12px"
                                  fontWeight="700"
                                  h="35px"
                                  w="200px"
                                  lineHeight="150%"
                                >
                                  {album.collectionName}
                                </Text>
                                <Text
                                  color="#3d495c"
                                  fontSize="12px"
                                  fontWeight="400"
                                  h="14px"
                                  w="147px"
                                  lineHeight="150%"
                                  mb="25px"
                                >
                                  {album.artistName}
                                </Text>

                              </Link>
                            ))}
                          </Flex>
                        </Flex>)

                    )}
                </Box>
              )}
          </Flex>

        </Flex>
      </Flex>
    );
  }
}

export default Search;
