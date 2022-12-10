// import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="nav">
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/Nilai">Nilai</a></li>
                    <li><a href="/Absensi">Absensi</a></li>
                    <li><a href="/StatusPembayaran">Status Pembayaran</a></li>
                    <li><a href="/Keterangan">Keterangan</a></li>
                    <li><a href="/login" style={{marginLeft: "750px"}}>Login</a></li>
                    <li><a href="/signup">Signup</a></li>
                </ul>
                {/* <nav>
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                </nav> */}
            </div>
        </header>
    )
}

export default Navbar