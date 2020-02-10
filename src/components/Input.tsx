import React from 'react';
import { Input as AntdInput } from 'antd';
import { InputProps } from 'antd/lib/input/Input'
import * as PropTypes from 'prop-types';

export const inputStyles = {
  background: '#f7f9ff',
  border: 0,
  height: 50,
};

interface Input extends InputProps { }

const Input = (props: Input) => (
  <AntdInput style={inputStyles} {...props} />
);

export default Input;
