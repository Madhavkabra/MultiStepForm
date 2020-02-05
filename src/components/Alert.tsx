import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Snackbars = (props: any) => {
  return (
    <Snackbar
      open={props.open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      key={'top, center'}
    >
      <Alert severity='info'>
        Please Wait.
      </Alert>
    </Snackbar>
  );
}

export default Snackbars;
