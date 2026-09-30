import {
  type as type__6, listBuilderAdd as listBuilderAdd_89, listBuilderToList as listBuilderToList_90, mapBuilderConstructor as mapBuilderConstructor_94, cmpInt32 as cmpInt32_2046, listedGet as listedGet_99, mappedGetOr as mappedGetOr_102, mapBuilderSet as mapBuilderSet_103, mappedToMap as mappedToMap_104, stringCountBetween as stringCountBetween_124, stringToInt32 as stringToInt32_132, stringToInt64 as stringToInt64_139, stringToFloat64 as stringToFloat64_146, mappedToList as mappedToList_160, cmpFloat64 as cmpFloat64_203, float64ToString as float64ToString_204, eqFloat64 as eqFloat64_213, requireStringIndex as requireStringIndex_241, stringNext as stringNext_253, stringGet as stringGet_257, listedJoin as listedJoin_298, listBuilderAddAll as listBuilderAddAll_609, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_694, mapConstructor as mapConstructor_727, panic as panic_796, pairConstructor as pairConstructor_801
} from "@temperlang/core";
export class ChangesetError extends type__6() {
  /** @type {string} */
  #field_0;
  /** @type {string} */
  #message_1;
  /**
   * @param {{
   *   field: string, message: string
   * }}
   * props
   * @returns {ChangesetError}
   */
  static["new"](props) {
    return new ChangesetError(props.field, props.message);
  }
  /**
   * @param {string} field_2
   * @param {string} message_3
   */
  constructor(field_2, message_3) {
    super ();
    this.#field_0 = field_2;
    this.#message_1 = message_3;
    return;
  }
  /** @returns {string} */
  get field() {
    return this.#field_0;
  }
  /** @returns {string} */
  get message() {
    return this.#message_1;
  }
};
export class NumberValidationOpts extends type__6() {
  /** @type {number | null} */
  #greaterThan_7;
  /** @type {number | null} */
  #lessThan_8;
  /** @type {number | null} */
  #greaterThanOrEqual_9;
  /** @type {number | null} */
  #lessThanOrEqual_10;
  /** @type {number | null} */
  #equalTo_11;
  /**
   * @param {{
   *   greaterThan: number | null, lessThan: number | null, greaterThanOrEqual: number | null, lessThanOrEqual: number | null, equalTo: number | null
   * }}
   * props
   * @returns {NumberValidationOpts}
   */
  static["new"](props) {
    return new NumberValidationOpts(props.greaterThan, props.lessThan, props.greaterThanOrEqual, props.lessThanOrEqual, props.equalTo);
  }
  /**
   * @param {number | null} greaterThan_12
   * @param {number | null} lessThan_13
   * @param {number | null} greaterThanOrEqual_14
   * @param {number | null} lessThanOrEqual_15
   * @param {number | null} equalTo_16
   */
  constructor(greaterThan_12, lessThan_13, greaterThanOrEqual_14, lessThanOrEqual_15, equalTo_16) {
    super ();
    this.#greaterThan_7 = greaterThan_12;
    this.#lessThan_8 = lessThan_13;
    this.#greaterThanOrEqual_9 = greaterThanOrEqual_14;
    this.#lessThanOrEqual_10 = lessThanOrEqual_15;
    this.#equalTo_11 = equalTo_16;
    return;
  }
  /** @returns {number | null} */
  get greaterThan() {
    return this.#greaterThan_7;
  }
  /** @returns {number | null} */
  get lessThan() {
    return this.#lessThan_8;
  }
  /** @returns {number | null} */
  get greaterThanOrEqual() {
    return this.#greaterThanOrEqual_9;
  }
  /** @returns {number | null} */
  get lessThanOrEqual() {
    return this.#lessThanOrEqual_10;
  }
  /** @returns {number | null} */
  get equalTo() {
    return this.#equalTo_11;
  }
};
export class Changeset extends type__6() {
  /** @returns {TableDef} */
  get tableDef() {
    null;
  }
  /** @returns {Map<string, string>} */
  get changes() {
    null;
  }
  /** @returns {Array<ChangesetError>} */
  get errors() {
    null;
  }
  /** @returns {boolean} */
  get isValid() {
    null;
  }
  /**
   * @param {Array<SafeIdentifier>} allowedFields_27
   * @returns {Changeset}
   */
  cast(allowedFields_27) {
    null;
  }
  /**
   * @param {Array<SafeIdentifier>} fields_29
   * @returns {Changeset}
   */
  validateRequired(fields_29) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_31
   * @param {number} min_32
   * @param {number} max_33
   * @returns {Changeset}
   */
  validateLength(field_31, min_32, max_33) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_35
   * @returns {Changeset}
   */
  validateInt(field_35) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_37
   * @returns {Changeset}
   */
  validateInt64(field_37) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_39
   * @returns {Changeset}
   */
  validateFloat(field_39) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_41
   * @returns {Changeset}
   */
  validateBool(field_41) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_43
   * @param {string} value_44
   * @returns {Changeset}
   */
  putChange(field_43, value_44) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_46
   * @returns {string}
   */
  getChange(field_46) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_48
   * @returns {Changeset}
   */
  deleteChange(field_48) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_50
   * @param {Array<string>} allowed_51
   * @returns {Changeset}
   */
  validateInclusion(field_50, allowed_51) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_53
   * @param {Array<string>} disallowed_54
   * @returns {Changeset}
   */
  validateExclusion(field_53, disallowed_54) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_56
   * @param {NumberValidationOpts} opts_57
   * @returns {Changeset}
   */
  validateNumber(field_56, opts_57) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_59
   * @returns {Changeset}
   */
  validateAcceptance(field_59) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_61
   * @param {SafeIdentifier} confirmationField_62
   * @returns {Changeset}
   */
  validateConfirmation(field_61, confirmationField_62) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_64
   * @param {string} substring_65
   * @returns {Changeset}
   */
  validateContains(field_64, substring_65) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_67
   * @param {string} prefix_68
   * @returns {Changeset}
   */
  validateStartsWith(field_67, prefix_68) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_70
   * @param {string} suffix_71
   * @returns {Changeset}
   */
  validateEndsWith(field_70, suffix_71) {
    null;
  }
  /** @returns {SqlFragment} */
  toInsertSql() {
    null;
  }
  /**
   * @param {number} id_74
   * @returns {SqlFragment}
   */
  toUpdateSql(id_74) {
    null;
  }
};
export class ChangesetImpl extends type__6(Changeset) {
  /** @type {TableDef} */
  #_tableDef_75;
  /** @type {Map<string, string>} */
  #_params_76;
  /** @type {Map<string, string>} */
  #_changes_77;
  /** @type {Array<ChangesetError>} */
  #_errors_78;
  /** @type {boolean} */
  #_isValid_79;
  /** @returns {TableDef} */
  get tableDef() {
    return this.#_tableDef_75;
  }
  /** @returns {Map<string, string>} */
  get changes() {
    return this.#_changes_77;
  }
  /** @returns {Array<ChangesetError>} */
  get errors() {
    return this.#_errors_78;
  }
  /** @returns {boolean} */
  get isValid() {
    return this.#_isValid_79;
  }
  /**
   * @param {string} field_86
   * @param {string} message_87
   * @returns {Changeset}
   */
  #addError_85(field_86, message_87) {
    const eb_88 = this.#_errors_78.slice();
    listBuilderAdd_89(eb_88, new ChangesetError(field_86, message_87));
    return new ChangesetImpl(this.#_tableDef_75, this.#_params_76, this.#_changes_77, listBuilderToList_90(eb_88), false);
  }
  /**
   * @param {Array<SafeIdentifier>} allowedFields_92
   * @returns {Changeset}
   */
  cast(allowedFields_92) {
    const mb_93 = mapBuilderConstructor_94();
    const this_95 = allowedFields_92;
    const n_96 = this_95.length;
    let i_97 = 0;
    while (i_97 < n_96) {
      const el_98 = listedGet_99(this_95, i_97);
      i_97 = i_97 + 1 | 0;
      const f_100 = el_98;
      const val_101 = mappedGetOr_102(this.#_params_76, f_100.sqlValue, "");
      if (! ! val_101) {
        mapBuilderSet_103(mb_93, f_100.sqlValue, val_101);
      }
    }
    return new ChangesetImpl(this.#_tableDef_75, this.#_params_76, mappedToMap_104(mb_93), this.#_errors_78, this.#_isValid_79);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_106
   * @returns {Changeset}
   */
  validateRequired(fields_106) {
    let return_107;
    fn_108: {
      if (! this.#_isValid_79) {
        return_107 = this;
        break fn_108;
      }
      const eb_109 = this.#_errors_78.slice();
      let valid_110 = true;
      const this_111 = fields_106;
      const n_112 = this_111.length;
      let i_113 = 0;
      while (i_113 < n_112) {
        const el_114 = listedGet_99(this_111, i_113);
        i_113 = i_113 + 1 | 0;
        const f_115 = el_114;
        if (! this.#_changes_77.has(f_115.sqlValue)) {
          listBuilderAdd_89(eb_109, new ChangesetError(f_115.sqlValue, "is required"));
          valid_110 = false;
        }
      }
      return new ChangesetImpl(this.#_tableDef_75, this.#_params_76, this.#_changes_77, listBuilderToList_90(eb_109), valid_110);
    }
    return return_107;
  }
  /**
   * @param {SafeIdentifier} field_117
   * @param {number} min_118
   * @param {number} max_119
   * @returns {Changeset}
   */
  validateLength(field_117, min_118, max_119) {
    let return_120;
    fn_121: {
      if (! this.#_isValid_79) {
        return_120 = this;
        break fn_121;
      }
      const val_122 = mappedGetOr_102(this.#_changes_77, field_117.sqlValue, "");
      const len_123 = stringCountBetween_124(val_122, 0, val_122.length);
      let t_125;
      if (len_123 < min_118) {
        t_125 = true;
      } else {
        t_125 = len_123 > max_119;
      }
      if (t_125) {
        return_120 = this.#addError_85(field_117.sqlValue, "must be between " + min_118.toString() + " and " + max_119.toString() + " characters");
        break fn_121;
      }
      return this;
    }
    return return_120;
  }
  /**
   * @param {SafeIdentifier} field_127
   * @returns {Changeset}
   */
  validateInt(field_127) {
    let return_128;
    fn_129: {
      if (! this.#_isValid_79) {
        return_128 = this;
        break fn_129;
      }
      const val_130 = mappedGetOr_102(this.#_changes_77, field_127.sqlValue, "");
      if (! val_130) {
        return_128 = this;
        break fn_129;
      }
      let parseOk_131;
      try {
        stringToInt32_132(val_130);
        parseOk_131 = true;
      } catch {
        parseOk_131 = false;
      }
      if (! parseOk_131) {
        return_128 = this.#addError_85(field_127.sqlValue, "must be an integer");
        break fn_129;
      }
      return this;
    }
    return return_128;
  }
  /**
   * @param {SafeIdentifier} field_134
   * @returns {Changeset}
   */
  validateInt64(field_134) {
    let return_135;
    fn_136: {
      if (! this.#_isValid_79) {
        return_135 = this;
        break fn_136;
      }
      const val_137 = mappedGetOr_102(this.#_changes_77, field_134.sqlValue, "");
      if (! val_137) {
        return_135 = this;
        break fn_136;
      }
      let parseOk_138;
      try {
        stringToInt64_139(val_137);
        parseOk_138 = true;
      } catch {
        parseOk_138 = false;
      }
      if (! parseOk_138) {
        return_135 = this.#addError_85(field_134.sqlValue, "must be a 64-bit integer");
        break fn_136;
      }
      return this;
    }
    return return_135;
  }
  /**
   * @param {SafeIdentifier} field_141
   * @returns {Changeset}
   */
  validateFloat(field_141) {
    let return_142;
    fn_143: {
      if (! this.#_isValid_79) {
        return_142 = this;
        break fn_143;
      }
      const val_144 = mappedGetOr_102(this.#_changes_77, field_141.sqlValue, "");
      if (! val_144) {
        return_142 = this;
        break fn_143;
      }
      let parseOk_145;
      try {
        stringToFloat64_146(val_144);
        parseOk_145 = true;
      } catch {
        parseOk_145 = false;
      }
      if (! parseOk_145) {
        return_142 = this.#addError_85(field_141.sqlValue, "must be a number");
        break fn_143;
      }
      return this;
    }
    return return_142;
  }
  /**
   * @param {SafeIdentifier} field_148
   * @returns {Changeset}
   */
  validateBool(field_148) {
    let return_149;
    fn_150: {
      if (! this.#_isValid_79) {
        return_149 = this;
        break fn_150;
      }
      const val_151 = mappedGetOr_102(this.#_changes_77, field_148.sqlValue, "");
      if (! val_151) {
        return_149 = this;
        break fn_150;
      }
      let isTrue_152;
      if (val_151 === "true") {
        isTrue_152 = true;
      } else if (val_151 === "1") {
        isTrue_152 = true;
      } else if (val_151 === "yes") {
        isTrue_152 = true;
      } else {
        isTrue_152 = val_151 === "on";
      }
      let isFalse_153;
      if (val_151 === "false") {
        isFalse_153 = true;
      } else if (val_151 === "0") {
        isFalse_153 = true;
      } else if (val_151 === "no") {
        isFalse_153 = true;
      } else {
        isFalse_153 = val_151 === "off";
      }
      let t_154;
      if (! isTrue_152) {
        t_154 = ! isFalse_153;
      } else {
        t_154 = false;
      }
      if (t_154) {
        return_149 = this.#addError_85(field_148.sqlValue, "must be a boolean (true/false/1/0/yes/no/on/off)");
        break fn_150;
      }
      return this;
    }
    return return_149;
  }
  /**
   * @param {SafeIdentifier} field_156
   * @param {string} value_157
   * @returns {Changeset}
   */
  putChange(field_156, value_157) {
    const mb_158 = mapBuilderConstructor_94();
    const pairs_159 = mappedToList_160(this.#_changes_77);
    let i_161 = 0;
    while (i_161 < pairs_159.length) {
      mapBuilderSet_103(mb_158, listedGet_99(pairs_159, i_161).key, listedGet_99(pairs_159, i_161).value);
      i_161 = i_161 + 1 | 0;
    }
    mapBuilderSet_103(mb_158, field_156.sqlValue, value_157);
    return new ChangesetImpl(this.#_tableDef_75, this.#_params_76, mappedToMap_104(mb_158), this.#_errors_78, this.#_isValid_79);
  }
  /**
   * @param {SafeIdentifier} field_163
   * @returns {string}
   */
  getChange(field_163) {
    if (! this.#_changes_77.has(field_163.sqlValue)) {
      throw Error();
    }
    return mappedGetOr_102(this.#_changes_77, field_163.sqlValue, "");
  }
  /**
   * @param {SafeIdentifier} field_165
   * @returns {Changeset}
   */
  deleteChange(field_165) {
    const mb_166 = mapBuilderConstructor_94();
    const pairs_167 = mappedToList_160(this.#_changes_77);
    let i_168 = 0;
    while (i_168 < pairs_167.length) {
      if (!(listedGet_99(pairs_167, i_168).key === field_165.sqlValue)) {
        mapBuilderSet_103(mb_166, listedGet_99(pairs_167, i_168).key, listedGet_99(pairs_167, i_168).value);
      }
      i_168 = i_168 + 1 | 0;
    }
    return new ChangesetImpl(this.#_tableDef_75, this.#_params_76, mappedToMap_104(mb_166), this.#_errors_78, this.#_isValid_79);
  }
  /**
   * @param {SafeIdentifier} field_170
   * @param {Array<string>} allowed_171
   * @returns {Changeset}
   */
  validateInclusion(field_170, allowed_171) {
    let return_172;
    fn_173: {
      if (! this.#_isValid_79) {
        return_172 = this;
        break fn_173;
      }
      if (! this.#_changes_77.has(field_170.sqlValue)) {
        return_172 = this;
        break fn_173;
      }
      const val_174 = mappedGetOr_102(this.#_changes_77, field_170.sqlValue, "");
      let found_175 = false;
      const this_176 = allowed_171;
      const n_177 = this_176.length;
      let i_178 = 0;
      while (i_178 < n_177) {
        const el_179 = listedGet_99(this_176, i_178);
        i_178 = i_178 + 1 | 0;
        const a_180 = el_179;
        if (a_180 === val_174) {
          found_175 = true;
        }
      }
      if (! found_175) {
        return_172 = this.#addError_85(field_170.sqlValue, "is not included in the list");
        break fn_173;
      }
      return this;
    }
    return return_172;
  }
  /**
   * @param {SafeIdentifier} field_182
   * @param {Array<string>} disallowed_183
   * @returns {Changeset}
   */
  validateExclusion(field_182, disallowed_183) {
    let return_184;
    fn_185: {
      if (! this.#_isValid_79) {
        return_184 = this;
        break fn_185;
      }
      if (! this.#_changes_77.has(field_182.sqlValue)) {
        return_184 = this;
        break fn_185;
      }
      const val_186 = mappedGetOr_102(this.#_changes_77, field_182.sqlValue, "");
      let found_187 = false;
      const this_188 = disallowed_183;
      const n_189 = this_188.length;
      let i_190 = 0;
      while (i_190 < n_189) {
        const el_191 = listedGet_99(this_188, i_190);
        i_190 = i_190 + 1 | 0;
        const d_192 = el_191;
        if (d_192 === val_186) {
          found_187 = true;
        }
      }
      if (found_187) {
        return_184 = this.#addError_85(field_182.sqlValue, "is reserved");
        break fn_185;
      }
      return this;
    }
    return return_184;
  }
  /**
   * @param {SafeIdentifier} field_194
   * @param {NumberValidationOpts} opts_195
   * @returns {Changeset}
   */
  validateNumber(field_194, opts_195) {
    let return_196;
    fn_197: {
      if (! this.#_isValid_79) {
        return_196 = this;
        break fn_197;
      }
      if (! this.#_changes_77.has(field_194.sqlValue)) {
        return_196 = this;
        break fn_197;
      }
      const val_198 = mappedGetOr_102(this.#_changes_77, field_194.sqlValue, "");
      let parseOk_199;
      try {
        stringToFloat64_146(val_198);
        parseOk_199 = true;
      } catch {
        parseOk_199 = false;
      }
      if (! parseOk_199) {
        return_196 = this.#addError_85(field_194.sqlValue, "must be a number");
        break fn_197;
      }
      let num_200;
      try {
        num_200 = stringToFloat64_146(val_198);
      } catch {
        num_200 = 0.0;
      }
      const gt_201 = opts_195.greaterThan;
      if (!(gt_201 == null)) {
        const gt_202 = gt_201;
        if (!(cmpFloat64_203(num_200, gt_202) > 0)) {
          return_196 = this.#addError_85(field_194.sqlValue, "must be greater than " + float64ToString_204(gt_202));
          break fn_197;
        }
      }
      const lt_205 = opts_195.lessThan;
      if (!(lt_205 == null)) {
        const lt_206 = lt_205;
        if (!(cmpFloat64_203(num_200, lt_206) < 0)) {
          return_196 = this.#addError_85(field_194.sqlValue, "must be less than " + float64ToString_204(lt_206));
          break fn_197;
        }
      }
      const gte_207 = opts_195.greaterThanOrEqual;
      if (!(gte_207 == null)) {
        const gte_208 = gte_207;
        if (!(cmpFloat64_203(num_200, gte_208) >= 0)) {
          return_196 = this.#addError_85(field_194.sqlValue, "must be greater than or equal to " + float64ToString_204(gte_208));
          break fn_197;
        }
      }
      const lte_209 = opts_195.lessThanOrEqual;
      if (!(lte_209 == null)) {
        const lte_210 = lte_209;
        if (!(cmpFloat64_203(num_200, lte_210) <= 0)) {
          return_196 = this.#addError_85(field_194.sqlValue, "must be less than or equal to " + float64ToString_204(lte_210));
          break fn_197;
        }
      }
      const eq_211 = opts_195.equalTo;
      if (!(eq_211 == null)) {
        const eq_212 = eq_211;
        if (! eqFloat64_213(num_200, eq_212)) {
          return_196 = this.#addError_85(field_194.sqlValue, "must be equal to " + float64ToString_204(eq_212));
          break fn_197;
        }
      }
      return this;
    }
    return return_196;
  }
  /**
   * @param {SafeIdentifier} field_215
   * @returns {Changeset}
   */
  validateAcceptance(field_215) {
    let return_216;
    fn_217: {
      if (! this.#_isValid_79) {
        return_216 = this;
        break fn_217;
      }
      if (! this.#_changes_77.has(field_215.sqlValue)) {
        return_216 = this;
        break fn_217;
      }
      const val_218 = mappedGetOr_102(this.#_changes_77, field_215.sqlValue, "");
      let accepted_219;
      if (val_218 === "true") {
        accepted_219 = true;
      } else if (val_218 === "1") {
        accepted_219 = true;
      } else if (val_218 === "yes") {
        accepted_219 = true;
      } else {
        accepted_219 = val_218 === "on";
      }
      if (! accepted_219) {
        return_216 = this.#addError_85(field_215.sqlValue, "must be accepted");
        break fn_217;
      }
      return this;
    }
    return return_216;
  }
  /**
   * @param {SafeIdentifier} field_221
   * @param {SafeIdentifier} confirmationField_222
   * @returns {Changeset}
   */
  validateConfirmation(field_221, confirmationField_222) {
    let return_223;
    fn_224: {
      if (! this.#_isValid_79) {
        return_223 = this;
        break fn_224;
      }
      if (! this.#_changes_77.has(field_221.sqlValue)) {
        return_223 = this;
        break fn_224;
      }
      const val_225 = mappedGetOr_102(this.#_changes_77, field_221.sqlValue, "");
      const conf_226 = mappedGetOr_102(this.#_changes_77, confirmationField_222.sqlValue, "");
      if (!(val_225 === conf_226)) {
        return_223 = this.#addError_85(confirmationField_222.sqlValue, "does not match");
        break fn_224;
      }
      return this;
    }
    return return_223;
  }
  /**
   * @param {SafeIdentifier} field_228
   * @param {string} substring_229
   * @returns {Changeset}
   */
  validateContains(field_228, substring_229) {
    let return_230;
    fn_231: {
      if (! this.#_isValid_79) {
        return_230 = this;
        break fn_231;
      }
      if (! this.#_changes_77.has(field_228.sqlValue)) {
        return_230 = this;
        break fn_231;
      }
      const val_232 = mappedGetOr_102(this.#_changes_77, field_228.sqlValue, "");
      if (!(val_232.indexOf(substring_229) >= 0)) {
        return_230 = this.#addError_85(field_228.sqlValue, "must contain the given substring");
        break fn_231;
      }
      return this;
    }
    return return_230;
  }
  /**
   * @param {SafeIdentifier} field_234
   * @param {string} prefix_235
   * @returns {Changeset}
   */
  validateStartsWith(field_234, prefix_235) {
    let return_236;
    fn_237: {
      if (! this.#_isValid_79) {
        return_236 = this;
        break fn_237;
      }
      if (! this.#_changes_77.has(field_234.sqlValue)) {
        return_236 = this;
        break fn_237;
      }
      const val_238 = mappedGetOr_102(this.#_changes_77, field_234.sqlValue, "");
      const idx_239 = val_238.indexOf(prefix_235);
      let starts_240;
      if (idx_239 >= 0) {
        starts_240 = stringCountBetween_124(val_238, 0, requireStringIndex_241(idx_239)) === 0;
      } else {
        starts_240 = false;
      }
      if (! starts_240) {
        return_236 = this.#addError_85(field_234.sqlValue, "must start with the given prefix");
        break fn_237;
      }
      return this;
    }
    return return_236;
  }
  /**
   * @param {SafeIdentifier} field_243
   * @param {string} suffix_244
   * @returns {Changeset}
   */
  validateEndsWith(field_243, suffix_244) {
    let return_245;
    fn_246: {
      if (! this.#_isValid_79) {
        return_245 = this;
        break fn_246;
      }
      if (! this.#_changes_77.has(field_243.sqlValue)) {
        return_245 = this;
        break fn_246;
      }
      const val_247 = mappedGetOr_102(this.#_changes_77, field_243.sqlValue, "");
      const valLen_248 = stringCountBetween_124(val_247, 0, val_247.length);
      const suffixLen_249 = stringCountBetween_124(suffix_244, 0, suffix_244.length);
      if (valLen_248 < suffixLen_249) {
        return_245 = this.#addError_85(field_243.sqlValue, "must end with the given suffix");
        break fn_246;
      }
      const skipCount_250 = valLen_248 - suffixLen_249 | 0;
      let strIdx_251 = 0;
      let i_252 = 0;
      while (i_252 < skipCount_250) {
        strIdx_251 = stringNext_253(val_247, strIdx_251);
        i_252 = i_252 + 1 | 0;
      }
      let sufIdx_254 = 0;
      let matches_255 = true;
      while (true) {
        let t_256;
        if (matches_255) {
          t_256 = suffix_244.length > sufIdx_254;
        } else {
          t_256 = false;
        }
        if (! t_256) {
          break;
        }
        if (!(val_247.length > strIdx_251)) {
          matches_255 = false;
        } else if (!(stringGet_257(val_247, strIdx_251) === stringGet_257(suffix_244, sufIdx_254))) {
          matches_255 = false;
        } else {
          strIdx_251 = stringNext_253(val_247, strIdx_251);
          sufIdx_254 = stringNext_253(suffix_244, sufIdx_254);
        }
      }
      if (! matches_255) {
        return_245 = this.#addError_85(field_243.sqlValue, "must end with the given suffix");
        break fn_246;
      }
      return this;
    }
    return return_245;
  }
  /**
   * @param {string} val_260
   * @returns {SqlBoolean}
   */
  #parseBoolSqlPart_259(val_260) {
    let return_261;
    fn_262: {
      let t_263;
      if (val_260 === "true") {
        t_263 = true;
      } else if (val_260 === "1") {
        t_263 = true;
      } else if (val_260 === "yes") {
        t_263 = true;
      } else {
        t_263 = val_260 === "on";
      }
      if (t_263) {
        return_261 = new SqlBoolean(true);
        break fn_262;
      }
      let t_264;
      if (val_260 === "false") {
        t_264 = true;
      } else if (val_260 === "0") {
        t_264 = true;
      } else if (val_260 === "no") {
        t_264 = true;
      } else {
        t_264 = val_260 === "off";
      }
      if (t_264) {
        return_261 = new SqlBoolean(false);
        break fn_262;
      }
      throw Error();
    }
    return return_261;
  }
  /**
   * @param {FieldDef} fieldDef_267
   * @param {string} val_268
   * @returns {SqlPart}
   */
  #valueToSqlPart_266(fieldDef_267, val_268) {
    let return_269;
    fn_270: {
      const ft_271 = fieldDef_267.fieldType;
      if (ft_271 instanceof StringField) {
        return_269 = new SqlString(val_268);
        break fn_270;
      }
      if (ft_271 instanceof IntField) {
        const t_272 = stringToInt32_132(val_268);
        return_269 = new SqlInt32(t_272);
        break fn_270;
      }
      if (ft_271 instanceof Int64Field) {
        const t_273 = stringToInt64_139(val_268);
        return_269 = new SqlInt64(t_273);
        break fn_270;
      }
      if (ft_271 instanceof FloatField) {
        const t_274 = stringToFloat64_146(val_268);
        return_269 = new SqlFloat64(t_274);
        break fn_270;
      }
      if (ft_271 instanceof BoolField) {
        return_269 = this.#parseBoolSqlPart_259(val_268);
        break fn_270;
      }
      if (ft_271 instanceof DateField) {
        const t_275 = new (globalThis.Date)(globalThis.Date.parse(val_268));
        return_269 = new SqlDate(t_275);
        break fn_270;
      }
      throw Error();
    }
    return return_269;
  }
  /** @returns {SqlFragment} */
  toInsertSql() {
    if (! this.#_isValid_79) {
      throw Error();
    }
    let i_277 = 0;
    while (i_277 < this.#_tableDef_75.fields.length) {
      continue_278: {
        const f_279 = listedGet_99(this.#_tableDef_75.fields, i_277);
        if (f_279.virtual) {
          break continue_278;
        }
        const dv_280 = f_279.defaultValue;
        let t_281;
        if (! f_279.nullable) {
          if (! this.#_changes_77.has(f_279.name.sqlValue)) {
            t_281 = dv_280 == null;
          } else {
            t_281 = false;
          }
        } else {
          t_281 = false;
        }
        if (t_281) {
          throw Error();
        }
      }
      i_277 = i_277 + 1 | 0;
    }
    const colNames_282 = [];
    const valParts_283 = [];
    const pairs_284 = mappedToList_160(this.#_changes_77);
    let i_285 = 0;
    while (i_285 < pairs_284.length) {
      continue_286: {
        const pair_287 = listedGet_99(pairs_284, i_285);
        const fd_288 = this.#_tableDef_75.field(pair_287.key);
        if (fd_288.virtual) {
          break continue_286;
        }
        listBuilderAdd_89(colNames_282, fd_288.name.sqlValue);
        const t_289 = this.#valueToSqlPart_266(fd_288, pair_287.value);
        listBuilderAdd_89(valParts_283, t_289);
      }
      i_285 = i_285 + 1 | 0;
    }
    let i_290 = 0;
    while (i_290 < this.#_tableDef_75.fields.length) {
      continue_291: {
        const f_292 = listedGet_99(this.#_tableDef_75.fields, i_290);
        if (f_292.virtual) {
          break continue_291;
        }
        const dv_293 = f_292.defaultValue;
        if (!(dv_293 == null)) {
          const dv_294 = dv_293;
          if (! this.#_changes_77.has(f_292.name.sqlValue)) {
            listBuilderAdd_89(colNames_282, f_292.name.sqlValue);
            listBuilderAdd_89(valParts_283, dv_294);
          }
        }
      }
      i_290 = i_290 + 1 | 0;
    }
    if (valParts_283.length === 0) {
      throw Error();
    }
    const b_295 = new SqlBuilder();
    b_295.appendSafe("INSERT INTO ");
    b_295.appendSafe(this.#_tableDef_75.tableName.sqlValue);
    b_295.appendSafe(" (");
    function fn_296(c_297) {
      return c_297;
    }
    b_295.appendSafe(listedJoin_298(listBuilderToList_90(colNames_282), ", ", fn_296));
    b_295.appendSafe(") VALUES (");
    b_295.appendPart(listedGet_99(valParts_283, 0));
    let j_299 = 1;
    while (j_299 < valParts_283.length) {
      b_295.appendSafe(", ");
      b_295.appendPart(listedGet_99(valParts_283, j_299));
      j_299 = j_299 + 1 | 0;
    }
    b_295.appendSafe(")");
    return b_295.accumulated;
  }
  /**
   * @param {number} id_301
   * @returns {SqlFragment}
   */
  toUpdateSql(id_301) {
    if (! this.#_isValid_79) {
      throw Error();
    }
    const pairs_302 = mappedToList_160(this.#_changes_77);
    if (pairs_302.length === 0) {
      throw Error();
    }
    const b_303 = new SqlBuilder();
    b_303.appendSafe("UPDATE ");
    b_303.appendSafe(this.#_tableDef_75.tableName.sqlValue);
    b_303.appendSafe(" SET ");
    let setCount_304 = 0;
    let i_305 = 0;
    while (i_305 < pairs_302.length) {
      continue_306: {
        const pair_307 = listedGet_99(pairs_302, i_305);
        const fd_308 = this.#_tableDef_75.field(pair_307.key);
        if (fd_308.virtual) {
          break continue_306;
        }
        if (setCount_304 > 0) {
          b_303.appendSafe(", ");
        }
        b_303.appendSafe(fd_308.name.sqlValue);
        b_303.appendSafe(" = ");
        const t_309 = this.#valueToSqlPart_266(fd_308, pair_307.value);
        b_303.appendPart(t_309);
        setCount_304 = setCount_304 + 1 | 0;
      }
      i_305 = i_305 + 1 | 0;
    }
    if (setCount_304 === 0) {
      throw Error();
    }
    b_303.appendSafe(" WHERE ");
    b_303.appendSafe(this.#_tableDef_75.pkName());
    b_303.appendSafe(" = ");
    b_303.appendInt32(id_301);
    return b_303.accumulated;
  }
  /**
   * @param {{
   *   _tableDef: TableDef, _params: Map<string, string>, _changes: Map<string, string>, _errors: Array<ChangesetError>, _isValid: boolean
   * }}
   * props
   * @returns {ChangesetImpl}
   */
  static["new"](props) {
    return new ChangesetImpl(props._tableDef, props._params, props._changes, props._errors, props._isValid);
  }
  /**
   * @param {TableDef} _tableDef_310
   * @param {Map<string, string>} _params_311
   * @param {Map<string, string>} _changes_312
   * @param {Array<ChangesetError>} _errors_313
   * @param {boolean} _isValid_314
   */
  constructor(_tableDef_310, _params_311, _changes_312, _errors_313, _isValid_314) {
    super ();
    this.#_tableDef_75 = _tableDef_310;
    this.#_params_76 = _params_311;
    this.#_changes_77 = _changes_312;
    this.#_errors_78 = _errors_313;
    this.#_isValid_79 = _isValid_314;
    return;
  }
};
export class JoinType extends type__6() {
  /** @returns {string} */
  keyword() {
    null;
  }
};
export class InnerJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "INNER JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class LeftJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "LEFT JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class RightJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "RIGHT JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class FullJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "FULL OUTER JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class CrossJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "CROSS JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class JoinClause extends type__6() {
  /** @type {JoinType} */
  #joinType_321;
  /** @type {SafeIdentifier} */
  #table_322;
  /** @type {SqlFragment | null} */
  #onCondition_323;
  /**
   * @param {{
   *   joinType: JoinType, table: SafeIdentifier, onCondition: SqlFragment | null
   * }}
   * props
   * @returns {JoinClause}
   */
  static["new"](props) {
    return new JoinClause(props.joinType, props.table, props.onCondition);
  }
  /**
   * @param {JoinType} joinType_324
   * @param {SafeIdentifier} table_325
   * @param {SqlFragment | null} onCondition_326
   */
  constructor(joinType_324, table_325, onCondition_326) {
    super ();
    this.#joinType_321 = joinType_324;
    this.#table_322 = table_325;
    this.#onCondition_323 = onCondition_326;
    return;
  }
  /** @returns {JoinType} */
  get joinType() {
    return this.#joinType_321;
  }
  /** @returns {SafeIdentifier} */
  get table() {
    return this.#table_322;
  }
  /** @returns {SqlFragment | null} */
  get onCondition() {
    return this.#onCondition_323;
  }
};
export class NullsPosition extends type__6() {
  /** @returns {string} */
  keyword() {
    null;
  }
};
export class NullsFirst extends type__6(NullsPosition) {
  /** @returns {string} */
  keyword() {
    return " NULLS FIRST";
  }
  constructor() {
    super ();
    return;
  }
};
export class NullsLast extends type__6(NullsPosition) {
  /** @returns {string} */
  keyword() {
    return " NULLS LAST";
  }
  constructor() {
    super ();
    return;
  }
};
export class OrderClause extends type__6() {
  /** @type {SafeIdentifier} */
  #field_333;
  /** @type {boolean} */
  #ascending_334;
  /** @type {NullsPosition | null} */
  #nullsPos_335;
  /**
   * @param {{
   *   field: SafeIdentifier, ascending: boolean, nullsPos: NullsPosition | null
   * }}
   * props
   * @returns {OrderClause}
   */
  static["new"](props) {
    return new OrderClause(props.field, props.ascending, props.nullsPos);
  }
  /**
   * @param {SafeIdentifier} field_336
   * @param {boolean} ascending_337
   * @param {NullsPosition | null} nullsPos_338
   */
  constructor(field_336, ascending_337, nullsPos_338) {
    super ();
    this.#field_333 = field_336;
    this.#ascending_334 = ascending_337;
    this.#nullsPos_335 = nullsPos_338;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_333;
  }
  /** @returns {boolean} */
  get ascending() {
    return this.#ascending_334;
  }
  /** @returns {NullsPosition | null} */
  get nullsPos() {
    return this.#nullsPos_335;
  }
};
export class LockMode extends type__6() {
  /** @returns {string} */
  keyword() {
    null;
  }
};
export class ForUpdate extends type__6(LockMode) {
  /** @returns {string} */
  keyword() {
    return " FOR UPDATE";
  }
  constructor() {
    super ();
    return;
  }
};
export class ForShare extends type__6(LockMode) {
  /** @returns {string} */
  keyword() {
    return " FOR SHARE";
  }
  constructor() {
    super ();
    return;
  }
};
export class WhereClause extends type__6() {
  /** @returns {SqlFragment} */
  get condition() {
    null;
  }
  /** @returns {string} */
  keyword() {
    null;
  }
};
export class AndCondition extends type__6(WhereClause) {
  /** @type {SqlFragment} */
  #_condition_347;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_347;
  }
  /** @returns {string} */
  keyword() {
    return "AND";
  }
  /** @param {SqlFragment} _condition_350 */
  constructor(_condition_350) {
    super ();
    this.#_condition_347 = _condition_350;
    return;
  }
};
export class OrCondition extends type__6(WhereClause) {
  /** @type {SqlFragment} */
  #_condition_351;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_351;
  }
  /** @returns {string} */
  keyword() {
    return "OR";
  }
  /** @param {SqlFragment} _condition_354 */
  constructor(_condition_354) {
    super ();
    this.#_condition_351 = _condition_354;
    return;
  }
};
export class Query extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_355;
  /** @type {Array<WhereClause>} */
  #conditions_356;
  /** @type {Array<SafeIdentifier>} */
  #selectedFields_357;
  /** @type {Array<OrderClause>} */
  #orderClauses_358;
  /** @type {number | null} */
  #limitVal_359;
  /** @type {number | null} */
  #offsetVal_360;
  /** @type {Array<JoinClause>} */
  #joinClauses_361;
  /** @type {Array<SafeIdentifier>} */
  #groupByFields_362;
  /** @type {Array<WhereClause>} */
  #havingConditions_363;
  /** @type {boolean} */
  #isDistinct_364;
  /** @type {Array<SqlFragment>} */
  #selectExprs_365;
  /** @type {LockMode | null} */
  #lockMode_366;
  /**
   * @param {SqlFragment} condition_368
   * @returns {Query}
   */
  where(condition_368) {
    const nb_369 = this.#conditions_356.slice();
    listBuilderAdd_89(nb_369, new AndCondition(condition_368));
    return new Query(this.#tableName_355, listBuilderToList_90(nb_369), this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {SqlFragment} condition_371
   * @returns {Query}
   */
  orWhere(condition_371) {
    const nb_372 = this.#conditions_356.slice();
    listBuilderAdd_89(nb_372, new OrCondition(condition_371));
    return new Query(this.#tableName_355, listBuilderToList_90(nb_372), this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {SafeIdentifier} field_374
   * @returns {Query}
   */
  whereNull(field_374) {
    const b_375 = new SqlBuilder();
    b_375.appendSafe(field_374.sqlValue);
    b_375.appendSafe(" IS NULL");
    return this.where(b_375.accumulated);
  }
  /**
   * @param {SafeIdentifier} field_377
   * @returns {Query}
   */
  whereNotNull(field_377) {
    const b_378 = new SqlBuilder();
    b_378.appendSafe(field_377.sqlValue);
    b_378.appendSafe(" IS NOT NULL");
    return this.where(b_378.accumulated);
  }
  /**
   * @param {SafeIdentifier} field_380
   * @param {Array<SqlPart>} values_381
   * @returns {Query}
   */
  whereIn(field_380, values_381) {
    let return_382;
    fn_383: {
      if (! values_381.length) {
        const b_384 = new SqlBuilder();
        b_384.appendSafe("1 = 0");
        return_382 = this.where(b_384.accumulated);
        break fn_383;
      }
      const b_385 = new SqlBuilder();
      b_385.appendSafe(field_380.sqlValue);
      b_385.appendSafe(" IN (");
      b_385.appendPart(listedGet_99(values_381, 0));
      let i_386 = 1;
      while (i_386 < values_381.length) {
        b_385.appendSafe(", ");
        b_385.appendPart(listedGet_99(values_381, i_386));
        i_386 = i_386 + 1 | 0;
      }
      b_385.appendSafe(")");
      return this.where(b_385.accumulated);
    }
    return return_382;
  }
  /**
   * @param {SafeIdentifier} field_388
   * @param {Query} sub_389
   * @returns {Query}
   */
  whereInSubquery(field_388, sub_389) {
    const b_390 = new SqlBuilder();
    b_390.appendSafe(field_388.sqlValue);
    b_390.appendSafe(" IN (");
    b_390.appendFragment(sub_389.toSql());
    b_390.appendSafe(")");
    return this.where(b_390.accumulated);
  }
  /**
   * @param {SqlFragment} condition_392
   * @returns {Query}
   */
  whereNot(condition_392) {
    const b_393 = new SqlBuilder();
    b_393.appendSafe("NOT (");
    b_393.appendFragment(condition_392);
    b_393.appendSafe(")");
    return this.where(b_393.accumulated);
  }
  /**
   * @param {SafeIdentifier} field_395
   * @param {SqlPart} low_396
   * @param {SqlPart} high_397
   * @returns {Query}
   */
  whereBetween(field_395, low_396, high_397) {
    const b_398 = new SqlBuilder();
    b_398.appendSafe(field_395.sqlValue);
    b_398.appendSafe(" BETWEEN ");
    b_398.appendPart(low_396);
    b_398.appendSafe(" AND ");
    b_398.appendPart(high_397);
    return this.where(b_398.accumulated);
  }
  /**
   * @param {SafeIdentifier} field_400
   * @param {string} pattern_401
   * @returns {Query}
   */
  whereLike(field_400, pattern_401) {
    const b_402 = new SqlBuilder();
    b_402.appendSafe(field_400.sqlValue);
    b_402.appendSafe(" LIKE ");
    b_402.appendString(pattern_401);
    return this.where(b_402.accumulated);
  }
  /**
   * @param {SafeIdentifier} field_404
   * @param {string} pattern_405
   * @returns {Query}
   */
  whereILike(field_404, pattern_405) {
    const b_406 = new SqlBuilder();
    b_406.appendSafe(field_404.sqlValue);
    b_406.appendSafe(" ILIKE ");
    b_406.appendString(pattern_405);
    return this.where(b_406.accumulated);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_408
   * @returns {Query}
   */
  select(fields_408) {
    return new Query(this.#tableName_355, this.#conditions_356, fields_408, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {Array<SqlFragment>} exprs_410
   * @returns {Query}
   */
  selectExpr(exprs_410) {
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, exprs_410, this.#lockMode_366);
  }
  /**
   * @param {SafeIdentifier} field_412
   * @param {boolean} ascending_413
   * @returns {Query}
   */
  orderBy(field_412, ascending_413) {
    const nb_414 = this.#orderClauses_358.slice();
    listBuilderAdd_89(nb_414, new OrderClause(field_412, ascending_413, null));
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, listBuilderToList_90(nb_414), this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {SafeIdentifier} field_416
   * @param {boolean} ascending_417
   * @param {NullsPosition} nulls_418
   * @returns {Query}
   */
  orderByNulls(field_416, ascending_417, nulls_418) {
    const nb_419 = this.#orderClauses_358.slice();
    listBuilderAdd_89(nb_419, new OrderClause(field_416, ascending_417, nulls_418));
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, listBuilderToList_90(nb_419), this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {number} n_421
   * @returns {Query}
   */
  limit(n_421) {
    if (n_421 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, n_421, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {number} n_423
   * @returns {Query}
   */
  offset(n_423) {
    if (n_423 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, n_423, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {JoinType} joinType_425
   * @param {SafeIdentifier} table_426
   * @param {SqlFragment} onCondition_427
   * @returns {Query}
   */
  join(joinType_425, table_426, onCondition_427) {
    const nb_428 = this.#joinClauses_361.slice();
    listBuilderAdd_89(nb_428, new JoinClause(joinType_425, table_426, onCondition_427));
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, listBuilderToList_90(nb_428), this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {SafeIdentifier} table_430
   * @param {SqlFragment} onCondition_431
   * @returns {Query}
   */
  innerJoin(table_430, onCondition_431) {
    return this.join(new InnerJoin(), table_430, onCondition_431);
  }
  /**
   * @param {SafeIdentifier} table_433
   * @param {SqlFragment} onCondition_434
   * @returns {Query}
   */
  leftJoin(table_433, onCondition_434) {
    return this.join(new LeftJoin(), table_433, onCondition_434);
  }
  /**
   * @param {SafeIdentifier} table_436
   * @param {SqlFragment} onCondition_437
   * @returns {Query}
   */
  rightJoin(table_436, onCondition_437) {
    return this.join(new RightJoin(), table_436, onCondition_437);
  }
  /**
   * @param {SafeIdentifier} table_439
   * @param {SqlFragment} onCondition_440
   * @returns {Query}
   */
  fullJoin(table_439, onCondition_440) {
    return this.join(new FullJoin(), table_439, onCondition_440);
  }
  /**
   * @param {SafeIdentifier} table_442
   * @returns {Query}
   */
  crossJoin(table_442) {
    const nb_443 = this.#joinClauses_361.slice();
    listBuilderAdd_89(nb_443, new JoinClause(new CrossJoin(), table_442, null));
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, listBuilderToList_90(nb_443), this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {SafeIdentifier} field_445
   * @returns {Query}
   */
  groupBy(field_445) {
    const nb_446 = this.#groupByFields_362.slice();
    listBuilderAdd_89(nb_446, field_445);
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, listBuilderToList_90(nb_446), this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {SqlFragment} condition_448
   * @returns {Query}
   */
  having(condition_448) {
    const nb_449 = this.#havingConditions_363.slice();
    listBuilderAdd_89(nb_449, new AndCondition(condition_448));
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, listBuilderToList_90(nb_449), this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {SqlFragment} condition_451
   * @returns {Query}
   */
  orHaving(condition_451) {
    const nb_452 = this.#havingConditions_363.slice();
    listBuilderAdd_89(nb_452, new OrCondition(condition_451));
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, listBuilderToList_90(nb_452), this.#isDistinct_364, this.#selectExprs_365, this.#lockMode_366);
  }
  /** @returns {Query} */
  distinct() {
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, true, this.#selectExprs_365, this.#lockMode_366);
  }
  /**
   * @param {LockMode} mode_455
   * @returns {Query}
   */
  lock(mode_455) {
    return new Query(this.#tableName_355, this.#conditions_356, this.#selectedFields_357, this.#orderClauses_358, this.#limitVal_359, this.#offsetVal_360, this.#joinClauses_361, this.#groupByFields_362, this.#havingConditions_363, this.#isDistinct_364, this.#selectExprs_365, mode_455);
  }
  /** @returns {SqlFragment} */
  toSql() {
    const b_457 = new SqlBuilder();
    if (this.#isDistinct_364) {
      b_457.appendSafe("SELECT DISTINCT ");
    } else {
      b_457.appendSafe("SELECT ");
    }
    if (! ! this.#selectExprs_365.length) {
      b_457.appendFragment(listedGet_99(this.#selectExprs_365, 0));
      let i_458 = 1;
      while (i_458 < this.#selectExprs_365.length) {
        b_457.appendSafe(", ");
        b_457.appendFragment(listedGet_99(this.#selectExprs_365, i_458));
        i_458 = i_458 + 1 | 0;
      }
    } else if (! this.#selectedFields_357.length) {
      b_457.appendSafe("*");
    } else {
      function fn_459(f_460) {
        return f_460.sqlValue;
      }
      b_457.appendSafe(listedJoin_298(this.#selectedFields_357, ", ", fn_459));
    }
    b_457.appendSafe(" FROM ");
    b_457.appendSafe(this.#tableName_355.sqlValue);
    renderJoins_461(b_457, this.#joinClauses_361);
    renderWhere_462(b_457, this.#conditions_356);
    renderGroupBy_463(b_457, this.#groupByFields_362);
    renderHaving_464(b_457, this.#havingConditions_363);
    if (! ! this.#orderClauses_358.length) {
      b_457.appendSafe(" ORDER BY ");
      let first_465 = true;
      const this_466 = this.#orderClauses_358;
      const n_467 = this_466.length;
      let i_468 = 0;
      while (i_468 < n_467) {
        const el_469 = listedGet_99(this_466, i_468);
        i_468 = i_468 + 1 | 0;
        const orc_470 = el_469;
        let t_471;
        if (! first_465) {
          b_457.appendSafe(", ");
        }
        first_465 = false;
        b_457.appendSafe(orc_470.field.sqlValue);
        if (orc_470.ascending) {
          t_471 = " ASC";
        } else {
          t_471 = " DESC";
        }
        b_457.appendSafe(t_471);
        const np_472 = orc_470.nullsPos;
        if (!(np_472 == null)) {
          b_457.appendSafe(np_472.keyword());
        }
      }
    }
    const lv_473 = this.#limitVal_359;
    if (!(lv_473 == null)) {
      const lv_474 = lv_473;
      b_457.appendSafe(" LIMIT ");
      b_457.appendInt32(lv_474);
    }
    const ov_475 = this.#offsetVal_360;
    if (!(ov_475 == null)) {
      const ov_476 = ov_475;
      b_457.appendSafe(" OFFSET ");
      b_457.appendInt32(ov_476);
    }
    const lm_477 = this.#lockMode_366;
    if (!(lm_477 == null)) {
      b_457.appendSafe(lm_477.keyword());
    }
    return b_457.accumulated;
  }
  /** @returns {SqlFragment} */
  countSql() {
    const b_479 = new SqlBuilder();
    b_479.appendSafe("SELECT COUNT(*) FROM ");
    b_479.appendSafe(this.#tableName_355.sqlValue);
    renderJoins_461(b_479, this.#joinClauses_361);
    renderWhere_462(b_479, this.#conditions_356);
    renderGroupBy_463(b_479, this.#groupByFields_362);
    renderHaving_464(b_479, this.#havingConditions_363);
    return b_479.accumulated;
  }
  /**
   * @param {number} defaultLimit_481
   * @returns {SqlFragment}
   */
  safeToSql(defaultLimit_481) {
    if (defaultLimit_481 < 0) {
      throw Error();
    }
    if (!(this.#limitVal_359 == null)) {
      return this.toSql();
    } else {
      const t_482 = this.limit(defaultLimit_481);
      return t_482.toSql();
    }
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, conditions: Array<WhereClause>, selectedFields: Array<SafeIdentifier>, orderClauses: Array<OrderClause>, limitVal: number | null, offsetVal: number | null, joinClauses: Array<JoinClause>, groupByFields: Array<SafeIdentifier>, havingConditions: Array<WhereClause>, isDistinct: boolean, selectExprs: Array<SqlFragment>, lockMode: LockMode | null
   * }}
   * props
   * @returns {Query}
   */
  static["new"](props) {
    return new Query(props.tableName, props.conditions, props.selectedFields, props.orderClauses, props.limitVal, props.offsetVal, props.joinClauses, props.groupByFields, props.havingConditions, props.isDistinct, props.selectExprs, props.lockMode);
  }
  /**
   * @param {SafeIdentifier} tableName_483
   * @param {Array<WhereClause>} conditions_484
   * @param {Array<SafeIdentifier>} selectedFields_485
   * @param {Array<OrderClause>} orderClauses_486
   * @param {number | null} limitVal_487
   * @param {number | null} offsetVal_488
   * @param {Array<JoinClause>} joinClauses_489
   * @param {Array<SafeIdentifier>} groupByFields_490
   * @param {Array<WhereClause>} havingConditions_491
   * @param {boolean} isDistinct_492
   * @param {Array<SqlFragment>} selectExprs_493
   * @param {LockMode | null} lockMode_494
   */
  constructor(tableName_483, conditions_484, selectedFields_485, orderClauses_486, limitVal_487, offsetVal_488, joinClauses_489, groupByFields_490, havingConditions_491, isDistinct_492, selectExprs_493, lockMode_494) {
    super ();
    this.#tableName_355 = tableName_483;
    this.#conditions_356 = conditions_484;
    this.#selectedFields_357 = selectedFields_485;
    this.#orderClauses_358 = orderClauses_486;
    this.#limitVal_359 = limitVal_487;
    this.#offsetVal_360 = offsetVal_488;
    this.#joinClauses_361 = joinClauses_489;
    this.#groupByFields_362 = groupByFields_490;
    this.#havingConditions_363 = havingConditions_491;
    this.#isDistinct_364 = isDistinct_492;
    this.#selectExprs_365 = selectExprs_493;
    this.#lockMode_366 = lockMode_494;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_355;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_356;
  }
  /** @returns {Array<SafeIdentifier>} */
  get selectedFields() {
    return this.#selectedFields_357;
  }
  /** @returns {Array<OrderClause>} */
  get orderClauses() {
    return this.#orderClauses_358;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_359;
  }
  /** @returns {number | null} */
  get offsetVal() {
    return this.#offsetVal_360;
  }
  /** @returns {Array<JoinClause>} */
  get joinClauses() {
    return this.#joinClauses_361;
  }
  /** @returns {Array<SafeIdentifier>} */
  get groupByFields() {
    return this.#groupByFields_362;
  }
  /** @returns {Array<WhereClause>} */
  get havingConditions() {
    return this.#havingConditions_363;
  }
  /** @returns {boolean} */
  get isDistinct() {
    return this.#isDistinct_364;
  }
  /** @returns {Array<SqlFragment>} */
  get selectExprs() {
    return this.#selectExprs_365;
  }
  /** @returns {LockMode | null} */
  get lockMode() {
    return this.#lockMode_366;
  }
};
export class SetClause extends type__6() {
  /** @type {SafeIdentifier} */
  #field_507;
  /** @type {SqlPart} */
  #value_508;
  /**
   * @param {{
   *   field: SafeIdentifier, value: SqlPart
   * }}
   * props
   * @returns {SetClause}
   */
  static["new"](props) {
    return new SetClause(props.field, props.value);
  }
  /**
   * @param {SafeIdentifier} field_509
   * @param {SqlPart} value_510
   */
  constructor(field_509, value_510) {
    super ();
    this.#field_507 = field_509;
    this.#value_508 = value_510;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_507;
  }
  /** @returns {SqlPart} */
  get value() {
    return this.#value_508;
  }
};
export class UpdateQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_513;
  /** @type {Array<SetClause>} */
  #setClauses_514;
  /** @type {Array<WhereClause>} */
  #conditions_515;
  /** @type {number | null} */
  #limitVal_516;
  /**
   * @param {SafeIdentifier} field_518
   * @param {SqlPart} value_519
   * @returns {UpdateQuery}
   */
  set(field_518, value_519) {
    const nb_520 = this.#setClauses_514.slice();
    listBuilderAdd_89(nb_520, new SetClause(field_518, value_519));
    return new UpdateQuery(this.#tableName_513, listBuilderToList_90(nb_520), this.#conditions_515, this.#limitVal_516);
  }
  /**
   * @param {SqlFragment} condition_522
   * @returns {UpdateQuery}
   */
  where(condition_522) {
    const nb_523 = this.#conditions_515.slice();
    listBuilderAdd_89(nb_523, new AndCondition(condition_522));
    return new UpdateQuery(this.#tableName_513, this.#setClauses_514, listBuilderToList_90(nb_523), this.#limitVal_516);
  }
  /**
   * @param {SqlFragment} condition_525
   * @returns {UpdateQuery}
   */
  orWhere(condition_525) {
    const nb_526 = this.#conditions_515.slice();
    listBuilderAdd_89(nb_526, new OrCondition(condition_525));
    return new UpdateQuery(this.#tableName_513, this.#setClauses_514, listBuilderToList_90(nb_526), this.#limitVal_516);
  }
  /**
   * @param {number} n_528
   * @returns {UpdateQuery}
   */
  limit(n_528) {
    if (n_528 < 0) {
      throw Error();
    }
    return new UpdateQuery(this.#tableName_513, this.#setClauses_514, this.#conditions_515, n_528);
  }
  /** @returns {SqlFragment} */
  toSql() {
    if (! this.#conditions_515.length) {
      throw Error();
    }
    if (! this.#setClauses_514.length) {
      throw Error();
    }
    const b_530 = new SqlBuilder();
    b_530.appendSafe("UPDATE ");
    b_530.appendSafe(this.#tableName_513.sqlValue);
    b_530.appendSafe(" SET ");
    b_530.appendSafe(listedGet_99(this.#setClauses_514, 0).field.sqlValue);
    b_530.appendSafe(" = ");
    b_530.appendPart(listedGet_99(this.#setClauses_514, 0).value);
    let i_531 = 1;
    while (i_531 < this.#setClauses_514.length) {
      b_530.appendSafe(", ");
      b_530.appendSafe(listedGet_99(this.#setClauses_514, i_531).field.sqlValue);
      b_530.appendSafe(" = ");
      b_530.appendPart(listedGet_99(this.#setClauses_514, i_531).value);
      i_531 = i_531 + 1 | 0;
    }
    renderWhere_462(b_530, this.#conditions_515);
    const lv_532 = this.#limitVal_516;
    if (!(lv_532 == null)) {
      const lv_533 = lv_532;
      b_530.appendSafe(" LIMIT ");
      b_530.appendInt32(lv_533);
    }
    return b_530.accumulated;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, setClauses: Array<SetClause>, conditions: Array<WhereClause>, limitVal: number | null
   * }}
   * props
   * @returns {UpdateQuery}
   */
  static["new"](props) {
    return new UpdateQuery(props.tableName, props.setClauses, props.conditions, props.limitVal);
  }
  /**
   * @param {SafeIdentifier} tableName_534
   * @param {Array<SetClause>} setClauses_535
   * @param {Array<WhereClause>} conditions_536
   * @param {number | null} limitVal_537
   */
  constructor(tableName_534, setClauses_535, conditions_536, limitVal_537) {
    super ();
    this.#tableName_513 = tableName_534;
    this.#setClauses_514 = setClauses_535;
    this.#conditions_515 = conditions_536;
    this.#limitVal_516 = limitVal_537;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_513;
  }
  /** @returns {Array<SetClause>} */
  get setClauses() {
    return this.#setClauses_514;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_515;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_516;
  }
};
export class DeleteQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_542;
  /** @type {Array<WhereClause>} */
  #conditions_543;
  /** @type {number | null} */
  #limitVal_544;
  /**
   * @param {SqlFragment} condition_546
   * @returns {DeleteQuery}
   */
  where(condition_546) {
    const nb_547 = this.#conditions_543.slice();
    listBuilderAdd_89(nb_547, new AndCondition(condition_546));
    return new DeleteQuery(this.#tableName_542, listBuilderToList_90(nb_547), this.#limitVal_544);
  }
  /**
   * @param {SqlFragment} condition_549
   * @returns {DeleteQuery}
   */
  orWhere(condition_549) {
    const nb_550 = this.#conditions_543.slice();
    listBuilderAdd_89(nb_550, new OrCondition(condition_549));
    return new DeleteQuery(this.#tableName_542, listBuilderToList_90(nb_550), this.#limitVal_544);
  }
  /**
   * @param {number} n_552
   * @returns {DeleteQuery}
   */
  limit(n_552) {
    if (n_552 < 0) {
      throw Error();
    }
    return new DeleteQuery(this.#tableName_542, this.#conditions_543, n_552);
  }
  /** @returns {SqlFragment} */
  toSql() {
    if (! this.#conditions_543.length) {
      throw Error();
    }
    const b_554 = new SqlBuilder();
    b_554.appendSafe("DELETE FROM ");
    b_554.appendSafe(this.#tableName_542.sqlValue);
    renderWhere_462(b_554, this.#conditions_543);
    const lv_555 = this.#limitVal_544;
    if (!(lv_555 == null)) {
      const lv_556 = lv_555;
      b_554.appendSafe(" LIMIT ");
      b_554.appendInt32(lv_556);
    }
    return b_554.accumulated;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, conditions: Array<WhereClause>, limitVal: number | null
   * }}
   * props
   * @returns {DeleteQuery}
   */
  static["new"](props) {
    return new DeleteQuery(props.tableName, props.conditions, props.limitVal);
  }
  /**
   * @param {SafeIdentifier} tableName_557
   * @param {Array<WhereClause>} conditions_558
   * @param {number | null} limitVal_559
   */
  constructor(tableName_557, conditions_558, limitVal_559) {
    super ();
    this.#tableName_542 = tableName_557;
    this.#conditions_543 = conditions_558;
    this.#limitVal_544 = limitVal_559;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_542;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_543;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_544;
  }
};
export class SafeIdentifier extends type__6() {
  /** @returns {string} */
  get sqlValue() {
    null;
  }
};
export class ValidatedIdentifier extends type__6(SafeIdentifier) {
  /** @type {string} */
  #_value_564;
  /** @returns {string} */
  get sqlValue() {
    return this.#_value_564;
  }
  /** @param {string} _value_566 */
  constructor(_value_566) {
    super ();
    this.#_value_564 = _value_566;
    return;
  }
};
export class FieldType extends type__6() {
};
export class StringField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class IntField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class Int64Field extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class FloatField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class BoolField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class DateField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class FieldDef extends type__6() {
  /** @type {SafeIdentifier} */
  #name_567;
  /** @type {FieldType} */
  #fieldType_568;
  /** @type {boolean} */
  #nullable_569;
  /** @type {SqlPart | null} */
  #defaultValue_570;
  /** @type {boolean} */
  #virtual_571;
  /**
   * @param {{
   *   name: SafeIdentifier, fieldType: FieldType, nullable: boolean, defaultValue: SqlPart | null, virtual: boolean
   * }}
   * props
   * @returns {FieldDef}
   */
  static["new"](props) {
    return new FieldDef(props.name, props.fieldType, props.nullable, props.defaultValue, props.virtual);
  }
  /**
   * @param {SafeIdentifier} name_572
   * @param {FieldType} fieldType_573
   * @param {boolean} nullable_574
   * @param {SqlPart | null} defaultValue_575
   * @param {boolean} virtual_576
   */
  constructor(name_572, fieldType_573, nullable_574, defaultValue_575, virtual_576) {
    super ();
    this.#name_567 = name_572;
    this.#fieldType_568 = fieldType_573;
    this.#nullable_569 = nullable_574;
    this.#defaultValue_570 = defaultValue_575;
    this.#virtual_571 = virtual_576;
    return;
  }
  /** @returns {SafeIdentifier} */
  get name() {
    return this.#name_567;
  }
  /** @returns {FieldType} */
  get fieldType() {
    return this.#fieldType_568;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_569;
  }
  /** @returns {SqlPart | null} */
  get defaultValue() {
    return this.#defaultValue_570;
  }
  /** @returns {boolean} */
  get virtual() {
    return this.#virtual_571;
  }
};
export class TableDef extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_582;
  /** @type {Array<FieldDef>} */
  #fields_583;
  /** @type {SafeIdentifier | null} */
  #primaryKey_584;
  /**
   * @param {string} name_586
   * @returns {FieldDef}
   */
  field(name_586) {
    let return_587;
    fn_588: {
      const this_589 = this.#fields_583;
      const n_590 = this_589.length;
      let i_591 = 0;
      while (i_591 < n_590) {
        const el_592 = listedGet_99(this_589, i_591);
        i_591 = i_591 + 1 | 0;
        const f_593 = el_592;
        if (f_593.name.sqlValue === name_586) {
          return_587 = f_593;
          break fn_588;
        }
      }
      throw Error();
    }
    return return_587;
  }
  /** @returns {string} */
  pkName() {
    let return_595;
    fn_596: {
      const pk_597 = this.#primaryKey_584;
      if (!(pk_597 == null)) {
        return_595 = pk_597.sqlValue;
        break fn_596;
      }
      return "id";
    }
    return return_595;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, fields: Array<FieldDef>, primaryKey: SafeIdentifier | null
   * }}
   * props
   * @returns {TableDef}
   */
  static["new"](props) {
    return new TableDef(props.tableName, props.fields, props.primaryKey);
  }
  /**
   * @param {SafeIdentifier} tableName_598
   * @param {Array<FieldDef>} fields_599
   * @param {SafeIdentifier | null} primaryKey_600
   */
  constructor(tableName_598, fields_599, primaryKey_600) {
    super ();
    this.#tableName_582 = tableName_598;
    this.#fields_583 = fields_599;
    this.#primaryKey_584 = primaryKey_600;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_582;
  }
  /** @returns {Array<FieldDef>} */
  get fields() {
    return this.#fields_583;
  }
  /** @returns {SafeIdentifier | null} */
  get primaryKey() {
    return this.#primaryKey_584;
  }
};
export class SqlBuilder extends type__6() {
  /** @type {Array<SqlPart>} */
  #buffer_604;
  /** @param {string} sqlSource_606 */
  appendSafe(sqlSource_606) {
    listBuilderAdd_89(this.#buffer_604, new SqlSource(sqlSource_606));
    return;
  }
  /** @param {SqlFragment} fragment_608 */
  appendFragment(fragment_608) {
    listBuilderAddAll_609(this.#buffer_604, fragment_608.parts);
    return;
  }
  /** @param {SqlPart} part_611 */
  appendPart(part_611) {
    listBuilderAdd_89(this.#buffer_604, part_611);
    return;
  }
  /** @param {Array<SqlPart>} values_613 */
  appendPartList(values_613) {
    const this616 = this;
    function fn_614(x_615) {
      this616.appendPart(x_615);
      return;
    }
    this.#appendList_617(values_613, fn_614);
    return;
  }
  /** @param {boolean} value_619 */
  appendBoolean(value_619) {
    listBuilderAdd_89(this.#buffer_604, new SqlBoolean(value_619));
    return;
  }
  /** @param {Array<boolean>} values_621 */
  appendBooleanList(values_621) {
    const this624 = this;
    function fn_622(x_623) {
      this624.appendBoolean(x_623);
      return;
    }
    this.#appendList_617(values_621, fn_622);
    return;
  }
  /** @param {globalThis.Date} value_626 */
  appendDate(value_626) {
    listBuilderAdd_89(this.#buffer_604, new SqlDate(value_626));
    return;
  }
  /** @param {Array<globalThis.Date>} values_628 */
  appendDateList(values_628) {
    const this631 = this;
    function fn_629(x_630) {
      this631.appendDate(x_630);
      return;
    }
    this.#appendList_617(values_628, fn_629);
    return;
  }
  /** @param {number} value_633 */
  appendFloat64(value_633) {
    listBuilderAdd_89(this.#buffer_604, new SqlFloat64(value_633));
    return;
  }
  /** @param {Array<number>} values_635 */
  appendFloat64List(values_635) {
    const this638 = this;
    function fn_636(x_637) {
      this638.appendFloat64(x_637);
      return;
    }
    this.#appendList_617(values_635, fn_636);
    return;
  }
  /** @param {number} value_640 */
  appendInt32(value_640) {
    listBuilderAdd_89(this.#buffer_604, new SqlInt32(value_640));
    return;
  }
  /** @param {Array<number>} values_642 */
  appendInt32List(values_642) {
    const this645 = this;
    function fn_643(x_644) {
      this645.appendInt32(x_644);
      return;
    }
    this.#appendList_617(values_642, fn_643);
    return;
  }
  /** @param {bigint} value_647 */
  appendInt64(value_647) {
    listBuilderAdd_89(this.#buffer_604, new SqlInt64(value_647));
    return;
  }
  /** @param {Array<bigint>} values_649 */
  appendInt64List(values_649) {
    const this652 = this;
    function fn_650(x_651) {
      this652.appendInt64(x_651);
      return;
    }
    this.#appendList_617(values_649, fn_650);
    return;
  }
  /** @param {string} value_654 */
  appendString(value_654) {
    listBuilderAdd_89(this.#buffer_604, new SqlString(value_654));
    return;
  }
  /** @param {Array<string>} values_656 */
  appendStringList(values_656) {
    const this659 = this;
    function fn_657(x_658) {
      this659.appendString(x_658);
      return;
    }
    this.#appendList_617(values_656, fn_657);
    return;
  }
  /**
   * @template {unknown} T_664
   * @param {Array<T_664>} values_661
   * @param {(arg0: T_664) => void} appendValue_662
   */
  #appendList_617(values_661, appendValue_662) {
    let i_663 = 0;
    while (i_663 < values_661.length) {
      if (i_663 > 0) {
        this.appendSafe(", ");
      }
      appendValue_662(listedGet_99(values_661, i_663));
      i_663 = i_663 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_90(this.#buffer_604));
  }
  constructor() {
    super ();
    const t_666 = [];
    this.#buffer_604 = t_666;
    return;
  }
};
export class SqlFragment extends type__6() {
  /** @type {Array<SqlPart>} */
  #parts_667;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    const builder_670 = [""];
    let i_671 = 0;
    while (i_671 < this.#parts_667.length) {
      listedGet_99(this.#parts_667, i_671).formatTo(builder_670);
      i_671 = i_671 + 1 | 0;
    }
    return builder_670[0];
  }
  /** @param {Array<SqlPart>} parts_672 */
  constructor(parts_672) {
    super ();
    this.#parts_667 = parts_672;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_667;
  }
};
export class SqlPart extends type__6() {
  /** @param {globalThis.Array<string>} builder_675 */
  formatTo(builder_675) {
    null;
  }
};
export class SqlSource extends type__6(SqlPart) {
  /** @type {string} */
  #source_676;
  /** @param {globalThis.Array<string>} builder_678 */
  formatTo(builder_678) {
    void (builder_678[0] += this.#source_676);
    return;
  }
  /** @param {string} source_679 */
  constructor(source_679) {
    super ();
    this.#source_676 = source_679;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_676;
  }
};
export class SqlBoolean extends type__6(SqlPart) {
  /** @type {boolean} */
  #value_681;
  /** @param {globalThis.Array<string>} builder_683 */
  formatTo(builder_683) {
    let t_684;
    if (this.#value_681) {
      t_684 = "TRUE";
    } else {
      t_684 = "FALSE";
    }
    void (builder_683[0] += t_684);
    return;
  }
  /** @param {boolean} value_685 */
  constructor(value_685) {
    super ();
    this.#value_681 = value_685;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_681;
  }
};
export class SqlDate extends type__6(SqlPart) {
  /** @type {globalThis.Date} */
  #value_687;
  /** @param {globalThis.Array<string>} builder_689 */
  formatTo(builder_689) {
    void (builder_689[0] += "'");
    const this_690 = this.#value_687.toISOString().split("T")[0];
    let index_691 = 0;
    while (this_690.length > index_691) {
      const codePoint_692 = stringGet_257(this_690, index_691);
      const c_693 = codePoint_692;
      if (c_693 === 39) {
        void (builder_689[0] += "''");
      } else {
        try {
          stringBuilderAppendCodePoint_694(builder_689, c_693);
        } catch {
          throw Error();
        }
      }
      index_691 = stringNext_253(this_690, index_691);
    }
    void (builder_689[0] += "'");
    return;
  }
  /** @param {globalThis.Date} value_695 */
  constructor(value_695) {
    super ();
    this.#value_687 = value_695;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_687;
  }
};
export class SqlFloat64 extends type__6(SqlPart) {
  /** @type {number} */
  #value_697;
  /** @param {globalThis.Array<string>} builder_699 */
  formatTo(builder_699) {
    const s_700 = float64ToString_204(this.#value_697);
    let t_701;
    if (s_700 === "NaN") {
      t_701 = true;
    } else if (s_700 === "Infinity") {
      t_701 = true;
    } else {
      t_701 = s_700 === "-Infinity";
    }
    if (t_701) {
      void (builder_699[0] += "NULL");
    } else {
      void (builder_699[0] += s_700);
    }
    return;
  }
  /** @param {number} value_702 */
  constructor(value_702) {
    super ();
    this.#value_697 = value_702;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_697;
  }
};
export class SqlInt32 extends type__6(SqlPart) {
  /** @type {number} */
  #value_704;
  /** @param {globalThis.Array<string>} builder_706 */
  formatTo(builder_706) {
    void (builder_706[0] += this.#value_704.toString());
    return;
  }
  /** @param {number} value_707 */
  constructor(value_707) {
    super ();
    this.#value_704 = value_707;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_704;
  }
};
export class SqlInt64 extends type__6(SqlPart) {
  /** @type {bigint} */
  #value_709;
  /** @param {globalThis.Array<string>} builder_711 */
  formatTo(builder_711) {
    void (builder_711[0] += this.#value_709.toString());
    return;
  }
  /** @param {bigint} value_712 */
  constructor(value_712) {
    super ();
    this.#value_709 = value_712;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_709;
  }
};
export class SqlDefault extends type__6(SqlPart) {
  /** @param {globalThis.Array<string>} builder_715 */
  formatTo(builder_715) {
    void (builder_715[0] += "DEFAULT");
    return;
  }
  constructor() {
    super ();
    return;
  }
};
export class SqlString extends type__6(SqlPart) {
  /** @type {string} */
  #value_716;
  /** @param {globalThis.Array<string>} builder_718 */
  formatTo(builder_718) {
    void (builder_718[0] += "'");
    const this_719 = this.#value_716;
    let index_720 = 0;
    while (this_719.length > index_720) {
      const codePoint_721 = stringGet_257(this_719, index_720);
      const c_722 = codePoint_721;
      if (c_722 === 39) {
        void (builder_718[0] += "''");
      } else {
        try {
          stringBuilderAppendCodePoint_694(builder_718, c_722);
        } catch {
          throw Error();
        }
      }
      index_720 = stringNext_253(this_719, index_720);
    }
    void (builder_718[0] += "'");
    return;
  }
  /** @param {string} value_723 */
  constructor(value_723) {
    super ();
    this.#value_716 = value_723;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_716;
  }
};
/**
 * @param {TableDef} tableDef_725
 * @param {Map<string, string>} params_726
 * @returns {Changeset}
 */
export function changeset(tableDef_725, params_726) {
  return new ChangesetImpl(tableDef_725, params_726, mapConstructor_727(Object.freeze([])), Object.freeze([]), true);
};
/**
 * @param {number} c_729
 * @returns {boolean}
 */
export function isIdentStart_728(c_729) {
  let t_730;
  if (c_729 >= 97) {
    t_730 = c_729 <= 122;
  } else {
    t_730 = false;
  }
  if (t_730) {
    return true;
  } else {
    let t_731;
    if (c_729 >= 65) {
      t_731 = c_729 <= 90;
    } else {
      t_731 = false;
    }
    if (t_731) {
      return true;
    } else {
      return c_729 === 95;
    }
  }
};
/**
 * @param {number} c_733
 * @returns {boolean}
 */
export function isIdentPart_732(c_733) {
  if (isIdentStart_728(c_733)) {
    return true;
  } else if (c_733 >= 48) {
    return c_733 <= 57;
  } else {
    return false;
  }
};
/**
 * @param {string} name_734
 * @returns {SafeIdentifier}
 */
export function safeIdentifier(name_734) {
  if (! name_734) {
    throw Error();
  }
  let idx_735 = 0;
  if (! isIdentStart_728(stringGet_257(name_734, idx_735))) {
    throw Error();
  }
  idx_735 = stringNext_253(name_734, idx_735);
  while (name_734.length > idx_735) {
    if (! isIdentPart_732(stringGet_257(name_734, idx_735))) {
      throw Error();
    }
    idx_735 = stringNext_253(name_734, idx_735);
  }
  return new ValidatedIdentifier(name_734);
};
/** @returns {Array<FieldDef>} */
export function timestamps() {
  const t_736 = safeIdentifier("inserted_at");
  const t_737 = safeIdentifier("updated_at");
  return Object.freeze([new FieldDef(t_736, new DateField(), true, new SqlDefault(), false), new FieldDef(t_737, new DateField(), true, new SqlDefault(), false)]);
};
/**
 * @param {TableDef} tableDef_738
 * @param {number} id_739
 * @returns {SqlFragment}
 */
export function deleteSql(tableDef_738, id_739) {
  const b_740 = new SqlBuilder();
  b_740.appendSafe("DELETE FROM ");
  b_740.appendSafe(tableDef_738.tableName.sqlValue);
  b_740.appendSafe(" WHERE ");
  b_740.appendSafe(tableDef_738.pkName());
  b_740.appendSafe(" = ");
  b_740.appendInt32(id_739);
  return b_740.accumulated;
};
/**
 * @param {SqlBuilder} b_741
 * @param {Array<WhereClause>} conditions_742
 */
export function renderWhere_462(b_741, conditions_742) {
  if (! ! conditions_742.length) {
    b_741.appendSafe(" WHERE ");
    b_741.appendFragment(listedGet_99(conditions_742, 0).condition);
    let i_743 = 1;
    while (i_743 < conditions_742.length) {
      b_741.appendSafe(" ");
      b_741.appendSafe(listedGet_99(conditions_742, i_743).keyword());
      b_741.appendSafe(" ");
      b_741.appendFragment(listedGet_99(conditions_742, i_743).condition);
      i_743 = i_743 + 1 | 0;
    }
  }
  return;
};
/**
 * @param {SqlBuilder} b_744
 * @param {Array<JoinClause>} joinClauses_745
 */
export function renderJoins_461(b_744, joinClauses_745) {
  const this_746 = joinClauses_745;
  const n_747 = this_746.length;
  let i_748 = 0;
  while (i_748 < n_747) {
    const el_749 = listedGet_99(this_746, i_748);
    i_748 = i_748 + 1 | 0;
    const jc_750 = el_749;
    b_744.appendSafe(" ");
    b_744.appendSafe(jc_750.joinType.keyword());
    b_744.appendSafe(" ");
    b_744.appendSafe(jc_750.table.sqlValue);
    const oc_751 = jc_750.onCondition;
    if (!(oc_751 == null)) {
      const oc_752 = oc_751;
      b_744.appendSafe(" ON ");
      b_744.appendFragment(oc_752);
    }
  }
  return;
};
/**
 * @param {SqlBuilder} b_753
 * @param {Array<SafeIdentifier>} groupByFields_754
 */
export function renderGroupBy_463(b_753, groupByFields_754) {
  if (! ! groupByFields_754.length) {
    b_753.appendSafe(" GROUP BY ");
    function fn_755(f_756) {
      return f_756.sqlValue;
    }
    b_753.appendSafe(listedJoin_298(groupByFields_754, ", ", fn_755));
  }
  return;
};
/**
 * @param {SqlBuilder} b_757
 * @param {Array<WhereClause>} havingConditions_758
 */
export function renderHaving_464(b_757, havingConditions_758) {
  if (! ! havingConditions_758.length) {
    b_757.appendSafe(" HAVING ");
    b_757.appendFragment(listedGet_99(havingConditions_758, 0).condition);
    let i_759 = 1;
    while (i_759 < havingConditions_758.length) {
      b_757.appendSafe(" ");
      b_757.appendSafe(listedGet_99(havingConditions_758, i_759).keyword());
      b_757.appendSafe(" ");
      b_757.appendFragment(listedGet_99(havingConditions_758, i_759).condition);
      i_759 = i_759 + 1 | 0;
    }
  }
  return;
};
/**
 * @param {SafeIdentifier} tableName_760
 * @returns {Query}
 */
export function from(tableName_760) {
  return new Query(tableName_760, Object.freeze([]), Object.freeze([]), Object.freeze([]), null, null, Object.freeze([]), Object.freeze([]), Object.freeze([]), false, Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} table_761
 * @param {SafeIdentifier} column_762
 * @returns {SqlFragment}
 */
export function col(table_761, column_762) {
  const b_763 = new SqlBuilder();
  b_763.appendSafe(table_761.sqlValue);
  b_763.appendSafe(".");
  b_763.appendSafe(column_762.sqlValue);
  return b_763.accumulated;
};
/** @returns {SqlFragment} */
export function countAll() {
  const b_764 = new SqlBuilder();
  b_764.appendSafe("COUNT(*)");
  return b_764.accumulated;
};
/**
 * @param {SafeIdentifier} field_765
 * @returns {SqlFragment}
 */
export function countCol(field_765) {
  const b_766 = new SqlBuilder();
  b_766.appendSafe("COUNT(");
  b_766.appendSafe(field_765.sqlValue);
  b_766.appendSafe(")");
  return b_766.accumulated;
};
/**
 * @param {SafeIdentifier} field_767
 * @returns {SqlFragment}
 */
export function sumCol(field_767) {
  const b_768 = new SqlBuilder();
  b_768.appendSafe("SUM(");
  b_768.appendSafe(field_767.sqlValue);
  b_768.appendSafe(")");
  return b_768.accumulated;
};
/**
 * @param {SafeIdentifier} field_769
 * @returns {SqlFragment}
 */
export function avgCol(field_769) {
  const b_770 = new SqlBuilder();
  b_770.appendSafe("AVG(");
  b_770.appendSafe(field_769.sqlValue);
  b_770.appendSafe(")");
  return b_770.accumulated;
};
/**
 * @param {SafeIdentifier} field_771
 * @returns {SqlFragment}
 */
export function minCol(field_771) {
  const b_772 = new SqlBuilder();
  b_772.appendSafe("MIN(");
  b_772.appendSafe(field_771.sqlValue);
  b_772.appendSafe(")");
  return b_772.accumulated;
};
/**
 * @param {SafeIdentifier} field_773
 * @returns {SqlFragment}
 */
export function maxCol(field_773) {
  const b_774 = new SqlBuilder();
  b_774.appendSafe("MAX(");
  b_774.appendSafe(field_773.sqlValue);
  b_774.appendSafe(")");
  return b_774.accumulated;
};
/**
 * @param {Query} a_775
 * @param {Query} b_776
 * @returns {SqlFragment}
 */
export function unionSql(a_775, b_776) {
  const sb_777 = new SqlBuilder();
  sb_777.appendSafe("(");
  sb_777.appendFragment(a_775.toSql());
  sb_777.appendSafe(") UNION (");
  sb_777.appendFragment(b_776.toSql());
  sb_777.appendSafe(")");
  return sb_777.accumulated;
};
/**
 * @param {Query} a_778
 * @param {Query} b_779
 * @returns {SqlFragment}
 */
export function unionAllSql(a_778, b_779) {
  const sb_780 = new SqlBuilder();
  sb_780.appendSafe("(");
  sb_780.appendFragment(a_778.toSql());
  sb_780.appendSafe(") UNION ALL (");
  sb_780.appendFragment(b_779.toSql());
  sb_780.appendSafe(")");
  return sb_780.accumulated;
};
/**
 * @param {Query} a_781
 * @param {Query} b_782
 * @returns {SqlFragment}
 */
export function intersectSql(a_781, b_782) {
  const sb_783 = new SqlBuilder();
  sb_783.appendSafe("(");
  sb_783.appendFragment(a_781.toSql());
  sb_783.appendSafe(") INTERSECT (");
  sb_783.appendFragment(b_782.toSql());
  sb_783.appendSafe(")");
  return sb_783.accumulated;
};
/**
 * @param {Query} a_784
 * @param {Query} b_785
 * @returns {SqlFragment}
 */
export function exceptSql(a_784, b_785) {
  const sb_786 = new SqlBuilder();
  sb_786.appendSafe("(");
  sb_786.appendFragment(a_784.toSql());
  sb_786.appendSafe(") EXCEPT (");
  sb_786.appendFragment(b_785.toSql());
  sb_786.appendSafe(")");
  return sb_786.accumulated;
};
/**
 * @param {Query} q_787
 * @param {SafeIdentifier} alias_788
 * @returns {SqlFragment}
 */
export function subquery(q_787, alias_788) {
  const b_789 = new SqlBuilder();
  b_789.appendSafe("(");
  b_789.appendFragment(q_787.toSql());
  b_789.appendSafe(") AS ");
  b_789.appendSafe(alias_788.sqlValue);
  return b_789.accumulated;
};
/**
 * @param {Query} q_790
 * @returns {SqlFragment}
 */
export function existsSql(q_790) {
  const b_791 = new SqlBuilder();
  b_791.appendSafe("EXISTS (");
  b_791.appendFragment(q_790.toSql());
  b_791.appendSafe(")");
  return b_791.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_792
 * @returns {UpdateQuery}
 */
export function update(tableName_792) {
  return new UpdateQuery(tableName_792, Object.freeze([]), Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} tableName_793
 * @returns {DeleteQuery}
 */
export function deleteFrom(tableName_793) {
  return new DeleteQuery(tableName_793, Object.freeze([]), null);
};
