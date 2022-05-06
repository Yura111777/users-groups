import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import TableList from "./Table";
import Modal from "./Modal";
import {useLocalStorage} from "../hooks/useLocalStorage";

const Groups = () => {
    const [groupData, setGroups] = useLocalStorage('groups');
    const [validation, setValid] = useState({valid: true, message: ''});
    const [castFunc, setFunc] = useState('create');
    const [modal, setStatus] = useState(true);
    const onChange = (status) => {
        setValid(status)
        setStatus(!status)
    }
    const setFuncData = (data) => {
        setStatus(false)
        setFunc(data);
    }
    const createGroup = ()=> {

    }
    const editGroup = ()=> {

    }
    const castFunction = () => {
        if (castFunc.type === 'create'){
            return createGroup();
        }
        if (castFunc.type === 'edit'){

            return editGroup();
        }
    }
    return (
        <div>
            <Modal editData={castFunc}  setFuncData={setFuncData}  customFunction={castFunction} error={validation} onChange={onChange} statusModal={modal}/>
            <TableList setFuncData={setFuncData}  data={groupData ? groupData.data.data : 'There are no groups. Please go and add some more'}/>
        </div>
    )
}

export default Groups;