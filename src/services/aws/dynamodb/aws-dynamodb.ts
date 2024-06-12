import { DynamoDB } from 'aws-sdk'

export class DynamoDBService {
  private static instance: DynamoDBService
  private dynamoDb: DynamoDB.DocumentClient

  private constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient()
  }

  public static getInstance(): DynamoDBService {
    if (!DynamoDBService.instance) {
      DynamoDBService.instance = new DynamoDBService()
    }
    return DynamoDBService.instance
  }

  public async get<T>(params: DynamoDB.DocumentClient.GetItemInput): Promise<T> {
    const { Item } = await this.dynamoDb.get(params).promise()

    return Item as T
  }

  public async getAll<T>(params: DynamoDB.DocumentClient.ScanInput): Promise<T[]> {
    const { Items } = await this.dynamoDb.scan(params).promise()

    return Items as T[]
  }

  public async put(params: DynamoDB.DocumentClient.PutItemInput): Promise<void> {
    await this.dynamoDb.put(params).promise()
  }

  public async update(params: DynamoDB.DocumentClient.UpdateItemInput): Promise<void> {
    await this.dynamoDb.update(params).promise()
  }

  public async delete(params: DynamoDB.DocumentClient.DeleteItemInput): Promise<void> {
    await this.dynamoDb.delete(params).promise()
  }
}

export default DynamoDBService
