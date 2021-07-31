/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors, openScream } from "../../redux/actions/dataActions";
import ScreamShare from "./ScreamShare";

import CloseIcon from "@material-ui/icons/Close";

// Redux stuff

import Poster from "../../images/poster.png";

//ANIMATION
import Share from "../../images/icons/share.png";
import MyButton from "../../util/MyButton";

import TopPath from "../../images/topPathNew.png";
import TopPathBad from "../../images/toppathbad.png";
import { LazyImage } from "react-lazy-images";

import lamploader from "../../images/lamp.png";
import Swipe from "react-easy-swipe";

//SHARE
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";

//SHAREICONS
import { EmailIcon, FacebookIcon, WhatsappIcon } from "react-share";

import html2canvas from "html2canvas";

const styles = {
  TopPath: {
    position: "absolute",
    top: "0",
    width: "100vw",
  },
  closeButtonShare: {
    position: "absolute",
    top: "2.5vw",
    left: "2.5vw",
    color: "black",
    zIndex: "990",
    padding: 10,
    backgroundColor: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
  },
  header: {
    paddingTop: "10px",
    marginLeft: "0vw",
    width: "90%",
    objectFit: "cover",
  },
  user: {
    position: "relative",
    float: "left",
    color: "#414345",
    fontSize: "12pt",
  },
  date: {
    position: "relative",
    width: "80vw",
    color: "#414345",
    fontSize: "12pt",
  },

  functions: {
    zIndex: "999",
    position: "relative",
    marginLeft: "31vw",
    height: "10vh",
    width: "60vw",
    top: "0.5em",
  },

  shareButtons: {
    position: "relative",
    width: "13vw",
    height: "10vh",
    float: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    zIndex: "990",
  },

  faceButton: {
    zIndex: 9999,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "110%",
    height: "110%",
    borderRadius: "100%",
    zIndex: 9,
    // backgroundColor: "rgb(0,0,0,0.5)",
  },
  shareButton: {
    position: "fixed",
    float: "right",
    height: "9vw",
    width: "9vw",
    right: "17.5vw",
    top: "2.5vw",
    zIndex: "990",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    backgroundColor: "white",
    padding: 5,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
  },
  shareButtonCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
};

export class share extends Component {
  constructor(props) {
    super(props);
    this.state = { imageStatus: "loading", path: "" };
  }

  // componentWillMount() {
  //   const screamId = this.props.match.params.screamId;
  //   this.props.openScream(screamId);
  //   this.setState({
  //     path: "https://senf.koeln/" + screamId,
  //   });
  // }
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  handleCloseShare = () => {
    const screamId = this.props.match.params.screamId;
    this.props.history.push(`/${screamId}`);
  };

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });

    function hiddenClone(element) {
      // Create clone of element
      window.scroll(0, 0);

      var clone = element.cloneNode(true);

      // Position element relatively within the
      // body but still out of the viewport
      var style = clone.style;
      style.position = "fixed";
      style.top = window.innerHeight + "px";
      style.left = 0;

      // Append clone to body and return the clone
      document.body.appendChild(clone);
      return clone;
    }

    var offScreen = document.querySelector("#content");

    // Clone off-screen element
    var clone = hiddenClone(offScreen);

    setTimeout(
      function () {
        html2canvas(clone, {
          removeContainer: true,
        }).then(function (canvas) {
          var image = new Image();
          image.src = canvas.toDataURL("image/png");
          image.style.width = "100%";
          document.querySelector("#container").appendChild(image);
          clone.remove();
        });
      }.bind(this),
      3000
    );
  }

  onSwipeMove(position) {
    if (`${position.x}` > 150) {
      this.handleCloseShare();
    }

    if (`${position.y}` > 250) {
      this.handleCloseShare();
    }
  }

  render() {
    const {
      classes,
      scream: { screamId, locationHeader, Stadtteil, title },
      UI: { loading },
    } = this.props;

    const std =
      !loading && Stadtteil !== "" ? <span>{Stadtteil} – </span> : null;
    const thanks = loading ? (
      <div className="spinnerDiv">
        <img src={lamploader} className="lamploader" alt="LikeIcon" />
      </div>
    ) : (
      <div>
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

        <p
          style={{
            fontFamily: "Playfair Display",
            fontSize: "25pt",
            color: "white",
            width: "70vw",
            textAlign: "center",
            left: "15vw",
            zIndex: "0",
            position: "absolute",
            top: "40vh",
          }}
        >
          Stark, dass du deinen Senf dazugegeben hast!
        </p>

        <Swipe onSwipeMove={this.onSwipeMove.bind(this)}>
          <div className="shareBackground">
            <MyButton
              onClick={this.handleCloseShare}
              btnClassName={classes.closeButtonShare}
            >
              <CloseIcon />
            </MyButton>

            <p
              style={{
                fontFamily: "Futura PT W01-Bold",
                fontSize: "15pt",
                color: "#414345",
                width: "100vw",
                textAlign: "center",
                marginLeft: "0",
                left: 0,
                zIndex: "999",
                position: "relative",
                top: "1em",
                marginBottom: "0.5em",
              }}
            >
              Teile den Link per
            </p>

            <div className={classes.functions}>
              <WhatsappShareButton
                url={this.state.path}
                className={classes.shareButtons}
              >
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>

              <FacebookShareButton
                url={this.state.path}
                className={classes.shareButtons}
              >
                <FacebookIcon
                  className={classes.faceButton}
                  size={32}
                  round={true}
                />
              </FacebookShareButton>

              <EmailShareButton
                url={this.state.path}
                className={classes.shareButtons}
              >
                <EmailIcon
                  className={classes.faceButton}
                  size={32}
                  round={true}
                />
              </EmailShareButton>
            </div>

            <p
              style={{
                fontFamily: "Futura PT W01-Bold",
                fontSize: "15pt",
                color: "#414345",
                width: "70vw",
                textAlign: "center",
                marginLeft: "15vw",
                left: 0,
                zIndex: "999",
                position: "relative",
                top: "0em",
              }}
            >
              Oder speicher und teile das Story-Poster!
            </p>
            <div
              id="container"
              style={{
                position: "relative",

                left: "20vw",
                width: "60vw",
                height: "60vw",
                zIndex: 999,
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
              }}
            ></div>

            <p
              style={{
                fontFamily: "Futura PT W01 Book",
                fontSize: "12pt",
                color: "#414345",
                width: "70vw",
                textAlign: "center",
                marginLeft: "15vw",
                left: 0,
                zIndex: "999",
                position: "relative",
                top: "1em",
              }}
            >
              (Halte das Foto lange gedrückt)
            </p>
          </div>
          <div
            id="content"
            style={{
              position: "absolute",
              top: "-200vh",
              width: "100vw",
              height: "100vw",
              overflowY: "hidden",
            }}
          >
            <img
              src={Poster}
              alt="ChatIcon"
              onLoad={this.handleImageLoaded.bind(this)}
              style={{
                position: "absolute",

                left: "0vw",
                width: "100%",
                height: "100%",
                top: "0vw",
                // width: "95%",
                // left: "-0em",
              }}
            />
            <span
              style={{
                fontFamily: "Futura PT W01 Book",
                fontSize: "12pt",
                color: "#414345",
                width: "100vw",

                marginLeft: "1.8em",
                left: 0,
                zIndex: "999",
                position: "absolute",
                top: "6em",
                fontVariantLigatures: "none",
              }}
            >
              {std} {locationHeader}
            </span>

            <p
              style={{
                fontFamily: "Futura PT W01-Bold",
                fontSize: "14pt",
                color: "#414345",
                zIndex: "999",
                width: "60vw",
                left: 0,
                marginLeft: "1.5em",
                textAlign: "left",
                zIndex: "999",
                position: "absolute",
                top: "5.5em",
                fontVariantLigatures: "none",
              }}
            >
              {title}
            </p>
          </div>
        </Swipe>
      </div>
    );
    return (
      <div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {thanks}
      </div>
    );
  }
}
share.propTypes = {
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
  user: state.user,
  data: state.data,
});

const mapActionsToProps = {
  openScream,
  clearErrors,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(share));
