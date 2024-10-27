import '@nativescript/macos-node-api';
import { createEvent, Event } from '../../dom/dom-utils.js';
import type { Window } from './window.js';
import type { ViewBase } from '../view/view-base.js';

export class WindowResizeEvent extends Event {
  declare width: number;
  declare height: number;

  constructor() {
    super('resize');
  }

  initWindowEvent(type: string, bubbles?: boolean, cancelable?: boolean, width: number = 0, height: number = 0): void {
    this.initEvent(type, bubbles, cancelable);
    this.width = width;
    this.height = height;
  }
}

@NativeClass
export class MainWindowController extends NSWindowController implements NSToolbarDelegate {
  static ObjCProtocols = [NSToolbarDelegate];

  declare _owner: WeakRef<ViewBase>;

  static initWithOwner(owner: WeakRef<ViewBase>) {
    const win = MainWindowController.new();
    win._owner = owner;
    return win;
  }
}

@NativeClass
export class NativeWindow extends NSWindow implements NSWindowDelegate {
  static ObjCProtocols = [NSWindowDelegate];

  public appWindow?: Window;

  windowDidResize(_notification: NSNotification): void {
    const event = new WindowResizeEvent();
    event.initWindowEvent('resize', true, true, this.frame.size.width, this.frame.size.height);
    this.appWindow?.dispatchEvent(event);
  }

  windowDidBecomeKey(_notification: NSNotification): void {
    const event = createEvent('focus');
    this.appWindow?.dispatchEvent(event);
  }

  windowWillClose(_notification: NSNotification): void {
    const event = createEvent('close');
    this.appWindow?.dispatchEvent(event);
  }
}