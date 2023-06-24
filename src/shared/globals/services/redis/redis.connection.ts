import Logger from 'bunyan';
import { logger } from '@configs/configLogs';
import { BaseCache } from './base.cache';

const log: Logger = logger.createLogger('redisConnection');
// Design Pattern Singleton: https://refactoring.guru/es/design-patterns/singleton
class RedisConnection extends BaseCache {
  constructor() {
    super('redisConnection');
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      log.info(`Redis connection: ${await this.client.ping()}`);
    } catch (error) {
      log.error(error);
    }
  }
}

export const redisConnection: RedisConnection = new RedisConnection();
