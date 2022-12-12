import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            {user && (
            <div className="nav-left">
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/Nilai">Nilai</a></li>
                    <li><a href="/Absensi">Absensi</a></li>
                    <li><a href="/StatusPembayaran">Status Pembayaran</a></li>
                    <li><a href="/Keterangan">Keterangan</a></li>
                    <li style={{marginLeft: "600px"}}>{user.email}</li>
                    <button onClick={handleClick}>Log out</button>
                </ul>
            </div>
            )}
            {!user && (
            <div className="nav-right">
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Signup</a></li>
                </ul>
            </div>
            )}
        </header>
    )
}

export default Navbar