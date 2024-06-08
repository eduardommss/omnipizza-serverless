import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { Bot } from "grammy";

import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import type { TelegramMessage } from "../../models";

import type schema from "./schema";
const receiveMessage: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = async (event) => {
	console.log(
		"Event body received: ",
		JSON.stringify(event.body, undefined, 2),
	);

	try {
		const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
		const body = event.body as unknown as TelegramMessage;

		bot.api.sendMessage(body.message.chat.id, body.message.text);
	} catch (error) {
		console.error("Error sending message: ", error);
	}

	return formatJSONResponse({
		message: `Corpo da mensagem recebida: ${JSON.stringify(event.body, undefined, 2)}`,
		event,
	});
};

export const main = middyfy(receiveMessage);
