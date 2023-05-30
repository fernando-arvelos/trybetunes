import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../css/Search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import ampulheta from '../img/ampulheta.gif';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      resultArtist: '',
      loading: false,
      notFound: false,
      albums: [],
    };
  }

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
      resultArtist, albums, notFound } = this.state;
    const charArtistName = 2;

    return (
      <section className="section-master-search">
        <Header />
        <section className="section-search">
          <div className="background-up-search">

            <form className="form-search">
              <input
                data-testid="search-artist-input"
                className="search-artist"
                placeholder="Nome do Artista"
                name="artistName"
                value={ artistName }
                onChange={ this.handleChange }
              />

              <button
                type="button"
                data-testid="search-artist-button"
                onClick={ () => {
                  this.searchAlbums();
                  this.clearInput();
                } }
                disabled={ artistName.length < charArtistName }
              >
                Procurar
              </button>
            </form>
          </div>

          <div className="background-down-search">
            {loading
              ? (
                <div className="loading-search">
                  <img
                    src={ ampulheta }
                    alt="ampulheta"
                  />
                  <Loading />
                </div>)
              : (
                <div className="page-down">
                  {notFound
                    ? (
                      <div className="album-notfound">
                        <h1 className="no-album">Nenhum álbum foi encontrado</h1>
                      </div>)
                    : (albums.length > 0
                      && (
                        <div className="list-albuns">
                          <div className="result-album">
                            <h3>
                              {`Resultado de álbuns de ${resultArtist.charAt(0)
                                .toUpperCase() + resultArtist.slice(1)}:`}
                            </h3>
                          </div>
                          <div className="albums">
                            {albums.map((album, index) => (
                              <Link
                                key={ index }
                                data-testid={ `link-to-album-${album.collectionId}` }
                                to={ {
                                  pathname: `/album/${album.collectionId}`,
                                  state: { resultArtist: albums },
                                } }
                                className="link"
                              >

                                <img
                                  src={ album.artworkUrl100 }
                                  alt={
                                    `Imagem da capa do álbum ${album.collectionName}`
                                  }
                                />
                                <h4>{album.collectionName}</h4>
                                <p>{album.artistName}</p>

                              </Link>
                            ))}
                          </div>
                        </div>)

                    )}
                </div>
              )}
          </div>

        </section>
      </section>
    );
  }
}

export default Search;
