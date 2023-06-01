import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import PageNotFound from './pages/PageNotFound';
import theme from './theme';

class App extends React.Component {
  render() {
    return (
      <ChakraProvider theme={ theme }>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ PageNotFound } />
        </Switch>
      </ChakraProvider>
    );
  }
}

export default App;
