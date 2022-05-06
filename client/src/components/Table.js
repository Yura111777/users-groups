import React, {useEffect, useState} from "react";
import Modal from "./Modal";

const TableList = (props) => {
    const tr = ()=> {
        if(props.data.users !== undefined){
           return  props.data.users.map((el,i) => {
                return (
                    <tr key={el._id}>
                        <td>{i+1}</td>
                        <td>{el.username}</td>
                        <td>{el.group !== null ? el.group.name : ''}</td>
                        <td className='text-end'>
                            <button className='btn btn-primary mx-3' onClick={()=> props.setFuncData({id: el._id, name: el.username, group: el.group, type: 'edit'})} >Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td colSpan='3'>{props.data}</td>
                </tr>
            )
        }
    }
    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User name</th>
                        <th>Group</th>
                        <th className='text-end'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {tr()}
                </tbody>
            </table>
        </div>
    )
}

export default TableList;