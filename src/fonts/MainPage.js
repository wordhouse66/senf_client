/** @format */

// /** @format */

// import React, { Component } from "react";
// import withStyles from "@material-ui/core/styles/withStyles";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// import lamploader from "../images/lamp.png";

// import MapDesktop from "../components/map/MapDesktop";
// import { InsightsPage } from "../mainComponents/Insights/InsightsPage";
// import { AllIdeasPage } from "../mainComponents/Ideas/AllIdeasPage";
// import ScreamDialog from "../components/scream/ScreamDialog";

// import Cookies from "universal-cookie";
// import ProjectsPage from "../mainComponents/Projects/ProjectsPage";
// import ProjectDialog from "../mainComponents/Projects/projectComponents/ProjectDialog";

// const cookies = new Cookies();

// const styles = {};

// export class MainPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     const {
//       classes,
//       loading,
//       order,
//       dropdown,
//       screamIdParam,
//       screams,
//       openInfoPageDesktop,

//       viewport,
//       latitude1,
//       longitude1,
//       latitude2,
//       longitude2,
//       latitude3,
//       longitude3,
//       latitude4,
//       longitude4,
//       handleRevert,
//       _onViewportChange,
//       zoomToBounds,
//       handleDropdown,

//       handleLegend,
//       handleLegend1,
//       handleLegend2,
//       handleLegend3,
//       handleLegend4,
//       handleLegend5,
//       handleLegend6,
//       handleLegend7,
//       checked,
//       checked1,
//       checked2,
//       checked3,
//       checked4,
//       checked5,
//       checked6,
//       checked7,

//       handleClick,
//       showDemand,

//       handleOpenGeofilter,
//       handleCloseGeofilter,
//       handleResetGeofilter,
//       openGeofilter,
//       showGeofilterResults,
//       createGeofilterCircle,
//       dataNoLocationHandle,
//       selectedId,
//       noLocation,

//       channelOrder,
//       projectsData,
//       loadingProjects,
//       handleChannelClick,
//       _onViewportChangeDesktop,
//       mapDesktopShowResults,
//       mapDesktopReset,
//       showTitles,
//       userHandle,
//       openProject,
//     } = this.props;

//     //

//     let dataRar = [];
//     const dataArray = screams;

//     dataArray.forEach((element) => {
//       if (
//         checked === 1 &&
//         element.lat > latitude2 &&
//         element.lat < latitude1 &&
//         element.long > longitude2 &&
//         element.long < longitude3
//       ) {
//         dataRar.push(element);
//       }
//       if (
//         element.Thema !== undefined &&
//         element.Thema === checked1 &&
//         element.lat > latitude2 &&
//         element.lat < latitude1 &&
//         element.long > longitude2 &&
//         element.long < longitude3
//       ) {
//         dataRar.push(element);
//       }
//       if (
//         element.Thema !== undefined &&
//         element.Thema === checked2 &&
//         element.lat > latitude2 &&
//         element.lat < latitude1 &&
//         element.long > longitude2 &&
//         element.long < longitude3
//       ) {
//         dataRar.push(element);
//       }
//       if (
//         element.Thema !== undefined &&
//         element.Thema === checked3 &&
//         element.lat > latitude2 &&
//         element.lat < latitude1 &&
//         element.long > longitude2 &&
//         element.long < longitude3
//       ) {
//         dataRar.push(element);
//       }
//       if (
//         element.Thema !== undefined &&
//         element.Thema === checked4 &&
//         element.lat > latitude2 &&
//         element.lat < latitude1 &&
//         element.long > longitude2 &&
//         element.long < longitude3
//       ) {
//         dataRar.push(element);
//       }
//       if (
//         element.Thema !== undefined &&
//         element.Thema === checked5 &&
//         element.lat > latitude2 &&
//         element.lat < latitude1 &&
//         element.long > longitude2 &&
//         element.long < longitude3
//       ) {
//         dataRar.push(element);
//       }
//       if (
//         element.Thema !== undefined &&
//         element.Thema === checked6 &&
//         element.lat > latitude2 &&
//         element.lat < latitude1 &&
//         element.long > longitude2 &&
//         element.long < longitude3
//       ) {
//         dataRar.push(element);
//       }
//       if (
//         element.Thema !== undefined &&
//         element.Thema === checked7 &&
//         element.lat > latitude2 &&
//         element.lat < latitude1 &&
//         element.long > longitude2 &&
//         element.long < longitude3
//       ) {
//         dataRar.push(element);
//       }
//     });

//     let dataFinal = [];
//     const dataArrayFinal = dataRar;
//     if (dataArrayFinal !== undefined && dataArrayFinal.length > 0) {
//       dataArrayFinal.forEach((element) => {
//         if (element.status === "None") {
//           dataFinal.push(element);
//         }
//       });
//     }

//     let dataRarMap = [];
//     const dataArrayMap = screams;

//     dataArrayMap.forEach((element) => {
//       if (checked === 1) {
//         dataRarMap.push(element);
//       }
//       if (element.Thema !== undefined && element.Thema === checked1) {
//         dataRarMap.push(element);
//       }
//       if (element.Thema !== undefined && element.Thema === checked2) {
//         dataRarMap.push(element);
//       }
//       if (element.Thema !== undefined && element.Thema === checked3) {
//         dataRarMap.push(element);
//       }
//       if (element.Thema !== undefined && element.Thema === checked4) {
//         dataRarMap.push(element);
//       }
//       if (element.Thema !== undefined && element.Thema === checked5) {
//         dataRarMap.push(element);
//       }
//       if (element.Thema !== undefined && element.Thema === checked6) {
//         dataRarMap.push(element);
//       }
//       if (element.Thema !== undefined && element.Thema === checked7) {
//         dataRarMap.push(element);
//       }
//     });

//     let dataFinalMap = [];
//     const dataArrayFinalMap = dataRarMap;
//     if (dataArrayFinalMap !== undefined && dataArrayFinalMap.length > 0) {
//       dataArrayFinalMap.forEach((element) => {
//         if (element.status === "None") {
//           dataFinalMap.push(element);
//         }
//       });
//     }

//     // let StatusFulfilleddataFinal = [];
//     // const StatusFulfilleddataArray = dataRar;
//     // if (
//     //   StatusFulfilleddataArray !== undefined &&
//     //   StatusFulfilleddataArray.length > 0
//     // ) {
//     //   StatusFulfilleddataArray.forEach((element) => {
//     //     if (element.status === "Fulfilled") {
//     //       StatusFulfilleddataFinal.push(element);
//     //     }
//     //   });
//     // }

//     // let StatusDeletedataFinal = [];
//     // const StatusDeletedataArray = dataRar;
//     // if (
//     //   StatusDeletedataArray !== undefined &&
//     //   StatusDeletedataArray.length > 0
//     // ) {
//     //   StatusDeletedataArray.forEach((element) => {
//     //     if (element.status === "Discarded") {
//     //       StatusDeletedataFinal.push(element);
//     //     }
//     //   });
//     // }

//     const loader =
//       loading &&
//       !openInfoPageDesktop &&
//       (cookies.get("Cookie_settings") === "all" ||
//         cookies.get("Cookie_settings") === "minimum") ? (
//         <div className="spinnerDivBackground">
//           <img src={lamploader} className="lamploader" alt="lamploader" />
//         </div>
//       ) : null;

//     const projectDialogComponent =
//       openProject === true ? (
//         <ProjectDialog
//           loading={loading}
//           openProject={openProject}
//           screamIdParam={screamIdParam}
//           _onViewportChangeDesktop={_onViewportChangeDesktop}
//           zoomToBounds={zoomToBounds}
//           showTitles={showTitles}
//           handleClick={handleClick}
//           handleLegend={handleLegend}
//           handleLegend1={handleLegend1}
//           handleLegend2={handleLegend2}
//           handleLegend3={handleLegend3}
//           handleLegend4={handleLegend4}
//           handleLegend5={handleLegend5}
//           handleLegend6={handleLegend6}
//           handleLegend7={handleLegend7}
//           checked={checked}
//           checked1={checked1}
//           checked2={checked2}
//           checked3={checked3}
//           checked4={checked4}
//           checked5={checked5}
//           checked6={checked6}
//           checked7={checked7}
//           latitude1={latitude1}
//           latitude2={latitude2}
//           latitude3={latitude3}
//           latitude4={latitude4}
//           longitude1={longitude1}
//           longitude2={longitude2}
//           longitude3={longitude3}
//           longitude4={longitude4}
//           openInfoPageDesktop={openInfoPageDesktop}
//           loadingProjects={loadingProjects}
//           projectsData={projectsData}
//           viewport={viewport}
//           mapDesktopShowResults={mapDesktopShowResults}
//         ></ProjectDialog>
//       ) : null;

//     return (
//       <>
//         <MapDesktop
//           loading={loading}
//           loadingProjects={loadingProjects}
//           dataFinal={dataFinalMap}
//           id="mapDesktop"
//           style={{ zIndex: 9999 }}
//           noLocation={noLocation}
//           handleLegend={handleLegend}
//           handleLegend1={handleLegend1}
//           handleLegend2={handleLegend2}
//           handleLegend3={handleLegend3}
//           handleLegend4={handleLegend4}
//           handleLegend5={handleLegend5}
//           handleLegend6={handleLegend6}
//           handleLegend7={handleLegend7}
//           checked={checked}
//           checked1={checked1}
//           checked2={checked2}
//           checked3={checked3}
//           checked4={checked4}
//           checked5={checked5}
//           checked6={checked6}
//           checked7={checked7}
//           dataNoLocationHandle={dataNoLocationHandle}
//           _onViewportChangeDesktop={_onViewportChangeDesktop}
//           mapDesktopShowResults={mapDesktopShowResults}
//           viewport={viewport}
//           selectedId={selectedId}
//           showTitles={showTitles}
//           openInfoPageDesktop={openInfoPageDesktop}
//           mapDesktopShowResults={mapDesktopShowResults}
//           mapDesktopReset={mapDesktopReset}
//         ></MapDesktop>
//         <div
//           className={
//             openInfoPageDesktop ? "contentWrapper_hide" : "contentWrapper"
//           }
//         >
//           {loader}
//           <div className="MainBackgroundHome" />

//           <AllIdeasPage
//             loading={loading}
//             loadingProjects={loadingProjects}
//             order={order}
//             channelOrder={channelOrder}
//             classes={classes}
//             openInfoPageDesktop={openInfoPageDesktop}
//             screams={screams}
//             dataFinal={dataFinal}
//             viewport={viewport}
//             latitude1={latitude1}
//             latitude2={latitude2}
//             latitude3={latitude3}
//             latitude4={latitude4}
//             longitude1={longitude1}
//             longitude2={longitude2}
//             longitude3={longitude3}
//             longitude4={longitude4}
//             zoomToBounds={zoomToBounds}
//             handleLegend={handleLegend}
//             handleLegend1={handleLegend1}
//             handleLegend2={handleLegend2}
//             handleLegend3={handleLegend3}
//             handleLegend4={handleLegend4}
//             handleLegend5={handleLegend5}
//             handleLegend6={handleLegend6}
//             handleLegend7={handleLegend7}
//             checked={checked}
//             checked1={checked1}
//             checked2={checked2}
//             checked3={checked3}
//             checked4={checked4}
//             checked5={checked5}
//             checked6={checked6}
//             checked7={checked7}
//             dataNoLocationHandle={dataNoLocationHandle}
//             noLocation={noLocation}
//             showDemand={showDemand}
//             handleClick={handleClick}
//             handleDropdown={handleDropdown}
//             handleOpenGeofilter={handleOpenGeofilter}
//             handleCloseGeofilter={handleCloseGeofilter}
//             handleResetGeofilter={handleResetGeofilter}
//             openGeofilter={openGeofilter}
//             showGeofilterResults={showGeofilterResults}
//             createGeofilterCircle={createGeofilterCircle}
//             selectedId={selectedId}
//             projectsData={projectsData}
//             handleChannelClick={handleChannelClick}
//             _onViewportChange={_onViewportChange}
//             _onViewportChangeDesktop={_onViewportChangeDesktop}
//             mapDesktopShowResults={mapDesktopShowResults}
//             mapDesktopReset={mapDesktopReset}
//             showTitles={showTitles}
//             dropdown={dropdown}
//             screamIdParam={screamIdParam}
//             userHandle={userHandle}
//           ></AllIdeasPage>

//           <ProjectsPage
//             loading={loading}
//             loadingProjects={loadingProjects}
//             order={order}
//             channelOrder={channelOrder}
//             classes={classes}
//             openInfoPageDesktop={openInfoPageDesktop}
//             screams={screams}
//             dataFinal={dataFinal}
//             viewport={viewport}
//             latitude1={latitude1}
//             latitude2={latitude2}
//             latitude3={latitude3}
//             latitude4={latitude4}
//             longitude1={longitude1}
//             longitude2={longitude2}
//             longitude3={longitude3}
//             longitude4={longitude4}
//             zoomToBounds={zoomToBounds}
//             handleLegend={handleLegend}
//             handleLegend1={handleLegend1}
//             handleLegend2={handleLegend2}
//             handleLegend3={handleLegend3}
//             handleLegend4={handleLegend4}
//             handleLegend5={handleLegend5}
//             handleLegend6={handleLegend6}
//             handleLegend7={handleLegend7}
//             checked={checked}
//             checked1={checked1}
//             checked2={checked2}
//             checked3={checked3}
//             checked4={checked4}
//             checked5={checked5}
//             checked6={checked6}
//             checked7={checked7}
//             dataNoLocationHandle={dataNoLocationHandle}
//             showDemand={showDemand}
//             handleClick={handleClick}
//             handleDropdown={handleDropdown}
//             handleOpenGeofilter={handleOpenGeofilter}
//             handleCloseGeofilter={handleCloseGeofilter}
//             handleResetGeofilter={handleResetGeofilter}
//             openGeofilter={openGeofilter}
//             showGeofilterResults={showGeofilterResults}
//             createGeofilterCircle={createGeofilterCircle}
//             selectedId={selectedId}
//             projectsData={projectsData}
//             handleChannelClick={handleChannelClick}
//             _onViewportChange={_onViewportChange}
//             _onViewportChangeDesktop={_onViewportChangeDesktop}
//             mapDesktopShowResults={mapDesktopShowResults}
//             mapDesktopReset={mapDesktopReset}
//             showTitles={showTitles}
//             dropdown={dropdown}
//             screamIdParam={screamIdParam}
//             userHandle={userHandle}
//           ></ProjectsPage>

//           <InsightsPage
//             order={order}
//             loading={loading}
//             openInfoPageDesktop={openInfoPageDesktop}
//             classes={classes}
//             screams={screams}
//             viewport={viewport}
//             latitude1={latitude1}
//             latitude2={latitude2}
//             latitude3={latitude3}
//             latitude4={latitude4}
//             longitude1={longitude1}
//             longitude2={longitude2}
//             longitude3={longitude3}
//             longitude4={longitude4}
//             handleLegend={handleLegend}
//             handleLegend1={handleLegend1}
//             handleLegend2={handleLegend2}
//             handleLegend3={handleLegend3}
//             handleLegend4={handleLegend4}
//             handleLegend5={handleLegend5}
//             handleLegend6={handleLegend6}
//             handleLegend7={handleLegend7}
//             checked={checked}
//             checked1={checked1}
//             checked2={checked2}
//             checked3={checked3}
//             checked4={checked4}
//             checked5={checked5}
//             checked6={checked6}
//             checked7={checked7}
//             dataNoLocationHandle={dataNoLocationHandle}
//             showDemand={showDemand}
//             handleClick={handleClick}
//             handleDropdown={handleDropdown}
//             handleOpenGeofilter={handleOpenGeofilter}
//             handleCloseGeofilter={handleCloseGeofilter}
//             handleResetGeofilter={handleResetGeofilter}
//             openGeofilter={openGeofilter}
//             showGeofilterResults={showGeofilterResults}
//             createGeofilterCircle={createGeofilterCircle}
//             selectedId={selectedId}
//             channelOrder={channelOrder}
//             // projectsData={projects}
//             handleChannelClick={handleChannelClick}
//             _onViewportChangeDesktop={_onViewportChangeDesktop}
//             mapDesktopShowResults={mapDesktopShowResults}
//             mapDesktopReset={mapDesktopReset}
//             showTitles={showTitles}
//             screamIdParam={screamIdParam}
//           ></InsightsPage>

//           <ScreamDialog
//             screamIdParam={screamIdParam}
//             projectsData={projectsData}
//           ></ScreamDialog>

//           {projectDialogComponent}
//         </div>
//       </>
//     );
//   }
// }
// MainPage.propTypes = {};

// const mapActionsToProps = {};

// const mapStateToProps = (state) => ({
//   data: state.data,
// });

// export default connect(
//   mapStateToProps,
//   mapActionsToProps
// )(withStyles(styles)(MainPage));
