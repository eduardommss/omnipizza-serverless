import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'

import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import { ELogLevel } from '../../enums'
import { LogService } from '../../services'
import { AWSSQSService } from '../../services/aws'
import { EQueueName } from '../../services/aws/sqs'

import type schema from './schema'

const receiveMessage: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  LogService.write(ELogLevel.DEBUG, 'Event received: ', JSON.stringify(event, undefined, 2))
  LogService.write(ELogLevel.DEBUG, 'Event body received: ', JSON.stringify(event.body, undefined, 2))

  try {
    await AWSSQSService.sendMessage(EQueueName.QUEUE_RECEIVE_MESSAGE, event.body)
  } catch (error) {
    LogService.write(ELogLevel.ERROR, 'Error sending message: ', error)
  }

  return formatJSONResponse({
    message: `Corpo da mensagem recebida: ${JSON.stringify(event.body, undefined, 2)}`,
    event
  })
}

export const main = middyfy(receiveMessage)
