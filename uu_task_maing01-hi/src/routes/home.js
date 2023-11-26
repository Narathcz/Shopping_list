import { useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { Utils, createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ListView from "../core/list-view.js";
import { INITIAL_DATA } from "../core/constants.js";

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
    
    const initialSelectedMember = INITIAL_DATA[0].memberList.find ( member => member.owner ) || null; 
    const [selectedMember, setSelectedMember] = useState ( initialSelectedMember ? initialSelectedMember.id : null );
    const [selectMember, setSelectMember] = useState ( initialSelectedMember ); 
    const attrs = Utils.VisualComponent.getAttrs ( props, Css.main() );

    const handleMemberSelect = ( member ) => {
      setSelectedMember ( member.id );
      setSelectMember ( member );
    };

    return (
      <div {...attrs}>
          <div style = {{ fontSize: "20px", color: "grey" }}>
            Vyberte člena:{" "}
            { INITIAL_DATA[0].memberList.map (( member ) => (
              <Uu5Elements.Button
                key = { member.id }
                onClick = {() => handleMemberSelect ( member ) }
                style = {{
                  backgroundColor: 
                  selectedMember === member.id ? "#89D4F9" : "#DAECFA",
                  color: "grey",
                  margin: "5px"
                }}
              >
                { member.name } { member.surname }
              </Uu5Elements.Button>
            ))}
          </div> 
          <div {...attrs} style = { { fontSize: "40px", color: "#000099", marginBottom: "40px" } }>NÁKUPNÍ SEZNAMY</div>
          <ListView selectMember = { selectMember }/>
      </div> 
    );
  },
});

Home = withRoute (Home, { authenticated: true } );

export { Home };
export default Home;

