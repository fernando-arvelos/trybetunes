import { Component } from 'react';
import { isEmail } from 'validator';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import fundobranco from '../img/fundobranco.png';
import Loading from '../components/Loading';
import '../css/ProfileEdit.css';
import Header from '../components/Header';
import ampulheta from '../img/ampulheta.gif';

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
    };
  }

  componentDidMount() {
    this.getUserData();
  }

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
    const { userData, isLoading, disabledButton } = this.state;
    const { name, email, image, description } = userData;
    const number = 5;
    return (
      <section className="section-master-profileedit">
        <Header />

        <section className="section-profileedit">

          <div className="background-up-profileedit">
            <div className="img-input-profile-edit">
              {image.length > number
                ? (
                  <img
                    src={ image }
                    alt={ `Foto do usuário ${name}` }
                  />)
                : (
                  <img src={ fundobranco } alt="" />
                )}

              {!isLoading
                && <input
                  name="image"
                  type="text"
                  placeholder="Insira um link da sua foto"
                  defaultValue={ image || '' }
                  onChange={ this.handleInputChange }
                />}
            </div>
          </div>

          <div className="background-down-profileedit">
            {isLoading
              ? (
                <div className="loading-profileedit">
                  <img
                    src={ ampulheta }
                    alt="ampulheta"
                  />
                  <Loading />
                </div>
              ) : (
                <div className="edit-user-data">
                  <form>
                    <h1>Nome</h1>
                    <p>Fique a vontade para usar seu nome social</p>
                    <input
                      type="text"
                      name="name"
                      placeholder="Digite seu nome"
                      data-testid="edit-input-name"
                      defaultValue={ name || '' }
                      onChange={ this.handleInputChange }
                    />

                    <h1>E-mail</h1>
                    <p>Escolha um e-mail que consulte diariamente</p>
                    <input
                      type="text"
                      name="email"
                      placeholder="user@email.com.br"
                      data-testid="edit-input-email"
                      defaultValue={ email || '' }
                      onChange={ this.handleInputChange }
                    />

                    <h1>Descrição</h1>
                    <textarea
                      name="description"
                      placeholder="Sobre mim"
                      data-testid="edit-input-description"
                      defaultValue={ description || '' }
                      onChange={ this.handleInputChange }
                    />
                    <br />

                    <button
                      type="submit"
                      data-testid="edit-button-save"
                      disabled={ disabledButton }
                      onClick={ this.handleSubmit }
                    >
                      Salvar
                    </button>
                  </form>
                </div>
              )}
          </div>

        </section>
      </section>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
