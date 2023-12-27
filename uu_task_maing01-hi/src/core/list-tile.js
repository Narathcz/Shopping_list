import { useState, Lsi } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import { setName } from "./helperfunctions";
import importLsi from "../lsi/import-lsi.js";

const spacingStyle = {
    marginBottom: "10px"
};

const tileStyle = {
    width: "100%", 
};

function ListTile ( props ) {
    
        const [ confirmationModalOpen, setConfirmationModalOpen ] = useState ( false );
        const [ clickedType, setClickedType ] = useState ( null );

        const handleTileClick = ( event ) => {
            const name = props.data.name;
            setName ( name );
            setClickedType ( "tile" ); 
        };

        const handleRemoveListClick = ( event ) => {
            setConfirmationModalOpen ( true );
            setClickedType ( "icon" );
          };
      
          const handleConfirmRemoveList = () => {
            const name = props.data.name;
            if ( props.onRemoveList ) {
              props.onRemoveList ( name );
            }
            setConfirmationModalOpen ( false );
            setClickedType ( null );
          };
      
          const handleCancelRemoveList = () => {
            setConfirmationModalOpen ( false );
            setClickedType ( null );
          };

          const handleStrikeText = ( event ) => {
            const name = props.data.name;
            props.onStrikeText ( name );
          };


        const listData = props.nameList.find(( item ) => item.name === props.data.name );
        const ownerMember = listData.memberList.find(( member ) => member.owner);
        const footerText = ownerMember ? 
          <>
            <Lsi import = { importLsi } path = {[ "ListTile", "owner" ]} />
            { ` ${ ownerMember.name } ${ ownerMember.surname }`}
          </> : '';
        const hrefValue = clickedType === "tile" ? "list" : "#";
        const colorValue = clickedType === "tile" ? "common" : "highlighted";

        const isArchived = listData.archive || false;
        const tileStyleWithTextDecoration = isArchived ? { textDecoration: "line-through", color: "red" } : {};

        return (
            <>
            <Uu5Elements.Link href = { hrefValue } onClick = { handleTileClick } style = { spacingStyle }>
              <Uu5TilesElements.Tile 
                  style = {{...tileStyle, ...tileStyleWithTextDecoration}} 
                  header = { props.data.name } 
                  footer = { footerText }  
                  footerSignificance = "distinct"
                  headerColorScheme = "neutral"
                  headerSignificance = { colorValue }
                  actionList = {
                    props.selectMember.surname === ownerMember.surname ? [
                    { icon: "uugdsstencil-uiaction-archive", onClick: handleStrikeText }, { icon: "uugds-close", onClick: handleRemoveListClick }]: [""] } 
              >
              </Uu5TilesElements.Tile>
            </Uu5Elements.Link>
            <Uu5Elements.Modal 
              open = {confirmationModalOpen} 
              onClose = {handleCancelRemoveList} 
              header = {<Lsi import = { importLsi } path = {[ "ListTile", "headerDelete" ]} />} 
              footer = {<Uu5Elements.Button 
              onClick = {handleConfirmRemoveList}
              >
                <Lsi import = { importLsi } path = {[ "ListTile", "confirm" ]} />
              </Uu5Elements.Button>}>
                <Lsi import = { importLsi } path = {[ "ListTile", "confirmDelete" ]} />
            </Uu5Elements.Modal>
          </>
        )
    };

export default ListTile;