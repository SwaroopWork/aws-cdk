#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkCicdStack } from '../lib/cdk-cicd-stack';
import { App } from 'aws-cdk-lib';

const app = new cdk.App();

new CdkCicdStack(app, 'CdkCicdStack', {
  LambdaStackName: 'myLambdaStack',
  LambdaStackStageName: 'dev',
  EC2stackName: 'myEc2Stack',
  vpcId: 'vpc-015f777660b51dd43',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
  instanceId: 'i-018f1fd5a204a1801',
  ScriptUploadStack: 'ScriptUploadStack',
  scriptPath: '../script/myscript.sh',
  UploadToS3Stack: 'MyS3BucketUploadStack01',
  BucketLogicalId: 'MyS3UploadBucket',
  BucketName: 'snowflake-test-s3-yourname-2025'
});