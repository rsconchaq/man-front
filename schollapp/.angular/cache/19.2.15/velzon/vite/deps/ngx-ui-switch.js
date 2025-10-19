import {
  FormsModule,
  NG_VALUE_ACCESSOR
} from "./chunk-XSYELPUF.js";
import {
  CommonModule,
  NgIf
} from "./chunk-WWWOAELD.js";
import "./chunk-PZXV3NIF.js";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Output,
  forwardRef,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-NF52DVN7.js";
import "./chunk-OKKFPXIG.js";
import "./chunk-BRF755KY.js";
import "./chunk-BJIUIRBV.js";
import "./chunk-IYEYSCYL.js";
import "./chunk-SXK72SKC.js";

// node_modules/ngx-ui-switch/fesm2022/ngx-ui-switch.mjs
var _c0 = ["*"];
function UiSwitchComponent_label_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "label", 2)(1, "span", 3);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "span", 4);
    ɵɵtext(4);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵstyleProp("color", ctx_r0.getColor("checkedTextColor"));
    ɵɵattribute("aria-label", ctx_r0.checkedLabel);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.checkedLabel);
    ɵɵadvance();
    ɵɵstyleProp("color", ctx_r0.getColor("uncheckedTextColor"));
    ɵɵattribute("aria-label", ctx_r0.uncheckedLabel);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.uncheckedLabel);
  }
}
var UI_SWITCH_OPTIONS = new InjectionToken("UI_SWITCH_OPTIONS");
var UI_SWITCH_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UiSwitchComponent),
  multi: true
};
var UiSwitchComponent = class _UiSwitchComponent {
  cdr;
  _checked;
  _disabled;
  _reverse;
  _loading;
  _beforeChange;
  size;
  color;
  switchOffColor;
  switchColor;
  defaultBgColor;
  defaultBoColor;
  checkedLabel;
  uncheckedLabel;
  checkedTextColor;
  uncheckedTextColor;
  beforeChange;
  ariaLabel;
  set checked(v) {
    this._checked = v !== false;
  }
  get checked() {
    return this._checked;
  }
  set disabled(v) {
    this._disabled = v !== false;
  }
  get disabled() {
    return this._disabled;
  }
  set reverse(v) {
    this._reverse = v !== false;
  }
  get reverse() {
    return this._reverse;
  }
  set loading(v) {
    this._loading = v !== false;
  }
  get loading() {
    return this._loading;
  }
  /**
   * Emits changed value
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  change = new EventEmitter();
  /**
   * Emits DOM event
   */
  changeEvent = new EventEmitter();
  /**
   * Emits changed value
   */
  valueChange = new EventEmitter();
  constructor(config = {}, cdr) {
    this.cdr = cdr;
    this.size = config && config.size || "medium";
    this.color = config && config.color;
    this.switchOffColor = config && config.switchOffColor;
    this.switchColor = config && config.switchColor;
    this.defaultBgColor = config && config.defaultBgColor;
    this.defaultBoColor = config && config.defaultBoColor;
    this.checkedLabel = config && config.checkedLabel;
    this.uncheckedLabel = config && config.uncheckedLabel;
    this.checkedTextColor = config && config.checkedTextColor;
    this.uncheckedTextColor = config && config.uncheckedTextColor;
  }
  getColor(flag = "") {
    if (flag === "borderColor") {
      return this.defaultBoColor;
    }
    if (flag === "switchColor") {
      if (this.reverse) {
        return !this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
      }
      return this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
    }
    if (flag === "checkedTextColor") {
      return this.reverse ? this.uncheckedTextColor : this.checkedTextColor;
    }
    if (flag === "uncheckedTextColor") {
      return this.reverse ? this.checkedTextColor : this.uncheckedTextColor;
    }
    if (this.reverse) {
      return !this.checked ? this.color : this.defaultBgColor;
    }
    return this.checked ? this.color : this.defaultBgColor;
  }
  onClick(event) {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.change.emit(this.checked);
    this.valueChange.emit(this.checked);
    this.changeEvent.emit(event);
    this.onChangeCallback(this.checked);
    this.onTouchedCallback(this.checked);
    this.cdr.markForCheck();
  }
  onToggle(event) {
    if (this.disabled) {
      return;
    }
    if (this.beforeChange) {
      this._beforeChange = this.beforeChange.subscribe((confirm) => {
        if (confirm) {
          this.onClick(event);
        }
      });
    } else {
      this.onClick(event);
    }
  }
  writeValue(obj) {
    if (obj !== this.checked) {
      this.checked = !!obj;
    }
    this.onChangeCallback(this.checked);
    if (this.cdr) {
      this.cdr.markForCheck();
    }
  }
  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  onTouchedCallback = (v) => {
  };
  onChangeCallback = (v) => {
  };
  ngOnDestroy() {
    if (this._beforeChange) {
      this._beforeChange.unsubscribe();
    }
  }
  static ɵfac = function UiSwitchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UiSwitchComponent)(ɵɵdirectiveInject(UI_SWITCH_OPTIONS, 8), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _UiSwitchComponent,
    selectors: [["ui-switch"]],
    hostBindings: function UiSwitchComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function UiSwitchComponent_click_HostBindingHandler($event) {
          return ctx.onToggle($event);
        });
      }
    },
    inputs: {
      size: "size",
      color: "color",
      switchOffColor: "switchOffColor",
      switchColor: "switchColor",
      defaultBgColor: "defaultBgColor",
      defaultBoColor: "defaultBoColor",
      checkedLabel: "checkedLabel",
      uncheckedLabel: "uncheckedLabel",
      checkedTextColor: "checkedTextColor",
      uncheckedTextColor: "uncheckedTextColor",
      beforeChange: "beforeChange",
      ariaLabel: "ariaLabel",
      checked: "checked",
      disabled: "disabled",
      reverse: "reverse",
      loading: "loading"
    },
    outputs: {
      change: "change",
      changeEvent: "changeEvent",
      valueChange: "valueChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([UI_SWITCH_CONTROL_VALUE_ACCESSOR])],
    ngContentSelectors: _c0,
    decls: 4,
    vars: 21,
    consts: [["type", "button", "role", "switch", 1, "switch"], ["class", "switch-pane", 4, "ngIf"], [1, "switch-pane"], [1, "switch-label-checked"], [1, "switch-label-unchecked"]],
    template: function UiSwitchComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "button", 0);
        ɵɵtemplate(1, UiSwitchComponent_label_1_Template, 5, 8, "label", 1);
        ɵɵelementStart(2, "small");
        ɵɵprojection(3);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵstyleProp("background-color", ctx.getColor())("border-color", ctx.getColor("borderColor"));
        ɵɵclassProp("checked", ctx.checked)("disabled", ctx.disabled)("loading", ctx.loading)("switch-large", ctx.size === "large")("switch-medium", ctx.size === "medium")("switch-small", ctx.size === "small");
        ɵɵattribute("aria-checked", ctx.checked)("aria-label", ctx.ariaLabel);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.checkedLabel || ctx.uncheckedLabel);
        ɵɵadvance();
        ɵɵstyleProp("background", ctx.getColor("switchColor"));
      }
    },
    dependencies: [NgIf],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UiSwitchComponent, [{
    type: Component,
    args: [{
      selector: "ui-switch",
      providers: [UI_SWITCH_CONTROL_VALUE_ACCESSOR],
      template: `<button
  type="button"
  class="switch"
  role="switch"
  [attr.aria-checked]="checked"
  [attr.aria-label]="ariaLabel"
  [class.checked]="checked"
  [class.disabled]="disabled"
  [class.loading]="loading"
  [class.switch-large]="size === 'large'"
  [class.switch-medium]="size === 'medium'"
  [class.switch-small]="size === 'small'"
  [style.background-color]="getColor()"
  [style.border-color]="getColor('borderColor')"
>
  <label class="switch-pane" *ngIf="checkedLabel || uncheckedLabel">
    <span
      [attr.aria-label]="this.checkedLabel"
      class="switch-label-checked"
      [style.color]="getColor('checkedTextColor')"
      >{{ this.checkedLabel }}</span
    >
    <span
      [attr.aria-label]="this.uncheckedLabel"
      class="switch-label-unchecked"
      [style.color]="getColor('uncheckedTextColor')"
      >{{ this.uncheckedLabel }}</span
    >
  </label>
  <small [style.background]="getColor('switchColor')">
    <ng-content></ng-content>
  </small>
</button>
`
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [UI_SWITCH_OPTIONS]
      }, {
        type: Optional
      }]
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    size: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    switchOffColor: [{
      type: Input
    }],
    switchColor: [{
      type: Input
    }],
    defaultBgColor: [{
      type: Input
    }],
    defaultBoColor: [{
      type: Input
    }],
    checkedLabel: [{
      type: Input
    }],
    uncheckedLabel: [{
      type: Input
    }],
    checkedTextColor: [{
      type: Input
    }],
    uncheckedTextColor: [{
      type: Input
    }],
    beforeChange: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    checked: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    reverse: [{
      type: Input
    }],
    loading: [{
      type: Input
    }],
    change: [{
      type: Output
    }],
    changeEvent: [{
      type: Output
    }],
    valueChange: [{
      type: Output
    }],
    onToggle: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var UiSwitchModule = class _UiSwitchModule {
  static forRoot(config) {
    return {
      ngModule: _UiSwitchModule,
      providers: [{
        provide: UI_SWITCH_OPTIONS,
        useValue: config || {}
      }]
    };
  }
  static ɵfac = function UiSwitchModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UiSwitchModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _UiSwitchModule,
    declarations: [UiSwitchComponent],
    imports: [CommonModule, FormsModule],
    exports: [FormsModule, UiSwitchComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, FormsModule, FormsModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UiSwitchModule, [{
    type: NgModule,
    args: [{
      declarations: [UiSwitchComponent],
      imports: [CommonModule, FormsModule],
      exports: [FormsModule, UiSwitchComponent]
    }]
  }], null, null);
})();
export {
  UiSwitchComponent,
  UiSwitchModule
};
//# sourceMappingURL=ngx-ui-switch.js.map
