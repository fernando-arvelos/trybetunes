import { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import ampulheta from '../img/ampulheta.gif';
import '../css/Favorites.css';

class Favorites extends Component {
  state = {
    isLoading: true,
    favoriteSongs: [],
  };

  async componentDidMount() {
    await this.fetchFavoriteSongs();
    this.setState({ isLoading: false });
  }

  fetchFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  };

  handleRemoveSong = async (music) => {
    await removeSong(music);
    await this.fetchFavoriteSongs();
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;

    return (
      <section className="section-master-favorites">
        <Header />

        <section className="section-favorites">
          <div className="background-up-favorites">
            <h1>Músicas Favoritas</h1>
          </div>

          <div className="background-down-favorites">
            <div data-testid="page-favorites">
              {isLoading ? (
                <div className="loading-favorites">
                  <img
                    src={ ampulheta }
                    alt="ampulheta"
                  />
                  <Loading />
                </div>
              ) : (
                <>
                  <div className="favorites-music">
                    {favoriteSongs.map((music) => (
                      <MusicCard
                        key={ music.trackId }
                        music={ music }
                        onRemoveSong={ this.handleRemoveSong }
                      />
                    ))}
                  </div>
                  <div className="no-favorites">
                    {favoriteSongs.length === 0
                  && <h1>Você não possui músicas favoritas</h1>}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default Favorites;
