import React, {useState} from "react";
import TableList from "./Table";
import Modal from "./Modal";
import {useLocalStorage} from "../hooks/useLocalStorage";
import axios from "axios";

const Groups = () => {
    const [groupData, setGroups] = useLocalStorage('groups');
    const [usersData, setUsers] = useLocalStorage('users');

    const [validation, setValid] = useState({valid: true, message: ''});
    const [castFunc, setFunc] = useState('create');
    const [errorDeleteMessage, setErrorDeleteMessage] = useState({status: false, message: null});
    const [modal, setStatus] = useState(true);

    const onChange = (status) => {
        setValid(status)
        setStatus(!status)
    }
    const setFuncData = (data) => {
        if(data.type !== 'delete') {
            setStatus(false)
            setFunc(data);
        }
        if(data.type === 'delete'){
            deleteData(data.id);
        }
    }
    const getUsers = async () => {
        try {
            const res = await axios({
                url: 'http://localhost:8080/api/users',
                method: 'GET'
            })
            setUsers(res)
        } catch (err) {
            console.log(err)
        }
    }
    const getGroups = async () => {
        try {
            const res = await axios({
                url: 'http://localhost:8080/api/groups',
                method: 'GET'
            })
            setGroups(res)
        } catch (err) {
            console.log(err)
        }
    }
    const createGroup = async (group = null) => {

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/groups',
                data: {
                    name,
                    description
                }
            });
            getGroups();
            setStatus(true)
            setValid({valid: true, message: ''})
        } catch (err) {
            setValid({valid: false, message: JSON.parse(err.request.response).message})
        }
    }

    const editGroup = async () => {

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        try {
            const res = await axios({
                url: `http://localhost:8080/api/groups/update/${castFunc.id}`,
                method: 'Patch',
                data: {
                    name,
                    description
                }
            })
            getGroups();
            getUsers();
            setStatus(true)
        } catch (err) {
            setValid({valid: true, message: JSON.parse(err.request.response).message})
        }
    }
    const deleteData = async (id) => {
        try{
            await axios({
                url: `http://localhost:${window.env.API_PORT}/api/groups/delete/${id}`,
                method: 'DELETE'
            })
            getGroups();
            setErrorDeleteMessage( {status: true, message: 'Goup was deleted successfully', class: 'alert-success'})
            setTimeout(() => {
                setErrorDeleteMessage( {status: false, message: null})
            },2000)
        } catch (err) {
            setErrorDeleteMessage( {status: true, message: JSON.parse(err.request.response).message, class: 'alert-danger'})
            setTimeout(() => {
                setErrorDeleteMessage( {status: false, message: null})
            },5000)
        }
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
            <div className={`alert ${errorDeleteMessage.class} ${errorDeleteMessage.status ? 'd-block' : 'd-none'}`}>
                {errorDeleteMessage.message}
            </div>
            <Modal textButton='Add Group' groupsData={false} editData={castFunc}  setFuncData={setFuncData}  customFunction={castFunction} error={validation} onChange={onChange} statusModal={modal}/>
            <TableList  setFuncData={setFuncData}   data={groupData ? groupData.data.data : 'There are no groups. Please go and add some more'}/>
        </div>
    )
}

export default Groups;