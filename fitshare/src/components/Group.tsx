
export function Group(props: { name: string, onClick: any, selected: boolean }) {

  return <>
    <div className={props.selected ? "Group-icon-selected" : "Group-icon"} onClick={props.onClick} >
    </div>
    {props.name}
  </>;
}
