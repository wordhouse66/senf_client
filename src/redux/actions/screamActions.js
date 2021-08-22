/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import { clearErrors } from "./errorsActions";
import { openProject } from "./projectActions";
import {
  SET_SCREAMS,
  LOADING_DATA,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  EDIT_SCREAM,
  ADMIN_EDIT_SCREAM,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  OPEN_SCREAM,
  CLOSE_SCREAM,
  SET_SCREAM_USER,
} from "../types";
import axios from "axios";

// Get all ideas
export const getScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });

  const db = firebase.firestore();
  const ref = await db.collection("screams").orderBy("createdAt", "desc").get();

  const screams = [];
  ref.docs.forEach((doc) => {
    const docData = {
      screamId: doc.id,
      lat: doc.data().lat,
      long: doc.data().long,
      title: doc.data().title,
      body: doc.data().body.substr(0, 170),
      createdAt: doc.data().createdAt,
      commentCount: doc.data().commentCount,
      likeCount: doc.data().likeCount,
      status: doc.data().status,
      Thema: doc.data().Thema,
      Stadtteil: doc.data().Stadtteil,
      project: doc.data().project,
      projectId: doc.data().project,
    };

    screams.push(docData);
  });

  dispatch({
    type: SET_SCREAMS,
    payload: screams,
  });
};

// Open an idea
export const openScream = (screamId) => async (dispatch) => {
  const db = firebase.firestore();
  const ref = await db.collection("screams").doc(screamId).get();
  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "desc")
    .get();

  if (!ref.exists) {
    console.log("No such document!");
  } else {
    const scream = ref.data();
    scream.screamId = ref.id;
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );

    window.location = "#" + scream.lat + "#" + scream.long;

    dispatch({ type: LOADING_UI });
    dispatch({ type: OPEN_SCREAM });
    const newPath = `/${screamId}`;
    window.history.pushState(null, null, newPath);
    dispatch({ type: SET_SCREAM, payload: scream });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const closeScream = () => (dispatch) => {
  dispatch({ type: CLOSE_SCREAM });
  window.history.pushState(null, null, "/");

  setTimeout(() => {
    document.body.style.overflow = "scroll";
  }, 1000);
};

// Post an idea
export const postScream = (newScream, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  // if (newScream.title.trim() === "") {
  //   return response.status(400).json({ title: " " });
  // }

  // if (newScream.body.trim() === "") {
  //   return response.status(400).json({ body: "Beschreibung fehlt" });
  // }

  // const newScreamData = {
  //   locationHeader: newScream.locationHeader,
  //   district: newScream.district,
  //   title: newScream.title,
  //   lat: newScream.lat,
  //   long: newScream.long,
  //   body: newScream.body,
  //   userHandle: user.handle,
  //   sex: user.sex,
  //   age: user.age,
  //   createdAt: new Date().toISOString(),
  //   likeCount: 0,
  //   commentCount: 0,
  //   status: "None",
  //   project: newScream.project,
  // };

  axios
    .post("/postScream", newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });

      setTimeout(() => {
        const project =
          window.location.pathname.indexOf("_") > 0
            ? window.location.pathname.substring(1)
            : "";

        if (project.indexOf("_") > 0) {
          dispatch(openProject(project));
        } else {
          history.push(`/${res.data.screamId}`);
          const screamId = res.data.screamId;
          dispatch(openScream(screamId));
        }
      }, 20);

      dispatch(clearErrors());
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Edit your idea
export const editScream = (editScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  const screamId = editScream.screamId;

  axios
    .post(`/editScream/${screamId}`, editScream)
    .then((res) => {
      dispatch({
        type: EDIT_SCREAM,
        payload: res.data,
      });

      dispatch(openScream(screamId));
      dispatch(clearErrors());
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Edit an idea as a admin
export const adminEditScream = (editScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  const screamId = editScream.screamId;

  axios
    .post(`/adminEditScream/${screamId}`, editScream)
    .then((res) => {
      dispatch({
        type: ADMIN_EDIT_SCREAM,
        payload: res.data,
      });

      dispatch(openScream(screamId));
      dispatch(clearErrors());
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      });
    })

    .catch((err) => console.log(err))
    .finally(() => {
      setTimeout(() => {
        window.history.pushState(null, null, "/");
        window.location.reload(false);
        dispatch(clearErrors());
      }, 10);
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch(
        {
          type: SET_SCREAM_USER,
          payload: res.data.user,
        },
        console.log(res.data.user)
      );
    })
    .catch((err) => console.log(err));
};
