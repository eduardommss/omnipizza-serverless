import { handlerPath } from '@libs/handler-resolver'

import { EQueueName } from '../../services/aws'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: {
          'Fn::GetAtt': [EQueueName.QUEUE_RECEIVE_MESSAGE, 'Arn']
        }
      }
    }
  ]
}
