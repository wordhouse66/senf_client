/** @format */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

//COMPONENTS
import InlineInformationPage from "../infocomponents/InlineInformationPage";

//LOADER ICON

//REDUX
import { connect } from "react-redux";

//COMPONENTS
import SignNote from "../profile/SignNote";
import Account from "../profile/Account";

//ICONS
import Insights_yellow from "../../images/icons/insights_yellow.png";
import Insights_grey from "../../images/icons/insights_grey.png";
import Insights_white from "../../images/icons/insights_white.png";

import Channels_yellow from "../../images/icons/channels_yellow.png";
import Channels_grey from "../../images/icons/channels_grey.png";
import Channels_white from "../../images/icons/channels_white.png";

import LampIcon_grey from "../../images/icons/lampIcon_grey.png";
import LampIcon_white from "../../images/icons/lampIcon_white.png";
import LampIcon_yellow from "../../images/icons/lampIcon_yellow.png";

import List_grey from "../../images/icons/list_grey.png";
import List_white from "../../images/icons/list_white.png";
import List_yellow from "../../images/icons/list_yellow.png";

import map_yellow from "../../images/icons/map_yellow.png";
import map_grey from "../../images/icons/map_grey.png";
import map_white from "../../images/icons/map_white.png";

import Profile_yellow from "../../images/icons/profile_yellow.png";
import Profile_grey from "../../images/icons/profile_grey.png";
import Profile_white from "../../images/icons/profile_white.png";

import Appbarimg from "../../images/appbar.png";

import { CssBaseline } from "@material-ui/core";

import { isMobileOnly } from "react-device-detect";

const styles = {
  appBarLeft: {
    width: "40%",
    height: "48px",
    display: "flex",
    backgroundColor: "transparent",
    position: "fixed",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: "0",
    zIndex: 999,
  },
  appBarRight: {
    width: "40%",
    height: "48px",
    display: "flex",
    backgroundColor: "transparent",
    right: "0",
    position: "fixed",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: "0",
    zIndex: 999,
  },
  icons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "10pt",
    borderRadius: "50%",
  },
  iconsActive: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "10pt",
    borderRadius: "50%",
  },
  iconWrapper: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
};
class Appbar extends React.Component {
  render() {
    const {
      classes,
      user: { authenticated },
      order,
      handleClick,
    } = this.props;
    const { loading } = this.props.data;

    const Profile = !authenticated ? (
      <div className={classes.icons}>
        <div className={classes.iconWrapper}>
          <SignNote />
          <img
            src={order !== 4 ? Profile_grey : Profile_white}
            style={{ pointerEvents: "none" }}
            width="25"
            alt="EndImage"
          />
          Profil
        </div>
      </div>
    ) : (
      <div className={classes.icons} onClick={() => handleClick(4)}>
        <img
          src={order !== 4 ? Profile_grey : Profile_white}
          style={{ pointerEvents: "none" }}
          width="25"
          alt="EndImage"
        />
        Profil
      </div>
    );

    const leftBar = !loading ? (
      <div className={classes.appBarLeft}>
        <span
          onClick={() => handleClick(1)}
          className="appbar-links ripple"
          style={
            order === 1 || order === 2
              ? {
                  color: "white",
                }
              : {
                  color: "#353535",
                }
          }
        >
          Ideen
        </span>
        {/* <div
          className={order !== 1 ? classes.icons : classes.iconsActive}
          onClick={() => handleClick(1)}
        >
          <img
            src={order !== 1 ? LampIcon_grey : LampIcon_white}
            style={{ pointerEvents: "none" }}
            width="25"
            alt="EndImage"
          />
          Ideen
        </div>
        <div className={classes.icons} onClick={() => handleClick(3)}>
          <img
            src={order !== 3 ? Insights_grey : Insights_white}
            style={{ pointerEvents: "none" }}
            width="25"
            alt="EndImage"
          />
          Insights
        </div> */}

        {/* <div className={classes.icons} onClick={() => handleClick(5)}>
          <img
            src={order !== 5 ? map_grey : map_white}
            style={{ pointerEvents: "none" }}
            width="25"
            alt="EndImage"
          />
          Karte
        </div> */}
      </div>
    ) : null;

    const rightBar = !loading ? (
      <div className={classes.appBarRight}>
        <span
          onClick={() => handleClick(3)}
          className="appbar-links ripple"
          style={
            order === 3
              ? {
                  color: "white",
                }
              : {
                  color: "#353535",
                }
          }
        >
          Insights
        </span>
        {/* <div className={classes.icons} onClick={() => handleClick(2)}>
          <img
            src={order !== 2 ? List_grey : List_white}
            style={{ pointerEvents: "none" }}
            width="25"
            alt="EndImage"
          />
          Info
        </div>
        {Profile} */}
      </div>
    ) : null;

    return isMobileOnly ? (
      <>
        {" "}
        {leftBar} {rightBar}
        <img
          src={Appbarimg}
          style={{
            width: "100vw",
            position: "fixed",
            zIndex: "996",
            bottom: "0",
            pointerEvents: "none",
          }}
        ></img>
      </>
    ) : null;
  }
}
Appbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Appbar));
