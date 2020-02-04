import React from 'react';
import { Input as AntdInput } from 'antd';

export const inputStyles = {
  background: '#f7f9ff',
  border: 0,
  height: 50,
};

const Input = (props: any) => (
  <AntdInput style={inputStyles} {...props} />
);

export default Input;
