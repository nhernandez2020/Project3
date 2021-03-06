import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = ({ registerUser, auth, errors, history }) => {

  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  });

  const { name, email, password, password2 } = formData;

  // if (auth.isAuthenticated) {
  //   history.push("/dashboard"); 
  // }

  const componentWillReceiveProps = () => {
      if (errors) {
        setFormData({
          errors: errors
        });
      }
    }

    const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
      e.preventDefault();
      registerUser(formData, history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
      componentWillReceiveProps();
    };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Your destination for the Animal Crossing community. 
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Add friends, set prices, trade, and more!
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            {/* <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div> */}
            <div className={classes.contentBody}>
              <form
                noValidate
                className={classes.form}
                onSubmit={onSubmit}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Create new account
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Use your email to create new account
                </Typography>

                <TextField
                  className={classnames("", {
                    invalid: errors.name
                  }, classes.textField)}
                  error={errors.name}
                  fullWidth
                  // helperText={
                    // hasError('name') ? formState.errors.name[0] : null
                  // }
                  label="Name"
                  name="name"
                  onChange={onChange}
                  type="text"
                  value={name}
                  variant="outlined"
                /><span className="red-text">{errors.name}</span>
                <TextField
                  className={classnames("", {
                    invalid: errors.email
                  }, classes.textField)}
                  error={errors.email}
                  fullWidth
                  // helperText={
                  //   hasError('lastName') ? formState.errors.lastName[0] : null
                  // }
                  label="Email address"
                  name="email"
                  onChange={onChange}
                  type="text"
                  value={email}
                  variant="outlined"
                /><span className="red-text">{errors.email}</span>
                <TextField
                  className={classnames("", {
                    invalid: errors.password
                  }, classes.textField)}
                  error={errors.password}
                  fullWidth
                  // helperText={
                  //   hasError('email') ? formState.errors.email[0] : null
                  // }
                  label="Password"
                  name="password"
                  onChange={onChange}
                  type="password"
                  value={password}
                  variant="outlined"
                /><span className="red-text">{errors.password}</span>
                <TextField
                  className={classnames("", {
                    invalid: errors.password2
                  }, classes.textField)}
                  error={errors.password2}
                  fullWidth
                  // helperText={
                  //   hasError('password') ? formState.errors.password[0] : null
                  // }
                  label="Confirm password"
                  name="password2"
                  onChange={onChange}
                  type="password"
                  value={password2}
                  variant="outlined"
                /><span className="red-text">{errors.password2}</span>
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  // disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?{' '}
                  <Link
                    // component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));