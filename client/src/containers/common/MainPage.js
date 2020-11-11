import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import NotFound from "./NotFound";
import { Link, Switch, Route, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { push } from "connected-react-router";
import Notification from "../../components/Notification";
import { logout } from "../../util";
import HomePage from "../Home/HomePage";
import DetailPage from "../Detail/DetailPage";

const useStyles = makeStyles(() => ({
  headerBar: {
    background: "#323330",
    position: "fixed",
    top: 0,
    textAlign: "center",
    width: "100%",
    zIndex: "9999",
    textAlign: "center",
    padding: "15px 0",
    minHeight: "50px",
  },
  headerWrapper: {
    maxWidth: "1400px",
    "& header": {
      display: "flex",
      flexFlow: "row nowrap",
      textAlign: "left",
      "& a": {
        alignItems: "center",
        border: 0,
        color: "#fff",
        height: "34px",
        flexFlow: "row nowrap",
        zIndex: 1000,
      },
      "& h3": {
        alignItems: "center",
        margin: "0 0 0 20px",
        color: "#fff",
      },
    },
  },
  logo: {
    width: "34px",
  },
  slidingNav: {
    "& ul": {
      margin: 0,
      padding: 0,
    },
  },
  headerMenu: {
    display: "flex",
    "& li": {
      fontSize: "16px",
      listStyle: "none",
      margin: "0px",
      padding: "6px 20px",
    },
    "& li a": {
      color: "#fff",
      textDecoration: "none",
    },
    "& li a:hover": {
      color: "#f5da55",
    },
  },
  currentItem: {
    "& a": {
      color: "#f5da55 !important",
    },
  },
  wrapper: {
    padding: "0 20px",
    margin: "0 auto",
  },
  navigationSlider: {
    height: "34px",
    marginLeft: "20px",
    position: "relative",
  },
  mainContent: {
    maxWidth: "1400px",
    paddingTop: "100px",
    minHeight: "calc(100vh - 50px)",
  },
  navFooter: {
    textAlign: "center",
    background: "#20232a",
    border: "none",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "24px",
    paddingTop: "2em",
    paddingBottom: "2em",
    position: "relative",
  },
  logoutBtn: {
    fontSize: "18px",
    color: "#FFFFFF",
    "& :hover": {
      color: "#f5da55",
      textDecoration: "none",
    },
  },
}));

let MainPage = (props) => {
  const { push } = props;
  const classes = useStyles();

  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    push("/login");
  };

  const routes = [
    {
      path: "/",
      pathName: "首頁",
      exact: true,
      topmenu: HomePage,
    },
    {
      path: "/detail",
      pathName: "快選",
      exact: true,
      topmenu: DetailPage,
    },
    {
      path: "*",
      pathName: "404",
      exact: false,
      topmenu: NotFound,
    },
  ];

  const logoutRoute = [
    {
      path: "/logout",
      pathName: "登出",
      onClick: handleClickOpen,
    },
  ];

  const NavbarItem = routes
    .filter((route) => route.path !== "*")
    .concat(logoutRoute)
    .map((route, index) => (
      <li
        key={index}
        className={pathname === route.path ? `${classes.currentItem}` : ""}
      >
        {route.path !== "/logout" ? (
          <Link to={route.path}>{route.pathName}</Link>
        ) : (
          <Button
            variant="text"
            color="primary"
            onClick={route.onClick}
            className={classes.logoutBtn}
          >
            {route.pathName}
          </Button>
        )}
      </li>
    ));

  return (
    <>
      <div className={classes.headerBar}>
        <div className={clsx(classes.headerWrapper, classes.wrapper)}>
          <header>
            <a href="/">
              <img
                className={classes.logo}
                src="/images/logo.png"
                alt="lightningLottery"
              />
            </a>
            <h3>閃電俠公益彩卷</h3>
            <div className={classes.navigationSlider}>
              <nav className={classes.slidingNav}>
                <ul className={classes.headerMenu}>{NavbarItem}</ul>
              </nav>
            </div>
          </header>
        </div>
        <Notification />
      </div>
      <div className={clsx(classes.wrapper, classes.mainContent)}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.topmenu />}
            />
          ))}
        </Switch>
      </div>
      <footer className={classes.navFooter} id="footer">
        <p>@版權所有：TimChen ,ps此網站為個人作品，投注資料純為娛樂性質</p>
      </footer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-logout"
        aria-describedby="dialog-logou-description"
      >
        <DialogTitle id="dialog-logout-title">提 示</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-logout-description">
            您确定要退出吗？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            取消
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            autoFocus
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
  push,
};

MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default MainPage;
