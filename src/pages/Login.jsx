import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../img/logo.png';
import ampulheta from '../img/ampulheta.gif';

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
      <section
        className="h-screen flex justify-center items-center bg-fundo bg-cover"
      >
        <div
          className="rounded-2xl mx-20 bg-white w-96 h-60
           flex items-center justify-center md:w-750 md:h-450"
        >
          {loading
            ? (
              <div className="loading-login">
                <img
                  src={ ampulheta }
                  alt="ampulheta"
                />
                <Loading />
              </div>)
            : (
              <div
                className="flex items-center justify-center flex-col"
              >
                <img src={ logo } alt="logo" className="w-128 mb-9 md:w-187 md:mb-65" />
                <form className="flex items-center justify-center flex-col">
                  <input
                    data-testid="login-name-input"
                    placeholder="Qual é o seu nome?"
                    onChange={ this.handleChange }
                    name="userName"
                    className="border-blue-700 border rounded-3xl
                      placeholder:text-blue-600 placeholder: text-center outline-none
                      text-blue-700 text-sm font-semibold w-60 h-8 mb-2 md:w-400
                      md:h-40 md:mb-9"
                  />
                  <button
                    type="submit"
                    data-testid="login-submit-button"
                    onClick={ this.createNameUser }
                    disabled={ userName.length < charUser }
                    className="rounded-3xl
                    bg-blue-700 text-center outline-none md:w-400 md:h-40
                    text-white text-sm font-semibold w-60 h-8"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            )}
        </div>
      </section>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
