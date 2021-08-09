/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import lamploader from "../../../images/lamp.png";
import ChatBorder from "../../../images/icons/chat.png";
import HandFull from "../../../images/icons/handsFull.png";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  keyindicatorswrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "0em",
    width: "95%",
    marginLeft: "2.5%",
    marginBottom: "20px",
  },
  keyindicatorCard: {
    position: "relative",
    height: "50px",
    paddingLeft: "10px",
    paddingRight: "10px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",

    fontFamily: "Futura PT W01-Bold",
  },
};
export class Analyse extends Component {
  render() {
    const { classes } = this.props;

    const Wishlength =
      this.props.data.screams.length === 0 ? (
        <div className={classes.keyindicatorCard}>
          <CircularProgress size={12} thickness={2} />
        </div>
      ) : (
        <div className={classes.keyindicatorCard}>
          <img
            src={lamploader}
            width="35px"
            style={{ transform: "rotate(35deg) translateY(-1px)" }}
            alt="lamploader"
          ></img>
          {this.props.data.screams.length} Ideen
        </div>
      );

    const Likeslength =
      this.props.data.likes.length === 0 ? (
        <div className={classes.keyindicatorCard}>
          <CircularProgress size={12} thickness={2} />
        </div>
      ) : (
        <div className={classes.keyindicatorCard}>
          <img src={HandFull} width="25px" alt="lamploader"></img>
          {"  "}
          {this.props.data.likes.length} Votes
        </div>
      );
    const Commentslength =
      this.props.data.comments.length === 0 ? (
        <div className={classes.keyindicatorCard}>
          <CircularProgress size={12} thickness={2} />
        </div>
      ) : (
        <div className={classes.keyindicatorCard}>
          <img src={ChatBorder} width="25px" alt="lamploader"></img>
          {this.props.data.comments.length} Kommentare
        </div>
      );

    return (
      <div className={classes.analysewrapper}>
        <div className={classes.keyindicatorswrapper}>
          {Wishlength}
          {Likeslength}
          {Commentslength}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ data: state.data });

export default connect(mapStateToProps)(withStyles(styles)(Analyse));
