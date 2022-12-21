import { useState } from 'react';
import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useStudentsContext } from "../hooks/useStudentsContext"

import StudentDetails from "../components/StudentDetails"

const Student = () => {
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
                        <StudentDetails key={month+student._id} student={student} month={month} /> 
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Student