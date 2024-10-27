import '@nativescript/macos-node-api';
import { view } from '../decorators/view.js';
import { ViewBase } from '../view/view-base.js';

@view({
  name: 'HTMLToolbarSpaceElement',
  tagName: 'toolbar-space',
})
export class ToolbarSpace extends ViewBase {
  override nativeView?: NSToolbarItem = undefined;

  public override initNativeView(): NSToolbarItem | undefined {
    this.nativeView = NSToolbarItem.alloc().initWithItemIdentifier(NSToolbarSpaceItemIdentifier);
    return this.nativeView;
  }

  public override disposeNativeView(): void {
    this.nativeView = undefined;
  }
}
