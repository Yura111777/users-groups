import React, {useEffect, useState} from "react";

const Modal = (props) => {
    const [activeModal, setModal] = useState(props.statusModal)
    const [errorStatus, setStatus] = useState(props.error.valid)
    const option = () => {
        if(props.groupsData.groups !== undefined){
            return props.groupsData.groups.map(el => {
                return(
                    <option key={el._id} value={el._id}>{el.name}</option>
                )
            })
        }
    }
    useEffect(() => {
        setStatus(props.error.valid)
    }, [props.error.valid])

    useEffect(() => {
        console.log(props.statusModal)
            setModal(props.statusModal)
    }, [props.statusModal])

    const submitForm = (e) => {
        e.preventDefault();
        props.customFunction();
    }

    return (
        <div>
            <div className="row justify-content-end">
                <div className="col-auto">
                    <button className="btn  btn-success" onClick={()=> {
                        setModal(!activeModal);
                        props.setFuncData({type: 'create'})
                    }}>
                        Add User
                    </button>
                </div>
            </div>
            <div className={`bg-modal  ${activeModal ? 'not-active': ''}`}>
                <form className='modal-form' onSubmit={submitForm}>
                            <span className="close-button" onClick={()=> {
                                setModal(!activeModal);
                                props.onChange(false);

                            }}>
                                <ion-icon name="close-outline"></ion-icon>
                            </span>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <label htmlFor="name">User name: <span className="required">*</span></label>
                            <div className="form-group">
                                <input type='text' defaultValue={props.editData.type === 'edit'? props.editData.name : ''}   className='form-control' id='name'/>
                                <span className={`validation ${errorStatus  ? 'd-none': 'd-block'}`}>{props.error.message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <label htmlFor="group">User group: <span className="optional">(optional) </span></label>
                            <div className="form-group">
                                <select name="group" id="group" className='form-select' onChange={props.updateGroup}
                                        placeholder='Select group'>
                                    <option value="Select group">Select group</option>
                                    {option()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="form-group">
                                <button className="btn  btn-primary" type='submit'>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Modal;