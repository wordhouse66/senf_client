/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

//TIMESTAMP
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Icons

// Redux
import { connect } from "react-redux";

import menuIcon from "../../images/icons/menu.png";
import statusIcon from "../../images/icons/flag.png";

import {
  clearErrors,
  openMonitoringScream,
  openProject,
} from "../../redux/actions/dataActions";

import _ from "lodash";
import MonitoringEditScream from "./MonitoringEditScream";

const styles = {
  gradient: {
    width: "100%",
    height: "70px",
    position: "absolute",
    bottom: 0,

    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
  },

  card: {
    position: "relative",
    display: "flex",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",

    maxWidth: "95%",
    borderRadius: 20,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    height: "100px",
  },

  content: {
    padding: 0,
    color: "rgb(87, 87, 87)",
    width: "100%",

    objectFit: "cover",
    display: "flex",
    justifyContent: "space-between",
  },
};

class Scream extends Component {
  state = {
    isToggleOn: false,
    cardHeight: "30px",
    notes: null,
  };

  componentDidMount() {
    this.setState({
      notes: null,
    });
  }

  handleExpand = (screamId) => {
    this.props.openMonitoringScream(screamId);

    // this.setState({ cardHeight: "auto" });

    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });

    console.log(this.state.selectedUnix);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      projectsData,
      scream: {
        title,
        body,
        screamId,
        likeCount,
        commentCount,
        Stadtteil,
        locationHeader,
        project,
        Thema,
        status,
        createdAt,
        userHandle,
        age,
        sex,
      },
      user: { authenticated },
    } = this.props;

    const colorNew =
      Thema === "Rad"
        ? "#929df6"
        : Thema === "Verkehr"
        ? "#91dff4"
        : Thema === "Umwelt und Grün"
        ? "#8dd9b8"
        : Thema === "Sport / Freizeit"
        ? "#f6c095"
        : Thema === "Inklusion / Soziales"
        ? "#e8907e"
        : Thema === "Versorgung"
        ? "#bd98f6"
        : "#f9db95";

    const projectsDataFinal = [];
    if (projectsData) {
      const projectsDataArray = projectsData;

      projectsDataArray.forEach((element) => {
        if (project === element.project) {
          projectsDataFinal.push(element.imgUrl);
        }
      });
    }

    const finalCreatedAt = [];
    const createdAtNew = dayjs(createdAt).format("DD.MM.");

    console.log(createdAtNew);

    // var i;
    // for (i = 0; i < selectedUnix.length; i++) {
    //   selectedDays[i] = new Date(selectedUnix[i] * 1000);
    // }

    // this.setState({
    //   selectedDays: selectedDays,
    //   selectedUnix: this.props.scream.selectedUnix,
    // });

    return (
      <button
        className="monitoringCard"
        // style={
        //   this.state.isToggleOn
        //     ? { backgroundColor: "#f8f8f8" }
        //     : { backgroundColor: "white" }
        // }
        onClick={() => this.handleExpand(screamId)}
      >
        <div>
          <div className={classes.content}>
            {/* <div className={classes.gradient}></div> */}
            <div style={{ width: "20px", margin: "10px" }}>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "100%",
                  border: "0.5px white solid",
                  backgroundColor: colorNew,
                }}
              />
            </div>
            <div style={{ width: "300px", margin: "10px" }}>{title} </div>
            {/* <div style={{ width: "70px", margin: "10px" }}> {Thema} </div> */}
            <div style={{ width: "110px", margin: "10px" }}>{Stadtteil}</div>
            <div style={{ width: "110px", margin: "10px" }}>{userHandle}</div>

            <div style={{ width: "20px", margin: "10px" }}>{likeCount}</div>
            <div style={{ width: "20px", margin: "10px" }}>{commentCount}</div>

            <div style={{ width: "40px", margin: "10px" }}>
              {dayjs(createdAt).format("DD.MM.")}
            </div>
            <div style={{ width: "30px", margin: "10px" }}>
              <img
                src={projectsDataFinal}
                width="30px"
                style={{ borderRadius: "10px", overflow: "hidden" }}
              ></img>
            </div>
            <div style={{ width: "20px", margin: "10px" }}>
              {" "}
              {status === "None" ? (
                <img src={statusIcon} width="22" alt="WeblinkIcon" />
              ) : null}
            </div>
          </div>

          {/* <div className={classes.content}>
            {" "}
            <div style={{ width: "300px", margin: "10px", marginLeft: "50px" }}>
              {body}
            </div>
            <div style={{ width: "110px", margin: "10px" }}>
              {locationHeader}
            </div>
            <div style={{ width: "110px", margin: "10px" }}>
              {age}, {sex}
            </div>
          </div> */}

          {/* <div
            className="monitoringScreamExpand"
            onClick={() => this.handleExpand(screamId)}
          >
            <div
              style={
                this.state.isToggleOn
                  ? { transform: "rotate(180deg)", transition: "0.5s" }
                  : { transform: "rotate(0)", transition: "0.5s" }
              }
            >
              <img
                src={Arrow}
                width="10px"
                style={{
                  pointerEvents: "none",
                }}
              ></img>
            </div>
          </div> */}
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            zIndex: 999,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: "20px",
          }}
          className="hoverIcon"
        >
          {/* <div style={{ width: "20px", margin: "10px" }}>
            {" "}
            <a href={"mailto:" + "hi@gmail.com" + "?subject=" + escape(title)}>
              <img
                className="hoverIcon"
                src={weblinkIcon}
                style={{ paddingLeft: "15px" }}
                width="18"
                alt="WeblinkIcon"
              />
            </a>
          </div>
          <div style={{ width: "20px", margin: "10px" }}>
            {" "}
            <a href={"mailto:" + "hi@gmail.com" + "?subject=" + escape(title)}>
              <img
                className="hoverIcon"
                src={downloadIcon}
                style={{ paddingLeft: "9px" }}
                width="22"
                alt="WeblinkIcon"
              />
            </a>
          </div>
          <div style={{ width: "20px", margin: "10px" }}>
            {" "}
            <a href={"mailto:" + "hi@gmail.com" + "?subject=" + escape(title)}>
              <img
                className="hoverIcon"
                src={contactIcon}
                style={{ paddingLeft: "9px" }}
                width="22"
                alt="WeblinkIcon"
              />
            </a>
          </div>

          <div style={{ width: "30px", margin: "10px" }}>
            {" "}
            <a href={"mailto:" + "hi@gmail.com" + "?subject=" + escape(title)}>
              <img
                className="hoverIcon"
                src={shareBorderIcon}
                style={{ paddingLeft: "9px" }}
                width="22"
                alt="WeblinkIcon"
              />
            </a>
          </div> */}

          <div style={{ width: "50px", margin: "10px" }}>
            {" "}
            <img
              className="hoverIcon"
              src={menuIcon}
              style={{ paddingTop: "5px" }}
              width="30"
              alt="WeblinkIcon"
            />
          </div>
        </div>
      </button>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  openMonitoringScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  openMonitoringScream,
  openProject,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
