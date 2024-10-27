import { native } from '../decorators/native.js';
import type { NativePropertyConfig } from '../decorators/native.js';
import { view } from '../decorators/view.js';
import { ViewBase } from '../view/view-base.js';
import { NativeComboBox, NativeComboBoxDelegate } from './native-combobox.js';

const ItemsProperty: NativePropertyConfig = {
  setNative: (view: ComboBox, _key, value) => {
    if (view.nativeView) {
      view.nativeView.setItems(value);
    }
  },
  shouldLayout: true,
};

@view({
  name: 'HTMLElement',
  tagName: 'combobox',
})
export class ComboBox extends ViewBase {
  declare nativeView?: NativeComboBox;
  selectedIndex?: number;
  delegate?: NativeComboBoxDelegate;

  override get isLeaf(): boolean {
    return true;
  }

  public override initNativeView(): NativeComboBox {
    this.nativeView = NativeComboBox.initWithOwner(new WeakRef(this));
    this.delegate = NativeComboBoxDelegate.initWithOwner(new WeakRef(this.nativeView));
    this.nativeView.delegate = this.delegate;
    this.nativeView.bezelStyle = NSTextFieldBezelStyle.Rounded;
    return this.nativeView;
  }

  @native(ItemsProperty)
  declare items: Array<string>;
}
