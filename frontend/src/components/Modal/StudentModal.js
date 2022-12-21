import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StudentModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [month] = useState(props.student.paidMonths)


    return (
        <>
            <button className="view" onClick={handleShow}> View</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="view-status-pay">
                    <span style={{fontWeight: '700'}}>{props.student.name}</span>
                    <span 
                        style={{
                            display: 'block',
                            marginTop: '20px',
                            textAlign: 'justify'
                    }}>{month}</span>
                </div>
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

export default StudentModal