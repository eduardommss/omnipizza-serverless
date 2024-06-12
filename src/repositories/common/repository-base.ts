import { DynamoDBService } from '../../services'
import { IRepositoryBase } from './repository-base.interface'

export class RepositoryBase<T> implements IRepositoryBase<T> {
  private readonly dynamoDbService: DynamoDBService

  constructor(private readonly tableName: string) {
    this.dynamoDbService = DynamoDBService.getInstance()
  }

  async get(id: string): Promise<T> {
    const params = {
      TableName: this.tableName,
      Key: { id }
    }

    return await this.dynamoDbService.get<T>(params)
  }

  async getAll(): Promise<T[]> {
    const params = {
      TableName: this.tableName
    }

    return await this.dynamoDbService.getAll<T>(params)
  }

  async put(item: T): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: item
    }

    await this.dynamoDbService.put(params)
  }

  async update(item: T): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: item
    }

    await this.dynamoDbService.put(params)
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { id }
    }

    await this.dynamoDbService.delete(params)
  }
}
