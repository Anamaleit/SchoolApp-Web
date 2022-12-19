import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAnnouncementsContext } from '../../hooks/useAnnouncementsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

function AnnouncementModal(props) {
    
    // Handle props.
    let dispatchType;
    let dispatchMessage;
    let formTitle;
    let formFinishButtonText;
    let buttonTitle;
    let createMode;
    let updateMode;
    let buttonType;
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
            buttonType= 'announcement-create-button';
            break;
        case 'update':
            dispatchType = 'UPDATE_ANNOUNCEMENT';
            dispatchMessage = 'announcement updated';
            formTitle = 'Edit an announcement';
            formFinishButtonText = 'Update Announcement';
            buttonTitle = 'Edit';
            createMode = false;
            updateMode = true;
            buttonType= 'announcement-update-button';
            break;
    }
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { dispatch } = useAnnouncementsContext()
    const { user } = useAuthContext()

    const [classes, setClasses] = useState(updateMode?props.announcement.classes:'')
    const [title, setTitle] = useState(updateMode?props.announcement.title:'')
    const [description, setDescription] = useState(updateMode?props.announcement.description:'')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
          }

        const announcement = {classes, title, description}

        let response;
        if (createMode){
            response = await fetch('/api/announcements', {
                method: 'POST',
                body: JSON.stringify(announcement),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
        }
        else if (updateMode){
            announcement._id = props.announcement._id;
            response = await fetch('/api/announcements/'+announcement._id, {
                method: 'PATCH',
                body: JSON.stringify(announcement),
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
            <button className={buttonType} onClick={handleShow}> {buttonTitle}</button>

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
                            list="dwarf-class" required
                            className={emptyFields.includes('classes') ? 'error' : ''}
                            multiple
                        />
                        <datalist id="dwarf-class">
                            <option value="All">All</option>
                            <option value="1A">1A</option>
                            <option value="1B">1B</option>
                            <option value="1C">1C</option>
                            <option value="1D">1D</option>
                            <option value="2A">2A</option>
                            <option value="2B">2B</option>
                            <option value="2C">2C</option>
                            <option value="2D">2D</option>
                            <option value="3A">3A</option>
                            <option value="3B">3B</option>
                            <option value="3C">3C</option>
                            <option value="3D">3D</option>
                            <option value="4A">4A</option>
                            <option value="4B">4B</option>
                            <option value="4C">4C</option>
                            <option value="4D">4D</option>
                            <option value="5A">5A</option>
                            <option value="5B">5B</option>
                            <option value="5C">5C</option>
                            <option value="5D">5D</option>
                            <option value="6A">6A</option>
                            <option value="6B">6B</option>
                            <option value="6C">6C</option>
                            <option value="6D">6D</option>
                        </datalist>
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