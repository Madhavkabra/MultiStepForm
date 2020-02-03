import React, { SyntheticEvent } from 'react';
import { Input, Row, Col, Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import Button from '../Button';

const { TextArea } = Input;

interface IProps extends FormProps {

}

const Step3Form = ({ form, onSubmit }: any) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: any) => {
      if (!err) {
        console.log(values);
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
              rules: [{ required: true, message: 'Please proivde a response.' }]
            })(
              <TextArea />
            )}
          </Form.Item>
        </Col>

        <Col span={24} className="Continue_btn">
          <Button type="primary" htmlType="submit">Continue</Button>
        </Col>
      </Row>
    </Form>
  );
};

const Step3 = Form.create<any>({ name: 'step3Form' })(Step3Form);

export default Step3;
