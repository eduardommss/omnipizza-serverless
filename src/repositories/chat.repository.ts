import { IChat } from '../models'
import { RepositoryBase } from './common/repository-base'

export class ChatRepository extends RepositoryBase<IChat> {
  constructor() {
    super('chat')
  }

  async getChatById(id: string): Promise<IChat> {
    return await this.get(id)
  }

  async getAllChats(): Promise<IChat[]> {
    return await this.getAll()
  }

  async createChat(chat: IChat): Promise<void> {
    await this.put(chat)
  }

  async updateChat(chat: IChat): Promise<void> {
    await this.update(chat)
  }

  async deleteChat(id: string): Promise<void> {
    await this.delete(id)
  }
}
