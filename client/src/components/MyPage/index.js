import React from 'react';
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Home = () => {

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Button
              key='3'
              onClick={() => history.push('/')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button
              key='2'
              onClick={() => history.push('/reviews')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Reviews
            </Button>
            <Button
              key='1'
              onClick={() => history.push('/search')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Search
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Typography variant="h3" color="inherit" noWrap>
        This is My Page that needs a lot of work and creativity!
      </Typography>
    </div>
  )
}

export default Home;