import { Event } from '../../dom/dom-utils.js';
import type { YogaNodeLayout } from '../../layout/index.js';
import { NativeTarget } from '../common/native-target.js';
import { native } from '../decorators/native.js';
import { view } from '../decorators/view.js';
import { ViewBase } from '../view/view-base.js';

export class SwitchClickEvent extends Event {
  declare value?: boolean;
  constructor(state: boolean, eventDict?: EventInit) {
    super('click', eventDict);
    this.value = state;
  }
}

@view({
  name: 'HTMLSwitchElement',
  tagName: 'switch',
})
export class Switch extends ViewBase {
  declare nativeView?: NSSwitch;
  get isLeaf(): boolean {
    return true;
  }
  public initNativeView(): NSSwitch {
    this.nativeView = NSSwitch.alloc().init();
    const target = NativeTarget.initWithAction(() => {
      this.dispatchEvent(new SwitchClickEvent(this.nativeView?.state === NSControlStateValueOn));
    });
    this.nativeView.target = target;
    this.nativeView.action = target.selector;
    this.nativeView.isEnabled = true;
    return this.nativeView;
  }

  @native({
    setNative(view: Switch, key, value) {
      if (view.nativeView) {
        view.nativeView.isContinuous = value;
      }
    },
  })
  declare continuous: boolean;

  @native({
    setNative(view: Switch, key, value) {
      if (view.nativeView) {
        view.nativeView.state = value ? NSControlStateValueOn : NSControlStateValueOff;
      }
    },
  })
  declare value: boolean;

  @native({
    setNative(view: Switch, key, value) {
      if (view.nativeView) {
        view.nativeView.isEnabled = value;
      }
    },
  })
  declare enabled: boolean;

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    if (this.nativeView) {
      this.nativeView.translatesAutoresizingMaskIntoConstraints = true;
    }
  }
}
