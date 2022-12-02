import { setupWorker } from 'msw';
import { handlers } from './handlers';
export * from './modules/type';
export var worker = setupWorker.apply(void 0, handlers);
