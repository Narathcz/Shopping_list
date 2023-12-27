import { useState, useScreenSize } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { Utils, createVisualComponent, useAppBackground, Lsi } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ListView from "../core/list-view.js";
import { INITIAL_DATA } from "../core/constants.js";
import importLsi from "../lsi/import-lsi.js";

const Css = { 
  main: () =>
    Config.Css.css({
      textAlign: "center", 
      marginTop: "40px",
      marginBottom: "20px",
    }),
    container: (screenSize) => {
      let maxWidth;
  
      switch (screenSize) {
        case "xs":
        case "s":
          maxWidth = "100%";
          break;
        case "m":
        case "l":
          maxWidth = 640;
          break;
        case "xl":
        default:
          maxWidth = 1280;
      }
  
      return Config.Css.css({ maxWidth: maxWidth, margin: "0px auto", paddingLeft: 8, paddingRight: 8 });
    },
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
    const [background, setBackground] = useAppBackground();
    const darkMode = background === "dark"; 
    const [screenSize] = useScreenSize();

    const handleMemberSelect = ( member ) => {
      setSelectedMember ( member.id );
      setSelectMember ( member );
    };

    return (
      
      <div {...attrs} >
        <div style={{ display: "flex", margin: "auto", width: "fit-content" }}>
            <Uu5Elements.LanguageSelector languageList = { ["cs", "en"] } />
            <Uu5Elements.Toggle 
              value = {!darkMode}
              onChange = {() => setBackground({
                backgroundColor: darkMode ? null : Uu5Elements.UuGds.ColorPalette.getValue (["building", "dark", "main"])
              })}
              iconOff = "uugdsstencil-weather-moon"
              iconOn = "uugdsstencil-weather-sun"
              style={{
                margin: "10px",
                marginBottom: "25px",
                height: "15px"
              }}
            /> 
        </div>
          <div style = {{ fontSize: "20px", color: "grey" }} className={Css.container(screenSize)}>
            <Uu5Elements.Text colorScheme="building" significance="common" > 
              <Lsi import = { importLsi } path = {[ "Home", "chooseMember" ]} />{" "} 
            </Uu5Elements.Text>
            { INITIAL_DATA[0].memberList.map (( member ) => (
              <Uu5Elements.Button
                key = { member.id }
                onClick = {() => handleMemberSelect ( member ) }
                colorScheme = {selectedMember === member.id ? "building" : "building"}
                significance = {selectedMember === member.id ? "highlighted" : "common"}
                style={{
                  marginRight: "5px"  
                }}
              >
                { member.name } { member.surname }
              </Uu5Elements.Button>
            ))}
          </div> 
          <div {...attrs} style = { { fontSize: "40px", color: "#000099" } }>
          <Uu5Elements.Text colorScheme="building" significance="common" >
            <Lsi import = { importLsi } path = {[ "Home", "title" ]} />
          </Uu5Elements.Text></div>
          <div style = {{ margin: "auto", width: "fit-content" }}>
            <ListView selectMember = { selectMember }/>
          </div>
      </div> 
      
    );
  },
});

Home = withRoute (Home, { authenticated: true } );

export { Home };
export default Home;

