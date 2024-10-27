import '@nativescript/macos-node-api';
import { view } from '../decorators/view.js';
import { Image } from '../image/image.js';
import { Text } from '../text/text.js';
import { ViewBase } from '../view/view-base.js';

@view({
  name: 'HTMLTableCellElement',
  tagName: 'table-cell',
})
export class TableCell extends ViewBase {
  nativeView?: NSTableCellView = undefined;

  _isEnabled: boolean = false;

  public initNativeView(): NSTableCellView | undefined {
    this.nativeView = NSTableCellView.new();
    return this.nativeView;
  }

  public addNativeChild(child: Image | Text) {
    if (child.nodeName === 'IMAGE') {
      this.nativeView!.imageView = child.nativeView! as NSImageView;
    } else if (child.nodeName === 'TEXT') {
      this.nativeView!.textField = child.nativeView! as NSTextField;
    }

    this.nativeView!.addSubview(child.nativeView!);
  }

  public removeNativeChild(child: Image | Text): void {
    if (child.nodeName === 'IMAGE') {
      this.nativeView.imageView = null;
    } else if (child.nodeName === 'TEXT') {
      this.nativeView.textField = null;
    }
    child.nativeView?.removeFromSuperview();
  }
}
