import { useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { Utils, createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ShoppingList from "../core/shoppinglist.js";
import MemberList from "../core/memberlist.js";
import { INITIAL_MEMBER_LIST } from "../core/constants.js";

const Css = { 
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "40px",
    }),
};

let Home = createVisualComponent({
  
  uu5Tag: Config.TAG + "Home",
  propTypes: {},
  defaultProps: {},

  render(props) {
    const [currentUserRole, setCurrentUserRole] = useState ( true ); 
    const initialSelectedMember = INITIAL_MEMBER_LIST.find(member => member.owner) || null; 
    const [selectedMember, setSelectedMember] = useState(initialSelectedMember ? initialSelectedMember.id : null); 
    const attrs = Utils.VisualComponent.getAttrs( props, Css.main() );

    const handleMemberSelect = ( member ) => {
      setCurrentUserRole (member.owner); 
      setSelectedMember(member.id);
    };

    return (
      <div>
        <div {...attrs}>
          <div style = {{fontSize: "20px", color: "grey"}}>
            Vyberte člena:{" "}
            {INITIAL_MEMBER_LIST.map((member) => (
              <Uu5Elements.Button
                key = { member.id }
                onClick = {() => handleMemberSelect ( member ) }
                style={{
                  backgroundColor: 
                  selectedMember === member.id ? "#89D4F9" : "#DAECFA",
                  color: "grey",
                  margin: "5px"
                }}
              >
                { member.name } { member.surname }{" "}{member.owner && "(vlastník)"}
              </Uu5Elements.Button>
            ))}
          </div> 
        </div>
        <div {...attrs} style = { { fontSize: "40px", color: "#000099" } }>NÁKUPNÍ SEZNAM</div>
          <div {...attrs}>
            <ShoppingList currentUserRole = { currentUserRole } /> 
            <MemberList currentUserRole = { currentUserRole } selectedMember = { selectedMember }/>
          </div>
      </div> 
    );
  },
});

Home = withRoute (Home, { authenticated: true } );

export { Home };
export default Home;

