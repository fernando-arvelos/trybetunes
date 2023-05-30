import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../img/logo.png';
import ampulheta from '../img/ampulheta.gif';
import fundobranco from '../img/fundobranco.png';
import '../css/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      imageUser: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getNameUser();
  }

  getNameUser = async () => {
    this.setState({ loading: true });
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
      <section className="section-header">

        <div className="logo-header">
          <img src={ logo } alt="logo" />
        </div>

        <header data-testid="header-component" className="header">

          <div className="links-other-pages">
            <div className="link-search">
              <RxMagnifyingGlass className="lupa" />
              <Link
                data-testid="link-to-search"
                to="/search"
                className="search"
              >
                Pesquisa
              </Link>
            </div>

            <div className="link-favorites">
              <AiOutlineStar className="star" />
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
                className="favorites"
              >
                Favoritas
              </Link>
            </div>

            <div className="link-profile">
              <CgProfile className="avatar" />
              <Link
                data-testid="link-to-profile"
                to="/profile"
                className="profile"
              >
                Perfil
              </Link>
            </div>
          </div>

          <div className="footer-header">
            <div className="user-header">
              {loading ? (
                <div className="loading-user">
                  <img
                    src={ ampulheta }
                    alt="ampulheta"
                  />
                  <Loading />
                </div>
              ) : (
                <>
                  {imageUser.length > 0
                    ? (
                      <img src={ imageUser } alt={ `Foto do usuário ${nameUser}` } />
                    ) : (
                      <img src={ fundobranco } alt="" />
                    )}
                  <p>{nameUser}</p>
                </>
              )}
            </div>
          </div>
        </header>
      </section>
    );
  }
}

export default Header;
