import {
  strict as strict__566
} from "assert";
import {
  type as type__579, listBuilderAdd as listBuilderAdd_560, listBuilderToList as listBuilderToList_570, listedJoin as listedJoin_577, pairConstructor as pairConstructor_592, listedMap as listedMap_593, stringGet as stringGet_603, cmpInt32 as cmpInt32_634, stringNext as stringNext_607, listedReduceFrom as listedReduceFrom_616, listedGet as listedGet_620
} from "@temperlang/core";
export class Test extends type__579() {
  /**
   * @param {boolean} success_557
   * @param {() => string} message_558
   */
  assert(success_557, message_558) {
    if (! success_557) {
      this.#_passing_559 = false;
      listBuilderAdd_560(this.#_messages_561, message_558());
    }
    return;
  }
  /**
   * @param {boolean} success_563
   * @param {() => string} message_564
   * @returns {void}
   */
  assertHard(success_563, message_564) {
    this.assert(success_563, message_564);
    if (! success_563) {
      this.#_failedOnAssert_565 = true;
      strict__566.fail(this.messagesCombined());
    }
    return;
  }
  /** @returns {void} */
  softFailToHard() {
    if (this.hasUnhandledFail) {
      this.#_failedOnAssert_565 = true;
      strict__566.fail(this.messagesCombined());
    }
    return;
  }
  /** @returns {boolean} */
  get passing() {
    return this.#_passing_559;
  }
  /** @returns {Array<string>} */
  messages() {
    return listBuilderToList_570(this.#_messages_561);
  }
  /** @returns {boolean} */
  get failedOnAssert() {
    return this.#_failedOnAssert_565;
  }
  /** @returns {boolean} */
  get hasUnhandledFail() {
    let t_573;
    if (this.#_failedOnAssert_565) {
      t_573 = true;
    } else {
      t_573 = this.#_passing_559;
    }
    return ! t_573;
  }
  /** @returns {string | null} */
  messagesCombined() {
    if (! this.#_messages_561.length) {
      return null;
    } else {
      function fn_575(it_576) {
        return it_576;
      }
      return listedJoin_577(this.#_messages_561, ", ", fn_575);
    }
  }
  /** @type {boolean} */
  #_failedOnAssert_565;
  /** @type {boolean} */
  #_passing_559;
  /** @type {Array<string>} */
  #_messages_561;
  constructor() {
    super ();
    this.#_failedOnAssert_565 = false;
    this.#_passing_559 = true;
    const t_578 = [];
    this.#_messages_561 = t_578;
    return;
  }
};
/**
 * @param {Array<Pair_594<string, (arg0: Test) => void>>} testCases_580
 * @returns {Array<Pair_594<string, Array<string>>>}
 */
export function processTestCases(testCases_580) {
  function fn_581(testCase_582) {
    const key_583 = testCase_582.key;
    const fun_584 = testCase_582.value;
    const test_585 = new Test();
    let hadBubble_586 = false;
    try {
      fun_584(test_585);
    } catch {
      hadBubble_586 = true;
    }
    const messages_587 = test_585.messages();
    let failures_588;
    let t_589;
    if (test_585.passing) {
      t_589 = ! hadBubble_586;
    } else {
      t_589 = false;
    }
    if (t_589) {
      failures_588 = Object.freeze([]);
    } else {
      let t_590;
      if (hadBubble_586) {
        t_590 = ! test_585.failedOnAssert;
      } else {
        t_590 = false;
      }
      if (t_590) {
        const allMessages_591 = messages_587.slice();
        listBuilderAdd_560(allMessages_591, "Bubble");
        failures_588 = listBuilderToList_570(allMessages_591);
      } else {
        failures_588 = messages_587;
      }
    }
    return pairConstructor_592(key_583, failures_588);
  }
  return listedMap_593(testCases_580, fn_581);
};
/**
 * @param {string} s_596
 * @returns {string}
 */
export function escapeXml_595(s_596) {
  const sb_597 = [""];
  const end_598 = s_596.length;
  let emitted_599 = 0;
  let i_600 = 0;
  while (i_600 < end_598) {
    continue_601: {
      const c_602 = stringGet_603(s_596, i_600);
      let esc_604;
      switch (c_602) {
        case 38:
          {
          esc_604 = "&amp;";
        }
        break;
        case 60:
          {
          esc_604 = "&lt;";
        }
        break;
        case 62:
          {
          esc_604 = "&gt;";
        }
        break;
        case 39:
          {
          esc_604 = "&#39;";
        }
        break;
        case 34:
          {
          esc_604 = "&#34;";
        }
        break;
        default:
          {
          let t_605;
          switch (c_602) {
            case 10:
              {
              t_605 = true;
            }
            break;
            case 13:
              {
              t_605 = true;
            }
            break;
            default:
              {
              t_605 = c_602 === 9;
            }
          }
          if (t_605) {
            break continue_601;
          } else {
            let t_606;
            if (c_602 < 32) {
              t_606 = true;
            } else if (c_602 === 65534) {
              t_606 = true;
            } else {
              t_606 = c_602 === 65535;
            }
            if (t_606) {
              esc_604 = "[0x" + c_602.toString(16) + "]";
            } else {
              break continue_601;
            }
          }
        }
      }
      void (sb_597[0] += s_596.substring(emitted_599, i_600));
      void (sb_597[0] += esc_604);
      emitted_599 = stringNext_607(s_596, i_600);
    }
    i_600 = stringNext_607(s_596, i_600);
  }
  if (emitted_599 === 0) {
    return s_596;
  } else {
    void (sb_597[0] += s_596.substring(emitted_599, end_598));
    return sb_597[0];
  }
};
/**
 * @param {Array<Pair_594<string, Array<string>>>} testResults_608
 * @param {(arg0: string) => void} writeLine_609
 */
export function reportTestResults(testResults_608, writeLine_609) {
  writeLine_609("<testsuites>");
  const total_610 = testResults_608.length.toString();
  function fn_611(fails_612, testResult_613) {
    let t_614;
    if (! testResult_613.value.length) {
      t_614 = 0;
    } else {
      t_614 = 1;
    }
    return fails_612 + t_614 | 0;
  }
  const fails_615 = listedReduceFrom_616(testResults_608, 0, fn_611).toString();
  const totals_617 = "tests='" + total_610 + "' failures='" + fails_615 + "'";
  writeLine_609("  <testsuite name='suite' " + totals_617 + " time='0.0'>");
  let i_618 = 0;
  while (i_618 < testResults_608.length) {
    const testResult_619 = listedGet_620(testResults_608, i_618);
    const failureMessages_621 = testResult_619.value;
    const name_622 = escapeXml_595(testResult_619.key);
    const basics_623 = "name='" + name_622 + "' classname='" + name_622 + "' time='0.0'";
    if (! failureMessages_621.length) {
      writeLine_609("    <testcase " + basics_623 + " />");
    } else {
      writeLine_609("    <testcase " + basics_623 + ">");
      function fn_624(it_625) {
        return it_625;
      }
      const message_626 = escapeXml_595(listedJoin_577(failureMessages_621, ", ", fn_624));
      writeLine_609("      <failure message='" + message_626 + "' />");
      writeLine_609("    <\/testcase>");
    }
    i_618 = i_618 + 1 | 0;
  }
  writeLine_609("  <\/testsuite>");
  writeLine_609("<\/testsuites>");
  return;
};
/**
 * @param {Array<Pair_594<string, (arg0: Test) => void>>} testCases_627
 * @returns {string}
 */
export function runTestCases(testCases_627) {
  const report_628 = [""];
  function fn_629(line_630) {
    void (report_628[0] += line_630);
    void (report_628[0] += "\n");
    return;
  }
  reportTestResults(processTestCases(testCases_627), fn_629);
  return report_628[0];
};
/**
 * @param {(arg0: Test) => void} testFun_631
 * @returns {void}
 */
export function runTest(testFun_631) {
  const test_632 = new Test();
  try {
    testFun_631(test_632);
  } catch {
    function fn_633() {
      return "bubble during test running";
    }
    test_632.assert(false, fn_633);
  }
  test_632.softFailToHard();
  return;
};
