import KeteranganModal from "./Modal/KeteranganModal"

const KeteranganDetails = ({ student }) => {
    
    return (
        <div className="keterangan-table">
            <div className="num">
                <span>{student.num}</span>
            </div>
            <div className="name">
                <span>{student.name}</span>
            </div>
            <div className="action">
                <KeteranganModal mode="view" student={student}/>
                <KeteranganModal mode="update" student={student}/>
            </div>
        </div>
    )
}

export default KeteranganDetails