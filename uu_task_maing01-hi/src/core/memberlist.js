import { useState, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config";
import { INITIAL_DATA } from "./constants";

function MemberList ({ currentUserRole, selectedMember, indexNumber }) { 

    const [memberList, setMemberList] = useState (INITIAL_DATA[indexNumber]?.memberList || []);
    const [modal2Open, setModal2Open] = useState (false);
    const [showMemberList, setShowMemberList] = useState(false);

    function handleMemberDelete ( id ) {
        setMemberList (([...actualMemberList]) => { 
            const index = actualMemberList.findIndex (( item ) => item.id === id);
            actualMemberList.splice ( index, 1 );
            return actualMemberList;
        })
    }

    function handleMemberSubmit ( e ) {
        const data = e.data.value;

        setMemberList (([...actualMemberList]) => {
            actualMemberList.push ({ ...data, id: Utils.String.generateId () });
            return actualMemberList;
        })
        setModal2Open ( false );
    }

    return (
        <div>
            <Uu5Elements.Button
                    onClick={() => setShowMemberList( !showMemberList )}
                    className={Config.Css.css({
                    width: "500px",
                    maxWidth: "100%",
                    marginTop: "20px",
                    marginBottom: "20px"
                    })}
                    colorScheme="blue"
                    significance="distinct">
                    {showMemberList ? "Skrýt seznam členů" : "Zobrazit seznam členů"}
            </Uu5Elements.Button>
            
            {showMemberList && (
            <Uu5Elements.Block 
                    header = { <span style={{ color: "#000099" }}>{ showMemberList && "Seznam členů:" }</span> }
                    headerType = "title" 
                    className = { Config.Css.css ({ width: "500px", maxWidth: "100%" })}>
                
                <Uu5Elements.Grid>
                    { memberList.map ( ( item ) => (
                        <Uu5Elements.ListItem
                            key={item.id}
                            actionList={
                            currentUserRole || selectedMember === item.id ? [  
                                { icon: "uugds-close", colorScheme: "negative", onClick: () => handleMemberDelete( item.id ) },
                              ] : [""] 
                            }
                            colorScheme="blue" significance="common">
                            {item.name} {item.surname} {item.owner && "(vlastník)"}
                        </Uu5Elements.ListItem>
                    ))}
                </Uu5Elements.Grid>

                { currentUserRole  && ( 
                <Uu5Elements.Button 
                    onClick= { () => setModal2Open ( true )} 
                    className = { Config.Css.css ({ width: "500px", maxWidth: "100%", marginTop: "25px"})} 
                    colorScheme = "blue" significance = "distinct" >+ Přidat člena
                </Uu5Elements.Button>)} 

                <Uu5Forms.Form.Provider key = { modal2Open } onSubmit = { handleMemberSubmit }>
                    <Uu5Elements.Modal 
                        open = { modal2Open } 
                        onClose = { () => setModal2Open ( false )} 
                        header = "Přidej člena seznamu"
                        footer = {
                            <div>
                                <Uu5Forms.SubmitButton />
                            </div>
                        }>
                        <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                            <Uu5Forms.FormText name = "name" placeholder = "Jméno..." style={{ width: "270px" }} />
                            <Uu5Forms.FormText name = "surname" placeholder = "Přijmení..." style={{ width: "270px" }} />
                        </div>
                    </Uu5Elements.Modal>
                </Uu5Forms.Form.Provider>
            </Uu5Elements.Block>
            )}
        </div>
    )
}

export default MemberList;