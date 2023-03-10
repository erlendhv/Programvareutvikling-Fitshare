import React from "react";
import { GiWeightLiftingUp } from "react-icons/gi";

export function Execution(props: { name: string }) {
    return <div className="Execution">
        <GiWeightLiftingUp className="Execution-pic" />
        <div className="Execution-name">{props.name}</div>
    </div>;
}