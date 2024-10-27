import { view } from '../decorators/view.js';
import { Button } from '../button/button.js';
import { NativeColorOpenButton } from './native-coloropenbutton.js';
import type { ColorDialogOptions } from '../../dialogs/color/color-dialog.js';

@view({
  name: 'HTMLButtonElement',
  tagName: 'coloropenbutton',
})
export class ColorOpenButton extends Button {
  options?: ColorDialogOptions;

  declare nativeView?: NativeColorOpenButton;

  public override initNativeView(): NativeColorOpenButton {
    this.nativeView = NativeColorOpenButton.initWithOwner(new WeakRef(this));
    return this.nativeView;
  }

  public override prepareNativeView(nativeView: NativeColorOpenButton): void {
    nativeView.target = this.nativeView;
    nativeView.action = 'clicked';
    nativeView.bezelStyle = NSBezelStyle.Automatic;
  }
}
