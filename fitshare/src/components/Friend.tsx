import React from "react";

export function Friend(props: { name: string, image: string }) {
  console.log(props.image);
  return <div className="Friend">
    <img className="Friend-profile-pic" src={props.image ? props.image : "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png"} alt={props.name} />
    <div className="Friend-name">{props.name}</div>
  </div>;
}
