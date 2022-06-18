import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import { Dialog } from '@material-ui/core';
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//const serverURL = "http://ov-research-4.uwaterloo.ca:3032";

const opacityValue = 0.9;

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: '#ef9a9a',
      light: '#ffcccb',
      dark: '#ba6b6c',
      background: '#eeeeee'
    },
    secondary: {
      main: "#b71c1c",
      light: '#f05545',
      dark: '#7f0000'
    },
  },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
}))

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
    "& > *": {
      margin: theme.spacing(1),
      width: 500,
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 500,
    },
  },
  paper: {
    height: 140,
    width: 500,
  },
  control: {
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 400,
  },
  pos: {
    marginBottom: 100,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const movies = [
  {
    title: 'Thor: Love and Thunder',
    id: 1,
  },
  {
    title: 'Top Gun: Maverick',
    id: 2,
  },
  {
    title: 'Lightyear',
    id: 3,
  },
  {
    title: 'Everything Everywhere All At Once',
    id: 4,
  },
  {
    title: 'Doctor Strange in Multiverse of Madness',
    id: 5,
  }
]

const initialReviews = [
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SpacingGrid() {
  const classes = useStyles();

  const [spacing, setSpacing] = React.useState([]);
  const [movieName, setMovieName] = React.useState([]);
  const [reviewTitle, setReviewTitle] = React.useState("");
  const [userReview, setUserReview] = React.useState("");

  const handleRatingChange = (event) => {
    setSpacing(Number(event.target.value));

  };

  const handleMovieChange = (event) => {
    setMovieName(event.target.value);
  };

  const handleTitleEntry = (event) => {
    setReviewTitle(event.target.value);
  }

  const handleReviewEntry = (event) => {
    setUserReview(event.target.value);
  }

  const [newMovie, setNewMovie] = React.useState("");

  const handleAddMovie = (event) => {
    setNewMovie(event.target.value);
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
    setErrorON(false);
    setEmptyON(false);
  };

  const [alertON, setAlert] = React.useState(false);
  const [errorON, setErrorON] = React.useState(false);
  const [emptyON, setEmptyON] = React.useState(false);

  const handleAddNewMovieToList = () => {
    if (newMovie != "") {
      var d = false;
      movies.map((prop) => {
        if (prop.title.toLowerCase() == newMovie.toLowerCase()) {
          d = true;
        }
      })
      if (d == false) {
        const z = {
          title: newMovie,
          id: movies.length,
        }
        movies.push(z);
        setNewMovie("");
        setAlert(true);
      } else {
        setErrorON(true);
      }
    } else {
      setEmptyON(true);
    }
  }

  const [open, setOpen] = React.useState(false);
  const [dummy, setDummy] = React.useState();
  const [addYes, setAddYes] = React.useState(true);

  const handleWish = () => {
    setAddYes(false);
  }

  const handleClickSubmit = () => {
    if (!userReview) {
      setOpen(true);
      setDummy(1);
    } else if (!reviewTitle) {
      setOpen(true);
      setDummy(2);
    } else if (spacing == "") {
      setOpen(true);
      setDummy(3);
    } else if (movieName == "") {
      setOpen(true);
      setDummy(4);
    } else {
      setOpen(true);
      setDummy(33);
      const d = {
        movieTitle: movieName,
        rating: spacing,
        reviewTitle: reviewTitle,
        reviewBody: userReview,
      }
      initialReviews.push(d);
    }
  }

  const clear = () => {
    setMovieName('');
    setReviewTitle("");
    setUserReview("");
    setSpacing([]);
    setNewMovie("");
    setAddYes(true);
  }

  const handleToClose = () => {
    setOpen(false);
    if (dummy == 33) {
      clear();
    }
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          height: '100vh',
          opacity: opacityValue,
          overflow: 'scroll',
          //backgroundColor: lightTheme.palette.background.default,
          //backgroundImage: `url(${BackgroundImage})`,
          backgroundImage: `url(https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
          backgroundSize: "cover"
        }}
      >
        <MainGridContainer
          container
          spacing={5}
          style={{ maxWidth: '50%' }}
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          overflow="scroll"
        >
          <Typography variant="h3" component="div">
            Movie Review
          </Typography>
          <Typography variant="h6" component="div">
            Check out the reviews before you decide to buy the tickets.
          </Typography>

          <Grid container>
            <MovieSelection
              handleChange={handleMovieChange}
              classes={classes}
              movieName={movieName}
              label={"Select a movie"}
              idlabel={"movies-list"}
            />
          </Grid>
          <Grid container>
            <Button variant='contained' onClick={handleWish} style={{ marginLeft: 10, minWidth:500 }}>
              Add movie
            </Button>
          </Grid>

          <Grid container>
            <AddNewMovie
              handleAddMovie={handleAddMovie}
              classes={classes}
              newMovie={newMovie}
              handleAddNewMovieToList={handleAddNewMovieToList}
              open={alertON}
              handleClose={handleClose}
              error={errorON}
              errEmpt={emptyON}
              addYes={addYes}
              handleWish={handleWish}
            />
          </Grid>


          <Grid container>
            <ReviewTitle
              classes={classes}
              onEntry={handleTitleEntry}
              reviewTitle={reviewTitle}
            />
          </Grid>

          <Grid container>
            <ReviewBody
              classes={classes}
              userReview={userReview}
              onEntry={handleReviewEntry} />
          </Grid>
          <br />
          <Grid container>
            <ReviewRating
              classes={classes}
              spacing={spacing}
              handleChange={handleRatingChange}
              movieName={movieName}
            />
          </Grid>
          <br />
          <Grid container>
            <Button variant="contained" color="secondary" onClick={handleClickSubmit}>
              Submit
            </Button>
            <DialogBox
              open={open}
              handleToClose={handleToClose}
              id={dummy}
            />
          </Grid>
          <br />
          <Typography variant="h6" component="div">
            User Reviews:
          </Typography>
          <Reviews />

        </MainGridContainer>
      </Box>
    </ThemeProvider>

  );
}

const Reviews = () => {
  return (

    <ul>
      {initialReviews.map((item) => {
        return (
          <Card style={{ marginTop: 5, marginBottom: 25 }} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2">
                {"Movie: " + item.movieTitle}
              </Typography>
              <Typography variant="h4" component="h2">
                {item.reviewTitle}
              </Typography>
              <Typography variant="h6" component="h2">
                {"Rating: " + item.rating}
                <br />
                {"User Review: "}
                <br />
                {item.reviewBody}
              </Typography>
            </CardContent>
          </Card>
        )
      })}
    </ul>
  )
}

const DialogBox = ({ id, open, handleToClose }) => {
  const msg = [
    'Please enter your review',
    'Please enter your review title',
    'Please enter your rating',
    'Your review has been received!',
    'Please select a movie for review!'
  ]

  var d;

  if (id == 1) {
    d = msg[0];
  } else if (id == 2) {
    d = msg[1];
  } else if (id == 3) {
    d = msg[2];
  } else if (id == 4) {
    d = msg[4];
  } else {
    d = msg[3];
  }

  return (
    <>
      <Dialog open={open} onClose={handleToClose}>
        <DialogContent>
          <DialogContentText>
            {d}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose}
            color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const MovieSelection = ({ handleChange, classes, movieName, label, idlabel }) => {
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id={idlabel}>{label}</InputLabel>
        <Select
          required
          labelId={idlabel}
          id={idlabel}
          value={movieName}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
          variant='outlined'
        >
          {movies.map((movie) => (
            <option key={movie.id} value={movie.title} >
              {movie.title}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

const AddNewMovie = ({ addYes, handleAddNewMovieToList, open, handleClose, handleAddMovie, newMovie, classes, error, errEmpt }) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <form className={classes.root} noValidate autoComplete="off">

        <TextField
          disabled={addYes}
          id="add-titles"
          label="Add a movie (Optional)"
          variant="outlined"
          onChange={handleAddMovie}
          value={newMovie}
        />
      </form>
      <Fab size="small" color="secondary" aria-label="add" onClick={handleAddNewMovieToList}
        disabled={addYes} 
      >
        <AddIcon />
      </Fab>
      <Alerts
        handleAddNewMovieToList={handleAddNewMovieToList}
        open={open}
        handleClose={handleClose}
        error={error}
        errEmpt={errEmpt}
        addYes={addYes}
      />

    </div>
  )
}

const Alerts = ({open, handleClose, error, errEmpt }) => {
  return (
    <>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your movie has been successfully added!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Your movie already exists in the list!
        </Alert>
      </Snackbar>
      <Snackbar open={errEmpt} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          The text field is empty!
        </Alert>
      </Snackbar>
    </>
  )
}

const ReviewRating = ({ classes, spacing, handleChange }) => {
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid item>
          <FormLabel>Rating</FormLabel>
          <RadioGroup
            name="Rating"
            aria-label="Rating"
            value={spacing.toString()}
            onChange={handleChange}
            row
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <FormControlLabel
                key={value}
                value={value.toString()}
                control={<Radio />}
                label={value.toString()}
              />
            ))}
          </RadioGroup>
        </Grid>
      </form>

    </>
  )
}

const ReviewTitle = ({ reviewTitle, classes, onEntry }) => {
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          id="review-title"
          label="Review Title"
          variant="outlined"
          onChange={onEntry}
          value={reviewTitle}
        />
      </form>
    </>
  )
}

const ReviewBody = ({ classes, onEntry, userReview }) => {
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-multiline-static"
          label="Enter a Review"
          multiline
          required
          rows={4}
          value={userReview}
          onChange={onEntry}
          variant="outlined"
        />
      </form>

    </>
  )
}

