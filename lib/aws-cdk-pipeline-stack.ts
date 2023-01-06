import * as cdk from '@aws-cdk/core';

import { S3Stack } from '../lib/s3-stack';
import { LambdaStack } from '../lib/lambda-stack';

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

const repositoryName: string = 'aws-cdk-pipeline-stack-repo';

export class AwsCdkPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const repo = new codecommit.Repository(this, 'Repository', {
    //   repositoryName: repositoryName,
    // });

    const devPipeline = new pipelines.CodePipeline(this, 'DevPipeline', {
      // クロスアカウントを利用する場合に必要です。
      crossAccountKeys: true,
      synth: new pipelines.CodeBuildStep('Synth', {
        // 事前に作成したレポジトリ名と、ConnectionのARNに置き換えてください。
        input: CodePipelineSource.connection(
          'takuya-yone/aws-cdk-pipeline', // リポジトリがgithub.com/hoge/fugaなら、"hoge/fuga"
          'main', // ブランチ名
          {
            connectionArn:
              'arn:aws:codestar-connections:ap-northeast-1:690701631846:connection/5b7e0bbf-51f9-40cd-ae92-8c0cfd70bd14',
          }
        ),
        commands: [
          'yarn install --frozen-lockfile',
          'yarn build',
          'yarn cdk synth -c stage=dev',
        ],
      }),
    });

    devPipeline.addStage(
      new S3StackApplication(this, 'Dev', {
        env: {
          account: '690701631846',
          region: 'ap-northeast-1',
        },
      }),
      {
        pre: [new pipelines.ManualApprovalStep('DevApprove')],
      }
    );

    devPipeline.addStage(
      new S3StackApplication(this, 'Prod', {
        env: {
          account: '974310065491',
          region: 'ap-northeast-1',
        },
      }),
      {
        pre: [new pipelines.ManualApprovalStep('ProdApprove')],
      }
    );

    // const prodPipeline = new pipelines.CodePipeline(this, 'ProdPipeline', {
    //   // クロスアカウントを利用する場合に必要です。
    //   crossAccountKeys: true,
    //   synth: new pipelines.CodeBuildStep('Synth', {
    //     // 事前に作成したレポジトリ名と、ConnectionのARNに置き換えてください。
    //     input: pipelines.CodePipelineSource.codeCommit(repo, 'master'),
    //     commands: ['npm ci', 'npm run build', 'npx cdk synth -c stage=prod'],
    //   }),
    // });

    // // 任意のアカウントとリージョンで、必要な回数だけ`addStage`を呼び出します。
    // prodPipeline.addStage(
    //   new S3StackApplication(this, 'Prod', {
    //     env: {
    //       account: '974310065491',
    //       region: 'ap-northeast-1',
    //     },
    //   })
    // );
  }
}

export class S3StackApplication extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new S3Stack(this, 'S3Stack');
    new LambdaStack(this, 'LambdaStack');
  }
}

// export class LambdaStackApplication extends Stage {
//   constructor(scope: Construct, id: string, props?: StageProps) {
//     super(scope, id, props);

//     new LambdaStack(this, 'LambdaStack');
//   }
// }
