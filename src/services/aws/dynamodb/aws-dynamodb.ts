import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DeleteCommandInput,
  DeleteCommandOutput,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
  QueryCommand,
  UpdateCommand,
  UpdateCommandInput,
  UpdateCommandOutput
} from '@aws-sdk/lib-dynamodb'

import { ELogLevel } from '../../../enums'
import { LogService } from '../../../services'
import { EnvironmentService } from '../../environment'

export class DynamoDBService {
  private static instance: DynamoDBService
  private dynamoDbClient: DynamoDBClient

  private constructor() {
    this.dynamoDbClient = new DynamoDBClient({ region: EnvironmentService.getAwsRegion() })
  }

  public static getInstance(): DynamoDBService {
    if (!DynamoDBService.instance) {
      DynamoDBService.instance = new DynamoDBService()
    }
    return DynamoDBService.instance
  }

  public async get<T>(params: QueryCommand): Promise<T> {
    const { Items } = await this.dynamoDbClient.send(params)

    LogService.write(ELogLevel.INFO, 'DynamoDBService::get', Items)

    return Items[0] as T
  }

  public async getAll<T>(params: QueryCommand): Promise<T[]> {
    const { Items } = await this.dynamoDbClient.send(params)

    LogService.write(ELogLevel.INFO, 'DynamoDBService::getAll', Items)

    return Items as T[]
  }

  public async put(params: PutCommandInput): Promise<PutCommandOutput> {
    return await this.dynamoDbClient.send(new PutCommand(params))
  }

  public async update(params: UpdateCommandInput): Promise<UpdateCommandOutput> {
    return await this.dynamoDbClient.send(new UpdateCommand(params))
  }

  public async delete(params: DeleteCommandInput): Promise<DeleteCommandOutput> {
    return await this.dynamoDbClient.send(new UpdateCommand(params))
  }
}

export default DynamoDBService
