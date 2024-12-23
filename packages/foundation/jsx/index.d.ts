import { JSX as SolidJSX } from 'npm:solid-js';
import type { ColorDialogOptions } from '../dialogs/color/color-dialog.ts';
import type { FileDialogOptions, SaveFileDialogOptions } from '../dialogs/file/file-dialog.ts';
import { type TextStyle, ViewStyle } from '../style/index.ts';
import type { ButtonClickEvent } from '../views/button/native-button.ts';
import type { ColorChosenEvent } from '../views/coloropenbutton/native-coloropenbutton.ts';
import type { ComboBoxChangeEvent } from '../views/combobox/native-combobox.ts';
import type { DatePickerChangeEvent } from '../native/core/views/date-picker/date-picker.ts';
import type { FileChosenEvent } from '../views/fileopenbutton/native-fileopenbutton.ts';
import type { FileSaveEvent } from '../views/filesavebutton/native-filesavebutton.ts';
import type { ImageErrorEvent, ImageLoadEvent, ImageStretch } from '../views/image/image.ts';
import type { MenuItemClickEvent } from '../views/menu/menu-item.ts';
import type { OutlineViewItemSelectedEvent } from '../native/core/views/outline/outline.ts';
import type { ScrollChangeEvent } from '../views/scroll-view/scroll-view.ts';
import type { SliderChangeEvent } from '../views/slider/slider.ts';
import type { SwitchClickEvent } from '../native/core/views/switch/switch.ts';
import type { TableCellSelectedEvent } from '../views/table/table-cell.ts';
import type { TextChangeEvent, TextSubmitEvent } from '../views/text-field/text-field.ts';
import type { ToolbarGroupSelectedEvent, ToolbarGroupSelectionMode } from '../views/toolbar/toolbar-group.ts';
import type { ToolbarItemClickEvent } from '../views/toolbar/toolbar-item.ts';
import type { MouseDownEvent, MouseDraggedEvent, MouseEnterEvent, MouseLeaveEvent, MouseMoveEvent, MouseUpEvent } from '../native/core/views/view/native-view.ts';
import type { LayoutEvent, LoadedEvent } from '../native/core/views/view/view-base.ts';
import type { LoadFinishedEvent, LoadStartedEvent, WebViewMessageEvent } from '../views/webview/webview.ts';
import { WindowResizeEvent } from '../views/window/native-window.ts';

interface ViewBaseAttributes {
  ref?: unknown | ((e: unknown) => void);
  onLoaded?: (event: LoadedEvent) => void;
  onLayout?: (event: LayoutEvent) => void;
  [name: string]: any;
}

interface ViewAttributes extends ViewBaseAttributes {
  style?: ViewStyle;
  enableSafeAreaPaddings?: boolean;
  onMouseDown?: (event: MouseDownEvent) => void;
  onMouseUp?: (event: MouseUpEvent) => void;
  onMouseEnter?: (event: MouseEnterEvent) => void;
  onMousLeave?: (event: MouseLeaveEvent) => void;
  onMouseDragged?: (event: MouseDraggedEvent) => void;
  onMouseMove?: (event: MouseMoveEvent) => void;
}

interface TextAttributes extends ViewBaseAttributes {
  ref?: unknown | ((e: unknown) => void);
  style?: TextStyle;
  [name: string]: any;
}

interface ButtonAttributes extends TextAttributes {
  title?: string;
  /**
   * NSBezelStyle
   */
  bezelStyle?: number;
  /**
   * NSButtonType
   */
  buttonType?: number;
  /**
   * SF Symbol name
   */
  icon?: string;
  image?: string;
  onClick?: (event: ButtonClickEvent) => void;
  onMouseDown?: (event: MouseDownEvent) => void;
}

interface ColorOpenButtonAttributes extends ButtonAttributes {
  options?: ColorDialogOptions;
  onColorChosen?: (event: ColorChosenEvent) => void;
}

interface ComboBoxAttributes extends ViewAttributes {
  items?: Array<string>;
  selectedIndex?: number;
  onChange?: (event: ComboBoxChangeEvent) => void;
}

interface FileOpenButtonAttributes extends ButtonAttributes {
  options?: FileDialogOptions;
  onFileChosen?: (event: FileChosenEvent) => void;
}

interface FileSaveButtonAttributes extends ButtonAttributes {
  options?: SaveFileDialogOptions;
  onFileSave?: (event: FileSaveEvent) => void;
}

interface ImageAttributes {
  src?: string | URL;
  symbol?: string;
  ref?: unknown | ((e: unknown) => void);
  style?: TextStyle;
  stretch?: ImageStretch;
  onLoad?: (event: ImageLoadEvent) => void;
  onError?: (event: ImageErrorEvent) => void;
  [name: string]: any;
}

interface OutlineAttributes extends ViewAttributes {
  onItemSelected?: (item: OutlineViewItemSelectedEvent) => void;
}

interface ScrollViewAtributes extends ViewAttributes {
  documentViewStyle?: ViewStyle;
  horizontal?: boolean;
  onScroll?: (event: ScrollChangeEvent) => void;
  /**
   * Disable default document view. When set to false, the scroll-view expects a single direct child which becomes the documentView
   */
  disableDefaultDocumentView?: boolean;
}

interface SliderAttributes extends ViewAttributes {
  numberOfTickMarks?: number;
  allowsTickMarkValuesOnly?: boolean;
  value?: number;
  maxValue?: number;
  minValue?: number;
  incrementValue?: number;
  type?: 'linear' | 'circular';
  onSliderChanged?: (event: SliderChangeEvent) => void;
}

interface SplitViewAttributes extends ViewAttributes {
  vertical?: boolean;
}

interface SplitViewItemAttributes extends ViewBaseAttributes {
  style?: ViewStyle;
  minWidth?: number;
  maxWidth?: number;
}

interface WindowAttributes extends ViewAttributes {
  title?: string;
  subtitle?: string;
  transparentTitleBar?: boolean;
  /**
   * NSWindowStyleMask
   */
  styleMask?: number;
  isReleasedWhenClosed?: boolean;
  onResize?: (event: WindowResizeEvent) => void;
  onClose?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  [name: string]: any;
}

interface WebviewAttributes extends ViewAttributes {
  ref?: HTMLWebViewElement | ((e: HTMLWebViewElement) => void);
  src?: string | URL;
  messagingEnabled?: boolean;
  debug?: boolean;
  onLoadStarted?: (event: LoadStartedEvent) => void;
  onLoadFinished?: (event: LoadFinishedEvent) => void;
  onMessage?: (event: WebViewMessageEvent) => void;
}

interface ProgressAttributes extends ViewAttributes {
  progress?: number;
  indeterminate?: boolean;
  minValue?: number;
  maxValue?: number;
  type?: 'bar' | 'spinner';
  size?: 'small' | 'regular' | 'large' | 'mini';
}

interface SwitchAttributes extends ViewAttributes {
  value?: boolean;
  onClick?: (event: SwitchClickEvent) => void;
  continuous?: boolean;
  enabled?: boolean;
}

interface ToolbarItemAttributes {
  onClick?: (event: ToolbarItemClickEvent) => void;
  label?: string;
  paletteLabel?: string;
  title?: string;
  toolTip?: string;
  bordered?: boolean;
  navigational?: boolean;
  enabled?: boolean;
  [name: string]: any;
}

interface ToolbarGroupAttributes extends ToolbarItemAttributes {
  onSelected?: (event: ToolbarGroupSelectedEvent) => void;
  selectedIndex?: number;
  selectionMode?: ToolbarGroupSelectionMode;
  titles?: string[];
}

interface ToolbarSidebarTrackingSeparatorAttributes {}

interface ToolbarToggleSidebarAttributes {}

interface ToolbarFlexibleSpaceAttributes {}

interface ToolbarSpaceAttributes {}

interface ToolbarAttributes {
  [name: string]: any;
}

interface TableCellAttributes extends ViewAttributes {
  selected?: boolean;
  identifier?: string;
  onSelected?: (event: TableCellSelectedEvent) => void;
}

interface TextFieldAttributes extends TextAttributes {
  onTextChange?: (event: TextChangeEvent) => void;
  onSubmit?: (event: TextSubmitEvent) => void;
  placeholder?: string;
  editable?: boolean;
  multiline?: boolean;
  defaultValue?: string;
  value?: string;
}

interface TextViewAttributes extends TextAttributes {
  onTextChange?: (event: TextChangeEvent) => void;
  editable?: boolean;
  selectable?: boolean;
  richText?: boolean;
  defaultValue?: string;
  value?: string;
}

interface CheckboxAttributes extends ButtonAttributes {
  checked?: boolean;
}

interface MenuAttributes extends ViewAttributes {
  ref: HTMLNSMenuElement | ((e: HTMLNSMenuElement) => void);
  title?: string;
  attachToMainMenu?: boolean;
}

interface MenuItemAttributes extends ViewAttributes {
  title?: string;
  icon?: string;
  shortcutKey?: string;
  state?: 'on' | 'off' | 'mixed';
  onIcon?: string;
  offIcon?: string;
  mixedIcon?: string;
  enabled?: boolean;
  isHidden?: boolean;
  onClick?: (event: MenuItemClickEvent) => void;
}

interface MenuSeperatorAttributes extends ViewAttributes {}

interface MenuSectionHeaderAttributes extends ViewAttributes {
  title?: string;
}

interface StaturBarAttributes extends ViewAttributes {
  title?: string;
}

interface PopoverAttributes extends ViewAttributes {
  animates?: boolean;
  behavior?: number;
}

interface DatePickerAttributes extends ViewAttributes {
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateChange?: (date: DatePickerChangeEvent) => void;
  datePickerStyle?: 'textFieldAndStepper' | 'clockAndCalendar' | 'textField';
  datePickerElements?: number;
  datePickerMode?: 'single' | 'range';
}

// Define elements here
interface JSXIntrinsicElements {
  button: ButtonAttributes;
  checkbox: CheckboxAttributes;
  coloropenbutton: ColorOpenButtonAttributes;
  combobox: ComboBoxAttributes;
  'content-list': SplitViewItemAttributes;
  fileopenbutton: FileOpenButtonAttributes;
  filesavebutton: FileSaveButtonAttributes;
  image: ImageAttributes;
  outline: OutlineAttributes;
  'scroll-view': ScrollViewAtributes;
  'side-bar': SplitViewItemAttributes;
  slider: SliderAttributes;
  'split-view': SplitViewAttributes;
  'table-cell': TableCellAttributes;
  text: TextAttributes;
  view: ViewAttributes;
  webview: WebviewAttributes;
  window: WindowAttributes;
  progress: ProgressAttributes;
  radiobutton: ButtonAttributes;
  'toolbar-item': ToolbarItemAttributes;
  toolbar: ToolbarAttributes;
  'toolbar-sidebar-tracking-separator': ToolbarSidebarTrackingSeparatorAttributes;
  'toolbar-toggle-sidebar': ToolbarToggleSidebarAttributes;
  'toolbar-flexible-space': ToolbarFlexibleSpaceAttributes;
  'toolbar-group': ToolbarGroupAttributes;
  'toolbar-space': ToolbarSpaceAttributes;
  'text-field': TextFieldAttributes;
  'text-view': TextViewAttributes;
  menu: MenuAttributes;
  'menu-item': MenuItemAttributes;
  'menu-separator': MenuSeperatorAttributes;
  'menu-section-header': MenuSectionHeaderAttributes;
  'status-bar': StaturBarAttributes;
  popover: PopoverAttributes;
  switch: SwitchAttributes;
  'date-picker': DatePickerAttributes;
}

export namespace JSX {
  export interface IntrinsicElements extends JSXIntrinsicElements {}

  export interface IntrinsicElements {
    // allow arbitrary native elements and props
    // @ts-ignore suppress ts:2374 = Duplicate string index signature.
    [name: string]: any;
  }

  export function mapElementTag<K extends keyof IntrinsicElements>(tag: K): IntrinsicElements[K];

  export function createElement<Element extends IntrinsicElements, Key extends keyof IntrinsicElements>(element: Key | undefined | null, attrs: Element[Key]): Element[Key];

  export function createElement<Element extends IntrinsicElements, Key extends keyof IntrinsicElements, T>(element: Key | undefined | null, attrsEnhancers: T, attrs: Element[Key] & T): Element[Key];

  export type Element = SolidJSX.Element;
  export interface ArrayElement extends Array<Element> {}

  export interface FunctionElement {
    (): Element;
  }

  interface IntrinsicAttributes {
    ref?: unknown | ((e: unknown) => void);
  }

  export interface ElementClass {
    // empty, libs can define requirements downstream
  }
  export interface ElementAttributesProperty {
    // empty, libs can define requirements downstream
  }
  export interface ElementChildrenAttribute {
    children: {};
  }

  interface ArrayElement extends Array<Element> {}

  type Accessor<T> = () => T;

  interface CustomEvents {}
  interface CustomCaptureEvents {}
}

declare global {
  namespace JSX {
    export interface IntrinsicElements extends JSXIntrinsicElements {}

    export interface IntrinsicElements {
      // allow arbitrary elements
      // @ts-ignore suppress ts:2374 = Duplicate string index signature.
      [name: string]: any;
    }

    export function mapElementTag<K extends keyof IntrinsicElements>(tag: K): IntrinsicElements[K];

    export function createElement<Element extends IntrinsicElements, Key extends keyof IntrinsicElements>(element: Key | undefined | null, attrs: Element[Key]): Element[Key];

    export function createElement<Element extends IntrinsicElements, Key extends keyof IntrinsicElements, T>(element: Key | undefined | null, attrsEnhancers: T, attrs: Element[Key] & T): Element[Key];

    export type Element = SolidJSX.Element;
    export interface ArrayElement extends Array<Element> {}

    export interface FunctionElement {
      (): Element;
    }

    interface IntrinsicAttributes {
      ref?: unknown | ((e: unknown) => void);
    }

    export interface ElementClass {
      // empty, libs can define requirements downstream
    }
    export interface ElementAttributesProperty {
      // empty, libs can define requirements downstream
    }
    export interface ElementChildrenAttribute {
      children: {};
    }

    interface ArrayElement extends Array<Element> {}

    type Accessor<T> = () => T;

    interface CustomEvents {}
    interface CustomCaptureEvents {}
  }
}

declare function Fragment(props: { children: JSX.Element }): JSX.Element;
declare function jsx(type: any, props: any): () => any;
export { Fragment, jsx, jsx as jsxDEV, jsx as jsxs };
