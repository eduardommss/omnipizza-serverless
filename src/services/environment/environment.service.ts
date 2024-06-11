export namespace EnvironmentService {
  /**
   * @description Identifica a variável de ambiente, se null define como 'dev'
   */
  export function getEnvNode(): string {
    return process.env.NODE_ENV || 'dev'
  }

  /**
   * @description Identifica se o ambiente é de produção
   */
  export function isProd(): boolean {
    return getEnvNode() === 'prod' || getEnvNode() === 'production'
  }

  /**
   * @description Identifica se o ambiente é de desenvolvimento
   */
  export function isDev(): boolean {
    return getEnvNode() === 'dev' || getEnvNode() === 'development'
  }

  /**
   * @description Identifica se o ambiente é localhost
   */
  export function isLocalhost(): boolean {
    return getEnvNode() === 'localhost' || getEnvNode() === 'local'
  }

  /**
   * @description retorna a Região AWS
   */
  export function getAwsRegion(): string {
    return process.env.APP_REGION || 'us-east-1'
  }

  /**
   * @description retorna o ID da conta AWS
   */
  export function getAwsAccountId(): string {
    return process.env.AWS_ACCOUNT_ID || '123456789012'
  }

  /**
   * @description Busca o nome da função que está rodando
   */
  export function getAppName(): string {
    return process.env.APP_NAME || 'omnipizza'
  }

  /**
   * @description Retorna o nível de Log
   */
  export function getLogLevel(): string {
    return process.env.APP_LOG_LEVEL || 'DEBUG'
  }

  /**
   * @description Retorna o REDIS_CACHE_DISABLED para desabilitar o cache se setado como true, caso contrário retorna false
   */
  export function isRedisCacheDisabled(): boolean {
    return process.env.REDIS_CACHE_DISABLED === 'true'
  }

  /**
   * @description Retorna o TELEGRAM_BOT_TOKEN
   */
  export function getTelegramBotToken(): string {
    return process.env.TELEGRAM_BOT_TOKEN
  }
}
