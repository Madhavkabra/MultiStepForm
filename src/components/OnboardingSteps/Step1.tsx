import React, { SyntheticEvent, useState, FormEvent } from 'react';
import {
  Row,
  Col,
  Form,
} from 'antd';
import Button from '../Button';
import Input from '../Input';
import { FormComponentProps } from 'antd/lib/form/Form';

const styles = {
  buttonWrapper: {
    padding: 15,
  },
  form: {
    marginTop: 25
  },
  blockField: {
    padding: "0 10px"
  },
};

interface UserData extends FormEvent<HTMLFormElement> {
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: number
}

interface IProps extends FormComponentProps {
  userData: UserData;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Step1Form = ({ form, onSubmit, userData }: IProps) => {
  const { getFieldDecorator } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: UserData) => {
      if (!err) {
        setIsLoading(true)
        onSubmit(values)
      }
    });
  };

  return (
    <Form style={styles.form} onSubmit={handleSubmit}>
      <Row>
        <Col md={12} xs={24} style={styles.blockField}>
          <Form.Item wrapperCol={{ sm: 24 }} label="First Name" style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', marginBottom: 0, }}>
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please enter your first name!' }],
              initialValue: userData.firstName
            })(
              <Input type="text" />
            )}
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item wrapperCol={{ sm: 24 }} label="Last Name" style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', padding: '0 15px', marginBottom: 0, }}>
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please enter your last name!' }],
              initialValue: userData.lastName
            })(
              <Input type="text" />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item wrapperCol={{ sm: 24 }} label="Email" style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', padding: '0 15px', marginBottom: 0, }}>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please enter your email!' },
                {
                  type: 'email',
                  message: 'Please enter valid E-mail!',
                },
              ],
              initialValue: userData.email
            })(
              <Input type="text" />
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item wrapperCol={{ sm: 24 }} label="Phone number" style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', padding: '0 15px', marginBottom: 0, }}>
            {getFieldDecorator('phone', {
              rules: [{
                required: true,
                message: 'Please enter your phone number!'
              },
              {
                pattern: /[2-9]{2}\d{8}/,
                message: 'Phone number must have exact 10 digits and must not start from 1 or 0!',
              },
              ],
              initialValue: userData.phone
            })(
              <Input type="number" />
            )}
          </Form.Item>
        </Col>
        <Col span={24} style={styles.buttonWrapper}>
          <Button disabled={isLoading} type="primary" htmlType="submit">Continue</Button>
        </Col>
      </Row>
    </Form>
  );
};

const Step1 = Form.create<IProps>({ name: 'step1Form' })(Step1Form);

export default Step1;
