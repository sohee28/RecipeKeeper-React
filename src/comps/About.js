import React from "react";
import MainPhoto from "../image/Aboutpic.png";
import AboutText from "../image/About.png";
import "../styles/About.css";

const About = () => {
  return (
    <div className="aboutMain">
      <div className="abouttexts">
        <img src={AboutText} alt="About"></img>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </p>
      </div>
      <img className="aboutphoto" src={MainPhoto} alt="avocadoreading"></img>
    </div>
  );
};

export default About;
