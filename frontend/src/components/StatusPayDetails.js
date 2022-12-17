const StatusPayDetails = ({ student }) => {
    return (
        <div className="status-pay-table">
            <div className="num">
                <span>{student.num}</span>
            </div>
            <div className="name">
                <span>{student.name}</span>
            </div>
            <div className="action">
                <button>view</button>
                <select name="status-payment" id="statusSelect" style={{marginLeft: '10px'}}>
                    <option value="">--Ket--</option>
                    <option value="true">Lunas</option>
                    <option value="false">Belum Lunas</option>
                </select>
            </div>
        </div>
    )
}

export default StatusPayDetails