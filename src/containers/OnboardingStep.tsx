import React, { Component, useEffect, useState } from 'react';
import { Card, Layout, Typography, Col } from 'antd';
import { } from 'antd/lib/form/Form';
import Step1 from '../components/OnboardingSteps/Step1';
import Step2 from '../components/OnboardingSteps/Step2';
import Step3 from '../components/OnboardingSteps/Step3';
import queryString from 'query-string';
import { checkUserId, setOnboardingDetails, getOnboardingDetails } from '../firebase/db';
import Alert from '../components/Alert';
import { PulseLoader } from "react-spinners";
import { RouteComponentProps } from "react-router-dom";

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

interface userData {
  firstName?: string;
  lastName?: string;
  college?: string;
  email?: string;
  lastCompany?: string;
  phone?: number;
  shortResponse?: string;
  yearsOfExperince?: number;
}

interface MatchParams {
  stepNumber: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
}

interface StepDescription {
  [key: string]: string
}

interface StepForm {
  [key: string]: Component | any,
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

const OnboardingStep = ({ match, history, location }: IProps) => {
  const [userId, setUserId] = useState<string>('');
  const [notify, setNotify] = useState<boolean>(false)
  const [userData, setUserData] = useState<object>({})
  const [fetchComplete, setFetchComplete] = useState<boolean>(false)

  useEffect(() => {
    (async function getUser() {
      const queryParams = queryString.parse(location.search);
      const userID = await checkUserId(queryParams)
      setUserId(userID)
      const userData = await getOnboardingDetails(userID)
      setUserData(userData)
      setFetchComplete(true)
    })();
  }, [location.search]);

  const { stepNumber }: StepParams = match.params;
  const FormComponent = stepForm[stepNumber];

  const handleSubmit = async (values: userData) => {
    const nextStep = parseInt(stepNumber, 10) + 1;
    setNotify(true)
    await setOnboardingDetails(userId, values)
    setNotify(false)
    if (nextStep !== 4) {
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
          <PulseLoader
            size={10}
            color={"#33CCFF"}
            loading={!fetchComplete}
          />
          {fetchComplete &&
            <FormComponent onSubmit={handleSubmit} userData={userData} />}
        </Card>
      </Col>
      <Alert open={notify} />
    </Layout>
  );
};

export default OnboardingStep;
