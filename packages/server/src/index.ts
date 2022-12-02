import { setupWorker } from 'msw';
import { handlers } from './handlers';

export * from './modules/type';

export const worker = setupWorker(...handlers);
