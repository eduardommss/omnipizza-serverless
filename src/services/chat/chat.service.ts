import { IChat } from '../../models'
import { ChatRepository } from '../../repositories'

const chatRepository = new ChatRepository()

export namespace ChatService {
  export async function getChatById(id: string) {
    return await chatRepository.get(id)
  }

  export async function getAllChats() {
    return await chatRepository.getAll()
  }

  export async function createChat(chat: IChat) {
    return await chatRepository.create(chat)
  }

  export async function updateChat(chat: IChat) {
    return await chatRepository.update(chat)
  }

  export async function deleteChat(id: string) {
    return await chatRepository.delete(id)
  }
}
