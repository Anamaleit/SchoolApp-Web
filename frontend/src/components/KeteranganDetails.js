import KeteranganModal from "./Modal/KeteranganModal"

const KeteranganDetails = ({ student }) => {
    
    return (
        <div className="keterangan-table">
            <span>{student.num}</span>
            <span>{student.name}</span>
            <KeteranganModal mode="update" student={student} className="keterangan-update-button"/>
            <KeteranganModal mode="view" student={student} className="keterangan-view-button"/>
        </div>
    )
}

export default KeteranganDetails