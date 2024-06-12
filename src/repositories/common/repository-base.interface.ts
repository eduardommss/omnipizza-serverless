export interface IRepositoryBase<T> {
  get(id: string): Promise<T>
  getAll(): Promise<T[]>
  create(item: T): Promise<void>
  update(item: T): Promise<void>
  delete(id: string): Promise<void>
}
