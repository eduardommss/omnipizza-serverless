import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";

import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { ELogLevel } from "../../enums";
import { LogService } from "../../services";

import type { TelegramMessage } from "../../models";

import type schema from "./schema";
const receiveMessage: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = async (event) => {
	LogService.write(
		ELogLevel.DEBUG,
		"Event body received: ",
		JSON.stringify(event.body, undefined, 2),
	);

	try {
		// AWSSQSService.sendMessage(
	} catch (error) {
		LogService.write(ELogLevel.ERROR, "Error sending message: ", error);
	}

	return formatJSONResponse({
		message: `Corpo da mensagem recebida: ${JSON.stringify(event.body, undefined, 2)}`,
		event,
	});
};

export const main = middyfy(receiveMessage);
