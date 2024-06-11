import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'

import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import { TelegramMessageServiceAdapter } from '../../services/message'

import type schema from './schema'
const messageProcess: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('Message: ', JSON.stringify(event.body, undefined, 2))

  try {
    const telegramMessageService = new TelegramMessageServiceAdapter()

    const chatId = (event.body.message as any).chat.id as string

    await telegramMessageService.sendMessage(chatId, (event.body.message as any).text)
  } catch (error) {
    console.error('Error sending message: ', error)
  }

  return formatJSONResponse({
    message: `Corpo da mensagem recebida: ${JSON.stringify(event.body, undefined, 2)}`,
    event
  })
}

export const main = middyfy(messageProcess)
