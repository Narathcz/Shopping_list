import { useState, Utils, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Item from "./item";
import Config from "../config/config";
import { INITIAL_DATA } from "./constants";
import importLsi from "../lsi/import-lsi.js";


function ShoppingList ({ currentUserRole, indexNumber }) { 
    const [shoppingList, setShoppingList] = useState ( INITIAL_DATA[indexNumber]?.shoppingList || [] );
    const [modalOpen, setModalOpen] = useState ( false );
    const [modal1Open, setModal1Open] = useState ( false );
    const [editHeader, setEditHeader] = useState( INITIAL_DATA[indexNumber]?.name || [] ); 
    const [showAll, setShowAll] = useState( false );

    function handleDelete ( id ) {
        setShoppingList (([...actualShoppingList]) => {
            const index = actualShoppingList.findIndex (( item ) => item.id === id);
            actualShoppingList.splice ( index, 1 );
            return actualShoppingList;
        })
    }

    function handleSubmit ( e ) {
        const data = e.data.value;

        setShoppingList (([...actualShoppingList]) => {
            actualShoppingList.push ({ ...data, id: Utils.String.generateId() });
            return actualShoppingList;
        })
        setModalOpen ( false );
    }

    function handleEditHeader ( e ) {   
        const newHeader = e.data.value.name;
        setEditHeader ( newHeader ); 
        setModal1Open ( false );
    } 

    function handleStrikeText ( id ) {
        setShoppingList(( actualShoppingList ) => {
          const updatedList = actualShoppingList.map(( item ) => {
            if ( item.id === id ) {
              return { ...item, done: !item.done };
            }
            return item;
          });
          return updatedList;
        });
    }

    return (
        <div> 
            <Uu5Elements.Block 
                header = { <span style = {{ color: "#000099" }}>
                    <Uu5Elements.Text colorScheme = "building" significance = "common" >{ editHeader }</Uu5Elements.Text>                
                </span> }
                headerType = "title"
                actionList = {
                    currentUserRole ? [{ icon: "uugds-pencil", onClick: () => setModal1Open( true ) }] : []}
                className = { Config.Css.css ({ width: "500px", maxWidth: "100%" })}>
            
                <Uu5Elements.Grid>
                    { shoppingList.filter ( item => showAll || !item.done ).map ( ( item ) => ( 
                        <Item key = { item.id } { ...item } 
                            onDelete = { () => handleDelete ( item.id ) } 
                            onStrikeText = { () => handleStrikeText( item.id ) } /> 
                    ))}
                </Uu5Elements.Grid>

                <div style = {{ display: "flex", marginTop: "25px" }}>
                    <Uu5Elements.Button 
                        onClick= { () => setModalOpen ( true ) } 
                        className = { Config.Css.css ({ flex: 1, marginRight: "10px" })} 
                        colorScheme="building" significance="distinct" >
                            <Lsi import = { importLsi } path = {[ "ShoppingList", "addButton" ]} />
                    </Uu5Elements.Button>

                    <Uu5Elements.Button 
                        onClick= { () => setShowAll( !showAll ) } 
                        className = {Config.Css.css ({ flex: 1 })}  
                        colorScheme = "building" significance = "distinct" >
                            { showAll ? 
                            <Lsi import = { importLsi } path = {[ "ShoppingList", "allButton1" ]} /> 
                            : 
                            <Lsi import = { importLsi } path = {[ "ShoppingList", "allButton2" ]} />
                            }
                    </Uu5Elements.Button>
                </div>

                <Uu5Forms.Form.Provider key = { modal1Open } onSubmit = { editHeader ? handleEditHeader : handleSubmit }>
                    <Uu5Elements.Modal
                        open = { modal1Open }
                        onClose = { () => setModal1Open ( false ) }
                        header = {<Lsi import = { importLsi } path = {[ "ShoppingList", "titleChange" ]} />}
                        footer = {
                            <div>
                                <Uu5Forms.SubmitButton />
                            </div>
                        }>
                        { editHeader ? (
                        <Uu5Forms.FormText name = "name" value = { editHeader } />
                        ) : (
                        <Uu5Forms.FormText name = "name" placeholder = "Nový nadpis...." />
                        )}
                    </Uu5Elements.Modal>
                </Uu5Forms.Form.Provider>

                <Uu5Forms.Form.Provider key = { modalOpen } onSubmit = { handleSubmit }>
                    <Uu5Elements.Modal open = { modalOpen } onClose = { () => setModalOpen ( false )} 
                        header = {<Lsi import = { importLsi } path = {[ "ShoppingList", "addItemModal" ]} />}
                        footer = {
                            <div>
                                <Uu5Forms.SubmitButton />
                            </div>
                        }>
                        <Uu5Forms.FormText name = "name" />
                    </Uu5Elements.Modal>
                </Uu5Forms.Form.Provider>
            </Uu5Elements.Block>
        </div>
    )
}

export default ShoppingList;