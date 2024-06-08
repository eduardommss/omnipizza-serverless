import type { AWS } from "@serverless/typescript";

import receiveMessage from "@functions/receive-message";

const serverlessConfiguration: AWS = {
	service: "omnipizza-serverless",
	frameworkVersion: "3",
	plugins: ["serverless-esbuild"],
	provider: {
		name: "aws",
		runtime: "nodejs20.x",
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
			TELEGRAM_BOT_TOKEN: "7429407108:AAFpjpSRqcSJZpJj5iXrHXHUyjkepE82_ZY",
		},
	},
	// import the function via paths
	functions: { receiveMessage },
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ["aws-sdk"],
			target: "node14",
			define: { "require.resolve": undefined },
			platform: "node",
			concurrency: 10,
		},
	},
	resources: {
		Resources: {
			ReceiveMessageQueue: {
				Type: "AWS::SQS::Queue",
				Properties: {
					QueueName: "ReceiveMessageQueue",
				},
			},
		},
	},
};

module.exports = serverlessConfiguration;
