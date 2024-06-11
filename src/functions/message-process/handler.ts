import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'

import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import { ELogLevel } from '../../enums'
import { LogService } from '../../services'
import { IMessageService, TelegramMessageServiceAdapter } from '../../services/message'

import type schema from './schema'
const messageProcess: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  LogService.write(ELogLevel.DEBUG, 'Event body received: ', JSON.stringify(event.body, undefined, 2))

  try {
    const messageService: IMessageService = new TelegramMessageServiceAdapter()

    const chatId = (event.body.message as any).chat.id as string

    await messageService.sendMessage(chatId, (event.body.message as any).text)
  } catch (error) {
    console.error('Error sending message: ', error)
  }

  return formatJSONResponse({
    message: `Corpo da mensagem recebida: ${JSON.stringify(event.body, undefined, 2)}`,
    event
  })
}

export const main = middyfy(messageProcess)
