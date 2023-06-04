import { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { Flex, Icon, Image, Link, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../img/logo.png';
import ampulheta from '../img/ampulheta.gif';
import fundobranco from '../img/fundobranco.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      imageUser: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getNameUser();
  }

  getNameUser = async () => {
    const getNameUser = await getUser();
    this.setState({
      nameUser: getNameUser.name,
      imageUser: getNameUser.image,
    });
    this.setState({ loading: false });
  };

  render() {
    const { nameUser, imageUser, loading } = this.state;
    return (
      <Flex
        h={ ['600px', '85vh', '85vh', '100vh'] }
        w="250px"
        direction="column"
        align="center"
        justify="space-between"
      >

        <Flex align="center" mt="34px">
          <Image
            src={ logo }
            alt="logo"
            w="170px"
            mb="40px"
          />
        </Flex>

        <Flex
          direction="column"
          w="100%"
          h="100%"
          justify="space-evenly"
          ml="40px"
        >
          <Flex align="center">
            <SearchIcon color="#5C606A" w="50px" />
            <Link
              as={ RouterLink }
              to="/search"
              fontWeight="700"
              fontSize="16px"
              letterSpacing="0.03em"
              textTransform="capitalize"
              color="#444955"
            >
              Pesquisa
            </Link>
          </Flex>

          <Flex align="center">
            <Icon as={ AiOutlineStar } color="C0C3C9" w="50px" />
            <Link
              as={ RouterLink }
              to="/favorites"
              fontWeight="400"
              fontSize="16px"
              letterSpacing="0.03em"
              textTransform="capitalize"
              color="#444955"
            >
              Favoritas
            </Link>
          </Flex>

          <Flex align="center">
            <Icon as={ CgProfile } color="C0C3C9" w="50px" />
            <Link
              as={ RouterLink }
              to="/profile"
              fontWeight="400"
              fontSize="16px"
              letterSpacing="0.03em"
              textTransform="capitalize"
              color="#444955"
            >
              Perfil
            </Link>
          </Flex>
        </Flex>

        <Flex mb="40px" w="100%">
          {loading ? (
            <Flex align="center" ml="40px" h="50px">
              <Image
                src={ ampulheta }
                alt="ampulheta"
                mr="13px"
                w="30px"
              />
              <Loading color="#003BE5" size={ ['16px'] } />
            </Flex>
          ) : (
            <Flex align="center" ml="40px" h="50px">
              {imageUser && imageUser.length > 0
                ? (
                  <Image
                    src={ imageUser }
                    alt={ `Foto do usuário ${nameUser}` }
                    w="40px"
                    borderRadius="full"
                    mr="13px"
                  />
                ) : (
                  <Image
                    src={ fundobranco }
                    alt=""
                    w="0px"
                    borderRadius="full"
                    mr="13px"
                  />
                )}
              <Text>{nameUser}</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    );
  }
}

export default Header;
