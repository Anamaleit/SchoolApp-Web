import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useStudentsContext } from "../hooks/useStudentsContext"

import KeteranganDetails from "../components/KeteranganDetails"

const Keterangan = () => {
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
            <div className="keterangan">
                <h2>Keterangan</h2>
                <div className="content">
                    {students && students.map((student) => (
                        <KeteranganDetails key={student._id} student={student} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Keterangan