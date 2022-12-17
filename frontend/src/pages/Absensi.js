import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useStudentsContext } from "../hooks/useStudentsContext"

import AbsensiDetails from "../components/AbsensiDetails"

const Absensi = () => {
    const {students, dispatch} = useStudentsContext()
    const {user} = useAuthContext()

    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date = today.setDate(today.getDate() + numberOfDaysToAdd); 
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd

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
            <div className="absensi">
                <h2>Absensi</h2>
                <div className="content">
                    <input type="date" id="dateRequired" name="dataRequired" style={{marginLeft: '20px'}} defaultValue={defaultValue}/>
                    <div className="titles" style={{marginTop: '20px'}}>
                        <span>Absen</span>
                        <span>Students Name</span>
                        <span style={{paddingRight: '70px'}}>Action</span>
                    </div>
                    {students && students.map((student) => (
                        <AbsensiDetails key={student._id} student={student} />
                    ))}
                    <button className="absensi-save" style={{marginTop: '20px', marginLeft: '45%'}}>Save</button>
                    <button className="absensi-view" style={{marginLeft: '10px'}}>View</button>
                </div>
            </div>
        </div>
    )
}

export default Absensi