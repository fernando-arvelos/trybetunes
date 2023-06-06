import { Component } from 'react';
import { isEmail } from 'validator';
import PropTypes from 'prop-types';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Button, FormControl, Image, Input, Textarea } from '@chakra-ui/react';
import { getUser, updateUser } from '../services/userAPI';
import fundobranco from '../img/fundobranco.png';
import fundo4 from '../img/fundo4.png';
import Loading from '../components/Loading';
import '../css/ProfileEdit.css';
import Header from '../components/Header';
import ampulheta from '../img/ampulheta.gif';
import HiddenMenu from '../components/HiddenMenu';
import { profileEditStyle } from '../styles/ProfileEditStyles';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userData: {
        description: '',
        email: '',
        image: '',
        name: '',
      },
      disabledButton: true,
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

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prev) => ({
      ...prev,
      userData: {
        ...prev.userData,
        [name]: value,
      },
    }), () => {
      this.validateForm();
    });
  };

  validateForm = () => {
    const { userData: { email, name, description } } = this.state;
    const isEmailValid = isEmail(email);
    const isNameValid = name.length >= 2;
    const isDescriptionValid = description.length >= 2;

    this.setState({
      disabledButton: !(isEmailValid && isNameValid && isDescriptionValid),
    });
  };

  handleSubmit = async (event) => {
    const { userData: { email, name, description, image } } = this.state;
    const { history } = this.props;
    event.preventDefault();
    await updateUser({
      name,
      email,
      image,
      description,
    });
    history.push('/profile');
  };

  render() {
    const { userData, isLoading, disabledButton, isMobile } = this.state;
    const { name, email, image, description } = userData;
    const number = 5;

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
              <Flex m="10px 0 0 10px" zIndex="3">
                <HiddenMenu />
              </Flex>)}
            <Flex justify={ { base: 'flex-end', md: 'normal' } } w="100%">
              <Flex
                { ...profileEditStyle.imgBoxStyle }
              >
                {image.length > number
                  ? (
                    <Image
                      src={ image }
                      alt={ `Foto do usuário ${name}` }
                      { ...profileEditStyle.imgStyle }
                    />)
                  : (
                    <Image
                      src={ fundobranco }
                      alt=""
                      { ...profileEditStyle.imgStyle }
                    />
                  )}

                {!isLoading
                && <Input
                  name="image"
                  type="text"
                  defaultValue={ image || '' }
                  onChange={ this.handleInputChange }
                  { ...profileEditStyle.linkImage }
                  _hover="none"
                />}
              </Flex>
            </Flex>
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
                </Flex>
              ) : (
                <Flex
                  direction="column"
                  m={ { base: '130px 10px 0 10px',
                    md: '29px 10px 0 300px',
                    lg: '29px 0 0 382px' } }
                  w="100%"
                >
                  <FormControl>
                    <Heading { ...profileEditStyle.h1Form }>Nome</Heading>
                    <Text { ...profileEditStyle.textForm }>
                      Fique a vontade para usar seu nome social
                    </Text>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Digite seu nome"
                      data-testid="edit-input-name"
                      defaultValue={ name || '' }
                      onChange={ this.handleInputChange }
                      _hover="none"
                      { ...profileEditStyle.inputForm }
                    />

                    <Heading { ...profileEditStyle.h1Form }>E-mail</Heading>
                    <Text { ...profileEditStyle.textForm }>
                      Escolha um e-mail que consulte diariamente
                    </Text>
                    <Input
                      type="text"
                      name="email"
                      placeholder="user@email.com.br"
                      data-testid="edit-input-email"
                      defaultValue={ email || '' }
                      onChange={ this.handleInputChange }
                      _hover="none"
                      { ...profileEditStyle.inputForm }
                    />

                    <Heading { ...profileEditStyle.h1Form }>Descrição</Heading>
                    <Textarea
                      name="description"
                      placeholder="Sobre mim"
                      data-testid="edit-input-description"
                      defaultValue={ description || '' }
                      onChange={ this.handleInputChange }
                      _hover="none"
                      { ...profileEditStyle.textAreaForm }
                    />
                    <br />

                    <Button
                      type="submit"
                      data-testid="edit-button-save"
                      isDisabled={ disabledButton }
                      onClick={ this.handleSubmit }
                      _hover="none"
                      { ...profileEditStyle.buttonForm }
                    >
                      Salvar
                    </Button>
                  </FormControl>
                </Flex>
              )}
          </Flex>

        </Flex>
      </Flex>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
