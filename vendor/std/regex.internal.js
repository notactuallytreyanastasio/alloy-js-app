import {
  type as type__663, requireInstanceOf as requireInstanceOf__789, pairConstructor as pairConstructor_750, mapConstructor as mapConstructor_749, regexFormatterRegexCompileFormatted as regexFormatterRegexCompileFormatted_761, regexCompiledFound as regexCompiledFound_765, regexCompiledFind as regexCompiledFind_770, regexCompiledReplace as regexCompiledReplace_775, regexCompiledSplit as regexCompiledSplit_778, cmpInt32 as cmpInt32_931, listedGet as listedGet_817, stringFromCodePoint as stringFromCodePoint_822, regexFormatterPushCodeTo as regexFormatterPushCodeTo_830, stringGet as stringGet_836, stringNext as stringNext_837, regexFormatterAdjustCodeSet as regexFormatterAdjustCodeSet_846, listBuilderAdd as listBuilderAdd_922, listBuilderToList as listBuilderToList_923
} from "@temperlang/core";
export class RegexNode extends type__663() {
  /** @returns {Regex} */
  compiled() {
    return new Regex(this);
  }
  /**
   * @param {string} text_655
   * @returns {boolean}
   */
  found(text_655) {
    return this.compiled().found(text_655);
  }
  /**
   * @param {string} text_657
   * @returns {Match}
   */
  find(text_657) {
    return this.compiled().find(text_657);
  }
  /**
   * @param {string} text_659
   * @param {(arg0: Match) => string} format_660
   * @returns {string}
   */
  replace(text_659, format_660) {
    return this.compiled().replace(text_659, format_660);
  }
  /**
   * @param {string} text_662
   * @returns {Array<string>}
   */
  split(text_662) {
    return this.compiled().split(text_662);
  }
};
export class Capture extends type__663(RegexNode) {
  /** @type {string} */
  #name_664;
  /** @type {RegexNode} */
  #item_665;
  /**
   * @param {{
   *   name: string, item: RegexNode
   * }}
   * props
   * @returns {Capture}
   */
  static["new"](props) {
    return new Capture(props.name, props.item);
  }
  /**
   * @param {string} name_666
   * @param {RegexNode} item_667
   */
  constructor(name_666, item_667) {
    super ();
    this.#name_664 = name_666;
    this.#item_665 = item_667;
    return;
  }
  /** @returns {string} */
  get name() {
    return this.#name_664;
  }
  /** @returns {RegexNode} */
  get item() {
    return this.#item_665;
  }
};
export class CodePart extends type__663(RegexNode) {
};
export class CodePoints extends type__663(CodePart) {
  /** @type {string} */
  #value_670;
  /** @param {string} value_671 */
  constructor(value_671) {
    super ();
    this.#value_670 = value_671;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_670;
  }
};
export class Special extends type__663(RegexNode) {
};
export class BeginSpecial extends type__663(Special) {
  constructor() {
    super ();
    return;
  }
};
export class DotSpecial extends type__663(Special) {
  constructor() {
    super ();
    return;
  }
};
export class EndSpecial extends type__663(Special) {
  constructor() {
    super ();
    return;
  }
};
export class WordBoundarySpecial extends type__663(Special) {
  constructor() {
    super ();
    return;
  }
};
export class SpecialSet extends type__663(CodePart, Special) {
};
export class DigitSpecial extends type__663(SpecialSet) {
  constructor() {
    super ();
    return;
  }
  /** @returns {Regex} */
  compiled() {
    return RegexNode.prototype.compiled.call(this);
  }
  /**
   * @param {string} text_673
   * @returns {boolean}
   */
  found(text_673) {
    return RegexNode.prototype.found.call(this, text_673);
  }
  /**
   * @param {string} text_674
   * @returns {Match}
   */
  find(text_674) {
    return RegexNode.prototype.find.call(this, text_674);
  }
  /**
   * @param {string} text_675
   * @param {(arg0: Match) => string} format_676
   * @returns {string}
   */
  replace(text_675, format_676) {
    return RegexNode.prototype.replace.call(this, text_675, format_676);
  }
  /**
   * @param {string} text_677
   * @returns {Array<string>}
   */
  split(text_677) {
    return RegexNode.prototype.split.call(this, text_677);
  }
};
export class SpaceSpecial extends type__663(SpecialSet) {
  constructor() {
    super ();
    return;
  }
  /** @returns {Regex} */
  compiled() {
    return RegexNode.prototype.compiled.call(this);
  }
  /**
   * @param {string} text_678
   * @returns {boolean}
   */
  found(text_678) {
    return RegexNode.prototype.found.call(this, text_678);
  }
  /**
   * @param {string} text_679
   * @returns {Match}
   */
  find(text_679) {
    return RegexNode.prototype.find.call(this, text_679);
  }
  /**
   * @param {string} text_680
   * @param {(arg0: Match) => string} format_681
   * @returns {string}
   */
  replace(text_680, format_681) {
    return RegexNode.prototype.replace.call(this, text_680, format_681);
  }
  /**
   * @param {string} text_682
   * @returns {Array<string>}
   */
  split(text_682) {
    return RegexNode.prototype.split.call(this, text_682);
  }
};
export class WordSpecial extends type__663(SpecialSet) {
  constructor() {
    super ();
    return;
  }
  /** @returns {Regex} */
  compiled() {
    return RegexNode.prototype.compiled.call(this);
  }
  /**
   * @param {string} text_683
   * @returns {boolean}
   */
  found(text_683) {
    return RegexNode.prototype.found.call(this, text_683);
  }
  /**
   * @param {string} text_684
   * @returns {Match}
   */
  find(text_684) {
    return RegexNode.prototype.find.call(this, text_684);
  }
  /**
   * @param {string} text_685
   * @param {(arg0: Match) => string} format_686
   * @returns {string}
   */
  replace(text_685, format_686) {
    return RegexNode.prototype.replace.call(this, text_685, format_686);
  }
  /**
   * @param {string} text_687
   * @returns {Array<string>}
   */
  split(text_687) {
    return RegexNode.prototype.split.call(this, text_687);
  }
};
export class CodeRange extends type__663(CodePart) {
  /** @type {number} */
  #min_688;
  /** @type {number} */
  #max_689;
  /**
   * @param {{
   *   min: number, max: number
   * }}
   * props
   * @returns {CodeRange}
   */
  static["new"](props) {
    return new CodeRange(props.min, props.max);
  }
  /**
   * @param {number} min_690
   * @param {number} max_691
   */
  constructor(min_690, max_691) {
    super ();
    this.#min_688 = min_690;
    this.#max_689 = max_691;
    return;
  }
  /** @returns {number} */
  get min() {
    return this.#min_688;
  }
  /** @returns {number} */
  get max() {
    return this.#max_689;
  }
};
export class CodeSet extends type__663(RegexNode) {
  /** @type {Array<CodePart>} */
  #items_694;
  /** @type {boolean} */
  #negated_695;
  /**
   * @param {{
   *   items: Array<CodePart>, negated ?: boolean | null
   * }}
   * props
   * @returns {CodeSet}
   */
  static["new"](props) {
    return new CodeSet(props.items, props.negated);
  }
  /**
   * @param {Array<CodePart>} items_696
   * @param {boolean | null} [negated_697]
   */
  constructor(items_696, negated_697) {
    super ();
    let negated_698;
    if (negated_697 == null) {
      negated_698 = false;
    } else {
      negated_698 = negated_697;
    }
    this.#items_694 = items_696;
    this.#negated_695 = negated_698;
    return;
  }
  /** @returns {Array<CodePart>} */
  get items() {
    return this.#items_694;
  }
  /** @returns {boolean} */
  get negated() {
    return this.#negated_695;
  }
};
export class Or extends type__663(RegexNode) {
  /** @type {Array<RegexNode>} */
  #items_701;
  /** @param {Array<RegexNode>} items_702 */
  constructor(items_702) {
    super ();
    this.#items_701 = items_702;
    return;
  }
  /** @returns {Array<RegexNode>} */
  get items() {
    return this.#items_701;
  }
};
export class Repeat extends type__663(RegexNode) {
  /** @type {RegexNode} */
  #item_704;
  /** @type {number} */
  #min_705;
  /** @type {number | null} */
  #max_706;
  /** @type {boolean} */
  #reluctant_707;
  /**
   * @param {{
   *   item: RegexNode, min: number, max: number | null, reluctant ?: boolean | null
   * }}
   * props
   * @returns {Repeat}
   */
  static["new"](props) {
    return new Repeat(props.item, props.min, props.max, props.reluctant);
  }
  /**
   * @param {RegexNode} item_708
   * @param {number} min_709
   * @param {number | null} max_710
   * @param {boolean | null} [reluctant_711]
   */
  constructor(item_708, min_709, max_710, reluctant_711) {
    super ();
    let reluctant_712;
    if (reluctant_711 == null) {
      reluctant_712 = false;
    } else {
      reluctant_712 = reluctant_711;
    }
    this.#item_704 = item_708;
    this.#min_705 = min_709;
    this.#max_706 = max_710;
    this.#reluctant_707 = reluctant_712;
    return;
  }
  /** @returns {RegexNode} */
  get item() {
    return this.#item_704;
  }
  /** @returns {number} */
  get min() {
    return this.#min_705;
  }
  /** @returns {number | null} */
  get max() {
    return this.#max_706;
  }
  /** @returns {boolean} */
  get reluctant() {
    return this.#reluctant_707;
  }
};
export class Sequence extends type__663(RegexNode) {
  /** @type {Array<RegexNode>} */
  #items_717;
  /** @param {Array<RegexNode>} items_718 */
  constructor(items_718) {
    super ();
    this.#items_717 = items_718;
    return;
  }
  /** @returns {Array<RegexNode>} */
  get items() {
    return this.#items_717;
  }
};
export class Match extends type__663() {
  /** @type {Group} */
  #full_720;
  /** @type {Map<string, Group>} */
  #groups_721;
  /**
   * @param {{
   *   full: Group, groups: Map<string, Group>
   * }}
   * props
   * @returns {Match}
   */
  static["new"](props) {
    return new Match(props.full, props.groups);
  }
  /**
   * @param {Group} full_722
   * @param {Map<string, Group>} groups_723
   */
  constructor(full_722, groups_723) {
    super ();
    this.#full_720 = full_722;
    this.#groups_721 = groups_723;
    return;
  }
  /** @returns {Group} */
  get full() {
    return this.#full_720;
  }
  /** @returns {Map<string, Group>} */
  get groups() {
    return this.#groups_721;
  }
};
export class Group extends type__663() {
  /** @type {string} */
  #name_726;
  /** @type {string} */
  #value_727;
  /** @type {globalThis.number} */
  #begin_728;
  /** @type {globalThis.number} */
  #end_729;
  /**
   * @param {{
   *   name: string, value: string, begin: globalThis.number, end: globalThis.number
   * }}
   * props
   * @returns {Group}
   */
  static["new"](props) {
    return new Group(props.name, props.value, props.begin, props.end);
  }
  /**
   * @param {string} name_730
   * @param {string} value_731
   * @param {globalThis.number} begin_732
   * @param {globalThis.number} end_733
   */
  constructor(name_730, value_731, begin_732, end_733) {
    super ();
    this.#name_726 = name_730;
    this.#value_727 = value_731;
    this.#begin_728 = begin_732;
    this.#end_729 = end_733;
    return;
  }
  /** @returns {string} */
  get name() {
    return this.#name_726;
  }
  /** @returns {string} */
  get value() {
    return this.#value_727;
  }
  /** @returns {globalThis.number} */
  get begin() {
    return this.#begin_728;
  }
  /** @returns {globalThis.number} */
  get end() {
    return this.#end_729;
  }
};
export class RegexRefs extends type__663() {
  /** @type {CodePoints} */
  #codePoints_738;
  /** @type {Group} */
  #group_739;
  /** @type {Match} */
  #match_740;
  /** @type {Or} */
  #orObject_741;
  /**
   * @param {{
   *   codePoints ?: CodePoints | null, group ?: Group | null, match ?: Match | null, orObject ?: Or | null
   * }}
   * props
   * @returns {RegexRefs}
   */
  static["new"](props) {
    return new RegexRefs(props.codePoints, props.group, props.match, props.orObject);
  }
  /**
   * @param {CodePoints | null} [codePoints_742]
   * @param {Group | null} [group_743]
   * @param {Match | null} [match_744]
   * @param {Or | null} [orObject_745]
   */
  constructor(codePoints_742, group_743, match_744, orObject_745) {
    super ();
    let codePoints_746;
    if (codePoints_742 == null) {
      codePoints_746 = new CodePoints("");
    } else {
      codePoints_746 = codePoints_742;
    }
    let group_747;
    if (group_743 == null) {
      group_747 = new Group("", "", 0, 0);
    } else {
      group_747 = group_743;
    }
    let match_748;
    if (match_744 == null) {
      match_748 = new Match(group_747, mapConstructor_749(Object.freeze([pairConstructor_750("", group_747)])));
    } else {
      match_748 = match_744;
    }
    let orObject_751;
    if (orObject_745 == null) {
      orObject_751 = new Or(Object.freeze([]));
    } else {
      orObject_751 = orObject_745;
    }
    this.#codePoints_738 = codePoints_746;
    this.#group_739 = group_747;
    this.#match_740 = match_748;
    this.#orObject_741 = orObject_751;
    return;
  }
  /** @returns {CodePoints} */
  get codePoints() {
    return this.#codePoints_738;
  }
  /** @returns {Group} */
  get group() {
    return this.#group_739;
  }
  /** @returns {Match} */
  get match() {
    return this.#match_740;
  }
  /** @returns {Or} */
  get orObject() {
    return this.#orObject_741;
  }
};
export class Regex extends type__663() {
  /** @type {RegexNode} */
  #data_756;
  /** @param {RegexNode} data_757 */
  constructor(data_757) {
    super ();
    const t_758 = data_757;
    this.#data_756 = t_758;
    const formatted_759 = RegexFormatter.regexFormat(data_757);
    const t_760 = regexFormatterRegexCompileFormatted_761(data_757, formatted_759);
    this.#compiled_762 = t_760;
    return;
  }
  /**
   * @param {string} text_764
   * @returns {boolean}
   */
  found(text_764) {
    return regexCompiledFound_765(this, this.#compiled_762, text_764);
  }
  /**
   * @param {string} text_767
   * @param {globalThis.number | null} [begin_768]
   * @returns {Match}
   */
  find(text_767, begin_768) {
    let begin_769;
    if (begin_768 == null) {
      begin_769 = 0;
    } else {
      begin_769 = begin_768;
    }
    return regexCompiledFind_770(this, this.#compiled_762, text_767, begin_769, regexRefs_771);
  }
  /**
   * @param {string} text_773
   * @param {(arg0: Match) => string} format_774
   * @returns {string}
   */
  replace(text_773, format_774) {
    return regexCompiledReplace_775(this, this.#compiled_762, text_773, format_774, regexRefs_771);
  }
  /**
   * @param {string} text_777
   * @returns {Array<string>}
   */
  split(text_777) {
    return regexCompiledSplit_778(this, this.#compiled_762, text_777, regexRefs_771);
  }
  /** @type {unknown} */
  #compiled_762;
  /** @returns {RegexNode} */
  get data() {
    return this.#data_756;
  }
};
export class RegexFormatter extends type__663() {
  /** @type {globalThis.Array<string>} */
  #out_780;
  /**
   * @param {RegexNode} data_782
   * @returns {string}
   */
  static regexFormat(data_782) {
    return new RegexFormatter().format(data_782);
  }
  /**
   * @param {RegexNode} regex_784
   * @returns {string}
   */
  format(regex_784) {
    this.#pushRegex_785(regex_784);
    return this.#out_780[0];
  }
  /** @param {RegexNode} regex_787 */
  #pushRegex_785(regex_787) {
    if (regex_787 instanceof Capture) {
      const t_788 = requireInstanceOf__789(regex_787, Capture);
      this.#pushCapture_790(t_788);
      return;
    } else if (regex_787 instanceof CodePoints) {
      const t_791 = requireInstanceOf__789(regex_787, CodePoints);
      this.#pushCodePoints_792(t_791, false);
      return;
    } else if (regex_787 instanceof CodeRange) {
      const t_793 = requireInstanceOf__789(regex_787, CodeRange);
      this.#pushCodeRange_794(t_793);
      return;
    } else if (regex_787 instanceof CodeSet) {
      const t_795 = requireInstanceOf__789(regex_787, CodeSet);
      this.#pushCodeSet_796(t_795);
      return;
    } else if (regex_787 instanceof Or) {
      const t_797 = requireInstanceOf__789(regex_787, Or);
      this.#pushOr_798(t_797);
      return;
    } else if (regex_787 instanceof Repeat) {
      const t_799 = requireInstanceOf__789(regex_787, Repeat);
      this.#pushRepeat_800(t_799);
      return;
    } else if (regex_787 instanceof Sequence) {
      const t_801 = requireInstanceOf__789(regex_787, Sequence);
      this.#pushSequence_802(t_801);
      return;
    } else if (regex_787 instanceof BeginSpecial) {
      void (this.#out_780[0] += "^");
      return;
    } else if (regex_787 instanceof DotSpecial) {
      void (this.#out_780[0] += ".");
      return;
    } else if (regex_787 instanceof EndSpecial) {
      void (this.#out_780[0] += "$");
      return;
    } else if (regex_787 instanceof WordBoundarySpecial) {
      void (this.#out_780[0] += "\\b");
      return;
    } else if (regex_787 instanceof DigitSpecial) {
      void (this.#out_780[0] += "\\d");
      return;
    } else if (regex_787 instanceof SpaceSpecial) {
      void (this.#out_780[0] += "\\s");
      return;
    } else if (regex_787 instanceof WordSpecial) {
      void (this.#out_780[0] += "\\w");
      return;
    } else {
      return;
    }
  }
  /** @param {Capture} capture_804 */
  #pushCapture_790(capture_804) {
    void (this.#out_780[0] += "(");
    this.#pushCaptureName_805(this.#out_780, capture_804.name);
    this.#pushRegex_785(capture_804.item);
    void (this.#out_780[0] += ")");
    return;
  }
  /**
   * @param {globalThis.Array<string>} out_807
   * @param {string} name_808
   */
  #pushCaptureName_805(out_807, name_808) {
    void (out_807[0] += "?<" + name_808 + ">");
    return;
  }
  /**
   * @param {number} code_811
   * @param {boolean} insideCodeSet_812
   */
  #pushCode_810(code_811, insideCodeSet_812) {
    let return_813;
    fn_814: {
      try {
        let specialEscape_815;
        if (code_811 === Codes.carriageReturn) {
          specialEscape_815 = "r";
        } else if (code_811 === Codes.newline) {
          specialEscape_815 = "n";
        } else if (code_811 === Codes.tab) {
          specialEscape_815 = "t";
        } else {
          specialEscape_815 = "";
        }
        if (!(specialEscape_815 === "")) {
          void (this.#out_780[0] += "\\");
          void (this.#out_780[0] += specialEscape_815);
          return_813 = void 0;
          break fn_814;
        }
        if (code_811 <= 127) {
          const escapeNeed_816 = listedGet_817(escapeNeeds_818, code_811);
          let t_819;
          if (escapeNeed_816 === 2) {
            t_819 = true;
          } else if (insideCodeSet_812) {
            t_819 = code_811 === Codes.dash;
          } else {
            t_819 = false;
          }
          if (t_819) {
            void (this.#out_780[0] += "\\");
            const t_820 = this.#out_780;
            const t_821 = stringFromCodePoint_822(code_811);
            void (t_820[0] += t_821);
            return_813 = void 0;
            break fn_814;
          } else if (escapeNeed_816 === 0) {
            const t_823 = this.#out_780;
            const t_824 = stringFromCodePoint_822(code_811);
            void (t_823[0] += t_824);
            return_813 = void 0;
            break fn_814;
          }
        }
        let t_825;
        if (code_811 >= Codes.supplementalMin) {
          t_825 = true;
        } else if (code_811 > Codes.highControlMax) {
          let t_826;
          let t_827;
          if (Codes.surrogateMin <= code_811) {
            t_827 = code_811 <= Codes.surrogateMax;
          } else {
            t_827 = false;
          }
          if (t_827) {
            t_826 = true;
          } else {
            t_826 = code_811 === Codes.uint16Max;
          }
          t_825 = ! t_826;
        } else {
          t_825 = false;
        }
        if (t_825) {
          const t_828 = this.#out_780;
          const t_829 = stringFromCodePoint_822(code_811);
          void (t_828[0] += t_829);
          return;
        } else {
          regexFormatterPushCodeTo_830(this, this.#out_780, code_811, insideCodeSet_812);
          return;
        }
      } catch {
        throw Error();
        return;
      }
    }
    return return_813;
  }
  /**
   * @param {CodePoints} codePoints_832
   * @param {boolean} insideCodeSet_833
   */
  #pushCodePoints_792(codePoints_832, insideCodeSet_833) {
    const value_834 = codePoints_832.value;
    let index_835 = 0;
    while (value_834.length > index_835) {
      this.#pushCode_810(stringGet_836(value_834, index_835), insideCodeSet_833);
      index_835 = stringNext_837(value_834, index_835);
    }
    return;
  }
  /** @param {CodeRange} codeRange_839 */
  #pushCodeRange_794(codeRange_839) {
    void (this.#out_780[0] += "[");
    this.#pushCodeRangeUnwrapped_840(codeRange_839);
    void (this.#out_780[0] += "]");
    return;
  }
  /** @param {CodeRange} codeRange_842 */
  #pushCodeRangeUnwrapped_840(codeRange_842) {
    this.#pushCode_810(codeRange_842.min, true);
    void (this.#out_780[0] += "-");
    this.#pushCode_810(codeRange_842.max, true);
    return;
  }
  /** @param {CodeSet} codeSet_844 */
  #pushCodeSet_796(codeSet_844) {
    const adjusted_845 = regexFormatterAdjustCodeSet_846(this, codeSet_844, regexRefs_771);
    if (adjusted_845 instanceof CodeSet) {
      const t_847 = requireInstanceOf__789(adjusted_845, CodeSet);
      if (! t_847.items.length) {
        if (t_847.negated) {
          void (this.#out_780[0] += "[\\s\\S]");
          return;
        } else {
          void (this.#out_780[0] += "(?:$.)");
          return;
        }
      } else {
        void (this.#out_780[0] += "[");
        if (t_847.negated) {
          void (this.#out_780[0] += "^");
        }
        let i_848 = 0;
        while (i_848 < t_847.items.length) {
          this.#pushCodeSetItem_849(listedGet_817(t_847.items, i_848));
          i_848 = i_848 + 1 | 0;
        }
        void (this.#out_780[0] += "]");
        return;
      }
    } else {
      this.#pushRegex_785(adjusted_845);
      return;
    }
  }
  /** @param {CodePart} codePart_851 */
  #pushCodeSetItem_849(codePart_851) {
    if (codePart_851 instanceof CodePoints) {
      const t_852 = requireInstanceOf__789(codePart_851, CodePoints);
      this.#pushCodePoints_792(t_852, true);
      return;
    } else if (codePart_851 instanceof CodeRange) {
      const t_853 = requireInstanceOf__789(codePart_851, CodeRange);
      this.#pushCodeRangeUnwrapped_840(t_853);
      return;
    } else if (codePart_851 instanceof SpecialSet) {
      const t_854 = requireInstanceOf__789(codePart_851, SpecialSet);
      this.#pushRegex_785(t_854);
      return;
    } else {
      return;
    }
  }
  /** @param {Or} or_856 */
  #pushOr_798(or_856) {
    if (! ! or_856.items.length) {
      void (this.#out_780[0] += "(?:");
      this.#pushRegex_785(listedGet_817(or_856.items, 0));
      let i_857 = 1;
      while (i_857 < or_856.items.length) {
        void (this.#out_780[0] += "|");
        this.#pushRegex_785(listedGet_817(or_856.items, i_857));
        i_857 = i_857 + 1 | 0;
      }
      void (this.#out_780[0] += ")");
    }
    return;
  }
  /** @param {Repeat} repeat_859 */
  #pushRepeat_800(repeat_859) {
    void (this.#out_780[0] += "(?:");
    this.#pushRegex_785(repeat_859.item);
    void (this.#out_780[0] += ")");
    const min_860 = repeat_859.min;
    const max_861 = repeat_859.max;
    let t_862;
    if (min_860 === 0) {
      let t_863;
      if (max_861 == null) {
        t_863 = false;
      } else {
        t_863 = max_861 === 1;
      }
      t_862 = t_863;
    } else {
      t_862 = false;
    }
    if (t_862) {
      void (this.#out_780[0] += "?");
    } else {
      let t_864;
      if (min_860 === 0) {
        t_864 = max_861 == null;
      } else {
        t_864 = false;
      }
      if (t_864) {
        void (this.#out_780[0] += "*");
      } else {
        let t_865;
        if (min_860 === 1) {
          t_865 = max_861 == null;
        } else {
          t_865 = false;
        }
        if (t_865) {
          void (this.#out_780[0] += "+");
        } else {
          let t_866;
          void (this.#out_780[0] += "{" + min_860.toString());
          if (max_861 == null) {
            t_866 = false;
          } else {
            t_866 = min_860 === max_861;
          }
          if (! t_866) {
            void (this.#out_780[0] += ",");
            if (!(max_861 == null)) {
              const max_867 = max_861;
              void (this.#out_780[0] += max_867.toString());
            }
          }
          void (this.#out_780[0] += "}");
        }
      }
    }
    if (repeat_859.reluctant) {
      void (this.#out_780[0] += "?");
    }
    return;
  }
  /** @param {Sequence} sequence_869 */
  #pushSequence_802(sequence_869) {
    let i_870 = 0;
    while (i_870 < sequence_869.items.length) {
      this.#pushRegex_785(listedGet_817(sequence_869.items, i_870));
      i_870 = i_870 + 1 | 0;
    }
    return;
  }
  /**
   * @param {CodePart} codePart_872
   * @returns {number | null}
   */
  maxCode(codePart_872) {
    if (codePart_872 instanceof CodePoints) {
      const t_873 = requireInstanceOf__789(codePart_872, CodePoints);
      const value_874 = t_873.value;
      if (! value_874) {
        return null;
      } else {
        let max_875 = 0;
        let index_876 = 0;
        while (value_874.length > index_876) {
          const next_877 = stringGet_836(value_874, index_876);
          if (next_877 > max_875) {
            max_875 = next_877;
          }
          index_876 = stringNext_837(value_874, index_876);
        }
        return max_875;
      }
    } else if (codePart_872 instanceof CodeRange) {
      return requireInstanceOf__789(codePart_872, CodeRange).max;
    } else if (codePart_872 instanceof DigitSpecial) {
      return Codes.digit9;
    } else if (codePart_872 instanceof SpaceSpecial) {
      return Codes.space;
    } else if (codePart_872 instanceof WordSpecial) {
      return Codes.lowerZ;
    } else {
      return null;
    }
  }
  constructor() {
    super ();
    const t_878 = [""];
    this.#out_780 = t_878;
    return;
  }
};
export class Codes extends type__663() {
  /** @type {number} */
  static #ampersand_879 = 38;
  /** @returns {number} */
  static get ampersand() {
    return this.#ampersand_879;
  }
  /** @type {number} */
  static #backslash_880 = 92;
  /** @returns {number} */
  static get backslash() {
    return this.#backslash_880;
  }
  /** @type {number} */
  static #caret_881 = 94;
  /** @returns {number} */
  static get caret() {
    return this.#caret_881;
  }
  /** @type {number} */
  static #carriageReturn_882 = 13;
  /** @returns {number} */
  static get carriageReturn() {
    return this.#carriageReturn_882;
  }
  /** @type {number} */
  static #curlyLeft_883 = 123;
  /** @returns {number} */
  static get curlyLeft() {
    return this.#curlyLeft_883;
  }
  /** @type {number} */
  static #curlyRight_884 = 125;
  /** @returns {number} */
  static get curlyRight() {
    return this.#curlyRight_884;
  }
  /** @type {number} */
  static #dash_885 = 45;
  /** @returns {number} */
  static get dash() {
    return this.#dash_885;
  }
  /** @type {number} */
  static #dot_886 = 46;
  /** @returns {number} */
  static get dot() {
    return this.#dot_886;
  }
  /** @type {number} */
  static #highControlMin_887 = 127;
  /** @returns {number} */
  static get highControlMin() {
    return this.#highControlMin_887;
  }
  /** @type {number} */
  static #highControlMax_888 = 159;
  /** @returns {number} */
  static get highControlMax() {
    return this.#highControlMax_888;
  }
  /** @type {number} */
  static #digit0_889 = 48;
  /** @returns {number} */
  static get digit0() {
    return this.#digit0_889;
  }
  /** @type {number} */
  static #digit9_890 = 57;
  /** @returns {number} */
  static get digit9() {
    return this.#digit9_890;
  }
  /** @type {number} */
  static #lowerA_891 = 97;
  /** @returns {number} */
  static get lowerA() {
    return this.#lowerA_891;
  }
  /** @type {number} */
  static #lowerZ_892 = 122;
  /** @returns {number} */
  static get lowerZ() {
    return this.#lowerZ_892;
  }
  /** @type {number} */
  static #newline_893 = 10;
  /** @returns {number} */
  static get newline() {
    return this.#newline_893;
  }
  /** @type {number} */
  static #peso_894 = 36;
  /** @returns {number} */
  static get peso() {
    return this.#peso_894;
  }
  /** @type {number} */
  static #pipe_895 = 124;
  /** @returns {number} */
  static get pipe() {
    return this.#pipe_895;
  }
  /** @type {number} */
  static #plus_896 = 43;
  /** @returns {number} */
  static get plus() {
    return this.#plus_896;
  }
  /** @type {number} */
  static #question_897 = 63;
  /** @returns {number} */
  static get question() {
    return this.#question_897;
  }
  /** @type {number} */
  static #roundLeft_898 = 40;
  /** @returns {number} */
  static get roundLeft() {
    return this.#roundLeft_898;
  }
  /** @type {number} */
  static #roundRight_899 = 41;
  /** @returns {number} */
  static get roundRight() {
    return this.#roundRight_899;
  }
  /** @type {number} */
  static #slash_900 = 47;
  /** @returns {number} */
  static get slash() {
    return this.#slash_900;
  }
  /** @type {number} */
  static #squareLeft_901 = 91;
  /** @returns {number} */
  static get squareLeft() {
    return this.#squareLeft_901;
  }
  /** @type {number} */
  static #squareRight_902 = 93;
  /** @returns {number} */
  static get squareRight() {
    return this.#squareRight_902;
  }
  /** @type {number} */
  static #star_903 = 42;
  /** @returns {number} */
  static get star() {
    return this.#star_903;
  }
  /** @type {number} */
  static #tab_904 = 9;
  /** @returns {number} */
  static get tab() {
    return this.#tab_904;
  }
  /** @type {number} */
  static #tilde_905 = 42;
  /** @returns {number} */
  static get tilde() {
    return this.#tilde_905;
  }
  /** @type {number} */
  static #upperA_906 = 65;
  /** @returns {number} */
  static get upperA() {
    return this.#upperA_906;
  }
  /** @type {number} */
  static #upperZ_907 = 90;
  /** @returns {number} */
  static get upperZ() {
    return this.#upperZ_907;
  }
  /** @type {number} */
  static #space_908 = 32;
  /** @returns {number} */
  static get space() {
    return this.#space_908;
  }
  /** @type {number} */
  static #surrogateMin_909 = 55296;
  /** @returns {number} */
  static get surrogateMin() {
    return this.#surrogateMin_909;
  }
  /** @type {number} */
  static #surrogateMax_910 = 57343;
  /** @returns {number} */
  static get surrogateMax() {
    return this.#surrogateMax_910;
  }
  /** @type {number} */
  static #supplementalMin_911 = 65536;
  /** @returns {number} */
  static get supplementalMin() {
    return this.#supplementalMin_911;
  }
  /** @type {number} */
  static #uint16Max_912 = 65535;
  /** @returns {number} */
  static get uint16Max() {
    return this.#uint16Max_912;
  }
  /** @type {number} */
  static #underscore_913 = 95;
  /** @returns {number} */
  static get underscore() {
    return this.#underscore_913;
  }
  constructor() {
    super ();
    return;
  }
};
/** @returns {Array<number>} */
export function buildEscapeNeeds_914() {
  const escapeNeeds_915 = [];
  let code_916 = 0;
  while (code_916 <= 127) {
    let t_917;
    let t_918;
    if (code_916 === Codes.dash) {
      t_918 = true;
    } else if (code_916 === Codes.space) {
      t_918 = true;
    } else if (code_916 === Codes.underscore) {
      t_918 = true;
    } else {
      let t_919;
      if (Codes.digit0 <= code_916) {
        t_919 = code_916 <= Codes.digit9;
      } else {
        t_919 = false;
      }
      if (t_919) {
        t_918 = true;
      } else {
        let t_920;
        if (Codes.upperA <= code_916) {
          t_920 = code_916 <= Codes.upperZ;
        } else {
          t_920 = false;
        }
        if (t_920) {
          t_918 = true;
        } else if (Codes.lowerA <= code_916) {
          t_918 = code_916 <= Codes.lowerZ;
        } else {
          t_918 = false;
        }
      }
    }
    if (t_918) {
      t_917 = 0;
    } else {
      let t_921;
      if (code_916 === Codes.ampersand) {
        t_921 = true;
      } else if (code_916 === Codes.backslash) {
        t_921 = true;
      } else if (code_916 === Codes.caret) {
        t_921 = true;
      } else if (code_916 === Codes.curlyLeft) {
        t_921 = true;
      } else if (code_916 === Codes.curlyRight) {
        t_921 = true;
      } else if (code_916 === Codes.dot) {
        t_921 = true;
      } else if (code_916 === Codes.peso) {
        t_921 = true;
      } else if (code_916 === Codes.pipe) {
        t_921 = true;
      } else if (code_916 === Codes.plus) {
        t_921 = true;
      } else if (code_916 === Codes.question) {
        t_921 = true;
      } else if (code_916 === Codes.roundLeft) {
        t_921 = true;
      } else if (code_916 === Codes.roundRight) {
        t_921 = true;
      } else if (code_916 === Codes.slash) {
        t_921 = true;
      } else if (code_916 === Codes.squareLeft) {
        t_921 = true;
      } else if (code_916 === Codes.squareRight) {
        t_921 = true;
      } else if (code_916 === Codes.star) {
        t_921 = true;
      } else {
        t_921 = code_916 === Codes.tilde;
      }
      if (t_921) {
        t_917 = 2;
      } else {
        t_917 = 1;
      }
    }
    listBuilderAdd_922(escapeNeeds_915, t_917);
    code_916 = code_916 + 1 | 0;
  }
  return listBuilderToList_923(escapeNeeds_915);
};
/** @type {Array<number>} */
export const escapeNeeds_818 = buildEscapeNeeds_914();
/** @type {RegexRefs} */
export const regexRefs_771 = new RegexRefs();
/** @type {Special} */
export const Begin = new BeginSpecial();
/** @type {Special} */
export const Dot = new DotSpecial();
/** @type {Special} */
export const End = new EndSpecial();
/** @type {Special} */
export const WordBoundary = new WordBoundarySpecial();
/** @type {SpecialSet} */
export const Digit = new DigitSpecial();
/** @type {SpecialSet} */
export const Space = new SpaceSpecial();
/** @type {SpecialSet} */
export const Word = new WordSpecial();
/**
 * @param {RegexNode} item_924
 * @returns {RegexNode}
 */
export function entire(item_924) {
  return new Sequence(Object.freeze([Begin, item_924, End]));
};
/**
 * @param {RegexNode} item_925
 * @param {boolean | null} [reluctant_926]
 * @returns {Repeat}
 */
export function oneOrMore(item_925, reluctant_926) {
  let reluctant_927;
  if (reluctant_926 == null) {
    reluctant_927 = false;
  } else {
    reluctant_927 = reluctant_926;
  }
  return new Repeat(item_925, 1, null, reluctant_927);
};
/**
 * @param {RegexNode} item_928
 * @param {boolean | null} [reluctant_929]
 * @returns {Repeat}
 */
export function optional(item_928, reluctant_929) {
  let reluctant_930;
  if (reluctant_929 == null) {
    reluctant_930 = false;
  } else {
    reluctant_930 = reluctant_929;
  }
  return new Repeat(item_928, 0, 1, reluctant_930);
};
