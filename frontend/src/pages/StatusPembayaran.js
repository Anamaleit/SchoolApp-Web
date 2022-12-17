import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useStudentsContext } from "../hooks/useStudentsContext"

import StatusPayDetails from "../components/StatusPayDetails"

const StatusPayment = () => {
    const {students, dispatch} = useStudentsContext()
    const {user} = useAuthContext()

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
                    <select name="month" id="monthSelect" style={{marginLeft: '20px'}}>
                        <option value="">--Month--</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <div className="titles" style={{marginTop: '20px'}}>
                        <span>Absen</span>
                        <span>Students Name</span>
                        <span style={{paddingRight: '130px'}}>Action</span>
                    </div>
                    {students && students.map((student) => (
                        <StatusPayDetails key={student._id} student={student} /> 
                    ))}
                    <button className="status-pay-save">Save</button>
                </div>
            </div>
        </div>
    )
}

export default StatusPayment