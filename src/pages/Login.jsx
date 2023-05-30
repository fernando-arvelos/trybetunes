import { Component } from 'react';
import '../css/Login.css';
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
      <div className="login-page">
        <div className="container-login">
          <img src={ logo } alt="logo" className="logo-trybetunes" />
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
              <div data-testid="page-login" className="login">

                <form className="form-login">
                  <input
                    data-testid="login-name-input"
                    className="name-login"
                    placeholder="Qual é o seu nome?"
                    onChange={ this.handleChange }
                    name="userName"
                  />
                  <button
                    type="submit"
                    data-testid="login-submit-button"
                    className="button-login"
                    onClick={ this.createNameUser }
                    disabled={ userName.length < charUser }
                  >
                    Entrar
                  </button>
                </form>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
