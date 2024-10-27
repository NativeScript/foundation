import '@nativescript/macos-node-api';
import { Event } from '../../dom/dom-utils.js';
import { native } from '../decorators/native.js';
import { view } from '../decorators/view.js';
import { View } from '../view/view.js';

export class SliderChangeEvent extends Event {
  declare value?: number;
  constructor(value: number, eventDict?: EventInit) {
    super('sliderChanged', eventDict);
    this.value = value;
  }
}

@NativeClass
export class NSSliderAutoResizable extends NSSlider {
  static ObjCExposedMethods = {
    sliderChanged: { returns: interop.types.void, params: [interop.types.id] },
  };

  static initWithOwner(owner: WeakRef<Slider>) {
    const slider = NSSliderAutoResizable.new();
    slider._owner = owner;
    return slider;
  }

  declare _owner: WeakRef<Slider>;

  sliderChanged(_id: this) {
    const owner = this._owner.deref();
    if (owner) {
      owner.dispatchEvent(new SliderChangeEvent(owner.nativeView?.doubleValue || 0));
    }
  }
}

export type SliderEvents = 'sliderChanged';

@view({
  name: 'HTMLSliderElement',
  tagName: 'slider',
})
export class Slider extends View {
  override get isLeaf(): boolean {
    return true;
  }

  override nativeView?: NSSliderAutoResizable = undefined;
  public override initNativeView(): NSSliderAutoResizable | undefined {
    this.nativeView = NSSliderAutoResizable.initWithOwner(new WeakRef(this));
    this.nativeView.action = 'sliderChanged';
    this.nativeView.target = this.nativeView;
    return this.nativeView;
  }

  @native({
    setNative(view: Slider, _key, value) {
      if (view.nativeView) {
        view.nativeView.numberOfTickMarks = value;
      }
    },
  })
  declare numberOfTickMarks: number;

  @native({
    setNative(view: Slider, _key, value) {
      if (view.nativeView) {
        view.nativeView.allowsTickMarkValuesOnly = value;
      }
    },
  })
  declare allowsTickMarkValuesOnly: boolean;
}
