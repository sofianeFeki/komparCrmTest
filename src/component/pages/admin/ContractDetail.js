import { Button, Divider, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContract } from '../../../functions/product';
import { MainContainer } from '../../AppBar/Style';
import { DrawerHeader } from '../../AppBar/Style';
import Calification from '../quality/Calification';
import CalificationSav from '../Sav.js/CalificationSav';
import CalificationWc from '../wc/CalificationWc';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

function createData(name, value) {
  return { name, value };
}

const ContractDetail = () => {
  const { drawer } = useSelector((state) => ({ ...state }));

  const [data, setData] = useState([]);
  const rows = [
    createData('Ref contrat', data.contratRef),
    createData('Ref client', data.clientRef),
    createData('contact', data.prenom),
    createData('Tél', data.tel),
    createData('email', data.email),
    createData('partenaire', data.partenaire),
    createData('data se signature', data.dateActivationElec),
    createData('option tarifaire', 375, 0.0),
    createData(
      'Adresse de consommation',
      data.adresse + ' ' + data.codePostal + ' ' + data.comune
    ),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
  ];

  let { slug } = useParams();
  useEffect(() => {
    loadContract();
  }, []);
  const loadContract = () => {
    getContract(slug).then((c) => setData(c.data));
  };

  return (
    <div>
      <MainContainer open={drawer}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h3" component="h3">
            Détail de la souscription
          </Typography>
          <Stack direction="row" spacing={1} sx={{ height: '40px', mt: 2 }}>
            <Calification />
            <CalificationWc />
            <CalificationSav />
          </Stack>
        </Box>
        <TableContainer component={Paper} sx={{ width: '50%', p: 2 }}>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainContainer>
    </div>
  );
};

export default ContractDetail;
