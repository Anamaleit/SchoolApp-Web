const AbsensiDetails = ({ student }) => {
    return (
        <div className="absensi-table">
            <div className="num">
                <span>{student.num}</span>
            </div>
            <div className="name">
                <span>{student.name}</span>
            </div>
            <div className="action">
            </div>
        </div>
    )
}

export default AbsensiDetails