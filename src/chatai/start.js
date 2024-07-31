import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';
import LOGO from '../assets/image/main-logo.svg';
import { useNavigate } from 'react-router-dom';
import { signUp } from './services/signUp';

export default function Start() {
  const [textFieldValue, setTextFieldValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  const handleSubmit = async () => {
    const userId = await signUp(textFieldValue);
    navigate(`/chat/${userId}`, { state: { name: textFieldValue } });
  };

  return (
    <div style={{ height: '100vh', width: '100vw', margin: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img src={LOGO} style={{ height: '20%' }} />
      <div style={{ marginTop: '50px' }}>
        <TextField id="outlined-basic" label="이름을 입력해주세요!" variant="outlined" size='medium' value={textFieldValue} onChange={handleInputChange} />
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit} style={{ marginLeft: '10px', width: '90px', height: '55px', fontSize: '16px' }}  >
          다음
        </Button>
      </div>
    </div>
  )
}
