import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useStudentsContext } from '../../hooks/useStudentsContext';

function KeteranganModal(props) {
    
    //handle props
    let dispatchType;
    let dispatchMessage;
    let formTitle;
    let formFinishButtonText;
    let buttonTitle;
    let updateMode;
    let viewMode;
    let buttonType;

    switch (props.mode) {
        default:
            case 'update':
                dispatchType = 'UPDATE_STUDENT';
                dispatchMessage = 'student updated';
                formTitle = 'Edit';
                formFinishButtonText = 'Save';
                buttonTitle = 'Edit';
                updateMode = true;
                viewMode = false;
                buttonType = 'keterangan-edit-button';
                break;
            case 'view':
                dispatchType = 'SET_STUDENTS';
                dispatchMessage = 'view student';
                formTitle = 'View';
                formFinishButtonText = 'Close';
                buttonTitle = 'View';
                updateMode = false;
                viewMode = true;
                buttonType = 'keterangan-view-button';
                break;
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { dispatch } = useStudentsContext()
    const { user } = useAuthContext()

    const [name] = useState(updateMode?props.student.name:'')
    const [ket, setKet] = useState(updateMode?props.student.ket:'')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
          }

        const student = {name, ket}

        let response;
        if (updateMode){
            student._id = props.student._id;
            response = await fetch('/api/students/'+student._id, {
                method: 'PATCH',
                body: JSON.stringify(student),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
        }
        else if (viewMode){
            response = await fetch('/api/students/'+student._id, {
                method: 'GET',
                body: JSON.stringify(student),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
        }
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            setError(null)
            setEmptyFields([])
            console.log(dispatchMessage, dispatchType, json)
            dispatch({type: dispatchType, payload: json})
        }
    }

    const update = 
        <form className={buttonType} onSubmit={handleSubmit}>
        <span>{props.student.name}</span>
            <input type="text"
            onChange={(e) => setKet(e.target.value)}
            value={ket}
            className={emptyFields.includes('ket') ? 'error' : ''}
        />
        <button>{formFinishButtonText}</button>
        {error && <div className="error">{error}</div>}
        </form>

    const view = 
        <div className={buttonType}>
            <span>{props.student.name}</span>
            <span>{props.student.ket}</span>
        </div>

    return (
        <>
            <button className={buttonType} onClick={handleShow}> {buttonTitle}</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{formTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.mode === 'update' ? update : view}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default KeteranganModal