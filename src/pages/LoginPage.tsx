import axios from 'axios';
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import './Style.scss';
import { useNavigate } from 'react-router-dom';
import { resolve } from 'path';
import { rejects } from 'assert';
export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const reEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const handleSignIn = async () => {
        if (password.length < 6) {
            setMessage('Password must be greater than 6 characters');
        }
        if (!reEmail.test(email)) {
            setMessage('Please enter correct email');
        }
        if (reEmail.test(email) && password.length >= 6) {
            await axios
                .get(`http://localhost:8000/users/1`)
                .then((res) => {
                    if (res.data.email === email && res.data.password.toString() === password.toString()) {
                        navigate('/info/1');
                    } else {
                        return new Promise((resolve, rejects) => {
                            rejects();
                        });
                    }
                })
                .catch(() => {
                    setMessage('Please check your email or password again');
                });
        }
    };
    return (
        <div className="container">
            <div className="form">
                <div className="form-body">
                    <div className="form-title-login">Login</div>
                    {message && (
                        <div className="form-notify">
                            {message}{' '}
                            <button
                                onClick={() => {
                                    setMessage('');
                                }}
                            >
                                Hide
                            </button>
                        </div>
                    )}
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        label="Email"
                        labelColor="#2e09db"
                        marginLabel="2px 6px"
                        placeholder="example@kyanon.digital"
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        label="Password"
                        labelColor="#2e09db"
                        marginLabel="2px 6px"
                        placeholder="******"
                    />
                    <div className="form-footer login">
                        <div className="form-show">
                            <input type="checkbox" />
                            <p>Show password</p>
                        </div>
                        <Button className="btn btn-login" text="Sign in" onClick={handleSignIn} />
                    </div>
                </div>
            </div>
        </div>
    );
}
