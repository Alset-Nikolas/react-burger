import { settings } from '../settings/config';
import { checkResponse } from './check-response';

export const request = (endpoint, options) =>
  fetch(`${settings.burgerApiUrl}${endpoint}`, options).then(checkResponse);
