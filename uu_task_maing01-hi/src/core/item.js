import Uu5Elements from "uu5g05-elements";

function Item ( props ) {
  const textContainerStyle = props.done
    ? { textDecoration: "line-through", color: "#FA6E6E" }
    : {};

  return (
    <Uu5Elements.ListItem
      actionList = {[
        { icon: "uugds-check", colorScheme: "positive", onClick: props.onStrikeText },
        { icon: "uugds-close", colorScheme: "negative", onClick: props.onDelete }
      ]}
      colorScheme = "blue"
      significance = "common"
    >
      <span style = { textContainerStyle } >{ props.name }</span>
    </Uu5Elements.ListItem>
  );
} 

export default Item;