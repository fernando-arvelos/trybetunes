import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../css/Album.css';
import Loading from '../components/Loading';
import ampulheta from '../img/ampulheta.gif';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      infoAlbum: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.listMusics();
  }

  listMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const resultMusics = await getMusics(id);
    this.setState({
      musics: resultMusics.filter((music) => music !== resultMusics[0]),
      infoAlbum: resultMusics[0],
      isLoading: false,
    });
  };

  render() {
    const { musics, infoAlbum, isLoading } = this.state;
    return (
      <section className="section-master-album">
        <Header />
        <section className="section-album">

          <div className="background-up-album">
            {!isLoading
                && (
                  <>
                    <img
                      src={ infoAlbum.artworkUrl100 }
                      alt={ `Imagem da capa do álbum ${infoAlbum.collectionName}` }
                    />
                    <div className="data-album">
                      <h3 data-testid="album-name">{ infoAlbum.collectionName}</h3>
                      <p data-testid="artist-name">{ infoAlbum.artistName}</p>
                    </div>
                  </>
                )}
          </div>

          <div className="background-down-album">
            {isLoading
              ? (
                <div className="loading-album">
                  <img
                    src={ ampulheta }
                    alt="ampulheta"
                  />
                  <Loading />
                </div>)
              : (
                <div className="list-music">
                  { musics.map((music) => (
                    <div key={ music.trackId }>
                      <MusicCard
                        music={ music }
                      />
                    </div>
                  ))}
                </div>
              )}

          </div>
        </section>
      </section>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
