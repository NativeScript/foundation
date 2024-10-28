import '@nativescript/macos-node-api';
import { view } from '../decorators/view.js';
import { NativeView } from './native-view.js';
import { ViewBase } from './view-base.js';

@view({
  name: 'HTMLViewElement',
  tagName: 'view',
})
export class View extends ViewBase {
  override nativeView?: NSView = undefined;
  public override initNativeView(): NSView | undefined {
    //@ts-ignore
    this.nativeView = NativeView.new();
    return this.nativeView;
  }
}
