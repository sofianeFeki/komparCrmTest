import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const VoirContrat = ({ params, rowId, setRowId }) => {
  return (
    // <Button>
    //   <Link to={`/contract/${params.row.clientRef}`}>voir</Link>
    // </Button>

    <Button
      variant="outlined"
      component={Link}
      to={`/contract/${params.row.clientRef}`}
    >
      voir
    </Button>
  );
};

export default VoirContrat;
