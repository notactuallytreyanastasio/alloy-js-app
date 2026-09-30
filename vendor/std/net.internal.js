import {
  type as type__646, sendRequest as sendRequest_644, panic as panic_652
} from "@temperlang/core";
export class NetRequest extends type__646() {
  /** @type {string} */
  #url_635;
  /** @type {string} */
  #method_636;
  /** @type {string | null} */
  #bodyContent_637;
  /** @type {string | null} */
  #bodyMimeType_638;
  /**
   * @param {string} content_640
   * @param {string} mimeType_641
   */
  post(content_640, mimeType_641) {
    this.#method_636 = "POST";
    this.#bodyContent_637 = content_640;
    const t_642 = this.#bodyMimeType_638;
    this.#bodyMimeType_638 = t_642;
    return;
  }
  /** @returns {globalThis.Promise<NetResponse>} */
  send() {
    return sendRequest_644(this.#url_635, this.#method_636, this.#bodyContent_637, this.#bodyMimeType_638);
  }
  /** @param {string} url_645 */
  constructor(url_645) {
    super ();
    this.#url_635 = url_645;
    this.#method_636 = "GET";
    this.#bodyContent_637 = null;
    this.#bodyMimeType_638 = null;
    return;
  }
};
export class NetResponse extends type__646() {
};
/**
 * @param {string} url_648
 * @param {string} method_649
 * @param {string | null} bodyContent_650
 * @param {string | null} bodyMimeType_651
 * @returns {globalThis.Promise<NetResponse>}
 */
export function sendRequest_647(url_648, method_649, bodyContent_650, bodyMimeType_651) {
  return panic_652();
};
