import React, { SyntheticEvent } from 'react';
import {
  Row,
  Col,
  Form,
} from 'antd';
import Button from '../Button';
import Input from '../Input';

const styles = {
  buttonWrapper: {
    padding: 15,
  },
  form: {
    marginTop: 25
  },
  formItem: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
    marginBottom: 0,
  },
};

const Step1Form = ({ form, onSubmit }: any) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: any) => {
      if (!err) {
        console.log(values);
        onSubmit(values)
      }
    });
  };

  return (
    <Form style={styles.form} onSubmit={handleSubmit}>
      <Row>
        <Col md={12} xs={24}>
          <Form.Item label="First Name">
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please enter your first name!' }]
            })(
              <Input type="text" />
            )}
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label="Last Name">
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please enter your last name!' }]
            })(
              <Input type="text" />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please enter your email!' },
                {
                  type: 'email',
                  message: 'Please enter valid E-mail!',
                },
              ]})(
              <Input type="text" />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Phone number">
           {getFieldDecorator('phone', {
              rules: [{
                required: true,
                message: 'Please enter your phone number!'
              },
              {
                pattern: /[2-9]{2}\d{8}/,
                message: 'Phone number must have exact 10 digits and must not start from 1 or 0!',
              },
            ]})(
              <Input type="number" />
            )}
          </Form.Item>
        </Col>
        <Col span={24} style={styles.buttonWrapper}>
          <Button type="primary" htmlType="submit">Continue</Button>
        </Col>
      </Row>
    </Form>
  );
};

const Step1 = Form.create<any>({ name: 'step1Form' })(Step1Form);

export default Step1;
