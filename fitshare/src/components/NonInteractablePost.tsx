
export function NonInteractablePost(props: {
    id: string,
    name: string,
    description: string,
    program?: { workoutName: string; exercises: { name: string; sets: number; reps: number }[] }[],
    image: string,
    isAd: boolean
}) {
    return (
        <div className="Post"
            style={props.isAd ? { backgroundColor: "#b3ad00" } : {}}>
            <strong>{props.name}</strong>
            <br></br>
            <div className="Post-content">
                <p className="Post-description">{props.description}</p>
                {props.program && props.program.map((workout, key) => (
                    <div className="Workout" key={key}>
                        <br></br>
                        <strong>{workout.workoutName}</strong>
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
            {props.image ? <><br></br> <img src={props.image} className="Post-image" alt="Exercise" /></> : ""}
        </div>
    );
}