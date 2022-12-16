import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useStudentsContext } from "../hooks/useStudentsContext"

import NilaiDetails from "../components/NilaiDetails"

const Nilai = () => {
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
            <div className="nilai">
                <h2>Nilai</h2>
                <div className="content">
                    <div className="titles">
                        <span>Absen</span>
                        <span>Students Name</span>
                        <span style={{paddingRight: '70px'}}>Action</span>
                    </div>
                    {students && students.map((student) => (
                        <NilaiDetails key={student._id} student={student} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Nilai