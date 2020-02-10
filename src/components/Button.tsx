import React from 'react';
import { Button as AntdButton } from 'antd';
import { NativeButtonProps } from "antd/lib/button/button";

export const buttonStyles = {
  background: '#00c5ff',
  borderRadius: 25,
  border: 0,
  fontSize: 17,
  height: 'auto',
  padding: '10px 0',
  width: '100%',
};

interface Button extends NativeButtonProps { }

const Button = (props: Button) => (
  <AntdButton style={buttonStyles} {...props} />
);

export default Button;
