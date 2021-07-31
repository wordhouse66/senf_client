/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// Redux stuff
import { connect } from "react-redux";
import { submitChat } from "../../redux/actions/dataActions";
import LikeButton from "./LikeButton";

const styles = {
  textField: {
    position: "relative",
    bottom: "0px",
    marginLeft: "20%",
    width: "56%",
    float: "left",
    color: "white",
    marginTop: "10px",
    backgroundColor: "rgb(250,250,250,0.9)",
  },

  button: {
    position: "relative",
    color: "white",
    height: "40px",
    width: "70px",
    bottom: "0px",
    marginTop: "10px",
    marginLeft: "10px",
    boxShadow: "none",
    borderRadius: "20px",
    textTransform: "none",
  },
  progress: {
    zIndex: 99999,
  },
};

class ChatForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.clicked) {
      document.getElementById("outlined-name").focus();
    }
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitChat(this.props.project, { body: this.state.body });
    this.setState({
      loading: true,
    });
  };

  render() {
    const { classes, authenticated, project } = this.props;

    const errors = this.state.errors;

    // if (clicked) {
    //   this.handleChange;
    // }

    const ChatFormMarkup = authenticated ? (
      <div className="commentFormWrapper">
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Was ist deine Meinung?"
            id="outlined-name"
            margin="dense"
            variant="outlined"
            error={errors.comment ? true : false}
            // helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            multiline
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Senden
          </Button>

          {/* {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )} */}
        </form>
      </div>
    ) : null;

    return ChatFormMarkup;
  }
}

ChatForm.propTypes = {
  submitChat: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {
  submitChat,
})(withStyles(styles)(ChatForm));
