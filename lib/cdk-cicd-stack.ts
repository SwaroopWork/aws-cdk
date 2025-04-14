import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './pipeline-stage';

interface pipelineProps extends cdk.StackProps {
  LambdaStackName: string;
  LambdaStackStageName: string;
  EC2stackName: string;
  vpcId: string;
  instanceId: string;
  ScriptUploadStack: string;
  scriptPath: string;
  BucketLogicalId: string;
  BucketName: string;
  UploadToS3Stack: string;
}

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: pipelineProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'CdkCicdStack', {
      pipelineName: 'cdk-code-pipeline',
      synth: new ShellStep('myShellStep', {
        input: CodePipelineSource.gitHub('SwaroopWork/aws-cdk', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
          'pwd',
          'ls'
        ],
        primaryOutputDirectory: 'aws-cdk/cdk.out'
      })
      
    });

    pipeline.addStage(new PipelineStage(this, 'TestStage', {
      LambdaStackName: props.LambdaStackName,
      LambdaStackStageName: props.LambdaStackStageName,
      EC2stackName: props.EC2stackName,
      vpcId: props.vpcId,
      instanceId: props.instanceId,
      scriptPath: props.scriptPath,
      ScriptUploadStack: props.ScriptUploadStack,
      UploadToS3Stack: props.UploadToS3Stack,
      BucketLogicalId: props.BucketLogicalId,
      BucketName: props.BucketName,
      env: {
        account: cdk.Stack.of(this).account,
        region: cdk.Stack.of(this).region
      }
    }));
  }
}
