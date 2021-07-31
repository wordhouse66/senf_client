/** @format */

import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import PropTypes from "prop-types";
import HandBorder from "../../images/icons/handsnoclap.png";
import HandFull from "../../images/icons/handsFull.png";

import WishNote from "../modals/WishNote";
import SignNote from "../profile/SignNote";

// Icons

// REDUX STUFF
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <MyButton>
        <SignNote />

        <img src={HandBorder} width="100%" alt="LikeIcon" />
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton onClick={this.unlikeScream}>
        <img src={HandFull} width="100%" alt="LikeIcon" />
        <WishNote />
      </MyButton>
    ) : (
      <MyButton onClick={this.likeScream}>
        <img src={HandBorder} width="100%" alt="LikeIcon" />
        <WishNote />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
