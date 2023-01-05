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

const repositoryName: string = 'aws-cdk-pipeline-stack-repo';

export class AwsCdkPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repo = new codecommit.Repository(this, 'Repository', {
      repositoryName: repositoryName,
    });

    // const pipeline = new CodePipeline(this, 'Pipeline', {
    //   // クロスアカウントを利用する場合に必要です。
    //   crossAccountKeys: true,
    //   synth: new ShellStep('Synth', {
    //     // 事前に作成したレポジトリ名と、ConnectionのARNに置き換えてください。
    //     input: CodePipelineSource.connection('my-org/my-app', 'main', {
    //       connectionArn: 'arn:aws:codestar-connections:ap-northeast-1:11111111111:connection/00000000-0000-0000-0000-000000000000',
    //     }),
    //     commands: [
    //       'npm ci',
    //       'npm run build',
    //       'npx cdk synth',
    //     ],
    //   }),
    // });
  }
}
