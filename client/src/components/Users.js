import React, {useEffect, useState} from "react";
import TableList from "./Table";
import axios from 'axios';
import {useLocalStorage} from "../hooks/useLocalStorage";
import Modal from "./Modal";

const Users = () => {
    const [usersData, setUsers] = useLocalStorage('users', null);
    const [groupData, setGroups] = useLocalStorage('groups', null);
    const [validation, setValid] = useState({valid: true, message: ''});
    const [castFunc, setFunc] = useState('create');
    const [modal, setStatus] = useState(true);
    const [errorDeleteMessage, setErrorDeleteMessage] = useState({status: false, message: null});
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
    const editUser = async () => {

        const username = document.getElementById('name').value;
        const userGroup = updateGroup();
        try {
            const res = await axios({
                url: `http://localhost:8080/api/users/update/${castFunc.id}`,
                method: 'Patch',
                data: {
                    username,
                    group: userGroup
                }
            })
            getUsers();
            setStatus(true)
        } catch (err) {
            setValid({valid: false, message: JSON.parse(err.request.response).message})
        }
    }
    const updateGroup = () => {
        let select = document.getElementById('group');
        let option = select.options[select.selectedIndex].value;
        return option === 'Select group' ? null : option;
    }
    const createUser = async (group = null) => {

        const username = document.getElementById('name').value;
        const userGroup = updateGroup();
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/users',
                data: {
                    username,
                    group: userGroup
                }
            });
            getUsers();
            setStatus(true)
            setValid({valid: true, message: ''})
        } catch (err) {
            setValid({valid: false, message: JSON.parse(err.request.response).message})
        }
    }
    const deleteData = async (id) => {
       try{
           await axios({
               url: `http://localhost:8080/api/users/delete/${id}`,
               method: 'DELETE'
           })
           getUsers()
           setErrorDeleteMessage( {status: true, message: 'User was deleted successfully'})
           setTimeout(() => {
               setErrorDeleteMessage( {status: false, message: null})
           },2000)
       } catch (err) {
           console.log(JSON.parse(err.request.response).message)
       }
    }
    const castFunction = () => {
        if (castFunc.type === 'create'){
            return createUser();
        }
        if (castFunc.type === 'edit'){
            return editUser();
        }
    }
    useEffect(() => {
        if (!usersData) {
            getUsers()
        }
        if (!groupData) {
            getGroups()
        }
    }, [usersData])

    return (
        <div>
            <div className={`alert alert-success ${errorDeleteMessage.status ? 'd-block' : 'd-none'}`}>
                {errorDeleteMessage.message}
            </div>
            <Modal  textButton='Add User' groupsData={ groupData ?  groupData.data.data : 'There are no groups. Please go and add some more'} editData={castFunc}  setFuncData={setFuncData} updateGroup={updateGroup} customFunction={castFunction} error={validation} onChange={onChange} statusModal={modal}/>
            <TableList  setFuncData={setFuncData}  data={usersData ? usersData.data.data : 'There are no users. Please go and add some more'}/>
        </div>
    )
}

export default Users;