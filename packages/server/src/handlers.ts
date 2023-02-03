import { userHandlers, projectHandlers } from './modules';

export const handlers = [...userHandlers, ...projectHandlers];
