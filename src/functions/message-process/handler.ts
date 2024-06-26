import { ELogLevel } from '../../enums'
import { IChat, ITelegramMessage } from '../../models'
import { ChatService, LogService } from '../../services'
import { IMessageService, TelegramMessageServiceAdapter } from '../../services/message'

const messageProcess = async (event) => {
  LogService.write(ELogLevel.INFO, 'messageProcess::Event received: ', JSON.stringify(event, undefined, 2))

  if (!event?.Records) {
    LogService.write(ELogLevel.ERROR, 'messageProcess::ERROR', 'No records found in event body')
    return
  }

  for (const record of event.Records) {
    await process(record)
  }
}

const process = async (record) => {
  try {
    const telegramMessage: ITelegramMessage = JSON.parse(record.body)

    await saveChat(telegramMessage)

    const messageService: IMessageService = new TelegramMessageServiceAdapter()

    const chatId = telegramMessage.message?.chat?.id

    await messageService.sendMessage(chatId, telegramMessage.message.text)
  } catch (error) {
    LogService.write(ELogLevel.ERROR, 'messageProcess::process::Error sending message: ', { record, error })
  }
}

const saveChat = async (telegramMessage: ITelegramMessage) => {
  LogService.write(ELogLevel.INFO, 'messageProcess::saveChat', telegramMessage.message.chat)

  try {
    const chat: IChat = {
      id: telegramMessage.message.chat.id.toString(),
      username: telegramMessage.message.chat.username
    }

    await ChatService.createChat(chat)
  } catch (error) {
    LogService.write(ELogLevel.ERROR, 'messageProcess::saveChat::Error saving chat: ', { telegramMessage, error })
  }
}

export const main = messageProcess
