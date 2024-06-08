import { getLogLevel } from "./environment.service";

export enum ELogLevel {
	DEBUG = "DEBUG",
	INFO = "INFO",
	WARN = "WARN",
	ERROR = "ERROR",
}

export const writeLog = (logLevel: ELogLevel, msg: string, args?) => {
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
