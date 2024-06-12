interface IMessage {
  message_id: number
  from: IUser
  chat: IUser
  date: number
  text: string
  entities: IEntity[]
}

interface IUser {
  id: number
  is_bot: boolean
  first_name: string
  last_name?: string // Optional last_name
  username: string
  language_code: string
}

interface IEntity {
  offset: number
  length: number
  type: string
}

export interface ITelegramMessage {
  update_id: number
  message: IMessage
}
