import { view } from '../decorators/view.js';
import type { FileDialogOptions } from '../../dialogs/file/file-dialog.js';
import { Button } from '../button/button.js';
import { NativeFileOpenButton } from './native-fileopenbutton.js';

@view({
  name: 'HTMLButtonElement',
  tagName: 'fileopenbutton',
})
export class FileOpenButton extends Button {
  options?: FileDialogOptions;

  declare nativeView?: NativeFileOpenButton;

  public override initNativeView(): NativeFileOpenButton {
    this.nativeView = NativeFileOpenButton.initWithOwner(new WeakRef(this));
    return this.nativeView;
  }
}
