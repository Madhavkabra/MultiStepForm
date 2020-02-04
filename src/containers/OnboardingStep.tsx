import React, { FunctionComponent, useEffect, useState } from 'react';
import { Card, Layout, Typography, Col } from 'antd';
import {  } from 'antd/lib/form/Form';
import Step1 from '../components/OnboardingSteps/Step1';
import Step2 from '../components/OnboardingSteps/Step2';
import Step3 from '../components/OnboardingSteps/Step3';
import queryString from 'query-string';
import { checkUserId, setOnboardingDetails } from '../firebase/db'

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    margin: '0 15px',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    border: 0,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  title: {
    fontSize: 25,
    margin: 0,
    color: '#36474e',
  },
  stepDetail: {
    color: '#bcd4dc',
    margin: 0,
    fontSize: 16,
  },
};

interface StepDescription {
  [key: string]: string
}

interface StepForm {
  [key: string]: FunctionComponent | any,
}

interface StepParams { stepNumber: string };

const stepDescription: StepDescription = {
  '1': 'Basic Questions',
  '2': 'Experience Questions',
  '3': 'Short Response Question',
};

const stepForm: StepForm = {
  '1': Step1,
  '2': Step2,
  '3': Step3,
};

const OnboardingStep = ({ match, history, location }: any) => {
  const [userId, setUserId] = useState<any>('');
  
  useEffect(() => {
    (async function getUser() {
      const queryParams = queryString.parse(location.search);
      const userId = await checkUserId(queryParams)
      setUserId(userId)
    })();
  }, []);


  const { stepNumber }: StepParams = match.params;
  const FormComponent = stepForm[stepNumber];

  const handleSubmit = (values: any) => {
    const nextStep = parseInt(stepNumber, 10) + 1;
    if (nextStep !== 4) {
      setOnboardingDetails(userId, values)
      console.log(userId)
      history.push(`/onboarding/${nextStep}?userId=${userId}`);
    }
  };


  return (
    <Layout style={styles.wrapper}>
      <Col lg={8} md={16}>
        <Card style={styles.card} bodyStyle={{ textAlign: 'center' }}>
          <Typography.Title style={styles.title} level={2}>User Onboarding</Typography.Title>
          <Typography.Paragraph style={styles.stepDetail}>
            Part {stepNumber}/3 - {stepDescription[stepNumber]}
          </Typography.Paragraph>
          <FormComponent onSubmit={handleSubmit} />
        </Card>
      </Col>
    </Layout>
  );
};

export default OnboardingStep;
