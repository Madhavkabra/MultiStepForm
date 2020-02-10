import React from 'react';
import { Card, Layout, Typography, Col } from 'antd';

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
    fontSize: 55,
    margin: 0,
    color: '#36474e',
  },
};

const OnboardingStep = () => {
  return (
    <Layout style={styles.wrapper}>
      <Col lg={8} md={16}>
        <Card style={styles.card} bodyStyle={{ textAlign: 'center' }}>
            <Typography.Title style={styles.title} level={2}>Success</Typography.Title>
        </Card>

      </Col>
    </Layout>
  );
};

export default OnboardingStep;