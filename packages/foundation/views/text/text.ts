import { Layout, type YogaNodeLayout } from '../../layout/index.js';
import type { NativePropertyConfig } from '../decorators/native.js';
import { overrides } from '../decorators/overrides.js';
import { view } from '../decorators/view.js';
import { TextBase } from './text-base.js';

@NativeClass
class PaddingTextFieldCell extends NSTextFieldCell {
  paddingTop: number = 0;
  paddingLeft: number = 0;
  paddingBottom: number = 0;
  paddingRight: number = 0;

  cellSizeForBounds(forBounds: CGRect): CGSize {
    const size = super.cellSizeForBounds(forBounds);
    size.height += this.paddingTop + this.paddingBottom;
    size.width += this.paddingLeft + this.paddingRight;
    return size;
  }

  titleRectForBounds(forBounds: CGRect): CGRect {
    const rect = super.titleRectForBounds(forBounds);
    return CGRectInset(rect, this.paddingLeft, this.paddingTop);
  }

  editWithFrameInViewEditorDelegateEvent(rect: CGRect, controlView: NSView, textObj: NSText, delegate: interop.Object | null, event: NSEvent | null): void {
    const insetRect = CGRectInset(rect, this.paddingLeft, this.paddingTop);
    super.editWithFrameInViewEditorDelegateEvent(insetRect, controlView, textObj, delegate, event);
  }

  selectWithFrameInViewEditorDelegateStartLength(rect: CGRect, controlView: NSView, textObj: NSText, delegate: interop.Object | null, selStart: number, selLength: number): void {
    const insetRect = CGRectInset(rect, this.paddingLeft, this.paddingTop);
    super.selectWithFrameInViewEditorDelegateStartLength(insetRect, controlView, textObj, delegate, selStart, selLength);
  }

  drawInteriorWithFrameInView(cellFrame: CGRect, controlView: NSView): void {
    const insetRect = CGRectInset(cellFrame, this.paddingLeft, this.paddingTop);
    super.drawInteriorWithFrameInView(insetRect, controlView);
  }
}

@view({
  name: 'HTMLTextElement',
  tagName: 'text',
})
export class Text extends TextBase {
  declare nativeView?: NSTextField | NSTextView;
  declare nativeCell?: PaddingTextFieldCell;

  public initNativeView(): NSTextField | NSTextView {
    this.nativeView = NSTextField.new();
    this.nativeCell = PaddingTextFieldCell.new();
    this.nativeView.cell = this.nativeCell;
    this.nativeView.lineBreakStrategy = NSLineBreakStrategy.None;
    this.nativeView.lineBreakMode = NSLineBreakMode.WordWrapping;
    return this.nativeView;
  }

  public prepareNativeView(nativeView: NSTextField): void {
    nativeView.isEditable = false;
    // nativeView.isSelectable = false;
    nativeView.drawsBackground = false;
    nativeView.isBordered = false;
    nativeView.isBezeled = false;
  }

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    if (this.nativeView) {
      this.nativeView.translatesAutoresizingMaskIntoConstraints = true;
    }
  }
  updateTextContent() {
    if (this.nativeView) {
      (this.nativeView as NSTextField).stringValue = this.textContent || '';
      Layout.computeAndLayout(this);
    }
  }

  @overrides('padding')
  setPadding(_key: string, value: number = 0, _config: NativePropertyConfig<number>) {
    if (this.nativeCell) {
      this.nativeCell.paddingTop = value;
      this.nativeCell.paddingRight = value;
      this.nativeCell.paddingBottom = value;
      this.nativeCell.paddingLeft = value;
    }
  }

  @overrides('paddingTop')
  setPaddingTop(_key: string, value: number = 0, _config: NativePropertyConfig<number>) {
    if (this.nativeCell) {
      this.nativeCell.paddingTop = value;
    }
    Layout.Setters.paddingTop(this.yogaNode, value);
    Layout.computeAndLayout(this);
  }

  @overrides('paddingRight')
  setPaddingRight(_key: string, value: number = 0, _config: NativePropertyConfig<number>) {
    if (this.nativeCell) {
      this.nativeCell.paddingRight = value;
    }
    Layout.Setters.paddingRight(this.yogaNode, value);
    Layout.computeAndLayout(this);
  }
  @overrides('paddingBottom')
  setPaddingBottom(_key: string, value: number = 0, _config: NativePropertyConfig<number>) {
    if (this.nativeCell) {
      this.nativeCell.paddingBottom = value;
    }
    Layout.Setters.paddingBottom(this.yogaNode, value);
    Layout.computeAndLayout(this);
  }
  @overrides('paddingLeft')
  setPaddingLeft(_key: string, value: number, _config: NativePropertyConfig<number>) {
    if (this.nativeCell) {
      this.nativeCell.paddingLeft = value;
    }
    Layout.Setters.paddingLeft(this.yogaNode, value);
    Layout.computeAndLayout(this);
  }
}
