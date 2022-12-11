import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAnnouncementsContext } from '../../hooks/useAnnouncementsContext'

function AnnouncementModal(props) {
    
    // Handle props.
    let dispatchType;
    let dispatchMessage;
    let formTitle;
    let formFinishButtonText;
    let buttonTitle;
    let createMode;
    let updateMode;
    switch (props.mode){
        default:
        case 'create':
            dispatchType = 'CREATE_ANNOUNCEMENT';
            dispatchMessage = 'new announcement added';
            formTitle = 'Create a new announcement';
            formFinishButtonText = 'Add Announcement';
            buttonTitle = 'Create a new announcement';
            createMode = true;
            updateMode = false;
            break;
        case 'update':
            dispatchType = 'UPDATE_ANNOUNCEMENT';
            dispatchMessage = 'announcement updated';
            formTitle = 'Edit an announcement';
            formFinishButtonText = 'Update Announcement';
            buttonTitle = 'Edit';
            createMode = false;
            updateMode = true;
            break;
    }
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { dispatch } = useAnnouncementsContext()
    const [classes, setClasses] = useState(updateMode?props.announcement.classes:'')
    const [title, setTitle] = useState(updateMode?props.announcement.title:'')
    const [description, setDescription] = useState(updateMode?props.announcement.description:'')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const announcement = {classes, title, description}

        let response;
        if (createMode){
            response = await fetch('/api/announcements', {
                method: 'POST',
                body: JSON.stringify(announcement),
                headers: {
                    'Content-type': 'application/json'
                }
            })
        }
        else if (updateMode){
            announcement._id = props.announcement._id;
            response = await fetch('/api/announcements/'+announcement._id, {
                method: 'PATCH',
                body: JSON.stringify(announcement),
                headers: {
                    'Content-type': 'application/json'
                }
            })
        }
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            // Blank out fields after submission only if in create mode.
            if (createMode){
                setClasses('')
                setTitle('')
                setDescription('')
            }
            setError(null)
            setEmptyFields([])
            console.log(dispatchMessage, dispatchType, json)
            dispatch({type: dispatchType, payload: json})
        }
    }

    setTimeout(() => {
        setError(!null)
    }, 3000);

    return (
        <>
        <button className="announcement-button" onClick={handleShow}> {buttonTitle}
        </button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{formTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="create" onSubmit={handleSubmit}>
                    <div className="class-input">Kelas mana yang dapat melihat pengumuman ini?</div>
                    <input type="text"
                        onChange={(e) => setClasses(e.target.value)}
                        value={classes}
                        className={emptyFields.includes('classes') ? 'error' : ''}
                    />
                    <div className="form-outline">
                        <label className="form-label">Header</label>
                        <input 
                            className={emptyFields.includes('title') ? 'error' : ''}
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Body</label>
                        <textarea
                            className={emptyFields.includes('description') ? 'error' : ''}
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            rows="3"
                        />
                    </div>

                    <button>{formFinishButtonText}</button>
                    {error && <div className="error">{error}</div>}
                </form>
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

export default AnnouncementModal