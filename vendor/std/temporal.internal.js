import {
  JsonProducer as JsonProducer_520, JsonSyntaxTree as JsonSyntaxTree_525, InterchangeContext as InterchangeContext_526, JsonAdapter as JsonAdapter_527, JsonString as JsonString_534
} from "./json.js";
import {
  type as type__528, requireInstanceOf as requireInstanceOf__535, modIntInt as modIntInt_540, stringGet as stringGet_549, stringNext as stringNext_550, stringCountBetween as stringCountBetween_552, cmpInt32 as cmpInt32_555
} from "@temperlang/core";
export class DateJsonAdapter extends type__528(JsonAdapter_527) {
  /**
   * @param {globalThis.Date} x_517
   * @param {JsonProducer_520} p_518
   */
  encodeToJson(x_517, p_518) {
    encodeToJson_519(x_517, p_518);
    return;
  }
  /**
   * @param {JsonSyntaxTree_525} t_522
   * @param {InterchangeContext_526} ic_523
   * @returns {globalThis.Date}
   */
  decodeFromJson(t_522, ic_523) {
    return decodeFromJson_524(t_522, ic_523);
  }
  constructor() {
    super ();
    return;
  }
};
// Type `std/temporal/`.Date connected to globalThis.Date
/**
 * @param {globalThis.Date} this_529
 * @param {JsonProducer_520} p_530
 */
export function encodeToJson_519(this_529, p_530) {
  p_530.stringValue(this_529.toISOString().split("T")[0]);
  return;
};
/**
 * @param {JsonSyntaxTree_525} t_531
 * @param {InterchangeContext_526} ic_532
 * @returns {globalThis.Date}
 */
export function decodeFromJson_524(t_531, ic_532) {
  const t_533 = requireInstanceOf__535(t_531, JsonString_534);
  return new (globalThis.Date)(globalThis.Date.parse(t_533.content));
};
/** @returns {JsonAdapter_527<globalThis.Date>} */
export function jsonAdapter_536() {
  return new DateJsonAdapter();
};
/** @type {Array<number>} */
export const daysInMonth_537 = Object.freeze([0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
/**
 * @param {number} year_539
 * @returns {boolean}
 */
export function isLeapYear_538(year_539) {
  if (modIntInt_540(year_539, 4) === 0) {
    if (!(modIntInt_540(year_539, 100) === 0)) {
      return true;
    } else {
      return modIntInt_540(year_539, 400) === 0;
    }
  } else {
    return false;
  }
};
/**
 * @param {number} minWidth_542
 * @param {number} num_543
 * @param {globalThis.Array<string>} sb_544
 */
export function padTo_541(minWidth_542, num_543, sb_544) {
  const decimal_545 = num_543.toString(10);
  let decimalIndex_546 = 0;
  const decimalEnd_547 = decimal_545.length;
  let t_548;
  if (decimalIndex_546 < decimalEnd_547) {
    t_548 = stringGet_549(decimal_545, decimalIndex_546) === 45;
  } else {
    t_548 = false;
  }
  if (t_548) {
    void (sb_544[0] += "-");
    decimalIndex_546 = stringNext_550(decimal_545, decimalIndex_546);
  }
  let nNeeded_551 = minWidth_542 - stringCountBetween_552(decimal_545, decimalIndex_546, decimalEnd_547) | 0;
  while (nNeeded_551 > 0) {
    void (sb_544[0] += "0");
    nNeeded_551 = nNeeded_551 - 1 | 0;
  }
  void (sb_544[0] += decimal_545.substring(decimalIndex_546, decimalEnd_547));
  return;
};
/** @type {Array<number>} */
export const dayOfWeekLookupTableLeapy_553 = Object.freeze([0, 0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]);
/** @type {Array<number>} */
export const dayOfWeekLookupTableNotLeapy_554 = Object.freeze([0, 0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]);
