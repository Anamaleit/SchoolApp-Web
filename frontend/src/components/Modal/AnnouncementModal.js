import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAnnouncementsContext } from '../../hooks/useAnnouncementsContext'

function AnnouncementModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { dispatch } = useAnnouncementsContext()
    const [classes, setClasses] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const announcement = {classes, title, description}

        const response = await fetch('/api/announcements', {
            method: 'POST',
            body: JSON.stringify(announcement),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }

        if(response.ok) {
            setClasses('')
            setTitle('')
            setDescription('')
            setError(null)
            console.log('new announcement added', json)
            dispatch({type: 'CREATE_ANNOUNCEMENT', payload: json})
        }
    }

    return (
        <>
        <button className="announcement-button" onClick={handleShow}> Create a new announcement
        </button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create a new announcement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="create" onSubmit={handleSubmit}>
                    <div className="class-input">
                        Kelas mana yang dapat melihat pengumuman ini?
                        <input type="text"
                            onChange={(e) => setClasses(e.target.value)}
                            value={classes}
                        />
                    </div> 
                    <div className="title-input">
                        Header
                        <input type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className="desc-input">
                        Body
                        <input type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>

                    <button>Add Announcement</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AnnouncementModal