import { view } from '../decorators/view.js';
import { NativeButton } from '../button/native-button.js';
import { Button } from '../button/button.js';

@view({
  name: 'HTMLButtonElement',
  tagName: 'checkbox',
})
export class Checkbox extends Button {
  public override prepareNativeView(nativeView: NativeButton): void {
    super.prepareNativeView(nativeView);
    nativeView.setButtonType(NSButtonType.Switch);
  }
}
