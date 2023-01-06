import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from 'aws-cdk-lib/pipelines';

import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as pipelines from 'aws-cdk-lib/pipelines';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { v4 as uuidv4 } from 'uuid';

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'testBucket', {
      bucketName: 'test-bucket-' + uuidv4(),
    });
  }
}
