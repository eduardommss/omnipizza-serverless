import type { AWS } from '@serverless/typescript'

import messageProcess from '@functions/message-process'
import receiveMessage from '@functions/receive-message'

const serverlessConfiguration: AWS = {
  service: 'omnipizza-serverless',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['sqs:SendMessage'],
            Resource: 'arn:aws:sqs:*:*:*'
          }
        ]
      }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      NODE_ENV: 'dev',
      APP_NAME: 'omnipizza',
      APP_REGION: 'us-east-1',
      APP_LOG_LEVEL: 'DEBUG',
      AWS_ACCOUNT_ID: '637423435366',
      REDIS_CACHE_DISABLED: 'true',
      TELEGRAM_BOT_TOKEN: '7429407108:AAFpjpSRqcSJZpJj5iXrHXHUyjkepE82_ZY'
    }
  },
  // import the function via paths
  functions: { receiveMessage, messageProcess },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    }
  },
  resources: {
    Resources: {
      QueueReceiveMessage: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'queue-receive-message'
        }
      }
    }
  }
}

module.exports = serverlessConfiguration
