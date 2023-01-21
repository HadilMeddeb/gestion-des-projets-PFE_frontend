import axios from "axios";
import React, { useState } from "react";
import {Modal} from "react-bootstrap";

function AddRelvetModal(props) {
    const [annee, setAnnee] = useState();
    const [mention, setMention] = useState("");
    const [file, setFile] = useState({});
    
    const toggle= props.toggle;
    const id= props.id;
    const open= props.open;
    const setRelvet= props.setRelvet;

    return (
        <div>
            


            
        </div>
    )
}

export default AddRelvetModal
