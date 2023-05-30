import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../css/Profile.css';
import Header from '../components/Header';
import ampulheta from '../img/ampulheta.gif';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userData: {},
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

  render() {
    const { userData, isLoading } = this.state;
    const { name, email, image, description } = userData;
    return (
      <section className="section-master-profile">
        <Header />
        <section className="section-profile">

          <div className="background-up-profile">
            {!isLoading && image.length > 0
            && (
              <img
                src={ image }
                alt={ `Foto do usuário ${name}` }
                data-testid="profile-image"
              />
            )}
          </div>

          <div className="background-down-profile">
            {isLoading
              ? (
                <div className="loading-profile">
                  <img
                    src={ ampulheta }
                    alt="ampulheta"
                  />
                  <Loading />
                </div>)
              : (
                <div className="user-data">
                  <h2>Nome</h2>
                  <span>{ name }</span>

                  <h2>E-mail</h2>
                  <span>{ email }</span>

                  <h2 className="description">Descrição</h2>
                  <span>{ description }</span>

                  <Link
                    to="/profile/edit"
                    className="link-user-data"
                  >
                    Editar perfil
                  </Link>
                </div>
              )}
          </div>
        </section>
      </section>
    );
  }
}

export default Profile;
