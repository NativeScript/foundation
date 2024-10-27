import { view } from '../decorators/view.js';
import type { SaveFileDialogOptions } from '../../dialogs/file/file-dialog.js';
import { Button } from '../button/button.js';
import { NativeFileSaveButton } from './native-filesavebutton.js';

@view({
  name: 'HTMLButtonElement',
  tagName: 'filesavebutton',
})
export class FileSaveButton extends Button {
  options?: SaveFileDialogOptions;

  declare nativeView?: NativeFileSaveButton;

  public override initNativeView(): NativeFileSaveButton {
    this.nativeView = NativeFileSaveButton.initWithOwner(new WeakRef(this));
    return this.nativeView;
  }
}
