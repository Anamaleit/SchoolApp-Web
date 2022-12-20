import { useState } from 'react';
import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useStudentsContext } from "../hooks/useStudentsContext"

import StatusPayDetails from "../components/StatusPayDetails"

const StatusPayment = () => {
    const {students, dispatch} = useStudentsContext()
    const {user} = useAuthContext()

    const defaultValue = new Date().toISOString().split('T')[0].substr(0,'yyyy-mm'.length)

    const [month, setMonth] = useState(defaultValue)

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch('/api/students', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            })
            const json = await response.json()


            if (response.ok) {
                dispatch({type: 'SET_STUDENTS', payload: json})
            }

        }

        if (user) {
            fetchStudents()
        }
    }, [dispatch, user])

    const save = async (e) => {
        e.preventDefault()

        const date = month;//document.querySelector('#monthSelect').value;
        
        const elements = [...document.querySelectorAll('select[data-info=\'paidMonths\']')];
        const responses = await Promise.all(elements.map(async element => {
            const paid = (element.value === 'true');
            const _id = element.getAttribute('data-student-id');
            const student = (paid)
                ? {
                    $addToSet: { paidMonths: date },
                }
                : {
                    $pull: { paidMonths: date },
                };
            console.log(student);
            const response = await fetch('/api/students/'+_id, {
                method: 'PATCH',
                body: JSON.stringify(student),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            return response;
        }));
        const okArray = await Promise.all(responses.map(async response => {
            const json = await response.json();
            if(!response.ok) {
                console.warn(json);
            }
            return response.ok;
        }));
        const allOk = okArray.reduce((p,v)=>p&&v,true);
        console.log(allOk);
    };

    return (
        <div className="container">
            <div className="status-pay">
                <h2>Status Pembayaran</h2>
                <div className="content">
                    <input type="month" id="monthSelect" min="2020-01" max="2099-12" onChange={(e) => setMonth(e.target.value)} defaultValue={defaultValue} style={{marginLeft: '10px'}}/>
                    <div className="titles" style={{marginTop: '20px'}}>
                        <span>Absen</span>
                        <span>Students Name</span>
                        <span style={{paddingRight: '130px'}}>Action</span>
                    </div>
                    {students && students.map((student) => (
                        <StatusPayDetails key={month+student._id} student={student} month={month} /> 
                    ))}
                    <button className="status-pay-save" onClick={save}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default StatusPayment