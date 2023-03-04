import React, { useMemo, useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { DataGrid } from '@mui/x-data-grid';
import { createContract } from '../../../functions/product';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MainContainer } from '../../AppBar/Style';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import moment from 'moment/moment';

const EXTENSIONS = ['xlsx', 'xls', 'csv'];

const ContractCreate = () => {
  const history = useNavigate();
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState();
  const { user, drawer } = useSelector((state) => ({ ...state }));
  const columns = useMemo(() => [
    { title: 'contratRef', field: 'contratRef', width: 200 },
    { title: 'clientRef ', field: 'clientRef', width: 200 },
    { title: 'civility', field: 'civility', width: 80 },
    { title: 'prenom ', field: 'prenom', width: 100 },
    { title: 'tel ', field: 'tel', width: 100 },
    { title: 'email ', field: 'email' },
    { title: 'adresse ', field: 'adresse' },
    { title: 'codePostal ', field: 'codePostal' },
    { title: 'comune ', field: 'comune' },
    { title: 'mensualiteElec ', field: 'mensualiteElec' },
    { title: 'optionTarifaire ', field: 'optionTarifaire' },
    { title: 'prixAbonnement ', field: 'prixAbonnement' },
    { title: 'prixKwhBase ', field: 'prixKwhBase' },
    { title: 'prixKwhHp ', field: 'prixKwhHp' },
    { title: 'prixKwhHc ', field: 'prixKwhHc' },
    { title: 'puissance ', field: 'puissance' },
    { title: 'partenaire ', field: 'partenaire' },

    {
      title: 'dateActivationElec ',
      field: 'dateActivationElec',
      renderCell: (params) =>
        moment(params.row.dateActivationElec, 'DD/MM/YYYY HH:mm').format(
          'DD/MM/YYYY HH:mm'
        ),
    },
    { title: 'mensualiteGaz ', field: 'mensualiteGaz' },
    {
      title: 'dateActivationGaz ',
      field: 'dateActivationGaz',
      renderCell: (params) =>
        moment(params.row.dateActivationElec, 'DD/MM/YYYY HH:mm').format(
          'DD/MM/YYYY HH:mm'
        ),
    },
  ]);
  const getExention = (file) => {
    const parts = file.name.split('.');
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        if (
          headers[index].includes('dateActivationElec') ||
          headers[index].includes('dateActivationGaz')
        ) {
          // check if the header contains "date"
          rowData[headers[index]] = moment(
            element,
            'DD/MM/YYYY HH:mm'
          ).toDate();
        } else {
          rowData[headers[index]] = element;
        }
      });
      rows.push(rowData);
    });
    return rows;
  };

  const importExcel = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: 'binary' });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      //console.log(fileData)
      const headers = fileData[0];

      setColDefs(columns);

      //removing header
      fileData.splice(0, 1);

      setData(convertToJson(headers, fileData));

      setLoading(false);
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert('Invalid file input, Select Excel, CSV file');
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };

  const handleSubmit = (e) => {
    // console.log(data);
    setLoading(true);
    e.preventDefault();
    createContract(data, user.token)
      .then((res) => {
        //console.log(res);
        setLoading(false);
        window.alert('Add New Data To db');
        //window.location.reload();
        history('/back-office');
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <MainContainer open={drawer}>
      {JSON.stringify(data)}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h3" component="h3">
            Manage Contracts
          </Typography>
          <Stack direction="row" spacing={2} sx={{ height: '40px', mt: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              disabled={loading}
            >
              importer
              <input hidden type="file" onChange={importExcel} />
            </Button>
            <Button
              variant="contained"
              type="submit"
              startIcon={<UploadFileIcon />}
              onClick={handleSubmit}
              disabled={loading}
            >
              Enregistrer
            </Button>
          </Stack>
        </Box>

        <Box sx={{ height: 400, width: '100%', p: 2 }}>
          <DataGrid
            title="Olympic Data"
            columns={columns}
            rows={data || []}
            getRowId={(row) => row.contratRef}
          />
        </Box>
      </form>
    </MainContainer>
  );
};

export default ContractCreate;
