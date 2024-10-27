import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedFoundation } from '@demo/shared';
import {} from '@nativescript/foundation';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedFoundation {}
