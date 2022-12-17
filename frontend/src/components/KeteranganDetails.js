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
                <KeteranganModal mode="update" student={student} className="keterangan-update-button"/>
                <KeteranganModal mode="view" student={student} className="keterangan-view-button"/>
            </div>
        </div>
    )
}

export default KeteranganDetails