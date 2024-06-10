import {
	SendMessageCommand,
	SendMessageCommandInput,
	SQSClient,
} from "@aws-sdk/client-sqs";

import { ELogLevel } from "../enums";
import { getAwsRegion } from "./environment.service";
import { LogService } from "./log";

export namespace AWSSQSService {
	const sqsClient: SQSClient = new SQSClient({
		region: getAwsRegion(),
	});

	/**
	 * Envia uma mensagem para uma Fila do SQS
	 * @param queue URL da Fila do SQS
	 * @param body Corpo da mensagem
	 * @param delaySeconds Tempo de atraso para envio da mensagem
	 */
	export const sendMessage = async <T>(
		queue: string,
		body: T,
		delaySeconds?: number,
	): Promise<boolean> => {
		const params: SendMessageCommandInput = {
			QueueUrl: queue,
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
