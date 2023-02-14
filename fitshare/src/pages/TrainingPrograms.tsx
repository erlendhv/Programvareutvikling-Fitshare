import React, { useState } from "react";
import { Program } from "../components/Program";

interface Excersise {
    name: string;
    sets: number;
    reps: number;
}

interface Workout {
  name: string;
  exercises: Excersise[];
}

interface Program {
  name: string;
  workouts: Workout[];
  expanded: boolean;
}

export function TrainingPrograms() {
    return (
        <div>
            <h1>Training Programs</h1>
            <Program/>
        </div>
    );
}

export default TrainingPrograms;
