import { useState, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Item from "./item";
import Config from "../config/config";
import { INITIAL_NAME } from "./constants";
import { INITIAL_SHOPPING_LIST } from "./constants";

function ShoppingList ({ currentUserRole }) { 
    const [shoppingList, setShoppingList] = useState ( INITIAL_SHOPPING_LIST );
    const [modalOpen, setModalOpen] = useState ( false );
    const [modal1Open, setModal1Open] = useState ( false );
    const [editHeader, setEditHeader] = useState( INITIAL_NAME ); 
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
                header = { <span style = {{ color: "#000099" }}>{ editHeader }</span> }
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
                        colorScheme="blue" significance="distinct" >+ Přidat položku
                    </Uu5Elements.Button>

                    <Uu5Elements.Button 
                        onClick= { () => setShowAll( !showAll ) } 
                        className = {Config.Css.css ({ flex: 1 })} 
                        colorScheme="blue" significance="distinct" >{ showAll ? "Pouze nedokončené položky" : "Všechny položky"}
                    </Uu5Elements.Button>
                </div>

                <Uu5Forms.Form.Provider key = { modal1Open } onSubmit = { editHeader ? handleEditHeader : handleSubmit }>
                    <Uu5Elements.Modal
                        open = { modal1Open }
                        onClose = { () => setModal1Open ( false ) }
                        header = "Změna nadpisu"
                        footer = {
                            <div>
                                <Uu5Forms.SubmitButton />
                            </div>
                        }>
                        { editHeader ? (
                        <Uu5Forms.FormText name = "name" value = { editHeader } placeholder = "Nový nadpis...." />
                        ) : (
                        <Uu5Forms.FormText name = "name" placeholder = "Nový nadpis...." />
                        )}
                    </Uu5Elements.Modal>
                </Uu5Forms.Form.Provider>

                <Uu5Forms.Form.Provider key = { modalOpen } onSubmit = { handleSubmit }>
                    <Uu5Elements.Modal open = { modalOpen } onClose = { () => setModalOpen ( false )} header = "Přidej položku"
                        footer = {
                            <div>
                                <Uu5Forms.SubmitButton />
                            </div>
                        }>
                        <Uu5Forms.FormText name = "name" placeholder = "Nová položka...." />
                    </Uu5Elements.Modal>
                </Uu5Forms.Form.Provider>
            </Uu5Elements.Block>
        </div>
    )
}

export default ShoppingList;