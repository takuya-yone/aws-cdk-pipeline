#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkPipelineStack } from '../lib/aws-cdk-pipeline-stack';

const app = new cdk.App();

const envProd = { account: '974310065491', region: 'ap-northeast-1' };
// const envDev = { account: '690701631846', region: 'ap-northeast-1' };
const envDev = { region: 'ap-northeast-1' };

new AwsCdkPipelineStack(app, 'AwsCdkPipelineStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */
  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  env: envDev,
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
