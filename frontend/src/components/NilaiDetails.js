import NilaiModal from "./Modal/NilaiModal"

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
                <NilaiModal mode="view" student={student}/>
                <NilaiModal mode="update" student={student} style={{marginLeft: '10px'}}/>
            </div>
        </div>
    )
}

export default NilaiDetails