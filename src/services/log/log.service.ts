import { ELogLevel } from "../../enums/log.enum";
import { getLogLevel } from "../environment/environment.service";

export namespace LogService {
	/**
	 * Escreve um log no console
	 * @param logLevel Nível do log
	 * @param msg Mensagem
	 * @param args Argumentos
	 * @returns void
	 * @example writeLog(ELogLevel.DEBUG, "Mensagem de debug", { foo: "bar" });
	 **/
	export const write = (logLevel: ELogLevel, msg: string, args?) => {
		const writeDebugLog = getLogLevel() === ELogLevel.DEBUG;

		if (logLevel === ELogLevel.ERROR) {
			console.error(`[${logLevel}] ${msg}`, args);
		} else if (logLevel === ELogLevel.WARN) {
			console.warn(`[${logLevel}] ${msg}`, args);
		} else if (logLevel === ELogLevel.INFO) {
			console.info(`[${logLevel}] ${msg}`, args);
		} else if (logLevel === ELogLevel.DEBUG && writeDebugLog) {
			console.debug(`[${logLevel}] ${msg}`, args);
		}
	};
}
