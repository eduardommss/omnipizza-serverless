import { EnvironmentService } from '../../environment'
import { EQueueName } from './aws-sqs.enum'

const AWS_REGION = EnvironmentService.getAwsRegion()
const AWS_ACCOUNT_ID = EnvironmentService.getAwsAccountId()

export const queueList = [
  {
    name: EQueueName.QUEUE_RECEIVE_MESSAGE,
    resourceName: 'QueueReceiveMessage',
    url: `https://sqs.${AWS_REGION}.amazonaws.com/${AWS_ACCOUNT_ID}/${EQueueName.QUEUE_RECEIVE_MESSAGE}`
  }
]
