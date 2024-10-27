export { createEvent, getAttributeNS, setAttributeNS } from '../undom-ng/src/undom-ng.js';
export { Event };
import { Event as UndomEvent } from '../undom-ng/src/undom-ng.js';

const Event = UndomEvent as unknown as typeof globalThis.Event;
