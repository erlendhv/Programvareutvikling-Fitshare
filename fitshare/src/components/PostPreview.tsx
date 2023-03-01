interface Exercise {
  name: string;
  sets: number;
  reps: number;
  id: string;
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface Program {
  id: string;
  name: string;
  workouts: Workout[];
}

export function PostPreview(props: {
  id: string;
  name: string;
  program: Program;
}) {
  return (
    <div className="Post">
      <strong>{props.name}</strong>
      <br></br>
      <div className="Post-content">
        <strong>{props.program.workouts.length > 0 ? "Program" : ""}</strong>
        <br></br>

        {props.program.workouts.map((workout, key) => (
          <div className="Workout" key={key}>
            <br></br>
            <strong>{workout.name}</strong>
            <br></br>
            {workout.exercises.map((exercise, key) => (
              <div className="Exercise" key={key}>
                <strong>{exercise.name}</strong>
                <br></br>
                {exercise.sets} sets of {exercise.reps} reps
                <br></br>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
