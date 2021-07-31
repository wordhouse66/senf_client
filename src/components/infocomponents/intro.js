/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { LazyImage } from "react-lazy-images";
//IMAGE
import FirstImage from "../../images/cityperson.png";
import FirstImageBad from "../../images/citypersonBad.png";

//LOADER
import lamploader from "../../images/lamp_yellow.png";

//REDUX
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//CHECK DEVICE
import { isMobileOnly } from "react-device-detect";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const styles = {
  wrapper: {
    backgroundColor: "white",
    width: "100vw",
    height: "100vh",
    position: "fixed",
  },
  PlattformButton2: {
    position: "fixed",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    bottom: "4em",
    borderRadius: "100px",
    color: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    backgroundColor: "#414345",
    textTransform: "none",
    fontSize: "14pt",
  },

  FirstImage: {
    position: "absolute",
    top: "9vh",
    width: "100vw",
    marginLeft: "0vw",
  },
};

export class intro extends Component {
  constructor(props) {
    super(props);

    if (!isMobileOnly) {
      this.props.history.push("/");
    }
  }

  state = {
    open: true,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleOpenCookiePreferences() {
    window.open("/cookieConfigurator", "_blank");
  }

  handleMinimumCookies() {
    cookies.set("Cookie_settings", "minimum", {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      secure: true,
      sameSite: "none",
    });
    this.setState({ open: false });
  }

  handleCookies() {
    cookies.set("Cookie_settings", "all", {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      secure: true,
      sameSite: "none",
    });
    this.setState({ open: false });
  }
  render() {
    const { loading } = this.props.data;
    const { classes } = this.props;

    const content = !loading ? (
      <div className="wrapperMenu">
        {/* <div className={classes.nav}>
          <h1 className="logoIntro">
            Gib deinen <br />
            Senf dazu!
          </h1>
        </div> */}

        <LazyImage
          src={FirstImage}
          className={classes.FirstImage}
          alt="Person_Senftube"
          placeholder={({ imageProps, ref }) => (
            <img
              ref={ref}
              src={FirstImageBad}
              className={classes.FirstImage}
              alt="Person_Senftube"
            />
          )}
          actual={({ imageProps }) => (
            <img {...imageProps} alt="Person_Senftube" />
          )}
        />
        <Link to="/start">
          <div className={classes.PlattformButton2}>Weiter</div>
        </Link>

        <span className="footerIntro">
          <Link to="/impressum" className="footerIntroText">
            <span className="impressumIntro"> Impressum </span>
          </Link>
          <Link to="/datenschutz" className="footerIntroText">
            <span className="datenschutzInto"> | Datenschutz |</span>
          </Link>
          <Link to="/agb" className="footerIntroText">
            <span> AGB </span>
          </Link>
        </span>
      </div>
    ) : (
      <div className="white">
        <div className="spinnerDiv">
          {/* <CircularProgress size={50} thickness={2} /> */}
          <img src={lamploader} className="lamploader" alt="LikeIcon" />
        </div>
      </div>
    );

    const cookiebanner =
      !loading &&
      cookies.get("Cookie_settings") !== "all" &&
      cookies.get("Cookie_settings") !== "minimum" ? (
        <div>
          <div className="cookiesText">
            {" "}
            <span className="cookiesHeader">Ohne Cookies geht's nicht.</span>
            <br />
            Für die Bereitstellung einiger Funktionen und die Verbesserung
            dieses Services brauchen wir Cookies. Falls du wirklich nur die
            technisch notwendigsten Cookies akzeptieren willst, klicke{" "}
            <span className="Terms" onClick={() => this.handleMinimumCookies()}>
              hier
            </span>
            &nbsp;oder konfiguriere deine{" "}
            <span
              className="Terms"
              onClick={() => this.handleOpenCookiePreferences()}
            >
              Cookie-Einstellungen
            </span>
            .
          </div>
          <div className="AcceptBanner" onClick={() => this.handleCookies()}>
            Akzeptieren
          </div>
          <span className="footerIntro">
            <Link to="/impressum" className="footerIntroText">
              <span className="impressumIntro"> Impressum </span>
            </Link>
            <Link to="/datenschutz" className="footerIntroText">
              <span className="datenschutzInto"> | Datenschutz |</span>
            </Link>
            <Link to="/agb" className="footerIntroText">
              <span> AGB </span>
            </Link>
          </span>{" "}
        </div>
      ) : null;

    return (
      <div className={classes.wrapper}>
        {content}
        {cookiebanner}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(intro));
