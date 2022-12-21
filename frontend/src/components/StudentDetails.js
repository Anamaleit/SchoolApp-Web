import StudentModal from "./Modal/StudentModal";

const StudentDetails = ({ student,month }) => {
    
    return (
        <div className="status-pay-table">
            <div className="num">
                <span>{student.num}</span>
            </div>
            <div className="name">
                <span>{student.name}</span>
            </div>
            <div className="action">
                <StudentModal student={student} month={month} />
            </div>
        </div>
    )
}

export default StudentDetails