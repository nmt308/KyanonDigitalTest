import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
export default function InfoPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [phone, setPhone] = useState<any>();
    const reEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const rePhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    const handleUpdate = () => {
        if (!email || !fullName || !birth || !phone) {
            setMessage('Please fill all field');
            return;
        }
        if (!rePhone.test(phone)) {
            setMessage('Check your phone again');
            return;
        }
        if (!reEmail.test(email)) {
            setMessage('Please enter correct email');
            return;
        }
        axios
            .put(`http://localhost:8000/users/${id}`, {
                email,
                fullName,
                birth,
                phone,
                password: '123456',
            })
            .then((res) => {
                setMessage('Update successful, please refresh page');
            });
    };
    const handleCancel = () => {
        navigate('/');
    };
    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/users/${id}`).then((res) => {
            setFullName(res.data.fullName);
            setBirth(res.data.birth);
            setPhone(res.data.phone);
            setEmail(res.data.email);
        });
    }, []);
    return (
        <div className="container">
            <div className="form">
                <div className="form-body">
                    <div className="form-title-info">Profile</div>
                    {message && (
                        <div className="form-notify">
                            {message}
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
                        value={fullName}
                        label="Full name"
                        labelColor="#BABCC0"
                        onChange={(e) => {
                            setFullName(e.target.value);
                        }}
                    />
                    <Input
                        type="date"
                        value={birth}
                        label="Date Of Birth"
                        labelColor="#BABCC0"
                        onChange={(e) => {
                            setBirth(e.target.value);
                        }}
                    />
                    <Input
                        value={email}
                        label="Email"
                        labelColor="#BABCC0"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Input
                        value={phone}
                        label="Phone"
                        labelColor="#BABCC0"
                        onChange={(e) => {
                            if (typeof e.target.value === 'string') {
                                return;
                            }
                            setPhone(e.target.value);
                        }}
                    />
                    <div className="form-footer info">
                        <Button className="btn btn-update" text="Update" onClick={handleUpdate} />
                        <Button className="btn btn-cancel" text="Cancel" onClick={handleCancel} />
                    </div>
                </div>
            </div>
        </div>
    );
}
