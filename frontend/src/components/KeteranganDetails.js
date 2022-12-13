const KeteranganDetails = ({ student }) => {
    
    return (
        <div className="keterangan-table">
            <span>{student.num}</span>
            <span>{student.name}</span>
        </div>
    )
}