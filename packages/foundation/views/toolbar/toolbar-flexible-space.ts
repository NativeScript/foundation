import '@nativescript/macos-node-api';
import { view } from '../decorators/view.js';
import { ViewBase } from '../view/view-base.js';

@view({
  name: 'HTMLToolbarFlexibleSpaceElement',
  tagName: 'toolbar-flexible-space',
})
export class ToolbarFlexibleSpace extends ViewBase {
  override nativeView?: NSToolbarItem = undefined;

  public override initNativeView(): NSToolbarItem | undefined {
    this.nativeView = NSToolbarItem.alloc().initWithItemIdentifier(NSToolbarFlexibleSpaceItemIdentifier);
    return this.nativeView;
  }

  public override disposeNativeView(): void {
    this.nativeView = undefined;
  }
}