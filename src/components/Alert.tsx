import React from 'react';
import { Alert } from 'antd';

interface Iprops {
  open: Boolean
}   

const AlertMessage = (props: Iprops) => {
  return (
    <div>
      {props.open &&
        <Alert message="Please Wait" type="info" showIcon />}
    </div>
  );
}

export default AlertMessage;
