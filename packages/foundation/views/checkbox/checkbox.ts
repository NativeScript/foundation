import { Button } from '../button/button.js';
import { NativeButton } from '../button/native-button.js';
import { native } from '../decorators/native.js';
import { view } from '../decorators/view.js';

@view({
  name: 'HTMLButtonElement',
  tagName: 'checkbox',
})
export class Checkbox extends Button {
  public override prepareNativeView(nativeView: NativeButton): void {
    super.prepareNativeView(nativeView);
    nativeView.setButtonType(NSButtonType.Switch);
    nativeView.title = '';
  }

  public isChecked(): boolean {
    return this.nativeView?.state === NSControlStateValueOn;
  }

  @native({
    setNative: (view: Checkbox, key, value) => {
      if (view.nativeView) {
        view.nativeView.state = value ? NSControlStateValueOn : NSControlStateValueOff;
      }
    },
  })
  declare checked: boolean;
}
