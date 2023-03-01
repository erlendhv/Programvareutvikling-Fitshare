
export function Group(props: { name: string, onClick: any }) {

  return <>
    <div className="Group-icon" onClick={props.onClick} >
    </div>
    {props.name} onClick = {props.onClick}
  </>;
}
