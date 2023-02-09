import React from "react";
import { FiThumbsUp } from "react-icons/fi";

export function Post(props: { name: string, program: string, image: string }) {
  return <div className="Post">
    <div className="Post-likes"></div>
    <FiThumbsUp className="Thumb-icon" />
    <strong>{props.name}</strong>
    <br></br>
    <div className="Post-content">
      {props.program}
    </div>
    <div className="Post-content">
      <img src={props.image} className="Post-image" alt="Exercise" />
    </div>
  </div>;
}
