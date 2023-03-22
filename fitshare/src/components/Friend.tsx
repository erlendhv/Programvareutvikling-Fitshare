import React from "react";

export function Friend(props: { name: string, image: string }) {
  console.log(props.image);
  return <div className="Friend">
    <img className="Friend-profile-pic" src={props.image} />
    <div className="Friend-name">{props.name}</div>
  </div>;
}
