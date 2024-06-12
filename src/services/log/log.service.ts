import { ELogLevel } from '../../enums/log.enum'
import { EnvironmentService } from '../environment/environment.service'

export namespace LogService {
  /**
   * Escreve um log no console
   * @param logLevel Nível do log
   * @param context Contexto do log
   * @param args Argumentos
   * @example write(ELogLevel.DEBUG, "Mensagem de debug", { foo: "bar" });
   **/
  export const write = (logLevel: ELogLevel, context: string, args?) => {
    const writeDebugLog = EnvironmentService.getLogLevel() === ELogLevel.DEBUG
    const writeInfoLog = EnvironmentService.getLogLevel() === ELogLevel.INFO || writeDebugLog
    const writeWarnLog = EnvironmentService.getLogLevel() === ELogLevel.WARN || writeInfoLog || writeDebugLog

    if (logLevel === ELogLevel.ERROR) {
      console.error(`[${logLevel}] ${context}`, args)
    } else if (logLevel === ELogLevel.WARN && writeWarnLog) {
      console.warn(`[${logLevel}] ${context}`, args)
    } else if (logLevel === ELogLevel.INFO && writeInfoLog) {
      console.info(`[${logLevel}] ${context}`, args)
    } else if (logLevel === ELogLevel.DEBUG && writeDebugLog) {
      console.debug(`[${logLevel}] ${context}`, args)
    }
  }
}
