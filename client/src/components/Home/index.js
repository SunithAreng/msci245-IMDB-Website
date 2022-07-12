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
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3032";

// const serverURL = "http://localhost:8081";

// const serverURL = "";

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

export default function App() {

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState("");
  const [movieName, setMovieName] = React.useState("");
  const [reviewTitle, setReviewTitle] = React.useState("");
  const [userReview, setUserReview] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [initialReviews, setInitialReviews] = React.useState([]);
  const [userID, setUserID] = React.useState(1);
  const [movieID, setMovieID] = React.useState(0);

  React.useEffect(() => {
    getMovies();
    getReviews();
  }, []);

  const getMovies = () => {
    callApiGetMovies()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setMovies(parsed);
      })
  }

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const getReviews = () => {
    callApiGetReviews()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setInitialReviews(parsed);
      })
  }

  const callApiGetReviews = async () => {
    const url = serverURL + "/api/getReviews";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const handleRatingChange = (event) => {
    setSpacing(event.target.value);
    setErrState3(false);
  };

  const handleMovieChange = (event) => {
    setMovieName(event.target.value);
    movies.map((item) => {
      if (event.target.value === item.name) {
        setMovieID(item.id);
      }
    })
    setErrState4(false);
  };

  const handleTitleEntry = (event) => {
    setReviewTitle(event.target.value);
    setErrState1(false);
  }

  const handleReviewEntry = (event) => {
    setUserReview(event.target.value);
    setErrState2(false);
  }

  const [open, setOpen] = React.useState(false);
  const [dummy, setDummy] = React.useState();

  const [errState2, setErrState2] = React.useState(false);
  const [errState1, setErrState1] = React.useState(false);
  const [errState3, setErrState3] = React.useState(false);
  const [errState4, setErrState4] = React.useState(false);
  
  const rightSubmission = () => {
    setOpen(true);
    setDummy(33);
    const reviewInfo = {
      movieTitle: movieName,
      movies_id: movieID,
      user_userID: userID,
      reviewScore: spacing,
      reviewTitle: reviewTitle,
      reviewContent: userReview,
    }
    addReview();
    console.log(reviewInfo);
  }

  const addReview = () => {
    callApiAddReview()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setInitialReviews(parsed);
      })
  }

  const callApiAddReview = async () => {

    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        movies_id: movieID,
        user_userID: userID,
        reviewScore: spacing,
        reviewTitle: reviewTitle,
        reviewContent: userReview,
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const emptyBoxes = () => {
    if (movieName === "") {
      setOpen(true);
      setDummy(4);
      setErrState4(true);
    }

    if (!reviewTitle) {
      setOpen(true);
      setDummy(2);
      setErrState1(true);
    }

    if (spacing === "") {
      setOpen(true);
      setDummy(3);
      setErrState3(true);
    }

    if (!userReview) {
      setOpen(true);
      setDummy(1);
      setErrState2(true);
    }
  }

  const handleClickSubmit = () => {
    userReview && spacing && movieName && reviewTitle ? rightSubmission() : emptyBoxes()
  }

  const clear = () => {
    setMovieName("");
    setReviewTitle("");
    setUserReview("");
    setSpacing("");
    setMovieID(0);
  }

  const handleToClose = () => {
    setOpen(false);
    if (dummy === 33) {
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
            Find out what critics think about some of the classics of our time!
          </Typography>
          <Grid container>
            <MovieSelection
              handleChange={handleMovieChange}
              classes={classes}
              movieName={movieName}
              label={"Select a movie"}
              idlabel={"movies-list"}
              errState={errState4}
              movies={movies}
            />
          </Grid>
          <Grid container>
            <ReviewTitle
              classes={classes}
              onEntry={handleTitleEntry}
              reviewTitle={reviewTitle}
              errState={errState1}
            />
          </Grid>
          <Grid container>
            <ReviewBody
              classes={classes}
              userReview={userReview}
              onEntry={handleReviewEntry}
              errState={errState2}
            />
          </Grid>
          <br />
          <Grid container>
            <ReviewRating
              classes={classes}
              spacing={spacing}
              handleChange={handleRatingChange}
              movieName={movieName}
              errState={errState3}
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
          <Reviews
            initialReviews={initialReviews}
          />
        </MainGridContainer>
      </Box>
    </ThemeProvider>
  );
}

const Reviews = ({ initialReviews }) => {
  return (
    <ul>
      {initialReviews.map((item) => {
        return (
          <Card style={{ marginTop: 5, marginBottom: 5 }} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                <p>
                  {"Movie Title: " + item.name}
                  <br />
                  {"Review Title: "}
                  <b>{item.reviewTitle}</b>
                  <br />
                  {"User Rating: "}
                  <b>{item.reviewScore}</b>
                  {"/5"}
                  <br />
                  {"User Review: "}
                  <br />
                  {item.reviewContent}
                </p>
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

  if (id === 1) {
    d = msg[0];
  } else if (id === 2) {
    d = msg[1];
  } else if (id === 3) {
    d = msg[2];
  } else if (id === 4) {
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

const MovieSelection = ({ movies, handleChange, classes, movieName, label, idlabel, errState }) => {
  return (
    <>
      <FormControl variant='outlined' className={classes.formControl} error={errState}>
        <InputLabel id={idlabel}>{label}</InputLabel>
        <NativeSelect
          required
          labelId={idlabel}
          id={idlabel}
          value={movieName}
          onChange={handleChange}
          input={<Input />}
        >
          <option aria-label="None" value="" />
          {movies.map((movie) => (
            <option key={movie.id} value={movie.name} >
              {movie.name}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>{errState ? "Please select a movie for review" : ""}</FormHelperText>
      </FormControl>
    </>
  )
}

const ReviewRating = ({ classes, spacing, handleChange, errState }) => {
  return (
    <>
      <FormControl className={classes.root} noValidate autoComplete="off" error={errState}>
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
        <FormHelperText>{errState ? "Please enter your rating" : ""}</FormHelperText>
      </FormControl>

    </>
  )
}

const ReviewTitle = ({ reviewTitle, classes, onEntry, errState }) => {
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
          error={errState}
          helperText={errState ? "Please enter review title" : ""}
        />
      </form>
    </>
  )
}

const ReviewBody = ({ classes, onEntry, userReview, errState }) => {
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
          inputProps={{ maxLength: 200 }}
          helperText={errState ? "Please enter your review" : "Maximum 200 characters"}
          error={errState}
        />
      </form>
    </>
  )
}

