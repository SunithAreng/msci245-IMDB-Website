import React from 'react';
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Landing = () => {

    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Button
                            key='3'
                            onClick={() => history.push('/search')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Search
                        </Button>
                        <Button
                            key='1'
                            onClick={() => history.push('/reviews')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Reviews
                        </Button>
                        <Button
                            key='2'
                            onClick={() => history.push('/myPage')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            MyPage
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Typography variant="h3" color="inherit" noWrap>
                Hello and welcome to the landing page!
            </Typography>
        </div>
    )

}

export default Landing;