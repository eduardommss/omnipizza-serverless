import { Bot } from 'grammy'

import { EnvironmentService } from '../environment'
import { IMessageService } from './message.interface'

export class TelegramMessageServiceAdapter implements IMessageService {
  bot = new Bot(EnvironmentService.getTelegramBotToken())

  async sendMessage(to: string, message: string): Promise<void> {
    await this.bot.api.sendMessage(to, message)
  }
}
