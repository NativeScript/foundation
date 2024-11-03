import { ViewBase } from '../views/view/view-base.js';
import { View } from '../views/view/view.js';
import type { Slider } from '../views/slider/slider.js';
import type { Progress } from '../views/progress/progress.js';
import type { TextField } from '../views/text-field/text-field.js';
import type { Checkbox } from '../views/checkbox/checkbox.js';
import type { Window } from '../views/window/window.js';
import type { Popover } from '../views/popover/popover.js';
import type { Switch } from '../views/switch/switch.js';
import type { DatePicker } from '../views/date-picker/date-picker.js';

declare global {
  // undom
  var Scope: {
    Node: typeof Node;
    Element: typeof Element;
    Text: typeof Text;
    Comment: typeof Comment;
    Document: typeof Document;
    DocumentFragment: typeof DocumentFragment;
    HTMLElement: typeof HTMLElement;
    EventTarget: typeof EventTarget;
    CharacterData: typeof CharacterData;
  };

  // Defining views as elements is done as following
  interface HTMLViewBaseElement extends ViewBase {}
  var HTMLViewBaseElement: {
    new (): HTMLViewBaseElement;
    prototype: HTMLViewBaseElement;
  };

  interface HTMLViewElement extends View {}
  var HTMLViewElement: {
    new (): HTMLViewElement;
    prototype: HTMLViewBaseElement;
  };

  // Register your view here if needed, this is not required for JSX since JSX Intrinsic elements
  // are registered separately in jsx/index.d.js
  interface HTMlButtonElement extends HTMLViewBaseElement {}

  var HTMlButtonElement: {
    new (): HTMlButtonElement;
    prototype: HTMlButtonElement;
  };

  interface HTMLWindowElement extends Window {}

  var HTMLWindowElement: {
    new (): HTMLWindowElement;
    prototype: HTMLWindowElement;
  };

  interface HTMLScrollViewElement extends View {}

  var HTMLScrollViewElement: {
    new (): HTMLScrollViewElement;
    prototype: HTMLViewBaseElement;
  };

  interface HTMLImageElement extends View {}

  var HTMLImageElement: {
    new (): HTMLImageElement;
    prototype: HTMLImageElement;
  };

  interface HTMLTableCellElement extends View {}

  var HTMLTableCellElement: {
    new (): HTMLTableCellElement;
    prototype: HTMLTableCellElement;
  };

  interface HTMLOutlineElement extends View {}

  var HTMLOutlineElement: {
    new (): HTMLOutlineElement;
    prototype: HTMLOutlineElement;
  };

  interface HTMlTextElement extends Text {}

  var HTMlTextElement: {
    new (): HTMlTextElement;
    prototype: HTMlTextElement;
  };

  interface HTMLSliderElement extends Slider {}
  var HTMLSliderElement: {
    new (): HTMLSliderElement;
    prototype: HTMLSliderElement;
  };

  interface HTMLProgressElement extends Progress {}
  var HTMLProgressElement: {
    new (): HTMLProgressElement;
    prototype: HTMLProgressElement;
  };

  interface HTMLTextFieldElement extends TextField {}
  var HTMLTextFieldElement: {
    new (): HTMLTextFieldElement;
    prototype: HTMLTextFieldElement;
  };

  interface HTMLCheckboxElement extends Checkbox {}
  var HTMLCheckboxElement: {
    new (): HTMLCheckboxElement;
    prototype: HTMLCheckboxElement;
  };

  interface HTMLPopoverElement extends Popover {}
  var HTMLPopoverElement: {
    new (): HTMLPopoverElement;
    prototype: HTMLPopoverElement;
  };

  interface HTMLSwitchElement extends Switch {}
  var HTMLSwitchElement: {
    new (): HTMLSwitchElement;
    prototype: HTMLSwitchElement;
  };

  interface HTMLDatePickerElement extends DatePicker {}
  var HTMLDatePickerElement: {
    new (): HTMLDatePickerElement;
    prototype: HTMLDatePickerElement;
  };

  interface HTMLElementTagNameMap {
    view: HTMLViewElement;
  }

  function registerElement(tagName: string, element: any): void;
  function createElement(tagName: string): Node;

  interface Node {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    updateTextContent?(): void;
  }
}

export {};
