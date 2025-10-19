import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-XSYELPUF.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle
} from "./chunk-WWWOAELD.js";
import "./chunk-PZXV3NIF.js";
import {
  Component,
  EventEmitter,
  Input,
  IterableDiffers,
  NgModule,
  Output,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-NF52DVN7.js";
import "./chunk-OKKFPXIG.js";
import "./chunk-BRF755KY.js";
import "./chunk-BJIUIRBV.js";
import "./chunk-IYEYSCYL.js";
import "./chunk-SXK72SKC.js";

// node_modules/angular-dual-listbox/fesm2020/angular-dual-listbox.mjs
var _c0 = (a0, a1) => ({
  "order": a0,
  "margin-left": a1
});
var _c1 = (a0, a1) => ({
  "max-height": a0,
  "min-height": a1
});
var _c2 = (a0) => ({
  over: a0
});
var _c3 = (a0, a1) => ({
  selected: a0,
  disabled: a1
});
function DualListComponent_form_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "form", 12)(1, "input", 13);
    ɵɵtwoWayListener("ngModelChange", function DualListComponent_form_4_Template_input_ngModelChange_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      ɵɵtwoWayBindingSet(ctx_r1.available.picker, $event) || (ctx_r1.available.picker = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("ngModelChange", function DualListComponent_form_4_Template_input_ngModelChange_1_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFilter(ctx_r1.available));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtwoWayProperty("ngModel", ctx_r1.available.picker);
  }
}
function DualListComponent_li_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 14);
    ɵɵlistener("click", function DualListComponent_li_7_Template_li_click_0_listener($event) {
      const ctx_r3 = ɵɵrestoreView(_r3);
      const item_r5 = ctx_r3.$implicit;
      const idx_r6 = ctx_r3.index;
      const ctx_r1 = ɵɵnextContext();
      ctx_r1.disabled ? null : ctx_r1.selectItem(ctx_r1.available.pick, item_r5);
      return ɵɵresetView(ctx_r1.shiftClick($event, idx_r6, ctx_r1.available, item_r5));
    })("dragstart", function DualListComponent_li_7_Template_li_dragstart_0_listener($event) {
      const item_r5 = ɵɵrestoreView(_r3).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.drag($event, item_r5, ctx_r1.available));
    })("dragend", function DualListComponent_li_7_Template_li_dragend_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.dragEnd(ctx_r1.available));
    });
    ɵɵelementStart(1, "label");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction2(3, _c3, ctx_r1.isItemSelected(ctx_r1.available.pick, item_r5), ctx_r1.disabled))("draggable", !ctx_r1.disabled && ctx_r1.format.draggable);
    ɵɵadvance(2);
    ɵɵtextInterpolate(item_r5._name);
  }
}
function DualListComponent_form_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "form", 12)(1, "input", 15);
    ɵɵtwoWayListener("ngModelChange", function DualListComponent_form_16_Template_input_ngModelChange_1_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      ɵɵtwoWayBindingSet(ctx_r1.confirmed.picker, $event) || (ctx_r1.confirmed.picker = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("ngModelChange", function DualListComponent_form_16_Template_input_ngModelChange_1_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFilter(ctx_r1.confirmed));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtwoWayProperty("ngModel", ctx_r1.confirmed.picker);
  }
}
function DualListComponent_li_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 14, 0);
    ɵɵlistener("click", function DualListComponent_li_19_Template_li_click_0_listener($event) {
      const ctx_r8 = ɵɵrestoreView(_r8);
      const item_r10 = ctx_r8.$implicit;
      const idx_r11 = ctx_r8.index;
      const ctx_r1 = ɵɵnextContext();
      ctx_r1.disabled ? null : ctx_r1.selectItem(ctx_r1.confirmed.pick, item_r10);
      return ɵɵresetView(ctx_r1.shiftClick($event, idx_r11, ctx_r1.confirmed, item_r10));
    })("dragstart", function DualListComponent_li_19_Template_li_dragstart_0_listener($event) {
      const item_r10 = ɵɵrestoreView(_r8).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.drag($event, item_r10, ctx_r1.confirmed));
    })("dragend", function DualListComponent_li_19_Template_li_dragend_0_listener() {
      ɵɵrestoreView(_r8);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.dragEnd(ctx_r1.confirmed));
    });
    ɵɵelementStart(2, "label");
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction2(3, _c3, ctx_r1.isItemSelected(ctx_r1.confirmed.pick, item_r10), ctx_r1.disabled))("draggable", !ctx_r1.disabled && ctx_r1.format.draggable);
    ɵɵadvance(3);
    ɵɵtextInterpolate(item_r10._name);
  }
}
var BasicList = class {
  constructor(name) {
    this._name = name;
    this.last = null;
    this.picker = "";
    this.dragStart = false;
    this.dragOver = false;
    this.pick = [];
    this.list = [];
    this.sift = [];
  }
  get name() {
    return this._name;
  }
};
var nextId = 0;
var DualListComponent = class _DualListComponent {
  constructor(differs) {
    this.differs = differs;
    this.id = `dual-list-${nextId++}`;
    this.key = "_id";
    this.display = "_name";
    this.height = "100px";
    this.filter = false;
    this.format = _DualListComponent.DEFAULT_FORMAT;
    this.sort = false;
    this.disabled = false;
    this.destinationChange = new EventEmitter();
    this.sorter = (a, b) => {
      return a._name < b._name ? -1 : a._name > b._name ? 1 : 0;
    };
    this.available = new BasicList(_DualListComponent.AVAILABLE_LIST_NAME);
    this.confirmed = new BasicList(_DualListComponent.CONFIRMED_LIST_NAME);
  }
  ngOnChanges(changeRecord) {
    if (changeRecord["filter"]) {
      if (changeRecord["filter"].currentValue === false) {
        this.clearFilter(this.available);
        this.clearFilter(this.confirmed);
      }
    }
    if (changeRecord["sort"]) {
      if (changeRecord["sort"].currentValue === true && this.compare === void 0) {
        this.compare = this.sorter;
      } else if (changeRecord["sort"].currentValue === false) {
        this.compare = void 0;
      }
    }
    if (changeRecord["format"]) {
      this.format = changeRecord["format"].currentValue;
      if (typeof this.format.direction === "undefined") {
        this.format.direction = _DualListComponent.LTR;
      }
      if (typeof this.format.add === "undefined") {
        this.format.add = _DualListComponent.DEFAULT_FORMAT.add;
      }
      if (typeof this.format.remove === "undefined") {
        this.format.remove = _DualListComponent.DEFAULT_FORMAT.remove;
      }
      if (typeof this.format.all === "undefined") {
        this.format.all = _DualListComponent.DEFAULT_FORMAT.all;
      }
      if (typeof this.format.none === "undefined") {
        this.format.none = _DualListComponent.DEFAULT_FORMAT.none;
      }
      if (typeof this.format.draggable === "undefined") {
        this.format.draggable = _DualListComponent.DEFAULT_FORMAT.draggable;
      }
    }
    if (changeRecord["source"]) {
      this.available = new BasicList(_DualListComponent.AVAILABLE_LIST_NAME);
      this.updatedSource();
      this.updatedDestination();
    }
    if (changeRecord["destination"]) {
      this.confirmed = new BasicList(_DualListComponent.CONFIRMED_LIST_NAME);
      this.updatedDestination();
      this.updatedSource();
    }
  }
  ngDoCheck() {
    if (this.source && this.buildAvailable(this.source)) {
      this.onFilter(this.available);
    }
    if (this.destination && this.buildConfirmed(this.destination)) {
      this.onFilter(this.confirmed);
    }
  }
  buildAvailable(source) {
    const sourceChanges = this.sourceDiffer.diff(source);
    if (sourceChanges) {
      sourceChanges.forEachRemovedItem((r) => {
        const idx = this.findItemIndex(this.available.list, r.item, this.key);
        if (idx !== -1) {
          this.available.list.splice(idx, 1);
        }
      });
      sourceChanges.forEachAddedItem((r) => {
        if (this.findItemIndex(this.available.list, r.item, this.key) === -1) {
          this.available.list.push({
            _id: this.makeId(r.item),
            _name: this.makeName(r.item)
          });
        }
      });
      if (this.compare !== void 0) {
        this.available.list.sort(this.compare);
      }
      this.available.sift = this.available.list;
      return true;
    }
    return false;
  }
  buildConfirmed(destination) {
    let moved = false;
    const destChanges = this.destinationDiffer.diff(destination);
    if (destChanges) {
      destChanges.forEachRemovedItem((r) => {
        const idx = this.findItemIndex(this.confirmed.list, r.item, this.key);
        if (idx !== -1) {
          if (!this.isItemSelected(this.confirmed.pick, this.confirmed.list[idx])) {
            this.selectItem(this.confirmed.pick, this.confirmed.list[idx]);
          }
          this.moveItem(this.confirmed, this.available, this.confirmed.list[idx], false);
          moved = true;
        }
      });
      destChanges.forEachAddedItem((r) => {
        const idx = this.findItemIndex(this.available.list, r.item, this.key);
        if (idx !== -1) {
          if (!this.isItemSelected(this.available.pick, this.available.list[idx])) {
            this.selectItem(this.available.pick, this.available.list[idx]);
          }
          this.moveItem(this.available, this.confirmed, this.available.list[idx], false);
          moved = true;
        }
      });
      if (this.compare !== void 0) {
        this.confirmed.list.sort(this.compare);
      }
      this.confirmed.sift = this.confirmed.list;
      if (moved) {
        this.trueUp();
      }
      return true;
    }
    return false;
  }
  updatedSource() {
    this.available.list.length = 0;
    this.available.pick.length = 0;
    if (this.source !== void 0) {
      this.sourceDiffer = this.differs.find(this.source).create(null);
    }
  }
  updatedDestination() {
    if (this.destination !== void 0) {
      this.destinationDiffer = this.differs.find(this.destination).create(null);
    }
  }
  direction() {
    return this.format.direction === _DualListComponent.LTR;
  }
  dragEnd(list = null) {
    if (list) {
      list.dragStart = false;
    } else {
      this.available.dragStart = false;
      this.confirmed.dragStart = false;
    }
    return false;
  }
  drag(event, item, list) {
    if (!this.isItemSelected(list.pick, item)) {
      this.selectItem(list.pick, item);
    }
    list.dragStart = true;
    event.dataTransfer.setData(this.id, item["_id"]);
  }
  allowDrop(event, list) {
    if (event.dataTransfer.types.length && event.dataTransfer.types[0] === this.id) {
      event.preventDefault();
      if (!list.dragStart) {
        list.dragOver = true;
      }
    }
    return false;
  }
  dragLeave() {
    this.available.dragOver = false;
    this.confirmed.dragOver = false;
  }
  drop(event, list) {
    if (event.dataTransfer.types.length && event.dataTransfer.types[0] === this.id) {
      event.preventDefault();
      this.dragLeave();
      this.dragEnd();
      if (list === this.available) {
        this.moveItem(this.available, this.confirmed);
      } else {
        this.moveItem(this.confirmed, this.available);
      }
    }
  }
  trueUp() {
    let changed = false;
    let pos = this.destination.length;
    while ((pos -= 1) >= 0) {
      const mv = this.confirmed.list.filter((conf) => {
        if (typeof this.destination[pos] === "object") {
          return conf._id === this.destination[pos][this.key];
        } else {
          return conf._id === this.destination[pos];
        }
      });
      if (mv.length === 0) {
        this.destination.splice(pos, 1);
        changed = true;
      }
    }
    for (let i = 0, len = this.confirmed.list.length; i < len; i += 1) {
      let mv = this.destination.filter((d) => {
        if (typeof d === "object") {
          return d[this.key] === this.confirmed.list[i]._id;
        } else {
          return d === this.confirmed.list[i]._id;
        }
      });
      if (mv.length === 0) {
        mv = this.source.filter((o) => {
          if (typeof o === "object") {
            return o[this.key] === this.confirmed.list[i]._id;
          } else {
            return o === this.confirmed.list[i]._id;
          }
        });
        if (mv.length > 0) {
          this.destination.push(mv[0]);
          changed = true;
        }
      }
    }
    if (changed) {
      this.destinationChange.emit(this.destination);
    }
  }
  findItemIndex(list, item, key = "_id") {
    let idx = -1;
    function matchObject(e) {
      if (e._id === item[key]) {
        idx = list.indexOf(e);
        return true;
      }
      return false;
    }
    function match(e) {
      if (e._id === item) {
        idx = list.indexOf(e);
        return true;
      }
      return false;
    }
    if (typeof item === "object") {
      list.filter(matchObject);
    } else {
      list.filter(match);
    }
    return idx;
  }
  makeUnavailable(source, item) {
    const idx = source.list.indexOf(item);
    if (idx !== -1) {
      source.list.splice(idx, 1);
    }
  }
  moveItem(source, target, item = null, trueup = true) {
    let i = 0;
    let len = source.pick.length;
    if (item) {
      i = source.list.indexOf(item);
      len = i + 1;
    }
    for (; i < len; i += 1) {
      let mv = [];
      if (item) {
        const idx = this.findItemIndex(source.pick, item);
        if (idx !== -1) {
          mv[0] = source.pick[idx];
        }
      } else {
        mv = source.list.filter((src) => {
          return src._id === source.pick[i]._id;
        });
      }
      if (mv.length === 1) {
        if (target.list.filter((trg) => trg._id === mv[0]._id).length === 0) {
          target.list.push(mv[0]);
        }
        this.makeUnavailable(source, mv[0]);
      }
    }
    if (this.compare !== void 0) {
      target.list.sort(this.compare);
    }
    source.pick.length = 0;
    if (trueup) {
      this.trueUp();
    }
    setTimeout(() => {
      this.onFilter(source);
      this.onFilter(target);
    }, 10);
  }
  isItemSelected(list, item) {
    if (list.filter((e) => Object.is(e, item)).length > 0) {
      return true;
    }
    return false;
  }
  shiftClick(event, index, source, item) {
    if (event.shiftKey && source.last && !Object.is(item, source.last)) {
      const idx = source.sift.indexOf(source.last);
      if (index > idx) {
        for (let i = idx + 1; i < index; i += 1) {
          this.selectItem(source.pick, source.sift[i]);
        }
      } else if (idx !== -1) {
        for (let i = index + 1; i < idx; i += 1) {
          this.selectItem(source.pick, source.sift[i]);
        }
      }
    }
    source.last = item;
  }
  selectItem(list, item) {
    const pk = list.filter((e) => {
      return Object.is(e, item);
    });
    if (pk.length > 0) {
      for (let i = 0, len = pk.length; i < len; i += 1) {
        const idx = list.indexOf(pk[i]);
        if (idx !== -1) {
          list.splice(idx, 1);
        }
      }
    } else {
      list.push(item);
    }
  }
  selectAll(source) {
    source.pick.length = 0;
    source.pick = source.sift.slice(0);
  }
  selectNone(source) {
    source.pick.length = 0;
  }
  isAllSelected(source) {
    if (source.list.length === 0 || source.list.length === source.pick.length) {
      return true;
    }
    return false;
  }
  isAnySelected(source) {
    if (source.pick.length > 0) {
      return true;
    }
    return false;
  }
  unpick(source) {
    for (let i = source.pick.length - 1; i >= 0; i -= 1) {
      if (source.sift.indexOf(source.pick[i]) === -1) {
        source.pick.splice(i, 1);
      }
    }
  }
  clearFilter(source) {
    if (source) {
      source.picker = "";
      this.onFilter(source);
    }
  }
  onFilter(source) {
    if (source.picker.length > 0) {
      try {
        const filtered = source.list.filter((item) => {
          if (Object.prototype.toString.call(item) === "[object Object]") {
            if (item._name !== void 0) {
              return item._name.toLocaleLowerCase(this.format.locale).indexOf(source.picker.toLocaleLowerCase(this.format.locale)) !== -1;
            } else {
              return JSON.stringify(item).toLocaleLowerCase(this.format.locale).indexOf(source.picker.toLocaleLowerCase(this.format.locale)) !== -1;
            }
          } else {
            return item.toLocaleLowerCase(this.format.locale).indexOf(source.picker.toLocaleLowerCase(this.format.locale)) !== -1;
          }
        });
        source.sift = filtered;
        this.unpick(source);
      } catch (e) {
        if (e instanceof RangeError) {
          this.format.locale = void 0;
        }
        source.sift = source.list;
      }
    } else {
      source.sift = source.list;
    }
  }
  makeId(item) {
    if (typeof item === "object") {
      return item[this.key];
    } else {
      return item;
    }
  }
  // Allow for complex names by passing an array of strings.
  // Example: [display]="[ '_type.substring(0,1)', '_name' ]"
  makeName(item, separator = "_") {
    const display = this.display;
    function fallback(itm) {
      switch (Object.prototype.toString.call(itm)) {
        case "[object Number]":
          return itm;
        case "[object String]":
          return itm;
        default:
          if (itm !== void 0) {
            return itm[display];
          } else {
            return "undefined";
          }
      }
    }
    let str = "";
    if (this.display !== void 0) {
      switch (Object.prototype.toString.call(this.display)) {
        case "[object Function]":
          str = this.display(item);
          break;
        case "[object Array]":
          for (let i = 0, len = this.display.length; i < len; i += 1) {
            if (str.length > 0) {
              str = str + separator;
            }
            if (this.display[i].indexOf(".") === -1) {
              str = str + item[this.display[i]];
            } else {
              const parts = this.display[i].split(".");
              const s = item[parts[0]];
              if (s) {
                if (parts[1].indexOf("substring") !== -1) {
                  const nums = parts[1].substring(parts[1].indexOf("(") + 1, parts[1].indexOf(")")).split(",");
                  switch (nums.length) {
                    case 1:
                      str = str + s.substring(parseInt(nums[0], 10));
                      break;
                    case 2:
                      str = str + s.substring(parseInt(nums[0], 10), parseInt(nums[1], 10));
                      break;
                    default:
                      str = str + s;
                      break;
                  }
                } else {
                  str = str + s;
                }
              }
            }
          }
          break;
        default:
          str = fallback(item);
          break;
      }
    } else {
      str = fallback(item);
    }
    return str;
  }
};
DualListComponent.AVAILABLE_LIST_NAME = "available";
DualListComponent.CONFIRMED_LIST_NAME = "confirmed";
DualListComponent.LTR = "left-to-right";
DualListComponent.RTL = "right-to-left";
DualListComponent.DEFAULT_FORMAT = {
  add: "Add",
  remove: "Remove",
  all: "All",
  none: "None",
  direction: DualListComponent.LTR,
  draggable: true,
  locale: void 0
};
DualListComponent.ɵfac = function DualListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DualListComponent)(ɵɵdirectiveInject(IterableDiffers));
};
DualListComponent.ɵcmp = ɵɵdefineComponent({
  type: DualListComponent,
  selectors: [["dual-list"]],
  inputs: {
    id: "id",
    key: "key",
    display: "display",
    height: "height",
    filter: "filter",
    format: "format",
    sort: "sort",
    compare: "compare",
    disabled: "disabled",
    source: "source",
    destination: "destination"
  },
  outputs: {
    destinationChange: "destinationChange"
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature],
  decls: 25,
  vars: 40,
  consts: [["itmConf", ""], [1, "dual-list"], [1, "listbox", 3, "ngStyle"], ["type", "button", "name", "addBtn", 1, "btn", "btn-primary", "btn-block", 3, "click", "ngClass", "disabled"], ["class", "filter", 4, "ngIf"], [1, "record-picker"], [3, "drop", "dragover", "dragleave", "ngStyle", "ngClass"], [3, "ngClass", "draggable", "click", "dragstart", "dragend", 4, "ngFor", "ngForOf"], [1, "button-bar"], ["type", "button", 1, "btn", "btn-primary", "pull-left", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-default", "pull-right", 3, "click", "disabled"], ["type", "button", "name", "removeBtn", 1, "btn", "btn-primary", "btn-block", 3, "click", "ngClass", "disabled"], [1, "filter"], ["name", "filterSource", 1, "form-control", 3, "ngModelChange", "ngModel"], [3, "click", "dragstart", "dragend", "ngClass", "draggable"], ["name", "filterDestination", 1, "form-control", 3, "ngModelChange", "ngModel"]],
  template: function DualListComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "button", 3);
      ɵɵlistener("click", function DualListComponent_Template_button_click_2_listener() {
        return ctx.moveItem(ctx.available, ctx.confirmed);
      });
      ɵɵtext(3);
      ɵɵelementEnd();
      ɵɵtemplate(4, DualListComponent_form_4_Template, 2, 1, "form", 4);
      ɵɵelementStart(5, "div", 5)(6, "ul", 6);
      ɵɵlistener("drop", function DualListComponent_Template_ul_drop_6_listener($event) {
        return ctx.drop($event, ctx.confirmed);
      })("dragover", function DualListComponent_Template_ul_dragover_6_listener($event) {
        return ctx.allowDrop($event, ctx.available);
      })("dragleave", function DualListComponent_Template_ul_dragleave_6_listener() {
        return ctx.dragLeave();
      });
      ɵɵtemplate(7, DualListComponent_li_7_Template, 3, 6, "li", 7);
      ɵɵelementEnd()();
      ɵɵelementStart(8, "div", 8)(9, "button", 9);
      ɵɵlistener("click", function DualListComponent_Template_button_click_9_listener() {
        return ctx.selectAll(ctx.available);
      });
      ɵɵtext(10);
      ɵɵelementEnd();
      ɵɵelementStart(11, "button", 10);
      ɵɵlistener("click", function DualListComponent_Template_button_click_11_listener() {
        return ctx.selectNone(ctx.available);
      });
      ɵɵtext(12);
      ɵɵelementEnd()()();
      ɵɵelementStart(13, "div", 2)(14, "button", 11);
      ɵɵlistener("click", function DualListComponent_Template_button_click_14_listener() {
        return ctx.moveItem(ctx.confirmed, ctx.available);
      });
      ɵɵtext(15);
      ɵɵelementEnd();
      ɵɵtemplate(16, DualListComponent_form_16_Template, 2, 1, "form", 4);
      ɵɵelementStart(17, "div", 5)(18, "ul", 6);
      ɵɵlistener("drop", function DualListComponent_Template_ul_drop_18_listener($event) {
        return ctx.drop($event, ctx.available);
      })("dragover", function DualListComponent_Template_ul_dragover_18_listener($event) {
        return ctx.allowDrop($event, ctx.confirmed);
      })("dragleave", function DualListComponent_Template_ul_dragleave_18_listener() {
        return ctx.dragLeave();
      });
      ɵɵtemplate(19, DualListComponent_li_19_Template, 4, 6, "li", 7);
      ɵɵelementEnd()();
      ɵɵelementStart(20, "div", 8)(21, "button", 9);
      ɵɵlistener("click", function DualListComponent_Template_button_click_21_listener() {
        return ctx.selectAll(ctx.confirmed);
      });
      ɵɵtext(22);
      ɵɵelementEnd();
      ɵɵelementStart(23, "button", 10);
      ɵɵlistener("click", function DualListComponent_Template_button_click_23_listener() {
        return ctx.selectNone(ctx.confirmed);
      });
      ɵɵtext(24);
      ɵɵelementEnd()()()();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngStyle", ɵɵpureFunction2(24, _c0, ctx.direction() ? 1 : 2, ctx.direction() ? 0 : "10px"));
      ɵɵadvance();
      ɵɵproperty("ngClass", ctx.direction() ? "point-right" : "point-left")("disabled", ctx.available.pick.length === 0);
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.format.add);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.filter);
      ɵɵadvance(2);
      ɵɵproperty("ngStyle", ɵɵpureFunction2(27, _c1, ctx.height, ctx.height))("ngClass", ɵɵpureFunction1(30, _c2, ctx.available.dragOver));
      ɵɵadvance();
      ɵɵproperty("ngForOf", ctx.available.sift);
      ɵɵadvance(2);
      ɵɵproperty("disabled", ctx.disabled || ctx.isAllSelected(ctx.available));
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.format.all);
      ɵɵadvance();
      ɵɵproperty("disabled", !ctx.isAnySelected(ctx.available));
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.format.none);
      ɵɵadvance();
      ɵɵproperty("ngStyle", ɵɵpureFunction2(32, _c0, ctx.direction() ? 2 : 1, ctx.direction() ? "10px" : 0));
      ɵɵadvance();
      ɵɵproperty("ngClass", ctx.direction() ? "point-left" : "point-right")("disabled", ctx.confirmed.pick.length === 0);
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.format.remove);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.filter);
      ɵɵadvance(2);
      ɵɵproperty("ngStyle", ɵɵpureFunction2(35, _c1, ctx.height, ctx.height))("ngClass", ɵɵpureFunction1(38, _c2, ctx.confirmed.dragOver));
      ɵɵadvance();
      ɵɵproperty("ngForOf", ctx.confirmed.sift);
      ɵɵadvance(2);
      ɵɵproperty("disabled", ctx.disabled || ctx.isAllSelected(ctx.confirmed));
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.format.all);
      ɵɵadvance();
      ɵɵproperty("disabled", !ctx.isAnySelected(ctx.confirmed));
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.format.none);
    }
  },
  dependencies: [NgClass, NgForOf, NgIf, NgStyle, ɵNgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm],
  styles: [`div.record-picker[_ngcontent-%COMP%]{overflow-x:hidden;overflow-y:auto;border:1px solid #ddd;border-radius:8px;position:relative;cursor:pointer}div.record-picker[_ngcontent-%COMP%]::-webkit-scrollbar{width:12px}div.record-picker[_ngcontent-%COMP%]::-webkit-scrollbar-button{width:0px;height:0px}div.record-picker[_ngcontent-%COMP%]{scrollbar-base-color:#337ab7;scrollbar-3dlight-color:#337ab7;scrollbar-highlight-color:#337ab7;scrollbar-track-color:#eee;scrollbar-arrow-color:gray;scrollbar-shadow-color:gray;scrollbar-dark-shadow-color:gray}div.record-picker[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#eee;box-shadow:0 0 3px #dfdfdf inset;border-top-right-radius:8px;border-bottom-right-radius:8px}div.record-picker[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#337ab7;border:thin solid gray;border-top-right-radius:8px;border-bottom-right-radius:8px}div.record-picker[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:#286090}.record-picker[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0;padding:0 0 1px}.record-picker[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{border-top:thin solid #ddd;border-bottom:1px solid #ddd;display:block;padding:2px 2px 2px 10px;margin-bottom:-1px;font-size:.85em;cursor:pointer;white-space:nowrap;min-height:16px}.record-picker[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:#f5f5f5}.record-picker[_ngcontent-%COMP%]   li.selected[_ngcontent-%COMP%]{background-color:#d9edf7}.record-picker[_ngcontent-%COMP%]   li.selected[_ngcontent-%COMP%]:hover{background-color:#c4e3f3}.record-picker[_ngcontent-%COMP%]   li.disabled[_ngcontent-%COMP%]{opacity:.5;cursor:default;background-color:inherit}.record-picker[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child{border-top-left-radius:8px;border-top-right-radius:8px;border-top:none}.record-picker[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{border-bottom-left-radius:8px;border-bottom-right-radius:8px;border-bottom:none}.record-picker[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{cursor:pointer;font-weight:inherit;font-size:14px;padding:4px;margin-bottom:-1px;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.record-picker[_ngcontent-%COMP%]   ul.over[_ngcontent-%COMP%]{background-color:#d3d3d3}.dual-list[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-content:flex-start}.dual-list[_ngcontent-%COMP%]   .listbox[_ngcontent-%COMP%]{width:50%;margin:0}.dual-list[_ngcontent-%COMP%]   .button-bar[_ngcontent-%COMP%]{margin-top:8px}.point-right[_ngcontent-%COMP%]:after{content:"\\25b6";padding-left:1em}.point-left[_ngcontent-%COMP%]:before{content:"\\25c0";padding-right:1em}.dual-list[_ngcontent-%COMP%]   .button-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:47%}button.btn-block[_ngcontent-%COMP%]{display:block;width:100%;margin-bottom:8px}.filter[_ngcontent-%COMP%]{margin-bottom:-2.2em}.filter[_ngcontent-%COMP%]:after{content:"o";width:40px;color:transparent;font-size:2em;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 64l192 192v192l128-32V256L512 64H0z"/></svg>');background-repeat:no-repeat;background-position:center center;opacity:.2;top:-36px;left:calc(100% - 21px);position:relative}`]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DualListComponent, [{
    type: Component,
    args: [{
      selector: "dual-list",
      template: `<div class="dual-list">
	<div class="listbox" [ngStyle]="{ 'order' :  direction() ? 1 : 2, 'margin-left' : direction() ? 0 : '10px' }">
		<button type="button" name="addBtn" class="btn btn-primary btn-block"
			(click)="moveItem(available, confirmed)" [ngClass]="direction() ? 'point-right' : 'point-left'"
			[disabled]="available.pick.length === 0">{{format.add}}</button>

		<form *ngIf="filter" class="filter">
			<input class="form-control" name="filterSource" [(ngModel)]="available.picker" (ngModelChange)="onFilter(available)">
		</form>

		<div class="record-picker">
			<ul [ngStyle]="{'max-height': height, 'min-height': height}" [ngClass]="{over:available.dragOver}"
				(drop)="drop($event, confirmed)" (dragover)="allowDrop($event, available)" (dragleave)="dragLeave()">
				<li *ngFor="let item of available.sift; let idx=index;"
					(click)="disabled ? null : selectItem(available.pick, item); shiftClick($event, idx, available, item)"
					[ngClass]="{selected: isItemSelected(available.pick, item), disabled: disabled}"
					[draggable]="!disabled && format.draggable" (dragstart)="drag($event, item, available)" (dragend)="dragEnd(available)"
				><label>{{item._name}}</label></li>
			</ul>
		</div>

		<div class="button-bar">
			<button type="button" class="btn btn-primary pull-left" (click)="selectAll(available)"
				[disabled]="disabled || isAllSelected(available)">{{format.all}}</button>
			<button type="button" class="btn btn-default pull-right" (click)="selectNone(available)"
				[disabled]="!isAnySelected(available)">{{format.none}}</button>
		</div>
	</div>

	<div class="listbox" [ngStyle]="{ 'order' : direction() ? 2 : 1, 'margin-left' : direction() ? '10px' : 0 }">
		<button type="button" name="removeBtn" class="btn btn-primary btn-block"
			(click)="moveItem(confirmed, available)" [ngClass]="direction() ? 'point-left' : 'point-right'"
			[disabled]="confirmed.pick.length === 0">{{format.remove}}</button>

		<form *ngIf="filter" class="filter">
			<input class="form-control" name="filterDestination" [(ngModel)]="confirmed.picker" (ngModelChange)="onFilter(confirmed)">
		</form>

		<div class="record-picker">
			<ul [ngStyle]="{'max-height': height, 'min-height': height}" [ngClass]="{over:confirmed.dragOver}"
				(drop)="drop($event, available)" (dragover)="allowDrop($event, confirmed)" (dragleave)="dragLeave()">
				<li #itmConf *ngFor="let item of confirmed.sift; let idx=index;"
					(click)="disabled ? null : selectItem(confirmed.pick, item); shiftClick($event, idx, confirmed, item)"
					[ngClass]="{selected: isItemSelected(confirmed.pick, item), disabled: disabled}"
					[draggable]="!disabled && format.draggable" (dragstart)="drag($event, item, confirmed)" (dragend)="dragEnd(confirmed)"
				><label>{{item._name}}</label></li>
			</ul>
		</div>

		<div class="button-bar">
			<button type="button" class="btn btn-primary pull-left" (click)="selectAll(confirmed)"
				[disabled]="disabled || isAllSelected(confirmed)">{{format.all}}</button>
			<button type="button" class="btn btn-default pull-right" (click)="selectNone(confirmed)"
				[disabled]="!isAnySelected(confirmed)">{{format.none}}</button>
		</div>
	</div>
</div>
`,
      styles: [`div.record-picker{overflow-x:hidden;overflow-y:auto;border:1px solid #ddd;border-radius:8px;position:relative;cursor:pointer}div.record-picker::-webkit-scrollbar{width:12px}div.record-picker::-webkit-scrollbar-button{width:0px;height:0px}div.record-picker{scrollbar-base-color:#337ab7;scrollbar-3dlight-color:#337ab7;scrollbar-highlight-color:#337ab7;scrollbar-track-color:#eee;scrollbar-arrow-color:gray;scrollbar-shadow-color:gray;scrollbar-dark-shadow-color:gray}div.record-picker::-webkit-scrollbar-track{background:#eee;box-shadow:0 0 3px #dfdfdf inset;border-top-right-radius:8px;border-bottom-right-radius:8px}div.record-picker::-webkit-scrollbar-thumb{background:#337ab7;border:thin solid gray;border-top-right-radius:8px;border-bottom-right-radius:8px}div.record-picker::-webkit-scrollbar-thumb:hover{background:#286090}.record-picker ul{margin:0;padding:0 0 1px}.record-picker li{border-top:thin solid #ddd;border-bottom:1px solid #ddd;display:block;padding:2px 2px 2px 10px;margin-bottom:-1px;font-size:.85em;cursor:pointer;white-space:nowrap;min-height:16px}.record-picker li:hover{background-color:#f5f5f5}.record-picker li.selected{background-color:#d9edf7}.record-picker li.selected:hover{background-color:#c4e3f3}.record-picker li.disabled{opacity:.5;cursor:default;background-color:inherit}.record-picker li:first-child{border-top-left-radius:8px;border-top-right-radius:8px;border-top:none}.record-picker li:last-child{border-bottom-left-radius:8px;border-bottom-right-radius:8px;border-bottom:none}.record-picker label{cursor:pointer;font-weight:inherit;font-size:14px;padding:4px;margin-bottom:-1px;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.record-picker ul.over{background-color:#d3d3d3}.dual-list{display:flex;flex-direction:row;align-content:flex-start}.dual-list .listbox{width:50%;margin:0}.dual-list .button-bar{margin-top:8px}.point-right:after{content:"\\25b6";padding-left:1em}.point-left:before{content:"\\25c0";padding-right:1em}.dual-list .button-bar button{width:47%}button.btn-block{display:block;width:100%;margin-bottom:8px}.filter{margin-bottom:-2.2em}.filter:after{content:"o";width:40px;color:transparent;font-size:2em;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 64l192 192v192l128-32V256L512 64H0z"/></svg>');background-repeat:no-repeat;background-position:center center;opacity:.2;top:-36px;left:calc(100% - 21px);position:relative}
`]
    }]
  }], function() {
    return [{
      type: IterableDiffers
    }];
  }, {
    id: [{
      type: Input
    }],
    key: [{
      type: Input
    }],
    display: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    filter: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    sort: [{
      type: Input
    }],
    compare: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    source: [{
      type: Input
    }],
    destination: [{
      type: Input
    }],
    destinationChange: [{
      type: Output
    }]
  });
})();
var AngularDualListBoxModule = class {
};
AngularDualListBoxModule.ɵfac = function AngularDualListBoxModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AngularDualListBoxModule)();
};
AngularDualListBoxModule.ɵmod = ɵɵdefineNgModule({
  type: AngularDualListBoxModule,
  declarations: [DualListComponent],
  imports: [CommonModule, FormsModule],
  exports: [DualListComponent]
});
AngularDualListBoxModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, FormsModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularDualListBoxModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FormsModule],
      declarations: [DualListComponent],
      exports: [DualListComponent]
    }]
  }], null, null);
})();
export {
  AngularDualListBoxModule,
  BasicList,
  DualListComponent
};
//# sourceMappingURL=angular-dual-listbox.js.map
