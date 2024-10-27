import '@nativescript/macos-node-api';
import { Event } from '../../dom/dom-utils.js';
import { native } from '../decorators/native.js';
import { view } from '../decorators/view.js';
import { TableCell } from '../table/table-cell.js';
import { View } from '../view/view.js';

export class OutlineClickEvent extends Event {
  declare index: number;
  constructor(index: number, eventDict?: EventInit) {
    super('click', eventDict);
    this.index = index;
  }
}

@NativeClass
class OutlineViewDataSource extends NSObject implements NSOutlineViewDataSource, NSOutlineViewDelegate {
  static ObjCProtocols = [NSOutlineViewDataSource, NSOutlineViewDelegate];

  static initWithOwner(owner: WeakRef<Outline>) {
    const dataSource = OutlineViewDataSource.new();
    dataSource._owner = owner;
    return dataSource;
  }

  _owner?: WeakRef<Outline>;

  get outline() {
    return this._owner?.deref();
  }

  outlineViewNumberOfChildrenOfItem(_outlineView: NSOutlineView, item: View | null): number {
    if (item) {
      return item.children.length - 2;
    } else {
      return this.outline!.children.length;
    }
  }

  outlineViewViewForTableColumnItem(_outlineView: NSOutlineView, _tableColumn: NSTableColumn | null, item: TableCell): NSView {
    return item.nativeView!;
  }

  outlineViewIsItemExpandable(_outlineView: NSOutlineView, item: View): boolean {
    return item.children.length > 2;
  }

  outlineViewChildOfItem(_outlineView: NSOutlineView, index: number, item: View | null) {
    if (item) {
      return item.children[index + 2];
    } else {
      return this.outline!.children[index];
    }
  }

  outlineViewObjectValueForTableColumnByItem(_outlineView: NSOutlineView, _tableColumn: NSTableColumn | null, item: interop.Object | null) {
    return item;
  }

  outlineViewSelectionDidChange(notification: NSNotification): void {
    const outlineView = notification.object as NSOutlineView;
    const owner = this.outline;
    if (owner && outlineView) {
      owner.dispatchEvent(new OutlineClickEvent(outlineView.selectedRow));
    }
  }
}

@view({
  name: 'HTMLOutlineElement',
  tagName: 'outline',
})
export class Outline extends View {
  nativeView?: NSOutlineView = undefined;

  dataSource!: OutlineViewDataSource;

  public initNativeView(): NSOutlineView | undefined {
    const outline = NSOutlineView.new();

    this.dataSource = OutlineViewDataSource.initWithOwner(new WeakRef(this));

    outline.headerView = null;
    outline.indentationPerLevel = 10;
    outline.allowsColumnReordering = false;
    outline.allowsColumnResizing = false;
    outline.allowsColumnSelection = false;
    outline.allowsEmptySelection = false;
    outline.rowSizeStyle = NSTableViewRowSizeStyle.Medium;

    outline.delegate = this.dataSource;
    outline.dataSource = this.dataSource;

    const tableColumn = NSTableColumn.alloc().initWithIdentifier('Column');
    outline.addTableColumn(tableColumn);
    outline.outlineTableColumn = tableColumn;

    this.nativeView = outline;

    return this.nativeView;
  }

  @native({
    setNative(view: Outline, _key, value) {
      if (view.nativeView) {
        view.nativeView.indentationPerLevel = value;
      }
    },
  })
  declare identationPerLevel: number;

  @native({
    setNative(view: Outline, _key, value) {
      if (view.nativeView) {
        view.nativeView.rowSizeStyle = value;
      }
    },
  })
  declare rowSizeStyle: (typeof NSTableViewRowSizeStyle)[keyof typeof NSTableViewRowSizeStyle];

  public addNativeChild(_child: any) {
    this.nativeView?.reloadData();
    this.nativeView?.expandItem(_child);
  }

  public removeNativeChild(_child: any): void {
    this.nativeView?.reloadData();
  }
}