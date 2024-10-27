import '@nativescript/macos-node-api';
import type { NativeWindow } from './views/window/native-window.js';
import type { Window } from './views/window/window.js';
objc.import('AppKit');

let CustomAppDelegate: any;

export function setCustomDelegate(customAppDelegate?: any) {
  CustomAppDelegate = customAppDelegate;
}

@NativeClass
class AppDelegate extends NSObject implements NSApplicationDelegate {
  window?: NativeWindow;
  running = true;
  isActive = true;
  static windowTitle: string;
  static ObjCProtocols = [NSApplicationDelegate];

  applicationDidFinishLaunching(_notification: NSNotification) {
    NSApp.activateIgnoringOtherApps(false);
    NSApp.stop(this);
    // Allow users to customize the app's Touch Bar items
    NSApplication.sharedApplication.isAutomaticCustomizeTouchBarMenuItemEnabled = true;
    RunLoop();
  }

  applicationWillTerminate(_notification: NSNotification): void {
    this.running = false;
  }
}

export function RunLoop() {
  let delay = 2;
  let lastEventTime = 0;
  const loop = () => {
    const event = NSApp.nextEventMatchingMaskUntilDateInModeDequeue(NSEventMask.Any, null, 'kCFRunLoopDefaultMode', true);

    const timeSinceLastEvent = Date.now() - lastEventTime;
    if (event != null) {
      NSApp.sendEvent(event);
      delay = timeSinceLastEvent < 32 ? 2 : 8;
      lastEventTime = Date.now();
    } else {
      delay = timeSinceLastEvent > 6000 ? 128 : timeSinceLastEvent > 4000 ? 64 : timeSinceLastEvent > 2000 ? 16 : 8;
    }

    if (NativeScriptApplication.delegate.running) {
      setTimeout(loop, NativeScriptApplication.ensure60FPS ? 8 : delay);
    }
  };
  setTimeout(loop, 0);
}

export class Application {
  static delegate: AppDelegate;
  static application: NSApplication;
  static rootView: HTMLViewElement;
  static window: Window;
  static appMenu: NSMenu;
  static ensure60FPS: boolean;

  static launch() {
    if (!(document.body instanceof HTMLElement)) {
      throw new Error('document.body instance of NSView');
    }
    Application.rootView = document.body as unknown as HTMLViewElement;

    Application.rootView?.connectedCallback();

    if (NativeScriptApplication.window) {
      NativeScriptApplication.window.open();
    } else {
      throw new Error('Window is not initialized');
    }

    Application.application = NSApplication.sharedApplication;
    Application.delegate = typeof CustomAppDelegate !== 'undefined' ? CustomAppDelegate.new() : AppDelegate.new();
    Application.delegate.window = NativeScriptApplication.window.nativeView;
    Application.createMenu();
    NSApp.delegate = Application.delegate;
    NSApp.setActivationPolicy(NSApplicationActivationPolicy.Regular);
    NSApp.run();
  }

  static createMenu() {
    // apps can override this to create cusotm menus
  }
}

declare global {
  var NativeScriptApplication: typeof Application;
}
globalThis.NativeScriptApplication = Application;
