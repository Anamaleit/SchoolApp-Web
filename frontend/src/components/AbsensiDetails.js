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
                <input type="checkbox" value="present" defaultChecked/>
                <select name="status" id="attendanceStatus" style={{marginLeft: '20px'}}>
                    <option value="">--Ket--</option>
                    <option value="sick">S</option>
                    <option value="leave">I</option>
                    <option value="absent">A</option>
                </select>
            </div>
        </div>
    )
}

export default AbsensiDetails