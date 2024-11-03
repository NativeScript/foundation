import { view } from '../decorators/view.js';
import { MenuItem } from './menu-item.js';

@view({
  name: 'HTMLMenuSeparatorElement',
  tagName: 'menu-separator',
})
export class MenuSeparator extends MenuItem {
  declare nativeView: any;
  public initNativeView(): any {
    const separator = NSMenuItem.separatorItem();
    this.nativeView = separator;
    return this.nativeView;
  }
}
