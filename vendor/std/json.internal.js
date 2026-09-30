const {
  imul: imul__376
} = globalThis.Math;
import {
  type as type__2, requireInstanceOf as requireInstanceOf__199, clampInt64 as clampInt64__481, mappedGetOr as mappedGetOr_33, cmpInt32 as cmpInt32_514, listedGet as listedGet_35, mappedForEach as mappedForEach_49, int64ToInt32 as int64ToInt32_95, int64ToFloat64 as int64ToFloat64_99, float64ToString as float64ToString_106, float64ToInt32 as float64ToInt32_108, float64ToInt64 as float64ToInt64_110, stringToInt32 as stringToInt32_120, stringToFloat64 as stringToFloat64_122, stringToInt64 as stringToInt64_124, listBuilderAdd as listBuilderAdd_137, listedGetOr as listedGetOr_140, listBuilderSet as listBuilderSet_144, listBuilderRemoveLast as listBuilderRemoveLast_150, mapBuilderConstructor as mapBuilderConstructor_192, panic as panic_200, mappedGet as mappedGet_207, mapBuilderSet as mapBuilderSet_208, listBuilderToList as listBuilderToList_213, mappedToMap as mappedToMap_214, stringGet as stringGet_252, stringNext as stringNext_349, stringHasAtLeast as stringHasAtLeast_395, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_401, requireStringIndex as requireStringIndex_414, cmpInt64 as cmpInt64_515, int64ToInt32Unsafe as int64ToInt32Unsafe_498, eqFloat64 as eqFloat64_503
} from "@temperlang/core";
export class InterchangeContext extends type__2() {
  /**
   * @param {string} headerName_1
   * @returns {string | null}
   */
  getHeader(headerName_1) {
    null;
  }
};
export class NullInterchangeContext extends type__2(InterchangeContext) {
  /**
   * @param {string} headerName_4
   * @returns {string | null}
   */
  getHeader(headerName_4) {
    return null;
  }
  /** @type {NullInterchangeContext} */
  static #instance_5 = new NullInterchangeContext();
  /** @returns {NullInterchangeContext} */
  static get instance() {
    return this.#instance_5;
  }
  constructor() {
    super ();
    return;
  }
};
export class JsonProducer extends type__2() {
  startObject() {
    null;
  }
  endObject() {
    null;
  }
  /** @param {string} key_10 */
  objectKey(key_10) {
    null;
  }
  startArray() {
    null;
  }
  endArray() {
    null;
  }
  nullValue() {
    null;
  }
  /** @param {boolean} x_15 */
  booleanValue(x_15) {
    null;
  }
  /** @param {number} x_17 */
  int32Value(x_17) {
    null;
  }
  /** @param {bigint} x_19 */
  int64Value(x_19) {
    null;
  }
  /** @param {number} x_21 */
  float64Value(x_21) {
    null;
  }
  /** @param {string} x_23 */
  numericTokenValue(x_23) {
    null;
  }
  /** @param {string} x_25 */
  stringValue(x_25) {
    null;
  }
  /** @returns {JsonParseErrorReceiver | null} */
  get parseErrorReceiver() {
    return null;
  }
};
export class JsonSyntaxTree extends type__2() {
  /** @param {JsonProducer} p_28 */
  produce(p_28) {
    null;
  }
};
export class JsonObject extends type__2(JsonSyntaxTree) {
  /** @type {Map<string, Array<JsonSyntaxTree>>} */
  #properties_29;
  /**
   * @param {string} propertyKey_31
   * @returns {JsonSyntaxTree | null}
   */
  propertyValueOrNull(propertyKey_31) {
    const treeList_32 = mappedGetOr_33(this.#properties_29, propertyKey_31, Object.freeze([]));
    const lastIndex_34 = treeList_32.length - 1 | 0;
    if (lastIndex_34 >= 0) {
      return listedGet_35(treeList_32, lastIndex_34);
    } else {
      return null;
    }
  }
  /**
   * @param {string} propertyKey_37
   * @returns {JsonSyntaxTree}
   */
  propertyValueOrBubble(propertyKey_37) {
    const t_38 = this.propertyValueOrNull(propertyKey_37);
    if (t_38 == null) {
      throw Error();
    } else {
      return t_38;
    }
  }
  /** @param {JsonProducer} p_40 */
  produce(p_40) {
    p_40.startObject();
    function fn_41(k_42, vs_43) {
      const this_44 = vs_43;
      const n_45 = this_44.length;
      let i_46 = 0;
      while (i_46 < n_45) {
        const el_47 = listedGet_35(this_44, i_46);
        i_46 = i_46 + 1 | 0;
        const v_48 = el_47;
        p_40.objectKey(k_42);
        v_48.produce(p_40);
      }
      return;
    }
    mappedForEach_49(this.#properties_29, fn_41);
    p_40.endObject();
    return;
  }
  /** @param {Map<string, Array<JsonSyntaxTree>>} properties_50 */
  constructor(properties_50) {
    super ();
    this.#properties_29 = properties_50;
    return;
  }
  /** @returns {Map<string, Array<JsonSyntaxTree>>} */
  get properties() {
    return this.#properties_29;
  }
};
export class JsonArray extends type__2(JsonSyntaxTree) {
  /** @type {Array<JsonSyntaxTree>} */
  #elements_52;
  /** @param {JsonProducer} p_54 */
  produce(p_54) {
    p_54.startArray();
    const this_55 = this.#elements_52;
    const n_56 = this_55.length;
    let i_57 = 0;
    while (i_57 < n_56) {
      const el_58 = listedGet_35(this_55, i_57);
      i_57 = i_57 + 1 | 0;
      const v_59 = el_58;
      v_59.produce(p_54);
    }
    p_54.endArray();
    return;
  }
  /** @param {Array<JsonSyntaxTree>} elements_60 */
  constructor(elements_60) {
    super ();
    this.#elements_52 = elements_60;
    return;
  }
  /** @returns {Array<JsonSyntaxTree>} */
  get elements() {
    return this.#elements_52;
  }
};
export class JsonBoolean extends type__2(JsonSyntaxTree) {
  /** @type {boolean} */
  #content_62;
  /** @param {JsonProducer} p_64 */
  produce(p_64) {
    p_64.booleanValue(this.#content_62);
    return;
  }
  /** @param {boolean} content_65 */
  constructor(content_65) {
    super ();
    this.#content_62 = content_65;
    return;
  }
  /** @returns {boolean} */
  get content() {
    return this.#content_62;
  }
};
export class JsonNull extends type__2(JsonSyntaxTree) {
  /** @param {JsonProducer} p_68 */
  produce(p_68) {
    p_68.nullValue();
    return;
  }
  constructor() {
    super ();
    return;
  }
};
export class JsonString extends type__2(JsonSyntaxTree) {
  /** @type {string} */
  #content_69;
  /** @param {JsonProducer} p_71 */
  produce(p_71) {
    p_71.stringValue(this.#content_69);
    return;
  }
  /** @param {string} content_72 */
  constructor(content_72) {
    super ();
    this.#content_69 = content_72;
    return;
  }
  /** @returns {string} */
  get content() {
    return this.#content_69;
  }
};
export class JsonNumeric extends type__2(JsonSyntaxTree) {
  /** @returns {string} */
  asJsonNumericToken() {
    null;
  }
  /** @returns {number} */
  asInt32() {
    null;
  }
  /** @returns {bigint} */
  asInt64() {
    null;
  }
  /** @returns {number} */
  asFloat64() {
    null;
  }
};
export class JsonInt32 extends type__2(JsonNumeric) {
  /** @type {number} */
  #content_78;
  /** @param {JsonProducer} p_80 */
  produce(p_80) {
    p_80.int32Value(this.#content_78);
    return;
  }
  /** @returns {string} */
  asJsonNumericToken() {
    return this.#content_78.toString();
  }
  /** @returns {number} */
  asInt32() {
    return this.#content_78;
  }
  /** @returns {number} */
  asInt32Safe() {
    return this.#content_78;
  }
  /** @returns {bigint} */
  asInt64() {
    return this.asInt64Safe();
  }
  /** @returns {bigint} */
  asInt64Safe() {
    return BigInt(this.#content_78);
  }
  /** @returns {number} */
  asFloat64() {
    return this.asFloat64Safe();
  }
  /** @returns {number} */
  asFloat64Safe() {
    return this.#content_78;
  }
  /** @param {number} content_88 */
  constructor(content_88) {
    super ();
    this.#content_78 = content_88;
    return;
  }
  /** @returns {number} */
  get content() {
    return this.#content_78;
  }
};
export class JsonInt64 extends type__2(JsonNumeric) {
  /** @type {bigint} */
  #content_90;
  /** @param {JsonProducer} p_92 */
  produce(p_92) {
    p_92.int64Value(this.#content_90);
    return;
  }
  /** @returns {string} */
  asJsonNumericToken() {
    return this.#content_90.toString();
  }
  /** @returns {number} */
  asInt32() {
    return int64ToInt32_95(this.#content_90);
  }
  /** @returns {bigint} */
  asInt64() {
    return this.#content_90;
  }
  /** @returns {bigint} */
  asInt64Safe() {
    return this.#content_90;
  }
  /** @returns {number} */
  asFloat64() {
    return int64ToFloat64_99(this.#content_90);
  }
  /** @param {bigint} content_100 */
  constructor(content_100) {
    super ();
    this.#content_90 = content_100;
    return;
  }
  /** @returns {bigint} */
  get content() {
    return this.#content_90;
  }
};
export class JsonFloat64 extends type__2(JsonNumeric) {
  /** @type {number} */
  #content_102;
  /** @param {JsonProducer} p_104 */
  produce(p_104) {
    p_104.float64Value(this.#content_102);
    return;
  }
  /** @returns {string} */
  asJsonNumericToken() {
    return float64ToString_106(this.#content_102);
  }
  /** @returns {number} */
  asInt32() {
    return float64ToInt32_108(this.#content_102);
  }
  /** @returns {bigint} */
  asInt64() {
    return float64ToInt64_110(this.#content_102);
  }
  /** @returns {number} */
  asFloat64() {
    return this.#content_102;
  }
  /** @returns {number} */
  asFloat64Safe() {
    return this.#content_102;
  }
  /** @param {number} content_113 */
  constructor(content_113) {
    super ();
    this.#content_102 = content_113;
    return;
  }
  /** @returns {number} */
  get content() {
    return this.#content_102;
  }
};
export class JsonNumericToken extends type__2(JsonNumeric) {
  /** @type {string} */
  #content_115;
  /** @param {JsonProducer} p_117 */
  produce(p_117) {
    p_117.numericTokenValue(this.#content_115);
    return;
  }
  /** @returns {string} */
  asJsonNumericToken() {
    return this.#content_115;
  }
  /** @returns {number} */
  asInt32() {
    try {
      return stringToInt32_120(this.#content_115);
    } catch {
      const t_121 = stringToFloat64_122(this.#content_115);
      return float64ToInt32_108(t_121);
    }
  }
  /** @returns {bigint} */
  asInt64() {
    try {
      return stringToInt64_124(this.#content_115);
    } catch {
      const t_125 = stringToFloat64_122(this.#content_115);
      return float64ToInt64_110(t_125);
    }
  }
  /** @returns {number} */
  asFloat64() {
    return stringToFloat64_122(this.#content_115);
  }
  /** @param {string} content_127 */
  constructor(content_127) {
    super ();
    this.#content_115 = content_127;
    return;
  }
  /** @returns {string} */
  get content() {
    return this.#content_115;
  }
};
export class JsonTextProducer extends type__2(JsonProducer) {
  /** @type {InterchangeContext} */
  #interchangeContext_129;
  /** @type {globalThis.Array<string>} */
  #buffer_130;
  /** @type {Array<number>} */
  #stack_131;
  /** @type {boolean} */
  #wellFormed_132;
  /** @param {InterchangeContext | null} [interchangeContext_133] */
  constructor(interchangeContext_133) {
    super ();
    let interchangeContext_134;
    if (interchangeContext_133 == null) {
      interchangeContext_134 = NullInterchangeContext.instance;
    } else {
      interchangeContext_134 = interchangeContext_133;
    }
    this.#interchangeContext_129 = interchangeContext_134;
    const t_135 = [""];
    this.#buffer_130 = t_135;
    const t_136 = [];
    this.#stack_131 = t_136;
    listBuilderAdd_137(this.#stack_131, 5);
    this.#wellFormed_132 = true;
    return;
  }
  /** @returns {number} */
  #state_139() {
    return listedGetOr_140(this.#stack_131, this.#stack_131.length - 1 | 0, -1);
  }
  #beforeValue_142() {
    const currentState_143 = this.#state_139();
    switch (currentState_143) {
      case 3:
        {
        listBuilderSet_144(this.#stack_131, this.#stack_131.length - 1 | 0, 4);
        return;
      }
      break;
      case 4:
        {
        void (this.#buffer_130[0] += ",");
        return;
      }
      break;
      case 1:
        {
        listBuilderSet_144(this.#stack_131, this.#stack_131.length - 1 | 0, 2);
        return;
      }
      break;
      case 5:
        {
        listBuilderSet_144(this.#stack_131, this.#stack_131.length - 1 | 0, 6);
        return;
      }
      break;
      default:
        {
        let t_145;
        if (currentState_143 === 6) {
          t_145 = true;
        } else {
          t_145 = currentState_143 === 2;
        }
        if (t_145) {
          this.#wellFormed_132 = false;
          return;
        } else {
          return;
        }
      }
    }
  }
  startObject() {
    this.#beforeValue_142();
    void (this.#buffer_130[0] += "{");
    listBuilderAdd_137(this.#stack_131, 0);
    return;
  }
  endObject() {
    void (this.#buffer_130[0] += "}");
    const currentState_148 = this.#state_139();
    let t_149;
    if (0 === currentState_148) {
      t_149 = true;
    } else {
      t_149 = 2 === currentState_148;
    }
    if (t_149) {
      listBuilderRemoveLast_150(this.#stack_131);
    } else {
      this.#wellFormed_132 = false;
    }
    return;
  }
  /** @param {string} key_152 */
  objectKey(key_152) {
    const currentState_153 = this.#state_139();
    if (!(currentState_153 === 0)) {
      if (currentState_153 === 2) {
        void (this.#buffer_130[0] += ",");
      } else {
        this.#wellFormed_132 = false;
      }
    }
    encodeJsonString_154(key_152, this.#buffer_130);
    void (this.#buffer_130[0] += ":");
    if (currentState_153 >= 0) {
      listBuilderSet_144(this.#stack_131, this.#stack_131.length - 1 | 0, 1);
    }
    return;
  }
  startArray() {
    this.#beforeValue_142();
    void (this.#buffer_130[0] += "[");
    listBuilderAdd_137(this.#stack_131, 3);
    return;
  }
  endArray() {
    void (this.#buffer_130[0] += "]");
    const currentState_157 = this.#state_139();
    let t_158;
    if (3 === currentState_157) {
      t_158 = true;
    } else {
      t_158 = 4 === currentState_157;
    }
    if (t_158) {
      listBuilderRemoveLast_150(this.#stack_131);
    } else {
      this.#wellFormed_132 = false;
    }
    return;
  }
  nullValue() {
    this.#beforeValue_142();
    void (this.#buffer_130[0] += "null");
    return;
  }
  /** @param {boolean} x_161 */
  booleanValue(x_161) {
    let t_162;
    this.#beforeValue_142();
    const t_163 = this.#buffer_130;
    if (x_161) {
      t_162 = "true";
    } else {
      t_162 = "false";
    }
    void (t_163[0] += t_162);
    return;
  }
  /** @param {number} x_165 */
  int32Value(x_165) {
    this.#beforeValue_142();
    void (this.#buffer_130[0] += x_165.toString());
    return;
  }
  /** @param {bigint} x_167 */
  int64Value(x_167) {
    this.#beforeValue_142();
    void (this.#buffer_130[0] += x_167.toString());
    return;
  }
  /** @param {number} x_169 */
  float64Value(x_169) {
    this.#beforeValue_142();
    void (this.#buffer_130[0] += float64ToString_106(x_169));
    return;
  }
  /** @param {string} x_171 */
  numericTokenValue(x_171) {
    this.#beforeValue_142();
    void (this.#buffer_130[0] += x_171);
    return;
  }
  /** @param {string} x_173 */
  stringValue(x_173) {
    this.#beforeValue_142();
    encodeJsonString_154(x_173, this.#buffer_130);
    return;
  }
  /** @returns {string} */
  toJsonString() {
    let t_175;
    if (this.#wellFormed_132) {
      if (this.#stack_131.length === 1) {
        t_175 = this.#state_139() === 6;
      } else {
        t_175 = false;
      }
    } else {
      t_175 = false;
    }
    if (t_175) {
      return this.#buffer_130[0];
    } else {
      throw Error();
    }
  }
  /** @returns {InterchangeContext} */
  get interchangeContext() {
    return this.#interchangeContext_129;
  }
};
export class JsonParseErrorReceiver extends type__2() {
  /** @param {string} explanation_178 */
  explainJsonError(explanation_178) {
    null;
  }
};
export class JsonSyntaxTreeProducer extends type__2(JsonProducer, JsonParseErrorReceiver) {
  /** @type {Array<Array<JsonSyntaxTree>>} */
  #stack_179;
  /** @type {string | null} */
  #error_180;
  /** @returns {InterchangeContext} */
  get interchangeContext() {
    return NullInterchangeContext.instance;
  }
  constructor() {
    super ();
    const t_182 = [];
    this.#stack_179 = t_182;
    listBuilderAdd_137(this.#stack_179, []);
    this.#error_180 = null;
    return;
  }
  /** @param {JsonSyntaxTree} v_185 */
  #storeValue_184(v_185) {
    if (! ! this.#stack_179.length) {
      listBuilderAdd_137(listedGet_35(this.#stack_179, this.#stack_179.length - 1 | 0), v_185);
    }
    return;
  }
  startObject() {
    listBuilderAdd_137(this.#stack_179, []);
    return;
  }
  endObject() {
    let return_188;
    fn_189: {
      return_188 = void 0;
      if (! this.#stack_179.length) {
        break fn_189;
      }
      const ls_190 = listBuilderRemoveLast_150(this.#stack_179);
      const m_191 = mapBuilderConstructor_192();
      let multis_193 = null;
      let i_194 = 0;
      let n_195 = ls_190.length & -2;
      while (i_194 < n_195) {
        let t_196;
        const postfixReturn_197 = i_194;
        i_194 = postfixReturn_197 + 1 | 0;
        const keyTree_198 = listedGet_35(ls_190, postfixReturn_197);
        if (!(keyTree_198 instanceof JsonString)) {
          break;
        }
        try {
          t_196 = requireInstanceOf__199(keyTree_198, JsonString);
        } catch {
          t_196 = panic_200();
        }
        const key_201 = t_196.content;
        const postfixReturn_202 = i_194;
        i_194 = postfixReturn_202 + 1 | 0;
        const value_203 = listedGet_35(ls_190, postfixReturn_202);
        if (m_191.has(key_201)) {
          let t_204;
          if (multis_193 == null) {
            multis_193 = mapBuilderConstructor_192();
          }
          let mb_205;
          try {
            if (multis_193 == null) {
              throw Error();
            } else {
              mb_205 = multis_193;
            }
          } catch {
            mb_205 = panic_200();
          }
          if (! mb_205.has(key_201)) {
            let t_206;
            try {
              t_206 = mappedGet_207(m_191, key_201);
            } catch {
              t_206 = panic_200();
            }
            mapBuilderSet_208(mb_205, key_201, t_206.slice());
          }
          try {
            t_204 = mappedGet_207(mb_205, key_201);
          } catch {
            t_204 = panic_200();
          }
          listBuilderAdd_137(t_204, value_203);
        } else {
          mapBuilderSet_208(m_191, key_201, Object.freeze([value_203]));
        }
      }
      const multis_209 = multis_193;
      if (!(multis_209 == null)) {
        function fn_210(k_211, vs_212) {
          mapBuilderSet_208(m_191, k_211, listBuilderToList_213(vs_212));
          return;
        }
        mappedForEach_49(multis_209, fn_210);
      }
      this.#storeValue_184(new JsonObject(mappedToMap_214(m_191)));
    }
    return return_188;
  }
  /** @param {string} key_216 */
  objectKey(key_216) {
    this.#storeValue_184(new JsonString(key_216));
    return;
  }
  startArray() {
    listBuilderAdd_137(this.#stack_179, []);
    return;
  }
  endArray() {
    let return_219;
    fn_220: {
      return_219 = void 0;
      if (! this.#stack_179.length) {
        break fn_220;
      }
      const ls_221 = listBuilderRemoveLast_150(this.#stack_179);
      this.#storeValue_184(new JsonArray(listBuilderToList_213(ls_221)));
    }
    return return_219;
  }
  nullValue() {
    this.#storeValue_184(new JsonNull());
    return;
  }
  /** @param {boolean} x_224 */
  booleanValue(x_224) {
    this.#storeValue_184(new JsonBoolean(x_224));
    return;
  }
  /** @param {number} x_226 */
  int32Value(x_226) {
    this.#storeValue_184(new JsonInt32(x_226));
    return;
  }
  /** @param {bigint} x_228 */
  int64Value(x_228) {
    this.#storeValue_184(new JsonInt64(x_228));
    return;
  }
  /** @param {number} x_230 */
  float64Value(x_230) {
    this.#storeValue_184(new JsonFloat64(x_230));
    return;
  }
  /** @param {string} x_232 */
  numericTokenValue(x_232) {
    this.#storeValue_184(new JsonNumericToken(x_232));
    return;
  }
  /** @param {string} x_234 */
  stringValue(x_234) {
    this.#storeValue_184(new JsonString(x_234));
    return;
  }
  /** @returns {JsonSyntaxTree} */
  toJsonSyntaxTree() {
    let t_236;
    if (!(this.#stack_179.length === 1)) {
      t_236 = true;
    } else {
      t_236 = !(this.#error_180 == null);
    }
    if (t_236) {
      throw Error();
    }
    const ls_237 = listedGet_35(this.#stack_179, 0);
    if (!(ls_237.length === 1)) {
      throw Error();
    }
    return listedGet_35(ls_237, 0);
  }
  /** @returns {string | null} */
  get jsonError() {
    return this.#error_180;
  }
  /** @returns {JsonParseErrorReceiver | null} */
  get parseErrorReceiver() {
    return this;
  }
  /** @returns {JsonParseErrorReceiver} */
  get parseErrorReceiverSafe() {
    return this;
  }
  /** @param {string} error_242 */
  explainJsonError(error_242) {
    this.#error_180 = error_242;
    return;
  }
};
/**
 * @param {string} sourceText_244
 * @param {globalThis.number} i_245
 * @param {JsonProducer} out_246
 * @returns {globalThis.number}
 */
export function parseJsonValue_243(sourceText_244, i_245, out_246) {
  let return_247;
  fn_248: {
    i_245 = skipJsonSpaces_249(sourceText_244, i_245);
    if (!(sourceText_244.length > i_245)) {
      expectedTokenError_250(sourceText_244, i_245, out_246, "JSON value");
      return_247 = -1;
      break fn_248;
    }
    const subject_251 = stringGet_252(sourceText_244, i_245);
    switch (subject_251) {
      case 123:
        {
        return parseJsonObject_253(sourceText_244, i_245, out_246);
      }
      break;
      case 91:
        {
        return parseJsonArray_254(sourceText_244, i_245, out_246);
      }
      break;
      case 34:
        {
        return parseJsonString_255(sourceText_244, i_245, out_246);
      }
      break;
      default:
        {
        let t_256;
        if (subject_251 === 116) {
          t_256 = true;
        } else {
          t_256 = subject_251 === 102;
        }
        if (t_256) {
          return parseJsonBoolean_257(sourceText_244, i_245, out_246);
        } else if (subject_251 === 110) {
          return parseJsonNull_258(sourceText_244, i_245, out_246);
        } else {
          return parseJsonNumber_259(sourceText_244, i_245, out_246);
        }
      }
    }
  }
  return return_247;
};
/** @template T_260 */
export class JsonAdapter extends type__2() {
  /**
   * @param {T_260} x_262
   * @param {JsonProducer} p_263
   */
  encodeToJson(x_262, p_263) {
    null;
  }
  /**
   * @param {JsonSyntaxTree} t_265
   * @param {InterchangeContext} ic_266
   * @returns {T_260}
   */
  decodeFromJson(t_265, ic_266) {
    null;
  }
};
export class BooleanJsonAdapter extends type__2(JsonAdapter) {
  /**
   * @param {boolean} x_268
   * @param {JsonProducer} p_269
   */
  encodeToJson(x_268, p_269) {
    p_269.booleanValue(x_268);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_271
   * @param {InterchangeContext} ic_272
   * @returns {boolean}
   */
  decodeFromJson(t_271, ic_272) {
    const t_273 = requireInstanceOf__199(t_271, JsonBoolean);
    return t_273.content;
  }
  constructor() {
    super ();
    return;
  }
};
export class Float64JsonAdapter extends type__2(JsonAdapter) {
  /**
   * @param {number} x_275
   * @param {JsonProducer} p_276
   */
  encodeToJson(x_275, p_276) {
    p_276.float64Value(x_275);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_278
   * @param {InterchangeContext} ic_279
   * @returns {number}
   */
  decodeFromJson(t_278, ic_279) {
    const t_280 = requireInstanceOf__199(t_278, JsonNumeric);
    return t_280.asFloat64();
  }
  constructor() {
    super ();
    return;
  }
};
export class Int32JsonAdapter extends type__2(JsonAdapter) {
  /**
   * @param {number} x_282
   * @param {JsonProducer} p_283
   */
  encodeToJson(x_282, p_283) {
    p_283.int32Value(x_282);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_285
   * @param {InterchangeContext} ic_286
   * @returns {number}
   */
  decodeFromJson(t_285, ic_286) {
    const t_287 = requireInstanceOf__199(t_285, JsonNumeric);
    return t_287.asInt32();
  }
  constructor() {
    super ();
    return;
  }
};
export class Int64JsonAdapter extends type__2(JsonAdapter) {
  /**
   * @param {bigint} x_289
   * @param {JsonProducer} p_290
   */
  encodeToJson(x_289, p_290) {
    p_290.int64Value(x_289);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_292
   * @param {InterchangeContext} ic_293
   * @returns {bigint}
   */
  decodeFromJson(t_292, ic_293) {
    const t_294 = requireInstanceOf__199(t_292, JsonNumeric);
    return t_294.asInt64();
  }
  constructor() {
    super ();
    return;
  }
};
export class StringJsonAdapter extends type__2(JsonAdapter) {
  /**
   * @param {string} x_296
   * @param {JsonProducer} p_297
   */
  encodeToJson(x_296, p_297) {
    p_297.stringValue(x_296);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_299
   * @param {InterchangeContext} ic_300
   * @returns {string}
   */
  decodeFromJson(t_299, ic_300) {
    const t_301 = requireInstanceOf__199(t_299, JsonString);
    return t_301.content;
  }
  constructor() {
    super ();
    return;
  }
};
/** @template T_302 */
export class ListJsonAdapter extends type__2(JsonAdapter) {
  /** @type {JsonAdapter<T_302>} */
  #adapterForT_303;
  /**
   * @param {Array<T_302>} x_305
   * @param {JsonProducer} p_306
   */
  encodeToJson(x_305, p_306) {
    p_306.startArray();
    const this_307 = x_305;
    const n_308 = this_307.length;
    let i_309 = 0;
    while (i_309 < n_308) {
      const el_310 = listedGet_35(this_307, i_309);
      i_309 = i_309 + 1 | 0;
      const el_311 = el_310;
      this.#adapterForT_303.encodeToJson(el_311, p_306);
    }
    p_306.endArray();
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_313
   * @param {InterchangeContext} ic_314
   * @returns {Array<T_302>}
   */
  decodeFromJson(t_313, ic_314) {
    const b_315 = [];
    const t_316 = requireInstanceOf__199(t_313, JsonArray);
    const elements_317 = t_316.elements;
    const n_318 = elements_317.length;
    let i_319 = 0;
    while (i_319 < n_318) {
      const el_320 = listedGet_35(elements_317, i_319);
      i_319 = i_319 + 1 | 0;
      const t_321 = this.#adapterForT_303.decodeFromJson(el_320, ic_314);
      listBuilderAdd_137(b_315, t_321);
    }
    return listBuilderToList_213(b_315);
  }
  /** @param {JsonAdapter<T_302>} adapterForT_322 */
  constructor(adapterForT_322) {
    super ();
    this.#adapterForT_303 = adapterForT_322;
    return;
  }
};
/** @template T_323 */
export class OrNullJsonAdapter extends type__2(JsonAdapter) {
  /** @type {JsonAdapter<T_323>} */
  #adapterForT_324;
  /**
   * @param {T_323 | null} x_326
   * @param {JsonProducer} p_327
   */
  encodeToJson(x_326, p_327) {
    if (x_326 == null) {
      p_327.nullValue();
    } else {
      const x_328 = x_326;
      this.#adapterForT_324.encodeToJson(x_328, p_327);
    }
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_330
   * @param {InterchangeContext} ic_331
   * @returns {T_323 | null}
   */
  decodeFromJson(t_330, ic_331) {
    if (t_330 instanceof JsonNull) {
      return null;
    } else {
      return this.#adapterForT_324.decodeFromJson(t_330, ic_331);
    }
  }
  /** @param {JsonAdapter<T_323>} adapterForT_332 */
  constructor(adapterForT_332) {
    super ();
    this.#adapterForT_324 = adapterForT_332;
    return;
  }
};
/** @type {Array<string>} */
export const hexDigits_333 = Object.freeze(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]);
/**
 * @param {number} cp_335
 * @param {globalThis.Array<string>} buffer_336
 */
export function encodeHex4_334(cp_335, buffer_336) {
  const b0_337 = (cp_335 / 4096 | 0) & 15;
  const b1_338 = (cp_335 / 256 | 0) & 15;
  const b2_339 = (cp_335 / 16 | 0) & 15;
  const b3_340 = cp_335 & 15;
  void (buffer_336[0] += listedGet_35(hexDigits_333, b0_337));
  void (buffer_336[0] += listedGet_35(hexDigits_333, b1_338));
  void (buffer_336[0] += listedGet_35(hexDigits_333, b2_339));
  void (buffer_336[0] += listedGet_35(hexDigits_333, b3_340));
  return;
};
/**
 * @param {string} x_341
 * @param {globalThis.Array<string>} buffer_342
 */
export function encodeJsonString_154(x_341, buffer_342) {
  void (buffer_342[0] += '"');
  let i_343 = 0;
  let emitted_344 = i_343;
  while (x_341.length > i_343) {
    const cp_345 = stringGet_252(x_341, i_343);
    let replacement_346;
    switch (cp_345) {
      case 8:
        {
        replacement_346 = "\\b";
      }
      break;
      case 9:
        {
        replacement_346 = "\\t";
      }
      break;
      case 10:
        {
        replacement_346 = "\\n";
      }
      break;
      case 12:
        {
        replacement_346 = "\\f";
      }
      break;
      case 13:
        {
        replacement_346 = "\\r";
      }
      break;
      case 34:
        {
        replacement_346 = '\\"';
      }
      break;
      case 92:
        {
        replacement_346 = "\\\\";
      }
      break;
      default:
        {
        let t_347;
        if (cp_345 < 32) {
          t_347 = true;
        } else if (55296 <= cp_345) {
          t_347 = cp_345 <= 57343;
        } else {
          t_347 = false;
        }
        if (t_347) {
          replacement_346 = "\\u";
        } else {
          replacement_346 = "";
        }
      }
    }
    const nextI_348 = stringNext_349(x_341, i_343);
    if (!(replacement_346 === "")) {
      void (buffer_342[0] += x_341.substring(emitted_344, i_343));
      void (buffer_342[0] += replacement_346);
      if (replacement_346 === "\\u") {
        encodeHex4_334(cp_345, buffer_342);
      }
      emitted_344 = nextI_348;
    }
    i_343 = nextI_348;
  }
  void (buffer_342[0] += x_341.substring(emitted_344, i_343));
  void (buffer_342[0] += '"');
  return;
};
/**
 * @param {JsonProducer} out_351
 * @param {string} explanation_352
 */
export function storeJsonError_350(out_351, explanation_352) {
  const subject_353 = out_351.parseErrorReceiver;
  if (!(subject_353 == null)) {
    subject_353.explainJsonError(explanation_352);
  }
  return;
};
/**
 * @param {string} sourceText_354
 * @param {globalThis.number} i_355
 * @param {JsonProducer} out_356
 * @param {string} shortExplanation_357
 */
export function expectedTokenError_250(sourceText_354, i_355, out_356, shortExplanation_357) {
  let gotten_358;
  if (sourceText_354.length > i_355) {
    gotten_358 = "`" + sourceText_354.substring(i_355, sourceText_354.length) + "`";
  } else {
    gotten_358 = "end-of-file";
  }
  storeJsonError_350(out_356, "Expected " + shortExplanation_357 + ", but got " + gotten_358);
  return;
};
/**
 * @param {string} sourceText_359
 * @param {globalThis.number} i_360
 * @returns {globalThis.number}
 */
export function skipJsonSpaces_249(sourceText_359, i_360) {
  while (sourceText_359.length > i_360) {
    const subject_361 = stringGet_252(sourceText_359, i_360);
    let t_362;
    switch (subject_361) {
      case 9:
        {
        t_362 = true;
      }
      break;
      case 10:
        {
        t_362 = true;
      }
      break;
      case 13:
        {
        t_362 = true;
      }
      break;
      default:
        {
        t_362 = subject_361 === 32;
      }
    }
    if (! t_362) {
      break;
    }
    i_360 = stringNext_349(sourceText_359, i_360);
  }
  return i_360;
};
/**
 * @param {string} sourceText_364
 * @param {globalThis.number} start_365
 * @param {globalThis.number} limit_366
 * @returns {number}
 */
export function decodeHexUnsigned_363(sourceText_364, start_365, limit_366) {
  let return_367;
  fn_368: {
    let n_369 = 0;
    let i_370 = start_365;
    while (i_370 - limit_366 < 0) {
      const cp_371 = stringGet_252(sourceText_364, i_370);
      let digit_372;
      let t_373;
      if (48 <= cp_371) {
        t_373 = cp_371 <= 57;
      } else {
        t_373 = false;
      }
      if (t_373) {
        digit_372 = cp_371 - 48 | 0;
      } else {
        let t_374;
        if (65 <= cp_371) {
          t_374 = cp_371 <= 70;
        } else {
          t_374 = false;
        }
        if (t_374) {
          digit_372 = (cp_371 - 65 | 0) + 10 | 0;
        } else {
          let t_375;
          if (97 <= cp_371) {
            t_375 = cp_371 <= 102;
          } else {
            t_375 = false;
          }
          if (t_375) {
            digit_372 = (cp_371 - 97 | 0) + 10 | 0;
          } else {
            return_367 = -1;
            break fn_368;
          }
        }
      }
      n_369 = imul__376(n_369, 16) + digit_372 | 0;
      i_370 = stringNext_349(sourceText_364, i_370);
    }
    return n_369;
  }
  return return_367;
};
/**
 * @param {string} sourceText_378
 * @param {globalThis.number} i_379
 * @param {globalThis.Array<string>} sb_380
 * @param {JsonProducer} errOut_381
 * @returns {globalThis.number}
 */
export function parseJsonStringTo_377(sourceText_378, i_379, sb_380, errOut_381) {
  let return_382;
  fn_383: {
    let t_384;
    if (!(sourceText_378.length > i_379)) {
      t_384 = true;
    } else {
      t_384 = !(stringGet_252(sourceText_378, i_379) === 34);
    }
    if (t_384) {
      expectedTokenError_250(sourceText_378, i_379, errOut_381, '"');
      return_382 = -1;
      break fn_383;
    }
    i_379 = stringNext_349(sourceText_378, i_379);
    let leadSurrogate_385 = -1;
    let consumed_386 = i_379;
    while (sourceText_378.length > i_379) {
      let t_387;
      const cp_388 = stringGet_252(sourceText_378, i_379);
      if (cp_388 === 34) {
        break;
      }
      let iNext_389 = stringNext_349(sourceText_378, i_379);
      const end_390 = sourceText_378.length;
      let needToFlush_391 = false;
      if (!(cp_388 === 92)) {
        t_387 = cp_388;
      } else {
        needToFlush_391 = true;
        if (!(sourceText_378.length > iNext_389)) {
          expectedTokenError_250(sourceText_378, iNext_389, errOut_381, "escape sequence");
          return_382 = -1;
          break fn_383;
        }
        const esc0_392 = stringGet_252(sourceText_378, iNext_389);
        iNext_389 = stringNext_349(sourceText_378, iNext_389);
        let t_393;
        switch (esc0_392) {
          case 34:
            {
            t_393 = true;
          }
          break;
          case 92:
            {
            t_393 = true;
          }
          break;
          default:
            {
            t_393 = esc0_392 === 47;
          }
        }
        if (t_393) {
          t_387 = esc0_392;
        } else {
          switch (esc0_392) {
            case 98:
              {
              t_387 = 8;
            }
            break;
            case 102:
              {
              t_387 = 12;
            }
            break;
            case 110:
              {
              t_387 = 10;
            }
            break;
            case 114:
              {
              t_387 = 13;
            }
            break;
            case 116:
              {
              t_387 = 9;
            }
            break;
            case 117:
              {
              let hex_394;
              if (stringHasAtLeast_395(sourceText_378, iNext_389, end_390, 4)) {
                const startHex_396 = iNext_389;
                iNext_389 = stringNext_349(sourceText_378, iNext_389);
                iNext_389 = stringNext_349(sourceText_378, iNext_389);
                iNext_389 = stringNext_349(sourceText_378, iNext_389);
                iNext_389 = stringNext_349(sourceText_378, iNext_389);
                hex_394 = decodeHexUnsigned_363(sourceText_378, startHex_396, iNext_389);
              } else {
                hex_394 = -1;
              }
              if (hex_394 < 0) {
                expectedTokenError_250(sourceText_378, iNext_389, errOut_381, "four hex digits");
                return_382 = -1;
                break fn_383;
              }
              t_387 = hex_394;
            }
            break;
            default:
              {
              expectedTokenError_250(sourceText_378, iNext_389, errOut_381, "escape sequence");
              return_382 = -1;
              break fn_383;
            }
          }
        }
      }
      let decodedCp_397 = t_387;
      if (leadSurrogate_385 >= 0) {
        needToFlush_391 = true;
        const lead_398 = leadSurrogate_385;
        let t_399;
        if (56320 <= decodedCp_397) {
          t_399 = decodedCp_397 <= 57343;
        } else {
          t_399 = false;
        }
        if (t_399) {
          leadSurrogate_385 = -1;
          decodedCp_397 = 65536 +(imul__376(lead_398 - 55296 | 0, 1024) |(decodedCp_397 - 56320 | 0)) | 0;
        }
      } else {
        let t_400;
        if (55296 <= decodedCp_397) {
          t_400 = decodedCp_397 <= 56319;
        } else {
          t_400 = false;
        }
        if (t_400) {
          needToFlush_391 = true;
        }
      }
      if (needToFlush_391) {
        void (sb_380[0] += sourceText_378.substring(consumed_386, i_379));
        if (leadSurrogate_385 >= 0) {
          try {
            stringBuilderAppendCodePoint_401(sb_380, leadSurrogate_385);
          } catch {
            throw Error();
          }
        }
        let t_402;
        if (55296 <= decodedCp_397) {
          t_402 = decodedCp_397 <= 56319;
        } else {
          t_402 = false;
        }
        if (t_402) {
          leadSurrogate_385 = decodedCp_397;
        } else {
          leadSurrogate_385 = -1;
          try {
            stringBuilderAppendCodePoint_401(sb_380, decodedCp_397);
          } catch {
            throw Error();
          }
        }
        consumed_386 = iNext_389;
      }
      i_379 = iNext_389;
    }
    let t_403;
    if (!(sourceText_378.length > i_379)) {
      t_403 = true;
    } else {
      t_403 = !(stringGet_252(sourceText_378, i_379) === 34);
    }
    if (t_403) {
      expectedTokenError_250(sourceText_378, i_379, errOut_381, '"');
      return -1;
    } else {
      if (leadSurrogate_385 >= 0) {
        try {
          stringBuilderAppendCodePoint_401(sb_380, leadSurrogate_385);
        } catch {
          throw Error();
        }
      } else {
        void (sb_380[0] += sourceText_378.substring(consumed_386, i_379));
      }
      i_379 = stringNext_349(sourceText_378, i_379);
      return i_379;
    }
  }
  return return_382;
};
/**
 * @param {string} sourceText_404
 * @param {globalThis.number} i_405
 * @param {JsonProducer} out_406
 * @returns {globalThis.number}
 */
export function parseJsonObject_253(sourceText_404, i_405, out_406) {
  let return_407;
  fn_408: {
    try {
      let t_409;
      if (!(sourceText_404.length > i_405)) {
        t_409 = true;
      } else {
        t_409 = !(stringGet_252(sourceText_404, i_405) === 123);
      }
      if (t_409) {
        expectedTokenError_250(sourceText_404, i_405, out_406, "'{'");
        return_407 = -1;
        break fn_408;
      }
      out_406.startObject();
      i_405 = skipJsonSpaces_249(sourceText_404, stringNext_349(sourceText_404, i_405));
      let t_410;
      if (sourceText_404.length > i_405) {
        t_410 = !(stringGet_252(sourceText_404, i_405) === 125);
      } else {
        t_410 = false;
      }
      if (t_410) {
        while (true) {
          let t_411;
          const keyBuffer_412 = [""];
          const afterKey_413 = parseJsonStringTo_377(sourceText_404, i_405, keyBuffer_412, out_406);
          if (!(afterKey_413 >= 0)) {
            return_407 = -1;
            break fn_408;
          }
          out_406.objectKey(keyBuffer_412[0]);
          try {
            t_411 = requireStringIndex_414(afterKey_413);
          } catch {
            t_411 = panic_200();
          }
          i_405 = skipJsonSpaces_249(sourceText_404, t_411);
          let t_415;
          if (sourceText_404.length > i_405) {
            t_415 = stringGet_252(sourceText_404, i_405) === 58;
          } else {
            t_415 = false;
          }
          if (t_415) {
            i_405 = stringNext_349(sourceText_404, i_405);
            const afterPropertyValue_416 = parseJsonValue_243(sourceText_404, i_405, out_406);
            if (!(afterPropertyValue_416 >= 0)) {
              return_407 = -1;
              break fn_408;
            }
            const t_417 = requireStringIndex_414(afterPropertyValue_416);
            i_405 = t_417;
          } else {
            expectedTokenError_250(sourceText_404, i_405, out_406, "':'");
            return_407 = -1;
            break fn_408;
          }
          i_405 = skipJsonSpaces_249(sourceText_404, i_405);
          let t_418;
          if (sourceText_404.length > i_405) {
            t_418 = stringGet_252(sourceText_404, i_405) === 44;
          } else {
            t_418 = false;
          }
          if (t_418) {
            i_405 = skipJsonSpaces_249(sourceText_404, stringNext_349(sourceText_404, i_405));
          } else {
            break;
          }
        }
      }
      let t_419;
      if (sourceText_404.length > i_405) {
        t_419 = stringGet_252(sourceText_404, i_405) === 125;
      } else {
        t_419 = false;
      }
      if (t_419) {
        out_406.endObject();
        return stringNext_349(sourceText_404, i_405);
      } else {
        expectedTokenError_250(sourceText_404, i_405, out_406, "'}'");
        return -1;
      }
    } catch {
      return panic_200();
    }
  }
  return return_407;
};
/**
 * @param {string} sourceText_420
 * @param {globalThis.number} i_421
 * @param {JsonProducer} out_422
 * @returns {globalThis.number}
 */
export function parseJsonArray_254(sourceText_420, i_421, out_422) {
  let return_423;
  fn_424: {
    try {
      let t_425;
      if (!(sourceText_420.length > i_421)) {
        t_425 = true;
      } else {
        t_425 = !(stringGet_252(sourceText_420, i_421) === 91);
      }
      if (t_425) {
        expectedTokenError_250(sourceText_420, i_421, out_422, "'['");
        return_423 = -1;
        break fn_424;
      }
      out_422.startArray();
      i_421 = skipJsonSpaces_249(sourceText_420, stringNext_349(sourceText_420, i_421));
      let t_426;
      if (sourceText_420.length > i_421) {
        t_426 = !(stringGet_252(sourceText_420, i_421) === 93);
      } else {
        t_426 = false;
      }
      if (t_426) {
        while (true) {
          const afterElementValue_427 = parseJsonValue_243(sourceText_420, i_421, out_422);
          if (!(afterElementValue_427 >= 0)) {
            return_423 = -1;
            break fn_424;
          }
          const t_428 = requireStringIndex_414(afterElementValue_427);
          i_421 = t_428;
          i_421 = skipJsonSpaces_249(sourceText_420, i_421);
          let t_429;
          if (sourceText_420.length > i_421) {
            t_429 = stringGet_252(sourceText_420, i_421) === 44;
          } else {
            t_429 = false;
          }
          if (t_429) {
            i_421 = skipJsonSpaces_249(sourceText_420, stringNext_349(sourceText_420, i_421));
          } else {
            break;
          }
        }
      }
      let t_430;
      if (sourceText_420.length > i_421) {
        t_430 = stringGet_252(sourceText_420, i_421) === 93;
      } else {
        t_430 = false;
      }
      if (t_430) {
        out_422.endArray();
        return stringNext_349(sourceText_420, i_421);
      } else {
        expectedTokenError_250(sourceText_420, i_421, out_422, "']'");
        return -1;
      }
    } catch {
      return panic_200();
    }
  }
  return return_423;
};
/**
 * @param {string} sourceText_431
 * @param {globalThis.number} i_432
 * @param {JsonProducer} out_433
 * @returns {globalThis.number}
 */
export function parseJsonString_255(sourceText_431, i_432, out_433) {
  const sb_434 = [""];
  const after_435 = parseJsonStringTo_377(sourceText_431, i_432, sb_434, out_433);
  if (after_435 >= 0) {
    out_433.stringValue(sb_434[0]);
  }
  return after_435;
};
/**
 * @param {string} string_437
 * @param {globalThis.number} inString_438
 * @param {string} substring_439
 * @returns {globalThis.number}
 */
export function afterSubstring_436(string_437, inString_438, substring_439) {
  let return_440;
  fn_441: {
    let i_442 = inString_438;
    let j_443 = 0;
    while (substring_439.length > j_443) {
      if (!(string_437.length > i_442)) {
        return_440 = -1;
        break fn_441;
      }
      if (!(stringGet_252(string_437, i_442) === stringGet_252(substring_439, j_443))) {
        return_440 = -1;
        break fn_441;
      }
      i_442 = stringNext_349(string_437, i_442);
      j_443 = stringNext_349(substring_439, j_443);
    }
    return i_442;
  }
  return return_440;
};
/**
 * @param {string} sourceText_444
 * @param {globalThis.number} i_445
 * @param {JsonProducer} out_446
 * @returns {globalThis.number}
 */
export function parseJsonBoolean_257(sourceText_444, i_445, out_446) {
  let return_447;
  fn_448: {
    let ch0_449;
    if (sourceText_444.length > i_445) {
      ch0_449 = stringGet_252(sourceText_444, i_445);
    } else {
      ch0_449 = 0;
    }
    const end_450 = sourceText_444.length;
    let keyword_451;
    let n_452;
    switch (ch0_449) {
      case 102:
        {
        keyword_451 = "false";
        n_452 = 5;
      }
      break;
      case 116:
        {
        keyword_451 = "true";
        n_452 = 4;
      }
      break;
      default:
        {
        keyword_451 = null;
        n_452 = 0;
      }
    }
    if (!(keyword_451 == null)) {
      const keyword_453 = keyword_451;
      if (stringHasAtLeast_395(sourceText_444, i_445, end_450, n_452)) {
        const after_454 = afterSubstring_436(sourceText_444, i_445, keyword_453);
        if (after_454 >= 0) {
          return_447 = requireStringIndex_414(after_454);
          out_446.booleanValue(n_452 === 4);
          break fn_448;
        }
      }
    }
    expectedTokenError_250(sourceText_444, i_445, out_446, "`false` or `true`");
    return -1;
  }
  return return_447;
};
/**
 * @param {string} sourceText_455
 * @param {globalThis.number} i_456
 * @param {JsonProducer} out_457
 * @returns {globalThis.number}
 */
export function parseJsonNull_258(sourceText_455, i_456, out_457) {
  let return_458;
  fn_459: {
    const after_460 = afterSubstring_436(sourceText_455, i_456, "null");
    if (after_460 >= 0) {
      return_458 = requireStringIndex_414(after_460);
      out_457.nullValue();
      break fn_459;
    }
    expectedTokenError_250(sourceText_455, i_456, out_457, "`null`");
    return -1;
  }
  return return_458;
};
/**
 * @param {string} sourceText_461
 * @param {globalThis.number} i_462
 * @param {JsonProducer} out_463
 * @returns {globalThis.number}
 */
export function parseJsonNumber_259(sourceText_461, i_462, out_463) {
  let return_464;
  fn_465: {
    let isNegative_466 = false;
    const startOfNumber_467 = i_462;
    let t_468;
    if (sourceText_461.length > i_462) {
      t_468 = stringGet_252(sourceText_461, i_462) === 45;
    } else {
      t_468 = false;
    }
    if (t_468) {
      isNegative_466 = true;
      i_462 = stringNext_349(sourceText_461, i_462);
    }
    let digit0_469;
    if (sourceText_461.length > i_462) {
      digit0_469 = stringGet_252(sourceText_461, i_462);
    } else {
      digit0_469 = -1;
    }
    let t_470;
    if (digit0_469 < 48) {
      t_470 = true;
    } else {
      t_470 = 57 < digit0_469;
    }
    if (t_470) {
      let error_471;
      let t_472;
      if (! isNegative_466) {
        t_472 = !(digit0_469 === 46);
      } else {
        t_472 = false;
      }
      if (t_472) {
        error_471 = "JSON value";
      } else {
        error_471 = "digit";
      }
      expectedTokenError_250(sourceText_461, i_462, out_463, error_471);
      return_464 = -1;
      break fn_465;
    }
    i_462 = stringNext_349(sourceText_461, i_462);
    let nDigits_473 = 1;
    let tentativeFloat64_474 = digit0_469 - 48 | 0;
    let tentativeInt64_475 = BigInt(digit0_469 - 48 | 0);
    let overflowInt64_476 = false;
    if (!(48 === digit0_469)) {
      while (sourceText_461.length > i_462) {
        const possibleDigit_477 = stringGet_252(sourceText_461, i_462);
        let t_478;
        if (48 <= possibleDigit_477) {
          t_478 = possibleDigit_477 <= 57;
        } else {
          t_478 = false;
        }
        if (t_478) {
          i_462 = stringNext_349(sourceText_461, i_462);
          nDigits_473 = nDigits_473 + 1 | 0;
          const nextDigit_479 = possibleDigit_477 - 48 | 0;
          tentativeFloat64_474 = tentativeFloat64_474 * 10.0 + nextDigit_479;
          const oldInt64_480 = tentativeInt64_475;
          tentativeInt64_475 = clampInt64__481(clampInt64__481(tentativeInt64_475 * BigInt("10")) + BigInt(nextDigit_479));
          if (tentativeInt64_475 < oldInt64_480) {
            let t_482;
            if (clampInt64__481(BigInt("-9223372036854775808") - oldInt64_480) === clampInt64__481(- BigInt(nextDigit_479))) {
              if (isNegative_466) {
                t_482 = oldInt64_480 > BigInt("0");
              } else {
                t_482 = false;
              }
            } else {
              t_482 = false;
            }
            if (! t_482) {
              overflowInt64_476 = true;
            }
          }
        } else {
          break;
        }
      }
    }
    let nDigitsAfterPoint_483 = 0;
    let t_484;
    if (sourceText_461.length > i_462) {
      t_484 = 46 === stringGet_252(sourceText_461, i_462);
    } else {
      t_484 = false;
    }
    if (t_484) {
      i_462 = stringNext_349(sourceText_461, i_462);
      const afterPoint_485 = i_462;
      while (sourceText_461.length > i_462) {
        const possibleDigit_486 = stringGet_252(sourceText_461, i_462);
        let t_487;
        if (48 <= possibleDigit_486) {
          t_487 = possibleDigit_486 <= 57;
        } else {
          t_487 = false;
        }
        if (t_487) {
          i_462 = stringNext_349(sourceText_461, i_462);
          nDigits_473 = nDigits_473 + 1 | 0;
          nDigitsAfterPoint_483 = nDigitsAfterPoint_483 + 1 | 0;
          tentativeFloat64_474 = tentativeFloat64_474 * 10.0 +(possibleDigit_486 - 48 | 0);
        } else {
          break;
        }
      }
      if (i_462 === afterPoint_485) {
        expectedTokenError_250(sourceText_461, i_462, out_463, "digit");
        return_464 = -1;
        break fn_465;
      }
    }
    let nExponentDigits_488 = 0;
    let t_489;
    if (sourceText_461.length > i_462) {
      t_489 = 101 ===(stringGet_252(sourceText_461, i_462) | 32);
    } else {
      t_489 = false;
    }
    if (t_489) {
      i_462 = stringNext_349(sourceText_461, i_462);
      if (!(sourceText_461.length > i_462)) {
        expectedTokenError_250(sourceText_461, i_462, out_463, "sign or digit");
        return_464 = -1;
        break fn_465;
      }
      const afterE_490 = stringGet_252(sourceText_461, i_462);
      let t_491;
      if (afterE_490 === 43) {
        t_491 = true;
      } else {
        t_491 = afterE_490 === 45;
      }
      if (t_491) {
        i_462 = stringNext_349(sourceText_461, i_462);
      }
      while (sourceText_461.length > i_462) {
        const possibleDigit_492 = stringGet_252(sourceText_461, i_462);
        let t_493;
        if (48 <= possibleDigit_492) {
          t_493 = possibleDigit_492 <= 57;
        } else {
          t_493 = false;
        }
        if (t_493) {
          i_462 = stringNext_349(sourceText_461, i_462);
          nExponentDigits_488 = nExponentDigits_488 + 1 | 0;
        } else {
          break;
        }
      }
      if (nExponentDigits_488 === 0) {
        expectedTokenError_250(sourceText_461, i_462, out_463, "exponent digit");
        return_464 = -1;
        break fn_465;
      }
    }
    const afterExponent_494 = i_462;
    let t_495;
    if (nExponentDigits_488 === 0) {
      if (nDigitsAfterPoint_483 === 0) {
        t_495 = ! overflowInt64_476;
      } else {
        t_495 = false;
      }
    } else {
      t_495 = false;
    }
    if (t_495) {
      let value_496;
      if (isNegative_466) {
        value_496 = clampInt64__481(- tentativeInt64_475);
      } else {
        value_496 = tentativeInt64_475;
      }
      let t_497;
      if (BigInt("-2147483648") <= value_496) {
        t_497 = value_496 <= BigInt("2147483647");
      } else {
        t_497 = false;
      }
      if (t_497) {
        out_463.int32Value(int64ToInt32Unsafe_498(value_496));
      } else {
        out_463.int64Value(value_496);
      }
      return_464 = i_462;
      break fn_465;
    }
    const numericTokenString_499 = sourceText_461.substring(startOfNumber_467, i_462);
    let doubleValue_500 = NaN;
    let t_501;
    if (!(nExponentDigits_488 === 0)) {
      t_501 = true;
    } else {
      t_501 = !(nDigitsAfterPoint_483 === 0);
    }
    if (t_501) {
      try {
        doubleValue_500 = stringToFloat64_122(numericTokenString_499);
      } catch {
      }
    }
    let t_502;
    if (! eqFloat64_503(doubleValue_500, -Infinity)) {
      if (! eqFloat64_503(doubleValue_500, Infinity)) {
        t_502 = ! eqFloat64_503(doubleValue_500, NaN);
      } else {
        t_502 = false;
      }
    } else {
      t_502 = false;
    }
    if (t_502) {
      out_463.float64Value(doubleValue_500);
    } else {
      out_463.numericTokenValue(numericTokenString_499);
    }
    return i_462;
  }
  return return_464;
};
/**
 * @param {string} sourceText_504
 * @param {JsonProducer} out_505
 */
export function parseJsonToProducer(sourceText_504, out_505) {
  let i_506 = 0;
  const afterValue_507 = parseJsonValue_243(sourceText_504, i_506, out_505);
  if (afterValue_507 >= 0) {
    const t_508 = requireStringIndex_414(afterValue_507);
    i_506 = skipJsonSpaces_249(sourceText_504, t_508);
    let t_509;
    if (sourceText_504.length > i_506) {
      t_509 = !(out_505.parseErrorReceiver == null);
    } else {
      t_509 = false;
    }
    if (t_509) {
      storeJsonError_350(out_505, "Extraneous JSON `" + sourceText_504.substring(i_506, sourceText_504.length) + "`");
    }
  }
  return;
};
/**
 * @param {string} sourceText_510
 * @returns {JsonSyntaxTree}
 */
export function parseJson(sourceText_510) {
  const p_511 = new JsonSyntaxTreeProducer();
  parseJsonToProducer(sourceText_510, p_511);
  return p_511.toJsonSyntaxTree();
};
/** @returns {JsonAdapter<boolean>} */
export function booleanJsonAdapter() {
  return new BooleanJsonAdapter();
};
/** @returns {JsonAdapter<number>} */
export function float64JsonAdapter() {
  return new Float64JsonAdapter();
};
/** @returns {JsonAdapter<number>} */
export function int32JsonAdapter() {
  return new Int32JsonAdapter();
};
/** @returns {JsonAdapter<bigint>} */
export function int64JsonAdapter() {
  return new Int64JsonAdapter();
};
/** @returns {JsonAdapter<string>} */
export function stringJsonAdapter() {
  return new StringJsonAdapter();
};
/**
 * @template {unknown} T_513
 * @param {JsonAdapter<T_513>} adapterForT_512
 * @returns {JsonAdapter<Array<T_513>>}
 */
export function listJsonAdapter(adapterForT_512) {
  return new ListJsonAdapter(adapterForT_512);
};
