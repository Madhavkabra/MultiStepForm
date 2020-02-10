import React, { SyntheticEvent, useState, FormEvent } from 'react';
import { Row, Col, Form } from 'antd';
import Button from '../Button';
import Input from '../Input';
import { FormComponentProps } from 'antd/lib/form/Form';

interface UserData extends FormEvent<HTMLFormElement> {
  college?: string,
  lastCompany?: string,
  yearsOfExperience?: number
}

interface IProps extends FormComponentProps {
  userData: UserData;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Step2Form = ({ form, onSubmit, userData }: IProps) => {
  const { getFieldDecorator } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: UserData) => {
      if (!err) {
        setIsLoading(true)
        onSubmit(values);
      }
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col span={24}>
            <Form.Item label="Which College did you go to?">
              {getFieldDecorator('college', {
                rules: [{ required: true, message: 'Please enter your college name!' }],
                initialValue: userData.college
              })(
                <Input type="text" />
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="What was the last company you worked at?">
              {getFieldDecorator('lastCompany', {
                rules: [{ required: true, message: 'Please enter your previous company name!' }],
                initialValue: userData.lastCompany
              })(
                <Input type="text" />
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="How many years of experience do you have?">
              {getFieldDecorator('yearsOfExperience', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter the number of experience you have!',
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter an valid number',
                  },
                ],
                initialValue: userData.yearsOfExperience
              })(
                <Input type="number" />
              )}
            </Form.Item>
          </Col>
          <Col span={24} className="Continue_btn">
            <Button disabled={isLoading} type="primary" htmlType="submit">Continue</Button>
          </Col>
        </Row>
      </Form>

    </div>
  );
}

const Step2 = Form.create<IProps>({ name: 'step2Form' })(Step2Form);

export default Step2;
