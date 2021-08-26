/** @format */

import React, { useEffect } from "react";
import { useHistory } from "react-router";

//Translation
import { useTranslation } from "react-i18next";

//Images
import FirstImage from "../../images/cityperson.png";
import FirstImageBad from "../../images/citypersonBad.png";
import { LazyImage } from "react-lazy-images";

//MUI STuff
import withStyles from "@material-ui/core/styles/withStyles";

//REDUX
import { setCookies } from "../../redux/actions/cookiesActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//CHECK DEVICE
import { isMobileOnly } from "react-device-detect";

//Cookies
import Cookies from "universal-cookie";
const cookies = new Cookies();

const styles = {
  wrapper: {
    backgroundColor: "white",
    width: "100vw",
    height: "100vh",
    position: "fixed",
  },
  PlattformButton2: {
    position: "fixed",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    bottom: "4em",
    borderRadius: "100px",
    color: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    backgroundColor: "#414345",
    textTransform: "none",
    fontSize: "14pt",
  },

  FirstImage: {
    position: "absolute",
    top: "9vh",
    width: "100vw",
    marginLeft: "0vw",
  },
};

const Intro = ({ classes }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { cookie_settings } = useSelector((state) => state.data);

  useEffect(() => {
    if (!isMobileOnly) {
      history.push("/");
    }
  }, []);

  const handleOpenCookiePreferences = () => {
    window.open("/cookieConfigurator", "_blank");
  };

  const handleCookies = (cookie_settings) => {
    dispatch(setCookies(cookie_settings));
  };

  const cookiebanner =
    cookies.get("Cookie_settings") !== "all" &&
    cookies.get("Cookie_settings") !== "minimum" ? (
      <div>
        <div className="cookiesText">
          {" "}
          <span className="cookiesHeader">{t("cookiebanner_title")}</span>
          <br />
          {t("")}
          Für die Bereitstellung einiger Funktionen und die Verbesserung dieses
          Services brauchen wir Cookies. Falls du wirklich nur die technisch
          notwendigsten Cookies akzeptieren willst, klicke{" "}
          <span className="Terms" onClick={() => handleCookies("minimum")}>
            hier
          </span>
          &nbsp;oder konfiguriere deine{" "}
          <span className="Terms" onClick={handleOpenCookiePreferences}>
            Cookie-Einstellungen
          </span>
          .
        </div>
        <div className="AcceptBanner" onClick={() => handleCookies("all")}>
          Akzeptieren
        </div>
        <span className="footerIntro">
          <Link to="/impressum" className="footerIntroText">
            <span className="impressumIntro"> Impressum </span>
          </Link>
          <Link to="/datenschutz" className="footerIntroText">
            <span className="datenschutzInto"> | Datenschutz |</span>
          </Link>
          <Link to="/agb" className="footerIntroText">
            <span> AGB </span>
          </Link>
        </span>{" "}
      </div>
    ) : null;

  return (
    <div className={classes.wrapper}>
      <div className="wrapperMenu">
        {/* <div className={classes.nav}>
          <h1 className="logoIntro">
            Gib deinen <br />
            Senf dazu!
          </h1>
        </div> */}

        <LazyImage
          src={FirstImage}
          className={classes.FirstImage}
          alt="Person_Senftube"
          placeholder={({ imageProps, ref }) => (
            <img
              ref={ref}
              src={FirstImageBad}
              className={classes.FirstImage}
              alt="Person_Senftube"
            />
          )}
          actual={({ imageProps }) => (
            <img {...imageProps} alt="Person_Senftube" />
          )}
        />
        <Link to="/start">
          <div className={classes.PlattformButton2}>Weiter</div>
        </Link>

        <span className="footerIntro">
          <Link to="/impressum" className="footerIntroText">
            <span className="impressumIntro"> Impressum </span>
          </Link>
          <Link to="/datenschutz" className="footerIntroText">
            <span className="datenschutzInto"> | Datenschutz |</span>
          </Link>
          <Link to="/agb" className="footerIntroText">
            <span> AGB </span>
          </Link>
        </span>
      </div>
      {cookiebanner}
    </div>
  );
};

export default withStyles(styles)(Intro);
