import '@nativescript/macos-node-api';
import { view } from '../decorators/view.js';
import { ViewBase } from '../view/view-base.js';

@view({
  name: 'HTMLToolbarToggleSidebarElement',
  tagName: 'toolbar-toggle-sidebar',
})
export class ToolbarToggleSidebar extends ViewBase {
  override nativeView?: NSToolbarItem = undefined;

  public override initNativeView(): NSToolbarItem | undefined {
    this.nativeView = NSToolbarItem.alloc().initWithItemIdentifier(NSToolbarToggleSidebarItemIdentifier);
    return this.nativeView;
  }

  public override disposeNativeView(): void {
    this.nativeView = undefined;
  }
}
