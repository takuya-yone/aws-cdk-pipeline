import * as cdk from '@aws-cdk/core';

import { Construct, Stage, Stack, StackProps, StageProps } from '@aws-cdk/core';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from '@aws-cdk/pipelines';

import * as lambda from '@aws-cdk/aws-lambda';
// import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as iam from '@aws-cdk/aws-iam';
import * as codecommit from '@aws-cdk/aws-codecommit';
import * as pipelines from '@aws-cdk/pipelines';
import * as s3 from '@aws-cdk/aws-s3';
import { v4 as uuidv4 } from 'uuid';

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // new lambda.Function(this, 'MyFunction', {
    //     runtime: lambda.Runtime.PYTHON_3_7,
    //     handler: 'app.lambda_handler',
    //     code: lambda.Code.fromAsset('./my_function'),
    //   });

    new lambda.Function(this, 'HelloWorld', {
      functionName: 'HelloWorld' + uuidv4(),
      handler: 'handler.handler',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: new lambda.AssetCode(`./lambda-src`),
      memorySize: 512,
      timeout: cdk.Duration.seconds(10),
    });
  }
}
