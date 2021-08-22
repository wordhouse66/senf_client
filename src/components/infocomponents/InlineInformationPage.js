/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

// Redux stuff
import { connect } from "react-redux";
import { clearErrors } from "../../redux/actions/errorsActions";
import { Link } from "react-router-dom";

//LazyLoad
import { LazyImage } from "react-lazy-images";

//IMAGES

import Insta from "../../images/icons/socialmedia/insta.png";
import Facebook from "../../images/icons/socialmedia/facebook.png";

import TopPath from "../../images/topPathNew.png";
import First from "../../images/first.png";
import Second from "../../images/secondImage.png";
import Third from "../../images/letstalkbubble.png";

//IMAGES BAD
import TopPathBad from "../../images/toppathbad.png";
import FirstBad from "../../images/firstbad.png";

//LOADER
import CircularProgress from "@material-ui/core/CircularProgress";

//ICON TO OPEN THE INFOMENU
import Info from "../../images/icons/info.png";
import CloseIcon from "@material-ui/icons/Close";

import Logo from "../../images/logo.png";

const styles = {
  root: {
    backgroundColor: "white",
    padding: "0",
  },

  paper: {
    backgroundColor: "white",
    boxShadow: "none",
    padding: "0",
  },

  closeButton: {
    zIndex: 9999,
    position: "fixed",
    left: "35px",
    width: "30px",
    marginTop: "18px",
    color: "#ffd388",
  },

  nav: {
    width: "100vw",
    height: "80px",
    position: "fixed",
    backgroundColor: "white",
    zIndex: 999,
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

class InlineInformationPage extends Component {
  state = {
    open: false,
    errors: {},
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;

    const content = loading ? (
      <div className="wrapperScreamDialog">
        <div className="spinnerDiv">
          <CircularProgress size={50} thickness={2} />
        </div>
      </div>
    ) : (
      <div className="wrapperMenu">
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
            Hier kannst du deine Ideen teilen und die der anderen sehen; in den
            Dialog treten und für Ideen, die dir gefallen stimmen!
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

        <button
          className="buttonWide buttonInlineInfoIdeas"
          onClick={this.handleClose}
        >
          Ideen anzeigen
        </button>

        <a href="mailto:dein@senf.koeln">
          <button className="buttonWide buttonInlineInfoContact">
            Kontakt
          </button>
        </a>

        <span className="footer">
          <Link to="/impressum">
            <span className="impressum"> Impressum </span>
          </Link>
          <Link to="/datenschutz">
            <span className="datenschutz"> | Datenschutz | </span>
          </Link>
          <Link to="/agb">
            <span className="agb"> AGB </span>
          </Link>
        </span>
        <span className="footercopy">Illustrationen: Gizem Güvenda&#287;</span>
      </div>
    );

    return (
      <Fragment>
        <div onClick={this.handleOpen}>
          <div className="inlineInfoIcon">
            <img src={Info} width="35" alt="EndImage" />

            <span className="inlineInfoIconText">Infos</span>
          </div>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
          fullScreen
        >
          <MyButton
            onClick={this.handleClose}
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>

          <div className={classes.nav}>
            <h1 className="logo1">
              <img src={Logo} width="100px"></img>
            </h1>
          </div>

          <a
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
          </a>

          {content}
        </Dialog>
      </Fragment>
    );
  }
}

const mapActionsToProps = {
  clearErrors,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(InlineInformationPage));
