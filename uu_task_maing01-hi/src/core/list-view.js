import { useState, Lsi } from "uu5g05";
import Config from "../config/config";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Forms from "uu5g05-forms";
import ListTile from "./list-tile";
import { INITIAL_DATA } from "./constants";
import importLsi from "../lsi/import-lsi.js";

function ListView ({ selectMember }) {
    
        const [nameList, setNameList] = useState ( INITIAL_DATA );
        const [showArchive, setShowArchive] = useState ( false );
        const [modalOpen, setModalOpen] = useState ( false );

        const filteredList = nameList.filter ( item =>
            item.memberList.some ( member => member.id === selectMember.id )
        );

        const filteredLists = showArchive ? filteredList : filteredList.filter ( item => !item.archive );

        function handleFormSubmit ( e ) {
            const formData = e.data.value; 

            const newData = {
                name: formData.name,
                archive: false,
                memberList: [
                    {
                        id: selectMember.id,
                        name: selectMember.name,
                        surname: selectMember.surname,
                        owner: true,
                    },
                ],
                shoppingList: [],
            };

            setNameList (( actualNameList ) => {
                const updatedList = [  ...actualNameList, newData ];
                return updatedList;
            });
            
            setModalOpen ( false );
        }

        function handleRemoveList ( listName ) {
            setNameList (( prevNameList ) => {
              const updatedList = prevNameList.filter (( item ) => item.name !== listName );
              return updatedList;
            });
          }

          function handleStrikeText ( listName ) {
            setNameList (( actualNameList ) => {
              const updatedList = actualNameList.map (( item ) => {
                if ( item.name === listName ) {
                  return { ...item, archive: !item.archive };
                }
                return item;
              }); 
              return updatedList;
            });
        }

        return (
            <div>
            <Uu5Elements.Block className = { Config.Css.css ({ width: "500px", maxWidth: "100%" })} >
                    <div style = {{ display: "flex", flexDirection: "column" }}>
                        <div style = {{ marginBottom: "20px" }}>
                        
                            <Uu5Elements.Button
                                onClick = {() => setModalOpen ( true )}
                                className = { Config.Css.css ({ flex: 1, marginRight: "8px" })}
                                colorScheme = "building"
                                significance = "distinct"
                                style = {{ width: "calc(50% - 5px)" }}
                            >
                                <Lsi import = { importLsi } path = {[ "ListView", "add" ]} />
                            </Uu5Elements.Button>
                        
                            <Uu5Elements.Button
                                onClick = {() => setShowArchive ( !showArchive )}
                                className = { Config.Css.css ({ flex: 1 })}
                                colorScheme = "building"
                                significance = "distinct"
                                style = {{ width: "calc(50% - 5px)" }}
                            >
                                { showArchive ? 
                                <Lsi import = { importLsi } path = {[ "ListView", "archButton1" ]} /> 
                                : 
                                <Lsi import = { importLsi } path = {[ "ListView", "archButton2" ]} /> 
                                }
                            </Uu5Elements.Button> 
                        </div>

                        <Uu5TilesElements.Grid 
                            data = { filteredLists.map ( item => ({ name: item.name }))} 
                        >
                            <ListTile 
                                nameList = { nameList } 
                                onRemoveList = { handleRemoveList} 
                                onStrikeText = { handleStrikeText } 
                                selectMember = { selectMember }
                            />
                        </Uu5TilesElements.Grid>

                    </div>
            </Uu5Elements.Block>

            <Uu5Forms.Form.Provider key = { modalOpen } onSubmit = { handleFormSubmit }>
                    <Uu5Elements.Modal 
                        open = { modalOpen } 
                        onClose = {() => setModalOpen ( false )} 
                        header = {<Lsi import = { importLsi } path = {[ "ListView", "modalHeader" ]} />} 
                        footer = {
                            <div>
                                <Uu5Forms.SubmitButton />
                            </div>
                        }>
                        <Uu5Forms.FormText name = "name" />
                    </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>

            </div>
        )
    };

export default ListView;