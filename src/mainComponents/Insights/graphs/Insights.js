/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import _ from "lodash";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

//ICONS AND BUTTONS
import CloseIcon from "@material-ui/icons/Close";
import MyButton from "../../util/MyButton";

import Analyse from "./analyse";
import ThemenDialog from "./themendialog";
import StadttteilDialog from "./stadtteilDialog";
import AltersgruppeDialog from "./altersgruppeDialog";
import WordcloudDialog from "./wordcloudDialog";

import Themencover from "../../images/themencover.png";
import Stadtteilcover from "../../images/stadtteilcover.png";
import Keywordscover from "../../images/keywordscover.png";
import Altersgruppencover from "../../images/altersgruppencover.png";

import {
  getScreams,
  getallComments,
  getallLikes,
  getWordcloud,
  getAgegroups,
} from "../../redux/actions/dataActions";

//Redux
import { connect } from "react-redux";

import Swipe from "react-easy-swipe";

//ANIMATION
import Slide from "@material-ui/core/Slide";
import { isMobileOnly } from "react-device-detect";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  openButton: {
    zIndex: 99999,
    backgroundColor: "rgba(155,109,155,0)",
    position: "absolute",
    left: "0%",
    top: "0",

    width: "100%",
    height: "100%",
    borderRadius: "50vh",
  },
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(255,255,255,0.1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255,209,155,0.9), rgba(255,218,83,0.9), #ffffff)",
    backgroundRepeat: "no-repeat",
    padding: 0,
    overflow: "hidden",
  },

  paper: {
    width: "100vw",
    height: "100vh",
    boxShadow: "none",
    backgroundColor: "transparent",
    margin: "0",
    position: "absolute",
    top: "0",
    padding: "0",
    maxHeight: "100vh",
  },

  closeButton: {
    zIndex: 9999,
    position: "fixed",
    left: "2.5vw",
    top: "2.5vw",
    color: "black",
    backgroundColor: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
  },
  keyindicatorswrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "6em",
    width: "100%",
    marginLeft: "2.5%",
  },
  keyindicatorCard: {
    position: "relative",
    // width: "30%",
    height: "50px",

    textAlign: "center",
    lineHeight: "3em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "10px",
  },
};

class Insights extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getallComments();
    this.props.getallLikes();

    this.props.getWordcloud();
    this.props.getAgegroups();
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  onSwipeMove(position) {
    if (`${position.x}` > 150) {
      this.handleClose();
    }
    if (`${position.y}` > 200) {
      this.handleClose();
    }
  }

  render() {
    const { classes, data } = this.props;

    const analyse = this.state.open ? <Analyse></Analyse> : null;

    const dialogComponent = (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        width="md"
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={Transition}
      >
        <MyButton onClick={this.handleClose} btnClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>

        <Swipe onSwipeMove={this.onSwipeMove.bind(this)}>
          {" "}
          <div className="contentWrapperInsights">
            <div className="MainAnimation2">
              {analyse}
              <div className="cover cover1">
                <img src={Themencover} width="100%" alt="Themencover" />
                <ThemenDialog />
              </div>
              <div className="cover cover2">
                <img src={Stadtteilcover} width="100%" alt="Themencover" />
                <StadttteilDialog />
              </div>

              <div className="cover cover4">
                <AltersgruppeDialog agegroups={this.props.data} />
                <img src={Altersgruppencover} width="100%" alt="Themencover" />
              </div>
              <div className="cover cover3">
                <img src={Keywordscover} width="100%" alt="Themencover" />{" "}
                <WordcloudDialog />
              </div>
            </div>
          </div>
        </Swipe>
      </Dialog>
    );
    return (
      <Fragment>
        <button
          onClick={this.handleOpen}
          className={classes.openButton}
        ></button>
        {dialogComponent}
      </Fragment>
    );
  }
}

Insights.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,

  getallComments: PropTypes.func.isRequired,
  getallLikes: PropTypes.func.isRequired,
  getWordcloud: PropTypes.func.isRequired,
  getAgegroups: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getScreams,

  getallComments,
  getallLikes,
  getWordcloud,
  getAgegroups,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Insights));
