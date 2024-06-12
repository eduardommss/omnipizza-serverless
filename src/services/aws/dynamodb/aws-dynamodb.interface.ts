export interface IDynamoDBServiceBase<T> {
  get(id: string): Promise<T>
  getAll(): Promise<T[]>
  put(item: T): Promise<void>
  update(item: T): Promise<void>
  delete(id: string): Promise<void>
}
