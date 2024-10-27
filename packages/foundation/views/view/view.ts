import '@nativescript/macos-node-api';
import { view } from '../decorators/view.js';
import { ViewBase } from './view-base.js';

@view({
  name: 'HTMLViewElement',
  tagName: 'view',
})
export class View extends ViewBase {
  override nativeView?: NSView = undefined;
  public override initNativeView(): NSView | undefined {
    this.nativeView = NSView.alloc().init();
    return this.nativeView;
  }

  public override disposeNativeView(): void {
    if (!this.nativeView?.superview) {
      this.nativeView = undefined;
    } else {
      console.warn("Trying to dispose a view that is still attached to it's parent", new Error().stack);
    }
  }
}