import { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
import { Flex, Heading, Link, Text } from '@chakra-ui/layout';
import { getUser } from '../services/userAPI';
import fundo4 from '../img/fundo4.png';
import Loading from '../components/Loading';
import '../css/Profile.css';
import Header from '../components/Header';
import ampulheta from '../img/ampulheta.gif';
import { profileStyle } from '../styles/ProfileStyle';
import HiddenMenu from '../components/HiddenMenu';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userData: {},
      isMobile: true,
    };
  }

  componentDidMount() {
    this.getUserData();
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

  getUserData = async () => {
    const user = await getUser();
    this.setState({
      isLoading: false,
      userData: user,
    });
  };

  render() {
    const { userData, isLoading, isMobile } = this.state;
    const { name, email, image, description } = userData;

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
            bgImage={ fundo4 }
            bgSize="cover"
            h="178px"
            w="100%"
          >
            {isMobile
            && (
              <Flex
                m="10px 0 0 10px"
                zIndex="3"
              >
                <HiddenMenu />
              </Flex>)}
            {!isLoading && image.length > 0
            && (
              <Flex justify={ { base: 'flex-end', md: 'normal' } } w="100%">
                <Image
                  src={ image }
                  alt={ `Foto do usuário ${name}` }
                  { ...profileStyle.imageStyle }
                />
              </Flex>
            )}
          </Flex>

          <Flex
            bg="#e4e9f0"
            minH="calc(100vh - 178px)"
            w="100%"
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
                  m={ { base: '30px 0 0 10px',
                    md: '30px 0 0 320px',
                    lg: '30px 0 0 354px' } }
                  w="100%"
                >
                  <Heading { ...profileStyle.headingStyle }>Nome</Heading>
                  <Text { ...profileStyle.textStyle }>{ name }</Text>

                  <Heading mt="18.5px" { ...profileStyle.headingStyle }>E-mail</Heading>
                  <Text { ...profileStyle.textStyle }>{ email }</Text>

                  <Heading mt="28.5px" { ...profileStyle.headingStyle }>
                    Descrição
                  </Heading>
                  <Text h="156px" { ...profileStyle.textStyle }>{ description }</Text>

                  <Link
                    as={ RouterLink }
                    to="/profile/edit"
                    { ...profileStyle.linkStyle }
                  >
                    Editar perfil
                  </Link>
                </Flex>
              )}
          </Flex>
        </Flex>
      </Flex>

    );
  }
}

export default Profile;
