import { LoggerConfig, NgxLoggerLevel } from 'ngx-logger';
import { LTZ, Chain, tLTZ } from '../app/types/chains';

const loggingSettings: LoggerConfig = {
  serverLoggingUrl: '/api/logs/insight',
  level: NgxLoggerLevel.DEBUG,
  serverLogLevel: NgxLoggerLevel.ERROR
};

const initialChain: Chain = LTZ;

const expectedChains: Chain[] = [LTZ, tLTZ];

export const environment = {
  apiPrefix: 'https://api.litecoinz.org/api',
  ratesApi: 'https://rates.litecoinz.org',
  production: true,
  loggingSettings,
  initialDisplayValueCode: initialChain.code,
  initialChain,
  expectedChains
};
