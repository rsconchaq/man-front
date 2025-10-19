import "./chunk-JDNQKD2S.js";
import {
  CdkStepper,
  CdkStepperModule,
  STEPPER_GLOBAL_OPTIONS
} from "./chunk-ICXJI5HT.js";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-4AETYW7Y.js";
import "./chunk-JSR6TOC4.js";
import "./chunk-QVHWJFUJ.js";
import "./chunk-NZSRE44N.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgTemplateOutlet
} from "./chunk-WWWOAELD.js";
import "./chunk-PZXV3NIF.js";
import {
  Component,
  NgModule,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate
} from "./chunk-NF52DVN7.js";
import "./chunk-OKKFPXIG.js";
import "./chunk-BRF755KY.js";
import "./chunk-BJIUIRBV.js";
import "./chunk-IYEYSCYL.js";
import "./chunk-SXK72SKC.js";

// node_modules/angular-ng-stepper/fesm2020/angular-ng-stepper.mjs
var _c0 = [[["", 8, "step-bullet"]], [["", 8, "step-title"]]];
var _c1 = [".step-bullet", ".step-title"];
var _c2 = (a0, a1, a2) => ({
  active: a0,
  completed: a1,
  done: a2
});
function NgStepperComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "li", 6);
    ɵɵlistener("click", function NgStepperComponent_ng_container_3_Template_li_click_1_listener() {
      const i_r2 = ɵɵrestoreView(_r1).index;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.selectedIndex = i_r2);
    });
    ɵɵelementContainerStart(2, 7);
    ɵɵprojection(3);
    ɵɵprojection(4, 1);
    ɵɵelementContainerEnd();
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const step_r4 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction3(2, _c2, ctx_r2.selectedIndex === i_r2, step_r4.completed && i_r2 < ctx_r2.selectedIndex, step_r4.state === "done" && i_r2 === ctx_r2.selectedIndex));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", step_r4.stepLabel.template);
  }
}
function NgStepperComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵelementContainer(1, 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const step_r5 = ctx.$implicit;
    const i_r6 = ctx.index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassProp("active", ctx_r2.selectedIndex === i_r6);
    ɵɵproperty("@stepTransition", ctx_r2._getAnimationDirection(i_r6));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", step_r5.content);
  }
}
var NgStepperComponent = class extends CdkStepper {
  ngOnInit() {
  }
};
NgStepperComponent.ɵfac = /* @__PURE__ */ (() => {
  let ɵNgStepperComponent_BaseFactory;
  return function NgStepperComponent_Factory(__ngFactoryType__) {
    return (ɵNgStepperComponent_BaseFactory || (ɵNgStepperComponent_BaseFactory = ɵɵgetInheritedFactory(NgStepperComponent)))(__ngFactoryType__ || NgStepperComponent);
  };
})();
NgStepperComponent.ɵcmp = ɵɵdefineComponent({
  type: NgStepperComponent,
  selectors: [["ng-stepper"]],
  standalone: false,
  features: [ɵɵProvidersFeature([{
    provide: CdkStepper,
    useExisting: NgStepperComponent
  }, {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {
      displayDefaultIndicatorType: false
    }
  }]), ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c1,
  decls: 6,
  vars: 2,
  consts: [[1, "stepper"], [1, "stepper-header"], [1, "steps"], [4, "ngFor", "ngForOf"], [1, "stepper-body"], ["class", "content", 3, "active", 4, "ngFor", "ngForOf"], [1, "step", 3, "click", "ngClass"], [3, "ngTemplateOutlet"], [1, "content"]],
  template: function NgStepperComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c0);
      ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "ol", 2);
      ɵɵtemplate(3, NgStepperComponent_ng_container_3_Template, 5, 6, "ng-container", 3);
      ɵɵelementEnd()();
      ɵɵelementStart(4, "div", 4);
      ɵɵtemplate(5, NgStepperComponent_div_5_Template, 2, 4, "div", 5);
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵproperty("ngForOf", ctx.steps);
      ɵɵadvance(2);
      ɵɵproperty("ngForOf", ctx._steps);
    }
  },
  dependencies: [NgClass, NgForOf, NgTemplateOutlet],
  styles: ['[_nghost-%COMP%]{display:block;overflow:hidden}.stepper-header[_ngcontent-%COMP%]   .steps[_ngcontent-%COMP%]{width:100%;list-style:none;display:inline-flex;align-items:center;margin:0 auto}.stepper-header[_ngcontent-%COMP%]   .steps[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%]{text-align:center;font-size:1em}.stepper-header[_ngcontent-%COMP%]   .steps[_ngcontent-%COMP%]     .step .step-bullet{position:relative;display:inline-flex;justify-content:center;align-items:center;height:40px;width:40px;background-color:#b3babe;border-radius:50%;color:#fff;font-size:1.3rem;text-align:center;text-decoration:none;cursor:pointer}.stepper-header[_ngcontent-%COMP%]   .steps[_ngcontent-%COMP%]     .step .step-title{position:absolute;right:0;bottom:-5px;left:0;margin:auto 0;height:0}.stepper-header[_ngcontent-%COMP%]   .steps[_ngcontent-%COMP%]     .step.active .step-bullet{background-color:#306bff}.stepper-header[_ngcontent-%COMP%]   .steps[_ngcontent-%COMP%]     .step.completed .step-bullet{background-color:#32e67f}.stepper-header[_ngcontent-%COMP%]   .steps[_ngcontent-%COMP%]     .step.done .step-bullet{background-color:#32e67f}.stepper-body[_ngcontent-%COMP%]{margin:25px auto;padding:1rem}.stepper-body[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]:not(.active){height:0;overflow:hidden}.step[_ngcontent-%COMP%]{position:relative;width:33.33%}.step[_ngcontent-%COMP%]:after{content:"";position:absolute;width:100%;height:3px;background-color:#b3babe;top:50%;left:-50%;z-index:-1}.step[_ngcontent-%COMP%]:first-child:after{content:none}.step.completed[_ngcontent-%COMP%] + .step[_ngcontent-%COMP%]:after{background-color:#32e67f}'],
  data: {
    animation: [trigger("stepTransition", [state("previous", style({
      transform: "translateX(-100%)",
      opacity: 0
    })), state("current", style({
      transform: "translateX(0)",
      opacity: 1
    })), state("next", style({
      transform: "translateX(100%)",
      opacity: 0
    })), transition(":enter", animate(0)), transition("previous => current", animate("500ms cubic-bezier(0.35, 0, 0.25, 1)")), transition("next => current", animate("500ms cubic-bezier(0.35, 0, 0.25, 1)"))])]
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgStepperComponent, [{
    type: Component,
    args: [{
      selector: "ng-stepper",
      providers: [{
        provide: CdkStepper,
        useExisting: NgStepperComponent
      }, {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: {
          displayDefaultIndicatorType: false
        }
      }],
      animations: [trigger("stepTransition", [state("previous", style({
        transform: "translateX(-100%)",
        opacity: 0
      })), state("current", style({
        transform: "translateX(0)",
        opacity: 1
      })), state("next", style({
        transform: "translateX(100%)",
        opacity: 0
      })), transition(":enter", animate(0)), transition("previous => current", animate("500ms cubic-bezier(0.35, 0, 0.25, 1)")), transition("next => current", animate("500ms cubic-bezier(0.35, 0, 0.25, 1)"))])],
      template: `<div class="stepper">
  <div class="stepper-header">
    <ol class="steps">
      <ng-container *ngFor="let step of steps; let i = index;">
        <li class="step" (click)="selectedIndex = i"
            [ngClass]="{
                active: selectedIndex === i,
                completed: step.completed && i < selectedIndex,
                done: step.state === 'done' && i === selectedIndex
                }">
          <ng-container [ngTemplateOutlet]="step.stepLabel.template">
            <ng-content select=".step-bullet"></ng-content>
            <ng-content select=".step-title"></ng-content>
          </ng-container>
        </li>
      </ng-container>
    </ol>
  </div>
  <div class="stepper-body">
    <div class="content"
         *ngFor="let step of _steps; let i = index"
         [class.active]="selectedIndex === i"
         [@stepTransition]="_getAnimationDirection(i)">
      <ng-container [ngTemplateOutlet]="step.content"></ng-container>
    </div>
  </div>
</div>

`,
      styles: [':host{display:block;overflow:hidden}.stepper-header .steps{width:100%;list-style:none;display:inline-flex;align-items:center;margin:0 auto}.stepper-header .steps .step{text-align:center;font-size:1em}.stepper-header .steps ::ng-deep .step .step-bullet{position:relative;display:inline-flex;justify-content:center;align-items:center;height:40px;width:40px;background-color:#b3babe;border-radius:50%;color:#fff;font-size:1.3rem;text-align:center;text-decoration:none;cursor:pointer}.stepper-header .steps ::ng-deep .step .step-title{position:absolute;right:0;bottom:-5px;left:0;margin:auto 0;height:0}.stepper-header .steps ::ng-deep .step.active .step-bullet{background-color:#306bff}.stepper-header .steps ::ng-deep .step.completed .step-bullet{background-color:#32e67f}.stepper-header .steps ::ng-deep .step.done .step-bullet{background-color:#32e67f}.stepper-body{margin:25px auto;padding:1rem}.stepper-body .content:not(.active){height:0;overflow:hidden}.step{position:relative;width:33.33%}.step:after{content:"";position:absolute;width:100%;height:3px;background-color:#b3babe;top:50%;left:-50%;z-index:-1}.step:first-child:after{content:none}.step.completed+.step:after{background-color:#32e67f}\n']
    }]
  }], null, null);
})();
var NgStepperModule = class {
};
NgStepperModule.ɵfac = function NgStepperModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgStepperModule)();
};
NgStepperModule.ɵmod = ɵɵdefineNgModule({
  type: NgStepperModule,
  declarations: [NgStepperComponent],
  imports: [CommonModule, CdkStepperModule],
  exports: [NgStepperComponent]
});
NgStepperModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, CdkStepperModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgStepperModule, [{
    type: NgModule,
    args: [{
      declarations: [NgStepperComponent],
      imports: [CommonModule, CdkStepperModule],
      exports: [NgStepperComponent]
    }]
  }], null, null);
})();
export {
  NgStepperComponent,
  NgStepperModule
};
//# sourceMappingURL=angular-ng-stepper.js.map
