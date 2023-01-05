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


export class S3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'testBucket', {
      bucketName: 'test-bucket-' + uuidv4()
    });
 
  }}