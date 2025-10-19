import {
  NgModule,
  Pipe,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵgetInheritedFactory
} from "./chunk-NF52DVN7.js";
import "./chunk-OKKFPXIG.js";
import "./chunk-BRF755KY.js";
import "./chunk-BJIUIRBV.js";
import "./chunk-IYEYSCYL.js";
import "./chunk-SXK72SKC.js";

// node_modules/ngx-pipes/fesm2020/ngx-pipes.mjs
var DiffPipe = class {
  transform(input, ...args) {
    if (!Array.isArray(input)) {
      return input;
    }
    return args.reduce((d, c) => d.filter((e) => !~c.indexOf(e)), input);
  }
};
DiffPipe.ɵfac = function DiffPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DiffPipe)();
};
DiffPipe.ɵpipe = ɵɵdefinePipe({
  name: "diff",
  type: DiffPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DiffPipe, [{
    type: Pipe,
    args: [{
      name: "diff"
    }]
  }], null, null);
})();
var InitialPipe = class {
  transform(input, num = 0) {
    return Array.isArray(input) ? input.slice(0, input.length - num) : input;
  }
};
InitialPipe.ɵfac = function InitialPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || InitialPipe)();
};
InitialPipe.ɵpipe = ɵɵdefinePipe({
  name: "initial",
  type: InitialPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InitialPipe, [{
    type: Pipe,
    args: [{
      name: "initial"
    }]
  }], null, null);
})();
var FlattenPipe = class {
  transform(input, shallow = false) {
    if (!Array.isArray(input)) {
      return input;
    }
    return shallow ? [].concat.apply([], input) : this.flatten(input);
  }
  flatten(array) {
    return array.reduce((arr, elm) => {
      if (Array.isArray(elm)) {
        return arr.concat(this.flatten(elm));
      }
      return arr.concat(elm);
    }, []);
  }
};
FlattenPipe.ɵfac = function FlattenPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlattenPipe)();
};
FlattenPipe.ɵpipe = ɵɵdefinePipe({
  name: "flatten",
  type: FlattenPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlattenPipe, [{
    type: Pipe,
    args: [{
      name: "flatten"
    }]
  }], null, null);
})();
var IntersectionPipe = class {
  transform(input, ...args) {
    if (!Array.isArray(input)) {
      return input;
    }
    return args.reduce((n, c) => n.filter((e) => !!~c.indexOf(e)), input);
  }
};
IntersectionPipe.ɵfac = function IntersectionPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IntersectionPipe)();
};
IntersectionPipe.ɵpipe = ɵɵdefinePipe({
  name: "intersection",
  type: IntersectionPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IntersectionPipe, [{
    type: Pipe,
    args: [{
      name: "intersection"
    }]
  }], null, null);
})();
function isUndefined(value) {
  return typeof value === "undefined";
}
function isNull(value) {
  return value === null;
}
function isFunction(value) {
  return typeof value === "function";
}
function isNumber(value) {
  return typeof value === "number";
}
function isString(value) {
  return typeof value === "string";
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isNumberFinite(value) {
  return isNumber(value) && isFinite(value);
}
function isVowel(letter) {
  const vowels = ["a", "e", "i", "o", "u"];
  return vowels.indexOf(letter) !== -1;
}
function ucFirst(text) {
  const [part, ...split] = text.split(/\s/g);
  const ucd = part.toLowerCase().split(/(?=['|-])/g).map((word) => word.indexOf("-") + word.indexOf("'") > -2 ? word.slice(0, 2).toUpperCase() + word.slice(2) : word.slice(0, 1).toUpperCase() + word.slice(1)).join("");
  return [ucd, ...split].join(" ");
}
function applyPrecision(num, precision) {
  if (precision <= 0) {
    return Math.round(num);
  }
  const tho = 10 ** precision;
  return Math.round(num * tho) / tho;
}
function extractDeepPropertyByMapKey(obj, map) {
  const keys = map.split(".");
  const head = keys.shift();
  return keys.reduce((prop, key) => {
    return !isUndefined(prop) && !isNull(prop) && !isUndefined(prop[key]) ? prop[key] : void 0;
  }, obj[head || ""]);
}
function extractDeepPropertyByParentMapKey(obj, map) {
  const keys = map.split(".");
  const tail = keys.pop();
  const props = extractDeepPropertyByMapKey(obj, keys.join("."));
  return {
    props,
    tail
  };
}
function getKeysTwoObjects(obj, other) {
  return [...Object.keys(obj), ...Object.keys(other)].filter((key, index, array) => array.indexOf(key) === index);
}
function isDeepEqual(obj, other) {
  if (!isObject(obj) || !isObject(other)) {
    return obj === other;
  }
  return getKeysTwoObjects(obj, other).every((key) => {
    if (!isObject(obj[key]) && !isObject(other[key])) {
      return obj[key] === other[key];
    }
    if (!isObject(obj[key]) || !isObject(other[key])) {
      return false;
    }
    return isDeepEqual(obj[key], other[key]);
  });
}
var ReversePipe = class {
  transform(input) {
    if (isString(input)) {
      return input.split("").reverse().join("");
    }
    return Array.isArray(input) ? input.slice().reverse() : input;
  }
};
ReversePipe.ɵfac = function ReversePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ReversePipe)();
};
ReversePipe.ɵpipe = ɵɵdefinePipe({
  name: "reverse",
  type: ReversePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReversePipe, [{
    type: Pipe,
    args: [{
      name: "reverse"
    }]
  }], null, null);
})();
var TailPipe = class {
  transform(input, num = 0) {
    return Array.isArray(input) ? input.slice(num) : input;
  }
};
TailPipe.ɵfac = function TailPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TailPipe)();
};
TailPipe.ɵpipe = ɵɵdefinePipe({
  name: "tail",
  type: TailPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TailPipe, [{
    type: Pipe,
    args: [{
      name: "tail"
    }]
  }], null, null);
})();
var TrurthifyPipe = class {
  transform(input) {
    return Array.isArray(input) ? input.filter((e) => !!e) : input;
  }
};
TrurthifyPipe.ɵfac = function TrurthifyPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TrurthifyPipe)();
};
TrurthifyPipe.ɵpipe = ɵɵdefinePipe({
  name: "truthify",
  type: TrurthifyPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrurthifyPipe, [{
    type: Pipe,
    args: [{
      name: "truthify"
    }]
  }], null, null);
})();
var UnionPipe = class {
  transform(input, args = []) {
    if (!Array.isArray(input) || !Array.isArray(args)) {
      return input;
    }
    return args.reduce((newArr, currArr) => {
      return newArr.concat(currArr.reduce((noDupArr, curr) => {
        return !~noDupArr.indexOf(curr) && !~newArr.indexOf(curr) ? noDupArr.concat([curr]) : noDupArr;
      }, []));
    }, input);
  }
};
UnionPipe.ɵfac = function UnionPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || UnionPipe)();
};
UnionPipe.ɵpipe = ɵɵdefinePipe({
  name: "union",
  type: UnionPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnionPipe, [{
    type: Pipe,
    args: [{
      name: "union"
    }]
  }], null, null);
})();
var UniquePipe = class {
  transform(input, propertyName) {
    const uniques = [];
    return Array.isArray(input) ? isUndefined(propertyName) ? input.filter((e, i) => input.indexOf(e) === i) : input.filter((e, i) => {
      let value = extractDeepPropertyByMapKey(e, propertyName);
      value = isObject(value) ? JSON.stringify(value) : value;
      if (isUndefined(value) || uniques[value]) {
        return false;
      }
      uniques[value] = true;
      return true;
    }) : input;
  }
};
UniquePipe.ɵfac = function UniquePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || UniquePipe)();
};
UniquePipe.ɵpipe = ɵɵdefinePipe({
  name: "unique",
  type: UniquePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UniquePipe, [{
    type: Pipe,
    args: [{
      name: "unique"
    }]
  }], null, null);
})();
var WithoutPipe = class {
  transform(input, args = []) {
    return Array.isArray(input) ? (
      // tslint:disable-next-line:no-bitwise
      input.filter((e) => !~args.indexOf(e))
    ) : input;
  }
};
WithoutPipe.ɵfac = function WithoutPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || WithoutPipe)();
};
WithoutPipe.ɵpipe = ɵɵdefinePipe({
  name: "without",
  type: WithoutPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WithoutPipe, [{
    type: Pipe,
    args: [{
      name: "without"
    }]
  }], null, null);
})();
var PluckPipe = class {
  transform(input, map) {
    if (Array.isArray(input)) {
      return input.map((e) => extractDeepPropertyByMapKey(e, map));
    }
    return isObject(input) ? extractDeepPropertyByMapKey(input, map) : input;
  }
};
PluckPipe.ɵfac = function PluckPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PluckPipe)();
};
PluckPipe.ɵpipe = ɵɵdefinePipe({
  name: "pluck",
  type: PluckPipe,
  pure: false,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PluckPipe, [{
    type: Pipe,
    args: [{
      name: "pluck",
      pure: false
    }]
  }], null, null);
})();
var ShufflePipe = class {
  // Using a version of the Fisher-Yates shuffle algorithm
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  transform(input) {
    if (!Array.isArray(input)) {
      return input;
    }
    const shuffled = [...input];
    const n = input.length - 1;
    for (let i = 0; i < n; ++i) {
      const j = Math.floor(Math.random() * (n - i + 1)) + i;
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
};
ShufflePipe.ɵfac = function ShufflePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ShufflePipe)();
};
ShufflePipe.ɵpipe = ɵɵdefinePipe({
  name: "shuffle",
  type: ShufflePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShufflePipe, [{
    type: Pipe,
    args: [{
      name: "shuffle"
    }]
  }], null, null);
})();
var EveryPipe = class {
  transform(input, predicate) {
    return Array.isArray(input) ? input.every(predicate) : false;
  }
};
EveryPipe.ɵfac = function EveryPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || EveryPipe)();
};
EveryPipe.ɵpipe = ɵɵdefinePipe({
  name: "every",
  type: EveryPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EveryPipe, [{
    type: Pipe,
    args: [{
      name: "every"
    }]
  }], null, null);
})();
var SomePipe = class {
  transform(input, predicate) {
    return Array.isArray(input) ? input.some(predicate) : input;
  }
};
SomePipe.ɵfac = function SomePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SomePipe)();
};
SomePipe.ɵpipe = ɵɵdefinePipe({
  name: "some",
  type: SomePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SomePipe, [{
    type: Pipe,
    args: [{
      name: "some"
    }]
  }], null, null);
})();
var SamplePipe = class {
  transform(input, len = 1) {
    if (!Array.isArray(input)) {
      return input;
    }
    let sample = [];
    const tmp = [...input];
    const l = len < tmp.length ? len : tmp.length;
    for (let i = 0; i < l; ++i) {
      sample = sample.concat(tmp.splice(Math.floor(Math.random() * tmp.length), 1));
    }
    return sample;
  }
};
SamplePipe.ɵfac = function SamplePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SamplePipe)();
};
SamplePipe.ɵpipe = ɵɵdefinePipe({
  name: "sample",
  type: SamplePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SamplePipe, [{
    type: Pipe,
    args: [{
      name: "sample"
    }]
  }], null, null);
})();
var GroupByPipe = class {
  transform(input, discriminator = [], delimiter = "|") {
    if (!Array.isArray(input)) {
      return input;
    }
    return this.groupBy(input, discriminator, delimiter);
  }
  groupBy(list, discriminator, delimiter) {
    return list.reduce((acc, payload) => {
      const key = this.extractKeyByDiscriminator(discriminator, payload, delimiter);
      acc[key] = Array.isArray(acc[key]) ? acc[key].concat([payload]) : [payload];
      return acc;
    }, {});
  }
  extractKeyByDiscriminator(discriminator, payload, delimiter) {
    if (isFunction(discriminator)) {
      return discriminator(payload);
    }
    if (Array.isArray(discriminator)) {
      return discriminator.map((k) => extractDeepPropertyByMapKey(payload, k)).join(delimiter);
    }
    return extractDeepPropertyByMapKey(payload, discriminator);
  }
};
GroupByPipe.ɵfac = function GroupByPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || GroupByPipe)();
};
GroupByPipe.ɵpipe = ɵɵdefinePipe({
  name: "groupBy",
  type: GroupByPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupByPipe, [{
    type: Pipe,
    args: [{
      name: "groupBy"
    }]
  }], null, null);
})();
var FilterByPipe = class {
  transform(input, props, search = "", strict = false) {
    if (!Array.isArray(input) || !Array.isArray(search) && !isString(search) && !isNumberFinite(search) && !isBoolean(search)) {
      return input;
    }
    const terms = String(search).toLowerCase().split(",");
    return input.filter((obj) => {
      return props.some((prop) => {
        return terms.some((term) => {
          const value = extractDeepPropertyByMapKey(obj, prop);
          const {
            props: props2,
            tail
          } = extractDeepPropertyByParentMapKey(obj, prop);
          if (isUndefined(value) && !isUndefined(props2) && Array.isArray(props2)) {
            return props2.some((parent) => {
              const str = String(parent[tail]).toLowerCase();
              return strict ? str === term : !!~str.indexOf(term);
            });
          }
          if (isUndefined(value)) {
            return false;
          }
          const strValue = String(value).toLowerCase();
          return strict ? term === strValue : !!~strValue.indexOf(term);
        });
      });
    });
  }
};
FilterByPipe.ɵfac = function FilterByPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FilterByPipe)();
};
FilterByPipe.ɵpipe = ɵɵdefinePipe({
  name: "filterBy",
  type: FilterByPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterByPipe, [{
    type: Pipe,
    args: [{
      name: "filterBy"
    }]
  }], null, null);
})();
var OrderByPipe = class _OrderByPipe {
  transform(input, config) {
    if (!Array.isArray(input)) {
      return input;
    }
    const out = [...input];
    if (Array.isArray(config)) {
      return out.sort((a, b) => {
        const l = config.length;
        for (let i = 0; i < l; ++i) {
          const [prop, asc] = _OrderByPipe.extractFromConfig(config[i]);
          const pos = _OrderByPipe.orderCompare(prop, asc, a, b);
          if (pos !== 0) {
            return pos;
          }
        }
        return 0;
      });
    }
    if (isString(config)) {
      const [prop, asc, sign] = _OrderByPipe.extractFromConfig(config);
      if (config.length === 1) {
        switch (sign) {
          case "+":
            return out.sort(_OrderByPipe.simpleSort.bind(this));
          case "-":
            return out.sort(_OrderByPipe.simpleSort.bind(this)).reverse();
        }
      }
      return out.sort(_OrderByPipe.orderCompare.bind(this, prop, asc));
    }
    return out.sort(_OrderByPipe.simpleSort.bind(this));
  }
  static simpleSort(a, b) {
    return isString(a) && isString(b) ? a.toLowerCase().localeCompare(b.toLowerCase()) : a - b;
  }
  static orderCompare(prop, asc, a, b) {
    const first = extractDeepPropertyByMapKey(a, prop);
    const second = extractDeepPropertyByMapKey(b, prop);
    if (first === second) {
      return 0;
    }
    if (isUndefined(first) || first === "") {
      return 1;
    }
    if (isUndefined(second) || second === "") {
      return -1;
    }
    if (isString(first) && isString(second)) {
      const pos = first.toLowerCase().localeCompare(second.toLowerCase());
      return asc ? pos : -pos;
    }
    return asc ? first - second : second - first;
  }
  static extractFromConfig(config) {
    const sign = config.substr(0, 1);
    const prop = config.replace(/^[-+]/, "");
    const asc = sign !== "-";
    return [prop, asc, sign];
  }
};
OrderByPipe.ɵfac = function OrderByPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || OrderByPipe)();
};
OrderByPipe.ɵpipe = ɵɵdefinePipe({
  name: "orderBy",
  type: OrderByPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderByPipe, [{
    type: Pipe,
    args: [{
      name: "orderBy"
    }]
  }], null, null);
})();
var GroupByImpurePipe = class extends GroupByPipe {
};
GroupByImpurePipe.ɵfac = /* @__PURE__ */ (() => {
  let ɵGroupByImpurePipe_BaseFactory;
  return function GroupByImpurePipe_Factory(__ngFactoryType__) {
    return (ɵGroupByImpurePipe_BaseFactory || (ɵGroupByImpurePipe_BaseFactory = ɵɵgetInheritedFactory(GroupByImpurePipe)))(__ngFactoryType__ || GroupByImpurePipe);
  };
})();
GroupByImpurePipe.ɵpipe = ɵɵdefinePipe({
  name: "groupByImpure",
  type: GroupByImpurePipe,
  pure: false,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupByImpurePipe, [{
    type: Pipe,
    args: [{
      name: "groupByImpure",
      pure: false
    }]
  }], null, null);
})();
var FilterByImpurePipe = class extends FilterByPipe {
};
FilterByImpurePipe.ɵfac = /* @__PURE__ */ (() => {
  let ɵFilterByImpurePipe_BaseFactory;
  return function FilterByImpurePipe_Factory(__ngFactoryType__) {
    return (ɵFilterByImpurePipe_BaseFactory || (ɵFilterByImpurePipe_BaseFactory = ɵɵgetInheritedFactory(FilterByImpurePipe)))(__ngFactoryType__ || FilterByImpurePipe);
  };
})();
FilterByImpurePipe.ɵpipe = ɵɵdefinePipe({
  name: "filterByImpure",
  type: FilterByImpurePipe,
  pure: false,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterByImpurePipe, [{
    type: Pipe,
    args: [{
      name: "filterByImpure",
      pure: false
    }]
  }], null, null);
})();
var OrderByImpurePipe = class extends OrderByPipe {
};
OrderByImpurePipe.ɵfac = /* @__PURE__ */ (() => {
  let ɵOrderByImpurePipe_BaseFactory;
  return function OrderByImpurePipe_Factory(__ngFactoryType__) {
    return (ɵOrderByImpurePipe_BaseFactory || (ɵOrderByImpurePipe_BaseFactory = ɵɵgetInheritedFactory(OrderByImpurePipe)))(__ngFactoryType__ || OrderByImpurePipe);
  };
})();
OrderByImpurePipe.ɵpipe = ɵɵdefinePipe({
  name: "orderByImpure",
  type: OrderByImpurePipe,
  pure: false,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderByImpurePipe, [{
    type: Pipe,
    args: [{
      name: "orderByImpure",
      pure: false
    }]
  }], null, null);
})();
var RangePipe = class {
  transform(start = 1, count = 0, step = 1) {
    return Array(count).fill("").map((v, i) => step * i + start);
  }
};
RangePipe.ɵfac = function RangePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RangePipe)();
};
RangePipe.ɵpipe = ɵɵdefinePipe({
  name: "range",
  type: RangePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RangePipe, [{
    type: Pipe,
    args: [{
      name: "range"
    }]
  }], null, null);
})();
var ChunkPipe = class {
  transform(input, size = 1) {
    if (isString(input)) {
      return this.chunk(input.split(""), size);
    }
    return Array.isArray(input) ? this.chunk(input, size) : input;
  }
  chunk(input, size) {
    return Array(Math.ceil(input.length / size)).fill([]).map((_, index) => index * size).map((begin) => input.slice(begin, begin + size));
  }
};
ChunkPipe.ɵfac = function ChunkPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ChunkPipe)();
};
ChunkPipe.ɵpipe = ɵɵdefinePipe({
  name: "chunk",
  type: ChunkPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChunkPipe, [{
    type: Pipe,
    args: [{
      name: "chunk"
    }]
  }], null, null);
})();
var FromPairsPipe = class {
  transform(input) {
    if (!Array.isArray(input)) {
      return input;
    }
    return input.reduce((obj, arr) => {
      if (!Array.isArray(arr)) {
        return obj;
      }
      const [prop, val] = arr;
      obj[prop] = val;
      return obj;
    }, {});
  }
};
FromPairsPipe.ɵfac = function FromPairsPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FromPairsPipe)();
};
FromPairsPipe.ɵpipe = ɵɵdefinePipe({
  name: "fromPairs",
  type: FromPairsPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FromPairsPipe, [{
    type: Pipe,
    args: [{
      name: "fromPairs"
    }]
  }], null, null);
})();
var ARRAY_PIPES = [DiffPipe, FlattenPipe, InitialPipe, IntersectionPipe, ReversePipe, TailPipe, TrurthifyPipe, UnionPipe, UniquePipe, WithoutPipe, PluckPipe, ShufflePipe, EveryPipe, SomePipe, SamplePipe, GroupByPipe, GroupByImpurePipe, FilterByPipe, FilterByImpurePipe, OrderByPipe, OrderByImpurePipe, RangePipe, ChunkPipe, FromPairsPipe];
var NgArrayPipesModule = class {
};
NgArrayPipesModule.ɵfac = function NgArrayPipesModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgArrayPipesModule)();
};
NgArrayPipesModule.ɵmod = ɵɵdefineNgModule({
  type: NgArrayPipesModule,
  declarations: [DiffPipe, FlattenPipe, InitialPipe, IntersectionPipe, ReversePipe, TailPipe, TrurthifyPipe, UnionPipe, UniquePipe, WithoutPipe, PluckPipe, ShufflePipe, EveryPipe, SomePipe, SamplePipe, GroupByPipe, GroupByImpurePipe, FilterByPipe, FilterByImpurePipe, OrderByPipe, OrderByImpurePipe, RangePipe, ChunkPipe, FromPairsPipe],
  exports: [DiffPipe, FlattenPipe, InitialPipe, IntersectionPipe, ReversePipe, TailPipe, TrurthifyPipe, UnionPipe, UniquePipe, WithoutPipe, PluckPipe, ShufflePipe, EveryPipe, SomePipe, SamplePipe, GroupByPipe, GroupByImpurePipe, FilterByPipe, FilterByImpurePipe, OrderByPipe, OrderByImpurePipe, RangePipe, ChunkPipe, FromPairsPipe]
});
NgArrayPipesModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgArrayPipesModule, [{
    type: NgModule,
    args: [{
      declarations: ARRAY_PIPES,
      imports: [],
      exports: ARRAY_PIPES
    }]
  }], null, null);
})();
var KeysPipe = class {
  transform(obj) {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }
    return Object.keys(obj);
  }
};
KeysPipe.ɵfac = function KeysPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || KeysPipe)();
};
KeysPipe.ɵpipe = ɵɵdefinePipe({
  name: "keys",
  type: KeysPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KeysPipe, [{
    type: Pipe,
    args: [{
      name: "keys"
    }]
  }], null, null);
})();
var ValuesPipe = class {
  transform(obj) {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }
    return Object.keys(obj).map((k) => obj[k]);
  }
};
ValuesPipe.ɵfac = function ValuesPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ValuesPipe)();
};
ValuesPipe.ɵpipe = ɵɵdefinePipe({
  name: "values",
  type: ValuesPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ValuesPipe, [{
    type: Pipe,
    args: [{
      name: "values"
    }]
  }], null, null);
})();
var PairsPipe = class {
  transform(obj) {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }
    return Object.entries(obj);
  }
};
PairsPipe.ɵfac = function PairsPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PairsPipe)();
};
PairsPipe.ɵpipe = ɵɵdefinePipe({
  name: "pairs",
  type: PairsPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PairsPipe, [{
    type: Pipe,
    args: [{
      name: "pairs"
    }]
  }], null, null);
})();
var PickPipe = class {
  transform(obj, ...args) {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }
    return args.reduce((o, k) => {
      return Object.assign(o, {
        [k]: obj[k]
      });
    }, {});
  }
};
PickPipe.ɵfac = function PickPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PickPipe)();
};
PickPipe.ɵpipe = ɵɵdefinePipe({
  name: "pick",
  type: PickPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PickPipe, [{
    type: Pipe,
    args: [{
      name: "pick"
    }]
  }], null, null);
})();
var OmitPipe = class {
  transform(obj, ...args) {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }
    return Object.keys(obj).filter((k) => !~args.indexOf(k)).reduce((o, k) => {
      return Object.assign(o, {
        [k]: obj[k]
      });
    }, {});
  }
};
OmitPipe.ɵfac = function OmitPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || OmitPipe)();
};
OmitPipe.ɵpipe = ɵɵdefinePipe({
  name: "omit",
  type: OmitPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OmitPipe, [{
    type: Pipe,
    args: [{
      name: "omit"
    }]
  }], null, null);
})();
var InvertPipe = class {
  transform(obj) {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }
    return Object.keys(obj).reduce((o, k) => {
      return Object.assign(o, {
        [obj[k]]: k
      });
    }, {});
  }
};
InvertPipe.ɵfac = function InvertPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || InvertPipe)();
};
InvertPipe.ɵpipe = ɵɵdefinePipe({
  name: "invert",
  type: InvertPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvertPipe, [{
    type: Pipe,
    args: [{
      name: "invert"
    }]
  }], null, null);
})();
var InvertByPipe = class {
  transform(obj, cb) {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }
    return Object.keys(obj).reduce((o, k) => {
      const key = cb ? cb(obj[k]) : obj[k];
      return Array.isArray(o[key]) ? (o[key].push(k), o) : Object.assign(o, {
        [key]: [k]
      });
    }, {});
  }
};
InvertByPipe.ɵfac = function InvertByPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || InvertByPipe)();
};
InvertByPipe.ɵpipe = ɵɵdefinePipe({
  name: "invertBy",
  type: InvertByPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvertByPipe, [{
    type: Pipe,
    args: [{
      name: "invertBy"
    }]
  }], null, null);
})();
var DiffObjPipe = class {
  transform(obj, original = {}) {
    if (Array.isArray(obj) || Array.isArray(original) || !isObject(obj) || !isObject(original)) {
      return {};
    }
    return getKeysTwoObjects(obj, original).reduce((diff, key) => {
      if (!isDeepEqual(original[key], obj[key])) {
        diff[key] = obj[key];
      }
      return diff;
    }, {});
  }
};
DiffObjPipe.ɵfac = function DiffObjPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DiffObjPipe)();
};
DiffObjPipe.ɵpipe = ɵɵdefinePipe({
  name: "diffObj",
  type: DiffObjPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DiffObjPipe, [{
    type: Pipe,
    args: [{
      name: "diffObj"
    }]
  }], null, null);
})();
var OBJECT_PIPES = [KeysPipe, ValuesPipe, PairsPipe, PickPipe, InvertPipe, InvertByPipe, OmitPipe, DiffObjPipe];
var NgObjectPipesModule = class {
};
NgObjectPipesModule.ɵfac = function NgObjectPipesModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgObjectPipesModule)();
};
NgObjectPipesModule.ɵmod = ɵɵdefineNgModule({
  type: NgObjectPipesModule,
  declarations: [KeysPipe, ValuesPipe, PairsPipe, PickPipe, InvertPipe, InvertByPipe, OmitPipe, DiffObjPipe],
  exports: [KeysPipe, ValuesPipe, PairsPipe, PickPipe, InvertPipe, InvertByPipe, OmitPipe, DiffObjPipe]
});
NgObjectPipesModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgObjectPipesModule, [{
    type: NgModule,
    args: [{
      declarations: OBJECT_PIPES,
      imports: [],
      exports: OBJECT_PIPES
    }]
  }], null, null);
})();
var AorAnPipe = class {
  constructor() {
    this.irregularMap = {
      herb: "an",
      honor: "an",
      honorable: "an",
      hour: "an",
      mba: "an",
      msc: "an",
      "m.sc.": "an",
      unicorn: "a"
    };
  }
  transform(stringEntity) {
    if (!stringEntity || stringEntity === "") {
      return "";
    } else {
      const firstWord = stringEntity.trim().split(" ")[0];
      if (this.irregularMap[firstWord.toLocaleLowerCase()]) {
        return `${this.irregularMap[firstWord.toLocaleLowerCase()]} ${stringEntity}`;
      } else {
        return isVowel(stringEntity[0]) ? `an ${stringEntity}` : `a ${stringEntity}`;
      }
    }
  }
};
AorAnPipe.ɵfac = function AorAnPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AorAnPipe)();
};
AorAnPipe.ɵpipe = ɵɵdefinePipe({
  name: "aOrAn",
  type: AorAnPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AorAnPipe, [{
    type: Pipe,
    args: [{
      name: "aOrAn"
    }]
  }], null, null);
})();
var UcWordsPipe = class {
  transform(text) {
    if (isString(text)) {
      return text.split(" ").map((sub) => ucFirst(sub)).join(" ");
    }
    return text;
  }
};
UcWordsPipe.ɵfac = function UcWordsPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || UcWordsPipe)();
};
UcWordsPipe.ɵpipe = ɵɵdefinePipe({
  name: "ucwords",
  type: UcWordsPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UcWordsPipe, [{
    type: Pipe,
    args: [{
      name: "ucwords"
    }]
  }], null, null);
})();
var LeftTrimPipe = class {
  transform(text, chars = "\\s") {
    return isString(text) ? text.replace(new RegExp(`^[${chars}]+`), "") : text;
  }
};
LeftTrimPipe.ɵfac = function LeftTrimPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LeftTrimPipe)();
};
LeftTrimPipe.ɵpipe = ɵɵdefinePipe({
  name: "ltrim",
  type: LeftTrimPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeftTrimPipe, [{
    type: Pipe,
    args: [{
      name: "ltrim"
    }]
  }], null, null);
})();
var RepeatPipe = class {
  transform(str, n = 1, separator = "") {
    if (n <= 0) {
      throw new RangeError();
    }
    return n === 1 ? str : this.repeat(str, n - 1, separator);
  }
  repeat(str, n, separator) {
    return isString(str) ? n === 0 ? str : str + separator + this.repeat(str, n - 1, separator) : str;
  }
};
RepeatPipe.ɵfac = function RepeatPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RepeatPipe)();
};
RepeatPipe.ɵpipe = ɵɵdefinePipe({
  name: "repeat",
  type: RepeatPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RepeatPipe, [{
    type: Pipe,
    args: [{
      name: "repeat"
    }]
  }], null, null);
})();
var RightTrimPipe = class {
  transform(text, chars = "\\s") {
    return isString(text) ? text.replace(new RegExp(`[${chars}]+$`), "") : text;
  }
};
RightTrimPipe.ɵfac = function RightTrimPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RightTrimPipe)();
};
RightTrimPipe.ɵpipe = ɵɵdefinePipe({
  name: "rtrim",
  type: RightTrimPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RightTrimPipe, [{
    type: Pipe,
    args: [{
      name: "rtrim"
    }]
  }], null, null);
})();
var ScanPipe = class {
  transform(text, args = []) {
    return isString(text) ? text.replace(/\{(\d+)}/g, (match, index) => !isUndefined(args[index]) ? args[index] : match) : text;
  }
};
ScanPipe.ɵfac = function ScanPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ScanPipe)();
};
ScanPipe.ɵpipe = ɵɵdefinePipe({
  name: "scan",
  type: ScanPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScanPipe, [{
    type: Pipe,
    args: [{
      name: "scan"
    }]
  }], null, null);
})();
var ShortenPipe = class {
  transform(text, length = 0, suffix = "", wordBreak = true) {
    if (!isString(text)) {
      return text;
    }
    if (text.length > length) {
      if (wordBreak) {
        return text.slice(0, length) + suffix;
      }
      if (!!~text.indexOf(" ", length)) {
        return text.slice(0, text.indexOf(" ", length)) + suffix;
      }
    }
    return text;
  }
};
ShortenPipe.ɵfac = function ShortenPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ShortenPipe)();
};
ShortenPipe.ɵpipe = ɵɵdefinePipe({
  name: "shorten",
  type: ShortenPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShortenPipe, [{
    type: Pipe,
    args: [{
      name: "shorten"
    }]
  }], null, null);
})();
var StripTagsPipe = class {
  transform(text, ...allowedTags) {
    return allowedTags.length > 0 ? text.replace(new RegExp(`<(?!/?(${allowedTags.join("|")})s*/?)[^>]+>`, "g"), "") : text.replace(/<(?:.|\s)*?>/g, "");
  }
};
StripTagsPipe.ɵfac = function StripTagsPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || StripTagsPipe)();
};
StripTagsPipe.ɵpipe = ɵɵdefinePipe({
  name: "stripTags",
  type: StripTagsPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StripTagsPipe, [{
    type: Pipe,
    args: [{
      name: "stripTags"
    }]
  }], null, null);
})();
var TrimPipe = class {
  transform(text, chars = "\\s") {
    return isString(text) ? text.replace(new RegExp(`^[${chars}]+|[${chars}]+$`, "g"), "") : text;
  }
};
TrimPipe.ɵfac = function TrimPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TrimPipe)();
};
TrimPipe.ɵpipe = ɵɵdefinePipe({
  name: "trim",
  type: TrimPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrimPipe, [{
    type: Pipe,
    args: [{
      name: "trim"
    }]
  }], null, null);
})();
var UcFirstPipe = class {
  transform(text) {
    return isString(text) ? ucFirst(text) : text;
  }
};
UcFirstPipe.ɵfac = function UcFirstPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || UcFirstPipe)();
};
UcFirstPipe.ɵpipe = ɵɵdefinePipe({
  name: "ucfirst",
  type: UcFirstPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UcFirstPipe, [{
    type: Pipe,
    args: [{
      name: "ucfirst"
    }]
  }], null, null);
})();
var SlugifyPipe = class {
  transform(str) {
    return isString(str) ? str.toLowerCase().trim().replace(/[^\w\-]+/g, " ").replace(/\s+/g, "-") : str;
  }
};
SlugifyPipe.ɵfac = function SlugifyPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SlugifyPipe)();
};
SlugifyPipe.ɵpipe = ɵɵdefinePipe({
  name: "slugify",
  type: SlugifyPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SlugifyPipe, [{
    type: Pipe,
    args: [{
      name: "slugify"
    }]
  }], null, null);
})();
var CamelizePipe = class {
  transform(text, chars = "\\s") {
    if (!isString(text)) {
      return text;
    }
    return text.toLowerCase().split(/[-_\s]/g).filter((v) => !!v).map((word, key) => {
      return !key ? word : word.slice(0, 1).toUpperCase() + word.slice(1);
    }).join("");
  }
};
CamelizePipe.ɵfac = function CamelizePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CamelizePipe)();
};
CamelizePipe.ɵpipe = ɵɵdefinePipe({
  name: "camelize",
  type: CamelizePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CamelizePipe, [{
    type: Pipe,
    args: [{
      name: "camelize"
    }]
  }], null, null);
})();
var LatinisePipe = class {
  constructor() {
    this.latinMap = {
      "Á": "A",
      "Ă": "A",
      "Ắ": "A",
      "Ặ": "A",
      "Ằ": "A",
      "Ẳ": "A",
      "Ẵ": "A",
      "Ǎ": "A",
      "Â": "A",
      "Ấ": "A",
      "Ậ": "A",
      "Ầ": "A",
      "Ẩ": "A",
      "Ẫ": "A",
      "Ä": "A",
      "Ǟ": "A",
      "Ȧ": "A",
      "Ǡ": "A",
      "Ạ": "A",
      "Ȁ": "A",
      "À": "A",
      "Ả": "A",
      "Ȃ": "A",
      "Ā": "A",
      "Ą": "A",
      "Å": "A",
      "Ǻ": "A",
      "Ḁ": "A",
      "Ⱥ": "A",
      "Ã": "A",
      "Ꜳ": "AA",
      "Æ": "AE",
      "Ǽ": "AE",
      "Ǣ": "AE",
      "Ꜵ": "AO",
      "Ꜷ": "AU",
      "Ꜹ": "AV",
      "Ꜻ": "AV",
      "Ꜽ": "AY",
      "Ḃ": "B",
      "Ḅ": "B",
      "Ɓ": "B",
      "Ḇ": "B",
      "Ƀ": "B",
      "Ƃ": "B",
      "Ć": "C",
      "Č": "C",
      "Ç": "C",
      "Ḉ": "C",
      "Ĉ": "C",
      "Ċ": "C",
      "Ƈ": "C",
      "Ȼ": "C",
      "Ď": "D",
      "Ḑ": "D",
      "Ḓ": "D",
      "Ḋ": "D",
      "Ḍ": "D",
      "Ɗ": "D",
      "Ḏ": "D",
      "ǲ": "D",
      "ǅ": "D",
      "Đ": "D",
      "Ƌ": "D",
      "Ǳ": "DZ",
      "Ǆ": "DZ",
      "É": "E",
      "Ĕ": "E",
      "Ě": "E",
      "Ȩ": "E",
      "Ḝ": "E",
      "Ê": "E",
      "Ế": "E",
      "Ệ": "E",
      "Ề": "E",
      "Ể": "E",
      "Ễ": "E",
      "Ḙ": "E",
      "Ë": "E",
      "Ė": "E",
      "Ẹ": "E",
      "Ȅ": "E",
      "È": "E",
      "Ẻ": "E",
      "Ȇ": "E",
      "Ē": "E",
      "Ḗ": "E",
      "Ḕ": "E",
      "Ę": "E",
      "Ɇ": "E",
      "Ẽ": "E",
      "Ḛ": "E",
      "Ꝫ": "ET",
      "Ḟ": "F",
      "Ƒ": "F",
      "Ǵ": "G",
      "Ğ": "G",
      "Ǧ": "G",
      "Ģ": "G",
      "Ĝ": "G",
      "Ġ": "G",
      "Ɠ": "G",
      "Ḡ": "G",
      "Ǥ": "G",
      "Ḫ": "H",
      "Ȟ": "H",
      "Ḩ": "H",
      "Ĥ": "H",
      "Ⱨ": "H",
      "Ḧ": "H",
      "Ḣ": "H",
      "Ḥ": "H",
      "Ħ": "H",
      "Í": "I",
      "Ĭ": "I",
      "Ǐ": "I",
      "Î": "I",
      "Ï": "I",
      "Ḯ": "I",
      "İ": "I",
      "Ị": "I",
      "Ȉ": "I",
      "Ì": "I",
      "Ỉ": "I",
      "Ȋ": "I",
      "Ī": "I",
      "Į": "I",
      "Ɨ": "I",
      "Ĩ": "I",
      "Ḭ": "I",
      "Ꝺ": "D",
      "Ꝼ": "F",
      "Ᵹ": "G",
      "Ꞃ": "R",
      "Ꞅ": "S",
      "Ꞇ": "T",
      "Ꝭ": "IS",
      "Ĵ": "J",
      "Ɉ": "J",
      "Ḱ": "K",
      "Ǩ": "K",
      "Ķ": "K",
      "Ⱪ": "K",
      "Ꝃ": "K",
      "Ḳ": "K",
      "Ƙ": "K",
      "Ḵ": "K",
      "Ꝁ": "K",
      "Ꝅ": "K",
      "Ĺ": "L",
      "Ƚ": "L",
      "Ľ": "L",
      "Ļ": "L",
      "Ḽ": "L",
      "Ḷ": "L",
      "Ḹ": "L",
      "Ⱡ": "L",
      "Ꝉ": "L",
      "Ḻ": "L",
      "Ŀ": "L",
      "Ɫ": "L",
      "ǈ": "L",
      "Ł": "L",
      "Ǉ": "LJ",
      "Ḿ": "M",
      "Ṁ": "M",
      "Ṃ": "M",
      "Ɱ": "M",
      "Ń": "N",
      "Ň": "N",
      "Ņ": "N",
      "Ṋ": "N",
      "Ṅ": "N",
      "Ṇ": "N",
      "Ǹ": "N",
      "Ɲ": "N",
      "Ṉ": "N",
      "Ƞ": "N",
      "ǋ": "N",
      "Ñ": "N",
      "Ǌ": "NJ",
      "Ó": "O",
      "Ŏ": "O",
      "Ǒ": "O",
      "Ô": "O",
      "Ố": "O",
      "Ộ": "O",
      "Ồ": "O",
      "Ổ": "O",
      "Ỗ": "O",
      "Ö": "O",
      "Ȫ": "O",
      "Ȯ": "O",
      "Ȱ": "O",
      "Ọ": "O",
      "Ő": "O",
      "Ȍ": "O",
      "Ò": "O",
      "Ỏ": "O",
      "Ơ": "O",
      "Ớ": "O",
      "Ợ": "O",
      "Ờ": "O",
      "Ở": "O",
      "Ỡ": "O",
      "Ȏ": "O",
      "Ꝋ": "O",
      "Ꝍ": "O",
      "Ō": "O",
      "Ṓ": "O",
      "Ṑ": "O",
      "Ɵ": "O",
      "Ǫ": "O",
      "Ǭ": "O",
      "Ø": "O",
      "Ǿ": "O",
      "Õ": "O",
      "Ṍ": "O",
      "Ṏ": "O",
      "Ȭ": "O",
      "Ƣ": "OI",
      "Ꝏ": "OO",
      "Ɛ": "E",
      "Ɔ": "O",
      "Ȣ": "OU",
      "Ṕ": "P",
      "Ṗ": "P",
      "Ꝓ": "P",
      "Ƥ": "P",
      "Ꝕ": "P",
      "Ᵽ": "P",
      "Ꝑ": "P",
      "Ꝙ": "Q",
      "Ꝗ": "Q",
      "Ŕ": "R",
      "Ř": "R",
      "Ŗ": "R",
      "Ṙ": "R",
      "Ṛ": "R",
      "Ṝ": "R",
      "Ȑ": "R",
      "Ȓ": "R",
      "Ṟ": "R",
      "Ɍ": "R",
      "Ɽ": "R",
      "Ꜿ": "C",
      "Ǝ": "E",
      "Ś": "S",
      "Ṥ": "S",
      "Š": "S",
      "Ṧ": "S",
      "Ş": "S",
      "Ŝ": "S",
      "Ș": "S",
      "Ṡ": "S",
      "Ṣ": "S",
      "Ṩ": "S",
      "ẞ": "SS",
      "Ť": "T",
      "Ţ": "T",
      "Ṱ": "T",
      "Ț": "T",
      "Ⱦ": "T",
      "Ṫ": "T",
      "Ṭ": "T",
      "Ƭ": "T",
      "Ṯ": "T",
      "Ʈ": "T",
      "Ŧ": "T",
      "Ɐ": "A",
      "Ꞁ": "L",
      "Ɯ": "M",
      "Ʌ": "V",
      "Ꜩ": "TZ",
      "Ú": "U",
      "Ŭ": "U",
      "Ǔ": "U",
      "Û": "U",
      "Ṷ": "U",
      "Ü": "U",
      "Ǘ": "U",
      "Ǚ": "U",
      "Ǜ": "U",
      "Ǖ": "U",
      "Ṳ": "U",
      "Ụ": "U",
      "Ű": "U",
      "Ȕ": "U",
      "Ù": "U",
      "Ủ": "U",
      "Ư": "U",
      "Ứ": "U",
      "Ự": "U",
      "Ừ": "U",
      "Ử": "U",
      "Ữ": "U",
      "Ȗ": "U",
      "Ū": "U",
      "Ṻ": "U",
      "Ų": "U",
      "Ů": "U",
      "Ũ": "U",
      "Ṹ": "U",
      "Ṵ": "U",
      "Ꝟ": "V",
      "Ṿ": "V",
      "Ʋ": "V",
      "Ṽ": "V",
      "Ꝡ": "VY",
      "Ẃ": "W",
      "Ŵ": "W",
      "Ẅ": "W",
      "Ẇ": "W",
      "Ẉ": "W",
      "Ẁ": "W",
      "Ⱳ": "W",
      "Ẍ": "X",
      "Ẋ": "X",
      "Ý": "Y",
      "Ŷ": "Y",
      "Ÿ": "Y",
      "Ẏ": "Y",
      "Ỵ": "Y",
      "Ỳ": "Y",
      "Ƴ": "Y",
      "Ỷ": "Y",
      "Ỿ": "Y",
      "Ȳ": "Y",
      "Ɏ": "Y",
      "Ỹ": "Y",
      "Ź": "Z",
      "Ž": "Z",
      "Ẑ": "Z",
      "Ⱬ": "Z",
      "Ż": "Z",
      "Ẓ": "Z",
      "Ȥ": "Z",
      "Ẕ": "Z",
      "Ƶ": "Z",
      "Ĳ": "IJ",
      "Œ": "OE",
      "ᴀ": "A",
      "ᴁ": "AE",
      "ʙ": "B",
      "ᴃ": "B",
      "ᴄ": "C",
      "ᴅ": "D",
      "ᴇ": "E",
      "ꜰ": "F",
      "ɢ": "G",
      "ʛ": "G",
      "ʜ": "H",
      "ɪ": "I",
      "ʁ": "R",
      "ᴊ": "J",
      "ᴋ": "K",
      "ʟ": "L",
      "ᴌ": "L",
      "ᴍ": "M",
      "ɴ": "N",
      "ᴏ": "O",
      "ɶ": "OE",
      "ᴐ": "O",
      "ᴕ": "OU",
      "ᴘ": "P",
      "ʀ": "R",
      "ᴎ": "N",
      "ᴙ": "R",
      "ꜱ": "S",
      "ᴛ": "T",
      "ⱻ": "E",
      "ᴚ": "R",
      "ᴜ": "U",
      "ᴠ": "V",
      "ᴡ": "W",
      "ʏ": "Y",
      "ᴢ": "Z",
      "á": "a",
      "ă": "a",
      "ắ": "a",
      "ặ": "a",
      "ằ": "a",
      "ẳ": "a",
      "ẵ": "a",
      "ǎ": "a",
      "â": "a",
      "ấ": "a",
      "ậ": "a",
      "ầ": "a",
      "ẩ": "a",
      "ẫ": "a",
      "ä": "a",
      "ǟ": "a",
      "ȧ": "a",
      "ǡ": "a",
      "ạ": "a",
      "ȁ": "a",
      "à": "a",
      "ả": "a",
      "ȃ": "a",
      "ā": "a",
      "ą": "a",
      "ᶏ": "a",
      "ẚ": "a",
      "å": "a",
      "ǻ": "a",
      "ḁ": "a",
      "ⱥ": "a",
      "ã": "a",
      "ꜳ": "aa",
      "æ": "ae",
      "ǽ": "ae",
      "ǣ": "ae",
      "ꜵ": "ao",
      "ꜷ": "au",
      "ꜹ": "av",
      "ꜻ": "av",
      "ꜽ": "ay",
      "ḃ": "b",
      "ḅ": "b",
      "ɓ": "b",
      "ḇ": "b",
      "ᵬ": "b",
      "ᶀ": "b",
      "ƀ": "b",
      "ƃ": "b",
      "ɵ": "o",
      "ć": "c",
      "č": "c",
      "ç": "c",
      "ḉ": "c",
      "ĉ": "c",
      "ɕ": "c",
      "ċ": "c",
      "ƈ": "c",
      "ȼ": "c",
      "ď": "d",
      "ḑ": "d",
      "ḓ": "d",
      "ȡ": "d",
      "ḋ": "d",
      "ḍ": "d",
      "ɗ": "d",
      "ᶑ": "d",
      "ḏ": "d",
      "ᵭ": "d",
      "ᶁ": "d",
      "đ": "d",
      "ɖ": "d",
      "ƌ": "d",
      "ı": "i",
      "ȷ": "j",
      "ɟ": "j",
      "ʄ": "j",
      "ǳ": "dz",
      "ǆ": "dz",
      "é": "e",
      "ĕ": "e",
      "ě": "e",
      "ȩ": "e",
      "ḝ": "e",
      "ê": "e",
      "ế": "e",
      "ệ": "e",
      "ề": "e",
      "ể": "e",
      "ễ": "e",
      "ḙ": "e",
      "ë": "e",
      "ė": "e",
      "ẹ": "e",
      "ȅ": "e",
      "è": "e",
      "ẻ": "e",
      "ȇ": "e",
      "ē": "e",
      "ḗ": "e",
      "ḕ": "e",
      "ⱸ": "e",
      "ę": "e",
      "ᶒ": "e",
      "ɇ": "e",
      "ẽ": "e",
      "ḛ": "e",
      "ꝫ": "et",
      "ḟ": "f",
      "ƒ": "f",
      "ᵮ": "f",
      "ᶂ": "f",
      "ǵ": "g",
      "ğ": "g",
      "ǧ": "g",
      "ģ": "g",
      "ĝ": "g",
      "ġ": "g",
      "ɠ": "g",
      "ḡ": "g",
      "ᶃ": "g",
      "ǥ": "g",
      "ḫ": "h",
      "ȟ": "h",
      "ḩ": "h",
      "ĥ": "h",
      "ⱨ": "h",
      "ḧ": "h",
      "ḣ": "h",
      "ḥ": "h",
      "ɦ": "h",
      "ẖ": "h",
      "ħ": "h",
      "ƕ": "hv",
      "í": "i",
      "ĭ": "i",
      "ǐ": "i",
      "î": "i",
      "ï": "i",
      "ḯ": "i",
      "ị": "i",
      "ȉ": "i",
      "ì": "i",
      "ỉ": "i",
      "ȋ": "i",
      "ī": "i",
      "į": "i",
      "ᶖ": "i",
      "ɨ": "i",
      "ĩ": "i",
      "ḭ": "i",
      "ꝺ": "d",
      "ꝼ": "f",
      "ᵹ": "g",
      "ꞃ": "r",
      "ꞅ": "s",
      "ꞇ": "t",
      "ꝭ": "is",
      "ǰ": "j",
      "ĵ": "j",
      "ʝ": "j",
      "ɉ": "j",
      "ḱ": "k",
      "ǩ": "k",
      "ķ": "k",
      "ⱪ": "k",
      "ꝃ": "k",
      "ḳ": "k",
      "ƙ": "k",
      "ḵ": "k",
      "ᶄ": "k",
      "ꝁ": "k",
      "ꝅ": "k",
      "ĺ": "l",
      "ƚ": "l",
      "ɬ": "l",
      "ľ": "l",
      "ļ": "l",
      "ḽ": "l",
      "ȴ": "l",
      "ḷ": "l",
      "ḹ": "l",
      "ⱡ": "l",
      "ꝉ": "l",
      "ḻ": "l",
      "ŀ": "l",
      "ɫ": "l",
      "ᶅ": "l",
      "ɭ": "l",
      "ł": "l",
      "ǉ": "lj",
      "ſ": "s",
      "ẜ": "s",
      "ẛ": "s",
      "ẝ": "s",
      "ḿ": "m",
      "ṁ": "m",
      "ṃ": "m",
      "ɱ": "m",
      "ᵯ": "m",
      "ᶆ": "m",
      "ń": "n",
      "ň": "n",
      "ņ": "n",
      "ṋ": "n",
      "ȵ": "n",
      "ṅ": "n",
      "ṇ": "n",
      "ǹ": "n",
      "ɲ": "n",
      "ṉ": "n",
      "ƞ": "n",
      "ᵰ": "n",
      "ᶇ": "n",
      "ɳ": "n",
      "ñ": "n",
      "ǌ": "nj",
      "ó": "o",
      "ŏ": "o",
      "ǒ": "o",
      "ô": "o",
      "ố": "o",
      "ộ": "o",
      "ồ": "o",
      "ổ": "o",
      "ỗ": "o",
      "ö": "o",
      "ȫ": "o",
      "ȯ": "o",
      "ȱ": "o",
      "ọ": "o",
      "ő": "o",
      "ȍ": "o",
      "ò": "o",
      "ỏ": "o",
      "ơ": "o",
      "ớ": "o",
      "ợ": "o",
      "ờ": "o",
      "ở": "o",
      "ỡ": "o",
      "ȏ": "o",
      "ꝋ": "o",
      "ꝍ": "o",
      "ⱺ": "o",
      "ō": "o",
      "ṓ": "o",
      "ṑ": "o",
      "ǫ": "o",
      "ǭ": "o",
      "ø": "o",
      "ǿ": "o",
      "õ": "o",
      "ṍ": "o",
      "ṏ": "o",
      "ȭ": "o",
      "ƣ": "oi",
      "ꝏ": "oo",
      "ɛ": "e",
      "ᶓ": "e",
      "ɔ": "o",
      "ᶗ": "o",
      "ȣ": "ou",
      "ṕ": "p",
      "ṗ": "p",
      "ꝓ": "p",
      "ƥ": "p",
      "ᵱ": "p",
      "ᶈ": "p",
      "ꝕ": "p",
      "ᵽ": "p",
      "ꝑ": "p",
      "ꝙ": "q",
      "ʠ": "q",
      "ɋ": "q",
      "ꝗ": "q",
      "ŕ": "r",
      "ř": "r",
      "ŗ": "r",
      "ṙ": "r",
      "ṛ": "r",
      "ṝ": "r",
      "ȑ": "r",
      "ɾ": "r",
      "ᵳ": "r",
      "ȓ": "r",
      "ṟ": "r",
      "ɼ": "r",
      "ᵲ": "r",
      "ᶉ": "r",
      "ɍ": "r",
      "ɽ": "r",
      "ↄ": "c",
      "ꜿ": "c",
      "ɘ": "e",
      "ɿ": "r",
      "ś": "s",
      "ṥ": "s",
      "š": "s",
      "ṧ": "s",
      "ş": "s",
      "ŝ": "s",
      "ș": "s",
      "ṡ": "s",
      "ṣ": "s",
      "ṩ": "s",
      "ʂ": "s",
      "ᵴ": "s",
      "ᶊ": "s",
      "ȿ": "s",
      "ɡ": "g",
      "ß": "ss",
      "ᴑ": "o",
      "ᴓ": "o",
      "ᴝ": "u",
      "ť": "t",
      "ţ": "t",
      "ṱ": "t",
      "ț": "t",
      "ȶ": "t",
      "ẗ": "t",
      "ⱦ": "t",
      "ṫ": "t",
      "ṭ": "t",
      "ƭ": "t",
      "ṯ": "t",
      "ᵵ": "t",
      "ƫ": "t",
      "ʈ": "t",
      "ŧ": "t",
      "ᵺ": "th",
      "ɐ": "a",
      "ᴂ": "ae",
      "ǝ": "e",
      "ᵷ": "g",
      "ɥ": "h",
      "ʮ": "h",
      "ʯ": "h",
      "ᴉ": "i",
      "ʞ": "k",
      "ꞁ": "l",
      "ɯ": "m",
      "ɰ": "m",
      "ᴔ": "oe",
      "ɹ": "r",
      "ɻ": "r",
      "ɺ": "r",
      "ⱹ": "r",
      "ʇ": "t",
      "ʌ": "v",
      "ʍ": "w",
      "ʎ": "y",
      "ꜩ": "tz",
      "ú": "u",
      "ŭ": "u",
      "ǔ": "u",
      "û": "u",
      "ṷ": "u",
      "ü": "u",
      "ǘ": "u",
      "ǚ": "u",
      "ǜ": "u",
      "ǖ": "u",
      "ṳ": "u",
      "ụ": "u",
      "ű": "u",
      "ȕ": "u",
      "ù": "u",
      "ủ": "u",
      "ư": "u",
      "ứ": "u",
      "ự": "u",
      "ừ": "u",
      "ử": "u",
      "ữ": "u",
      "ȗ": "u",
      "ū": "u",
      "ṻ": "u",
      "ų": "u",
      "ᶙ": "u",
      "ů": "u",
      "ũ": "u",
      "ṹ": "u",
      "ṵ": "u",
      "ᵫ": "ue",
      "ꝸ": "um",
      "ⱴ": "v",
      "ꝟ": "v",
      "ṿ": "v",
      "ʋ": "v",
      "ᶌ": "v",
      "ⱱ": "v",
      "ṽ": "v",
      "ꝡ": "vy",
      "ẃ": "w",
      "ŵ": "w",
      "ẅ": "w",
      "ẇ": "w",
      "ẉ": "w",
      "ẁ": "w",
      "ⱳ": "w",
      "ẘ": "w",
      "ẍ": "x",
      "ẋ": "x",
      "ᶍ": "x",
      "ý": "y",
      "ŷ": "y",
      "ÿ": "y",
      "ẏ": "y",
      "ỵ": "y",
      "ỳ": "y",
      "ƴ": "y",
      "ỷ": "y",
      "ỿ": "y",
      "ȳ": "y",
      "ẙ": "y",
      "ɏ": "y",
      "ỹ": "y",
      "ź": "z",
      "ž": "z",
      "ẑ": "z",
      "ʑ": "z",
      "ⱬ": "z",
      "ż": "z",
      "ẓ": "z",
      "ȥ": "z",
      "ẕ": "z",
      "ᵶ": "z",
      "ᶎ": "z",
      "ʐ": "z",
      "ƶ": "z",
      "ɀ": "z",
      "ﬀ": "ff",
      "ﬃ": "ffi",
      "ﬄ": "ffl",
      "ﬁ": "fi",
      "ﬂ": "fl",
      "ĳ": "ij",
      "œ": "oe",
      "ﬆ": "st",
      "ₐ": "a",
      "ₑ": "e",
      "ᵢ": "i",
      "ⱼ": "j",
      "ₒ": "o",
      "ᵣ": "r",
      "ᵤ": "u",
      "ᵥ": "v",
      "ₓ": "x"
    };
  }
  transform(text, chars = "\\s") {
    return isString(text) ? text.replace(/[^A-Za-z0-9]/g, (key) => {
      return this.latinMap[key] || key;
    }) : text;
  }
};
LatinisePipe.ɵfac = function LatinisePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LatinisePipe)();
};
LatinisePipe.ɵpipe = ɵɵdefinePipe({
  name: "latinise",
  type: LatinisePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LatinisePipe, [{
    type: Pipe,
    args: [{
      name: "latinise"
    }]
  }], null, null);
})();
var LinesPipe = class {
  transform(text, chars = "\\s") {
    return isString(text) ? text.replace(/\r\n/g, "\n").split("\n") : text;
  }
};
LinesPipe.ɵfac = function LinesPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LinesPipe)();
};
LinesPipe.ɵpipe = ɵɵdefinePipe({
  name: "lines",
  type: LinesPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinesPipe, [{
    type: Pipe,
    args: [{
      name: "lines"
    }]
  }], null, null);
})();
var UnderscorePipe = class {
  transform(text, chars = "\\s") {
    return isString(text) ? text.trim().replace(/\s+/g, "").replace(/[A-Z]/g, (c, k) => {
      return k ? `_${c.toLowerCase()}` : c.toLowerCase();
    }) : text;
  }
};
UnderscorePipe.ɵfac = function UnderscorePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || UnderscorePipe)();
};
UnderscorePipe.ɵpipe = ɵɵdefinePipe({
  name: "underscore",
  type: UnderscorePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnderscorePipe, [{
    type: Pipe,
    args: [{
      name: "underscore"
    }]
  }], null, null);
})();
var MatchPipe = class {
  transform(text, pattern, flags) {
    if (!isString(text)) {
      return text;
    }
    return text.match(new RegExp(pattern, flags));
  }
};
MatchPipe.ɵfac = function MatchPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MatchPipe)();
};
MatchPipe.ɵpipe = ɵɵdefinePipe({
  name: "match",
  type: MatchPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatchPipe, [{
    type: Pipe,
    args: [{
      name: "match"
    }]
  }], null, null);
})();
var TestPipe = class {
  transform(text, pattern, flags) {
    if (!isString(text)) {
      return text;
    }
    return new RegExp(pattern, flags).test(text);
  }
};
TestPipe.ɵfac = function TestPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TestPipe)();
};
TestPipe.ɵpipe = ɵɵdefinePipe({
  name: "test",
  type: TestPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TestPipe, [{
    type: Pipe,
    args: [{
      name: "test"
    }]
  }], null, null);
})();
var LeftPadPipe = class {
  transform(str, length, padCharacter = " ") {
    if (!isString(str) || str.length >= length) {
      return str;
    }
    while (str.length < length) {
      str = padCharacter + str;
    }
    return str;
  }
};
LeftPadPipe.ɵfac = function LeftPadPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LeftPadPipe)();
};
LeftPadPipe.ɵpipe = ɵɵdefinePipe({
  name: "lpad",
  type: LeftPadPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeftPadPipe, [{
    type: Pipe,
    args: [{
      name: "lpad"
    }]
  }], null, null);
})();
var RightPadPipe = class {
  transform(str, length = 1, padCharacter = " ") {
    if (!isString(str) || str.length >= length) {
      return str;
    }
    while (str.length < length) {
      str = str + padCharacter;
    }
    return str;
  }
};
RightPadPipe.ɵfac = function RightPadPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RightPadPipe)();
};
RightPadPipe.ɵpipe = ɵɵdefinePipe({
  name: "rpad",
  type: RightPadPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RightPadPipe, [{
    type: Pipe,
    args: [{
      name: "rpad"
    }]
  }], null, null);
})();
var MakePluralStringPipe = class {
  constructor() {
    this.irregularMap = {
      addendum: "addenda",
      alga: "algae",
      alumna: "alumnae",
      alumnus: "alumni",
      analysis: "analyses",
      antenna: "antennae",
      appendix: "appendices",
      aquarium: "aquaria",
      arch: "arches",
      axe: "axes",
      axis: "axes",
      bacillus: "bacilli",
      bacterium: "bacteria",
      basis: "bases",
      batch: "batches",
      beach: "beaches",
      beau: "beaux",
      bison: "bison",
      brush: "brushes",
      buffalo: "buffaloes",
      bureau: "bureaus",
      bus: "busses",
      cactus: "cacti",
      calf: "calves",
      chateau: "chateaux",
      cherry: "cherries",
      child: "children",
      church: "churches",
      circus: "circuses",
      cod: "cod",
      corps: "corps",
      corpus: "corpora",
      crisis: "crises",
      criterion: "criteria",
      curriculum: "curricula",
      datum: "data",
      deer: "deer",
      diagnosis: "diagnoses",
      die: "dice",
      domino: "dominoes",
      dwarf: "dwarves",
      echo: "echoes",
      elf: "elves",
      ellipsis: "ellipses",
      embargo: "embargoes",
      emphasis: "emphases",
      erratum: "errata",
      fax: "faxes",
      fireman: "firemen",
      fish: "fish",
      flush: "flushes",
      focus: "foci",
      foot: "feet",
      formula: "formulas",
      fungus: "fungi",
      genus: "genera",
      goose: "geese",
      grafito: "grafiti",
      half: "halves",
      hero: "heroes",
      hoax: "hoaxes",
      hoof: "hooves",
      hypothesis: "hypotheses",
      index: "indices",
      kiss: "kisses",
      knife: "knives",
      leaf: "leaves",
      life: "lives",
      loaf: "loaves",
      louse: "lice",
      man: "men",
      mango: "mangoes",
      matrix: "matrices",
      means: "means",
      medium: "media",
      memorandum: "memoranda",
      millennium: "milennia",
      moose: "moose",
      mosquito: "mosquitoes",
      motto: "mottoes",
      mouse: "mice",
      nebula: "nebulae",
      neurosis: "neuroses",
      nucleus: "nuclei",
      oasis: "oases",
      octopus: "octopodes",
      ovum: "ova",
      ox: "oxen",
      paralysis: "paralyses",
      parenthesis: "parentheses",
      person: "people",
      phenomenon: "phenomena",
      plateau: "plateaux",
      potato: "potatoes",
      quiz: "quizzes",
      radius: "radii",
      reflex: "reflexes",
      "runner-up": "runners-up",
      scampo: "scampi",
      scarf: "scarves",
      scissors: "scissors",
      scratch: "scratches",
      self: "selves",
      series: "series",
      sheaf: "sheaves",
      sheep: "sheep",
      shelf: "shelves",
      "son-in-law": "sons-in-law",
      species: "species",
      splash: "splashes",
      stimulus: "stimuli",
      stitch: "stitches",
      stratum: "strata",
      syllabus: "syllabi",
      symposium: "symposia",
      synopsis: "synopses",
      synthesis: "syntheses",
      tableau: "tableaux",
      tax: "taxes",
      that: "those",
      thesis: "theses",
      thief: "thieves",
      this: "these",
      tomato: "tomatoes",
      tooth: "teeth",
      tornado: "tornadoes",
      torpedo: "torpedoes",
      vertebra: "vertebrae",
      veto: "vetoes",
      vita: "vitae",
      volcano: "volcanoes",
      waltz: "waltzes",
      wash: "washes",
      watch: "watches",
      wharf: "wharves",
      wife: "wives",
      wolf: "wolves",
      woman: "women",
      zero: "zeroes"
    };
  }
  transform(singularEntity, quantity = 0) {
    if (!singularEntity || singularEntity === "") {
      return "";
    }
    if (quantity === 1) {
      return singularEntity;
    } else {
      const lastWord = singularEntity.trim().split(" ")[singularEntity.trim().split(" ").length - 1];
      if (this.irregularMap[lastWord.toLocaleLowerCase()]) {
        if (lastWord[0] === lastWord[0].toLocaleUpperCase()) {
          return singularEntity.replace(lastWord, this.irregularMap[lastWord.toLocaleLowerCase()].replace(this.irregularMap[lastWord.toLocaleLowerCase()][0], this.irregularMap[lastWord.toLocaleLowerCase()][0].toLocaleUpperCase()));
        }
        return singularEntity.replace(lastWord, this.irregularMap[lastWord.toLocaleLowerCase()]);
      } else if (lastWord[lastWord.length - 1] === "y") {
        return isVowel(lastWord[lastWord.length - 2]) ? singularEntity + "s" : singularEntity.replace(lastWord, lastWord.slice(0, -1) + "ies");
      } else if (lastWord[lastWord.length - 1] === "s") {
        return singularEntity + "es";
      } else {
        return singularEntity + "s";
      }
    }
  }
};
MakePluralStringPipe.ɵfac = function MakePluralStringPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MakePluralStringPipe)();
};
MakePluralStringPipe.ɵpipe = ɵɵdefinePipe({
  name: "makePluralString",
  type: MakePluralStringPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MakePluralStringPipe, [{
    type: Pipe,
    args: [{
      name: "makePluralString"
    }]
  }], null, null);
})();
var WrapPipe = class {
  transform(str, prefix = "", suffix = "") {
    if (!isString(str)) {
      return str;
    }
    return (!!prefix && isString(prefix) ? prefix : "") + str + (!!suffix && isString(suffix) ? suffix : "");
  }
};
WrapPipe.ɵfac = function WrapPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || WrapPipe)();
};
WrapPipe.ɵpipe = ɵɵdefinePipe({
  name: "wrap",
  type: WrapPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WrapPipe, [{
    type: Pipe,
    args: [{
      name: "wrap"
    }]
  }], null, null);
})();
var STRING_PIPES = [AorAnPipe, LeftTrimPipe, RepeatPipe, RightTrimPipe, ScanPipe, ShortenPipe, StripTagsPipe, TrimPipe, UcFirstPipe, UcWordsPipe, SlugifyPipe, CamelizePipe, LatinisePipe, LinesPipe, UnderscorePipe, MatchPipe, TestPipe, LeftPadPipe, RightPadPipe, MakePluralStringPipe, WrapPipe];
var NgStringPipesModule = class {
};
NgStringPipesModule.ɵfac = function NgStringPipesModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgStringPipesModule)();
};
NgStringPipesModule.ɵmod = ɵɵdefineNgModule({
  type: NgStringPipesModule,
  declarations: [AorAnPipe, LeftTrimPipe, RepeatPipe, RightTrimPipe, ScanPipe, ShortenPipe, StripTagsPipe, TrimPipe, UcFirstPipe, UcWordsPipe, SlugifyPipe, CamelizePipe, LatinisePipe, LinesPipe, UnderscorePipe, MatchPipe, TestPipe, LeftPadPipe, RightPadPipe, MakePluralStringPipe, WrapPipe],
  exports: [AorAnPipe, LeftTrimPipe, RepeatPipe, RightTrimPipe, ScanPipe, ShortenPipe, StripTagsPipe, TrimPipe, UcFirstPipe, UcWordsPipe, SlugifyPipe, CamelizePipe, LatinisePipe, LinesPipe, UnderscorePipe, MatchPipe, TestPipe, LeftPadPipe, RightPadPipe, MakePluralStringPipe, WrapPipe]
});
NgStringPipesModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgStringPipesModule, [{
    type: NgModule,
    args: [{
      declarations: STRING_PIPES,
      imports: [],
      exports: STRING_PIPES
    }]
  }], null, null);
})();
var MaxPipe = class {
  transform(arr) {
    return Array.isArray(arr) ? Math.max(...arr) : arr;
  }
};
MaxPipe.ɵfac = function MaxPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MaxPipe)();
};
MaxPipe.ɵpipe = ɵɵdefinePipe({
  name: "max",
  type: MaxPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaxPipe, [{
    type: Pipe,
    args: [{
      name: "max"
    }]
  }], null, null);
})();
var MinPipe = class {
  transform(arr) {
    return Array.isArray(arr) ? Math.min(...arr) : arr;
  }
};
MinPipe.ɵfac = function MinPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MinPipe)();
};
MinPipe.ɵpipe = ɵɵdefinePipe({
  name: "min",
  type: MinPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MinPipe, [{
    type: Pipe,
    args: [{
      name: "min"
    }]
  }], null, null);
})();
var PercentagePipe = class {
  transform(num, total = 100, floor = false) {
    if (isNaN(num)) {
      return num;
    }
    const percent = num * 100 / total;
    return floor ? Math.floor(percent) : percent;
  }
};
PercentagePipe.ɵfac = function PercentagePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PercentagePipe)();
};
PercentagePipe.ɵpipe = ɵɵdefinePipe({
  name: "percentage",
  type: PercentagePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PercentagePipe, [{
    type: Pipe,
    args: [{
      name: "percentage"
    }]
  }], null, null);
})();
var SumPipe = class {
  transform(arr) {
    return Array.isArray(arr) ? arr.reduce((sum, curr) => sum + curr, 0) : arr;
  }
};
SumPipe.ɵfac = function SumPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SumPipe)();
};
SumPipe.ɵpipe = ɵɵdefinePipe({
  name: "sum",
  type: SumPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SumPipe, [{
    type: Pipe,
    args: [{
      name: "sum"
    }]
  }], null, null);
})();
var FloorPipe = class {
  transform(num, precision = 0) {
    if (precision <= 0) {
      return Math.floor(num);
    }
    const tho = 10 ** precision;
    return Math.floor(num * tho) / tho;
  }
};
FloorPipe.ɵfac = function FloorPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FloorPipe)();
};
FloorPipe.ɵpipe = ɵɵdefinePipe({
  name: "floor",
  type: FloorPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FloorPipe, [{
    type: Pipe,
    args: [{
      name: "floor"
    }]
  }], null, null);
})();
var RoundPipe = class {
  transform(num, precision = 0) {
    return applyPrecision(num, precision);
  }
};
RoundPipe.ɵfac = function RoundPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RoundPipe)();
};
RoundPipe.ɵpipe = ɵɵdefinePipe({
  name: "round",
  type: RoundPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoundPipe, [{
    type: Pipe,
    args: [{
      name: "round"
    }]
  }], null, null);
})();
var SqrtPipe = class {
  transform(num) {
    return !isNaN(num) ? Math.sqrt(num) : num;
  }
};
SqrtPipe.ɵfac = function SqrtPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SqrtPipe)();
};
SqrtPipe.ɵpipe = ɵɵdefinePipe({
  name: "sqrt",
  type: SqrtPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SqrtPipe, [{
    type: Pipe,
    args: [{
      name: "sqrt"
    }]
  }], null, null);
})();
var PowerPipe = class {
  transform(num, power = 2) {
    return !isNaN(num) ? num ** power : num;
  }
};
PowerPipe.ɵfac = function PowerPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PowerPipe)();
};
PowerPipe.ɵpipe = ɵɵdefinePipe({
  name: "pow",
  type: PowerPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PowerPipe, [{
    type: Pipe,
    args: [{
      name: "pow"
    }]
  }], null, null);
})();
var CeilPipe = class {
  transform(num, precision = 0) {
    if (precision <= 0) {
      return Math.ceil(num);
    }
    const tho = 10 ** precision;
    return Math.ceil(num * tho) / tho;
  }
};
CeilPipe.ɵfac = function CeilPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CeilPipe)();
};
CeilPipe.ɵpipe = ɵɵdefinePipe({
  name: "ceil",
  type: CeilPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CeilPipe, [{
    type: Pipe,
    args: [{
      name: "ceil"
    }]
  }], null, null);
})();
var DegreesPipe = class {
  transform(radians) {
    if (!isNumberFinite(radians)) {
      return NaN;
    }
    return radians * 180 / Math.PI;
  }
};
DegreesPipe.ɵfac = function DegreesPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DegreesPipe)();
};
DegreesPipe.ɵpipe = ɵɵdefinePipe({
  name: "degrees",
  type: DegreesPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DegreesPipe, [{
    type: Pipe,
    args: [{
      name: "degrees"
    }]
  }], null, null);
})();
var BytesPipe = class {
  constructor() {
    this.dictionary = [{
      max: 1024,
      type: "B"
    }, {
      max: 1048576,
      type: "KB"
    }, {
      max: 1073741824,
      type: "MB"
    }, {
      max: 10995116e5,
      type: "GB"
    }];
  }
  transform(value, precision) {
    if (!isNumberFinite(value)) {
      return NaN;
    }
    const format = this.dictionary.find((d) => value < d.max) || this.dictionary[this.dictionary.length - 1];
    const calc = value / (format.max / 1024);
    const num = isUndefined(precision) ? calc : applyPrecision(calc, precision);
    return `${num} ${format.type}`;
  }
};
BytesPipe.ɵfac = function BytesPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || BytesPipe)();
};
BytesPipe.ɵpipe = ɵɵdefinePipe({
  name: "bytes",
  type: BytesPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BytesPipe, [{
    type: Pipe,
    args: [{
      name: "bytes"
    }]
  }], null, null);
})();
var RadiansPipe = class {
  transform(degrees) {
    if (!isNumberFinite(degrees)) {
      return NaN;
    }
    return degrees * Math.PI / 180;
  }
};
RadiansPipe.ɵfac = function RadiansPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RadiansPipe)();
};
RadiansPipe.ɵpipe = ɵɵdefinePipe({
  name: "radians",
  type: RadiansPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadiansPipe, [{
    type: Pipe,
    args: [{
      name: "radians"
    }]
  }], null, null);
})();
var MATH_PIPES = [MaxPipe, MinPipe, PercentagePipe, SumPipe, FloorPipe, RoundPipe, SqrtPipe, PowerPipe, CeilPipe, DegreesPipe, BytesPipe, RadiansPipe];
var NgMathPipesModule = class {
};
NgMathPipesModule.ɵfac = function NgMathPipesModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgMathPipesModule)();
};
NgMathPipesModule.ɵmod = ɵɵdefineNgModule({
  type: NgMathPipesModule,
  declarations: [MaxPipe, MinPipe, PercentagePipe, SumPipe, FloorPipe, RoundPipe, SqrtPipe, PowerPipe, CeilPipe, DegreesPipe, BytesPipe, RadiansPipe],
  exports: [MaxPipe, MinPipe, PercentagePipe, SumPipe, FloorPipe, RoundPipe, SqrtPipe, PowerPipe, CeilPipe, DegreesPipe, BytesPipe, RadiansPipe]
});
NgMathPipesModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgMathPipesModule, [{
    type: NgModule,
    args: [{
      declarations: MATH_PIPES,
      imports: [],
      exports: MATH_PIPES
    }]
  }], null, null);
})();
var IsDefinedPipe = class {
  transform(input) {
    return !isUndefined(input);
  }
};
IsDefinedPipe.ɵfac = function IsDefinedPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsDefinedPipe)();
};
IsDefinedPipe.ɵpipe = ɵɵdefinePipe({
  name: "isDefined",
  type: IsDefinedPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsDefinedPipe, [{
    type: Pipe,
    args: [{
      name: "isDefined"
    }]
  }], null, null);
})();
var IsNullPipe = class {
  transform(input) {
    return input === null;
  }
};
IsNullPipe.ɵfac = function IsNullPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsNullPipe)();
};
IsNullPipe.ɵpipe = ɵɵdefinePipe({
  name: "isNull",
  type: IsNullPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsNullPipe, [{
    type: Pipe,
    args: [{
      name: "isNull"
    }]
  }], null, null);
})();
var IsUndefinedPipe = class {
  transform(input) {
    return isUndefined(input);
  }
};
IsUndefinedPipe.ɵfac = function IsUndefinedPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsUndefinedPipe)();
};
IsUndefinedPipe.ɵpipe = ɵɵdefinePipe({
  name: "isUndefined",
  type: IsUndefinedPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsUndefinedPipe, [{
    type: Pipe,
    args: [{
      name: "isUndefined"
    }]
  }], null, null);
})();
var IsStringPipe = class {
  transform(input) {
    return isString(input);
  }
};
IsStringPipe.ɵfac = function IsStringPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsStringPipe)();
};
IsStringPipe.ɵpipe = ɵɵdefinePipe({
  name: "isString",
  type: IsStringPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsStringPipe, [{
    type: Pipe,
    args: [{
      name: "isString"
    }]
  }], null, null);
})();
var IsFunctionPipe = class {
  transform(input) {
    return isFunction(input);
  }
};
IsFunctionPipe.ɵfac = function IsFunctionPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsFunctionPipe)();
};
IsFunctionPipe.ɵpipe = ɵɵdefinePipe({
  name: "isFunction",
  type: IsFunctionPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsFunctionPipe, [{
    type: Pipe,
    args: [{
      name: "isFunction"
    }]
  }], null, null);
})();
var IsNumberPipe = class {
  transform(input) {
    return isNumber(input);
  }
};
IsNumberPipe.ɵfac = function IsNumberPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsNumberPipe)();
};
IsNumberPipe.ɵpipe = ɵɵdefinePipe({
  name: "isNumber",
  type: IsNumberPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsNumberPipe, [{
    type: Pipe,
    args: [{
      name: "isNumber"
    }]
  }], null, null);
})();
var IsArrayPipe = class {
  transform(input) {
    return Array.isArray(input);
  }
};
IsArrayPipe.ɵfac = function IsArrayPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsArrayPipe)();
};
IsArrayPipe.ɵpipe = ɵɵdefinePipe({
  name: "isArray",
  type: IsArrayPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsArrayPipe, [{
    type: Pipe,
    args: [{
      name: "isArray"
    }]
  }], null, null);
})();
var IsObjectPipe = class {
  transform(input) {
    return isObject(input);
  }
};
IsObjectPipe.ɵfac = function IsObjectPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsObjectPipe)();
};
IsObjectPipe.ɵpipe = ɵɵdefinePipe({
  name: "isObject",
  type: IsObjectPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsObjectPipe, [{
    type: Pipe,
    args: [{
      name: "isObject"
    }]
  }], null, null);
})();
var IsGreaterEqualThanPipe = class {
  transform(input, other) {
    return input >= other;
  }
};
IsGreaterEqualThanPipe.ɵfac = function IsGreaterEqualThanPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsGreaterEqualThanPipe)();
};
IsGreaterEqualThanPipe.ɵpipe = ɵɵdefinePipe({
  name: "isGreaterEqualThan",
  type: IsGreaterEqualThanPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsGreaterEqualThanPipe, [{
    type: Pipe,
    args: [{
      name: "isGreaterEqualThan"
    }]
  }], null, null);
})();
var IsGreaterThanPipe = class {
  transform(input, other) {
    return input > other;
  }
};
IsGreaterThanPipe.ɵfac = function IsGreaterThanPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsGreaterThanPipe)();
};
IsGreaterThanPipe.ɵpipe = ɵɵdefinePipe({
  name: "isGreaterThan",
  type: IsGreaterThanPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsGreaterThanPipe, [{
    type: Pipe,
    args: [{
      name: "isGreaterThan"
    }]
  }], null, null);
})();
var IsLessEqualThanPipe = class {
  transform(input, other) {
    return input <= other;
  }
};
IsLessEqualThanPipe.ɵfac = function IsLessEqualThanPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsLessEqualThanPipe)();
};
IsLessEqualThanPipe.ɵpipe = ɵɵdefinePipe({
  name: "isLessEqualThan",
  type: IsLessEqualThanPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsLessEqualThanPipe, [{
    type: Pipe,
    args: [{
      name: "isLessEqualThan"
    }]
  }], null, null);
})();
var IsEqualToPipe = class {
  transform(input, other) {
    return input == other;
  }
};
IsEqualToPipe.ɵfac = function IsEqualToPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsEqualToPipe)();
};
IsEqualToPipe.ɵpipe = ɵɵdefinePipe({
  name: "isEqualTo",
  type: IsEqualToPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsEqualToPipe, [{
    type: Pipe,
    args: [{
      name: "isEqualTo"
    }]
  }], null, null);
})();
var IsNotEqualToPipe = class {
  transform(input, other) {
    return input != other;
  }
};
IsNotEqualToPipe.ɵfac = function IsNotEqualToPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsNotEqualToPipe)();
};
IsNotEqualToPipe.ɵpipe = ɵɵdefinePipe({
  name: "isNotEqualTo",
  type: IsNotEqualToPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsNotEqualToPipe, [{
    type: Pipe,
    args: [{
      name: "isNotEqualTo"
    }]
  }], null, null);
})();
var IsIdenticalToPipe = class {
  transform(input, other) {
    return input === other;
  }
};
IsIdenticalToPipe.ɵfac = function IsIdenticalToPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsIdenticalToPipe)();
};
IsIdenticalToPipe.ɵpipe = ɵɵdefinePipe({
  name: "isIdenticalTo",
  type: IsIdenticalToPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsIdenticalToPipe, [{
    type: Pipe,
    args: [{
      name: "isIdenticalTo"
    }]
  }], null, null);
})();
var IsNotIdenticalToPipe = class {
  transform(input, other) {
    return input !== other;
  }
};
IsNotIdenticalToPipe.ɵfac = function IsNotIdenticalToPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsNotIdenticalToPipe)();
};
IsNotIdenticalToPipe.ɵpipe = ɵɵdefinePipe({
  name: "isNotIdenticalTo",
  type: IsNotIdenticalToPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsNotIdenticalToPipe, [{
    type: Pipe,
    args: [{
      name: "isNotIdenticalTo"
    }]
  }], null, null);
})();
var IsLessThanPipe = class {
  transform(input, other) {
    return input < other;
  }
};
IsLessThanPipe.ɵfac = function IsLessThanPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IsLessThanPipe)();
};
IsLessThanPipe.ɵpipe = ɵɵdefinePipe({
  name: "isLessThan",
  type: IsLessThanPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IsLessThanPipe, [{
    type: Pipe,
    args: [{
      name: "isLessThan"
    }]
  }], null, null);
})();
var BOOLEAN_PIPES = [IsDefinedPipe, IsNullPipe, IsUndefinedPipe, IsStringPipe, IsFunctionPipe, IsNumberPipe, IsArrayPipe, IsObjectPipe, IsGreaterEqualThanPipe, IsGreaterThanPipe, IsLessEqualThanPipe, IsLessEqualThanPipe, IsEqualToPipe, IsNotEqualToPipe, IsIdenticalToPipe, IsNotIdenticalToPipe, IsLessThanPipe];
var NgBooleanPipesModule = class {
};
NgBooleanPipesModule.ɵfac = function NgBooleanPipesModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgBooleanPipesModule)();
};
NgBooleanPipesModule.ɵmod = ɵɵdefineNgModule({
  type: NgBooleanPipesModule,
  declarations: [IsDefinedPipe, IsNullPipe, IsUndefinedPipe, IsStringPipe, IsFunctionPipe, IsNumberPipe, IsArrayPipe, IsObjectPipe, IsGreaterEqualThanPipe, IsGreaterThanPipe, IsLessEqualThanPipe, IsLessEqualThanPipe, IsEqualToPipe, IsNotEqualToPipe, IsIdenticalToPipe, IsNotIdenticalToPipe, IsLessThanPipe],
  exports: [IsDefinedPipe, IsNullPipe, IsUndefinedPipe, IsStringPipe, IsFunctionPipe, IsNumberPipe, IsArrayPipe, IsObjectPipe, IsGreaterEqualThanPipe, IsGreaterThanPipe, IsLessEqualThanPipe, IsLessEqualThanPipe, IsEqualToPipe, IsNotEqualToPipe, IsIdenticalToPipe, IsNotIdenticalToPipe, IsLessThanPipe]
});
NgBooleanPipesModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgBooleanPipesModule, [{
    type: NgModule,
    args: [{
      declarations: BOOLEAN_PIPES,
      imports: [],
      exports: BOOLEAN_PIPES
    }]
  }], null, null);
})();
var TimeAgoPipe = class _TimeAgoPipe {
  /**
   * @param inputDate: Date | Moment - not included as TypeScript interface,
   * in order to keep `ngx-pipes` "pure" from dependencies!
   */
  transform(inputDate) {
    if (!inputDate || !inputDate.getTime && !inputDate.toDate) {
      return "Invalid date";
    }
    const past = inputDate.toDate ? inputDate.toDate() : inputDate.getTime();
    const now = +/* @__PURE__ */ new Date();
    if (past > now) {
      return "in the future";
    }
    for (let i = 0, l = _TimeAgoPipe.MAPPER.length, ms = now - past, div = _TimeAgoPipe.YEAR_MS; i < l; ++i) {
      const elm = _TimeAgoPipe.MAPPER[i];
      const unit = Math.floor(ms / (div /= elm.div));
      if (unit >= 1) {
        return unit === 1 ? elm.single : `${unit} ${elm.many} ago`;
      }
    }
    return "just now";
  }
};
TimeAgoPipe.YEAR_MS = 1e3 * 60 * 60 * 24 * 7 * 4 * 12;
TimeAgoPipe.MAPPER = [{
  single: "last year",
  many: "years",
  div: 1
}, {
  single: "last month",
  many: "months",
  div: 12
}, {
  single: "last week",
  many: "weeks",
  div: 4
}, {
  single: "yesterday",
  many: "days",
  div: 7
}, {
  single: "an hour ago",
  many: "hours",
  div: 24
}, {
  single: "just now",
  many: "minutes",
  div: 60
}];
TimeAgoPipe.ɵfac = function TimeAgoPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TimeAgoPipe)();
};
TimeAgoPipe.ɵpipe = ɵɵdefinePipe({
  name: "timeAgo",
  type: TimeAgoPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeAgoPipe, [{
    type: Pipe,
    args: [{
      name: "timeAgo"
    }]
  }], null, null);
})();
var DATE_PIPES = [TimeAgoPipe];
var NgDatePipesModule = class {
};
NgDatePipesModule.ɵfac = function NgDatePipesModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgDatePipesModule)();
};
NgDatePipesModule.ɵmod = ɵɵdefineNgModule({
  type: NgDatePipesModule,
  declarations: [TimeAgoPipe],
  exports: [TimeAgoPipe]
});
NgDatePipesModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgDatePipesModule, [{
    type: NgModule,
    args: [{
      declarations: DATE_PIPES,
      imports: [],
      exports: DATE_PIPES
    }]
  }], null, null);
})();
var NgPipesModule = class {
};
NgPipesModule.ɵfac = function NgPipesModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgPipesModule)();
};
NgPipesModule.ɵmod = ɵɵdefineNgModule({
  type: NgPipesModule,
  exports: [NgArrayPipesModule, NgStringPipesModule, NgMathPipesModule, NgBooleanPipesModule, NgObjectPipesModule, NgDatePipesModule]
});
NgPipesModule.ɵinj = ɵɵdefineInjector({
  imports: [NgArrayPipesModule, NgStringPipesModule, NgMathPipesModule, NgBooleanPipesModule, NgObjectPipesModule, NgDatePipesModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgPipesModule, [{
    type: NgModule,
    args: [{
      exports: [NgArrayPipesModule, NgStringPipesModule, NgMathPipesModule, NgBooleanPipesModule, NgObjectPipesModule, NgDatePipesModule]
    }]
  }], null, null);
})();
export {
  AorAnPipe,
  BOOLEAN_PIPES,
  BytesPipe,
  CamelizePipe,
  CeilPipe,
  ChunkPipe,
  DATE_PIPES,
  DegreesPipe,
  DiffObjPipe,
  DiffPipe,
  EveryPipe,
  FilterByImpurePipe,
  FilterByPipe,
  FlattenPipe,
  FloorPipe,
  FromPairsPipe,
  GroupByImpurePipe,
  GroupByPipe,
  InitialPipe,
  IntersectionPipe,
  InvertByPipe,
  InvertPipe,
  IsArrayPipe,
  IsDefinedPipe,
  IsEqualToPipe,
  IsFunctionPipe,
  IsGreaterEqualThanPipe,
  IsGreaterThanPipe,
  IsIdenticalToPipe,
  IsLessEqualThanPipe,
  IsLessThanPipe,
  IsNotEqualToPipe,
  IsNotIdenticalToPipe,
  IsNullPipe,
  IsNumberPipe,
  IsObjectPipe,
  IsStringPipe,
  IsUndefinedPipe,
  KeysPipe,
  LatinisePipe,
  LeftPadPipe,
  LeftTrimPipe,
  LinesPipe,
  MATH_PIPES,
  MakePluralStringPipe,
  MatchPipe,
  MaxPipe,
  MinPipe,
  NgArrayPipesModule,
  NgBooleanPipesModule,
  NgDatePipesModule,
  NgMathPipesModule,
  NgObjectPipesModule,
  NgPipesModule,
  NgStringPipesModule,
  OmitPipe,
  OrderByImpurePipe,
  OrderByPipe,
  PairsPipe,
  PercentagePipe,
  PickPipe,
  PluckPipe,
  PowerPipe,
  RadiansPipe,
  RangePipe,
  RepeatPipe,
  ReversePipe,
  RightPadPipe,
  RightTrimPipe,
  RoundPipe,
  STRING_PIPES,
  SamplePipe,
  ScanPipe,
  ShortenPipe,
  ShufflePipe,
  SlugifyPipe,
  SomePipe,
  SqrtPipe,
  StripTagsPipe,
  SumPipe,
  TailPipe,
  TestPipe,
  TimeAgoPipe,
  TrimPipe,
  TrurthifyPipe,
  UcFirstPipe,
  UcWordsPipe,
  UnderscorePipe,
  UnionPipe,
  UniquePipe,
  ValuesPipe,
  WithoutPipe,
  WrapPipe
};
//# sourceMappingURL=ngx-pipes.js.map
