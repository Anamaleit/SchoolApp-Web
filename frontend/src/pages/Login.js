import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3 style={{marginBottom: "20px"}}>Log in</h3>

            <div className="form-outline mb-4">
                <label className="form-label">Email address</label>
                <input 
                    className="form-control"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    
                />
            </div>

            <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input 
                    className="form-control"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    
                />
            </div>

            <button disabled={isLoading}>Login</button>
            {error && <div className="error" style={{marginTop: "20px"}}>{error}</div>}
        </form>
    )
} 

export default Login