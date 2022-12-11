import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3 style={{marginBottom: "20px"}}>Sign Up</h3>

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

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error" style={{marginTop: "20px"}}>{error}</div>}
        </form>
    )
} 

export default Signup