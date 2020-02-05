import React, { SyntheticEvent, useState } from 'react';
import { Input, Row, Col, Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import Button from '../Button';

const { TextArea } = Input;

interface IProps extends FormProps {

}

const Step3Form = ({ form, onSubmit, userData }: any) => {
  const { getFieldDecorator } = form;
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: any) => {
      if (!err) {
        setIsLoading(true)
        onSubmit(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col span={24}>
          <Form.Item label="Why are you intrested in software engineering?">
            {getFieldDecorator('shortResponse', {
              rules: [{ required: true, message: 'Please proivde a response.' }],
              initialValue: userData.shortResponse
            })(
              <TextArea />
            )}
          </Form.Item>
        </Col>
        <Col span={24} className="Continue_btn">
          <Button disabled={isLoading} type="primary" htmlType="submit">Continue</Button>
        </Col>
      </Row>
    </Form>
  );
};

const Step3 = Form.create<any>({ name: 'step3Form' })(Step3Form);

export default Step3;
