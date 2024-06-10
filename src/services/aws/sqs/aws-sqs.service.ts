import {
	SendMessageCommand,
	SendMessageCommandInput,
	SQSClient,
} from "@aws-sdk/client-sqs";

import { ELogLevel } from "../../../enums";
import { EnvironmentService } from "../../environment";
import { LogService } from "../../log";
import { queueList } from "./aws-sqs.data";

import type { EQueueName } from "./aws-sqs.enum";
export namespace AWSSQSService {
	const sqsClient: SQSClient = new SQSClient({
		region: EnvironmentService.getAwsRegion(),
	});

	/**
	 * Envia uma mensagem para uma Fila do SQS
	 * @param queueName URL da Fila do SQS
	 * @param body Corpo da mensagem
	 * @param delaySeconds Tempo de atraso para envio da mensagem
	 */
	export const sendMessage = async <T>(
		queueName: EQueueName,
		body: T,
		delaySeconds?: number,
	): Promise<boolean> => {
		const queue = queueList.find((q) => q.name === queueName);

		if (!queue) {
			LogService.write(
				ELogLevel.ERROR,
				"AWSSQSService::sendMessage::ERROR",
				`Queue ${queueName} not found in queueList`,
			);
			return false;
		}

		const params: SendMessageCommandInput = {
			QueueUrl: queue.url,
			MessageBody: JSON.stringify(body),
			DelaySeconds: delaySeconds || 0,
		};

		let sendResult = false;

		try {
			LogService.write(ELogLevel.DEBUG, "AWSSQSService::sendMessage", params);

			const command = new SendMessageCommand(params);

			await sqsClient
				.send(command)
				.then((data) => {
					sendResult = true;
					LogService.write(
						ELogLevel.DEBUG,
						"AWSSQSService::sendMessage::SUCCESS",
						data,
					);
				})
				.catch((error) => {
					sendResult = false;
					LogService.write(
						ELogLevel.ERROR,
						"AWSSQSService::sendMessage::ERROR",
						error,
					);
				});

			return sendResult;
		} catch (error) {
			LogService.write(
				ELogLevel.ERROR,
				"AWSSQSService::sendMessage::ERROR",
				error,
			);
			return false;
		}
	};
}
