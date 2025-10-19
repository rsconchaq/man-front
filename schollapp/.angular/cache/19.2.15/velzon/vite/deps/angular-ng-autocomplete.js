import {
  DefaultValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-XSYELPUF.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-WWWOAELD.js";
import "./chunk-PZXV3NIF.js";
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  Pipe,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-NF52DVN7.js";
import {
  fromEvent
} from "./chunk-OKKFPXIG.js";
import "./chunk-BRF755KY.js";
import {
  debounceTime,
  filter,
  map
} from "./chunk-BJIUIRBV.js";
import "./chunk-IYEYSCYL.js";
import {
  __spreadValues
} from "./chunk-SXK72SKC.js";

// node_modules/angular-ng-autocomplete/fesm2020/angular-ng-autocomplete.mjs
var _c0 = ["searchInput"];
var _c1 = ["filteredListElement"];
var _c2 = ["historyListElement"];
var _c3 = (a0) => ({
  "active": a0
});
var _c4 = (a0, a1) => ({
  "is-hidden": a0,
  "is-visible": a1
});
var _c5 = (a0) => ({
  $implicit: a0
});
function AutocompleteComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 14);
    ɵɵlistener("click", function AutocompleteComponent_div_4_Template_div_click_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.remove($event));
    });
    ɵɵelementStart(1, "i", 15);
    ɵɵtext(2, "close");
    ɵɵelementEnd()();
  }
}
function AutocompleteComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 16);
    ɵɵelement(1, "div", 17)(2, "div", 18)(3, "div", 19)(4, "div", 20)(5, "div", 21)(6, "div", 22)(7, "div", 23)(8, "div", 24)(9, "div", 25)(10, "div", 26)(11, "div", 27)(12, "div", 28);
    ɵɵelementEnd();
  }
}
function AutocompleteComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 29)(1, "div", 30);
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.heading);
  }
}
function AutocompleteComponent_li_10_div_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AutocompleteComponent_li_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 33);
    ɵɵlistener("click", function AutocompleteComponent_li_10_div_1_Template_div_click_0_listener() {
      ɵɵrestoreView(_r4);
      const item_r5 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.select(item_r5));
    });
    ɵɵtemplate(1, AutocompleteComponent_li_10_div_1_ng_container_1_Template, 1, 0, "ng-container", 34);
    ɵɵpipe(2, "highlight");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    const item_r5 = ctx_r5.$implicit;
    const idx_r7 = ctx_r5.index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassProp("complete-selected", idx_r7 === ctx_r2.selectedIdx);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(7, _c5, ɵɵpipeBind2(2, 4, item_r5, ctx_r2.toHighlight)));
  }
}
function AutocompleteComponent_li_10_div_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AutocompleteComponent_li_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 33);
    ɵɵlistener("click", function AutocompleteComponent_li_10_div_2_Template_div_click_0_listener() {
      ɵɵrestoreView(_r8);
      const item_r5 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.select(item_r5));
    });
    ɵɵtemplate(1, AutocompleteComponent_li_10_div_2_ng_container_1_Template, 1, 0, "ng-container", 34);
    ɵɵpipe(2, "highlight");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    const item_r5 = ctx_r5.$implicit;
    const idx_r7 = ctx_r5.index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassProp("complete-selected", idx_r7 === ctx_r2.selectedIdx);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(8, _c5, ɵɵpipeBind3(2, 4, item_r5, ctx_r2.toHighlight, ctx_r2.searchKeyword)));
  }
}
function AutocompleteComponent_li_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 31);
    ɵɵtemplate(1, AutocompleteComponent_li_10_div_1_Template, 3, 9, "div", 32)(2, AutocompleteComponent_li_10_div_2_Template, 3, 10, "div", 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.isTypeString(item_r5));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.isTypeString(item_r5));
  }
}
function AutocompleteComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 29)(1, "div", 30);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 14);
    ɵɵlistener("click", function AutocompleteComponent_div_12_Template_div_click_3_listener($event) {
      ɵɵrestoreView(_r9);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.resetHistoryList($event));
    });
    ɵɵelementStart(4, "i", 35);
    ɵɵtext(5, "delete");
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.historyHeading);
  }
}
function AutocompleteComponent_li_15_div_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AutocompleteComponent_li_15_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 33);
    ɵɵlistener("click", function AutocompleteComponent_li_15_div_1_Template_div_click_0_listener() {
      ɵɵrestoreView(_r11);
      const item_r12 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.select(item_r12));
    });
    ɵɵtemplate(1, AutocompleteComponent_li_15_div_1_ng_container_1_Template, 1, 0, "ng-container", 34);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r12 = ɵɵnextContext();
    const item_r12 = ctx_r12.$implicit;
    const idx_r14 = ctx_r12.index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassProp("complete-selected", idx_r14 === ctx_r2.selectedIdx);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(4, _c5, item_r12));
  }
}
function AutocompleteComponent_li_15_div_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AutocompleteComponent_li_15_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 33);
    ɵɵlistener("click", function AutocompleteComponent_li_15_div_2_Template_div_click_0_listener() {
      ɵɵrestoreView(_r15);
      const item_r12 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.select(item_r12));
    });
    ɵɵtemplate(1, AutocompleteComponent_li_15_div_2_ng_container_1_Template, 1, 0, "ng-container", 34);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r12 = ɵɵnextContext();
    const item_r12 = ctx_r12.$implicit;
    const idx_r14 = ctx_r12.index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassProp("complete-selected", idx_r14 === ctx_r2.selectedIdx);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(4, _c5, item_r12));
  }
}
function AutocompleteComponent_li_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 31);
    ɵɵtemplate(1, AutocompleteComponent_li_15_div_1_Template, 2, 6, "div", 32)(2, AutocompleteComponent_li_15_div_2_Template, 2, 6, "div", 32);
    ɵɵelementStart(3, "div", 14);
    ɵɵlistener("click", function AutocompleteComponent_li_15_Template_div_click_3_listener($event) {
      const idx_r14 = ɵɵrestoreView(_r10).index;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.removeHistoryItem(idx_r14, $event));
    });
    ɵɵelementStart(4, "i", 15);
    ɵɵtext(5, "close");
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.isTypeString(item_r12));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.isTypeString(item_r12));
  }
}
function AutocompleteComponent_div_16_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AutocompleteComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 36);
    ɵɵtemplate(1, AutocompleteComponent_div_16_ng_container_1_Template, 1, 0, "ng-container", 34);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.notFoundTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c5, ctx_r2.notFoundText));
  }
}
function AutocompleteComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 37);
    ɵɵlistener("click", function AutocompleteComponent_div_17_Template_div_click_0_listener() {
      ɵɵrestoreView(_r16);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.handleOverlay());
    });
    ɵɵelementEnd();
  }
}
var HighlightPipe = class {
  transform(text, search, searchKeyword) {
    let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    pattern = pattern.split(" ").filter((t) => {
      return t.length > 0;
    }).join("|");
    const regex = new RegExp(pattern, "gi");
    if (!search) {
      return text;
    }
    if (searchKeyword) {
      const name = text[searchKeyword].replace(regex, (match) => `<b>${match}</b>`);
      const textCopied = __spreadValues({}, text);
      textCopied[searchKeyword] = name;
      return textCopied;
    } else {
      return search ? text.replace(regex, (match) => `<b>${match}</b>`) : text;
    }
  }
};
HighlightPipe.ɵfac = function HighlightPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || HighlightPipe)();
};
HighlightPipe.ɵpipe = ɵɵdefinePipe({
  name: "highlight",
  type: HighlightPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HighlightPipe, [{
    type: Pipe,
    args: [{
      name: "highlight"
    }]
  }], null, null);
})();
var isArrowUp = (keyCode) => keyCode === 38;
var isArrowDown = (keyCode) => keyCode === 40;
var isArrowUpDown = (keyCode) => isArrowUp(keyCode) || isArrowDown(keyCode);
var isEnter = (keyCode) => keyCode === 13;
var isBackspace = (keyCode) => keyCode === 8;
var isDelete = (keyCode) => keyCode === 46;
var isESC = (keyCode) => keyCode === 27;
var isTab = (keyCode) => keyCode === 9;
var AutocompleteComponent = class {
  constructor(elementRef, renderer) {
    this.renderer = renderer;
    this.query = "";
    this.filteredList = [];
    this.historyList = [];
    this.isHistoryListVisible = true;
    this.selectedIdx = -1;
    this.toHighlight = "";
    this.notFound = false;
    this.isFocused = false;
    this.isOpen = false;
    this.isScrollToEnd = false;
    this.overlay = false;
    this.manualOpen = void 0;
    this.manualClose = void 0;
    this.data = [];
    this.placeholder = "";
    this.heading = "";
    this.historyHeading = "Recently selected";
    this.historyListMaxNumber = 15;
    this.notFoundText = "Not found";
    this.minQueryLength = 1;
    this.focusFirst = false;
    this.selected = new EventEmitter();
    this.inputChanged = new EventEmitter();
    this.inputFocused = new EventEmitter();
    this.inputCleared = new EventEmitter();
    this.opened = new EventEmitter();
    this.closed = new EventEmitter();
    this.scrolledToEnd = new EventEmitter();
    this.propagateChange = () => {
    };
    this.onTouched = () => {
    };
    this.elementRef = elementRef;
  }
  /**
   * Writes a new value from the form model into the view,
   * Updates model
   */
  writeValue(value = "") {
    this.query = this.selectedValueRender !== void 0 ? this.selectedValueRender(value) : this.defaultWriteValue(value);
  }
  defaultWriteValue(value) {
    return value && !this.isTypeString(value) ? value[this.searchKeyword] : value;
  }
  /**
   * Registers a handler that is called when something in the view has changed
   */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  /**
   * Registers a handler specifically for when a control receives a touch event
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Event that is called when the value of an input element is changed
   */
  onChange(event2) {
    this.propagateChange(event2.target.value);
  }
  /**
   * Event that is called when the control status changes to or from DISABLED
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.initEventStream();
    this.handleScroll();
  }
  /**
   * Set initial value
   * @param value
   */
  setInitialValue(value) {
    if (this.initialValue) {
      this.select(value);
    }
  }
  /**
   * Update search results
   */
  ngOnChanges(changes) {
    this.setInitialValue(this.initialValue);
    if (changes && changes.data && Array.isArray(changes.data.currentValue)) {
      this.handleItemsChange();
      if (!changes.data.firstChange && this.isFocused) {
        this.handleOpen();
      }
    }
  }
  /**
   * Items change
   */
  handleItemsChange() {
    this.isScrollToEnd = false;
    if (!this.isOpen) {
      return;
    }
    this.filteredList = this.data;
    this.notFound = !this.filteredList || this.filteredList.length === 0;
    if (this.isOpen) {
      this.filterList();
    }
  }
  /**
   * Filter data
   */
  filterList() {
    this.selectedIdx = -1;
    this.initSearchHistory();
    if (this.query != null && this.data) {
      this.toHighlight = this.query;
      this.filteredList = this.customFilter !== void 0 ? this.customFilter([...this.data], this.query) : this.defaultFilterFunction();
      if (this.filteredList.length > 0 && this.focusFirst) {
        this.selectedIdx = 0;
      }
    } else {
      this.notFound = false;
    }
  }
  /**
   * Default filter function, used unless customFilter is provided
   */
  defaultFilterFunction() {
    return this.data.filter((item) => {
      if (typeof item === "string") {
        return item.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      } else if (typeof item === "object" && item instanceof Object) {
        return item[this.searchKeyword] ? item[this.searchKeyword].toLowerCase().indexOf(this.query.toLowerCase()) > -1 : "";
      }
    });
  }
  /**
   * Check if item is a string in the list.
   * @param item
   */
  isTypeString(item) {
    return typeof item === "string";
  }
  /**
   * Select item in the list.
   * @param item
   */
  select(item) {
    this.query = !this.isTypeString(item) ? item[this.searchKeyword] : item;
    this.isOpen = true;
    this.overlay = false;
    this.selected.emit(item);
    this.propagateChange(item);
    if (this.initialValue) {
      const history = window.localStorage.getItem(`${this.historyIdentifier}`);
      if (history) {
        let existingHistory = JSON.parse(localStorage[`${this.historyIdentifier}`]);
        if (!(existingHistory instanceof Array)) existingHistory = [];
        if (!existingHistory.some((existingItem) => !this.isTypeString(existingItem) ? existingItem[this.searchKeyword] == item[this.searchKeyword] : existingItem == item)) {
          existingHistory.unshift(item);
          localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(existingHistory));
          if (existingHistory.length >= this.historyListMaxNumber) {
            existingHistory.splice(existingHistory.length - 1, 1);
            localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(existingHistory));
          }
        } else {
          if (!this.isTypeString(item)) {
            const copiedExistingHistory = existingHistory.slice();
            const selectedIndex = copiedExistingHistory.map((el) => el[this.searchKeyword]).indexOf(item[this.searchKeyword]);
            copiedExistingHistory.splice(selectedIndex, 1);
            copiedExistingHistory.splice(0, 0, item);
            localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(copiedExistingHistory));
          } else {
            const copiedExistingHistory = existingHistory.slice();
            copiedExistingHistory.splice(copiedExistingHistory.indexOf(item), 1);
            copiedExistingHistory.splice(0, 0, item);
            localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(copiedExistingHistory));
          }
        }
      } else {
        this.saveHistory(item);
      }
    } else {
      this.saveHistory(item);
    }
    this.handleClose();
  }
  /**
   * Document click
   * @param e event
   */
  handleClick(e) {
    let clickedComponent = e.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
        if (this.filteredList.length) {
          this.handleOpen();
        }
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.handleClose();
    }
  }
  /**
   * Handle body overlay
   */
  handleOverlay() {
    this.overlay = false;
  }
  /**
   * Scroll items
   */
  handleScroll() {
    this.renderer.listen(this.filteredListElement.nativeElement, "scroll", () => {
      this.scrollToEnd();
    });
  }
  /**
   * Define panel state
   */
  setPanelState(event2) {
    if (event2) {
      event2.stopPropagation();
    }
    if (typeof this.manualOpen === "undefined" && typeof this.manualClose === "undefined") {
      this.isOpen = false;
      this.handleOpen();
    }
    if (typeof this.manualOpen === "undefined" && this.manualClose === false || typeof this.manualClose === "undefined" && this.manualOpen === false) {
      this.isOpen = false;
      this.handleOpen();
    }
    if (this.manualOpen === false && this.manualClose === false) {
      this.isOpen = false;
      this.handleOpen();
    }
    if (this.manualOpen) {
      this.isOpen = false;
      this.handleOpen();
      this.manualOpen = false;
    }
    if (this.manualClose) {
      this.isOpen = true;
      this.handleClose();
      this.manualClose = false;
    }
  }
  /**
   * Manual controls
   */
  open() {
    this.manualOpen = true;
    this.isOpen = false;
    this.handleOpen();
  }
  close() {
    this.manualClose = true;
    this.isOpen = true;
    this.handleClose();
  }
  focus() {
    this.handleFocus(event);
  }
  clear() {
    this.remove(event);
  }
  /**
   * Remove search query
   */
  remove(e) {
    e.stopPropagation();
    this.query = "";
    this.inputCleared.emit();
    this.propagateChange(this.query);
    this.setPanelState(e);
    if (this.data && !this.data.length) {
      this.notFound = false;
    }
  }
  /**
   * Initialize historyList search
   */
  initSearchHistory() {
    this.isHistoryListVisible = false;
    if (this.historyIdentifier && !this.query) {
      const history = window.localStorage.getItem(`${this.historyIdentifier}`);
      if (history) {
        this.isHistoryListVisible = true;
        this.filteredList = [];
        this.historyList = history ? JSON.parse(history) : [];
      } else {
        this.isHistoryListVisible = false;
      }
    } else {
      this.isHistoryListVisible = false;
    }
  }
  handleOpen() {
    if (this.isOpen || this.isOpen && !this.isLoading) {
      return;
    }
    if (this.data && this.data.length) {
      this.isOpen = true;
      this.overlay = true;
      this.filterList();
      this.opened.emit();
    }
  }
  handleClose() {
    if (!this.isOpen) {
      this.isFocused = false;
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.filteredList = [];
    this.selectedIdx = -1;
    this.notFound = false;
    this.isHistoryListVisible = false;
    this.isFocused = false;
    this.closed.emit();
  }
  handleFocus(e) {
    this.searchInput.nativeElement.focus();
    if (this.isFocused) {
      return;
    }
    this.inputFocused.emit(e);
    if (this.data && this.data.length) {
      this.setPanelState(e);
    }
    this.isFocused = true;
  }
  scrollToEnd() {
    if (this.isScrollToEnd) {
      return;
    }
    const scrollTop = this.filteredListElement.nativeElement.scrollTop;
    const scrollHeight = this.filteredListElement.nativeElement.scrollHeight;
    const elementHeight = this.filteredListElement.nativeElement.clientHeight;
    const atBottom = elementHeight != 0 && Math.abs(scrollHeight - elementHeight - scrollTop) < 1;
    if (atBottom) {
      this.scrolledToEnd.emit();
      this.isScrollToEnd = true;
    }
  }
  /**
   * Initialize keyboard events
   */
  initEventStream() {
    this.inputKeyUp$ = fromEvent(this.searchInput.nativeElement, "keyup").pipe(map((e) => e));
    this.inputKeyDown$ = fromEvent(this.searchInput.nativeElement, "keydown").pipe(map((e) => e));
    this.listenEventStream();
  }
  /**
   * Listen keyboard events
   */
  listenEventStream() {
    this.inputKeyUp$.pipe(filter((e) => !isArrowUpDown(e.keyCode) && !isEnter(e.keyCode) && !isESC(e.keyCode) && !isTab(e.keyCode)), debounceTime(this.debounceTime)).subscribe((e) => {
      this.onKeyUp(e);
    });
    this.inputKeyDown$.pipe(filter((e) => isArrowUpDown(e.keyCode))).subscribe((e) => {
      e.preventDefault();
      this.onFocusItem(e);
    });
    this.inputKeyUp$.pipe(filter((e) => isEnter(e.keyCode))).subscribe((e) => {
    });
    this.inputKeyDown$.pipe(filter((e) => isEnter(e.keyCode))).subscribe((e) => {
      this.onHandleEnter();
    });
    this.inputKeyUp$.pipe(filter((e) => isESC(e.keyCode), debounceTime(100))).subscribe((e) => {
      this.onEsc();
    });
    this.inputKeyDown$.pipe(filter((e) => isTab(e.keyCode))).subscribe((e) => {
      this.onTab();
    });
    this.inputKeyDown$.pipe(filter((e) => isBackspace(e.keyCode) || isDelete(e.keyCode))).subscribe((e) => {
      this.onDelete();
    });
  }
  /**
   * on keyup == when input changed
   * @param e event
   */
  onKeyUp(e) {
    this.notFound = false;
    if (!this.query) {
      this.notFound = false;
      this.inputChanged.emit(e.target.value);
      this.inputCleared.emit();
      this.setPanelState(e);
    }
    if (!this.query && this.query !== "") {
      return;
    }
    if (this.query.length >= this.minQueryLength) {
      this.inputChanged.emit(e.target.value);
      this.filterList();
      if (!this.filteredList.length && !this.isLoading) {
        this.notFoundText ? this.notFound = true : this.notFound = false;
      }
      if (this.data && !this.data.length) {
        this.isOpen = true;
      }
    }
  }
  /**
   * Keyboard arrow top and arrow bottom
   * @param e event
   */
  onFocusItem(e) {
    if (!this.historyList.length || !this.isHistoryListVisible) {
      const totalNumItem = this.filteredList.length;
      if (e.key === "ArrowDown") {
        let sum = this.selectedIdx;
        sum = this.selectedIdx === null ? 0 : sum + 1;
        this.selectedIdx = (totalNumItem + sum) % totalNumItem;
        this.scrollToFocusedItem(this.selectedIdx);
      } else if (e.key === "ArrowUp") {
        if (this.selectedIdx == -1) {
          this.selectedIdx = 0;
        }
        this.selectedIdx = (totalNumItem + this.selectedIdx - 1) % totalNumItem;
        this.scrollToFocusedItem(this.selectedIdx);
      }
    } else {
      const totalNumItem = this.historyList.length;
      if (e.key === "ArrowDown") {
        let sum = this.selectedIdx;
        sum = this.selectedIdx === null ? 0 : sum + 1;
        this.selectedIdx = (totalNumItem + sum) % totalNumItem;
        this.scrollToFocusedItem(this.selectedIdx);
      } else if (e.key === "ArrowUp") {
        if (this.selectedIdx == -1) {
          this.selectedIdx = 0;
        }
        this.selectedIdx = (totalNumItem + this.selectedIdx - 1) % totalNumItem;
        this.scrollToFocusedItem(this.selectedIdx);
      }
    }
  }
  /**
   * Scroll to focused item
   * * @param index
   */
  scrollToFocusedItem(index) {
    let listElement = null;
    if (!this.historyList.length || !this.isHistoryListVisible) {
      listElement = this.filteredListElement.nativeElement;
    } else {
      listElement = this.historyListElement.nativeElement;
    }
    const items = Array.prototype.slice.call(listElement.childNodes).filter((node) => {
      if (node.nodeType === 1) {
        return node.className.includes("item");
      } else {
        return false;
      }
    });
    if (!items.length) {
      return;
    }
    const listHeight = listElement.offsetHeight;
    const itemHeight = items[index].offsetHeight;
    const visibleTop = listElement.scrollTop;
    const visibleBottom = listElement.scrollTop + listHeight - itemHeight;
    const targetPosition = items[index].offsetTop;
    if (targetPosition < visibleTop) {
      listElement.scrollTop = targetPosition;
    }
    if (targetPosition > visibleBottom) {
      listElement.scrollTop = targetPosition - listHeight + itemHeight;
    }
  }
  /**
   * Select item on enter click
   */
  onHandleEnter() {
    if (this.selectedIdx > -1) {
      if (!this.historyList.length || !this.isHistoryListVisible) {
        this.query = !this.isTypeString(this.filteredList[this.selectedIdx]) ? this.filteredList[this.selectedIdx][this.searchKeyword] : this.filteredList[this.selectedIdx];
        this.saveHistory(this.filteredList[this.selectedIdx]);
        this.select(this.filteredList[this.selectedIdx]);
      } else {
        this.query = !this.isTypeString(this.historyList[this.selectedIdx]) ? this.historyList[this.selectedIdx][this.searchKeyword] : this.historyList[this.selectedIdx];
        this.saveHistory(this.historyList[this.selectedIdx]);
        this.select(this.historyList[this.selectedIdx]);
      }
    }
    this.isHistoryListVisible = false;
    this.handleClose();
  }
  /**
   * Esc click
   */
  onEsc() {
    this.searchInput.nativeElement.blur();
    this.handleClose();
  }
  /**
   * Tab click
   */
  onTab() {
    this.searchInput.nativeElement.blur();
    this.handleClose();
  }
  /**
   * Delete click
   */
  onDelete() {
    this.isOpen = true;
  }
  /**
   * Select item to save in localStorage
   * @param selected
   */
  saveHistory(selected) {
    if (this.historyIdentifier) {
      if (!this.historyList.some((item) => !this.isTypeString(item) ? item[this.searchKeyword] == selected[this.searchKeyword] : item == selected)) {
        this.saveHistoryToLocalStorage([selected, ...this.historyList]);
        if (this.historyList.length >= this.historyListMaxNumber) {
          this.historyList.splice(this.historyList.length - 1, 1);
          this.saveHistoryToLocalStorage([selected, ...this.historyList]);
        }
      } else {
        if (!this.isTypeString(selected)) {
          const copiedHistoryList = this.historyList.slice();
          const selectedIndex = copiedHistoryList.map((item) => item[this.searchKeyword]).indexOf(selected[this.searchKeyword]);
          copiedHistoryList.splice(selectedIndex, 1);
          copiedHistoryList.splice(0, 0, selected);
          this.saveHistoryToLocalStorage([...copiedHistoryList]);
        } else {
          const copiedHistoryList = this.historyList.slice();
          copiedHistoryList.splice(this.historyList.indexOf(selected), 1);
          copiedHistoryList.splice(0, 0, selected);
          this.saveHistoryToLocalStorage([...copiedHistoryList]);
        }
      }
    }
  }
  /**
   * Save item in localStorage
   * @param selected
   */
  saveHistoryToLocalStorage(selected) {
    window.localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(selected));
  }
  /**
   * Remove item from localStorage
   * @param index
   * @param e event
   */
  removeHistoryItem(index, e) {
    e.stopPropagation();
    this.historyList = this.historyList.filter((v, i) => i !== index);
    this.saveHistoryToLocalStorage(this.historyList);
    if (this.historyList.length == 0) {
      window.localStorage.removeItem(`${this.historyIdentifier}`);
      this.filterList();
    }
  }
  /**
   * Reset localStorage
   * @param e event
   */
  resetHistoryList(e) {
    e.stopPropagation();
    this.historyList = [];
    window.localStorage.removeItem(`${this.historyIdentifier}`);
    this.filterList();
  }
};
AutocompleteComponent.ɵfac = function AutocompleteComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AutocompleteComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
};
AutocompleteComponent.ɵcmp = ɵɵdefineComponent({
  type: AutocompleteComponent,
  selectors: [["ng-autocomplete"]],
  contentQueries: function AutocompleteComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, TemplateRef, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.customTemplate = _t.first);
    }
  },
  viewQuery: function AutocompleteComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 5);
      ɵɵviewQuery(_c1, 5);
      ɵɵviewQuery(_c2, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.searchInput = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filteredListElement = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.historyListElement = _t.first);
    }
  },
  hostAttrs: [1, "ng-autocomplete"],
  hostBindings: function AutocompleteComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function AutocompleteComponent_click_HostBindingHandler($event) {
        return ctx.handleClick($event);
      }, false, ɵɵresolveDocument);
    }
  },
  inputs: {
    data: "data",
    searchKeyword: "searchKeyword",
    placeholder: "placeholder",
    heading: "heading",
    initialValue: "initialValue",
    historyIdentifier: "historyIdentifier",
    historyHeading: "historyHeading",
    historyListMaxNumber: "historyListMaxNumber",
    notFoundText: "notFoundText",
    isLoading: "isLoading",
    debounceTime: "debounceTime",
    disabled: "disabled",
    minQueryLength: "minQueryLength",
    focusFirst: "focusFirst",
    customFilter: "customFilter",
    selectedValueRender: "selectedValueRender",
    itemTemplate: "itemTemplate",
    notFoundTemplate: "notFoundTemplate"
  },
  outputs: {
    selected: "selected",
    inputChanged: "inputChanged",
    inputFocused: "inputFocused",
    inputCleared: "inputCleared",
    opened: "opened",
    closed: "closed",
    scrolledToEnd: "scrolledToEnd"
  },
  standalone: false,
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true
  }]), ɵɵNgOnChangesFeature],
  decls: 18,
  vars: 24,
  consts: [["searchInput", ""], ["filteredListElement", ""], ["historyListElement", ""], ["aria-owns", "suggestions suggestions-history", 1, "autocomplete-container", 3, "ngClass"], [1, "input-container"], ["type", "text", "aria-autocomplete", "list", "role", "combobox", "autocomplete", "off", 3, "ngModelChange", "input", "focus", "blur", "placeholder", "ngModel", "disabled"], ["class", "x", 3, "click", 4, "ngIf"], ["class", "sk-fading-circle", 4, "ngIf"], ["id", "suggestions", "role", "listbox", 1, "suggestions-container", 3, "ngClass"], ["class", "heading", 4, "ngIf"], ["class", "item", 4, "ngFor", "ngForOf"], ["id", "suggestions-history", "role", "listbox", 1, "suggestions-container", 3, "ngClass"], ["class", "not-found", 4, "ngIf"], ["class", "autocomplete-overlay", 3, "click", 4, "ngIf"], [1, "x", 3, "click"], ["aria-label", "Close", 1, "material-icons"], [1, "sk-fading-circle"], [1, "sk-circle1", "sk-circle"], [1, "sk-circle2", "sk-circle"], [1, "sk-circle3", "sk-circle"], [1, "sk-circle4", "sk-circle"], [1, "sk-circle5", "sk-circle"], [1, "sk-circle6", "sk-circle"], [1, "sk-circle7", "sk-circle"], [1, "sk-circle8", "sk-circle"], [1, "sk-circle9", "sk-circle"], [1, "sk-circle10", "sk-circle"], [1, "sk-circle11", "sk-circle"], [1, "sk-circle12", "sk-circle"], [1, "heading"], [1, "text"], [1, "item"], [3, "complete-selected", "click", 4, "ngIf"], [3, "click"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["aria-label", "Delete", 1, "material-icons"], [1, "not-found"], [1, "autocomplete-overlay", 3, "click"]],
  template: function AutocompleteComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 3)(1, "div", 4)(2, "input", 5, 0);
      ɵɵtwoWayListener("ngModelChange", function AutocompleteComponent_Template_input_ngModelChange_2_listener($event) {
        ɵɵrestoreView(_r1);
        ɵɵtwoWayBindingSet(ctx.query, $event) || (ctx.query = $event);
        return ɵɵresetView($event);
      });
      ɵɵlistener("input", function AutocompleteComponent_Template_input_input_2_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onChange($event));
      })("focus", function AutocompleteComponent_Template_input_focus_2_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.handleFocus($event));
      })("blur", function AutocompleteComponent_Template_input_blur_2_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onTouched($event));
      });
      ɵɵelementEnd();
      ɵɵtemplate(4, AutocompleteComponent_div_4_Template, 3, 0, "div", 6)(5, AutocompleteComponent_div_5_Template, 13, 0, "div", 7);
      ɵɵelementEnd();
      ɵɵelementStart(6, "div", 8);
      ɵɵtemplate(7, AutocompleteComponent_div_7_Template, 3, 1, "div", 9);
      ɵɵelementStart(8, "ul", null, 1);
      ɵɵtemplate(10, AutocompleteComponent_li_10_Template, 3, 2, "li", 10);
      ɵɵelementEnd()();
      ɵɵelementStart(11, "div", 11);
      ɵɵtemplate(12, AutocompleteComponent_div_12_Template, 6, 1, "div", 9);
      ɵɵelementStart(13, "ul", null, 2);
      ɵɵtemplate(15, AutocompleteComponent_li_15_Template, 6, 2, "li", 10);
      ɵɵelementEnd()();
      ɵɵtemplate(16, AutocompleteComponent_div_16_Template, 2, 4, "div", 12);
      ɵɵelementEnd();
      ɵɵtemplate(17, AutocompleteComponent_div_17_Template, 1, 0, "div", 13);
    }
    if (rf & 2) {
      ɵɵproperty("ngClass", ɵɵpureFunction1(16, _c3, ctx.isOpen));
      ɵɵattribute("aria-expanded", ctx.isOpen);
      ɵɵadvance(2);
      ɵɵpropertyInterpolate("placeholder", ctx.placeholder);
      ɵɵtwoWayProperty("ngModel", ctx.query);
      ɵɵproperty("disabled", ctx.disabled);
      ɵɵattribute("aria-label", ctx.placeholder);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.query && !ctx.isLoading && !ctx.disabled);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.isLoading);
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction2(18, _c4, ctx.isHistoryListVisible, !ctx.isHistoryListVisible));
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.filteredList.length > 0 && ctx.heading);
      ɵɵadvance(3);
      ɵɵproperty("ngForOf", ctx.filteredList);
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction2(21, _c4, !ctx.isHistoryListVisible, ctx.isHistoryListVisible));
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.historyList.length > 0 && ctx.historyHeading);
      ɵɵadvance(3);
      ɵɵproperty("ngForOf", ctx.historyList);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.isLoading ? !ctx.isLoading && ctx.notFound : ctx.notFound);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.overlay);
    }
  },
  dependencies: [NgClass, DefaultValueAccessor, NgControlStatus, NgModel, NgIf, NgForOf, NgTemplateOutlet, HighlightPipe],
  styles: ['@import"https://fonts.googleapis.com/icon?family=Material+Icons";.ng-autocomplete{width:600px}.autocomplete-container{box-shadow:0 1px 3px #0003,0 1px 1px #00000024,0 2px 1px -1px #0000001f;position:relative;overflow:visible;height:40px}.autocomplete-container .input-container input{font-size:14px;box-sizing:border-box;border:none;box-shadow:none;outline:none;background-color:#fff;color:#000000de;width:100%;padding:0 15px;line-height:40px;height:40px}.autocomplete-container .input-container input:disabled{background-color:#eee;color:#666}.autocomplete-container .input-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;transform:translateY(-50%)}.autocomplete-container .input-container .x i{color:#0000008a;font-size:22px;vertical-align:middle}.autocomplete-container .suggestions-container{position:absolute;width:100%;background:white;height:auto;box-shadow:0 2px 5px #00000040;box-sizing:border-box}.autocomplete-container .suggestions-container ul{padding:0;margin:0;max-height:240px;overflow-y:auto}.autocomplete-container .suggestions-container ul li{position:relative;list-style:none;padding:0;margin:0;cursor:pointer}.autocomplete-container .suggestions-container ul li a{padding:14px 15px;display:block;text-decoration:none;color:#333;cursor:pointer;color:#000000de;font-size:15px}.autocomplete-container .suggestions-container ul li:hover,.autocomplete-container .suggestions-container .complete-selected{background-color:#9e9e9e2e}.autocomplete-container .suggestions-container .heading{position:relative;padding:10px 15px;border:solid 1px #f1f1f1}.autocomplete-container .suggestions-container .heading .text{font-size:.85em}.autocomplete-container .suggestions-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;transform:translateY(-50%)}.autocomplete-container .suggestions-container .x i{color:#0000008a;font-size:18px;vertical-align:middle}.autocomplete-container .suggestions-container.is-hidden{visibility:hidden}.autocomplete-container .suggestions-container.is-visible{visibility:visible}.autocomplete-container .not-found{padding:0 .75em;border:solid 1px #f1f1f1;background:white}.autocomplete-container .not-found div{padding:.4em 0;font-size:.95em;line-height:1.4;border-bottom:1px solid rgba(230,230,230,.7)}.autocomplete-container.active{z-index:999}.highlight{font-weight:700}.autocomplete-overlay{position:fixed;background-color:transparent;width:100%;height:100%;top:0;right:0;bottom:0;left:0;z-index:50}input[type=text]::-ms-clear{display:none}.sk-fading-circle{width:20px;height:20px;position:absolute;right:10px;top:0;bottom:0;margin:auto}.sk-fading-circle .sk-circle{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle .sk-circle:before{content:"";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;animation:sk-circleFadeDelay 1.2s infinite ease-in-out both}.sk-fading-circle .sk-circle2{transform:rotate(30deg)}.sk-fading-circle .sk-circle3{transform:rotate(60deg)}.sk-fading-circle .sk-circle4{transform:rotate(90deg)}.sk-fading-circle .sk-circle5{transform:rotate(120deg)}.sk-fading-circle .sk-circle6{transform:rotate(150deg)}.sk-fading-circle .sk-circle7{transform:rotate(180deg)}.sk-fading-circle .sk-circle8{transform:rotate(210deg)}.sk-fading-circle .sk-circle9{transform:rotate(240deg)}.sk-fading-circle .sk-circle10{transform:rotate(270deg)}.sk-fading-circle .sk-circle11{transform:rotate(300deg)}.sk-fading-circle .sk-circle12{transform:rotate(330deg)}.sk-fading-circle .sk-circle2:before{animation-delay:-1.1s}.sk-fading-circle .sk-circle3:before{animation-delay:-1s}.sk-fading-circle .sk-circle4:before{animation-delay:-.9s}.sk-fading-circle .sk-circle5:before{animation-delay:-.8s}.sk-fading-circle .sk-circle6:before{animation-delay:-.7s}.sk-fading-circle .sk-circle7:before{animation-delay:-.6s}.sk-fading-circle .sk-circle8:before{animation-delay:-.5s}.sk-fading-circle .sk-circle9:before{animation-delay:-.4s}.sk-fading-circle .sk-circle10:before{animation-delay:-.3s}.sk-fading-circle .sk-circle11:before{animation-delay:-.2s}.sk-fading-circle .sk-circle12:before{animation-delay:-.1s}@keyframes sk-circleFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}\n'],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutocompleteComponent, [{
    type: Component,
    args: [{
      selector: "ng-autocomplete",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AutocompleteComponent),
        multi: true
      }],
      encapsulation: ViewEncapsulation.None,
      host: {
        "(document:click)": "handleClick($event)",
        "class": "ng-autocomplete"
      },
      template: `<div class="autocomplete-container" aria-owns="suggestions suggestions-history" [attr.aria-expanded]="isOpen"
     [ngClass]="{ 'active': isOpen}">
  <div class="input-container">
    <input #searchInput
           type="text"
           attr.aria-label="{{placeholder}}"
           aria-autocomplete="list"
           role="combobox"
           placeholder={{placeholder}}
           [(ngModel)]=query
           (input)="onChange($event)"
           (focus)=handleFocus($event)
           (blur)=onTouched($event)
           [disabled]="disabled"
           autocomplete="off">
    <div class="x" *ngIf="query && !isLoading && !disabled" (click)="remove($event)">
      <i class="material-icons" aria-label="Close">close</i>
    </div>
    <!--Loading mask-->
    <div class="sk-fading-circle" *ngIf="isLoading">
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    </div>
  </div>

  <!--FilteredList items-->
  <div class="suggestions-container" id="suggestions" role="listbox"
       [ngClass]="{ 'is-hidden': isHistoryListVisible, 'is-visible': !isHistoryListVisible}">
    <!--FilteredList heading-->
    <div class="heading" *ngIf="filteredList.length > 0 && heading">
      <div class="text">{{heading}}</div>
    </div>

    <ul #filteredListElement>
      <li *ngFor="let item of filteredList; let idx = index" class="item">
        <!--string logic-->
        <div [class.complete-selected]="idx === selectedIdx" *ngIf='isTypeString(item)'
             (click)="select(item)">
          <ng-container
            *ngTemplateOutlet="itemTemplate;  context: { $implicit: item | highlight: toHighlight }">
          </ng-container>
        </div>
        <!--object logic-->
        <div [class.complete-selected]="idx === selectedIdx" *ngIf='!isTypeString(item)'
             (click)="select(item)">
          <ng-container
            *ngTemplateOutlet="itemTemplate; context: { $implicit: item | highlight: toHighlight : searchKeyword }">
          </ng-container>
        </div>
      </li>
    </ul>
  </div>

  <!--HistoryList items-->
  <div class="suggestions-container" id="suggestions-history" role="listbox"
       [ngClass]="{ 'is-hidden': !isHistoryListVisible, 'is-visible': isHistoryListVisible}">
    <!--HistoryList heading-->
    <div class="heading" *ngIf="historyList.length > 0 && historyHeading">
      <div class="text">{{historyHeading}}</div>
      <div class="x" (click)="resetHistoryList($event)">
        <i class="material-icons" aria-label="Delete">delete</i>
      </div>
    </div>

    <ul #historyListElement>
      <li *ngFor="let item of historyList; let idx = index" class="item">
        <!--string logic-->
        <div [class.complete-selected]="idx === selectedIdx" *ngIf='isTypeString(item)' (click)="select(item)">
          <ng-container
            *ngTemplateOutlet="itemTemplate;  context: { $implicit: item }">
          </ng-container>
        </div>
        <!--object logic-->
        <div [class.complete-selected]="idx === selectedIdx" *ngIf='!isTypeString(item)' (click)="select(item)">
          <ng-container
            *ngTemplateOutlet="itemTemplate; context: { $implicit: item }">
          </ng-container>
        </div>
        <div class="x" (click)="removeHistoryItem(idx, $event)">
          <i class="material-icons" aria-label="Close">close</i>
        </div>
      </li>
    </ul>
  </div>

  <!--Not found-->
  <div class="not-found" *ngIf="isLoading ? !isLoading && notFound : notFound">
    <ng-container
      *ngTemplateOutlet="notFoundTemplate;  context: { $implicit: notFoundText  }">
    </ng-container>
  </div>
</div>
<div class="autocomplete-overlay" *ngIf="overlay" (click)="handleOverlay()"></div>
`,
      styles: ['@import"https://fonts.googleapis.com/icon?family=Material+Icons";.ng-autocomplete{width:600px}.autocomplete-container{box-shadow:0 1px 3px #0003,0 1px 1px #00000024,0 2px 1px -1px #0000001f;position:relative;overflow:visible;height:40px}.autocomplete-container .input-container input{font-size:14px;box-sizing:border-box;border:none;box-shadow:none;outline:none;background-color:#fff;color:#000000de;width:100%;padding:0 15px;line-height:40px;height:40px}.autocomplete-container .input-container input:disabled{background-color:#eee;color:#666}.autocomplete-container .input-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;transform:translateY(-50%)}.autocomplete-container .input-container .x i{color:#0000008a;font-size:22px;vertical-align:middle}.autocomplete-container .suggestions-container{position:absolute;width:100%;background:white;height:auto;box-shadow:0 2px 5px #00000040;box-sizing:border-box}.autocomplete-container .suggestions-container ul{padding:0;margin:0;max-height:240px;overflow-y:auto}.autocomplete-container .suggestions-container ul li{position:relative;list-style:none;padding:0;margin:0;cursor:pointer}.autocomplete-container .suggestions-container ul li a{padding:14px 15px;display:block;text-decoration:none;color:#333;cursor:pointer;color:#000000de;font-size:15px}.autocomplete-container .suggestions-container ul li:hover,.autocomplete-container .suggestions-container .complete-selected{background-color:#9e9e9e2e}.autocomplete-container .suggestions-container .heading{position:relative;padding:10px 15px;border:solid 1px #f1f1f1}.autocomplete-container .suggestions-container .heading .text{font-size:.85em}.autocomplete-container .suggestions-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;transform:translateY(-50%)}.autocomplete-container .suggestions-container .x i{color:#0000008a;font-size:18px;vertical-align:middle}.autocomplete-container .suggestions-container.is-hidden{visibility:hidden}.autocomplete-container .suggestions-container.is-visible{visibility:visible}.autocomplete-container .not-found{padding:0 .75em;border:solid 1px #f1f1f1;background:white}.autocomplete-container .not-found div{padding:.4em 0;font-size:.95em;line-height:1.4;border-bottom:1px solid rgba(230,230,230,.7)}.autocomplete-container.active{z-index:999}.highlight{font-weight:700}.autocomplete-overlay{position:fixed;background-color:transparent;width:100%;height:100%;top:0;right:0;bottom:0;left:0;z-index:50}input[type=text]::-ms-clear{display:none}.sk-fading-circle{width:20px;height:20px;position:absolute;right:10px;top:0;bottom:0;margin:auto}.sk-fading-circle .sk-circle{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle .sk-circle:before{content:"";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;animation:sk-circleFadeDelay 1.2s infinite ease-in-out both}.sk-fading-circle .sk-circle2{transform:rotate(30deg)}.sk-fading-circle .sk-circle3{transform:rotate(60deg)}.sk-fading-circle .sk-circle4{transform:rotate(90deg)}.sk-fading-circle .sk-circle5{transform:rotate(120deg)}.sk-fading-circle .sk-circle6{transform:rotate(150deg)}.sk-fading-circle .sk-circle7{transform:rotate(180deg)}.sk-fading-circle .sk-circle8{transform:rotate(210deg)}.sk-fading-circle .sk-circle9{transform:rotate(240deg)}.sk-fading-circle .sk-circle10{transform:rotate(270deg)}.sk-fading-circle .sk-circle11{transform:rotate(300deg)}.sk-fading-circle .sk-circle12{transform:rotate(330deg)}.sk-fading-circle .sk-circle2:before{animation-delay:-1.1s}.sk-fading-circle .sk-circle3:before{animation-delay:-1s}.sk-fading-circle .sk-circle4:before{animation-delay:-.9s}.sk-fading-circle .sk-circle5:before{animation-delay:-.8s}.sk-fading-circle .sk-circle6:before{animation-delay:-.7s}.sk-fading-circle .sk-circle7:before{animation-delay:-.6s}.sk-fading-circle .sk-circle8:before{animation-delay:-.5s}.sk-fading-circle .sk-circle9:before{animation-delay:-.4s}.sk-fading-circle .sk-circle10:before{animation-delay:-.3s}.sk-fading-circle .sk-circle11:before{animation-delay:-.2s}.sk-fading-circle .sk-circle12:before{animation-delay:-.1s}@keyframes sk-circleFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}\n']
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }];
  }, {
    searchInput: [{
      type: ViewChild,
      args: ["searchInput"]
    }],
    filteredListElement: [{
      type: ViewChild,
      args: ["filteredListElement"]
    }],
    historyListElement: [{
      type: ViewChild,
      args: ["historyListElement"]
    }],
    data: [{
      type: Input
    }],
    searchKeyword: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    heading: [{
      type: Input
    }],
    initialValue: [{
      type: Input
    }],
    historyIdentifier: [{
      type: Input
    }],
    historyHeading: [{
      type: Input
    }],
    historyListMaxNumber: [{
      type: Input
    }],
    notFoundText: [{
      type: Input
    }],
    isLoading: [{
      type: Input
    }],
    debounceTime: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    minQueryLength: [{
      type: Input
    }],
    focusFirst: [{
      type: Input
    }],
    customFilter: [{
      type: Input
    }],
    selectedValueRender: [{
      type: Input
    }],
    selected: [{
      type: Output
    }],
    inputChanged: [{
      type: Output
    }],
    inputFocused: [{
      type: Output
    }],
    inputCleared: [{
      type: Output
    }],
    opened: [{
      type: Output
    }],
    closed: [{
      type: Output
    }],
    scrolledToEnd: [{
      type: Output
    }],
    itemTemplate: [{
      type: Input
    }],
    notFoundTemplate: [{
      type: Input
    }],
    customTemplate: [{
      type: ContentChild,
      args: [TemplateRef]
    }]
  });
})();
var AutocompleteLibModule = class {
};
AutocompleteLibModule.ɵfac = function AutocompleteLibModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AutocompleteLibModule)();
};
AutocompleteLibModule.ɵmod = ɵɵdefineNgModule({
  type: AutocompleteLibModule,
  declarations: [AutocompleteComponent, HighlightPipe],
  imports: [CommonModule, FormsModule],
  exports: [AutocompleteComponent, HighlightPipe]
});
AutocompleteLibModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, FormsModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutocompleteLibModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FormsModule],
      declarations: [AutocompleteComponent, HighlightPipe],
      exports: [AutocompleteComponent, HighlightPipe]
    }]
  }], null, null);
})();
export {
  AutocompleteComponent,
  AutocompleteLibModule,
  HighlightPipe
};
//# sourceMappingURL=angular-ng-autocomplete.js.map
