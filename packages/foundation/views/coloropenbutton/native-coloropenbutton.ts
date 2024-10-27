import '@nativescript/macos-node-api';
import { openColorDialog } from '../../dialogs/color/color-dialog.js';
import { NativeButton } from '../button/native-button.js';
import type { ColorOpenButton } from './coloropenbutton.js';
import { Event } from '../../dom/dom-utils.js';

export class ColorChosenEvent extends Event {
  declare color?: string | undefined;
  constructor(color: string | undefined, eventDict?: EventInit) {
    super('colorChosen', eventDict);
    this.color = color;
  }
}

@NativeClass
export class NativeColorOpenButton extends NativeButton {
  static ObjCExposedMethods = {
    clicked: { returns: interop.types.void, params: [interop.types.id] },
  };
  static initWithOwner(owner: WeakRef<ColorOpenButton>) {
    const button = NativeColorOpenButton.new();
    button._owner = owner;
    return button;
  }
  declare _owner?: WeakRef<ColorOpenButton>;
  override clicked(_id: this) {
    const owner = this._owner?.deref();
    if (owner) {
      openColorDialog(owner.options || {})
        .then((result) => {
          owner.dispatchEvent(new ColorChosenEvent(result));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
}
