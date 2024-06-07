import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import type schema from "./schema";

const receiveMessage: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = async (event) => {
	return formatJSONResponse({
		message: `Corpo da mensagem recebida: ${JSON.stringify(event.body, undefined, 2)}`,
		event,
	});
};

export const main = middyfy(receiveMessage);
