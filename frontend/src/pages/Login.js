import { useState } from 'react'
import Button from 'react-bootstrap/Button';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)
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

            <Button>Log in</Button>
        </form>
    )
} 

export default Login