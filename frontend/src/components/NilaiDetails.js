const NilaiDetails = ({ student }) => {

    console.log(student.grades)

    return (
        <div className="nilai-table">
            <div className="nilai-num">
                <span>{student.num}</span>
                <span>{student.grades}</span>
            </div>
            <div className="nilai-name">
                <span>{student.name}</span>
            </div>
            <div className="nilai-action">
            </div>
        </div>
    )
}

export default NilaiDetails