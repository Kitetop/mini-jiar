import { setupWorker } from 'msw';
import { handlers } from './handlers';

export * from './modules/index.type';
export * from './modules';

export const worker = setupWorker(...handlers);
