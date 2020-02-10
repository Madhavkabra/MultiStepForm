import React, { SyntheticEvent, useState, FormEvent } from 'react';
import { Input, Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import Button from '../Button';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
const { TextArea } = Input;

interface UserData extends FormEvent<HTMLFormElement> {
  shortResponse?: string,
}

interface IProps extends RouteComponentProps<{}>, FormComponentProps {
  userData: UserData;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Step3Form = ({ form, onSubmit, userData, history }: IProps) => {
  const { getFieldDecorator } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: UserData) => {
      if (!err) {
        setIsLoading(true)
        onSubmit(values);
        history.replace({
          pathname: '/success',
        })
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

let Step3 = withRouter(Step3Form)
export default Form.create<IProps>({ name: 'step3Form' })(Step3);

