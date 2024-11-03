import { view } from '../decorators/view.js';
import { MenuItem } from './menu-item.js';

@view({
  name: 'HTMLMenuSectionHeaderElement',
  tagName: 'menu-section-header',
})
export class MenuSectionHeader extends MenuItem {
  declare nativeView: any;
  public initNativeView(): any {
    const separator = NSMenuItem.sectionHeaderWithTitle('');
    this.nativeView = separator;
    return this.nativeView;
  }
}
