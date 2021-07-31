/** @format */

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

//LazyLoad
import { LazyImage } from "react-lazy-images";

//IMAGES
import TopPath from "../../images/topPathNew.png";
import TopPathBad from "../../images/toppathbad.png";

import First from "../../images/first.png";
import FirstBad from "../../images/firstbad.png";

import Second from "../../images/secondImage.png";
import Third from "../../images/letstalkbubble.png";

import Logo from "../../images/logo.png";

import Insta from "../../images/icons/socialmedia/insta.png";
import Facebook from "../../images/icons/socialmedia/facebook.png";

//IMAGES BAD

import CircularProgress from "@material-ui/core/CircularProgress";

//REDUX STUFF
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//DETECT DEVICE
import { isMobileOnly } from "react-device-detect";

//COOKIES
import Cookies from "universal-cookie";
const cookies = new Cookies();

const styles = {
  wrapper: {
    backgroundColor: "white",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    overflow: "scroll",
  },
  closeButton: {
    zIndex: 9999,
    position: "fixed",
    left: "32px",
    width: "30px",
    marginTop: "18px",
    color: "#ffd388",
    transform: "scale(1.5)",
  },
  nav: {
    width: "100vw",
    height: "80px",
    position: "fixed",
    backgroundColor: "white",
    zIndex: 999,
  },

  PlattformButton2: {
    position: "fixed",
    zIndex: 9999,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    bottom: "2em",
    borderRadius: "100px",
    color: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    backgroundColor: "#414345",
    textTransform: "none",
    fontSize: "14pt",
  },

  KontaktButton: {
    position: "absolute",
    height: "50px",
    zIndex: 99,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    top: "1670px",
    borderRadius: "100px",
    color: "#414345",
    backgroundColor: "white",
    textTransform: "none",
    fontSize: "14pt",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
  },

  TopPath: {
    position: "absolute",
    top: "0",
    width: "100vw",
  },

  FirstImage: {
    position: "absolute",
    top: "24vw",
    width: "75vw",
    marginLeft: "15.3vw",
  },
};

export class start extends Component {
  constructor(props) {
    super(props);

    if (!isMobileOnly) {
      this.props.history.push("/");
    }

    if (
      cookies.get("Cookie_settings") !== "all" &&
      cookies.get("Cookie_settings") !== "minimum"
    ) {
      this.props.history.push("/intro");
    }
  }

  render() {
    const { loading } = this.props.data;
    const { classes } = this.props;

    // window.onbeforeunload = function() {
    //   window.scrollTo(0, 0);
    // };

    // window.onload = function() {
    //   window.scrollTo(0, 0);
    // };

    const nav = !loading ? (
      <div className={classes.nav}>
        <h1 className="logo1">
          <img src={Logo} width="100px"></img>
        </h1>

        {/* <a
          href="https://www.facebook.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="facebook">
            <img src={Facebook} width="25" alt="EndImage" />
          </div>
        </a>
        <a
          href="https://www.instagram.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="insta">
            <img src={Insta} width="25" alt="EndImage" />
          </div>{" "}
        </a> */}
      </div>
    ) : null;

    const content = !loading ? (
      <div className="wrapperMenu">
        <Grid container spacing={0}>
          <Grid item sm={12}>
            <div className="StartBackground" />

            <LazyImage
              src={TopPath}
              className={classes.TopPath}
              width="100%"
              alt="Top_image_person_with_mustard_tube_good_quality"
              placeholder={({ imageProps, ref }) => (
                <img
                  ref={ref}
                  src={TopPathBad}
                  className={classes.TopPath}
                  width="100%"
                  alt="Top_image_person_with_mustard_tube_bad_quality"
                />
              )}
              actual={({ imageProps }) => (
                <img
                  {...imageProps}
                  alt="Top_image_person_with_mustard_tube_good_quality"
                />
              )}
            />

            <div className="FirstWrapper">
              <span className="title1">
                Du hast Ideen für <br /> dein Kölner Veedel?
              </span>

              <span className="subTitle1">
                Hier kannst du deine Ideen teilen und die der anderen sehen; in
                den Dialog treten und für Ideen, die dir gefallen stimmen!
              </span>

              <LazyImage
                src={First}
                className="First"
                width="100%"
                alt="First_image_persons_idea_good_quality"
                placeholder={({ imageProps, ref }) => (
                  <img
                    ref={ref}
                    src={FirstBad}
                    className="First"
                    width="100%"
                    alt="First_image_persons_idea_bad_quality"
                  />
                )}
                actual={({ imageProps }) => (
                  <img
                    {...imageProps}
                    alt="First_image_persons_idea_good_quality"
                  />
                )}
              />
            </div>

            <span className="title2">
              Eure Stimmen können <br /> laut werden!
            </span>

            <span className="subTitle2">
              Sowohl den Stadtvertreter:innen als auch euch wollen wir hier
              Bürger-Know-How vermitteln. Lasst die Stadt Köln eure Ideen hören!
            </span>
            <img src={Second} className="Second" alt="TopPath" />

            <span className="title3">
              Du willst das Projekt <br /> unterstützen?
            </span>

            <span className="subTitle3">
              Wir konnten bereits tolle Kooperationen eingehen. Wenn auch dich
              unsere Denkweise anspricht, lass uns quatschen!
            </span>

            <img src={Third} className="Third" alt="TopPath" />

            <Link to="/">
              <button className="ToWishes buttonWide">weiter</button>
            </Link>

            <a href="mailto:dein@senf.koeln">
              <div className={classes.KontaktButton}>Kontakt</div>
            </a>

            <span className="footerStart">
              <Link to="/impressum">
                <span className="impressumStart"> Impressum </span>
              </Link>
              <Link to="/datenschutz">
                <span className="datenschutzStart"> | Datenschutz |</span>
              </Link>
              <Link to="/agb">
                <span className="AGBStart"> AGB </span>
              </Link>
            </span>

            <span className="footercopyStart">
              Illustrationen: Gizem Güvenda&#287;
            </span>
          </Grid>{" "}
        </Grid>
      </div>
    ) : (
      <div className="white">
        <div className="spinnerDiv">
          <CircularProgress size={50} thickness={2} />
        </div>
      </div>
    );

    return (
      <div className={classes.wrapper}>
        {nav}
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(start));
