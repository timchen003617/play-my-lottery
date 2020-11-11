import React from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { TextInput } from "../../components";
import Notification from "../../components/Notification";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { fetchLogin } from "../../actions"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validate = values => {
  const errors = {}

  const regex = new RegExp('^[a-zA-Z0-9]+$')
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,12}$/

  if (!values.account) {
    errors.account = '請輸入用戶名!'
  } else if (!regex.test(values.account)) {
    errors.account = '用户名只能是字母和數字組合'
  }

  if (!values.password) {
    errors.password = '請輸入密碼!'
  }

  return errors
}

let LoginPage = props => {
  const { fetchLogin, handleSubmit, error } = props
  const classes = useStyles();

  const handleLogin = data => {
    const regex = new RegExp("^[a-zA-Z0-9]+$");
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,12}$/;

    if (!data.account) {
      throw new SubmissionError({
        _error: '請輸入用戶名!'
      })
    }

    if (!data.password) {
      throw new SubmissionError({
        _error: '請輸入密碼!'
      })
    }

    if (!passwordRegex.test(data.password)) {
      throw new SubmissionError({
        _error: '密碼須為字母和數字混合, 長度需要6-12位'
      })
    }

    fetchLogin({ account: data.account, password: data.password });

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(handleLogin)}
        >
          <Field
            name="account"
            component={TextInput}
            type="text"
            id="account"
            maxLength={12}
          />
          <Field
            name="password"
            component={TextInput}
            type="password"
            id="password"
            placeholder="Password"
            maxLength={12}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登入
          </Button>
          {error && (
              <Typography variant='h6' color='error'>
                {error}
              </Typography>
            )}
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                會員註冊
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Notification />
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = {
  fetchLogin,
};

LoginPage = reduxForm({
  form: "LoginPage",
  validate
})(LoginPage);

LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginPage;
