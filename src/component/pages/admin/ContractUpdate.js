import { Button, FormGroup, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getContract, updateContract } from '../../../functions/product';
import { MainContainer } from '../../AppBar/Style';

const intialState = {
  contratRef: '',
  clientRef: '',
  civility: '',
  prenom: '',
  tel: '',
  email: '',
  quality: { qualification: '' },
};

const ContractUpdate = () => {
  let { slug } = useParams();
  const history = useNavigate();
  const { drawer, user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(intialState);
  const [loading, setLoading] = useState(false);
  const { contratRef, clientRef, civility, prenom, tel, email, quality } =
    values;

  useEffect(() => {
    loadContract();
  }, []);

  const loadContract = () => {
    getContract(slug).then((p) => {
      setValues({ ...values, ...p.data });
      console.log(p.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateContract(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        history('/admin');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'quality') {
      setValues({
        ...values,
        quality: { ...values.quality, qualification: value },
      });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return (
    <MainContainer open={drawer}>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            label="contratRef"
            type={'text'}
            name="contratRef"
            variant="outlined"
            sx={{ mb: 2, width: '40%' }}
            size="small"
            value={contratRef}
            onChange={handleChange}
            required
          />
          <TextField
            label="clientRef"
            type={'text'}
            name="clientRef"
            variant="outlined"
            sx={{ mb: 2, width: '40%' }}
            size="small"
            value={clientRef}
            onChange={handleChange}
            required
          />{' '}
          <TextField
            label="civility"
            type={'text'}
            name="civility"
            variant="outlined"
            sx={{ mb: 2, width: '40%' }}
            size="small"
            value={civility}
            onChange={handleChange}
            required
          />{' '}
          <TextField
            label="prenom"
            type={'text'}
            name="prenom"
            variant="outlined"
            sx={{ mb: 2, width: '40%' }}
            size="small"
            value={prenom}
            onChange={handleChange}
            required
          />{' '}
          <TextField
            label="tel"
            type={'text'}
            name="tel"
            variant="outlined"
            sx={{ mb: 2, width: '40%' }}
            size="small"
            value={tel}
            onChange={handleChange}
            required
          />{' '}
          <TextField
            label="email"
            type={'text'}
            name="email"
            variant="outlined"
            sx={{ mb: 2, width: '40%' }}
            size="small"
            value={email}
            onChange={handleChange}
            required
          />
          <Select
            name="quality"
            value={quality.qualification}
            onChange={handleChange}
            size="small"
          >
            {['conforme', 'non-conforme', 'sav', 'annulation'].map((q) => (
              <MenuItem key={q} value={q}>
                {q}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
        <Button type="submit" variant="contained">
          submit
        </Button>
      </form>
    </MainContainer>
  );
};

export default ContractUpdate;
