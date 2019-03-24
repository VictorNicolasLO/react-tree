import { RouterOptions } from './declarations';
import NotFoundTemplate from './not-found-template';
import nav from './navigator-lib';
import { History } from 'history';

export { createRouter } from './create-router';
export interface Router extends RouterOptions {}
export const NotFound: NotFoundTemplate;
export const navigator: History;
