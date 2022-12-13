import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const Keterangan = () => {
    const [students, setStudents] = useState(null)
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
                setStudents(json)
            }

        }

        if (user) {
            fetchStudents()
        }
    }, [user])

    return (
        <div className="container">
            <div className="keterangan">
                <h2>Keterangan</h2>
                <div className="content">
                    {students && students.map((student) => (
                        <p key={student._id}>{student.num}{student.name}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Keterangan