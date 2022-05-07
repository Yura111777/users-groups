import React from "react";


const TableList = (props) => {
    const editUser = (data)=> {
        document.getElementById('name').value = data.name;
        document.getElementById('group').value = data.group ? data.group._id :'Select group';
        props.setFuncData(data);
    }
    const editGroup = (data)=> {
        document.getElementById('name').value = data.name;
        document.getElementById('description').value = data.description;
        props.setFuncData(data);
    }
    const deleteData = (data) => {
        props.setFuncData(data)
    }
    const tr = ()=> {
        if(props.data.users !== undefined){
            if(props.data.users.length){
                return  props.data.users.map((el,i) => {
                    return (
                        <tr key={el._id}>
                            <td>{i+1}</td>
                            <td>{el.username}</td>
                            <td>{el.group !== null ? el.group.name : ''}</td>
                            <td className='text-end'>
                                <button className='btn btn-primary mx-3' onClick={()=> editUser({id: el._id, name: el.username, group: el.group, type: 'edit'})} >Edit</button>
                                <button className='btn btn-danger' onClick={()=> deleteData({id: el._id, type: 'delete'})} >Delete</button>
                            </td>
                        </tr>
                    )
                })
            }  else {
                return (
                    <tr>
                        <td className='text-center' colSpan='3'>There are no users. Please go and add some more</td>
                    </tr>
                )
            }
        }
        if(props.data.groups !== undefined ){
            if(props.data.groups.length){
                return  props.data.groups.map((el,i) => {
                    return (
                        <tr key={el._id}>
                            <td>{i+1}</td>
                            <td>{el.name}</td>
                            <td>{el.description}</td>
                            <td className='text-end'>
                                <button className='btn btn-primary mx-3' onClick={()=> editGroup({id: el._id, name: el.name, description: el.description, type: 'edit'})}>Edit</button>
                                <button className='btn btn-danger' onClick={()=> deleteData({id: el._id, type: 'delete'})}>Delete</button>
                            </td>
                        </tr>
                    )
                })
            } else {
                return (
                    <tr>
                        <td className='text-center' colSpan='3'>There are no groups. Please go and add some more</td>
                    </tr>
                )
            }

        }  else {
            return (
                <tr>
                    <td className='text-center' colSpan='3'>{props.data}</td>
                </tr>
            )
        }
    }
    return (
        <div>
            <table className='table'>
                <thead>
                { props.data.users ?
                    <tr>
                        <th>ID</th>
                        <th>User name</th>
                        <th>Group</th>
                        <th className='text-end'>Actions</th>
                    </tr> :
                    <tr>
                        <th>ID</th>
                        <th>Group name</th>
                        <th>Group description</th>
                        <th className='text-end'>Actions</th>
                    </tr>
                }
                </thead>
                <tbody>
                {tr()}
                </tbody>
            </table>
        </div>
    )
}

export default TableList;