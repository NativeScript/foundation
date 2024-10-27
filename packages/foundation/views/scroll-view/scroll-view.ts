import '@nativescript/macos-node-api';
import { view } from '../decorators/view.js';
import { View } from '../view/view.js';
import type { YogaNodeLayout } from '../../layout/index.js';

@NativeClass
export class NSScrollViewAutoResizable extends NSScrollView {}

@view({
  name: 'HTMLScrollViewElement',
  tagName: 'scroll-view',
})
export class ScrollView extends View {
  override nativeView?: NSScrollView = undefined;

  public override initNativeView(): NSScrollView | undefined {
    this.nativeView = NSScrollViewAutoResizable.new();
    this.nativeView.hasVerticalScroller = true;
    this.nativeView.hasHorizontalScroller = false;
    this.nativeView.drawsBackground = false;

    return this.nativeView;
  }

  public override addNativeChild(child: any) {
    this.nativeView!.documentView = (child as View).nativeView as NSView;
  }

  public override removeNativeChild(_child: any): void {
    // @ts-expect-error documentView is nullable
    this.nativeView!.documentView = null;
  }

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    this.nativeView!.translatesAutoresizingMaskIntoConstraints = true;
  }
}
