import { ELogLevel } from '../../enums'
import { LogService } from '../../services'
import { IMessageService, TelegramMessageServiceAdapter } from '../../services/message'

const messageProcess = async (event) => {
  LogService.write(ELogLevel.DEBUG, 'Event received: ', JSON.stringify(event, undefined, 2))
  LogService.write(ELogLevel.DEBUG, 'Event body received: ', JSON.stringify(event.body, undefined, 2))

  try {
    const messageService: IMessageService = new TelegramMessageServiceAdapter()

    const chatId = (event.body.message as any).chat.id as string

    await messageService.sendMessage(chatId, (event.body.message as any).text)
  } catch (error) {
    LogService.write(ELogLevel.ERROR, 'Error sending message: ', error)
  }
}

export const main = messageProcess
