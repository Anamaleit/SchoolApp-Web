import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    // non-user
    if (!user){
        return (
            <header>
                <div className="nav-right">
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                </div>
            </header>
        );
    }
    // admin
    else if (user && user.isAdmin){
        return (
            <header>
                <div className="nav-left">
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/Raw">Raw</Link></li>
                        <li><Link to="/Student">Student</Link></li>
                        <li><Link to="/Nilai">Nilai</Link></li>
                        <li><Link to="/Absensi">Absensi</Link></li>
                        <li><Link to="/StatusPembayaran">Status Pembayaran</Link></li>
                        <li><Link to="/Keterangan">Keterangan</Link></li>
                        <li style={{marginLeft: "600px"}}>{user.email}</li>
                        <button onClick={handleClick} style={{marginLeft: "10px"}}>Log out</button>
                    </ul>
                </div>
            </header>
        );
    }
    // teacher
    else if (user && user.isTeacher){
        return (
            <header>
                <div className="nav-left">
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/Student">Student</Link></li>
                        <li><Link to="/Nilai">Nilai</Link></li>
                        <li><Link to="/Absensi">Absensi</Link></li>
                        <li><Link to="/StatusPembayaran">Status Pembayaran</Link></li>
                        <li><Link to="/Keterangan">Keterangan</Link></li>
                        <li style={{marginLeft: "600px"}}>{user.email}</li>
                        <button onClick={handleClick} style={{marginLeft: "10px"}}>Log out</button>
                    </ul>
                </div>
            </header>
        );
    }
    // unprivileged user
    else{
        return (
            <header>
                <div className="nav-left">
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/Student">Student</Link></li>
                        <li style={{marginLeft: "600px"}}>{user.email}</li>
                        <button onClick={handleClick} style={{marginLeft: "10px"}}>Log out</button>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Navbar