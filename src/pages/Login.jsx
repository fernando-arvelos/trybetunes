import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Flex, FormControl, Image, Input } from '@chakra-ui/react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../img/logo.png';
import ampulheta from '../img/ampulheta.gif';
import fundo from '../img/fundo.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  createNameUser = async () => {
    const { userName } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    try {
      await createUser({ name: userName });
      history.push('/search');
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { userName, loading } = this.state;
    const charUser = 3;

    return (
      <Flex
        justify="center"
        align="center"
        h="100vh"
        bgImage={ fundo }
        bgSize="cover"
      >
        <Flex
          bgColor="white"
          align="center"
          justify="center"
          borderRadius="2xl"
          mx="3"
          w={ ['350px', '350px', '750px', '750px'] }
          h={ ['220px', '220px', '450px', '450px'] }
        >
          {loading
            ? (
              <Flex
                align="center"
                direction="column"
                w="100%"
              >
                <Image
                  src={ ampulheta }
                  alt="ampulheta"
                  boxSize={ ['30px', '30px', '50px', '50px'] }

                />
                <Loading color="#C0C3C9" size={ ['35px', '35px', '70px', '70px'] } />
              </Flex>)
            : (
              <Flex
                align="center"
                justify="center"
                direction="column"
              >
                <Image
                  src={ logo }
                  alt="logo"
                  w={ ['110px', '110px', '187px', '187px'] }
                  mb={ ['30px', '30px', '68px', '75px'] }
                />
                <FormControl
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Input
                    data-testid="login-name-input"
                    onChange={ this.handleChange }
                    name="userName"
                    color="#003BE5"
                    border="1px"
                    borderRadius="100px"
                    textAlign="center"
                    fontSize="14px"
                    fontWeight="bold"
                    placeholder="Qual é o seu nome?"
                    _placeholder={ { opacity: 0.5, color: '#003BE5' } }
                    variant="unstyled"
                    mb="5px"
                    w={ ['290px', '290px', '400px', '400px'] }
                    h={ ['35px', '35px', '40px', '40px'] }
                  />
                  <Button
                    type="submit"
                    data-testid="login-submit-button"
                    onClick={ this.createNameUser }
                    isDisabled={ userName.length < charUser }
                    bgColor="#003BE5"
                    color="white"
                    borderRadius="100px"
                    _disabled={ { bg: 'gray' } }
                    w={ ['290px', '290px', '400px', '400px'] }
                    h={ ['35px', '35px', '40px', '40px'] }
                    _hover="none"
                  >
                    Entrar
                  </Button>
                </FormControl>
              </Flex>
            )}
        </Flex>
      </Flex>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
