/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";

// REDUX Stuff
import { connect } from "react-redux";

const styles = {
  //   paper: {
  //     borderRadius: "20px",
  //     height: "150px",
  //     width: "90vw",
  //     maxWidth: "400px",
  //   },
  confirmButton: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70%",
    clear: "both",
    color: "red",
  },
  line: {
    height: 1,
    width: "100%",

    backgroundColor: "grey",
  },
  cancelButton: {
    fontSize: 20,
    clear: "both",
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "30%",
  },
};

class PostScreamRules extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <a onClick={this.handleOpen} className="rules-link">
          Regeln
        </a>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          width="md"
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
        >
          <div>
            <div className="PostRulesBackground"></div>
            <div className="PostRules">
              <br />
              <span className="PostRulesHeader">Ein paar Worte</span>
              <br />
              <br />
              <br />
              <span className="cookiesHeader">Zweckmäßigkeit</span>
              <br />
              <span>
                Ideen, Wünsche und Anregungen sind hier erwünscht. Für
                Beschwerden, informier dich bitte{" "}
                <a
                  className="Terms"
                  href="https://www.stadt-koeln.de/service/onlinedienste/anregungen-beschwerden/index.html"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  hier
                </a>
                .
              </span>
              <br />
              <br />
              <br />
              <span className="cookiesHeader">Positiv bleiben</span>
              <br />
              <span>
                Bitte achte darauf, dass du deine Beiträge positiv ausdrückst.
                Unangemessene Inhalte werden gelöscht. Sei dir dessen bewusst!
              </span>

              <button
                className="buttonWide buttonRulesAccept"
                onClick={() => this.handleClose()}
              >
                Alles verstanden
              </button>
            </div>{" "}
          </div>
        </Dialog>
      </Fragment>
    );
  }
}

PostScreamRules.propTypes = {};

const mapStateToProps = (state) => ({});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostScreamRules));
