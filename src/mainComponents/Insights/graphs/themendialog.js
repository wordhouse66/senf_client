/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../../util/MyButton";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

// Icons
import CloseIcon from "@material-ui/icons/Close";

import Thema from "./thema";

//ANIMATION
import Slide from "@material-ui/core/Slide";

import { isMobileOnly } from "react-device-detect";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    padding: "0",
    overflow: "hidden",
  },

  paper: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    boxShadow: "none",
    overflow: "hidden",
    padding: "0",
    height: "auto",
    top: "8em",
    borderRadius: "10px",
  },

  paperWeb: {
    borderRadius: "20px",
    width: "1000px",
    height: "auto",
    maxHeight: "calc(100vh - 80px)",
    overflowX: "hidden",
  },

  closeButton: {
    position: "absolute",
    top: "2.5vw",
    left: "2.5vw",
    color: "black",
    zIndex: "990",
    padding: 10,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    zIndex: 9,
  },
  dialogcontent: {
    position: "fixed",
    marginLeft: "2.5vw",

    width: "95vw",
    height: "auto",
  },

  card: {
    marginTop: "2.5vw",
    top: "0em",
    position: "relative",
    width: "100%",
    paddingTop: "1em",
    backgroundColor: "white",
    height: "auto",
    paddingBottom: "1em",
    borderRadius: "10px",
    overflow: "hidden",
  },
  title: {
    fontFamily: "Futura PT W01-Bold",
    position: "relative",
    height: "2em",
    width: "100%",
    fontSize: "28",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Futura PT W01 Book",
    position: "relative",
    height: "auto",
    width: "100%",
    maxWidth: "500px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    fontSize: "20",
    textAlign: "center",
  },

  plot: {
    top: "20px",
    position: "relative",
    width: "100%",
  },
  clickblocker: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "9",
  },
};

class ThemenDialog extends Component {
  state = {
    open: false,

    oldPath: "",
    newPath: "",
    path: "",
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const { classes } = this.props;

    const dialogComponent = isMobileOnly ? (
      <Dialog
        scroll={"body"}
        open={this.state.open}
        onClose={this.handleClose}
        className="dialogOverlayContent"
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={Transition}
        fullScreen
        maxWidth={"lg"}
      >
        <MyButton onClick={this.handleClose} btnClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>

        <DialogContent>
          <Thema classes={this.props.classes} />
          {/* <br />
        <Trends /> */}
        </DialogContent>
      </Dialog>
    ) : (
      <Dialog
        scroll={"body"}
        open={this.state.open}
        onClose={this.handleClose}
        className="dialogOverlayContent"
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paperWeb } }}
        TransitionComponent={Transition}
        fullScreen
        maxWidth={"lg"}
      >
        <MyButton onClick={this.handleClose} btnClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>

        <DialogContent>
          <Thema classes={this.props.classes} />
          {/* <br />
        <Trends /> */}
        </DialogContent>
      </Dialog>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          btnClassName={classes.expandButton}
        ></MyButton>

        {dialogComponent}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ThemenDialog);
