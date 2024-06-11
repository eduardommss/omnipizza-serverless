export interface IMessageService {
  sendMessage(to: any, message: string): Promise<void>
}
