import '@nativescript/macos-node-api';
import { Event } from '../../dom/dom-utils.js';
import { MouseDownEvent } from '../view/native-view.js';
import type { Button } from './button.js';

export class ButtonClickEvent extends Event {
  declare state?: boolean;
  constructor(state: boolean, eventDict?: EventInit) {
    super('click', eventDict);
    this.state = state;
  }
}

@NativeClass
export class NativeButton extends NSButton {
  static ObjCExposedMethods = {
    clicked: { returns: interop.types.void, params: [interop.types.id] },
  };
  _attributedTitle?: NSMutableAttributedString;
  _color?: NSColor;
  _title?: string;
  _owner?: WeakRef<Button>;
  static initWithOwner(owner: WeakRef<Button>) {
    const button = NativeButton.new();
    button._owner = owner;
    return button;
  }

  clicked(_id: this) {
    const owner = this._owner?.deref();
    if (owner) {
      owner.dispatchEvent(new ButtonClickEvent(this.state === NSOnState));
    }
  }

  mouseDown(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseDownEvent(event));
    this.clicked(this);
  }

  otherMouseDown(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseDownEvent(event));
  }

  rightMouseDown(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseDownEvent(event));
  }

  setTitle(title: string) {
    this._title = title;
    this.updateButtonTitleStyle();
  }

  setTitleColor(color: NSColor) {
    this._color = color;
    this.updateButtonTitleStyle();
  }

  updateButtonTitleStyle() {
    if (!this._attributedTitle) {
      this._attributedTitle = NSMutableAttributedString.alloc().init();
    }

    this._attributedTitle.mutableString.setString(this._title || '');
    this._attributedTitle.setAttributesRange(
      {
        [NSForegroundColorAttributeName]: this._color,
      },
      { location: 0, length: this._title?.length || 0 },
    );

    this.attributedTitle = this._attributedTitle;
  }
}
