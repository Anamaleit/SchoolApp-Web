const NilaiDetails = ({ student }) => {
    return (
        <div className="nilai-table">
            <div className="num">
                <span>{student.num}</span>
                {/* <span>{JSON.stringify(student.grades.agama.pr.pr1)}</span> */}
            </div>
            <div className="name">
                <span>{student.name}</span>
            </div>
            <div className="action">
                <button>view</button>
                <button style={{marginLeft: '10px'}}>edit</button>
            </div>
        </div>
    )
}

export default NilaiDetails