import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useStudentsContext } from '../../hooks/useStudentsContext';

function NilaiModal(props) {

    //handle props
    let dispatchType;
    let dispatchMessage;
    let formTitle;
    let formFinishButtonText;
    let buttonTitle;
    let updateMode;
    let viewMode;
    let buttonType;
    let bodyType;

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
                buttonType = 'nilai-edit-button';
                bodyType = 'nilai-edit-body'
                break;
            case 'view':
                dispatchType = 'SET_STUDENTS';
                dispatchMessage = 'view student';
                formTitle = 'View';
                formFinishButtonText = 'Close';
                buttonTitle = 'View';
                updateMode = false;
                viewMode = true;
                buttonType = 'nilai-view-button';
                bodyType = 'nilai-view-body'
                break;
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { dispatch } = useStudentsContext()
    const { user } = useAuthContext()

    const [name] = useState(updateMode?props.student.name:'')
    const [pr1, setPr1] = useState(updateMode?JSON.stringify(props.student.grades.agama.pr.pr1):'')
    const [pr2, setPr2] = useState(updateMode?JSON.stringify(props.student.grades.agama.pr.pr2):'')
    const [ph1_1, setPh1_1] = useState(updateMode?JSON.stringify(props.student.grades.agama.ph1.ph1):'')
    const [ph2_1, setPh2_1] = useState(updateMode?JSON.stringify(props.student.grades.agama.ph1.ph2):'')
    const [ph1_r, setPh1_r] = useState(updateMode?JSON.stringify(props.student.grades.agama.ph1.r):'')
    const [ph1_2, setPh1_2] = useState(updateMode?JSON.stringify(props.student.grades.agama.ph2.ph1):'')
    const [ph2_2, setPh2_2] = useState(updateMode?JSON.stringify(props.student.grades.agama.ph2.ph2):'')
    const [ps1, setPs1] = useState(updateMode?JSON.stringify(props.student.grades.agama.ps.ps1):'')
    const [ps2, setPs2] = useState(updateMode?JSON.stringify(props.student.grades.agama.ps.ps2):'')
    const [ps3, setPs3] = useState(updateMode?JSON.stringify(props.student.grades.agama.ps.ps3):'')
    const [nrb, setNrb] = useState(updateMode?JSON.stringify(props.student.grades.agama.nrb):'')
    const [pts_p, setPts_p] = useState(updateMode?JSON.stringify(props.student.grades.agama.pts.p):'')
    const [pts_r, setPts_r] = useState(updateMode?JSON.stringify(props.student.grades.agama.pts.r):'')
    const [pts_a, setPts_a] = useState(updateMode?JSON.stringify(props.student.grades.agama.pts.a):'')
    const [rph, setRph] = useState(updateMode?JSON.stringify(props.student.grades.agama.rph):'')

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
          }

        const student = {name, pr1, pr2, ph1_1, ph1_2, ph2_1, ph1_r, ph2_2, ps1, ps2, ps3, nrb, pts_p, pts_r, pts_a, rph}

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
        }

        if(response.ok) {
            setError(null)
            console.log(dispatchMessage, dispatchType, json)
            dispatch({type: dispatchType, payload: json})
        }
    }

    const update = 
        <form className={bodyType} onSubmit={handleSubmit}>
            <span style={{fontWeight: '700'}}>{props.student.name}</span>
            <div className="nilai-pr">Nilai PR
                <input
                type="text"
                onChange={(e) => setPr1(e.target.value)}
                value={pr1}
                style={{marginTop: '20px'}}
                />
                <input
                type="text"
                onChange={(e) => setPr2(e.target.value)}
                value={pr2}
                style={{marginTop: '20px'}}
                />
            </div>
            <input
            type="text"
            onChange={(e) => setPh1_1(e.target.value)}
            value={ph1_1}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPh2_1(e.target.value)}
            value={ph2_1}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPh1_r(e.target.value)}
            value={ph1_r}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPh1_2(e.target.value)}
            value={ph1_2}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPh2_2(e.target.value)}
            value={ph2_2}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPs1(e.target.value)}
            value={ps1}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPs2(e.target.value)}
            value={ps2}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPs3(e.target.value)}
            value={ps3}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setNrb(e.target.value)}
            value={nrb}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPts_p(e.target.value)}
            value={pts_p}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPts_r(e.target.value)}
            value={pts_r}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setPts_a(e.target.value)}
            value={pts_a}
            style={{marginTop: '20px'}}
            />
            <input
            type="text"
            onChange={(e) => setRph(e.target.value)}
            value={rph}
            style={{marginTop: '20px'}}
            />
            <button style={{marginTop: '20px'}}>{formFinishButtonText}</button>
            {error && <div className="error">{error}</div>}
        </form>

    const view = 
        <div className={bodyType}>
            <span style={{fontWeight: '700'}}>{props.student.name}</span>
            <div className="nilai-pr" style={{display: 'block',marginTop: '20px',textAlign: 'justify'}}>Nilai PR:
                <span style={{display: 'block'}}>PR1: {props.student.grades.agama.pr.pr1}</span>
                <span>PR2: {props.student.grades.agama.pr.pr2}</span>
            </div>
            <div className="nilai-ps" style={{marginLeft: '50%', marginTop: '-75px'}}>Nilai PS:
                <span style={{display: 'block'}}>PS1: {props.student.grades.agama.ps.ps1}</span>
                <span style={{display: 'block'}}>PS2: {props.student.grades.agama.ps.ps2}</span>
                <span>PS3: {props.student.grades.agama.ps.ps3}</span>
            </div>
            <div className="nilai-ph1" style={{marginTop: '20px'}}>Penilaian Harian 1
                <span style={{display: 'block'}}>PH: {props.student.grades.agama.ph1.ph1}</span>
                <span style={{display: 'block'}}>R: {props.student.grades.agama.ph1.r}</span>
                <span>PH 1: {props.student.grades.agama.ph1.ph2}</span>
            </div>
            <div className="nilai-h2" style={{marginLeft: '50%', marginTop: '-97px'}}>Penilaian Harian 2
                <span style={{display: 'block'}}>PH: {props.student.grades.agama.ph2.ph1}</span>
                <span style={{display: 'block'}}>R: {props.student.grades.agama.ph2.r}</span>
                <span>PH 1: {props.student.grades.agama.ph2.ph2}</span>
            </div>
            <div className='nilai-rph' style={{marginTop: '20px'}}>Rata-rata nilai Harian
                <span>: {props.student.grades.agama.rph}</span>
            </div>
            <div className="nilai-pts">Nilai Tengah Semester
                <span style={{display: 'block'}}>P: {props.student.grades.agama.pts.p}</span>
                <span style={{display: 'block'}}>R: {props.student.grades.agama.pts.r}</span>
                <span>A: {props.student.grades.agama.pts.a}</span>
            </div>
            <div className='nilai-rph'>Rata-rata nilai Keseluruhan
                <span>: {props.student.grades.agama.nrb}</span>
            </div>
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

export default NilaiModal