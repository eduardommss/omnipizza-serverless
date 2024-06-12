import { IChat } from '../models'
import { RepositoryBase } from './common/repository-base'

export class ChatRepository extends RepositoryBase<IChat> {
  constructor() {
    super('chat')
  }
}
