import { native } from '../decorators/native.js';
import { view } from '../decorators/view.js';
import { LayoutEvent, ViewBase } from '../view/view-base.js';
import type { ContentList } from './content-list.js';
import type { SideBar } from './sidebar.js';
import { SplitViewController } from './split-view-controller.js';

@view({
  name: 'HTMLSplitViewElement',
  tagName: 'split-view',
})
export default class SplitView extends ViewBase {
  declare viewController?: SplitViewController;
  nativeView?: NSSplitView = undefined;
  isPresented: boolean = false;

  /**
   * SplitView is instead added as a subview to the current viewController's view.
   */
  public override shouldAttachToParentNativeView: boolean = false;

  // Disable yoga layout for SplitView. SplitView must resize it's
  // direct childern using AutoLayout.
  override _isEnabled: boolean = false;

  public override initNativeView(): NSSplitView | undefined {
    this.viewController = SplitViewController.new();
    this.nativeView = this.viewController.splitView;
    this.viewController._owner = new WeakRef(this);
    return this.nativeView;
  }

  public override addNativeChild(child: SideBar | ContentList): void {
    if (child.splitViewItem && child.nativeView && child.viewController) {
      this.viewController?.addSplitViewItem(child.splitViewItem);
    }
  }

  public override removeNativeChild(child: SideBar | ContentList): void {
    if (child.splitViewItem && child.viewController) {
      this.viewController?.removeSplitViewItem(child.splitViewItem);
    }
  }

  override insertBefore<T extends Node>(node: T, child: Node | null): T {
    if (node.nodeName === 'SIDE-BAR' || node.nodeName === 'CONTENT-LIST' || node.nodeName === 'SPLIT-VIEW-ITEM') {
      super.insertBefore(node, child);
      return node;
    } else {
      throw new Error(`Cannot add ${node.nodeName} as child to SplitView.SplitView can only have side-bar and content-list as children.`);
    }
  }

  override applyLayout(): void {
    if (this.nativeView && this.viewController?.view && this.parentNode?.nativeView) {
      this.viewController.view.frame = this.parentNode.nativeView.frame;
      this.dispatchEvent(
        new LayoutEvent({
          left: this.viewController.view.frame.origin.x,
          top: this.viewController.view.frame.origin.y,
          width: this.viewController.view.frame.size.width,
          height: this.viewController.view.frame.size.height,
        }),
      );

      if (!this.isPresented) {
        this.isPresented = true;
        this.presentViewController();
      }
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
  }

  presentViewController() {
    if (this.parentNode?.nodeName === 'WINDOW') {
      // Make splitview the contentViewController of the current window.
      this.parentNode.nativeView.contentViewController = this.viewController;
      this.parentNode.viewController = this.viewController;
      return;
    }

    const parentViewController = (this.parentNode as ViewBase)?.viewController;
    if (this.viewController && parentViewController) {
      parentViewController?.addChildViewController(this.viewController);
      parentViewController?.presentViewControllerAnimator(this.viewController, this.viewController);
    }
  }

  @native({
    setNative: (view: SplitView, _key, value) => {
      if (view.nativeView) {
        view.nativeView.isVertical = value;
      }
    },
  })
  declare vertical: boolean;
}
