/** @format */

import firebase from "firebase/app";
import "firebase/firestore";

import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_COMMENT,
  DELETE_COMMENT,
  SET_ERRORS,
  POST_SCREAM,
  EDIT_SCREAM,
  ADMIN_EDIT_SCREAM,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  LOADING_PROJECTS_DATA,
  SET_PROJECTS,
  SET_PROJECT_SCREAMS,
  OPEN_SCREAM,
  CLOSE_SCREAM,
  OPEN_PROJECT,
  CLOSE_PROJECT,
  CLEAR_LOADING_ERRORS,
  SET_SCREAM_USER,
  SET_FULL_SCREAMS,
  OPEN_MONITORING_SCREAM,
  CLOSE_MONITORING_SCREAM,
} from "../types";
import axios from "axios";

// Get all projects
export const getProjects = () => async (dispatch) => {
  dispatch({ type: LOADING_PROJECTS_DATA });

  const db = firebase.firestore();
  const ref = await db
    .collection("projects")
    .orderBy("createdAt", "desc")
    .get();

  const projects = [];
  ref.docs.forEach((doc) => {
    const docData = {
      project: doc.id,
      title: doc.data().title,
      // description: doc.data().description,
      owner: doc.data().owner,
      createdAt: doc.data().createdAt,
      imgUrl: doc.data().imgUrl,
      startDate: doc.data().startDate,
      endDate: doc.data().endDate,
      status: doc.data().status,
      geoData: doc.data().geoData,
      centerLat: doc.data().centerLat,
      centerLong: doc.data().centerLong,
      zoom: doc.data().zoom,
      projectId: doc.id,
      // weblink: doc.data().weblink,
    };

    projects.push(docData);
  });

  dispatch({
    type: SET_PROJECTS,
    payload: projects,
  });
};

// Open a project
export const openProject = (project) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  const db = firebase.firestore();
  const ref = await db.collection("projects").doc(project).get();

  const screamsRef = await db
    .collection("screams")
    .where("project", "==", project)
    .orderBy("createdAt", "desc")
    .get();

  if (!ref.exists) {
    console.log("No such document!");
  } else {
    const project = ref.data();

    project.id = ref.id;
    project.screams = [];

    screamsRef.docs.forEach((doc) =>
      project.screams.push({ ...doc.data(), id: doc.id })
    );

    const newPath = `/${project.id}`;
    window.history.pushState(null, null, newPath);
    dispatch({ type: SET_PROJECT_SCREAMS, payload: project });
    dispatch({ type: OPEN_PROJECT });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const closeProject = () => (dispatch) => {
  dispatch({ type: CLOSE_PROJECT });
  window.history.pushState(null, null, "/");

  setTimeout(() => {
    document.body.style.overflow = "scroll";
  }, 1000);
};

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
    scream.id = ref.id;
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), id: doc.id })
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

// Like a scream

export const likeScream = (screamId, user) => async (dispatch) => {
  const db = firebase.firestore();
  const screamDocument = db.collection("screams").doc(screamId);
  const doc = await screamDocument.get();

  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "desc")
    .get();

  const likeDocument = await db
    .collection("likes")
    .where("userHandle", "==", user.credentials.handle)
    .where("screamId", "==", screamId)
    .limit(1)
    .get();

  if (!doc.exists) {
    console.log("No such document!");
  } else {
    const scream = doc.data();
    scream.screamId = doc.id;
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );

    if (likeDocument.exists) {
      console.log("already liked");
    } else {
      db.collection("likes").add({
        screamId: screamId,
        userHandle: user.credentials.handle,
        createdAt: new Date().toISOString(),
        sex: user.credentials.sex,
        age: user.credentials.age,
      });

      scream.likeCount++;
      screamDocument.update({ likeCount: scream.likeCount });

      dispatch({
        type: LIKE_SCREAM,
        payload: scream,
      });
    }
  }
};
// Unlike an idea
export const unlikeScream = (screamId, user) => async (dispatch) => {
  console.log(screamId, user);
  const db = firebase.firestore();
  const screamDocument = db.collection("screams").doc(screamId);
  const doc = await screamDocument.get();

  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "desc")
    .get();

  const likeDocument = await db
    .collection("likes")
    .where("userHandle", "==", user.credentials.handle)
    .where("screamId", "==", screamId)
    .limit(1)
    .get();

  if (!doc.exists) {
    console.log("No such document!");
  } else {
    const scream = doc.data();
    scream.screamId = doc.id;
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );

    if (likeDocument.docs[0].id === undefined) {
      console.log("scream not liked");
    } else {
      db.collection("likes").doc(likeDocument.docs[0].id).delete();

      scream.likeCount--;
      screamDocument.update({ likeCount: scream.likeCount });

      dispatch({
        type: UNLIKE_SCREAM,
        payload: scream,
      });
    }
  }
};

//get the data for one comment
export const getComment = (commentId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/comment/${commentId}`)
    .then((res) => {
      dispatch({
        type: SET_COMMENT,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Submit a comment to an idea
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      console.log("res=", res);

      console.log("res after", res);

      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log("error aqui", err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//delete your comment
export const deleteComment = (commentId) => (dispatch) => {
  axios
    .delete(`/comment/${commentId}`)
    .then(() => {
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
      dispatch(clearErrors());
    })
    .catch((err) => console.log(err));
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

//Open an idea on the monitoring board
export const openMonitoringScream = (screamId) => async (dispatch) => {
  const db = firebase.firestore();
  const ref = await db.collection("screams").doc(screamId).get();

  if (!ref.exists) {
    console.log("No such document!");
  } else {
    const scream = ref.data();
    scream.id = ref.id;

    dispatch({ type: LOADING_UI });
    dispatch({ type: OPEN_MONITORING_SCREAM });

    // const newPath = `/${screamId}`;
    // window.history.pushState(null, null, newPath);
    dispatch({ type: SET_SCREAM, payload: scream });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const closeMonitoringScream = () => (dispatch) => {
  dispatch({ type: CLOSE_MONITORING_SCREAM });
  window.history.pushState(null, null, "/monitoring");
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

// Get all ideas with full data
export const getAllFullScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });

  const db = firebase.firestore();
  const ref = await db.collection("screams").orderBy("createdAt", "desc").get();

  const screams = [];
  ref.docs.forEach((doc) => {
    const docData = {
      screamId: doc.id,
      ...doc.data(),
    };

    screams.push(docData);
  });

  dispatch({
    type: SET_FULL_SCREAMS,
    payload: screams,
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearLoadingErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_LOADING_ERRORS });
};
