import {
  Test as Test_842
} from "@temperlang/std/testing";
import {
  safeIdentifier, SafeIdentifier, TableDef, FieldDef, StringField, IntField, FloatField, BoolField, changeset, NumberValidationOpts, SqlDefault, timestamps, deleteSql, Int64Field, DateField, from, SqlBuilder, col, SqlInt32, SqlString, countAll, countCol, sumCol, avgCol, minCol, maxCol, unionSql, unionAllSql, intersectSql, exceptSql, subquery, existsSql, update, SqlBoolean, deleteFrom, NullsFirst, NullsLast, ForUpdate, ForShare
} from "../src.internal.js";
import {
  panic as panic_839, mapConstructor as mapConstructor_770, pairConstructor as pairConstructor_844, listedGet as listedGet_99, mappedGetOr as mappedGetOr_102, listBuilderAdd as listBuilderAdd_89, listBuilderToList as listBuilderToList_90
} from "@temperlang/core";
/**
 * @param {string} name_838
 * @returns {SafeIdentifier}
 */
function csid_837(name_838) {
  try {
    return safeIdentifier(name_838);
  } catch {
    return panic_839();
  }
}
/** @returns {TableDef} */
function userTable_840() {
  return new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("name"), new StringField(), false, null, false), new FieldDef(csid_837("email"), new StringField(), false, null, false), new FieldDef(csid_837("age"), new IntField(), true, null, false), new FieldDef(csid_837("score"), new FloatField(), true, null, false), new FieldDef(csid_837("active"), new BoolField(), true, null, false)]), null);
}
it("cast whitelists allowed fields", function () {
    const test_841 = new Test_842();
    try {
      const params_843 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("email", "alice@example.com"), pairConstructor_844("admin", "true")]));
      const cs_845 = changeset(userTable_840(), params_843).cast(Object.freeze([csid_837("name"), csid_837("email")]));
      function fn_846() {
        return "name should be in changes";
      }
      test_841.assert(cs_845.changes.has("name"), fn_846);
      function fn_847() {
        return "email should be in changes";
      }
      test_841.assert(cs_845.changes.has("email"), fn_847);
      function fn_848() {
        return "admin must be dropped (not in whitelist)";
      }
      test_841.assert(! cs_845.changes.has("admin"), fn_848);
      function fn_849() {
        return "should still be valid";
      }
      test_841.assert(cs_845.isValid, fn_849);
      return;
    } finally {
      test_841.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_850 = new Test_842();
    try {
      const params_851 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("email", "alice@example.com")]));
      const cs_852 = changeset(userTable_840(), params_851).cast(Object.freeze([csid_837("name")])).cast(Object.freeze([csid_837("email")]));
      function fn_853() {
        return "name must be excluded by second cast";
      }
      test_850.assert(! cs_852.changes.has("name"), fn_853);
      function fn_854() {
        return "email should be present";
      }
      test_850.assert(cs_852.changes.has("email"), fn_854);
      return;
    } finally {
      test_850.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_855 = new Test_842();
    try {
      const params_856 = mapConstructor_770(Object.freeze([pairConstructor_844("name", ""), pairConstructor_844("email", "bob@example.com")]));
      const cs_857 = changeset(userTable_840(), params_856).cast(Object.freeze([csid_837("name"), csid_837("email")]));
      function fn_858() {
        return "empty name should not be in changes";
      }
      test_855.assert(! cs_857.changes.has("name"), fn_858);
      function fn_859() {
        return "email should be in changes";
      }
      test_855.assert(cs_857.changes.has("email"), fn_859);
      return;
    } finally {
      test_855.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_860 = new Test_842();
    try {
      const params_861 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice")]));
      const cs_862 = changeset(userTable_840(), params_861).cast(Object.freeze([csid_837("name")])).validateRequired(Object.freeze([csid_837("name")]));
      function fn_863() {
        return "should be valid";
      }
      test_860.assert(cs_862.isValid, fn_863);
      function fn_864() {
        return "no errors expected";
      }
      test_860.assert(cs_862.errors.length === 0, fn_864);
      return;
    } finally {
      test_860.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_865 = new Test_842();
    try {
      const params_866 = mapConstructor_770(Object.freeze([]));
      const cs_867 = changeset(userTable_840(), params_866).cast(Object.freeze([csid_837("name")])).validateRequired(Object.freeze([csid_837("name")]));
      function fn_868() {
        return "should be invalid";
      }
      test_865.assert(! cs_867.isValid, fn_868);
      function fn_869() {
        return "should have one error";
      }
      test_865.assert(cs_867.errors.length === 1, fn_869);
      function fn_870() {
        return "error should name the field";
      }
      test_865.assert(listedGet_99(cs_867.errors, 0).field === "name", fn_870);
      return;
    } finally {
      test_865.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_871 = new Test_842();
    try {
      const params_872 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice")]));
      const cs_873 = changeset(userTable_840(), params_872).cast(Object.freeze([csid_837("name")])).validateLength(csid_837("name"), 2, 50);
      function fn_874() {
        return "should be valid";
      }
      test_871.assert(cs_873.isValid, fn_874);
      return;
    } finally {
      test_871.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_875 = new Test_842();
    try {
      const params_876 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "A")]));
      const cs_877 = changeset(userTable_840(), params_876).cast(Object.freeze([csid_837("name")])).validateLength(csid_837("name"), 2, 50);
      function fn_878() {
        return "should be invalid";
      }
      test_875.assert(! cs_877.isValid, fn_878);
      return;
    } finally {
      test_875.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_879 = new Test_842();
    try {
      const params_880 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      const cs_881 = changeset(userTable_840(), params_880).cast(Object.freeze([csid_837("name")])).validateLength(csid_837("name"), 2, 10);
      function fn_882() {
        return "should be invalid";
      }
      test_879.assert(! cs_881.isValid, fn_882);
      return;
    } finally {
      test_879.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_883 = new Test_842();
    try {
      const params_884 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "30")]));
      const cs_885 = changeset(userTable_840(), params_884).cast(Object.freeze([csid_837("age")])).validateInt(csid_837("age"));
      function fn_886() {
        return "should be valid";
      }
      test_883.assert(cs_885.isValid, fn_886);
      return;
    } finally {
      test_883.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_887 = new Test_842();
    try {
      const params_888 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "not-a-number")]));
      const cs_889 = changeset(userTable_840(), params_888).cast(Object.freeze([csid_837("age")])).validateInt(csid_837("age"));
      function fn_890() {
        return "should be invalid";
      }
      test_887.assert(! cs_889.isValid, fn_890);
      return;
    } finally {
      test_887.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_891 = new Test_842();
    try {
      const params_892 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "9.5")]));
      const cs_893 = changeset(userTable_840(), params_892).cast(Object.freeze([csid_837("score")])).validateFloat(csid_837("score"));
      function fn_894() {
        return "should be valid";
      }
      test_891.assert(cs_893.isValid, fn_894);
      return;
    } finally {
      test_891.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_895 = new Test_842();
    try {
      const params_896 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "9999999999")]));
      const cs_897 = changeset(userTable_840(), params_896).cast(Object.freeze([csid_837("age")])).validateInt64(csid_837("age"));
      function fn_898() {
        return "should be valid";
      }
      test_895.assert(cs_897.isValid, fn_898);
      return;
    } finally {
      test_895.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_899 = new Test_842();
    try {
      const params_900 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "not-a-number")]));
      const cs_901 = changeset(userTable_840(), params_900).cast(Object.freeze([csid_837("age")])).validateInt64(csid_837("age"));
      function fn_902() {
        return "should be invalid";
      }
      test_899.assert(! cs_901.isValid, fn_902);
      return;
    } finally {
      test_899.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_903 = new Test_842();
    try {
      const this_904 = Object.freeze(["true", "1", "yes", "on"]);
      const n_905 = this_904.length;
      let i_906 = 0;
      while (i_906 < n_905) {
        const el_907 = listedGet_99(this_904, i_906);
        i_906 = i_906 + 1 | 0;
        const v_908 = el_907;
        const params_909 = mapConstructor_770(Object.freeze([pairConstructor_844("active", v_908)]));
        const cs_910 = changeset(userTable_840(), params_909).cast(Object.freeze([csid_837("active")])).validateBool(csid_837("active"));
        function fn_911() {
          return "should accept: " + v_908;
        }
        test_903.assert(cs_910.isValid, fn_911);
      }
      return;
    } finally {
      test_903.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_912 = new Test_842();
    try {
      const this_913 = Object.freeze(["false", "0", "no", "off"]);
      const n_914 = this_913.length;
      let i_915 = 0;
      while (i_915 < n_914) {
        const el_916 = listedGet_99(this_913, i_915);
        i_915 = i_915 + 1 | 0;
        const v_917 = el_916;
        const params_918 = mapConstructor_770(Object.freeze([pairConstructor_844("active", v_917)]));
        const cs_919 = changeset(userTable_840(), params_918).cast(Object.freeze([csid_837("active")])).validateBool(csid_837("active"));
        function fn_920() {
          return "should accept: " + v_917;
        }
        test_912.assert(cs_919.isValid, fn_920);
      }
      return;
    } finally {
      test_912.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_921 = new Test_842();
    try {
      const this_922 = Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]);
      const n_923 = this_922.length;
      let i_924 = 0;
      while (i_924 < n_923) {
        const el_925 = listedGet_99(this_922, i_924);
        i_924 = i_924 + 1 | 0;
        const v_926 = el_925;
        const params_927 = mapConstructor_770(Object.freeze([pairConstructor_844("active", v_926)]));
        const cs_928 = changeset(userTable_840(), params_927).cast(Object.freeze([csid_837("active")])).validateBool(csid_837("active"));
        function fn_929() {
          return "should reject ambiguous: " + v_926;
        }
        test_921.assert(! cs_928.isValid, fn_929);
      }
      return;
    } finally {
      test_921.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_930 = new Test_842();
    try {
      const params_931 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Robert'); DROP TABLE users;--"), pairConstructor_844("email", "bobby@evil.com")]));
      const cs_932 = changeset(userTable_840(), params_931).cast(Object.freeze([csid_837("name"), csid_837("email")])).validateRequired(Object.freeze([csid_837("name"), csid_837("email")]));
      let sqlFrag_933;
      try {
        sqlFrag_933 = cs_932.toInsertSql();
      } catch {
        sqlFrag_933 = panic_839();
      }
      const s_934 = sqlFrag_933.toString();
      const t_935 = s_934.indexOf("''") >= 0;
      function fn_936() {
        return "single quote must be doubled: " + s_934;
      }
      test_930.assert(t_935, fn_936);
      return;
    } finally {
      test_930.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_937 = new Test_842();
    try {
      const params_938 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("email", "a@example.com")]));
      const cs_939 = changeset(userTable_840(), params_938).cast(Object.freeze([csid_837("name"), csid_837("email")])).validateRequired(Object.freeze([csid_837("name"), csid_837("email")]));
      let sqlFrag_940;
      try {
        sqlFrag_940 = cs_939.toInsertSql();
      } catch {
        sqlFrag_940 = panic_839();
      }
      const s_941 = sqlFrag_940.toString();
      const t_942 = s_941.indexOf("INSERT INTO users") >= 0;
      function fn_943() {
        return "has INSERT INTO: " + s_941;
      }
      test_937.assert(t_942, fn_943);
      const t_944 = s_941.indexOf("'Alice'") >= 0;
      function fn_945() {
        return "has quoted name: " + s_941;
      }
      test_937.assert(t_944, fn_945);
      return;
    } finally {
      test_937.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_946 = new Test_842();
    try {
      const params_947 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Bob"), pairConstructor_844("email", "b@example.com"), pairConstructor_844("age", "25")]));
      const cs_948 = changeset(userTable_840(), params_947).cast(Object.freeze([csid_837("name"), csid_837("email"), csid_837("age")])).validateRequired(Object.freeze([csid_837("name"), csid_837("email")]));
      let sqlFrag_949;
      try {
        sqlFrag_949 = cs_948.toInsertSql();
      } catch {
        sqlFrag_949 = panic_839();
      }
      const s_950 = sqlFrag_949.toString();
      const t_951 = s_950.indexOf("25") >= 0;
      function fn_952() {
        return "age rendered unquoted: " + s_950;
      }
      test_946.assert(t_951, fn_952);
      return;
    } finally {
      test_946.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_953 = new Test_842();
    try {
      const params_954 = mapConstructor_770(Object.freeze([]));
      const cs_955 = changeset(userTable_840(), params_954).cast(Object.freeze([csid_837("name")])).validateRequired(Object.freeze([csid_837("name")]));
      let didBubble_956;
      try {
        cs_955.toInsertSql();
        didBubble_956 = false;
      } catch {
        didBubble_956 = true;
      }
      function fn_957() {
        return "invalid changeset should bubble";
      }
      test_953.assert(didBubble_956, fn_957);
      return;
    } finally {
      test_953.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_958 = new Test_842();
    try {
      const strictTable_959 = new TableDef(csid_837("posts"), Object.freeze([new FieldDef(csid_837("title"), new StringField(), false, null, false), new FieldDef(csid_837("body"), new StringField(), true, null, false)]), null);
      const params_960 = mapConstructor_770(Object.freeze([pairConstructor_844("body", "hello")]));
      const cs_961 = changeset(strictTable_959, params_960).cast(Object.freeze([csid_837("body")]));
      function fn_962() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_958.assert(cs_961.isValid, fn_962);
      let didBubble_963;
      try {
        cs_961.toInsertSql();
        didBubble_963 = false;
      } catch {
        didBubble_963 = true;
      }
      function fn_964() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_958.assert(didBubble_963, fn_964);
      return;
    } finally {
      test_958.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_965 = new Test_842();
    try {
      const params_966 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Bob")]));
      const cs_967 = changeset(userTable_840(), params_966).cast(Object.freeze([csid_837("name")])).validateRequired(Object.freeze([csid_837("name")]));
      let sqlFrag_968;
      try {
        sqlFrag_968 = cs_967.toUpdateSql(42);
      } catch {
        sqlFrag_968 = panic_839();
      }
      const s_969 = sqlFrag_968.toString();
      function fn_970() {
        return "got: " + s_969;
      }
      test_965.assert(s_969 === "UPDATE users SET name = 'Bob' WHERE id = 42", fn_970);
      return;
    } finally {
      test_965.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_971 = new Test_842();
    try {
      const params_972 = mapConstructor_770(Object.freeze([]));
      const cs_973 = changeset(userTable_840(), params_972).cast(Object.freeze([csid_837("name")])).validateRequired(Object.freeze([csid_837("name")]));
      let didBubble_974;
      try {
        cs_973.toUpdateSql(1);
        didBubble_974 = false;
      } catch {
        didBubble_974 = true;
      }
      function fn_975() {
        return "invalid changeset should bubble";
      }
      test_971.assert(didBubble_974, fn_975);
      return;
    } finally {
      test_971.softFailToHard();
    }
});
it("putChange adds a new field", function () {
    const test_976 = new Test_842();
    try {
      const params_977 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice")]));
      const cs_978 = changeset(userTable_840(), params_977).cast(Object.freeze([csid_837("name")])).putChange(csid_837("email"), "alice@example.com");
      function fn_979() {
        return "email should be in changes";
      }
      test_976.assert(cs_978.changes.has("email"), fn_979);
      function fn_980() {
        return "email value";
      }
      test_976.assert(mappedGetOr_102(cs_978.changes, "email", "") === "alice@example.com", fn_980);
      return;
    } finally {
      test_976.softFailToHard();
    }
});
it("putChange overwrites existing field", function () {
    const test_981 = new Test_842();
    try {
      const params_982 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice")]));
      const cs_983 = changeset(userTable_840(), params_982).cast(Object.freeze([csid_837("name")])).putChange(csid_837("name"), "Bob");
      function fn_984() {
        return "name should be overwritten";
      }
      test_981.assert(mappedGetOr_102(cs_983.changes, "name", "") === "Bob", fn_984);
      return;
    } finally {
      test_981.softFailToHard();
    }
});
it("putChange value appears in toInsertSql", function () {
    const test_985 = new Test_842();
    try {
      let t_986;
      const params_987 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("email", "a@example.com")]));
      const cs_988 = changeset(userTable_840(), params_987).cast(Object.freeze([csid_837("name"), csid_837("email")])).putChange(csid_837("name"), "Bob");
      try {
        t_986 = cs_988.toInsertSql();
      } catch {
        t_986 = panic_839();
      }
      const s_989 = t_986.toString();
      const t_990 = s_989.indexOf("'Bob'") >= 0;
      function fn_991() {
        return "should use putChange value: " + s_989;
      }
      test_985.assert(t_990, fn_991);
      return;
    } finally {
      test_985.softFailToHard();
    }
});
it("getChange returns value for existing field", function () {
    const test_992 = new Test_842();
    try {
      const params_993 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice")]));
      const cs_994 = changeset(userTable_840(), params_993).cast(Object.freeze([csid_837("name")]));
      let val_995;
      try {
        val_995 = cs_994.getChange(csid_837("name"));
      } catch {
        val_995 = panic_839();
      }
      function fn_996() {
        return "should return Alice";
      }
      test_992.assert(val_995 === "Alice", fn_996);
      return;
    } finally {
      test_992.softFailToHard();
    }
});
it("getChange bubbles on missing field", function () {
    const test_997 = new Test_842();
    try {
      const params_998 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice")]));
      const cs_999 = changeset(userTable_840(), params_998).cast(Object.freeze([csid_837("name")]));
      let didBubble_1000;
      try {
        cs_999.getChange(csid_837("email"));
        didBubble_1000 = false;
      } catch {
        didBubble_1000 = true;
      }
      function fn_1001() {
        return "should bubble for missing field";
      }
      test_997.assert(didBubble_1000, fn_1001);
      return;
    } finally {
      test_997.softFailToHard();
    }
});
it("deleteChange removes field", function () {
    const test_1002 = new Test_842();
    try {
      const params_1003 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("email", "a@example.com")]));
      const cs_1004 = changeset(userTable_840(), params_1003).cast(Object.freeze([csid_837("name"), csid_837("email")])).deleteChange(csid_837("email"));
      function fn_1005() {
        return "email should be removed";
      }
      test_1002.assert(! cs_1004.changes.has("email"), fn_1005);
      function fn_1006() {
        return "name should remain";
      }
      test_1002.assert(cs_1004.changes.has("name"), fn_1006);
      return;
    } finally {
      test_1002.softFailToHard();
    }
});
it("deleteChange on nonexistent field is no-op", function () {
    const test_1007 = new Test_842();
    try {
      const params_1008 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice")]));
      const cs_1009 = changeset(userTable_840(), params_1008).cast(Object.freeze([csid_837("name")])).deleteChange(csid_837("email"));
      function fn_1010() {
        return "name should still be present";
      }
      test_1007.assert(cs_1009.changes.has("name"), fn_1010);
      function fn_1011() {
        return "should still be valid";
      }
      test_1007.assert(cs_1009.isValid, fn_1011);
      return;
    } finally {
      test_1007.softFailToHard();
    }
});
it("validateInclusion passes when value in list", function () {
    const test_1012 = new Test_842();
    try {
      const params_1013 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "admin")]));
      const cs_1014 = changeset(userTable_840(), params_1013).cast(Object.freeze([csid_837("name")])).validateInclusion(csid_837("name"), Object.freeze(["admin", "user", "guest"]));
      function fn_1015() {
        return "should be valid";
      }
      test_1012.assert(cs_1014.isValid, fn_1015);
      return;
    } finally {
      test_1012.softFailToHard();
    }
});
it("validateInclusion fails when value not in list", function () {
    const test_1016 = new Test_842();
    try {
      const params_1017 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "hacker")]));
      const cs_1018 = changeset(userTable_840(), params_1017).cast(Object.freeze([csid_837("name")])).validateInclusion(csid_837("name"), Object.freeze(["admin", "user", "guest"]));
      function fn_1019() {
        return "should be invalid";
      }
      test_1016.assert(! cs_1018.isValid, fn_1019);
      function fn_1020() {
        return "error on name";
      }
      test_1016.assert(listedGet_99(cs_1018.errors, 0).field === "name", fn_1020);
      return;
    } finally {
      test_1016.softFailToHard();
    }
});
it("validateInclusion skips when field not in changes", function () {
    const test_1021 = new Test_842();
    try {
      const params_1022 = mapConstructor_770(Object.freeze([]));
      const cs_1023 = changeset(userTable_840(), params_1022).cast(Object.freeze([csid_837("name")])).validateInclusion(csid_837("name"), Object.freeze(["admin", "user"]));
      function fn_1024() {
        return "should be valid when field absent";
      }
      test_1021.assert(cs_1023.isValid, fn_1024);
      return;
    } finally {
      test_1021.softFailToHard();
    }
});
it("validateExclusion passes when value not in list", function () {
    const test_1025 = new Test_842();
    try {
      const params_1026 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice")]));
      const cs_1027 = changeset(userTable_840(), params_1026).cast(Object.freeze([csid_837("name")])).validateExclusion(csid_837("name"), Object.freeze(["root", "admin", "superuser"]));
      function fn_1028() {
        return "should be valid";
      }
      test_1025.assert(cs_1027.isValid, fn_1028);
      return;
    } finally {
      test_1025.softFailToHard();
    }
});
it("validateExclusion fails when value in list", function () {
    const test_1029 = new Test_842();
    try {
      const params_1030 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "admin")]));
      const cs_1031 = changeset(userTable_840(), params_1030).cast(Object.freeze([csid_837("name")])).validateExclusion(csid_837("name"), Object.freeze(["root", "admin", "superuser"]));
      function fn_1032() {
        return "should be invalid";
      }
      test_1029.assert(! cs_1031.isValid, fn_1032);
      function fn_1033() {
        return "error on name";
      }
      test_1029.assert(listedGet_99(cs_1031.errors, 0).field === "name", fn_1033);
      return;
    } finally {
      test_1029.softFailToHard();
    }
});
it("validateExclusion skips when field not in changes", function () {
    const test_1034 = new Test_842();
    try {
      const params_1035 = mapConstructor_770(Object.freeze([]));
      const cs_1036 = changeset(userTable_840(), params_1035).cast(Object.freeze([csid_837("name")])).validateExclusion(csid_837("name"), Object.freeze(["root", "admin"]));
      function fn_1037() {
        return "should be valid when field absent";
      }
      test_1034.assert(cs_1036.isValid, fn_1037);
      return;
    } finally {
      test_1034.softFailToHard();
    }
});
it("validateNumber greaterThan passes", function () {
    const test_1038 = new Test_842();
    try {
      const params_1039 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "25")]));
      const cs_1040 = changeset(userTable_840(), params_1039).cast(Object.freeze([csid_837("age")])).validateNumber(csid_837("age"), new NumberValidationOpts(18.0, null, null, null, null));
      function fn_1041() {
        return "25 > 18 should pass";
      }
      test_1038.assert(cs_1040.isValid, fn_1041);
      return;
    } finally {
      test_1038.softFailToHard();
    }
});
it("validateNumber greaterThan fails", function () {
    const test_1042 = new Test_842();
    try {
      const params_1043 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "15")]));
      const cs_1044 = changeset(userTable_840(), params_1043).cast(Object.freeze([csid_837("age")])).validateNumber(csid_837("age"), new NumberValidationOpts(18.0, null, null, null, null));
      function fn_1045() {
        return "15 > 18 should fail";
      }
      test_1042.assert(! cs_1044.isValid, fn_1045);
      return;
    } finally {
      test_1042.softFailToHard();
    }
});
it("validateNumber lessThan passes", function () {
    const test_1046 = new Test_842();
    try {
      const params_1047 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "8.5")]));
      const cs_1048 = changeset(userTable_840(), params_1047).cast(Object.freeze([csid_837("score")])).validateNumber(csid_837("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      function fn_1049() {
        return "8.5 < 10 should pass";
      }
      test_1046.assert(cs_1048.isValid, fn_1049);
      return;
    } finally {
      test_1046.softFailToHard();
    }
});
it("validateNumber lessThan fails", function () {
    const test_1050 = new Test_842();
    try {
      const params_1051 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "12.0")]));
      const cs_1052 = changeset(userTable_840(), params_1051).cast(Object.freeze([csid_837("score")])).validateNumber(csid_837("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      function fn_1053() {
        return "12 < 10 should fail";
      }
      test_1050.assert(! cs_1052.isValid, fn_1053);
      return;
    } finally {
      test_1050.softFailToHard();
    }
});
it("validateNumber greaterThanOrEqual boundary", function () {
    const test_1054 = new Test_842();
    try {
      const params_1055 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "18")]));
      const cs_1056 = changeset(userTable_840(), params_1055).cast(Object.freeze([csid_837("age")])).validateNumber(csid_837("age"), new NumberValidationOpts(null, null, 18.0, null, null));
      function fn_1057() {
        return "18 >= 18 should pass";
      }
      test_1054.assert(cs_1056.isValid, fn_1057);
      return;
    } finally {
      test_1054.softFailToHard();
    }
});
it("validateNumber combined options", function () {
    const test_1058 = new Test_842();
    try {
      const params_1059 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "5.0")]));
      const cs_1060 = changeset(userTable_840(), params_1059).cast(Object.freeze([csid_837("score")])).validateNumber(csid_837("score"), new NumberValidationOpts(0.0, 10.0, null, null, null));
      function fn_1061() {
        return "5 > 0 and < 10 should pass";
      }
      test_1058.assert(cs_1060.isValid, fn_1061);
      return;
    } finally {
      test_1058.softFailToHard();
    }
});
it("validateNumber non-numeric value", function () {
    const test_1062 = new Test_842();
    try {
      const params_1063 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "abc")]));
      const cs_1064 = changeset(userTable_840(), params_1063).cast(Object.freeze([csid_837("age")])).validateNumber(csid_837("age"), new NumberValidationOpts(0.0, null, null, null, null));
      function fn_1065() {
        return "non-numeric should fail";
      }
      test_1062.assert(! cs_1064.isValid, fn_1065);
      function fn_1066() {
        return "correct error message";
      }
      test_1062.assert(listedGet_99(cs_1064.errors, 0).message === "must be a number", fn_1066);
      return;
    } finally {
      test_1062.softFailToHard();
    }
});
it("validateNumber skips when field not in changes", function () {
    const test_1067 = new Test_842();
    try {
      const params_1068 = mapConstructor_770(Object.freeze([]));
      const cs_1069 = changeset(userTable_840(), params_1068).cast(Object.freeze([csid_837("age")])).validateNumber(csid_837("age"), new NumberValidationOpts(0.0, null, null, null, null));
      function fn_1070() {
        return "should be valid when field absent";
      }
      test_1067.assert(cs_1069.isValid, fn_1070);
      return;
    } finally {
      test_1067.softFailToHard();
    }
});
it("validateAcceptance passes for true values", function () {
    const test_1071 = new Test_842();
    try {
      const this_1072 = Object.freeze(["true", "1", "yes", "on"]);
      const n_1073 = this_1072.length;
      let i_1074 = 0;
      while (i_1074 < n_1073) {
        const el_1075 = listedGet_99(this_1072, i_1074);
        i_1074 = i_1074 + 1 | 0;
        const v_1076 = el_1075;
        const params_1077 = mapConstructor_770(Object.freeze([pairConstructor_844("active", v_1076)]));
        const cs_1078 = changeset(userTable_840(), params_1077).cast(Object.freeze([csid_837("active")])).validateAcceptance(csid_837("active"));
        function fn_1079() {
          return "should accept: " + v_1076;
        }
        test_1071.assert(cs_1078.isValid, fn_1079);
      }
      return;
    } finally {
      test_1071.softFailToHard();
    }
});
it("validateAcceptance fails for non-true values", function () {
    const test_1080 = new Test_842();
    try {
      const params_1081 = mapConstructor_770(Object.freeze([pairConstructor_844("active", "false")]));
      const cs_1082 = changeset(userTable_840(), params_1081).cast(Object.freeze([csid_837("active")])).validateAcceptance(csid_837("active"));
      function fn_1083() {
        return "false should not be accepted";
      }
      test_1080.assert(! cs_1082.isValid, fn_1083);
      function fn_1084() {
        return "correct message";
      }
      test_1080.assert(listedGet_99(cs_1082.errors, 0).message === "must be accepted", fn_1084);
      return;
    } finally {
      test_1080.softFailToHard();
    }
});
it("validateConfirmation passes when fields match", function () {
    const test_1085 = new Test_842();
    try {
      const tbl_1086 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("password"), new StringField(), false, null, false), new FieldDef(csid_837("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1087 = mapConstructor_770(Object.freeze([pairConstructor_844("password", "secret123"), pairConstructor_844("password_confirmation", "secret123")]));
      const cs_1088 = changeset(tbl_1086, params_1087).cast(Object.freeze([csid_837("password"), csid_837("password_confirmation")])).validateConfirmation(csid_837("password"), csid_837("password_confirmation"));
      function fn_1089() {
        return "matching fields should pass";
      }
      test_1085.assert(cs_1088.isValid, fn_1089);
      return;
    } finally {
      test_1085.softFailToHard();
    }
});
it("validateConfirmation fails when fields differ", function () {
    const test_1090 = new Test_842();
    try {
      const tbl_1091 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("password"), new StringField(), false, null, false), new FieldDef(csid_837("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1092 = mapConstructor_770(Object.freeze([pairConstructor_844("password", "secret123"), pairConstructor_844("password_confirmation", "wrong456")]));
      const cs_1093 = changeset(tbl_1091, params_1092).cast(Object.freeze([csid_837("password"), csid_837("password_confirmation")])).validateConfirmation(csid_837("password"), csid_837("password_confirmation"));
      function fn_1094() {
        return "mismatched fields should fail";
      }
      test_1090.assert(! cs_1093.isValid, fn_1094);
      function fn_1095() {
        return "error on confirmation field";
      }
      test_1090.assert(listedGet_99(cs_1093.errors, 0).field === "password_confirmation", fn_1095);
      return;
    } finally {
      test_1090.softFailToHard();
    }
});
it("validateConfirmation fails when confirmation missing", function () {
    const test_1096 = new Test_842();
    try {
      const tbl_1097 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("password"), new StringField(), false, null, false), new FieldDef(csid_837("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1098 = mapConstructor_770(Object.freeze([pairConstructor_844("password", "secret123")]));
      const cs_1099 = changeset(tbl_1097, params_1098).cast(Object.freeze([csid_837("password")])).validateConfirmation(csid_837("password"), csid_837("password_confirmation"));
      function fn_1100() {
        return "missing confirmation should fail";
      }
      test_1096.assert(! cs_1099.isValid, fn_1100);
      return;
    } finally {
      test_1096.softFailToHard();
    }
});
it("validateContains passes when substring found", function () {
    const test_1101 = new Test_842();
    try {
      const params_1102 = mapConstructor_770(Object.freeze([pairConstructor_844("email", "alice@example.com")]));
      const cs_1103 = changeset(userTable_840(), params_1102).cast(Object.freeze([csid_837("email")])).validateContains(csid_837("email"), "@");
      function fn_1104() {
        return "should pass when @ present";
      }
      test_1101.assert(cs_1103.isValid, fn_1104);
      return;
    } finally {
      test_1101.softFailToHard();
    }
});
it("validateContains fails when substring not found", function () {
    const test_1105 = new Test_842();
    try {
      const params_1106 = mapConstructor_770(Object.freeze([pairConstructor_844("email", "alice-example.com")]));
      const cs_1107 = changeset(userTable_840(), params_1106).cast(Object.freeze([csid_837("email")])).validateContains(csid_837("email"), "@");
      function fn_1108() {
        return "should fail when @ absent";
      }
      test_1105.assert(! cs_1107.isValid, fn_1108);
      return;
    } finally {
      test_1105.softFailToHard();
    }
});
it("validateContains skips when field not in changes", function () {
    const test_1109 = new Test_842();
    try {
      const params_1110 = mapConstructor_770(Object.freeze([]));
      const cs_1111 = changeset(userTable_840(), params_1110).cast(Object.freeze([csid_837("email")])).validateContains(csid_837("email"), "@");
      function fn_1112() {
        return "should be valid when field absent";
      }
      test_1109.assert(cs_1111.isValid, fn_1112);
      return;
    } finally {
      test_1109.softFailToHard();
    }
});
it("validateStartsWith passes", function () {
    const test_1113 = new Test_842();
    try {
      const params_1114 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Dr. Smith")]));
      const cs_1115 = changeset(userTable_840(), params_1114).cast(Object.freeze([csid_837("name")])).validateStartsWith(csid_837("name"), "Dr.");
      function fn_1116() {
        return "should pass for Dr. prefix";
      }
      test_1113.assert(cs_1115.isValid, fn_1116);
      return;
    } finally {
      test_1113.softFailToHard();
    }
});
it("validateStartsWith fails", function () {
    const test_1117 = new Test_842();
    try {
      const params_1118 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Mr. Smith")]));
      const cs_1119 = changeset(userTable_840(), params_1118).cast(Object.freeze([csid_837("name")])).validateStartsWith(csid_837("name"), "Dr.");
      function fn_1120() {
        return "should fail for Mr. prefix";
      }
      test_1117.assert(! cs_1119.isValid, fn_1120);
      return;
    } finally {
      test_1117.softFailToHard();
    }
});
it("validateEndsWith passes", function () {
    const test_1121 = new Test_842();
    try {
      const params_1122 = mapConstructor_770(Object.freeze([pairConstructor_844("email", "alice@example.com")]));
      const cs_1123 = changeset(userTable_840(), params_1122).cast(Object.freeze([csid_837("email")])).validateEndsWith(csid_837("email"), ".com");
      function fn_1124() {
        return "should pass for .com suffix";
      }
      test_1121.assert(cs_1123.isValid, fn_1124);
      return;
    } finally {
      test_1121.softFailToHard();
    }
});
it("validateEndsWith fails", function () {
    const test_1125 = new Test_842();
    try {
      const params_1126 = mapConstructor_770(Object.freeze([pairConstructor_844("email", "alice@example.org")]));
      const cs_1127 = changeset(userTable_840(), params_1126).cast(Object.freeze([csid_837("email")])).validateEndsWith(csid_837("email"), ".com");
      function fn_1128() {
        return "should fail for .org when expecting .com";
      }
      test_1125.assert(! cs_1127.isValid, fn_1128);
      return;
    } finally {
      test_1125.softFailToHard();
    }
});
it("validateEndsWith handles repeated suffix correctly", function () {
    const test_1129 = new Test_842();
    try {
      const params_1130 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "abcabc")]));
      const cs_1131 = changeset(userTable_840(), params_1130).cast(Object.freeze([csid_837("name")])).validateEndsWith(csid_837("name"), "abc");
      function fn_1132() {
        return "abcabc should end with abc";
      }
      test_1129.assert(cs_1131.isValid, fn_1132);
      return;
    } finally {
      test_1129.softFailToHard();
    }
});
it("toInsertSql uses default value when field not in changes", function () {
    const test_1133 = new Test_842();
    try {
      let t_1134;
      const tbl_1135 = new TableDef(csid_837("posts"), Object.freeze([new FieldDef(csid_837("title"), new StringField(), false, null, false), new FieldDef(csid_837("status"), new StringField(), false, new SqlDefault(), false)]), null);
      const params_1136 = mapConstructor_770(Object.freeze([pairConstructor_844("title", "Hello")]));
      const cs_1137 = changeset(tbl_1135, params_1136).cast(Object.freeze([csid_837("title")]));
      try {
        t_1134 = cs_1137.toInsertSql();
      } catch {
        t_1134 = panic_839();
      }
      const s_1138 = t_1134.toString();
      const t_1139 = s_1138.indexOf("INSERT INTO posts") >= 0;
      function fn_1140() {
        return "has INSERT INTO: " + s_1138;
      }
      test_1133.assert(t_1139, fn_1140);
      const t_1141 = s_1138.indexOf("'Hello'") >= 0;
      function fn_1142() {
        return "has title value: " + s_1138;
      }
      test_1133.assert(t_1141, fn_1142);
      const t_1143 = s_1138.indexOf("DEFAULT") >= 0;
      function fn_1144() {
        return "status should use DEFAULT: " + s_1138;
      }
      test_1133.assert(t_1143, fn_1144);
      return;
    } finally {
      test_1133.softFailToHard();
    }
});
it("toInsertSql change overrides default value", function () {
    const test_1145 = new Test_842();
    try {
      let t_1146;
      const tbl_1147 = new TableDef(csid_837("posts"), Object.freeze([new FieldDef(csid_837("title"), new StringField(), false, null, false), new FieldDef(csid_837("status"), new StringField(), false, new SqlDefault(), false)]), null);
      const params_1148 = mapConstructor_770(Object.freeze([pairConstructor_844("title", "Hello"), pairConstructor_844("status", "published")]));
      const cs_1149 = changeset(tbl_1147, params_1148).cast(Object.freeze([csid_837("title"), csid_837("status")]));
      try {
        t_1146 = cs_1149.toInsertSql();
      } catch {
        t_1146 = panic_839();
      }
      const s_1150 = t_1146.toString();
      const t_1151 = s_1150.indexOf("'published'") >= 0;
      function fn_1152() {
        return "should use provided value: " + s_1150;
      }
      test_1145.assert(t_1151, fn_1152);
      return;
    } finally {
      test_1145.softFailToHard();
    }
});
it("toInsertSql with timestamps uses DEFAULT", function () {
    const test_1153 = new Test_842();
    try {
      let t_1154;
      let ts_1155;
      try {
        ts_1155 = timestamps();
      } catch {
        ts_1155 = panic_839();
      }
      const fields_1156 = [];
      listBuilderAdd_89(fields_1156, new FieldDef(csid_837("title"), new StringField(), false, null, false));
      const this_1157 = ts_1155;
      const n_1158 = this_1157.length;
      let i_1159 = 0;
      while (i_1159 < n_1158) {
        const el_1160 = listedGet_99(this_1157, i_1159);
        i_1159 = i_1159 + 1 | 0;
        const t_1161 = el_1160;
        listBuilderAdd_89(fields_1156, t_1161);
      }
      const tbl_1162 = new TableDef(csid_837("articles"), listBuilderToList_90(fields_1156), null);
      const params_1163 = mapConstructor_770(Object.freeze([pairConstructor_844("title", "News")]));
      const cs_1164 = changeset(tbl_1162, params_1163).cast(Object.freeze([csid_837("title")]));
      try {
        t_1154 = cs_1164.toInsertSql();
      } catch {
        t_1154 = panic_839();
      }
      const s_1165 = t_1154.toString();
      const t_1166 = s_1165.indexOf("inserted_at") >= 0;
      function fn_1167() {
        return "should include inserted_at: " + s_1165;
      }
      test_1153.assert(t_1166, fn_1167);
      const t_1168 = s_1165.indexOf("updated_at") >= 0;
      function fn_1169() {
        return "should include updated_at: " + s_1165;
      }
      test_1153.assert(t_1168, fn_1169);
      const t_1170 = s_1165.indexOf("DEFAULT") >= 0;
      function fn_1171() {
        return "timestamps should use DEFAULT: " + s_1165;
      }
      test_1153.assert(t_1170, fn_1171);
      return;
    } finally {
      test_1153.softFailToHard();
    }
});
it("toInsertSql skips virtual fields", function () {
    const test_1172 = new Test_842();
    try {
      let t_1173;
      const tbl_1174 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("name"), new StringField(), false, null, false), new FieldDef(csid_837("full_name"), new StringField(), true, null, true)]), null);
      const params_1175 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("full_name", "Alice Smith")]));
      const cs_1176 = changeset(tbl_1174, params_1175).cast(Object.freeze([csid_837("name"), csid_837("full_name")]));
      try {
        t_1173 = cs_1176.toInsertSql();
      } catch {
        t_1173 = panic_839();
      }
      const s_1177 = t_1173.toString();
      const t_1178 = s_1177.indexOf("'Alice'") >= 0;
      function fn_1179() {
        return "name should be included: " + s_1177;
      }
      test_1172.assert(t_1178, fn_1179);
      const t_1180 = s_1177.indexOf("full_name") >= 0;
      function fn_1181() {
        return "virtual field should be excluded: " + s_1177;
      }
      test_1172.assert(! t_1180, fn_1181);
      return;
    } finally {
      test_1172.softFailToHard();
    }
});
it("toInsertSql allows missing non-nullable virtual field", function () {
    const test_1182 = new Test_842();
    try {
      let t_1183;
      const tbl_1184 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("name"), new StringField(), false, null, false), new FieldDef(csid_837("computed"), new StringField(), false, null, true)]), null);
      const params_1185 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice")]));
      const cs_1186 = changeset(tbl_1184, params_1185).cast(Object.freeze([csid_837("name")]));
      try {
        t_1183 = cs_1186.toInsertSql();
      } catch {
        t_1183 = panic_839();
      }
      const s_1187 = t_1183.toString();
      const t_1188 = s_1187.indexOf("'Alice'") >= 0;
      function fn_1189() {
        return "should succeed: " + s_1187;
      }
      test_1182.assert(t_1188, fn_1189);
      return;
    } finally {
      test_1182.softFailToHard();
    }
});
it("toUpdateSql skips virtual fields", function () {
    const test_1190 = new Test_842();
    try {
      let t_1191;
      const tbl_1192 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("name"), new StringField(), false, null, false), new FieldDef(csid_837("display"), new StringField(), true, null, true)]), null);
      const params_1193 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Bob"), pairConstructor_844("display", "Bobby")]));
      const cs_1194 = changeset(tbl_1192, params_1193).cast(Object.freeze([csid_837("name"), csid_837("display")]));
      try {
        t_1191 = cs_1194.toUpdateSql(1);
      } catch {
        t_1191 = panic_839();
      }
      const s_1195 = t_1191.toString();
      const t_1196 = s_1195.indexOf("name = 'Bob'") >= 0;
      function fn_1197() {
        return "name should be in SET: " + s_1195;
      }
      test_1190.assert(t_1196, fn_1197);
      const t_1198 = s_1195.indexOf("display") >= 0;
      function fn_1199() {
        return "virtual field excluded from UPDATE: " + s_1195;
      }
      test_1190.assert(! t_1198, fn_1199);
      return;
    } finally {
      test_1190.softFailToHard();
    }
});
it("toUpdateSql uses custom primary key", function () {
    const test_1200 = new Test_842();
    try {
      let t_1201;
      const tbl_1202 = new TableDef(csid_837("posts"), Object.freeze([new FieldDef(csid_837("title"), new StringField(), false, null, false)]), csid_837("post_id"));
      const params_1203 = mapConstructor_770(Object.freeze([pairConstructor_844("title", "Updated")]));
      const cs_1204 = changeset(tbl_1202, params_1203).cast(Object.freeze([csid_837("title")]));
      try {
        t_1201 = cs_1204.toUpdateSql(99);
      } catch {
        t_1201 = panic_839();
      }
      const s_1205 = t_1201.toString();
      function fn_1206() {
        return "got: " + s_1205;
      }
      test_1200.assert(s_1205 === "UPDATE posts SET title = 'Updated' WHERE post_id = 99", fn_1206);
      return;
    } finally {
      test_1200.softFailToHard();
    }
});
it("deleteSql uses custom primary key", function () {
    const test_1207 = new Test_842();
    try {
      const tbl_1208 = new TableDef(csid_837("posts"), Object.freeze([new FieldDef(csid_837("title"), new StringField(), false, null, false)]), csid_837("post_id"));
      const s_1209 = deleteSql(tbl_1208, 42).toString();
      function fn_1210() {
        return "got: " + s_1209;
      }
      test_1207.assert(s_1209 === "DELETE FROM posts WHERE post_id = 42", fn_1210);
      return;
    } finally {
      test_1207.softFailToHard();
    }
});
it("deleteSql uses default id when primaryKey null", function () {
    const test_1211 = new Test_842();
    try {
      const tbl_1212 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("name"), new StringField(), false, null, false)]), null);
      const s_1213 = deleteSql(tbl_1212, 7).toString();
      function fn_1214() {
        return "got: " + s_1213;
      }
      test_1211.assert(s_1213 === "DELETE FROM users WHERE id = 7", fn_1214);
      return;
    } finally {
      test_1211.softFailToHard();
    }
});
it("already-invalid changeset skips subsequent validators", function () {
    const test_1215 = new Test_842();
    try {
      const params_1216 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "A"), pairConstructor_844("email", "alice@example.com")]));
      const cs_1217 = changeset(userTable_840(), params_1216).cast(Object.freeze([csid_837("name"), csid_837("email")])).validateLength(csid_837("name"), 3, 50).validateRequired(Object.freeze([csid_837("name"), csid_837("email")])).validateContains(csid_837("email"), "@");
      function fn_1218() {
        return "should be invalid from validateLength";
      }
      test_1215.assert(! cs_1217.isValid, fn_1218);
      function fn_1219() {
        return "should have exactly 1 error, not accumulate: " + cs_1217.errors.length.toString();
      }
      test_1215.assert(cs_1217.errors.length === 1, fn_1219);
      function fn_1220() {
        return "error should be on name";
      }
      test_1215.assert(listedGet_99(cs_1217.errors, 0).field === "name", fn_1220);
      return;
    } finally {
      test_1215.softFailToHard();
    }
});
it("validateNumber lessThanOrEqual passes at boundary", function () {
    const test_1221 = new Test_842();
    try {
      const params_1222 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "10.0")]));
      const cs_1223 = changeset(userTable_840(), params_1222).cast(Object.freeze([csid_837("score")])).validateNumber(csid_837("score"), new NumberValidationOpts(null, null, null, 10.0, null));
      function fn_1224() {
        return "10.0 <= 10.0 should pass";
      }
      test_1221.assert(cs_1223.isValid, fn_1224);
      return;
    } finally {
      test_1221.softFailToHard();
    }
});
it("validateNumber lessThanOrEqual fails above boundary", function () {
    const test_1225 = new Test_842();
    try {
      const params_1226 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "10.1")]));
      const cs_1227 = changeset(userTable_840(), params_1226).cast(Object.freeze([csid_837("score")])).validateNumber(csid_837("score"), new NumberValidationOpts(null, null, null, 10.0, null));
      function fn_1228() {
        return "10.1 <= 10.0 should fail";
      }
      test_1225.assert(! cs_1227.isValid, fn_1228);
      function fn_1229() {
        return "correct message";
      }
      test_1225.assert(listedGet_99(cs_1227.errors, 0).message === "must be less than or equal to 10.0", fn_1229);
      return;
    } finally {
      test_1225.softFailToHard();
    }
});
it("validateNumber equalTo passes when equal", function () {
    const test_1230 = new Test_842();
    try {
      const params_1231 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "42.0")]));
      const cs_1232 = changeset(userTable_840(), params_1231).cast(Object.freeze([csid_837("score")])).validateNumber(csid_837("score"), new NumberValidationOpts(null, null, null, null, 42.0));
      function fn_1233() {
        return "42.0 == 42.0 should pass";
      }
      test_1230.assert(cs_1232.isValid, fn_1233);
      return;
    } finally {
      test_1230.softFailToHard();
    }
});
it("validateNumber equalTo fails when not equal", function () {
    const test_1234 = new Test_842();
    try {
      const params_1235 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "41.9")]));
      const cs_1236 = changeset(userTable_840(), params_1235).cast(Object.freeze([csid_837("score")])).validateNumber(csid_837("score"), new NumberValidationOpts(null, null, null, null, 42.0));
      function fn_1237() {
        return "41.9 == 42.0 should fail";
      }
      test_1234.assert(! cs_1236.isValid, fn_1237);
      function fn_1238() {
        return "correct message";
      }
      test_1234.assert(listedGet_99(cs_1236.errors, 0).message === "must be equal to 42.0", fn_1238);
      return;
    } finally {
      test_1234.softFailToHard();
    }
});
it("validateNumber greaterThan fails at exact threshold", function () {
    const test_1239 = new Test_842();
    try {
      const params_1240 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "18")]));
      const cs_1241 = changeset(userTable_840(), params_1240).cast(Object.freeze([csid_837("age")])).validateNumber(csid_837("age"), new NumberValidationOpts(18.0, null, null, null, null));
      function fn_1242() {
        return "18 > 18 should fail (strict greater than)";
      }
      test_1239.assert(! cs_1241.isValid, fn_1242);
      return;
    } finally {
      test_1239.softFailToHard();
    }
});
it("validateNumber lessThan fails at exact threshold", function () {
    const test_1243 = new Test_842();
    try {
      const params_1244 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "10.0")]));
      const cs_1245 = changeset(userTable_840(), params_1244).cast(Object.freeze([csid_837("score")])).validateNumber(csid_837("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      function fn_1246() {
        return "10.0 < 10.0 should fail (strict less than)";
      }
      test_1243.assert(! cs_1245.isValid, fn_1246);
      return;
    } finally {
      test_1243.softFailToHard();
    }
});
it("validateFloat fails for non-float string", function () {
    const test_1247 = new Test_842();
    try {
      const params_1248 = mapConstructor_770(Object.freeze([pairConstructor_844("score", "abc")]));
      const cs_1249 = changeset(userTable_840(), params_1248).cast(Object.freeze([csid_837("score")])).validateFloat(csid_837("score"));
      function fn_1250() {
        return "abc should not parse as float";
      }
      test_1247.assert(! cs_1249.isValid, fn_1250);
      function fn_1251() {
        return "correct message";
      }
      test_1247.assert(listedGet_99(cs_1249.errors, 0).message === "must be a number", fn_1251);
      return;
    } finally {
      test_1247.softFailToHard();
    }
});
it("toInsertSql with all six field types", function () {
    const test_1252 = new Test_842();
    try {
      let t_1253;
      const tbl_1254 = new TableDef(csid_837("records"), Object.freeze([new FieldDef(csid_837("name"), new StringField(), false, null, false), new FieldDef(csid_837("count"), new IntField(), false, null, false), new FieldDef(csid_837("big_id"), new Int64Field(), false, null, false), new FieldDef(csid_837("rating"), new FloatField(), false, null, false), new FieldDef(csid_837("active"), new BoolField(), false, null, false), new FieldDef(csid_837("birthday"), new DateField(), false, null, false)]), null);
      const params_1255 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("count", "42"), pairConstructor_844("big_id", "9999999999"), pairConstructor_844("rating", "3.14"), pairConstructor_844("active", "true"), pairConstructor_844("birthday", "2000-01-15")]));
      const cs_1256 = changeset(tbl_1254, params_1255).cast(Object.freeze([csid_837("name"), csid_837("count"), csid_837("big_id"), csid_837("rating"), csid_837("active"), csid_837("birthday")]));
      try {
        t_1253 = cs_1256.toInsertSql();
      } catch {
        t_1253 = panic_839();
      }
      const s_1257 = t_1253.toString();
      const t_1258 = s_1257.indexOf("'Alice'") >= 0;
      function fn_1259() {
        return "string field: " + s_1257;
      }
      test_1252.assert(t_1258, fn_1259);
      const t_1260 = s_1257.indexOf("42") >= 0;
      function fn_1261() {
        return "int field: " + s_1257;
      }
      test_1252.assert(t_1260, fn_1261);
      const t_1262 = s_1257.indexOf("9999999999") >= 0;
      function fn_1263() {
        return "int64 field: " + s_1257;
      }
      test_1252.assert(t_1262, fn_1263);
      const t_1264 = s_1257.indexOf("3.14") >= 0;
      function fn_1265() {
        return "float field: " + s_1257;
      }
      test_1252.assert(t_1264, fn_1265);
      const t_1266 = s_1257.indexOf("TRUE") >= 0;
      function fn_1267() {
        return "bool field: " + s_1257;
      }
      test_1252.assert(t_1266, fn_1267);
      const t_1268 = s_1257.indexOf("'2000-01-15'") >= 0;
      function fn_1269() {
        return "date field: " + s_1257;
      }
      test_1252.assert(t_1268, fn_1269);
      return;
    } finally {
      test_1252.softFailToHard();
    }
});
it("deleteChange on non-nullable field causes toInsertSql to bubble", function () {
    const test_1270 = new Test_842();
    try {
      const tbl_1271 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("name"), new StringField(), false, null, false), new FieldDef(csid_837("email"), new StringField(), false, null, false)]), null);
      const params_1272 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("email", "a@b.com")]));
      const cs_1273 = changeset(tbl_1271, params_1272).cast(Object.freeze([csid_837("name"), csid_837("email")])).deleteChange(csid_837("email"));
      let didBubble_1274;
      try {
        cs_1273.toInsertSql();
        didBubble_1274 = false;
      } catch {
        didBubble_1274 = true;
      }
      function fn_1275() {
        return "removing non-nullable field should make toInsertSql bubble";
      }
      test_1270.assert(didBubble_1274, fn_1275);
      return;
    } finally {
      test_1270.softFailToHard();
    }
});
it("validateLength passes at exact min", function () {
    const test_1276 = new Test_842();
    try {
      const params_1277 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "abc")]));
      const cs_1278 = changeset(userTable_840(), params_1277).cast(Object.freeze([csid_837("name")])).validateLength(csid_837("name"), 3, 10);
      function fn_1279() {
        return "length 3 should pass for min 3";
      }
      test_1276.assert(cs_1278.isValid, fn_1279);
      return;
    } finally {
      test_1276.softFailToHard();
    }
});
it("validateLength passes at exact max", function () {
    const test_1280 = new Test_842();
    try {
      const params_1281 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "abcdefghij")]));
      const cs_1282 = changeset(userTable_840(), params_1281).cast(Object.freeze([csid_837("name")])).validateLength(csid_837("name"), 1, 10);
      function fn_1283() {
        return "length 10 should pass for max 10";
      }
      test_1280.assert(cs_1282.isValid, fn_1283);
      return;
    } finally {
      test_1280.softFailToHard();
    }
});
it("validateAcceptance skips when field not in changes", function () {
    const test_1284 = new Test_842();
    try {
      const params_1285 = mapConstructor_770(Object.freeze([]));
      const cs_1286 = changeset(userTable_840(), params_1285).cast(Object.freeze([csid_837("active")])).validateAcceptance(csid_837("active"));
      function fn_1287() {
        return "should be valid when field absent";
      }
      test_1284.assert(cs_1286.isValid, fn_1287);
      return;
    } finally {
      test_1284.softFailToHard();
    }
});
it("multiple validators chain correctly on valid changeset", function () {
    const test_1288 = new Test_842();
    try {
      const params_1289 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("email", "alice@example.com"), pairConstructor_844("age", "25")]));
      const cs_1290 = changeset(userTable_840(), params_1289).cast(Object.freeze([csid_837("name"), csid_837("email"), csid_837("age")])).validateRequired(Object.freeze([csid_837("name"), csid_837("email")])).validateLength(csid_837("name"), 2, 50).validateContains(csid_837("email"), "@").validateInt(csid_837("age")).validateNumber(csid_837("age"), new NumberValidationOpts(0.0, 150.0, null, null, null));
      function fn_1291() {
        return "all validators should pass";
      }
      test_1288.assert(cs_1290.isValid, fn_1291);
      function fn_1292() {
        return "no errors expected";
      }
      test_1288.assert(cs_1290.errors.length === 0, fn_1292);
      return;
    } finally {
      test_1288.softFailToHard();
    }
});
it("toUpdateSql with multiple non-virtual fields", function () {
    const test_1293 = new Test_842();
    try {
      let t_1294;
      const tbl_1295 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("name"), new StringField(), false, null, false), new FieldDef(csid_837("email"), new StringField(), false, null, false)]), null);
      const params_1296 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Bob"), pairConstructor_844("email", "bob@example.com")]));
      const cs_1297 = changeset(tbl_1295, params_1296).cast(Object.freeze([csid_837("name"), csid_837("email")]));
      try {
        t_1294 = cs_1297.toUpdateSql(5);
      } catch {
        t_1294 = panic_839();
      }
      const s_1298 = t_1294.toString();
      const t_1299 = s_1298.indexOf("name = 'Bob'") >= 0;
      function fn_1300() {
        return "name in SET: " + s_1298;
      }
      test_1293.assert(t_1299, fn_1300);
      const t_1301 = s_1298.indexOf("email = 'bob@example.com'") >= 0;
      function fn_1302() {
        return "email in SET: " + s_1298;
      }
      test_1293.assert(t_1301, fn_1302);
      const t_1303 = s_1298.indexOf("WHERE id = 5") >= 0;
      function fn_1304() {
        return "WHERE clause: " + s_1298;
      }
      test_1293.assert(t_1303, fn_1304);
      return;
    } finally {
      test_1293.softFailToHard();
    }
});
it("toUpdateSql bubbles when all changes are virtual fields", function () {
    const test_1305 = new Test_842();
    try {
      const tbl_1306 = new TableDef(csid_837("users"), Object.freeze([new FieldDef(csid_837("name"), new StringField(), false, null, false), new FieldDef(csid_837("computed"), new StringField(), true, null, true)]), null);
      const params_1307 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "Alice"), pairConstructor_844("computed", "derived")]));
      const cs_1308 = changeset(tbl_1306, params_1307).cast(Object.freeze([csid_837("computed")]));
      let didBubble_1309;
      try {
        cs_1308.toUpdateSql(1);
        didBubble_1309 = false;
      } catch {
        didBubble_1309 = true;
      }
      function fn_1310() {
        return "should bubble when all changes are virtual";
      }
      test_1305.assert(didBubble_1309, fn_1310);
      return;
    } finally {
      test_1305.softFailToHard();
    }
});
it("putChange satisfies subsequent validateRequired", function () {
    const test_1311 = new Test_842();
    try {
      const params_1312 = mapConstructor_770(Object.freeze([]));
      const cs_1313 = changeset(userTable_840(), params_1312).cast(Object.freeze([csid_837("name")])).putChange(csid_837("name"), "Injected").validateRequired(Object.freeze([csid_837("name")]));
      function fn_1314() {
        return "putChange should satisfy required";
      }
      test_1311.assert(cs_1313.isValid, fn_1314);
      return;
    } finally {
      test_1311.softFailToHard();
    }
});
it("validateStartsWith skips when field not in changes", function () {
    const test_1315 = new Test_842();
    try {
      const params_1316 = mapConstructor_770(Object.freeze([]));
      const cs_1317 = changeset(userTable_840(), params_1316).cast(Object.freeze([csid_837("name")])).validateStartsWith(csid_837("name"), "Dr.");
      function fn_1318() {
        return "should be valid when field absent";
      }
      test_1315.assert(cs_1317.isValid, fn_1318);
      return;
    } finally {
      test_1315.softFailToHard();
    }
});
it("validateEndsWith skips when field not in changes", function () {
    const test_1319 = new Test_842();
    try {
      const params_1320 = mapConstructor_770(Object.freeze([]));
      const cs_1321 = changeset(userTable_840(), params_1320).cast(Object.freeze([csid_837("name")])).validateEndsWith(csid_837("name"), ".com");
      function fn_1322() {
        return "should be valid when field absent";
      }
      test_1319.assert(cs_1321.isValid, fn_1322);
      return;
    } finally {
      test_1319.softFailToHard();
    }
});
it("validateInt accepts zero", function () {
    const test_1323 = new Test_842();
    try {
      const params_1324 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "0")]));
      const cs_1325 = changeset(userTable_840(), params_1324).cast(Object.freeze([csid_837("age")])).validateInt(csid_837("age"));
      function fn_1326() {
        return "0 should be a valid int";
      }
      test_1323.assert(cs_1325.isValid, fn_1326);
      return;
    } finally {
      test_1323.softFailToHard();
    }
});
it("validateInt accepts negative", function () {
    const test_1327 = new Test_842();
    try {
      const params_1328 = mapConstructor_770(Object.freeze([pairConstructor_844("age", "-5")]));
      const cs_1329 = changeset(userTable_840(), params_1328).cast(Object.freeze([csid_837("age")])).validateInt(csid_837("age"));
      function fn_1330() {
        return "-5 should be a valid int";
      }
      test_1327.assert(cs_1329.isValid, fn_1330);
      return;
    } finally {
      test_1327.softFailToHard();
    }
});
it("changeset immutability - validators do not mutate base", function () {
    const test_1331 = new Test_842();
    try {
      const params_1332 = mapConstructor_770(Object.freeze([pairConstructor_844("name", "A"), pairConstructor_844("email", "alice@example.com")]));
      const base_1333 = changeset(userTable_840(), params_1332).cast(Object.freeze([csid_837("name"), csid_837("email")]));
      const failed_1334 = base_1333.validateLength(csid_837("name"), 3, 50);
      const passed_1335 = base_1333.validateRequired(Object.freeze([csid_837("name"), csid_837("email")]));
      function fn_1336() {
        return "failed branch should be invalid";
      }
      test_1331.assert(! failed_1334.isValid, fn_1336);
      function fn_1337() {
        return "passed branch should still be valid";
      }
      test_1331.assert(passed_1335.isValid, fn_1337);
      return;
    } finally {
      test_1331.softFailToHard();
    }
});
/**
 * @param {string} name_1339
 * @returns {SafeIdentifier}
 */
function sid_1338(name_1339) {
  try {
    return safeIdentifier(name_1339);
  } catch {
    return panic_839();
  }
}
it("bare from produces SELECT *", function () {
    const test_1340 = new Test_842();
    try {
      const q_1341 = from(sid_1338("users"));
      function fn_1342() {
        return "bare query";
      }
      test_1340.assert(q_1341.toSql().toString() === "SELECT * FROM users", fn_1342);
      return;
    } finally {
      test_1340.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_1343 = new Test_842();
    try {
      const q_1344 = from(sid_1338("users")).select(Object.freeze([sid_1338("id"), sid_1338("name")]));
      function fn_1345() {
        return "select columns";
      }
      test_1343.assert(q_1344.toSql().toString() === "SELECT id, name FROM users", fn_1345);
      return;
    } finally {
      test_1343.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_1346 = new Test_842();
    try {
      const t_1347 = from(sid_1338("users"));
      const accumulator_1348 = new SqlBuilder();
      accumulator_1348.appendSafe("age > ");
      accumulator_1348.appendInt32(18);
      const q_1349 = t_1347.where(accumulator_1348.accumulated);
      function fn_1350() {
        return "where int";
      }
      test_1346.assert(q_1349.toSql().toString() === "SELECT * FROM users WHERE age > 18", fn_1350);
      return;
    } finally {
      test_1346.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_1351 = new Test_842();
    try {
      const t_1352 = from(sid_1338("users"));
      const accumulator_1353 = new SqlBuilder();
      accumulator_1353.appendSafe("active = ");
      accumulator_1353.appendBoolean(true);
      const q_1354 = t_1352.where(accumulator_1353.accumulated);
      function fn_1355() {
        return "where bool";
      }
      test_1351.assert(q_1354.toSql().toString() === "SELECT * FROM users WHERE active = TRUE", fn_1355);
      return;
    } finally {
      test_1351.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_1356 = new Test_842();
    try {
      const t_1357 = from(sid_1338("users"));
      const accumulator_1358 = new SqlBuilder();
      accumulator_1358.appendSafe("age > ");
      accumulator_1358.appendInt32(18);
      const t_1359 = t_1357.where(accumulator_1358.accumulated);
      const accumulator_1360 = new SqlBuilder();
      accumulator_1360.appendSafe("active = ");
      accumulator_1360.appendBoolean(true);
      const q_1361 = t_1359.where(accumulator_1360.accumulated);
      function fn_1362() {
        return "chained where";
      }
      test_1356.assert(q_1361.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE", fn_1362);
      return;
    } finally {
      test_1356.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_1363 = new Test_842();
    try {
      const q_1364 = from(sid_1338("users")).orderBy(sid_1338("name"), true);
      function fn_1365() {
        return "order asc";
      }
      test_1363.assert(q_1364.toSql().toString() === "SELECT * FROM users ORDER BY name ASC", fn_1365);
      return;
    } finally {
      test_1363.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_1366 = new Test_842();
    try {
      const q_1367 = from(sid_1338("users")).orderBy(sid_1338("created_at"), false);
      function fn_1368() {
        return "order desc";
      }
      test_1366.assert(q_1367.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC", fn_1368);
      return;
    } finally {
      test_1366.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_1369 = new Test_842();
    try {
      let q_1370;
      try {
        const t_1371 = from(sid_1338("users")).limit(10);
        q_1370 = t_1371.offset(20);
      } catch {
        q_1370 = panic_839();
      }
      function fn_1372() {
        return "limit/offset";
      }
      test_1369.assert(q_1370.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20", fn_1372);
      return;
    } finally {
      test_1369.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_1373 = new Test_842();
    try {
      let didBubble_1374;
      try {
        from(sid_1338("users")).limit(-1);
        didBubble_1374 = false;
      } catch {
        didBubble_1374 = true;
      }
      function fn_1375() {
        return "negative limit should bubble";
      }
      test_1373.assert(didBubble_1374, fn_1375);
      return;
    } finally {
      test_1373.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_1376 = new Test_842();
    try {
      let didBubble_1377;
      try {
        from(sid_1338("users")).offset(-1);
        didBubble_1377 = false;
      } catch {
        didBubble_1377 = true;
      }
      function fn_1378() {
        return "negative offset should bubble";
      }
      test_1376.assert(didBubble_1377, fn_1378);
      return;
    } finally {
      test_1376.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_1379 = new Test_842();
    try {
      const minAge_1380 = 21;
      let q_1381;
      try {
        const t_1382 = from(sid_1338("users")).select(Object.freeze([sid_1338("id"), sid_1338("name"), sid_1338("email")]));
        const accumulator_1383 = new SqlBuilder();
        accumulator_1383.appendSafe("age >= ");
        accumulator_1383.appendInt32(21);
        const t_1384 = t_1382.where(accumulator_1383.accumulated);
        const accumulator_1385 = new SqlBuilder();
        accumulator_1385.appendSafe("active = ");
        accumulator_1385.appendBoolean(true);
        const t_1386 = t_1384.where(accumulator_1385.accumulated).orderBy(sid_1338("name"), true).limit(25);
        q_1381 = t_1386.offset(0);
      } catch {
        q_1381 = panic_839();
      }
      function fn_1387() {
        return "complex query";
      }
      test_1379.assert(q_1381.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0", fn_1387);
      return;
    } finally {
      test_1379.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_1388 = new Test_842();
    try {
      let t_1389;
      const q_1390 = from(sid_1338("users"));
      try {
        t_1389 = q_1390.safeToSql(100);
      } catch {
        t_1389 = panic_839();
      }
      const s_1391 = t_1389.toString();
      function fn_1392() {
        return "should have limit: " + s_1391;
      }
      test_1388.assert(s_1391 === "SELECT * FROM users LIMIT 100", fn_1392);
      return;
    } finally {
      test_1388.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_1393 = new Test_842();
    try {
      let t_1394;
      let q_1395;
      try {
        q_1395 = from(sid_1338("users")).limit(5);
      } catch {
        q_1395 = panic_839();
      }
      try {
        t_1394 = q_1395.safeToSql(100);
      } catch {
        t_1394 = panic_839();
      }
      const s_1396 = t_1394.toString();
      function fn_1397() {
        return "explicit limit preserved: " + s_1396;
      }
      test_1393.assert(s_1396 === "SELECT * FROM users LIMIT 5", fn_1397);
      return;
    } finally {
      test_1393.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_1398 = new Test_842();
    try {
      let didBubble_1399;
      try {
        from(sid_1338("users")).safeToSql(-1);
        didBubble_1399 = false;
      } catch {
        didBubble_1399 = true;
      }
      function fn_1400() {
        return "negative defaultLimit should bubble";
      }
      test_1398.assert(didBubble_1399, fn_1400);
      return;
    } finally {
      test_1398.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_1401 = new Test_842();
    try {
      const evil_1402 = "'; DROP TABLE users; --";
      const t_1403 = from(sid_1338("users"));
      const accumulator_1404 = new SqlBuilder();
      accumulator_1404.appendSafe("name = ");
      accumulator_1404.appendString("'; DROP TABLE users; --");
      const q_1405 = t_1403.where(accumulator_1404.accumulated);
      const s_1406 = q_1405.toSql().toString();
      const t_1407 = s_1406.indexOf("''") >= 0;
      function fn_1408() {
        return "quotes must be doubled: " + s_1406;
      }
      test_1401.assert(t_1407, fn_1408);
      const t_1409 = s_1406.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_1410() {
        return "structure intact: " + s_1406;
      }
      test_1401.assert(t_1409, fn_1410);
      return;
    } finally {
      test_1401.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_1411 = new Test_842();
    try {
      const attack_1412 = "users; DROP TABLE users; --";
      let didBubble_1413;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_1413 = false;
      } catch {
        didBubble_1413 = true;
      }
      function fn_1414() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_1411.assert(didBubble_1413, fn_1414);
      return;
    } finally {
      test_1411.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_1415 = new Test_842();
    try {
      const t_1416 = from(sid_1338("users"));
      const t_1417 = sid_1338("orders");
      const accumulator_1418 = new SqlBuilder();
      accumulator_1418.appendSafe("users.id = orders.user_id");
      const q_1419 = t_1416.innerJoin(t_1417, accumulator_1418.accumulated);
      function fn_1420() {
        return "inner join";
      }
      test_1415.assert(q_1419.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id", fn_1420);
      return;
    } finally {
      test_1415.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_1421 = new Test_842();
    try {
      const t_1422 = from(sid_1338("users"));
      const t_1423 = sid_1338("profiles");
      const accumulator_1424 = new SqlBuilder();
      accumulator_1424.appendSafe("users.id = profiles.user_id");
      const q_1425 = t_1422.leftJoin(t_1423, accumulator_1424.accumulated);
      function fn_1426() {
        return "left join";
      }
      test_1421.assert(q_1425.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id", fn_1426);
      return;
    } finally {
      test_1421.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_1427 = new Test_842();
    try {
      const t_1428 = from(sid_1338("orders"));
      const t_1429 = sid_1338("users");
      const accumulator_1430 = new SqlBuilder();
      accumulator_1430.appendSafe("orders.user_id = users.id");
      const q_1431 = t_1428.rightJoin(t_1429, accumulator_1430.accumulated);
      function fn_1432() {
        return "right join";
      }
      test_1427.assert(q_1431.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id", fn_1432);
      return;
    } finally {
      test_1427.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_1433 = new Test_842();
    try {
      const t_1434 = from(sid_1338("users"));
      const t_1435 = sid_1338("orders");
      const accumulator_1436 = new SqlBuilder();
      accumulator_1436.appendSafe("users.id = orders.user_id");
      const q_1437 = t_1434.fullJoin(t_1435, accumulator_1436.accumulated);
      function fn_1438() {
        return "full join";
      }
      test_1433.assert(q_1437.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id", fn_1438);
      return;
    } finally {
      test_1433.softFailToHard();
    }
});
it("chained joins", function () {
    const test_1439 = new Test_842();
    try {
      const t_1440 = from(sid_1338("users"));
      const t_1441 = sid_1338("orders");
      const accumulator_1442 = new SqlBuilder();
      accumulator_1442.appendSafe("users.id = orders.user_id");
      const t_1443 = t_1440.innerJoin(t_1441, accumulator_1442.accumulated);
      const t_1444 = sid_1338("profiles");
      const accumulator_1445 = new SqlBuilder();
      accumulator_1445.appendSafe("users.id = profiles.user_id");
      const q_1446 = t_1443.leftJoin(t_1444, accumulator_1445.accumulated);
      function fn_1447() {
        return "chained joins";
      }
      test_1439.assert(q_1446.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id", fn_1447);
      return;
    } finally {
      test_1439.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_1448 = new Test_842();
    try {
      let q_1449;
      try {
        const t_1450 = from(sid_1338("users"));
        const t_1451 = sid_1338("orders");
        const accumulator_1452 = new SqlBuilder();
        accumulator_1452.appendSafe("users.id = orders.user_id");
        const t_1453 = t_1450.innerJoin(t_1451, accumulator_1452.accumulated);
        const accumulator_1454 = new SqlBuilder();
        accumulator_1454.appendSafe("orders.total > ");
        accumulator_1454.appendInt32(100);
        q_1449 = t_1453.where(accumulator_1454.accumulated).orderBy(sid_1338("name"), true).limit(10);
      } catch {
        q_1449 = panic_839();
      }
      function fn_1455() {
        return "join with where/order/limit";
      }
      test_1448.assert(q_1449.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10", fn_1455);
      return;
    } finally {
      test_1448.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_1456 = new Test_842();
    try {
      const c_1457 = col(sid_1338("users"), sid_1338("id"));
      function fn_1458() {
        return "col helper";
      }
      test_1456.assert(c_1457.toString() === "users.id", fn_1458);
      return;
    } finally {
      test_1456.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_1459 = new Test_842();
    try {
      const onCond_1460 = col(sid_1338("users"), sid_1338("id"));
      const b_1461 = new SqlBuilder();
      b_1461.appendFragment(onCond_1460);
      b_1461.appendSafe(" = ");
      b_1461.appendFragment(col(sid_1338("orders"), sid_1338("user_id")));
      const q_1462 = from(sid_1338("users")).innerJoin(sid_1338("orders"), b_1461.accumulated);
      function fn_1463() {
        return "join with col";
      }
      test_1459.assert(q_1462.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id", fn_1463);
      return;
    } finally {
      test_1459.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_1464 = new Test_842();
    try {
      const t_1465 = from(sid_1338("users"));
      const accumulator_1466 = new SqlBuilder();
      accumulator_1466.appendSafe("status = ");
      accumulator_1466.appendString("active");
      const q_1467 = t_1465.orWhere(accumulator_1466.accumulated);
      function fn_1468() {
        return "orWhere basic";
      }
      test_1464.assert(q_1467.toSql().toString() === "SELECT * FROM users WHERE status = 'active'", fn_1468);
      return;
    } finally {
      test_1464.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_1469 = new Test_842();
    try {
      const t_1470 = from(sid_1338("users"));
      const accumulator_1471 = new SqlBuilder();
      accumulator_1471.appendSafe("age > ");
      accumulator_1471.appendInt32(18);
      const t_1472 = t_1470.where(accumulator_1471.accumulated);
      const accumulator_1473 = new SqlBuilder();
      accumulator_1473.appendSafe("vip = ");
      accumulator_1473.appendBoolean(true);
      const q_1474 = t_1472.orWhere(accumulator_1473.accumulated);
      function fn_1475() {
        return "where then orWhere";
      }
      test_1469.assert(q_1474.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE", fn_1475);
      return;
    } finally {
      test_1469.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_1476 = new Test_842();
    try {
      const t_1477 = from(sid_1338("users"));
      const accumulator_1478 = new SqlBuilder();
      accumulator_1478.appendSafe("active = ");
      accumulator_1478.appendBoolean(true);
      const t_1479 = t_1477.where(accumulator_1478.accumulated);
      const accumulator_1480 = new SqlBuilder();
      accumulator_1480.appendSafe("role = ");
      accumulator_1480.appendString("admin");
      const t_1481 = t_1479.orWhere(accumulator_1480.accumulated);
      const accumulator_1482 = new SqlBuilder();
      accumulator_1482.appendSafe("role = ");
      accumulator_1482.appendString("moderator");
      const q_1483 = t_1481.orWhere(accumulator_1482.accumulated);
      function fn_1484() {
        return "multiple orWhere";
      }
      test_1476.assert(q_1483.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'", fn_1484);
      return;
    } finally {
      test_1476.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_1485 = new Test_842();
    try {
      const t_1486 = from(sid_1338("users"));
      const accumulator_1487 = new SqlBuilder();
      accumulator_1487.appendSafe("age > ");
      accumulator_1487.appendInt32(18);
      const t_1488 = t_1486.where(accumulator_1487.accumulated);
      const accumulator_1489 = new SqlBuilder();
      accumulator_1489.appendSafe("active = ");
      accumulator_1489.appendBoolean(true);
      const t_1490 = t_1488.where(accumulator_1489.accumulated);
      const accumulator_1491 = new SqlBuilder();
      accumulator_1491.appendSafe("vip = ");
      accumulator_1491.appendBoolean(true);
      const q_1492 = t_1490.orWhere(accumulator_1491.accumulated);
      function fn_1493() {
        return "mixed where and orWhere";
      }
      test_1485.assert(q_1492.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE", fn_1493);
      return;
    } finally {
      test_1485.softFailToHard();
    }
});
it("whereNull", function () {
    const test_1494 = new Test_842();
    try {
      const q_1495 = from(sid_1338("users")).whereNull(sid_1338("deleted_at"));
      function fn_1496() {
        return "whereNull";
      }
      test_1494.assert(q_1495.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL", fn_1496);
      return;
    } finally {
      test_1494.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_1497 = new Test_842();
    try {
      const q_1498 = from(sid_1338("users")).whereNotNull(sid_1338("email"));
      function fn_1499() {
        return "whereNotNull";
      }
      test_1497.assert(q_1498.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL", fn_1499);
      return;
    } finally {
      test_1497.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_1500 = new Test_842();
    try {
      const t_1501 = from(sid_1338("users"));
      const accumulator_1502 = new SqlBuilder();
      accumulator_1502.appendSafe("active = ");
      accumulator_1502.appendBoolean(true);
      const q_1503 = t_1501.where(accumulator_1502.accumulated).whereNull(sid_1338("deleted_at"));
      function fn_1504() {
        return "whereNull chained";
      }
      test_1500.assert(q_1503.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL", fn_1504);
      return;
    } finally {
      test_1500.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_1505 = new Test_842();
    try {
      const t_1506 = from(sid_1338("users")).whereNull(sid_1338("deleted_at"));
      const accumulator_1507 = new SqlBuilder();
      accumulator_1507.appendSafe("role = ");
      accumulator_1507.appendString("admin");
      const q_1508 = t_1506.orWhere(accumulator_1507.accumulated);
      function fn_1509() {
        return "whereNotNull with orWhere";
      }
      test_1505.assert(q_1508.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'", fn_1509);
      return;
    } finally {
      test_1505.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1510 = new Test_842();
    try {
      const q_1511 = from(sid_1338("users")).whereIn(sid_1338("id"), Object.freeze([new SqlInt32(1), new SqlInt32(2), new SqlInt32(3)]));
      function fn_1512() {
        return "whereIn ints";
      }
      test_1510.assert(q_1511.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)", fn_1512);
      return;
    } finally {
      test_1510.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1513 = new Test_842();
    try {
      const q_1514 = from(sid_1338("users")).whereIn(sid_1338("name"), Object.freeze([new SqlString("Alice"), new SqlString("Bob's")]));
      function fn_1515() {
        return "whereIn strings";
      }
      test_1513.assert(q_1514.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')", fn_1515);
      return;
    } finally {
      test_1513.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1516 = new Test_842();
    try {
      const q_1517 = from(sid_1338("users")).whereIn(sid_1338("id"), Object.freeze([]));
      function fn_1518() {
        return "whereIn empty";
      }
      test_1516.assert(q_1517.toSql().toString() === "SELECT * FROM users WHERE 1 = 0", fn_1518);
      return;
    } finally {
      test_1516.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1519 = new Test_842();
    try {
      const t_1520 = from(sid_1338("users"));
      const accumulator_1521 = new SqlBuilder();
      accumulator_1521.appendSafe("active = ");
      accumulator_1521.appendBoolean(true);
      const q_1522 = t_1520.where(accumulator_1521.accumulated).whereIn(sid_1338("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      function fn_1523() {
        return "whereIn chained";
      }
      test_1519.assert(q_1522.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')", fn_1523);
      return;
    } finally {
      test_1519.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1524 = new Test_842();
    try {
      const q_1525 = from(sid_1338("users")).whereIn(sid_1338("id"), Object.freeze([new SqlInt32(42)]));
      function fn_1526() {
        return "whereIn single";
      }
      test_1524.assert(q_1525.toSql().toString() === "SELECT * FROM users WHERE id IN (42)", fn_1526);
      return;
    } finally {
      test_1524.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1527 = new Test_842();
    try {
      const t_1528 = from(sid_1338("users"));
      const accumulator_1529 = new SqlBuilder();
      accumulator_1529.appendSafe("active = ");
      accumulator_1529.appendBoolean(true);
      const q_1530 = t_1528.whereNot(accumulator_1529.accumulated);
      function fn_1531() {
        return "whereNot";
      }
      test_1527.assert(q_1530.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)", fn_1531);
      return;
    } finally {
      test_1527.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1532 = new Test_842();
    try {
      const t_1533 = from(sid_1338("users"));
      const accumulator_1534 = new SqlBuilder();
      accumulator_1534.appendSafe("age > ");
      accumulator_1534.appendInt32(18);
      const t_1535 = t_1533.where(accumulator_1534.accumulated);
      const accumulator_1536 = new SqlBuilder();
      accumulator_1536.appendSafe("banned = ");
      accumulator_1536.appendBoolean(true);
      const q_1537 = t_1535.whereNot(accumulator_1536.accumulated);
      function fn_1538() {
        return "whereNot chained";
      }
      test_1532.assert(q_1537.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)", fn_1538);
      return;
    } finally {
      test_1532.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1539 = new Test_842();
    try {
      const q_1540 = from(sid_1338("users")).whereBetween(sid_1338("age"), new SqlInt32(18), new SqlInt32(65));
      function fn_1541() {
        return "whereBetween ints";
      }
      test_1539.assert(q_1540.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65", fn_1541);
      return;
    } finally {
      test_1539.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_1542 = new Test_842();
    try {
      const t_1543 = from(sid_1338("users"));
      const accumulator_1544 = new SqlBuilder();
      accumulator_1544.appendSafe("active = ");
      accumulator_1544.appendBoolean(true);
      const q_1545 = t_1543.where(accumulator_1544.accumulated).whereBetween(sid_1338("age"), new SqlInt32(21), new SqlInt32(30));
      function fn_1546() {
        return "whereBetween chained";
      }
      test_1542.assert(q_1545.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30", fn_1546);
      return;
    } finally {
      test_1542.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_1547 = new Test_842();
    try {
      const q_1548 = from(sid_1338("users")).whereLike(sid_1338("name"), "John%");
      function fn_1549() {
        return "whereLike";
      }
      test_1547.assert(q_1548.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'", fn_1549);
      return;
    } finally {
      test_1547.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_1550 = new Test_842();
    try {
      const q_1551 = from(sid_1338("users")).whereILike(sid_1338("email"), "%@gmail.com");
      function fn_1552() {
        return "whereILike";
      }
      test_1550.assert(q_1551.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'", fn_1552);
      return;
    } finally {
      test_1550.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_1553 = new Test_842();
    try {
      const q_1554 = from(sid_1338("users")).whereLike(sid_1338("name"), "'; DROP TABLE users; --");
      const s_1555 = q_1554.toSql().toString();
      const t_1556 = s_1555.indexOf("''") >= 0;
      function fn_1557() {
        return "like injection escaped: " + s_1555;
      }
      test_1553.assert(t_1556, fn_1557);
      const t_1558 = s_1555.indexOf("LIKE") >= 0;
      function fn_1559() {
        return "like structure intact: " + s_1555;
      }
      test_1553.assert(t_1558, fn_1559);
      return;
    } finally {
      test_1553.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_1560 = new Test_842();
    try {
      const q_1561 = from(sid_1338("users")).whereLike(sid_1338("name"), "%son%");
      function fn_1562() {
        return "whereLike wildcard";
      }
      test_1560.assert(q_1561.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'", fn_1562);
      return;
    } finally {
      test_1560.softFailToHard();
    }
});
it("countAll produces COUNT(*)", function () {
    const test_1563 = new Test_842();
    try {
      const f_1564 = countAll();
      function fn_1565() {
        return "countAll";
      }
      test_1563.assert(f_1564.toString() === "COUNT(*)", fn_1565);
      return;
    } finally {
      test_1563.softFailToHard();
    }
});
it("countCol produces COUNT(field)", function () {
    const test_1566 = new Test_842();
    try {
      const f_1567 = countCol(sid_1338("id"));
      function fn_1568() {
        return "countCol";
      }
      test_1566.assert(f_1567.toString() === "COUNT(id)", fn_1568);
      return;
    } finally {
      test_1566.softFailToHard();
    }
});
it("sumCol produces SUM(field)", function () {
    const test_1569 = new Test_842();
    try {
      const f_1570 = sumCol(sid_1338("amount"));
      function fn_1571() {
        return "sumCol";
      }
      test_1569.assert(f_1570.toString() === "SUM(amount)", fn_1571);
      return;
    } finally {
      test_1569.softFailToHard();
    }
});
it("avgCol produces AVG(field)", function () {
    const test_1572 = new Test_842();
    try {
      const f_1573 = avgCol(sid_1338("price"));
      function fn_1574() {
        return "avgCol";
      }
      test_1572.assert(f_1573.toString() === "AVG(price)", fn_1574);
      return;
    } finally {
      test_1572.softFailToHard();
    }
});
it("minCol produces MIN(field)", function () {
    const test_1575 = new Test_842();
    try {
      const f_1576 = minCol(sid_1338("created_at"));
      function fn_1577() {
        return "minCol";
      }
      test_1575.assert(f_1576.toString() === "MIN(created_at)", fn_1577);
      return;
    } finally {
      test_1575.softFailToHard();
    }
});
it("maxCol produces MAX(field)", function () {
    const test_1578 = new Test_842();
    try {
      const f_1579 = maxCol(sid_1338("score"));
      function fn_1580() {
        return "maxCol";
      }
      test_1578.assert(f_1579.toString() === "MAX(score)", fn_1580);
      return;
    } finally {
      test_1578.softFailToHard();
    }
});
it("selectExpr with aggregate", function () {
    const test_1581 = new Test_842();
    try {
      const q_1582 = from(sid_1338("orders")).selectExpr(Object.freeze([countAll()]));
      function fn_1583() {
        return "selectExpr count";
      }
      test_1581.assert(q_1582.toSql().toString() === "SELECT COUNT(*) FROM orders", fn_1583);
      return;
    } finally {
      test_1581.softFailToHard();
    }
});
it("selectExpr with multiple expressions", function () {
    const test_1584 = new Test_842();
    try {
      const nameFrag_1585 = col(sid_1338("users"), sid_1338("name"));
      const q_1586 = from(sid_1338("users")).selectExpr(Object.freeze([nameFrag_1585, countAll()]));
      function fn_1587() {
        return "selectExpr multi";
      }
      test_1584.assert(q_1586.toSql().toString() === "SELECT users.name, COUNT(*) FROM users", fn_1587);
      return;
    } finally {
      test_1584.softFailToHard();
    }
});
it("selectExpr overrides selectedFields", function () {
    const test_1588 = new Test_842();
    try {
      const q_1589 = from(sid_1338("users")).select(Object.freeze([sid_1338("id"), sid_1338("name")])).selectExpr(Object.freeze([countAll()]));
      function fn_1590() {
        return "selectExpr overrides select";
      }
      test_1588.assert(q_1589.toSql().toString() === "SELECT COUNT(*) FROM users", fn_1590);
      return;
    } finally {
      test_1588.softFailToHard();
    }
});
it("groupBy single field", function () {
    const test_1591 = new Test_842();
    try {
      const q_1592 = from(sid_1338("orders")).selectExpr(Object.freeze([col(sid_1338("orders"), sid_1338("status")), countAll()])).groupBy(sid_1338("status"));
      function fn_1593() {
        return "groupBy single";
      }
      test_1591.assert(q_1592.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status", fn_1593);
      return;
    } finally {
      test_1591.softFailToHard();
    }
});
it("groupBy multiple fields", function () {
    const test_1594 = new Test_842();
    try {
      const q_1595 = from(sid_1338("orders")).groupBy(sid_1338("status")).groupBy(sid_1338("category"));
      function fn_1596() {
        return "groupBy multiple";
      }
      test_1594.assert(q_1595.toSql().toString() === "SELECT * FROM orders GROUP BY status, category", fn_1596);
      return;
    } finally {
      test_1594.softFailToHard();
    }
});
it("having basic", function () {
    const test_1597 = new Test_842();
    try {
      const t_1598 = from(sid_1338("orders")).selectExpr(Object.freeze([col(sid_1338("orders"), sid_1338("status")), countAll()])).groupBy(sid_1338("status"));
      const accumulator_1599 = new SqlBuilder();
      accumulator_1599.appendSafe("COUNT(*) > ");
      accumulator_1599.appendInt32(5);
      const q_1600 = t_1598.having(accumulator_1599.accumulated);
      function fn_1601() {
        return "having basic";
      }
      test_1597.assert(q_1600.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5", fn_1601);
      return;
    } finally {
      test_1597.softFailToHard();
    }
});
it("orHaving", function () {
    const test_1602 = new Test_842();
    try {
      const t_1603 = from(sid_1338("orders")).groupBy(sid_1338("status"));
      const accumulator_1604 = new SqlBuilder();
      accumulator_1604.appendSafe("COUNT(*) > ");
      accumulator_1604.appendInt32(5);
      const t_1605 = t_1603.having(accumulator_1604.accumulated);
      const accumulator_1606 = new SqlBuilder();
      accumulator_1606.appendSafe("SUM(total) > ");
      accumulator_1606.appendInt32(1000);
      const q_1607 = t_1605.orHaving(accumulator_1606.accumulated);
      function fn_1608() {
        return "orHaving";
      }
      test_1602.assert(q_1607.toSql().toString() === "SELECT * FROM orders GROUP BY status HAVING COUNT(*) > 5 OR SUM(total) > 1000", fn_1608);
      return;
    } finally {
      test_1602.softFailToHard();
    }
});
it("distinct basic", function () {
    const test_1609 = new Test_842();
    try {
      const q_1610 = from(sid_1338("users")).select(Object.freeze([sid_1338("name")])).distinct();
      function fn_1611() {
        return "distinct";
      }
      test_1609.assert(q_1610.toSql().toString() === "SELECT DISTINCT name FROM users", fn_1611);
      return;
    } finally {
      test_1609.softFailToHard();
    }
});
it("distinct with where", function () {
    const test_1612 = new Test_842();
    try {
      const t_1613 = from(sid_1338("users")).select(Object.freeze([sid_1338("email")]));
      const accumulator_1614 = new SqlBuilder();
      accumulator_1614.appendSafe("active = ");
      accumulator_1614.appendBoolean(true);
      const q_1615 = t_1613.where(accumulator_1614.accumulated).distinct();
      function fn_1616() {
        return "distinct with where";
      }
      test_1612.assert(q_1615.toSql().toString() === "SELECT DISTINCT email FROM users WHERE active = TRUE", fn_1616);
      return;
    } finally {
      test_1612.softFailToHard();
    }
});
it("countSql bare", function () {
    const test_1617 = new Test_842();
    try {
      const q_1618 = from(sid_1338("users"));
      function fn_1619() {
        return "countSql bare";
      }
      test_1617.assert(q_1618.countSql().toString() === "SELECT COUNT(*) FROM users", fn_1619);
      return;
    } finally {
      test_1617.softFailToHard();
    }
});
it("countSql with WHERE", function () {
    const test_1620 = new Test_842();
    try {
      const t_1621 = from(sid_1338("users"));
      const accumulator_1622 = new SqlBuilder();
      accumulator_1622.appendSafe("active = ");
      accumulator_1622.appendBoolean(true);
      const q_1623 = t_1621.where(accumulator_1622.accumulated);
      function fn_1624() {
        return "countSql with where";
      }
      test_1620.assert(q_1623.countSql().toString() === "SELECT COUNT(*) FROM users WHERE active = TRUE", fn_1624);
      return;
    } finally {
      test_1620.softFailToHard();
    }
});
it("countSql with JOIN", function () {
    const test_1625 = new Test_842();
    try {
      const t_1626 = from(sid_1338("users"));
      const t_1627 = sid_1338("orders");
      const accumulator_1628 = new SqlBuilder();
      accumulator_1628.appendSafe("users.id = orders.user_id");
      const t_1629 = t_1626.innerJoin(t_1627, accumulator_1628.accumulated);
      const accumulator_1630 = new SqlBuilder();
      accumulator_1630.appendSafe("orders.total > ");
      accumulator_1630.appendInt32(100);
      const q_1631 = t_1629.where(accumulator_1630.accumulated);
      function fn_1632() {
        return "countSql with join";
      }
      test_1625.assert(q_1631.countSql().toString() === "SELECT COUNT(*) FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100", fn_1632);
      return;
    } finally {
      test_1625.softFailToHard();
    }
});
it("countSql drops orderBy/limit/offset", function () {
    const test_1633 = new Test_842();
    try {
      let q_1634;
      try {
        const t_1635 = from(sid_1338("users"));
        const accumulator_1636 = new SqlBuilder();
        accumulator_1636.appendSafe("active = ");
        accumulator_1636.appendBoolean(true);
        const t_1637 = t_1635.where(accumulator_1636.accumulated).orderBy(sid_1338("name"), true).limit(10);
        q_1634 = t_1637.offset(20);
      } catch {
        q_1634 = panic_839();
      }
      const s_1638 = q_1634.countSql().toString();
      function fn_1639() {
        return "countSql drops extras: " + s_1638;
      }
      test_1633.assert(s_1638 === "SELECT COUNT(*) FROM users WHERE active = TRUE", fn_1639);
      return;
    } finally {
      test_1633.softFailToHard();
    }
});
it("full aggregation query", function () {
    const test_1640 = new Test_842();
    try {
      const t_1641 = from(sid_1338("orders")).selectExpr(Object.freeze([col(sid_1338("orders"), sid_1338("status")), countAll(), sumCol(sid_1338("total"))]));
      const t_1642 = sid_1338("users");
      const accumulator_1643 = new SqlBuilder();
      accumulator_1643.appendSafe("orders.user_id = users.id");
      const t_1644 = t_1641.innerJoin(t_1642, accumulator_1643.accumulated);
      const accumulator_1645 = new SqlBuilder();
      accumulator_1645.appendSafe("users.active = ");
      accumulator_1645.appendBoolean(true);
      const t_1646 = t_1644.where(accumulator_1645.accumulated).groupBy(sid_1338("status"));
      const accumulator_1647 = new SqlBuilder();
      accumulator_1647.appendSafe("COUNT(*) > ");
      accumulator_1647.appendInt32(3);
      const q_1648 = t_1646.having(accumulator_1647.accumulated).orderBy(sid_1338("status"), true);
      const expected_1649 = "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      function fn_1650() {
        return "full aggregation";
      }
      test_1640.assert(q_1648.toSql().toString() === "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC", fn_1650);
      return;
    } finally {
      test_1640.softFailToHard();
    }
});
it("unionSql", function () {
    const test_1651 = new Test_842();
    try {
      const t_1652 = from(sid_1338("users"));
      const accumulator_1653 = new SqlBuilder();
      accumulator_1653.appendSafe("role = ");
      accumulator_1653.appendString("admin");
      const a_1654 = t_1652.where(accumulator_1653.accumulated);
      const t_1655 = from(sid_1338("users"));
      const accumulator_1656 = new SqlBuilder();
      accumulator_1656.appendSafe("role = ");
      accumulator_1656.appendString("moderator");
      const b_1657 = t_1655.where(accumulator_1656.accumulated);
      const s_1658 = unionSql(a_1654, b_1657).toString();
      function fn_1659() {
        return "unionSql: " + s_1658;
      }
      test_1651.assert(s_1658 === "(SELECT * FROM users WHERE role = 'admin') UNION (SELECT * FROM users WHERE role = 'moderator')", fn_1659);
      return;
    } finally {
      test_1651.softFailToHard();
    }
});
it("unionAllSql", function () {
    const test_1660 = new Test_842();
    try {
      const a_1661 = from(sid_1338("users")).select(Object.freeze([sid_1338("name")]));
      const b_1662 = from(sid_1338("contacts")).select(Object.freeze([sid_1338("name")]));
      const s_1663 = unionAllSql(a_1661, b_1662).toString();
      function fn_1664() {
        return "unionAllSql: " + s_1663;
      }
      test_1660.assert(s_1663 === "(SELECT name FROM users) UNION ALL (SELECT name FROM contacts)", fn_1664);
      return;
    } finally {
      test_1660.softFailToHard();
    }
});
it("intersectSql", function () {
    const test_1665 = new Test_842();
    try {
      const a_1666 = from(sid_1338("users")).select(Object.freeze([sid_1338("email")]));
      const b_1667 = from(sid_1338("subscribers")).select(Object.freeze([sid_1338("email")]));
      const s_1668 = intersectSql(a_1666, b_1667).toString();
      function fn_1669() {
        return "intersectSql: " + s_1668;
      }
      test_1665.assert(s_1668 === "(SELECT email FROM users) INTERSECT (SELECT email FROM subscribers)", fn_1669);
      return;
    } finally {
      test_1665.softFailToHard();
    }
});
it("exceptSql", function () {
    const test_1670 = new Test_842();
    try {
      const a_1671 = from(sid_1338("users")).select(Object.freeze([sid_1338("id")]));
      const b_1672 = from(sid_1338("banned")).select(Object.freeze([sid_1338("id")]));
      const s_1673 = exceptSql(a_1671, b_1672).toString();
      function fn_1674() {
        return "exceptSql: " + s_1673;
      }
      test_1670.assert(s_1673 === "(SELECT id FROM users) EXCEPT (SELECT id FROM banned)", fn_1674);
      return;
    } finally {
      test_1670.softFailToHard();
    }
});
it("subquery with alias", function () {
    const test_1675 = new Test_842();
    try {
      const t_1676 = from(sid_1338("orders")).select(Object.freeze([sid_1338("user_id")]));
      const accumulator_1677 = new SqlBuilder();
      accumulator_1677.appendSafe("total > ");
      accumulator_1677.appendInt32(100);
      const inner_1678 = t_1676.where(accumulator_1677.accumulated);
      const s_1679 = subquery(inner_1678, sid_1338("big_orders")).toString();
      function fn_1680() {
        return "subquery: " + s_1679;
      }
      test_1675.assert(s_1679 === "(SELECT user_id FROM orders WHERE total > 100) AS big_orders", fn_1680);
      return;
    } finally {
      test_1675.softFailToHard();
    }
});
it("existsSql", function () {
    const test_1681 = new Test_842();
    try {
      const t_1682 = from(sid_1338("orders"));
      const accumulator_1683 = new SqlBuilder();
      accumulator_1683.appendSafe("orders.user_id = users.id");
      const inner_1684 = t_1682.where(accumulator_1683.accumulated);
      const s_1685 = existsSql(inner_1684).toString();
      function fn_1686() {
        return "existsSql: " + s_1685;
      }
      test_1681.assert(s_1685 === "EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)", fn_1686);
      return;
    } finally {
      test_1681.softFailToHard();
    }
});
it("whereInSubquery", function () {
    const test_1687 = new Test_842();
    try {
      const t_1688 = from(sid_1338("orders")).select(Object.freeze([sid_1338("user_id")]));
      const accumulator_1689 = new SqlBuilder();
      accumulator_1689.appendSafe("total > ");
      accumulator_1689.appendInt32(1000);
      const sub_1690 = t_1688.where(accumulator_1689.accumulated);
      const q_1691 = from(sid_1338("users")).whereInSubquery(sid_1338("id"), sub_1690);
      const s_1692 = q_1691.toSql().toString();
      function fn_1693() {
        return "whereInSubquery: " + s_1692;
      }
      test_1687.assert(s_1692 === "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000)", fn_1693);
      return;
    } finally {
      test_1687.softFailToHard();
    }
});
it("set operation with WHERE on each side", function () {
    const test_1694 = new Test_842();
    try {
      const t_1695 = from(sid_1338("users"));
      const accumulator_1696 = new SqlBuilder();
      accumulator_1696.appendSafe("age > ");
      accumulator_1696.appendInt32(18);
      const t_1697 = t_1695.where(accumulator_1696.accumulated);
      const accumulator_1698 = new SqlBuilder();
      accumulator_1698.appendSafe("active = ");
      accumulator_1698.appendBoolean(true);
      const a_1699 = t_1697.where(accumulator_1698.accumulated);
      const t_1700 = from(sid_1338("users"));
      const accumulator_1701 = new SqlBuilder();
      accumulator_1701.appendSafe("role = ");
      accumulator_1701.appendString("vip");
      const b_1702 = t_1700.where(accumulator_1701.accumulated);
      const s_1703 = unionSql(a_1699, b_1702).toString();
      function fn_1704() {
        return "union with where: " + s_1703;
      }
      test_1694.assert(s_1703 === "(SELECT * FROM users WHERE age > 18 AND active = TRUE) UNION (SELECT * FROM users WHERE role = 'vip')", fn_1704);
      return;
    } finally {
      test_1694.softFailToHard();
    }
});
it("whereInSubquery chained with where", function () {
    const test_1705 = new Test_842();
    try {
      const sub_1706 = from(sid_1338("orders")).select(Object.freeze([sid_1338("user_id")]));
      const t_1707 = from(sid_1338("users"));
      const accumulator_1708 = new SqlBuilder();
      accumulator_1708.appendSafe("active = ");
      accumulator_1708.appendBoolean(true);
      const q_1709 = t_1707.where(accumulator_1708.accumulated).whereInSubquery(sid_1338("id"), sub_1706);
      const s_1710 = q_1709.toSql().toString();
      function fn_1711() {
        return "whereInSubquery chained: " + s_1710;
      }
      test_1705.assert(s_1710 === "SELECT * FROM users WHERE active = TRUE AND id IN (SELECT user_id FROM orders)", fn_1711);
      return;
    } finally {
      test_1705.softFailToHard();
    }
});
it("existsSql used in where", function () {
    const test_1712 = new Test_842();
    try {
      const t_1713 = from(sid_1338("orders"));
      const accumulator_1714 = new SqlBuilder();
      accumulator_1714.appendSafe("orders.user_id = users.id");
      const sub_1715 = t_1713.where(accumulator_1714.accumulated);
      const q_1716 = from(sid_1338("users")).where(existsSql(sub_1715));
      const s_1717 = q_1716.toSql().toString();
      function fn_1718() {
        return "exists in where: " + s_1717;
      }
      test_1712.assert(s_1717 === "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)", fn_1718);
      return;
    } finally {
      test_1712.softFailToHard();
    }
});
it("UpdateQuery basic", function () {
    const test_1719 = new Test_842();
    try {
      let q_1720;
      try {
        const t_1721 = update(sid_1338("users")).set(sid_1338("name"), new SqlString("Alice"));
        const accumulator_1722 = new SqlBuilder();
        accumulator_1722.appendSafe("id = ");
        accumulator_1722.appendInt32(1);
        q_1720 = t_1721.where(accumulator_1722.accumulated).toSql();
      } catch {
        q_1720 = panic_839();
      }
      function fn_1723() {
        return "update basic";
      }
      test_1719.assert(q_1720.toString() === "UPDATE users SET name = 'Alice' WHERE id = 1", fn_1723);
      return;
    } finally {
      test_1719.softFailToHard();
    }
});
it("UpdateQuery multiple SET", function () {
    const test_1724 = new Test_842();
    try {
      let q_1725;
      try {
        const t_1726 = update(sid_1338("users")).set(sid_1338("name"), new SqlString("Bob")).set(sid_1338("age"), new SqlInt32(30));
        const accumulator_1727 = new SqlBuilder();
        accumulator_1727.appendSafe("id = ");
        accumulator_1727.appendInt32(2);
        q_1725 = t_1726.where(accumulator_1727.accumulated).toSql();
      } catch {
        q_1725 = panic_839();
      }
      function fn_1728() {
        return "update multi set";
      }
      test_1724.assert(q_1725.toString() === "UPDATE users SET name = 'Bob', age = 30 WHERE id = 2", fn_1728);
      return;
    } finally {
      test_1724.softFailToHard();
    }
});
it("UpdateQuery multiple WHERE", function () {
    const test_1729 = new Test_842();
    try {
      let q_1730;
      try {
        const t_1731 = update(sid_1338("users")).set(sid_1338("active"), new SqlBoolean(false));
        const accumulator_1732 = new SqlBuilder();
        accumulator_1732.appendSafe("age < ");
        accumulator_1732.appendInt32(18);
        const t_1733 = t_1731.where(accumulator_1732.accumulated);
        const accumulator_1734 = new SqlBuilder();
        accumulator_1734.appendSafe("role = ");
        accumulator_1734.appendString("guest");
        q_1730 = t_1733.where(accumulator_1734.accumulated).toSql();
      } catch {
        q_1730 = panic_839();
      }
      function fn_1735() {
        return "update multi where";
      }
      test_1729.assert(q_1730.toString() === "UPDATE users SET active = FALSE WHERE age < 18 AND role = 'guest'", fn_1735);
      return;
    } finally {
      test_1729.softFailToHard();
    }
});
it("UpdateQuery orWhere", function () {
    const test_1736 = new Test_842();
    try {
      let q_1737;
      try {
        const t_1738 = update(sid_1338("users")).set(sid_1338("status"), new SqlString("banned"));
        const accumulator_1739 = new SqlBuilder();
        accumulator_1739.appendSafe("spam_count > ");
        accumulator_1739.appendInt32(10);
        const t_1740 = t_1738.where(accumulator_1739.accumulated);
        const accumulator_1741 = new SqlBuilder();
        accumulator_1741.appendSafe("reported = ");
        accumulator_1741.appendBoolean(true);
        q_1737 = t_1740.orWhere(accumulator_1741.accumulated).toSql();
      } catch {
        q_1737 = panic_839();
      }
      function fn_1742() {
        return "update orWhere";
      }
      test_1736.assert(q_1737.toString() === "UPDATE users SET status = 'banned' WHERE spam_count > 10 OR reported = TRUE", fn_1742);
      return;
    } finally {
      test_1736.softFailToHard();
    }
});
it("UpdateQuery bubbles without WHERE", function () {
    const test_1743 = new Test_842();
    try {
      let didBubble_1744;
      try {
        update(sid_1338("users")).set(sid_1338("x"), new SqlInt32(1)).toSql();
        didBubble_1744 = false;
      } catch {
        didBubble_1744 = true;
      }
      function fn_1745() {
        return "update without WHERE should bubble";
      }
      test_1743.assert(didBubble_1744, fn_1745);
      return;
    } finally {
      test_1743.softFailToHard();
    }
});
it("UpdateQuery bubbles without SET", function () {
    const test_1746 = new Test_842();
    try {
      let didBubble_1747;
      try {
        const t_1748 = update(sid_1338("users"));
        const accumulator_1749 = new SqlBuilder();
        accumulator_1749.appendSafe("id = ");
        accumulator_1749.appendInt32(1);
        t_1748.where(accumulator_1749.accumulated).toSql();
        didBubble_1747 = false;
      } catch {
        didBubble_1747 = true;
      }
      function fn_1750() {
        return "update without SET should bubble";
      }
      test_1746.assert(didBubble_1747, fn_1750);
      return;
    } finally {
      test_1746.softFailToHard();
    }
});
it("UpdateQuery with limit", function () {
    const test_1751 = new Test_842();
    try {
      let q_1752;
      try {
        const t_1753 = update(sid_1338("users")).set(sid_1338("active"), new SqlBoolean(false));
        const accumulator_1754 = new SqlBuilder();
        accumulator_1754.appendSafe("last_login < ");
        accumulator_1754.appendString("2024-01-01");
        const t_1755 = t_1753.where(accumulator_1754.accumulated).limit(100);
        q_1752 = t_1755.toSql();
      } catch {
        q_1752 = panic_839();
      }
      function fn_1756() {
        return "update limit";
      }
      test_1751.assert(q_1752.toString() === "UPDATE users SET active = FALSE WHERE last_login < '2024-01-01' LIMIT 100", fn_1756);
      return;
    } finally {
      test_1751.softFailToHard();
    }
});
it("UpdateQuery escaping", function () {
    const test_1757 = new Test_842();
    try {
      let q_1758;
      try {
        const t_1759 = update(sid_1338("users")).set(sid_1338("bio"), new SqlString("It's a test"));
        const accumulator_1760 = new SqlBuilder();
        accumulator_1760.appendSafe("id = ");
        accumulator_1760.appendInt32(1);
        q_1758 = t_1759.where(accumulator_1760.accumulated).toSql();
      } catch {
        q_1758 = panic_839();
      }
      function fn_1761() {
        return "update escaping";
      }
      test_1757.assert(q_1758.toString() === "UPDATE users SET bio = 'It''s a test' WHERE id = 1", fn_1761);
      return;
    } finally {
      test_1757.softFailToHard();
    }
});
it("DeleteQuery basic", function () {
    const test_1762 = new Test_842();
    try {
      let q_1763;
      try {
        const t_1764 = deleteFrom(sid_1338("users"));
        const accumulator_1765 = new SqlBuilder();
        accumulator_1765.appendSafe("id = ");
        accumulator_1765.appendInt32(1);
        q_1763 = t_1764.where(accumulator_1765.accumulated).toSql();
      } catch {
        q_1763 = panic_839();
      }
      function fn_1766() {
        return "delete basic";
      }
      test_1762.assert(q_1763.toString() === "DELETE FROM users WHERE id = 1", fn_1766);
      return;
    } finally {
      test_1762.softFailToHard();
    }
});
it("DeleteQuery multiple WHERE", function () {
    const test_1767 = new Test_842();
    try {
      let q_1768;
      try {
        const t_1769 = deleteFrom(sid_1338("logs"));
        const accumulator_1770 = new SqlBuilder();
        accumulator_1770.appendSafe("created_at < ");
        accumulator_1770.appendString("2024-01-01");
        const t_1771 = t_1769.where(accumulator_1770.accumulated);
        const accumulator_1772 = new SqlBuilder();
        accumulator_1772.appendSafe("level = ");
        accumulator_1772.appendString("debug");
        q_1768 = t_1771.where(accumulator_1772.accumulated).toSql();
      } catch {
        q_1768 = panic_839();
      }
      function fn_1773() {
        return "delete multi where";
      }
      test_1767.assert(q_1768.toString() === "DELETE FROM logs WHERE created_at < '2024-01-01' AND level = 'debug'", fn_1773);
      return;
    } finally {
      test_1767.softFailToHard();
    }
});
it("DeleteQuery bubbles without WHERE", function () {
    const test_1774 = new Test_842();
    try {
      let didBubble_1775;
      try {
        deleteFrom(sid_1338("users")).toSql();
        didBubble_1775 = false;
      } catch {
        didBubble_1775 = true;
      }
      function fn_1776() {
        return "delete without WHERE should bubble";
      }
      test_1774.assert(didBubble_1775, fn_1776);
      return;
    } finally {
      test_1774.softFailToHard();
    }
});
it("DeleteQuery orWhere", function () {
    const test_1777 = new Test_842();
    try {
      let q_1778;
      try {
        const t_1779 = deleteFrom(sid_1338("sessions"));
        const accumulator_1780 = new SqlBuilder();
        accumulator_1780.appendSafe("expired = ");
        accumulator_1780.appendBoolean(true);
        const t_1781 = t_1779.where(accumulator_1780.accumulated);
        const accumulator_1782 = new SqlBuilder();
        accumulator_1782.appendSafe("created_at < ");
        accumulator_1782.appendString("2023-01-01");
        q_1778 = t_1781.orWhere(accumulator_1782.accumulated).toSql();
      } catch {
        q_1778 = panic_839();
      }
      function fn_1783() {
        return "delete orWhere";
      }
      test_1777.assert(q_1778.toString() === "DELETE FROM sessions WHERE expired = TRUE OR created_at < '2023-01-01'", fn_1783);
      return;
    } finally {
      test_1777.softFailToHard();
    }
});
it("DeleteQuery with limit", function () {
    const test_1784 = new Test_842();
    try {
      let q_1785;
      try {
        const t_1786 = deleteFrom(sid_1338("logs"));
        const accumulator_1787 = new SqlBuilder();
        accumulator_1787.appendSafe("level = ");
        accumulator_1787.appendString("debug");
        const t_1788 = t_1786.where(accumulator_1787.accumulated).limit(1000);
        q_1785 = t_1788.toSql();
      } catch {
        q_1785 = panic_839();
      }
      function fn_1789() {
        return "delete limit";
      }
      test_1784.assert(q_1785.toString() === "DELETE FROM logs WHERE level = 'debug' LIMIT 1000", fn_1789);
      return;
    } finally {
      test_1784.softFailToHard();
    }
});
it("orderByNulls NULLS FIRST", function () {
    const test_1790 = new Test_842();
    try {
      const q_1791 = from(sid_1338("users")).orderByNulls(sid_1338("email"), true, new NullsFirst());
      function fn_1792() {
        return "nulls first";
      }
      test_1790.assert(q_1791.toSql().toString() === "SELECT * FROM users ORDER BY email ASC NULLS FIRST", fn_1792);
      return;
    } finally {
      test_1790.softFailToHard();
    }
});
it("orderByNulls NULLS LAST", function () {
    const test_1793 = new Test_842();
    try {
      const q_1794 = from(sid_1338("users")).orderByNulls(sid_1338("score"), false, new NullsLast());
      function fn_1795() {
        return "nulls last";
      }
      test_1793.assert(q_1794.toSql().toString() === "SELECT * FROM users ORDER BY score DESC NULLS LAST", fn_1795);
      return;
    } finally {
      test_1793.softFailToHard();
    }
});
it("mixed orderBy and orderByNulls", function () {
    const test_1796 = new Test_842();
    try {
      const q_1797 = from(sid_1338("users")).orderBy(sid_1338("name"), true).orderByNulls(sid_1338("email"), true, new NullsFirst());
      function fn_1798() {
        return "mixed order";
      }
      test_1796.assert(q_1797.toSql().toString() === "SELECT * FROM users ORDER BY name ASC, email ASC NULLS FIRST", fn_1798);
      return;
    } finally {
      test_1796.softFailToHard();
    }
});
it("crossJoin", function () {
    const test_1799 = new Test_842();
    try {
      const q_1800 = from(sid_1338("users")).crossJoin(sid_1338("colors"));
      function fn_1801() {
        return "cross join";
      }
      test_1799.assert(q_1800.toSql().toString() === "SELECT * FROM users CROSS JOIN colors", fn_1801);
      return;
    } finally {
      test_1799.softFailToHard();
    }
});
it("crossJoin combined with other joins", function () {
    const test_1802 = new Test_842();
    try {
      const t_1803 = from(sid_1338("users"));
      const t_1804 = sid_1338("orders");
      const accumulator_1805 = new SqlBuilder();
      accumulator_1805.appendSafe("users.id = orders.user_id");
      const q_1806 = t_1803.innerJoin(t_1804, accumulator_1805.accumulated).crossJoin(sid_1338("colors"));
      function fn_1807() {
        return "cross + inner join";
      }
      test_1802.assert(q_1806.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id CROSS JOIN colors", fn_1807);
      return;
    } finally {
      test_1802.softFailToHard();
    }
});
it("lock FOR UPDATE", function () {
    const test_1808 = new Test_842();
    try {
      const t_1809 = from(sid_1338("users"));
      const accumulator_1810 = new SqlBuilder();
      accumulator_1810.appendSafe("id = ");
      accumulator_1810.appendInt32(1);
      const q_1811 = t_1809.where(accumulator_1810.accumulated).lock(new ForUpdate());
      function fn_1812() {
        return "for update";
      }
      test_1808.assert(q_1811.toSql().toString() === "SELECT * FROM users WHERE id = 1 FOR UPDATE", fn_1812);
      return;
    } finally {
      test_1808.softFailToHard();
    }
});
it("lock FOR SHARE", function () {
    const test_1813 = new Test_842();
    try {
      const q_1814 = from(sid_1338("users")).select(Object.freeze([sid_1338("name")])).lock(new ForShare());
      function fn_1815() {
        return "for share";
      }
      test_1813.assert(q_1814.toSql().toString() === "SELECT name FROM users FOR SHARE", fn_1815);
      return;
    } finally {
      test_1813.softFailToHard();
    }
});
it("lock with full query", function () {
    const test_1816 = new Test_842();
    try {
      let q_1817;
      try {
        const t_1818 = from(sid_1338("accounts"));
        const accumulator_1819 = new SqlBuilder();
        accumulator_1819.appendSafe("id = ");
        accumulator_1819.appendInt32(42);
        const t_1820 = t_1818.where(accumulator_1819.accumulated).limit(1);
        q_1817 = t_1820.lock(new ForUpdate());
      } catch {
        q_1817 = panic_839();
      }
      function fn_1821() {
        return "lock full query";
      }
      test_1816.assert(q_1817.toSql().toString() === "SELECT * FROM accounts WHERE id = 42 LIMIT 1 FOR UPDATE", fn_1821);
      return;
    } finally {
      test_1816.softFailToHard();
    }
});
it("query builder immutability - two queries from same base", function () {
    const test_1822 = new Test_842();
    try {
      const t_1823 = from(sid_1338("users"));
      const accumulator_1824 = new SqlBuilder();
      accumulator_1824.appendSafe("active = ");
      accumulator_1824.appendBoolean(true);
      const base_1825 = t_1823.where(accumulator_1824.accumulated);
      let q1_1826;
      try {
        q1_1826 = base_1825.limit(10);
      } catch {
        q1_1826 = panic_839();
      }
      let q2_1827;
      try {
        q2_1827 = base_1825.limit(20);
      } catch {
        q2_1827 = panic_839();
      }
      function fn_1828() {
        return "q1";
      }
      test_1822.assert(q1_1826.toSql().toString() === "SELECT * FROM users WHERE active = TRUE LIMIT 10", fn_1828);
      function fn_1829() {
        return "q2";
      }
      test_1822.assert(q2_1827.toSql().toString() === "SELECT * FROM users WHERE active = TRUE LIMIT 20", fn_1829);
      return;
    } finally {
      test_1822.softFailToHard();
    }
});
it("limit zero produces LIMIT 0", function () {
    const test_1830 = new Test_842();
    try {
      let q_1831;
      try {
        q_1831 = from(sid_1338("users")).limit(0);
      } catch {
        q_1831 = panic_839();
      }
      function fn_1832() {
        return "limit 0";
      }
      test_1830.assert(q_1831.toSql().toString() === "SELECT * FROM users LIMIT 0", fn_1832);
      return;
    } finally {
      test_1830.softFailToHard();
    }
});
it("safeToSql with zero defaultLimit", function () {
    const test_1833 = new Test_842();
    try {
      const q_1834 = from(sid_1338("users"));
      let s_1835;
      try {
        s_1835 = q_1834.safeToSql(0);
      } catch {
        s_1835 = panic_839();
      }
      function fn_1836() {
        return "safeToSql 0";
      }
      test_1833.assert(s_1835.toString() === "SELECT * FROM users LIMIT 0", fn_1836);
      return;
    } finally {
      test_1833.softFailToHard();
    }
});
it("UpdateQuery limit bubbles on negative", function () {
    const test_1837 = new Test_842();
    try {
      let didBubble_1838;
      try {
        const t_1839 = update(sid_1338("users")).set(sid_1338("name"), new SqlString("x"));
        const accumulator_1840 = new SqlBuilder();
        accumulator_1840.appendSafe("id = ");
        accumulator_1840.appendInt32(1);
        t_1839.where(accumulator_1840.accumulated).limit(-1);
        didBubble_1838 = false;
      } catch {
        didBubble_1838 = true;
      }
      function fn_1841() {
        return "UpdateQuery negative limit should bubble";
      }
      test_1837.assert(didBubble_1838, fn_1841);
      return;
    } finally {
      test_1837.softFailToHard();
    }
});
it("DeleteQuery limit bubbles on negative", function () {
    const test_1842 = new Test_842();
    try {
      let didBubble_1843;
      try {
        const t_1844 = deleteFrom(sid_1338("users"));
        const accumulator_1845 = new SqlBuilder();
        accumulator_1845.appendSafe("id = ");
        accumulator_1845.appendInt32(1);
        t_1844.where(accumulator_1845.accumulated).limit(-1);
        didBubble_1843 = false;
      } catch {
        didBubble_1843 = true;
      }
      function fn_1846() {
        return "DeleteQuery negative limit should bubble";
      }
      test_1842.assert(didBubble_1843, fn_1846);
      return;
    } finally {
      test_1842.softFailToHard();
    }
});
it("UpdateQuery immutability - two from same base", function () {
    const test_1847 = new Test_842();
    try {
      let t_1848;
      let t_1849;
      const t_1850 = update(sid_1338("users")).set(sid_1338("name"), new SqlString("Alice"));
      const accumulator_1851 = new SqlBuilder();
      accumulator_1851.appendSafe("id = ");
      accumulator_1851.appendInt32(1);
      const base_1852 = t_1850.where(accumulator_1851.accumulated);
      const q1_1853 = base_1852.set(sid_1338("age"), new SqlInt32(25));
      const q2_1854 = base_1852.set(sid_1338("age"), new SqlInt32(30));
      try {
        t_1848 = q1_1853.toSql();
      } catch {
        t_1848 = panic_839();
      }
      const s1_1855 = t_1848.toString();
      try {
        t_1849 = q2_1854.toSql();
      } catch {
        t_1849 = panic_839();
      }
      const s2_1856 = t_1849.toString();
      const t_1857 = s1_1855.indexOf("25") >= 0;
      function fn_1858() {
        return "q1 should have 25: " + s1_1855;
      }
      test_1847.assert(t_1857, fn_1858);
      const t_1859 = s2_1856.indexOf("30") >= 0;
      function fn_1860() {
        return "q2 should have 30: " + s2_1856;
      }
      test_1847.assert(t_1859, fn_1860);
      const t_1861 = s1_1855.indexOf("30") >= 0;
      function fn_1862() {
        return "q1 should NOT have 30: " + s1_1855;
      }
      test_1847.assert(! t_1861, fn_1862);
      return;
    } finally {
      test_1847.softFailToHard();
    }
});
it("DeleteQuery immutability", function () {
    const test_1863 = new Test_842();
    try {
      let t_1864;
      let t_1865;
      const t_1866 = deleteFrom(sid_1338("users"));
      const accumulator_1867 = new SqlBuilder();
      accumulator_1867.appendSafe("active = ");
      accumulator_1867.appendBoolean(false);
      const base_1868 = t_1866.where(accumulator_1867.accumulated);
      const accumulator_1869 = new SqlBuilder();
      accumulator_1869.appendSafe("age < ");
      accumulator_1869.appendInt32(18);
      const q1_1870 = base_1868.where(accumulator_1869.accumulated);
      const accumulator_1871 = new SqlBuilder();
      accumulator_1871.appendSafe("age > ");
      accumulator_1871.appendInt32(65);
      const q2_1872 = base_1868.where(accumulator_1871.accumulated);
      try {
        t_1864 = q1_1870.toSql();
      } catch {
        t_1864 = panic_839();
      }
      const s1_1873 = t_1864.toString();
      try {
        t_1865 = q2_1872.toSql();
      } catch {
        t_1865 = panic_839();
      }
      const s2_1874 = t_1865.toString();
      const t_1875 = s1_1873.indexOf("age < 18") >= 0;
      function fn_1876() {
        return "q1: " + s1_1873;
      }
      test_1863.assert(t_1875, fn_1876);
      const t_1877 = s2_1874.indexOf("age > 65") >= 0;
      function fn_1878() {
        return "q2: " + s2_1874;
      }
      test_1863.assert(t_1877, fn_1878);
      const t_1879 = s1_1873.indexOf("age > 65") >= 0;
      function fn_1880() {
        return "q1 should not have q2 condition: " + s1_1873;
      }
      test_1863.assert(! t_1879, fn_1880);
      return;
    } finally {
      test_1863.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_1881 = new Test_842();
    try {
      let id_1882;
      try {
        id_1882 = safeIdentifier("user_name");
      } catch {
        id_1882 = panic_839();
      }
      function fn_1883() {
        return "value should round-trip";
      }
      test_1881.assert(id_1882.sqlValue === "user_name", fn_1883);
      return;
    } finally {
      test_1881.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_1884 = new Test_842();
    try {
      let didBubble_1885;
      try {
        safeIdentifier("");
        didBubble_1885 = false;
      } catch {
        didBubble_1885 = true;
      }
      function fn_1886() {
        return "empty string should bubble";
      }
      test_1884.assert(didBubble_1885, fn_1886);
      return;
    } finally {
      test_1884.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_1887 = new Test_842();
    try {
      let didBubble_1888;
      try {
        safeIdentifier("1col");
        didBubble_1888 = false;
      } catch {
        didBubble_1888 = true;
      }
      function fn_1889() {
        return "leading digit should bubble";
      }
      test_1887.assert(didBubble_1888, fn_1889);
      return;
    } finally {
      test_1887.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_1890 = new Test_842();
    try {
      const cases_1891 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      const this_1892 = cases_1891;
      const n_1893 = this_1892.length;
      let i_1894 = 0;
      while (i_1894 < n_1893) {
        const el_1895 = listedGet_99(this_1892, i_1894);
        i_1894 = i_1894 + 1 | 0;
        const c_1896 = el_1895;
        let didBubble_1897;
        try {
          safeIdentifier(c_1896);
          didBubble_1897 = false;
        } catch {
          didBubble_1897 = true;
        }
        function fn_1898() {
          return "should reject: " + c_1896;
        }
        test_1890.assert(didBubble_1897, fn_1898);
      }
      return;
    } finally {
      test_1890.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_1899 = new Test_842();
    try {
      let t_1900;
      let t_1901;
      let t_1902;
      try {
        t_1900 = safeIdentifier("users");
      } catch {
        t_1900 = panic_839();
      }
      try {
        t_1901 = safeIdentifier("name");
      } catch {
        t_1901 = panic_839();
      }
      try {
        t_1902 = safeIdentifier("age");
      } catch {
        t_1902 = panic_839();
      }
      const td_1903 = new TableDef(t_1900, Object.freeze([new FieldDef(t_1901, new StringField(), false, null, false), new FieldDef(t_1902, new IntField(), false, null, false)]), null);
      let f_1904;
      try {
        f_1904 = td_1903.field("age");
      } catch {
        f_1904 = panic_839();
      }
      function fn_1905() {
        return "should find age field";
      }
      test_1899.assert(f_1904.name.sqlValue === "age", fn_1905);
      return;
    } finally {
      test_1899.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_1906 = new Test_842();
    try {
      let t_1907;
      let t_1908;
      try {
        t_1907 = safeIdentifier("users");
      } catch {
        t_1907 = panic_839();
      }
      try {
        t_1908 = safeIdentifier("name");
      } catch {
        t_1908 = panic_839();
      }
      const td_1909 = new TableDef(t_1907, Object.freeze([new FieldDef(t_1908, new StringField(), false, null, false)]), null);
      let didBubble_1910;
      try {
        td_1909.field("nonexistent");
        didBubble_1910 = false;
      } catch {
        didBubble_1910 = true;
      }
      function fn_1911() {
        return "unknown field should bubble";
      }
      test_1906.assert(didBubble_1910, fn_1911);
      return;
    } finally {
      test_1906.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_1912 = new Test_842();
    try {
      let t_1913;
      let t_1914;
      try {
        t_1913 = safeIdentifier("email");
      } catch {
        t_1913 = panic_839();
      }
      const required_1915 = new FieldDef(t_1913, new StringField(), false, null, false);
      try {
        t_1914 = safeIdentifier("bio");
      } catch {
        t_1914 = panic_839();
      }
      const optional_1916 = new FieldDef(t_1914, new StringField(), true, null, false);
      function fn_1917() {
        return "required field should not be nullable";
      }
      test_1912.assert(! required_1915.nullable, fn_1917);
      function fn_1918() {
        return "optional field should be nullable";
      }
      test_1912.assert(optional_1916.nullable, fn_1918);
      return;
    } finally {
      test_1912.softFailToHard();
    }
});
it("pkName defaults to id when primaryKey is null", function () {
    const test_1919 = new Test_842();
    try {
      let t_1920;
      let t_1921;
      try {
        t_1920 = safeIdentifier("users");
      } catch {
        t_1920 = panic_839();
      }
      try {
        t_1921 = safeIdentifier("name");
      } catch {
        t_1921 = panic_839();
      }
      const td_1922 = new TableDef(t_1920, Object.freeze([new FieldDef(t_1921, new StringField(), false, null, false)]), null);
      function fn_1923() {
        return "default pk should be id";
      }
      test_1919.assert(td_1922.pkName() === "id", fn_1923);
      return;
    } finally {
      test_1919.softFailToHard();
    }
});
it("pkName returns custom primary key", function () {
    const test_1924 = new Test_842();
    try {
      let t_1925;
      let t_1926;
      let t_1927;
      try {
        t_1925 = safeIdentifier("users");
      } catch {
        t_1925 = panic_839();
      }
      try {
        t_1926 = safeIdentifier("user_id");
      } catch {
        t_1926 = panic_839();
      }
      const t_1928 = Object.freeze([new FieldDef(t_1926, new IntField(), false, null, false)]);
      try {
        t_1927 = safeIdentifier("user_id");
      } catch {
        t_1927 = panic_839();
      }
      const td_1929 = new TableDef(t_1925, t_1928, t_1927);
      function fn_1930() {
        return "custom pk should be user_id";
      }
      test_1924.assert(td_1929.pkName() === "user_id", fn_1930);
      return;
    } finally {
      test_1924.softFailToHard();
    }
});
it("timestamps returns two DateField defs", function () {
    const test_1931 = new Test_842();
    try {
      let ts_1932;
      try {
        ts_1932 = timestamps();
      } catch {
        ts_1932 = panic_839();
      }
      function fn_1933() {
        return "should return 2 fields";
      }
      test_1931.assert(ts_1932.length === 2, fn_1933);
      function fn_1934() {
        return "first should be inserted_at";
      }
      test_1931.assert(listedGet_99(ts_1932, 0).name.sqlValue === "inserted_at", fn_1934);
      function fn_1935() {
        return "second should be updated_at";
      }
      test_1931.assert(listedGet_99(ts_1932, 1).name.sqlValue === "updated_at", fn_1935);
      function fn_1936() {
        return "inserted_at should be nullable";
      }
      test_1931.assert(listedGet_99(ts_1932, 0).nullable, fn_1936);
      function fn_1937() {
        return "updated_at should be nullable";
      }
      test_1931.assert(listedGet_99(ts_1932, 1).nullable, fn_1937);
      function fn_1938() {
        return "inserted_at should have default";
      }
      test_1931.assert(!(listedGet_99(ts_1932, 0).defaultValue == null), fn_1938);
      function fn_1939() {
        return "updated_at should have default";
      }
      test_1931.assert(!(listedGet_99(ts_1932, 1).defaultValue == null), fn_1939);
      return;
    } finally {
      test_1931.softFailToHard();
    }
});
it("FieldDef defaultValue field", function () {
    const test_1940 = new Test_842();
    try {
      let t_1941;
      let t_1942;
      try {
        t_1941 = safeIdentifier("status");
      } catch {
        t_1941 = panic_839();
      }
      const withDefault_1943 = new FieldDef(t_1941, new StringField(), false, new SqlDefault(), false);
      try {
        t_1942 = safeIdentifier("name");
      } catch {
        t_1942 = panic_839();
      }
      const withoutDefault_1944 = new FieldDef(t_1942, new StringField(), false, null, false);
      function fn_1945() {
        return "should have default";
      }
      test_1940.assert(!(withDefault_1943.defaultValue == null), fn_1945);
      function fn_1946() {
        return "should not have default";
      }
      test_1940.assert(withoutDefault_1944.defaultValue == null, fn_1946);
      return;
    } finally {
      test_1940.softFailToHard();
    }
});
it("FieldDef virtual flag", function () {
    const test_1947 = new Test_842();
    try {
      let t_1948;
      let t_1949;
      try {
        t_1948 = safeIdentifier("name");
      } catch {
        t_1948 = panic_839();
      }
      const normal_1950 = new FieldDef(t_1948, new StringField(), false, null, false);
      try {
        t_1949 = safeIdentifier("full_name");
      } catch {
        t_1949 = panic_839();
      }
      const virt_1951 = new FieldDef(t_1949, new StringField(), true, null, true);
      function fn_1952() {
        return "normal field should not be virtual";
      }
      test_1947.assert(! normal_1950.virtual, fn_1952);
      function fn_1953() {
        return "virtual field should be virtual";
      }
      test_1947.assert(virt_1951.virtual, fn_1953);
      return;
    } finally {
      test_1947.softFailToHard();
    }
});
it("safeIdentifier accepts single character names", function () {
    const test_1954 = new Test_842();
    try {
      let a_1955;
      try {
        a_1955 = safeIdentifier("a");
      } catch {
        a_1955 = panic_839();
      }
      function fn_1956() {
        return "single letter should work";
      }
      test_1954.assert(a_1955.sqlValue === "a", fn_1956);
      let u_1957;
      try {
        u_1957 = safeIdentifier("_");
      } catch {
        u_1957 = panic_839();
      }
      function fn_1958() {
        return "single underscore should work";
      }
      test_1954.assert(u_1957.sqlValue === "_", fn_1958);
      return;
    } finally {
      test_1954.softFailToHard();
    }
});
it("safeIdentifier accepts all-underscore names", function () {
    const test_1959 = new Test_842();
    try {
      let id_1960;
      try {
        id_1960 = safeIdentifier("___");
      } catch {
        id_1960 = panic_839();
      }
      function fn_1961() {
        return "all underscores should work";
      }
      test_1959.assert(id_1960.sqlValue === "___", fn_1961);
      return;
    } finally {
      test_1959.softFailToHard();
    }
});
it("TableDef with empty field list", function () {
    const test_1962 = new Test_842();
    try {
      let t_1963;
      try {
        t_1963 = safeIdentifier("empty");
      } catch {
        t_1963 = panic_839();
      }
      const tbl_1964 = new TableDef(t_1963, Object.freeze([]), null);
      let didBubble_1965;
      try {
        tbl_1964.field("anything");
        didBubble_1965 = false;
      } catch {
        didBubble_1965 = true;
      }
      function fn_1966() {
        return "field lookup on empty table should bubble";
      }
      test_1962.assert(didBubble_1965, fn_1966);
      return;
    } finally {
      test_1962.softFailToHard();
    }
});
it("string escaping", function () {
    const test_1967 = new Test_842();
    try {
      function build_1968(name_1969) {
        const accumulator_1970 = new SqlBuilder();
        accumulator_1970.appendSafe("select * from hi where name = ");
        accumulator_1970.appendString(name_1969);
        return accumulator_1970.accumulated.toString();
      }
      function buildWrong_1971(name_1972) {
        return "select * from hi where name = '" + name_1972 + "'";
      }
      function fn_1973() {
        return "expected build(\"world\") == (select * from hi where name = 'world') not (select * from hi where name = 'world')";
      }
      test_1967.assert(true, fn_1973);
      const bobbyTables_1974 = "Robert'); drop table hi;--";
      function fn_1975() {
        return "expected build(bobbyTables) == (select * from hi where name = 'Robert''); drop table hi;--') not (select * from hi where name = 'Robert''); drop table hi;--')";
      }
      test_1967.assert(true, fn_1975);
      function fn_1976() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_1967.assert(true, fn_1976);
      return;
    } finally {
      test_1967.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_1977 = new Test_842();
    try {
      const accumulator_1978 = new SqlBuilder();
      accumulator_1978.appendSafe("v = ");
      accumulator_1978.appendString("");
      const actual_1979 = accumulator_1978.accumulated.toString();
      function fn_1980() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_1979 + ")";
      }
      test_1977.assert(actual_1979 === "v = ''", fn_1980);
      const accumulator_1981 = new SqlBuilder();
      accumulator_1981.appendSafe("v = ");
      accumulator_1981.appendString("a''b");
      const actual_1982 = accumulator_1981.accumulated.toString();
      function fn_1983() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_1982 + ")";
      }
      test_1977.assert(actual_1982 === "v = 'a''''b'", fn_1983);
      const accumulator_1984 = new SqlBuilder();
      accumulator_1984.appendSafe("v = ");
      accumulator_1984.appendString("Hello 世界");
      const actual_1985 = accumulator_1984.accumulated.toString();
      function fn_1986() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_1985 + ")";
      }
      test_1977.assert(actual_1985 === "v = 'Hello 世界'", fn_1986);
      const accumulator_1987 = new SqlBuilder();
      accumulator_1987.appendSafe("v = ");
      accumulator_1987.appendString("Line1\nLine2");
      const actual_1988 = accumulator_1987.accumulated.toString();
      function fn_1989() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_1988 + ")";
      }
      test_1977.assert(actual_1988 === "v = 'Line1\nLine2'", fn_1989);
      return;
    } finally {
      test_1977.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_1990 = new Test_842();
    try {
      const accumulator_1991 = new SqlBuilder();
      accumulator_1991.appendSafe("select ");
      accumulator_1991.appendInt32(42);
      accumulator_1991.appendSafe(", ");
      accumulator_1991.appendInt64(BigInt("43"));
      accumulator_1991.appendSafe(", ");
      accumulator_1991.appendFloat64(19.99);
      accumulator_1991.appendSafe(", ");
      accumulator_1991.appendBoolean(true);
      accumulator_1991.appendSafe(", ");
      accumulator_1991.appendBoolean(false);
      const actual_1992 = accumulator_1991.accumulated.toString();
      function fn_1993() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_1992 + ")";
      }
      test_1990.assert(actual_1992 === "select 42, 43, 19.99, TRUE, FALSE", fn_1993);
      let date_1994;
      try {
        date_1994 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
      } catch {
        date_1994 = panic_839();
      }
      const accumulator_1995 = new SqlBuilder();
      accumulator_1995.appendSafe("insert into t values (");
      accumulator_1995.appendDate(date_1994);
      accumulator_1995.appendSafe(")");
      const actual_1996 = accumulator_1995.accumulated.toString();
      function fn_1997() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_1996 + ")";
      }
      test_1990.assert(actual_1996 === "insert into t values ('2024-12-25')", fn_1997);
      return;
    } finally {
      test_1990.softFailToHard();
    }
});
it("lists", function () {
    const test_1998 = new Test_842();
    try {
      let t_1999;
      let t_2000;
      const accumulator_2001 = new SqlBuilder();
      accumulator_2001.appendSafe("v IN (");
      accumulator_2001.appendStringList(Object.freeze(["a", "b", "c'd"]));
      accumulator_2001.appendSafe(")");
      const actual_2002 = accumulator_2001.accumulated.toString();
      function fn_2003() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_2002 + ")";
      }
      test_1998.assert(actual_2002 === "v IN ('a', 'b', 'c''d')", fn_2003);
      const accumulator_2004 = new SqlBuilder();
      accumulator_2004.appendSafe("v IN (");
      accumulator_2004.appendInt32List(Object.freeze([1, 2, 3]));
      accumulator_2004.appendSafe(")");
      const actual_2005 = accumulator_2004.accumulated.toString();
      function fn_2006() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_2005 + ")";
      }
      test_1998.assert(actual_2005 === "v IN (1, 2, 3)", fn_2006);
      const accumulator_2007 = new SqlBuilder();
      accumulator_2007.appendSafe("v IN (");
      accumulator_2007.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      accumulator_2007.appendSafe(")");
      const actual_2008 = accumulator_2007.accumulated.toString();
      function fn_2009() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_2008 + ")";
      }
      test_1998.assert(actual_2008 === "v IN (1, 2)", fn_2009);
      const accumulator_2010 = new SqlBuilder();
      accumulator_2010.appendSafe("v IN (");
      accumulator_2010.appendFloat64List(Object.freeze([1.0, 2.0]));
      accumulator_2010.appendSafe(")");
      const actual_2011 = accumulator_2010.accumulated.toString();
      function fn_2012() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_2011 + ")";
      }
      test_1998.assert(actual_2011 === "v IN (1.0, 2.0)", fn_2012);
      const accumulator_2013 = new SqlBuilder();
      accumulator_2013.appendSafe("v IN (");
      accumulator_2013.appendBooleanList(Object.freeze([true, false]));
      accumulator_2013.appendSafe(")");
      const actual_2014 = accumulator_2013.accumulated.toString();
      function fn_2015() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_2014 + ")";
      }
      test_1998.assert(actual_2014 === "v IN (TRUE, FALSE)", fn_2015);
      try {
        t_1999 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
      } catch {
        t_1999 = panic_839();
      }
      try {
        t_2000 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
      } catch {
        t_2000 = panic_839();
      }
      const dates_2016 = Object.freeze([t_1999, t_2000]);
      const accumulator_2017 = new SqlBuilder();
      accumulator_2017.appendSafe("v IN (");
      accumulator_2017.appendDateList(dates_2016);
      accumulator_2017.appendSafe(")");
      const actual_2018 = accumulator_2017.accumulated.toString();
      function fn_2019() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_2018 + ")";
      }
      test_1998.assert(actual_2018 === "v IN ('2024-01-01', '2024-12-25')", fn_2019);
      return;
    } finally {
      test_1998.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_2020 = new Test_842();
    try {
      const nan_2021 = NaN;
      const accumulator_2022 = new SqlBuilder();
      accumulator_2022.appendSafe("v = ");
      accumulator_2022.appendFloat64(NaN);
      const actual_2023 = accumulator_2022.accumulated.toString();
      function fn_2024() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_2023 + ")";
      }
      test_2020.assert(actual_2023 === "v = NULL", fn_2024);
      return;
    } finally {
      test_2020.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_2025 = new Test_842();
    try {
      const inf_2026 = Infinity;
      const accumulator_2027 = new SqlBuilder();
      accumulator_2027.appendSafe("v = ");
      accumulator_2027.appendFloat64(Infinity);
      const actual_2028 = accumulator_2027.accumulated.toString();
      function fn_2029() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_2028 + ")";
      }
      test_2025.assert(actual_2028 === "v = NULL", fn_2029);
      return;
    } finally {
      test_2025.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_2030 = new Test_842();
    try {
      const ninf_2031 = -Infinity;
      const accumulator_2032 = new SqlBuilder();
      accumulator_2032.appendSafe("v = ");
      accumulator_2032.appendFloat64(-Infinity);
      const actual_2033 = accumulator_2032.accumulated.toString();
      function fn_2034() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_2033 + ")";
      }
      test_2030.assert(actual_2033 === "v = NULL", fn_2034);
      return;
    } finally {
      test_2030.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_2035 = new Test_842();
    try {
      const accumulator_2036 = new SqlBuilder();
      accumulator_2036.appendSafe("v = ");
      accumulator_2036.appendFloat64(3.14);
      const actual_2037 = accumulator_2036.accumulated.toString();
      function fn_2038() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_2037 + ")";
      }
      test_2035.assert(actual_2037 === "v = 3.14", fn_2038);
      const accumulator_2039 = new SqlBuilder();
      accumulator_2039.appendSafe("v = ");
      accumulator_2039.appendFloat64(0.0);
      const actual_2040 = accumulator_2039.accumulated.toString();
      function fn_2041() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_2040 + ")";
      }
      test_2035.assert(actual_2040 === "v = 0.0", fn_2041);
      const accumulator_2042 = new SqlBuilder();
      accumulator_2042.appendSafe("v = ");
      accumulator_2042.appendFloat64(-42.5);
      const actual_2043 = accumulator_2042.accumulated.toString();
      function fn_2044() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_2043 + ")";
      }
      test_2035.assert(actual_2043 === "v = -42.5", fn_2044);
      return;
    } finally {
      test_2035.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_2045 = new Test_842();
    try {
      let d_2046;
      try {
        d_2046 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
      } catch {
        d_2046 = panic_839();
      }
      const accumulator_2047 = new SqlBuilder();
      accumulator_2047.appendSafe("v = ");
      accumulator_2047.appendDate(d_2046);
      const actual_2048 = accumulator_2047.accumulated.toString();
      function fn_2049() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_2048 + ")";
      }
      test_2045.assert(actual_2048 === "v = '2024-06-15'", fn_2049);
      return;
    } finally {
      test_2045.softFailToHard();
    }
});
it("nesting", function () {
    const test_2050 = new Test_842();
    try {
      const name_2051 = "Someone";
      const accumulator_2052 = new SqlBuilder();
      accumulator_2052.appendSafe("where p.last_name = ");
      accumulator_2052.appendString("Someone");
      const condition_2053 = accumulator_2052.accumulated;
      const accumulator_2054 = new SqlBuilder();
      accumulator_2054.appendSafe("select p.id from person p ");
      accumulator_2054.appendFragment(condition_2053);
      const actual_2055 = accumulator_2054.accumulated.toString();
      function fn_2056() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2055 + ")";
      }
      test_2050.assert(actual_2055 === "select p.id from person p where p.last_name = 'Someone'", fn_2056);
      const accumulator_2057 = new SqlBuilder();
      accumulator_2057.appendSafe("select p.id from person p ");
      accumulator_2057.appendPart(condition_2053.toSource());
      const actual_2058 = accumulator_2057.accumulated.toString();
      function fn_2059() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2058 + ")";
      }
      test_2050.assert(actual_2058 === "select p.id from person p where p.last_name = 'Someone'", fn_2059);
      const parts_2060 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      const accumulator_2061 = new SqlBuilder();
      accumulator_2061.appendSafe("select ");
      accumulator_2061.appendPartList(parts_2060);
      const actual_2062 = accumulator_2061.accumulated.toString();
      function fn_2063() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_2062 + ")";
      }
      test_2050.assert(actual_2062 === "select 'a''b', 3", fn_2063);
      return;
    } finally {
      test_2050.softFailToHard();
    }
});
it("SqlInt32 negative and zero values", function () {
    const test_2064 = new Test_842();
    try {
      const accumulator_2065 = new SqlBuilder();
      accumulator_2065.appendSafe("v = ");
      accumulator_2065.appendInt32(-42);
      const t_2066 = accumulator_2065.accumulated;
      function fn_2067() {
        return "negative int";
      }
      test_2064.assert(t_2066.toString() === "v = -42", fn_2067);
      const accumulator_2068 = new SqlBuilder();
      accumulator_2068.appendSafe("v = ");
      accumulator_2068.appendInt32(0);
      const t_2069 = accumulator_2068.accumulated;
      function fn_2070() {
        return "zero int";
      }
      test_2064.assert(t_2069.toString() === "v = 0", fn_2070);
      return;
    } finally {
      test_2064.softFailToHard();
    }
});
it("SqlInt64 negative value", function () {
    const test_2071 = new Test_842();
    try {
      const accumulator_2072 = new SqlBuilder();
      accumulator_2072.appendSafe("v = ");
      accumulator_2072.appendInt64(BigInt("-99"));
      const t_2073 = accumulator_2072.accumulated;
      function fn_2074() {
        return "negative int64";
      }
      test_2071.assert(t_2073.toString() === "v = -99", fn_2074);
      return;
    } finally {
      test_2071.softFailToHard();
    }
});
it("single element list rendering", function () {
    const test_2075 = new Test_842();
    try {
      const accumulator_2076 = new SqlBuilder();
      accumulator_2076.appendSafe("v IN (");
      accumulator_2076.appendInt32List(Object.freeze([42]));
      accumulator_2076.appendSafe(")");
      const t_2077 = accumulator_2076.accumulated;
      function fn_2078() {
        return "single int";
      }
      test_2075.assert(t_2077.toString() === "v IN (42)", fn_2078);
      const accumulator_2079 = new SqlBuilder();
      accumulator_2079.appendSafe("v IN (");
      accumulator_2079.appendStringList(Object.freeze(["only"]));
      accumulator_2079.appendSafe(")");
      const t_2080 = accumulator_2079.accumulated;
      function fn_2081() {
        return "single string";
      }
      test_2075.assert(t_2080.toString() === "v IN ('only')", fn_2081);
      return;
    } finally {
      test_2075.softFailToHard();
    }
});
it("SqlDefault renders DEFAULT keyword", function () {
    const test_2082 = new Test_842();
    try {
      const b_2083 = new SqlBuilder();
      b_2083.appendSafe("v = ");
      b_2083.appendPart(new SqlDefault());
      function fn_2084() {
        return "default keyword";
      }
      test_2082.assert(b_2083.accumulated.toString() === "v = DEFAULT", fn_2084);
      return;
    } finally {
      test_2082.softFailToHard();
    }
});
it("SqlString with backslash", function () {
    const test_2085 = new Test_842();
    try {
      const accumulator_2086 = new SqlBuilder();
      accumulator_2086.appendSafe("v = ");
      accumulator_2086.appendString("a\\b");
      const t_2087 = accumulator_2086.accumulated;
      function fn_2088() {
        return "backslash passthrough";
      }
      test_2085.assert(t_2087.toString() === "v = 'a\\b'", fn_2088);
      return;
    } finally {
      test_2085.softFailToHard();
    }
});
it("toParameterized numbers the values and keeps them out of the text", function () {
    const test_2089 = new Test_842();
    try {
      const name_2090 = "O'Brien; drop table people";
      const accumulator_2091 = new SqlBuilder();
      accumulator_2091.appendSafe("select * from people where name = ");
      accumulator_2091.appendString("O'Brien; drop table people");
      accumulator_2091.appendSafe(" and age > ");
      accumulator_2091.appendInt32(30);
      accumulator_2091.appendSafe(" and height < ");
      accumulator_2091.appendFloat64(1.5);
      const p_2092 = accumulator_2091.accumulated.toParameterized();
      function fn_2093() {
        return p_2092.text;
      }
      test_2089.assert(p_2092.text === "select * from people where name = $1 and age > $2 and height < $3", fn_2093);
      function fn_2094() {
        return "three params";
      }
      test_2089.assert(p_2092.params.length === 3, fn_2094);
      function fn_2095() {
        return listedGet_99(p_2092.params, 0);
      }
      test_2089.assert(listedGet_99(p_2092.params, 0) === "O'Brien; drop table people", fn_2095);
      function fn_2096() {
        return listedGet_99(p_2092.params, 1);
      }
      test_2089.assert(listedGet_99(p_2092.params, 1) === "30", fn_2096);
      function fn_2097() {
        return listedGet_99(p_2092.params, 2);
      }
      test_2089.assert(listedGet_99(p_2092.params, 2) === "1.5", fn_2097);
      return;
    } finally {
      test_2089.softFailToHard();
    }
});
it("toParameterized leaves what is not data in the text", function () {
    const test_2098 = new Test_842();
    try {
      let t_2099;
      const b_2100 = new SqlBuilder();
      b_2100.appendSafe("insert into t (a, b, c, d) values (");
      b_2100.appendBoolean(true);
      b_2100.appendSafe(", ");
      b_2100.appendPart(new SqlDefault());
      b_2100.appendSafe(", ");
      b_2100.appendFloat64(NaN);
      b_2100.appendSafe(", ");
      b_2100.appendInt64(BigInt("-7"));
      b_2100.appendSafe(")");
      const p_2101 = b_2100.accumulated.toParameterized();
      function fn_2102() {
        return p_2101.text;
      }
      test_2098.assert(p_2101.text === "insert into t (a, b, c, d) values (TRUE, DEFAULT, NULL, $1)", fn_2102);
      if (p_2101.params.length === 1) {
        t_2099 = listedGet_99(p_2101.params, 0) === "-7";
      } else {
        t_2099 = false;
      }
      function fn_2103() {
        return "one param";
      }
      test_2098.assert(t_2099, fn_2103);
      return;
    } finally {
      test_2098.softFailToHard();
    }
});
it("toParameterized works on a whole query", function () {
    const test_2104 = new Test_842();
    try {
      let t_2105;
      let t_2106;
      try {
        t_2105 = safeIdentifier("users");
      } catch {
        t_2105 = panic_839();
      }
      const t_2107 = from(t_2105);
      const accumulator_2108 = new SqlBuilder();
      accumulator_2108.appendSafe("email = ");
      accumulator_2108.appendString("a@b.c");
      const t_2109 = t_2107.where(accumulator_2108.accumulated);
      const accumulator_2110 = new SqlBuilder();
      accumulator_2110.appendSafe("id = ");
      accumulator_2110.appendInt32(7);
      const p_2111 = t_2109.orWhere(accumulator_2110.accumulated).toSql().toParameterized();
      function fn_2112() {
        return p_2111.text;
      }
      test_2104.assert(p_2111.text === "SELECT * FROM users WHERE email = $1 OR id = $2", fn_2112);
      if (listedGet_99(p_2111.params, 0) === "a@b.c") {
        t_2106 = listedGet_99(p_2111.params, 1) === "7";
      } else {
        t_2106 = false;
      }
      function fn_2113() {
        return "params in order";
      }
      test_2104.assert(t_2106, fn_2113);
      return;
    } finally {
      test_2104.softFailToHard();
    }
});
it("toParameterized with no values is the same text as toString", function () {
    const test_2114 = new Test_842();
    try {
      const accumulator_2115 = new SqlBuilder();
      accumulator_2115.appendSafe("select 1");
      const f_2116 = accumulator_2115.accumulated;
      const actual_2117 = f_2116.toParameterized().text;
      const expected_2118 = f_2116.toString();
      function fn_2119() {
        return "expected f.toParameterized().text == (" + expected_2118 + ") not (" + actual_2117 + ")";
      }
      test_2114.assert(actual_2117 === expected_2118, fn_2119);
      const actual_2120 = f_2116.toParameterized().params.length;
      function fn_2121() {
        return "expected f.toParameterized().params.length == (" + 0 .toString() + ") not (" + actual_2120.toString() + ")";
      }
      test_2114.assert(actual_2120 === 0, fn_2121);
      return;
    } finally {
      test_2114.softFailToHard();
    }
});
