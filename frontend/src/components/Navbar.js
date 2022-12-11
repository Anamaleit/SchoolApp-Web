import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="nav-left">
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/Nilai">Nilai</a></li>
                    <li><a href="/Absensi">Absensi</a></li>
                    <li><a href="/StatusPembayaran">Status Pembayaran</a></li>
                    <li><a href="/Keterangan">Keterangan</a></li>
                </ul>
            </div>
            <div className="nav-right">
                <ul>
                    <button onClick={handleClick} style={{marginLeft: "600px"}}>Log out</button>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Signup</a></li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar