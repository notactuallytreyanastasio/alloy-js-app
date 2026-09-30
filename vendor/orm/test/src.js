import {
  Test as Test_799
} from "@temperlang/std/testing";
import {
  safeIdentifier, SafeIdentifier, TableDef, FieldDef, StringField, IntField, FloatField, BoolField, changeset, NumberValidationOpts, SqlDefault, timestamps, deleteSql, Int64Field, DateField, from, SqlBuilder, col, SqlInt32, SqlString, countAll, countCol, sumCol, avgCol, minCol, maxCol, unionSql, unionAllSql, intersectSql, exceptSql, subquery, existsSql, update, SqlBoolean, deleteFrom, NullsFirst, NullsLast, ForUpdate, ForShare
} from "../src.internal.js";
import {
  panic as panic_796, mapConstructor as mapConstructor_727, pairConstructor as pairConstructor_801, listedGet as listedGet_99, mappedGetOr as mappedGetOr_102, listBuilderAdd as listBuilderAdd_89, listBuilderToList as listBuilderToList_90
} from "@temperlang/core";
/**
 * @param {string} name_795
 * @returns {SafeIdentifier}
 */
function csid_794(name_795) {
  try {
    return safeIdentifier(name_795);
  } catch {
    return panic_796();
  }
}
/** @returns {TableDef} */
function userTable_797() {
  return new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("name"), new StringField(), false, null, false), new FieldDef(csid_794("email"), new StringField(), false, null, false), new FieldDef(csid_794("age"), new IntField(), true, null, false), new FieldDef(csid_794("score"), new FloatField(), true, null, false), new FieldDef(csid_794("active"), new BoolField(), true, null, false)]), null);
}
it("cast whitelists allowed fields", function () {
    const test_798 = new Test_799();
    try {
      const params_800 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("email", "alice@example.com"), pairConstructor_801("admin", "true")]));
      const cs_802 = changeset(userTable_797(), params_800).cast(Object.freeze([csid_794("name"), csid_794("email")]));
      function fn_803() {
        return "name should be in changes";
      }
      test_798.assert(cs_802.changes.has("name"), fn_803);
      function fn_804() {
        return "email should be in changes";
      }
      test_798.assert(cs_802.changes.has("email"), fn_804);
      function fn_805() {
        return "admin must be dropped (not in whitelist)";
      }
      test_798.assert(! cs_802.changes.has("admin"), fn_805);
      function fn_806() {
        return "should still be valid";
      }
      test_798.assert(cs_802.isValid, fn_806);
      return;
    } finally {
      test_798.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_807 = new Test_799();
    try {
      const params_808 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("email", "alice@example.com")]));
      const cs_809 = changeset(userTable_797(), params_808).cast(Object.freeze([csid_794("name")])).cast(Object.freeze([csid_794("email")]));
      function fn_810() {
        return "name must be excluded by second cast";
      }
      test_807.assert(! cs_809.changes.has("name"), fn_810);
      function fn_811() {
        return "email should be present";
      }
      test_807.assert(cs_809.changes.has("email"), fn_811);
      return;
    } finally {
      test_807.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_812 = new Test_799();
    try {
      const params_813 = mapConstructor_727(Object.freeze([pairConstructor_801("name", ""), pairConstructor_801("email", "bob@example.com")]));
      const cs_814 = changeset(userTable_797(), params_813).cast(Object.freeze([csid_794("name"), csid_794("email")]));
      function fn_815() {
        return "empty name should not be in changes";
      }
      test_812.assert(! cs_814.changes.has("name"), fn_815);
      function fn_816() {
        return "email should be in changes";
      }
      test_812.assert(cs_814.changes.has("email"), fn_816);
      return;
    } finally {
      test_812.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_817 = new Test_799();
    try {
      const params_818 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice")]));
      const cs_819 = changeset(userTable_797(), params_818).cast(Object.freeze([csid_794("name")])).validateRequired(Object.freeze([csid_794("name")]));
      function fn_820() {
        return "should be valid";
      }
      test_817.assert(cs_819.isValid, fn_820);
      function fn_821() {
        return "no errors expected";
      }
      test_817.assert(cs_819.errors.length === 0, fn_821);
      return;
    } finally {
      test_817.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_822 = new Test_799();
    try {
      const params_823 = mapConstructor_727(Object.freeze([]));
      const cs_824 = changeset(userTable_797(), params_823).cast(Object.freeze([csid_794("name")])).validateRequired(Object.freeze([csid_794("name")]));
      function fn_825() {
        return "should be invalid";
      }
      test_822.assert(! cs_824.isValid, fn_825);
      function fn_826() {
        return "should have one error";
      }
      test_822.assert(cs_824.errors.length === 1, fn_826);
      function fn_827() {
        return "error should name the field";
      }
      test_822.assert(listedGet_99(cs_824.errors, 0).field === "name", fn_827);
      return;
    } finally {
      test_822.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_828 = new Test_799();
    try {
      const params_829 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice")]));
      const cs_830 = changeset(userTable_797(), params_829).cast(Object.freeze([csid_794("name")])).validateLength(csid_794("name"), 2, 50);
      function fn_831() {
        return "should be valid";
      }
      test_828.assert(cs_830.isValid, fn_831);
      return;
    } finally {
      test_828.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_832 = new Test_799();
    try {
      const params_833 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "A")]));
      const cs_834 = changeset(userTable_797(), params_833).cast(Object.freeze([csid_794("name")])).validateLength(csid_794("name"), 2, 50);
      function fn_835() {
        return "should be invalid";
      }
      test_832.assert(! cs_834.isValid, fn_835);
      return;
    } finally {
      test_832.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_836 = new Test_799();
    try {
      const params_837 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      const cs_838 = changeset(userTable_797(), params_837).cast(Object.freeze([csid_794("name")])).validateLength(csid_794("name"), 2, 10);
      function fn_839() {
        return "should be invalid";
      }
      test_836.assert(! cs_838.isValid, fn_839);
      return;
    } finally {
      test_836.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_840 = new Test_799();
    try {
      const params_841 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "30")]));
      const cs_842 = changeset(userTable_797(), params_841).cast(Object.freeze([csid_794("age")])).validateInt(csid_794("age"));
      function fn_843() {
        return "should be valid";
      }
      test_840.assert(cs_842.isValid, fn_843);
      return;
    } finally {
      test_840.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_844 = new Test_799();
    try {
      const params_845 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "not-a-number")]));
      const cs_846 = changeset(userTable_797(), params_845).cast(Object.freeze([csid_794("age")])).validateInt(csid_794("age"));
      function fn_847() {
        return "should be invalid";
      }
      test_844.assert(! cs_846.isValid, fn_847);
      return;
    } finally {
      test_844.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_848 = new Test_799();
    try {
      const params_849 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "9.5")]));
      const cs_850 = changeset(userTable_797(), params_849).cast(Object.freeze([csid_794("score")])).validateFloat(csid_794("score"));
      function fn_851() {
        return "should be valid";
      }
      test_848.assert(cs_850.isValid, fn_851);
      return;
    } finally {
      test_848.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_852 = new Test_799();
    try {
      const params_853 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "9999999999")]));
      const cs_854 = changeset(userTable_797(), params_853).cast(Object.freeze([csid_794("age")])).validateInt64(csid_794("age"));
      function fn_855() {
        return "should be valid";
      }
      test_852.assert(cs_854.isValid, fn_855);
      return;
    } finally {
      test_852.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_856 = new Test_799();
    try {
      const params_857 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "not-a-number")]));
      const cs_858 = changeset(userTable_797(), params_857).cast(Object.freeze([csid_794("age")])).validateInt64(csid_794("age"));
      function fn_859() {
        return "should be invalid";
      }
      test_856.assert(! cs_858.isValid, fn_859);
      return;
    } finally {
      test_856.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_860 = new Test_799();
    try {
      const this_861 = Object.freeze(["true", "1", "yes", "on"]);
      const n_862 = this_861.length;
      let i_863 = 0;
      while (i_863 < n_862) {
        const el_864 = listedGet_99(this_861, i_863);
        i_863 = i_863 + 1 | 0;
        const v_865 = el_864;
        const params_866 = mapConstructor_727(Object.freeze([pairConstructor_801("active", v_865)]));
        const cs_867 = changeset(userTable_797(), params_866).cast(Object.freeze([csid_794("active")])).validateBool(csid_794("active"));
        function fn_868() {
          return "should accept: " + v_865;
        }
        test_860.assert(cs_867.isValid, fn_868);
      }
      return;
    } finally {
      test_860.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_869 = new Test_799();
    try {
      const this_870 = Object.freeze(["false", "0", "no", "off"]);
      const n_871 = this_870.length;
      let i_872 = 0;
      while (i_872 < n_871) {
        const el_873 = listedGet_99(this_870, i_872);
        i_872 = i_872 + 1 | 0;
        const v_874 = el_873;
        const params_875 = mapConstructor_727(Object.freeze([pairConstructor_801("active", v_874)]));
        const cs_876 = changeset(userTable_797(), params_875).cast(Object.freeze([csid_794("active")])).validateBool(csid_794("active"));
        function fn_877() {
          return "should accept: " + v_874;
        }
        test_869.assert(cs_876.isValid, fn_877);
      }
      return;
    } finally {
      test_869.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_878 = new Test_799();
    try {
      const this_879 = Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]);
      const n_880 = this_879.length;
      let i_881 = 0;
      while (i_881 < n_880) {
        const el_882 = listedGet_99(this_879, i_881);
        i_881 = i_881 + 1 | 0;
        const v_883 = el_882;
        const params_884 = mapConstructor_727(Object.freeze([pairConstructor_801("active", v_883)]));
        const cs_885 = changeset(userTable_797(), params_884).cast(Object.freeze([csid_794("active")])).validateBool(csid_794("active"));
        function fn_886() {
          return "should reject ambiguous: " + v_883;
        }
        test_878.assert(! cs_885.isValid, fn_886);
      }
      return;
    } finally {
      test_878.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_887 = new Test_799();
    try {
      const params_888 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Robert'); DROP TABLE users;--"), pairConstructor_801("email", "bobby@evil.com")]));
      const cs_889 = changeset(userTable_797(), params_888).cast(Object.freeze([csid_794("name"), csid_794("email")])).validateRequired(Object.freeze([csid_794("name"), csid_794("email")]));
      let sqlFrag_890;
      try {
        sqlFrag_890 = cs_889.toInsertSql();
      } catch {
        sqlFrag_890 = panic_796();
      }
      const s_891 = sqlFrag_890.toString();
      const t_892 = s_891.indexOf("''") >= 0;
      function fn_893() {
        return "single quote must be doubled: " + s_891;
      }
      test_887.assert(t_892, fn_893);
      return;
    } finally {
      test_887.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_894 = new Test_799();
    try {
      const params_895 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("email", "a@example.com")]));
      const cs_896 = changeset(userTable_797(), params_895).cast(Object.freeze([csid_794("name"), csid_794("email")])).validateRequired(Object.freeze([csid_794("name"), csid_794("email")]));
      let sqlFrag_897;
      try {
        sqlFrag_897 = cs_896.toInsertSql();
      } catch {
        sqlFrag_897 = panic_796();
      }
      const s_898 = sqlFrag_897.toString();
      const t_899 = s_898.indexOf("INSERT INTO users") >= 0;
      function fn_900() {
        return "has INSERT INTO: " + s_898;
      }
      test_894.assert(t_899, fn_900);
      const t_901 = s_898.indexOf("'Alice'") >= 0;
      function fn_902() {
        return "has quoted name: " + s_898;
      }
      test_894.assert(t_901, fn_902);
      return;
    } finally {
      test_894.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_903 = new Test_799();
    try {
      const params_904 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Bob"), pairConstructor_801("email", "b@example.com"), pairConstructor_801("age", "25")]));
      const cs_905 = changeset(userTable_797(), params_904).cast(Object.freeze([csid_794("name"), csid_794("email"), csid_794("age")])).validateRequired(Object.freeze([csid_794("name"), csid_794("email")]));
      let sqlFrag_906;
      try {
        sqlFrag_906 = cs_905.toInsertSql();
      } catch {
        sqlFrag_906 = panic_796();
      }
      const s_907 = sqlFrag_906.toString();
      const t_908 = s_907.indexOf("25") >= 0;
      function fn_909() {
        return "age rendered unquoted: " + s_907;
      }
      test_903.assert(t_908, fn_909);
      return;
    } finally {
      test_903.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_910 = new Test_799();
    try {
      const params_911 = mapConstructor_727(Object.freeze([]));
      const cs_912 = changeset(userTable_797(), params_911).cast(Object.freeze([csid_794("name")])).validateRequired(Object.freeze([csid_794("name")]));
      let didBubble_913;
      try {
        cs_912.toInsertSql();
        didBubble_913 = false;
      } catch {
        didBubble_913 = true;
      }
      function fn_914() {
        return "invalid changeset should bubble";
      }
      test_910.assert(didBubble_913, fn_914);
      return;
    } finally {
      test_910.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_915 = new Test_799();
    try {
      const strictTable_916 = new TableDef(csid_794("posts"), Object.freeze([new FieldDef(csid_794("title"), new StringField(), false, null, false), new FieldDef(csid_794("body"), new StringField(), true, null, false)]), null);
      const params_917 = mapConstructor_727(Object.freeze([pairConstructor_801("body", "hello")]));
      const cs_918 = changeset(strictTable_916, params_917).cast(Object.freeze([csid_794("body")]));
      function fn_919() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_915.assert(cs_918.isValid, fn_919);
      let didBubble_920;
      try {
        cs_918.toInsertSql();
        didBubble_920 = false;
      } catch {
        didBubble_920 = true;
      }
      function fn_921() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_915.assert(didBubble_920, fn_921);
      return;
    } finally {
      test_915.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_922 = new Test_799();
    try {
      const params_923 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Bob")]));
      const cs_924 = changeset(userTable_797(), params_923).cast(Object.freeze([csid_794("name")])).validateRequired(Object.freeze([csid_794("name")]));
      let sqlFrag_925;
      try {
        sqlFrag_925 = cs_924.toUpdateSql(42);
      } catch {
        sqlFrag_925 = panic_796();
      }
      const s_926 = sqlFrag_925.toString();
      function fn_927() {
        return "got: " + s_926;
      }
      test_922.assert(s_926 === "UPDATE users SET name = 'Bob' WHERE id = 42", fn_927);
      return;
    } finally {
      test_922.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_928 = new Test_799();
    try {
      const params_929 = mapConstructor_727(Object.freeze([]));
      const cs_930 = changeset(userTable_797(), params_929).cast(Object.freeze([csid_794("name")])).validateRequired(Object.freeze([csid_794("name")]));
      let didBubble_931;
      try {
        cs_930.toUpdateSql(1);
        didBubble_931 = false;
      } catch {
        didBubble_931 = true;
      }
      function fn_932() {
        return "invalid changeset should bubble";
      }
      test_928.assert(didBubble_931, fn_932);
      return;
    } finally {
      test_928.softFailToHard();
    }
});
it("putChange adds a new field", function () {
    const test_933 = new Test_799();
    try {
      const params_934 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice")]));
      const cs_935 = changeset(userTable_797(), params_934).cast(Object.freeze([csid_794("name")])).putChange(csid_794("email"), "alice@example.com");
      function fn_936() {
        return "email should be in changes";
      }
      test_933.assert(cs_935.changes.has("email"), fn_936);
      function fn_937() {
        return "email value";
      }
      test_933.assert(mappedGetOr_102(cs_935.changes, "email", "") === "alice@example.com", fn_937);
      return;
    } finally {
      test_933.softFailToHard();
    }
});
it("putChange overwrites existing field", function () {
    const test_938 = new Test_799();
    try {
      const params_939 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice")]));
      const cs_940 = changeset(userTable_797(), params_939).cast(Object.freeze([csid_794("name")])).putChange(csid_794("name"), "Bob");
      function fn_941() {
        return "name should be overwritten";
      }
      test_938.assert(mappedGetOr_102(cs_940.changes, "name", "") === "Bob", fn_941);
      return;
    } finally {
      test_938.softFailToHard();
    }
});
it("putChange value appears in toInsertSql", function () {
    const test_942 = new Test_799();
    try {
      let t_943;
      const params_944 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("email", "a@example.com")]));
      const cs_945 = changeset(userTable_797(), params_944).cast(Object.freeze([csid_794("name"), csid_794("email")])).putChange(csid_794("name"), "Bob");
      try {
        t_943 = cs_945.toInsertSql();
      } catch {
        t_943 = panic_796();
      }
      const s_946 = t_943.toString();
      const t_947 = s_946.indexOf("'Bob'") >= 0;
      function fn_948() {
        return "should use putChange value: " + s_946;
      }
      test_942.assert(t_947, fn_948);
      return;
    } finally {
      test_942.softFailToHard();
    }
});
it("getChange returns value for existing field", function () {
    const test_949 = new Test_799();
    try {
      const params_950 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice")]));
      const cs_951 = changeset(userTable_797(), params_950).cast(Object.freeze([csid_794("name")]));
      let val_952;
      try {
        val_952 = cs_951.getChange(csid_794("name"));
      } catch {
        val_952 = panic_796();
      }
      function fn_953() {
        return "should return Alice";
      }
      test_949.assert(val_952 === "Alice", fn_953);
      return;
    } finally {
      test_949.softFailToHard();
    }
});
it("getChange bubbles on missing field", function () {
    const test_954 = new Test_799();
    try {
      const params_955 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice")]));
      const cs_956 = changeset(userTable_797(), params_955).cast(Object.freeze([csid_794("name")]));
      let didBubble_957;
      try {
        cs_956.getChange(csid_794("email"));
        didBubble_957 = false;
      } catch {
        didBubble_957 = true;
      }
      function fn_958() {
        return "should bubble for missing field";
      }
      test_954.assert(didBubble_957, fn_958);
      return;
    } finally {
      test_954.softFailToHard();
    }
});
it("deleteChange removes field", function () {
    const test_959 = new Test_799();
    try {
      const params_960 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("email", "a@example.com")]));
      const cs_961 = changeset(userTable_797(), params_960).cast(Object.freeze([csid_794("name"), csid_794("email")])).deleteChange(csid_794("email"));
      function fn_962() {
        return "email should be removed";
      }
      test_959.assert(! cs_961.changes.has("email"), fn_962);
      function fn_963() {
        return "name should remain";
      }
      test_959.assert(cs_961.changes.has("name"), fn_963);
      return;
    } finally {
      test_959.softFailToHard();
    }
});
it("deleteChange on nonexistent field is no-op", function () {
    const test_964 = new Test_799();
    try {
      const params_965 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice")]));
      const cs_966 = changeset(userTable_797(), params_965).cast(Object.freeze([csid_794("name")])).deleteChange(csid_794("email"));
      function fn_967() {
        return "name should still be present";
      }
      test_964.assert(cs_966.changes.has("name"), fn_967);
      function fn_968() {
        return "should still be valid";
      }
      test_964.assert(cs_966.isValid, fn_968);
      return;
    } finally {
      test_964.softFailToHard();
    }
});
it("validateInclusion passes when value in list", function () {
    const test_969 = new Test_799();
    try {
      const params_970 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "admin")]));
      const cs_971 = changeset(userTable_797(), params_970).cast(Object.freeze([csid_794("name")])).validateInclusion(csid_794("name"), Object.freeze(["admin", "user", "guest"]));
      function fn_972() {
        return "should be valid";
      }
      test_969.assert(cs_971.isValid, fn_972);
      return;
    } finally {
      test_969.softFailToHard();
    }
});
it("validateInclusion fails when value not in list", function () {
    const test_973 = new Test_799();
    try {
      const params_974 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "hacker")]));
      const cs_975 = changeset(userTable_797(), params_974).cast(Object.freeze([csid_794("name")])).validateInclusion(csid_794("name"), Object.freeze(["admin", "user", "guest"]));
      function fn_976() {
        return "should be invalid";
      }
      test_973.assert(! cs_975.isValid, fn_976);
      function fn_977() {
        return "error on name";
      }
      test_973.assert(listedGet_99(cs_975.errors, 0).field === "name", fn_977);
      return;
    } finally {
      test_973.softFailToHard();
    }
});
it("validateInclusion skips when field not in changes", function () {
    const test_978 = new Test_799();
    try {
      const params_979 = mapConstructor_727(Object.freeze([]));
      const cs_980 = changeset(userTable_797(), params_979).cast(Object.freeze([csid_794("name")])).validateInclusion(csid_794("name"), Object.freeze(["admin", "user"]));
      function fn_981() {
        return "should be valid when field absent";
      }
      test_978.assert(cs_980.isValid, fn_981);
      return;
    } finally {
      test_978.softFailToHard();
    }
});
it("validateExclusion passes when value not in list", function () {
    const test_982 = new Test_799();
    try {
      const params_983 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice")]));
      const cs_984 = changeset(userTable_797(), params_983).cast(Object.freeze([csid_794("name")])).validateExclusion(csid_794("name"), Object.freeze(["root", "admin", "superuser"]));
      function fn_985() {
        return "should be valid";
      }
      test_982.assert(cs_984.isValid, fn_985);
      return;
    } finally {
      test_982.softFailToHard();
    }
});
it("validateExclusion fails when value in list", function () {
    const test_986 = new Test_799();
    try {
      const params_987 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "admin")]));
      const cs_988 = changeset(userTable_797(), params_987).cast(Object.freeze([csid_794("name")])).validateExclusion(csid_794("name"), Object.freeze(["root", "admin", "superuser"]));
      function fn_989() {
        return "should be invalid";
      }
      test_986.assert(! cs_988.isValid, fn_989);
      function fn_990() {
        return "error on name";
      }
      test_986.assert(listedGet_99(cs_988.errors, 0).field === "name", fn_990);
      return;
    } finally {
      test_986.softFailToHard();
    }
});
it("validateExclusion skips when field not in changes", function () {
    const test_991 = new Test_799();
    try {
      const params_992 = mapConstructor_727(Object.freeze([]));
      const cs_993 = changeset(userTable_797(), params_992).cast(Object.freeze([csid_794("name")])).validateExclusion(csid_794("name"), Object.freeze(["root", "admin"]));
      function fn_994() {
        return "should be valid when field absent";
      }
      test_991.assert(cs_993.isValid, fn_994);
      return;
    } finally {
      test_991.softFailToHard();
    }
});
it("validateNumber greaterThan passes", function () {
    const test_995 = new Test_799();
    try {
      const params_996 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "25")]));
      const cs_997 = changeset(userTable_797(), params_996).cast(Object.freeze([csid_794("age")])).validateNumber(csid_794("age"), new NumberValidationOpts(18.0, null, null, null, null));
      function fn_998() {
        return "25 > 18 should pass";
      }
      test_995.assert(cs_997.isValid, fn_998);
      return;
    } finally {
      test_995.softFailToHard();
    }
});
it("validateNumber greaterThan fails", function () {
    const test_999 = new Test_799();
    try {
      const params_1000 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "15")]));
      const cs_1001 = changeset(userTable_797(), params_1000).cast(Object.freeze([csid_794("age")])).validateNumber(csid_794("age"), new NumberValidationOpts(18.0, null, null, null, null));
      function fn_1002() {
        return "15 > 18 should fail";
      }
      test_999.assert(! cs_1001.isValid, fn_1002);
      return;
    } finally {
      test_999.softFailToHard();
    }
});
it("validateNumber lessThan passes", function () {
    const test_1003 = new Test_799();
    try {
      const params_1004 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "8.5")]));
      const cs_1005 = changeset(userTable_797(), params_1004).cast(Object.freeze([csid_794("score")])).validateNumber(csid_794("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      function fn_1006() {
        return "8.5 < 10 should pass";
      }
      test_1003.assert(cs_1005.isValid, fn_1006);
      return;
    } finally {
      test_1003.softFailToHard();
    }
});
it("validateNumber lessThan fails", function () {
    const test_1007 = new Test_799();
    try {
      const params_1008 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "12.0")]));
      const cs_1009 = changeset(userTable_797(), params_1008).cast(Object.freeze([csid_794("score")])).validateNumber(csid_794("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      function fn_1010() {
        return "12 < 10 should fail";
      }
      test_1007.assert(! cs_1009.isValid, fn_1010);
      return;
    } finally {
      test_1007.softFailToHard();
    }
});
it("validateNumber greaterThanOrEqual boundary", function () {
    const test_1011 = new Test_799();
    try {
      const params_1012 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "18")]));
      const cs_1013 = changeset(userTable_797(), params_1012).cast(Object.freeze([csid_794("age")])).validateNumber(csid_794("age"), new NumberValidationOpts(null, null, 18.0, null, null));
      function fn_1014() {
        return "18 >= 18 should pass";
      }
      test_1011.assert(cs_1013.isValid, fn_1014);
      return;
    } finally {
      test_1011.softFailToHard();
    }
});
it("validateNumber combined options", function () {
    const test_1015 = new Test_799();
    try {
      const params_1016 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "5.0")]));
      const cs_1017 = changeset(userTable_797(), params_1016).cast(Object.freeze([csid_794("score")])).validateNumber(csid_794("score"), new NumberValidationOpts(0.0, 10.0, null, null, null));
      function fn_1018() {
        return "5 > 0 and < 10 should pass";
      }
      test_1015.assert(cs_1017.isValid, fn_1018);
      return;
    } finally {
      test_1015.softFailToHard();
    }
});
it("validateNumber non-numeric value", function () {
    const test_1019 = new Test_799();
    try {
      const params_1020 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "abc")]));
      const cs_1021 = changeset(userTable_797(), params_1020).cast(Object.freeze([csid_794("age")])).validateNumber(csid_794("age"), new NumberValidationOpts(0.0, null, null, null, null));
      function fn_1022() {
        return "non-numeric should fail";
      }
      test_1019.assert(! cs_1021.isValid, fn_1022);
      function fn_1023() {
        return "correct error message";
      }
      test_1019.assert(listedGet_99(cs_1021.errors, 0).message === "must be a number", fn_1023);
      return;
    } finally {
      test_1019.softFailToHard();
    }
});
it("validateNumber skips when field not in changes", function () {
    const test_1024 = new Test_799();
    try {
      const params_1025 = mapConstructor_727(Object.freeze([]));
      const cs_1026 = changeset(userTable_797(), params_1025).cast(Object.freeze([csid_794("age")])).validateNumber(csid_794("age"), new NumberValidationOpts(0.0, null, null, null, null));
      function fn_1027() {
        return "should be valid when field absent";
      }
      test_1024.assert(cs_1026.isValid, fn_1027);
      return;
    } finally {
      test_1024.softFailToHard();
    }
});
it("validateAcceptance passes for true values", function () {
    const test_1028 = new Test_799();
    try {
      const this_1029 = Object.freeze(["true", "1", "yes", "on"]);
      const n_1030 = this_1029.length;
      let i_1031 = 0;
      while (i_1031 < n_1030) {
        const el_1032 = listedGet_99(this_1029, i_1031);
        i_1031 = i_1031 + 1 | 0;
        const v_1033 = el_1032;
        const params_1034 = mapConstructor_727(Object.freeze([pairConstructor_801("active", v_1033)]));
        const cs_1035 = changeset(userTable_797(), params_1034).cast(Object.freeze([csid_794("active")])).validateAcceptance(csid_794("active"));
        function fn_1036() {
          return "should accept: " + v_1033;
        }
        test_1028.assert(cs_1035.isValid, fn_1036);
      }
      return;
    } finally {
      test_1028.softFailToHard();
    }
});
it("validateAcceptance fails for non-true values", function () {
    const test_1037 = new Test_799();
    try {
      const params_1038 = mapConstructor_727(Object.freeze([pairConstructor_801("active", "false")]));
      const cs_1039 = changeset(userTable_797(), params_1038).cast(Object.freeze([csid_794("active")])).validateAcceptance(csid_794("active"));
      function fn_1040() {
        return "false should not be accepted";
      }
      test_1037.assert(! cs_1039.isValid, fn_1040);
      function fn_1041() {
        return "correct message";
      }
      test_1037.assert(listedGet_99(cs_1039.errors, 0).message === "must be accepted", fn_1041);
      return;
    } finally {
      test_1037.softFailToHard();
    }
});
it("validateConfirmation passes when fields match", function () {
    const test_1042 = new Test_799();
    try {
      const tbl_1043 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("password"), new StringField(), false, null, false), new FieldDef(csid_794("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1044 = mapConstructor_727(Object.freeze([pairConstructor_801("password", "secret123"), pairConstructor_801("password_confirmation", "secret123")]));
      const cs_1045 = changeset(tbl_1043, params_1044).cast(Object.freeze([csid_794("password"), csid_794("password_confirmation")])).validateConfirmation(csid_794("password"), csid_794("password_confirmation"));
      function fn_1046() {
        return "matching fields should pass";
      }
      test_1042.assert(cs_1045.isValid, fn_1046);
      return;
    } finally {
      test_1042.softFailToHard();
    }
});
it("validateConfirmation fails when fields differ", function () {
    const test_1047 = new Test_799();
    try {
      const tbl_1048 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("password"), new StringField(), false, null, false), new FieldDef(csid_794("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1049 = mapConstructor_727(Object.freeze([pairConstructor_801("password", "secret123"), pairConstructor_801("password_confirmation", "wrong456")]));
      const cs_1050 = changeset(tbl_1048, params_1049).cast(Object.freeze([csid_794("password"), csid_794("password_confirmation")])).validateConfirmation(csid_794("password"), csid_794("password_confirmation"));
      function fn_1051() {
        return "mismatched fields should fail";
      }
      test_1047.assert(! cs_1050.isValid, fn_1051);
      function fn_1052() {
        return "error on confirmation field";
      }
      test_1047.assert(listedGet_99(cs_1050.errors, 0).field === "password_confirmation", fn_1052);
      return;
    } finally {
      test_1047.softFailToHard();
    }
});
it("validateConfirmation fails when confirmation missing", function () {
    const test_1053 = new Test_799();
    try {
      const tbl_1054 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("password"), new StringField(), false, null, false), new FieldDef(csid_794("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1055 = mapConstructor_727(Object.freeze([pairConstructor_801("password", "secret123")]));
      const cs_1056 = changeset(tbl_1054, params_1055).cast(Object.freeze([csid_794("password")])).validateConfirmation(csid_794("password"), csid_794("password_confirmation"));
      function fn_1057() {
        return "missing confirmation should fail";
      }
      test_1053.assert(! cs_1056.isValid, fn_1057);
      return;
    } finally {
      test_1053.softFailToHard();
    }
});
it("validateContains passes when substring found", function () {
    const test_1058 = new Test_799();
    try {
      const params_1059 = mapConstructor_727(Object.freeze([pairConstructor_801("email", "alice@example.com")]));
      const cs_1060 = changeset(userTable_797(), params_1059).cast(Object.freeze([csid_794("email")])).validateContains(csid_794("email"), "@");
      function fn_1061() {
        return "should pass when @ present";
      }
      test_1058.assert(cs_1060.isValid, fn_1061);
      return;
    } finally {
      test_1058.softFailToHard();
    }
});
it("validateContains fails when substring not found", function () {
    const test_1062 = new Test_799();
    try {
      const params_1063 = mapConstructor_727(Object.freeze([pairConstructor_801("email", "alice-example.com")]));
      const cs_1064 = changeset(userTable_797(), params_1063).cast(Object.freeze([csid_794("email")])).validateContains(csid_794("email"), "@");
      function fn_1065() {
        return "should fail when @ absent";
      }
      test_1062.assert(! cs_1064.isValid, fn_1065);
      return;
    } finally {
      test_1062.softFailToHard();
    }
});
it("validateContains skips when field not in changes", function () {
    const test_1066 = new Test_799();
    try {
      const params_1067 = mapConstructor_727(Object.freeze([]));
      const cs_1068 = changeset(userTable_797(), params_1067).cast(Object.freeze([csid_794("email")])).validateContains(csid_794("email"), "@");
      function fn_1069() {
        return "should be valid when field absent";
      }
      test_1066.assert(cs_1068.isValid, fn_1069);
      return;
    } finally {
      test_1066.softFailToHard();
    }
});
it("validateStartsWith passes", function () {
    const test_1070 = new Test_799();
    try {
      const params_1071 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Dr. Smith")]));
      const cs_1072 = changeset(userTable_797(), params_1071).cast(Object.freeze([csid_794("name")])).validateStartsWith(csid_794("name"), "Dr.");
      function fn_1073() {
        return "should pass for Dr. prefix";
      }
      test_1070.assert(cs_1072.isValid, fn_1073);
      return;
    } finally {
      test_1070.softFailToHard();
    }
});
it("validateStartsWith fails", function () {
    const test_1074 = new Test_799();
    try {
      const params_1075 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Mr. Smith")]));
      const cs_1076 = changeset(userTable_797(), params_1075).cast(Object.freeze([csid_794("name")])).validateStartsWith(csid_794("name"), "Dr.");
      function fn_1077() {
        return "should fail for Mr. prefix";
      }
      test_1074.assert(! cs_1076.isValid, fn_1077);
      return;
    } finally {
      test_1074.softFailToHard();
    }
});
it("validateEndsWith passes", function () {
    const test_1078 = new Test_799();
    try {
      const params_1079 = mapConstructor_727(Object.freeze([pairConstructor_801("email", "alice@example.com")]));
      const cs_1080 = changeset(userTable_797(), params_1079).cast(Object.freeze([csid_794("email")])).validateEndsWith(csid_794("email"), ".com");
      function fn_1081() {
        return "should pass for .com suffix";
      }
      test_1078.assert(cs_1080.isValid, fn_1081);
      return;
    } finally {
      test_1078.softFailToHard();
    }
});
it("validateEndsWith fails", function () {
    const test_1082 = new Test_799();
    try {
      const params_1083 = mapConstructor_727(Object.freeze([pairConstructor_801("email", "alice@example.org")]));
      const cs_1084 = changeset(userTable_797(), params_1083).cast(Object.freeze([csid_794("email")])).validateEndsWith(csid_794("email"), ".com");
      function fn_1085() {
        return "should fail for .org when expecting .com";
      }
      test_1082.assert(! cs_1084.isValid, fn_1085);
      return;
    } finally {
      test_1082.softFailToHard();
    }
});
it("validateEndsWith handles repeated suffix correctly", function () {
    const test_1086 = new Test_799();
    try {
      const params_1087 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "abcabc")]));
      const cs_1088 = changeset(userTable_797(), params_1087).cast(Object.freeze([csid_794("name")])).validateEndsWith(csid_794("name"), "abc");
      function fn_1089() {
        return "abcabc should end with abc";
      }
      test_1086.assert(cs_1088.isValid, fn_1089);
      return;
    } finally {
      test_1086.softFailToHard();
    }
});
it("toInsertSql uses default value when field not in changes", function () {
    const test_1090 = new Test_799();
    try {
      let t_1091;
      const tbl_1092 = new TableDef(csid_794("posts"), Object.freeze([new FieldDef(csid_794("title"), new StringField(), false, null, false), new FieldDef(csid_794("status"), new StringField(), false, new SqlDefault(), false)]), null);
      const params_1093 = mapConstructor_727(Object.freeze([pairConstructor_801("title", "Hello")]));
      const cs_1094 = changeset(tbl_1092, params_1093).cast(Object.freeze([csid_794("title")]));
      try {
        t_1091 = cs_1094.toInsertSql();
      } catch {
        t_1091 = panic_796();
      }
      const s_1095 = t_1091.toString();
      const t_1096 = s_1095.indexOf("INSERT INTO posts") >= 0;
      function fn_1097() {
        return "has INSERT INTO: " + s_1095;
      }
      test_1090.assert(t_1096, fn_1097);
      const t_1098 = s_1095.indexOf("'Hello'") >= 0;
      function fn_1099() {
        return "has title value: " + s_1095;
      }
      test_1090.assert(t_1098, fn_1099);
      const t_1100 = s_1095.indexOf("DEFAULT") >= 0;
      function fn_1101() {
        return "status should use DEFAULT: " + s_1095;
      }
      test_1090.assert(t_1100, fn_1101);
      return;
    } finally {
      test_1090.softFailToHard();
    }
});
it("toInsertSql change overrides default value", function () {
    const test_1102 = new Test_799();
    try {
      let t_1103;
      const tbl_1104 = new TableDef(csid_794("posts"), Object.freeze([new FieldDef(csid_794("title"), new StringField(), false, null, false), new FieldDef(csid_794("status"), new StringField(), false, new SqlDefault(), false)]), null);
      const params_1105 = mapConstructor_727(Object.freeze([pairConstructor_801("title", "Hello"), pairConstructor_801("status", "published")]));
      const cs_1106 = changeset(tbl_1104, params_1105).cast(Object.freeze([csid_794("title"), csid_794("status")]));
      try {
        t_1103 = cs_1106.toInsertSql();
      } catch {
        t_1103 = panic_796();
      }
      const s_1107 = t_1103.toString();
      const t_1108 = s_1107.indexOf("'published'") >= 0;
      function fn_1109() {
        return "should use provided value: " + s_1107;
      }
      test_1102.assert(t_1108, fn_1109);
      return;
    } finally {
      test_1102.softFailToHard();
    }
});
it("toInsertSql with timestamps uses DEFAULT", function () {
    const test_1110 = new Test_799();
    try {
      let t_1111;
      let ts_1112;
      try {
        ts_1112 = timestamps();
      } catch {
        ts_1112 = panic_796();
      }
      const fields_1113 = [];
      listBuilderAdd_89(fields_1113, new FieldDef(csid_794("title"), new StringField(), false, null, false));
      const this_1114 = ts_1112;
      const n_1115 = this_1114.length;
      let i_1116 = 0;
      while (i_1116 < n_1115) {
        const el_1117 = listedGet_99(this_1114, i_1116);
        i_1116 = i_1116 + 1 | 0;
        const t_1118 = el_1117;
        listBuilderAdd_89(fields_1113, t_1118);
      }
      const tbl_1119 = new TableDef(csid_794("articles"), listBuilderToList_90(fields_1113), null);
      const params_1120 = mapConstructor_727(Object.freeze([pairConstructor_801("title", "News")]));
      const cs_1121 = changeset(tbl_1119, params_1120).cast(Object.freeze([csid_794("title")]));
      try {
        t_1111 = cs_1121.toInsertSql();
      } catch {
        t_1111 = panic_796();
      }
      const s_1122 = t_1111.toString();
      const t_1123 = s_1122.indexOf("inserted_at") >= 0;
      function fn_1124() {
        return "should include inserted_at: " + s_1122;
      }
      test_1110.assert(t_1123, fn_1124);
      const t_1125 = s_1122.indexOf("updated_at") >= 0;
      function fn_1126() {
        return "should include updated_at: " + s_1122;
      }
      test_1110.assert(t_1125, fn_1126);
      const t_1127 = s_1122.indexOf("DEFAULT") >= 0;
      function fn_1128() {
        return "timestamps should use DEFAULT: " + s_1122;
      }
      test_1110.assert(t_1127, fn_1128);
      return;
    } finally {
      test_1110.softFailToHard();
    }
});
it("toInsertSql skips virtual fields", function () {
    const test_1129 = new Test_799();
    try {
      let t_1130;
      const tbl_1131 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("name"), new StringField(), false, null, false), new FieldDef(csid_794("full_name"), new StringField(), true, null, true)]), null);
      const params_1132 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("full_name", "Alice Smith")]));
      const cs_1133 = changeset(tbl_1131, params_1132).cast(Object.freeze([csid_794("name"), csid_794("full_name")]));
      try {
        t_1130 = cs_1133.toInsertSql();
      } catch {
        t_1130 = panic_796();
      }
      const s_1134 = t_1130.toString();
      const t_1135 = s_1134.indexOf("'Alice'") >= 0;
      function fn_1136() {
        return "name should be included: " + s_1134;
      }
      test_1129.assert(t_1135, fn_1136);
      const t_1137 = s_1134.indexOf("full_name") >= 0;
      function fn_1138() {
        return "virtual field should be excluded: " + s_1134;
      }
      test_1129.assert(! t_1137, fn_1138);
      return;
    } finally {
      test_1129.softFailToHard();
    }
});
it("toInsertSql allows missing non-nullable virtual field", function () {
    const test_1139 = new Test_799();
    try {
      let t_1140;
      const tbl_1141 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("name"), new StringField(), false, null, false), new FieldDef(csid_794("computed"), new StringField(), false, null, true)]), null);
      const params_1142 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice")]));
      const cs_1143 = changeset(tbl_1141, params_1142).cast(Object.freeze([csid_794("name")]));
      try {
        t_1140 = cs_1143.toInsertSql();
      } catch {
        t_1140 = panic_796();
      }
      const s_1144 = t_1140.toString();
      const t_1145 = s_1144.indexOf("'Alice'") >= 0;
      function fn_1146() {
        return "should succeed: " + s_1144;
      }
      test_1139.assert(t_1145, fn_1146);
      return;
    } finally {
      test_1139.softFailToHard();
    }
});
it("toUpdateSql skips virtual fields", function () {
    const test_1147 = new Test_799();
    try {
      let t_1148;
      const tbl_1149 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("name"), new StringField(), false, null, false), new FieldDef(csid_794("display"), new StringField(), true, null, true)]), null);
      const params_1150 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Bob"), pairConstructor_801("display", "Bobby")]));
      const cs_1151 = changeset(tbl_1149, params_1150).cast(Object.freeze([csid_794("name"), csid_794("display")]));
      try {
        t_1148 = cs_1151.toUpdateSql(1);
      } catch {
        t_1148 = panic_796();
      }
      const s_1152 = t_1148.toString();
      const t_1153 = s_1152.indexOf("name = 'Bob'") >= 0;
      function fn_1154() {
        return "name should be in SET: " + s_1152;
      }
      test_1147.assert(t_1153, fn_1154);
      const t_1155 = s_1152.indexOf("display") >= 0;
      function fn_1156() {
        return "virtual field excluded from UPDATE: " + s_1152;
      }
      test_1147.assert(! t_1155, fn_1156);
      return;
    } finally {
      test_1147.softFailToHard();
    }
});
it("toUpdateSql uses custom primary key", function () {
    const test_1157 = new Test_799();
    try {
      let t_1158;
      const tbl_1159 = new TableDef(csid_794("posts"), Object.freeze([new FieldDef(csid_794("title"), new StringField(), false, null, false)]), csid_794("post_id"));
      const params_1160 = mapConstructor_727(Object.freeze([pairConstructor_801("title", "Updated")]));
      const cs_1161 = changeset(tbl_1159, params_1160).cast(Object.freeze([csid_794("title")]));
      try {
        t_1158 = cs_1161.toUpdateSql(99);
      } catch {
        t_1158 = panic_796();
      }
      const s_1162 = t_1158.toString();
      function fn_1163() {
        return "got: " + s_1162;
      }
      test_1157.assert(s_1162 === "UPDATE posts SET title = 'Updated' WHERE post_id = 99", fn_1163);
      return;
    } finally {
      test_1157.softFailToHard();
    }
});
it("deleteSql uses custom primary key", function () {
    const test_1164 = new Test_799();
    try {
      const tbl_1165 = new TableDef(csid_794("posts"), Object.freeze([new FieldDef(csid_794("title"), new StringField(), false, null, false)]), csid_794("post_id"));
      const s_1166 = deleteSql(tbl_1165, 42).toString();
      function fn_1167() {
        return "got: " + s_1166;
      }
      test_1164.assert(s_1166 === "DELETE FROM posts WHERE post_id = 42", fn_1167);
      return;
    } finally {
      test_1164.softFailToHard();
    }
});
it("deleteSql uses default id when primaryKey null", function () {
    const test_1168 = new Test_799();
    try {
      const tbl_1169 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("name"), new StringField(), false, null, false)]), null);
      const s_1170 = deleteSql(tbl_1169, 7).toString();
      function fn_1171() {
        return "got: " + s_1170;
      }
      test_1168.assert(s_1170 === "DELETE FROM users WHERE id = 7", fn_1171);
      return;
    } finally {
      test_1168.softFailToHard();
    }
});
it("already-invalid changeset skips subsequent validators", function () {
    const test_1172 = new Test_799();
    try {
      const params_1173 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "A"), pairConstructor_801("email", "alice@example.com")]));
      const cs_1174 = changeset(userTable_797(), params_1173).cast(Object.freeze([csid_794("name"), csid_794("email")])).validateLength(csid_794("name"), 3, 50).validateRequired(Object.freeze([csid_794("name"), csid_794("email")])).validateContains(csid_794("email"), "@");
      function fn_1175() {
        return "should be invalid from validateLength";
      }
      test_1172.assert(! cs_1174.isValid, fn_1175);
      function fn_1176() {
        return "should have exactly 1 error, not accumulate: " + cs_1174.errors.length.toString();
      }
      test_1172.assert(cs_1174.errors.length === 1, fn_1176);
      function fn_1177() {
        return "error should be on name";
      }
      test_1172.assert(listedGet_99(cs_1174.errors, 0).field === "name", fn_1177);
      return;
    } finally {
      test_1172.softFailToHard();
    }
});
it("validateNumber lessThanOrEqual passes at boundary", function () {
    const test_1178 = new Test_799();
    try {
      const params_1179 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "10.0")]));
      const cs_1180 = changeset(userTable_797(), params_1179).cast(Object.freeze([csid_794("score")])).validateNumber(csid_794("score"), new NumberValidationOpts(null, null, null, 10.0, null));
      function fn_1181() {
        return "10.0 <= 10.0 should pass";
      }
      test_1178.assert(cs_1180.isValid, fn_1181);
      return;
    } finally {
      test_1178.softFailToHard();
    }
});
it("validateNumber lessThanOrEqual fails above boundary", function () {
    const test_1182 = new Test_799();
    try {
      const params_1183 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "10.1")]));
      const cs_1184 = changeset(userTable_797(), params_1183).cast(Object.freeze([csid_794("score")])).validateNumber(csid_794("score"), new NumberValidationOpts(null, null, null, 10.0, null));
      function fn_1185() {
        return "10.1 <= 10.0 should fail";
      }
      test_1182.assert(! cs_1184.isValid, fn_1185);
      function fn_1186() {
        return "correct message";
      }
      test_1182.assert(listedGet_99(cs_1184.errors, 0).message === "must be less than or equal to 10.0", fn_1186);
      return;
    } finally {
      test_1182.softFailToHard();
    }
});
it("validateNumber equalTo passes when equal", function () {
    const test_1187 = new Test_799();
    try {
      const params_1188 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "42.0")]));
      const cs_1189 = changeset(userTable_797(), params_1188).cast(Object.freeze([csid_794("score")])).validateNumber(csid_794("score"), new NumberValidationOpts(null, null, null, null, 42.0));
      function fn_1190() {
        return "42.0 == 42.0 should pass";
      }
      test_1187.assert(cs_1189.isValid, fn_1190);
      return;
    } finally {
      test_1187.softFailToHard();
    }
});
it("validateNumber equalTo fails when not equal", function () {
    const test_1191 = new Test_799();
    try {
      const params_1192 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "41.9")]));
      const cs_1193 = changeset(userTable_797(), params_1192).cast(Object.freeze([csid_794("score")])).validateNumber(csid_794("score"), new NumberValidationOpts(null, null, null, null, 42.0));
      function fn_1194() {
        return "41.9 == 42.0 should fail";
      }
      test_1191.assert(! cs_1193.isValid, fn_1194);
      function fn_1195() {
        return "correct message";
      }
      test_1191.assert(listedGet_99(cs_1193.errors, 0).message === "must be equal to 42.0", fn_1195);
      return;
    } finally {
      test_1191.softFailToHard();
    }
});
it("validateNumber greaterThan fails at exact threshold", function () {
    const test_1196 = new Test_799();
    try {
      const params_1197 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "18")]));
      const cs_1198 = changeset(userTable_797(), params_1197).cast(Object.freeze([csid_794("age")])).validateNumber(csid_794("age"), new NumberValidationOpts(18.0, null, null, null, null));
      function fn_1199() {
        return "18 > 18 should fail (strict greater than)";
      }
      test_1196.assert(! cs_1198.isValid, fn_1199);
      return;
    } finally {
      test_1196.softFailToHard();
    }
});
it("validateNumber lessThan fails at exact threshold", function () {
    const test_1200 = new Test_799();
    try {
      const params_1201 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "10.0")]));
      const cs_1202 = changeset(userTable_797(), params_1201).cast(Object.freeze([csid_794("score")])).validateNumber(csid_794("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      function fn_1203() {
        return "10.0 < 10.0 should fail (strict less than)";
      }
      test_1200.assert(! cs_1202.isValid, fn_1203);
      return;
    } finally {
      test_1200.softFailToHard();
    }
});
it("validateFloat fails for non-float string", function () {
    const test_1204 = new Test_799();
    try {
      const params_1205 = mapConstructor_727(Object.freeze([pairConstructor_801("score", "abc")]));
      const cs_1206 = changeset(userTable_797(), params_1205).cast(Object.freeze([csid_794("score")])).validateFloat(csid_794("score"));
      function fn_1207() {
        return "abc should not parse as float";
      }
      test_1204.assert(! cs_1206.isValid, fn_1207);
      function fn_1208() {
        return "correct message";
      }
      test_1204.assert(listedGet_99(cs_1206.errors, 0).message === "must be a number", fn_1208);
      return;
    } finally {
      test_1204.softFailToHard();
    }
});
it("toInsertSql with all six field types", function () {
    const test_1209 = new Test_799();
    try {
      let t_1210;
      const tbl_1211 = new TableDef(csid_794("records"), Object.freeze([new FieldDef(csid_794("name"), new StringField(), false, null, false), new FieldDef(csid_794("count"), new IntField(), false, null, false), new FieldDef(csid_794("big_id"), new Int64Field(), false, null, false), new FieldDef(csid_794("rating"), new FloatField(), false, null, false), new FieldDef(csid_794("active"), new BoolField(), false, null, false), new FieldDef(csid_794("birthday"), new DateField(), false, null, false)]), null);
      const params_1212 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("count", "42"), pairConstructor_801("big_id", "9999999999"), pairConstructor_801("rating", "3.14"), pairConstructor_801("active", "true"), pairConstructor_801("birthday", "2000-01-15")]));
      const cs_1213 = changeset(tbl_1211, params_1212).cast(Object.freeze([csid_794("name"), csid_794("count"), csid_794("big_id"), csid_794("rating"), csid_794("active"), csid_794("birthday")]));
      try {
        t_1210 = cs_1213.toInsertSql();
      } catch {
        t_1210 = panic_796();
      }
      const s_1214 = t_1210.toString();
      const t_1215 = s_1214.indexOf("'Alice'") >= 0;
      function fn_1216() {
        return "string field: " + s_1214;
      }
      test_1209.assert(t_1215, fn_1216);
      const t_1217 = s_1214.indexOf("42") >= 0;
      function fn_1218() {
        return "int field: " + s_1214;
      }
      test_1209.assert(t_1217, fn_1218);
      const t_1219 = s_1214.indexOf("9999999999") >= 0;
      function fn_1220() {
        return "int64 field: " + s_1214;
      }
      test_1209.assert(t_1219, fn_1220);
      const t_1221 = s_1214.indexOf("3.14") >= 0;
      function fn_1222() {
        return "float field: " + s_1214;
      }
      test_1209.assert(t_1221, fn_1222);
      const t_1223 = s_1214.indexOf("TRUE") >= 0;
      function fn_1224() {
        return "bool field: " + s_1214;
      }
      test_1209.assert(t_1223, fn_1224);
      const t_1225 = s_1214.indexOf("'2000-01-15'") >= 0;
      function fn_1226() {
        return "date field: " + s_1214;
      }
      test_1209.assert(t_1225, fn_1226);
      return;
    } finally {
      test_1209.softFailToHard();
    }
});
it("deleteChange on non-nullable field causes toInsertSql to bubble", function () {
    const test_1227 = new Test_799();
    try {
      const tbl_1228 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("name"), new StringField(), false, null, false), new FieldDef(csid_794("email"), new StringField(), false, null, false)]), null);
      const params_1229 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("email", "a@b.com")]));
      const cs_1230 = changeset(tbl_1228, params_1229).cast(Object.freeze([csid_794("name"), csid_794("email")])).deleteChange(csid_794("email"));
      let didBubble_1231;
      try {
        cs_1230.toInsertSql();
        didBubble_1231 = false;
      } catch {
        didBubble_1231 = true;
      }
      function fn_1232() {
        return "removing non-nullable field should make toInsertSql bubble";
      }
      test_1227.assert(didBubble_1231, fn_1232);
      return;
    } finally {
      test_1227.softFailToHard();
    }
});
it("validateLength passes at exact min", function () {
    const test_1233 = new Test_799();
    try {
      const params_1234 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "abc")]));
      const cs_1235 = changeset(userTable_797(), params_1234).cast(Object.freeze([csid_794("name")])).validateLength(csid_794("name"), 3, 10);
      function fn_1236() {
        return "length 3 should pass for min 3";
      }
      test_1233.assert(cs_1235.isValid, fn_1236);
      return;
    } finally {
      test_1233.softFailToHard();
    }
});
it("validateLength passes at exact max", function () {
    const test_1237 = new Test_799();
    try {
      const params_1238 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "abcdefghij")]));
      const cs_1239 = changeset(userTable_797(), params_1238).cast(Object.freeze([csid_794("name")])).validateLength(csid_794("name"), 1, 10);
      function fn_1240() {
        return "length 10 should pass for max 10";
      }
      test_1237.assert(cs_1239.isValid, fn_1240);
      return;
    } finally {
      test_1237.softFailToHard();
    }
});
it("validateAcceptance skips when field not in changes", function () {
    const test_1241 = new Test_799();
    try {
      const params_1242 = mapConstructor_727(Object.freeze([]));
      const cs_1243 = changeset(userTable_797(), params_1242).cast(Object.freeze([csid_794("active")])).validateAcceptance(csid_794("active"));
      function fn_1244() {
        return "should be valid when field absent";
      }
      test_1241.assert(cs_1243.isValid, fn_1244);
      return;
    } finally {
      test_1241.softFailToHard();
    }
});
it("multiple validators chain correctly on valid changeset", function () {
    const test_1245 = new Test_799();
    try {
      const params_1246 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("email", "alice@example.com"), pairConstructor_801("age", "25")]));
      const cs_1247 = changeset(userTable_797(), params_1246).cast(Object.freeze([csid_794("name"), csid_794("email"), csid_794("age")])).validateRequired(Object.freeze([csid_794("name"), csid_794("email")])).validateLength(csid_794("name"), 2, 50).validateContains(csid_794("email"), "@").validateInt(csid_794("age")).validateNumber(csid_794("age"), new NumberValidationOpts(0.0, 150.0, null, null, null));
      function fn_1248() {
        return "all validators should pass";
      }
      test_1245.assert(cs_1247.isValid, fn_1248);
      function fn_1249() {
        return "no errors expected";
      }
      test_1245.assert(cs_1247.errors.length === 0, fn_1249);
      return;
    } finally {
      test_1245.softFailToHard();
    }
});
it("toUpdateSql with multiple non-virtual fields", function () {
    const test_1250 = new Test_799();
    try {
      let t_1251;
      const tbl_1252 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("name"), new StringField(), false, null, false), new FieldDef(csid_794("email"), new StringField(), false, null, false)]), null);
      const params_1253 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Bob"), pairConstructor_801("email", "bob@example.com")]));
      const cs_1254 = changeset(tbl_1252, params_1253).cast(Object.freeze([csid_794("name"), csid_794("email")]));
      try {
        t_1251 = cs_1254.toUpdateSql(5);
      } catch {
        t_1251 = panic_796();
      }
      const s_1255 = t_1251.toString();
      const t_1256 = s_1255.indexOf("name = 'Bob'") >= 0;
      function fn_1257() {
        return "name in SET: " + s_1255;
      }
      test_1250.assert(t_1256, fn_1257);
      const t_1258 = s_1255.indexOf("email = 'bob@example.com'") >= 0;
      function fn_1259() {
        return "email in SET: " + s_1255;
      }
      test_1250.assert(t_1258, fn_1259);
      const t_1260 = s_1255.indexOf("WHERE id = 5") >= 0;
      function fn_1261() {
        return "WHERE clause: " + s_1255;
      }
      test_1250.assert(t_1260, fn_1261);
      return;
    } finally {
      test_1250.softFailToHard();
    }
});
it("toUpdateSql bubbles when all changes are virtual fields", function () {
    const test_1262 = new Test_799();
    try {
      const tbl_1263 = new TableDef(csid_794("users"), Object.freeze([new FieldDef(csid_794("name"), new StringField(), false, null, false), new FieldDef(csid_794("computed"), new StringField(), true, null, true)]), null);
      const params_1264 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "Alice"), pairConstructor_801("computed", "derived")]));
      const cs_1265 = changeset(tbl_1263, params_1264).cast(Object.freeze([csid_794("computed")]));
      let didBubble_1266;
      try {
        cs_1265.toUpdateSql(1);
        didBubble_1266 = false;
      } catch {
        didBubble_1266 = true;
      }
      function fn_1267() {
        return "should bubble when all changes are virtual";
      }
      test_1262.assert(didBubble_1266, fn_1267);
      return;
    } finally {
      test_1262.softFailToHard();
    }
});
it("putChange satisfies subsequent validateRequired", function () {
    const test_1268 = new Test_799();
    try {
      const params_1269 = mapConstructor_727(Object.freeze([]));
      const cs_1270 = changeset(userTable_797(), params_1269).cast(Object.freeze([csid_794("name")])).putChange(csid_794("name"), "Injected").validateRequired(Object.freeze([csid_794("name")]));
      function fn_1271() {
        return "putChange should satisfy required";
      }
      test_1268.assert(cs_1270.isValid, fn_1271);
      return;
    } finally {
      test_1268.softFailToHard();
    }
});
it("validateStartsWith skips when field not in changes", function () {
    const test_1272 = new Test_799();
    try {
      const params_1273 = mapConstructor_727(Object.freeze([]));
      const cs_1274 = changeset(userTable_797(), params_1273).cast(Object.freeze([csid_794("name")])).validateStartsWith(csid_794("name"), "Dr.");
      function fn_1275() {
        return "should be valid when field absent";
      }
      test_1272.assert(cs_1274.isValid, fn_1275);
      return;
    } finally {
      test_1272.softFailToHard();
    }
});
it("validateEndsWith skips when field not in changes", function () {
    const test_1276 = new Test_799();
    try {
      const params_1277 = mapConstructor_727(Object.freeze([]));
      const cs_1278 = changeset(userTable_797(), params_1277).cast(Object.freeze([csid_794("name")])).validateEndsWith(csid_794("name"), ".com");
      function fn_1279() {
        return "should be valid when field absent";
      }
      test_1276.assert(cs_1278.isValid, fn_1279);
      return;
    } finally {
      test_1276.softFailToHard();
    }
});
it("validateInt accepts zero", function () {
    const test_1280 = new Test_799();
    try {
      const params_1281 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "0")]));
      const cs_1282 = changeset(userTable_797(), params_1281).cast(Object.freeze([csid_794("age")])).validateInt(csid_794("age"));
      function fn_1283() {
        return "0 should be a valid int";
      }
      test_1280.assert(cs_1282.isValid, fn_1283);
      return;
    } finally {
      test_1280.softFailToHard();
    }
});
it("validateInt accepts negative", function () {
    const test_1284 = new Test_799();
    try {
      const params_1285 = mapConstructor_727(Object.freeze([pairConstructor_801("age", "-5")]));
      const cs_1286 = changeset(userTable_797(), params_1285).cast(Object.freeze([csid_794("age")])).validateInt(csid_794("age"));
      function fn_1287() {
        return "-5 should be a valid int";
      }
      test_1284.assert(cs_1286.isValid, fn_1287);
      return;
    } finally {
      test_1284.softFailToHard();
    }
});
it("changeset immutability - validators do not mutate base", function () {
    const test_1288 = new Test_799();
    try {
      const params_1289 = mapConstructor_727(Object.freeze([pairConstructor_801("name", "A"), pairConstructor_801("email", "alice@example.com")]));
      const base_1290 = changeset(userTable_797(), params_1289).cast(Object.freeze([csid_794("name"), csid_794("email")]));
      const failed_1291 = base_1290.validateLength(csid_794("name"), 3, 50);
      const passed_1292 = base_1290.validateRequired(Object.freeze([csid_794("name"), csid_794("email")]));
      function fn_1293() {
        return "failed branch should be invalid";
      }
      test_1288.assert(! failed_1291.isValid, fn_1293);
      function fn_1294() {
        return "passed branch should still be valid";
      }
      test_1288.assert(passed_1292.isValid, fn_1294);
      return;
    } finally {
      test_1288.softFailToHard();
    }
});
/**
 * @param {string} name_1296
 * @returns {SafeIdentifier}
 */
function sid_1295(name_1296) {
  try {
    return safeIdentifier(name_1296);
  } catch {
    return panic_796();
  }
}
it("bare from produces SELECT *", function () {
    const test_1297 = new Test_799();
    try {
      const q_1298 = from(sid_1295("users"));
      function fn_1299() {
        return "bare query";
      }
      test_1297.assert(q_1298.toSql().toString() === "SELECT * FROM users", fn_1299);
      return;
    } finally {
      test_1297.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_1300 = new Test_799();
    try {
      const q_1301 = from(sid_1295("users")).select(Object.freeze([sid_1295("id"), sid_1295("name")]));
      function fn_1302() {
        return "select columns";
      }
      test_1300.assert(q_1301.toSql().toString() === "SELECT id, name FROM users", fn_1302);
      return;
    } finally {
      test_1300.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_1303 = new Test_799();
    try {
      const t_1304 = from(sid_1295("users"));
      const accumulator_1305 = new SqlBuilder();
      accumulator_1305.appendSafe("age > ");
      accumulator_1305.appendInt32(18);
      const q_1306 = t_1304.where(accumulator_1305.accumulated);
      function fn_1307() {
        return "where int";
      }
      test_1303.assert(q_1306.toSql().toString() === "SELECT * FROM users WHERE age > 18", fn_1307);
      return;
    } finally {
      test_1303.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_1308 = new Test_799();
    try {
      const t_1309 = from(sid_1295("users"));
      const accumulator_1310 = new SqlBuilder();
      accumulator_1310.appendSafe("active = ");
      accumulator_1310.appendBoolean(true);
      const q_1311 = t_1309.where(accumulator_1310.accumulated);
      function fn_1312() {
        return "where bool";
      }
      test_1308.assert(q_1311.toSql().toString() === "SELECT * FROM users WHERE active = TRUE", fn_1312);
      return;
    } finally {
      test_1308.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_1313 = new Test_799();
    try {
      const t_1314 = from(sid_1295("users"));
      const accumulator_1315 = new SqlBuilder();
      accumulator_1315.appendSafe("age > ");
      accumulator_1315.appendInt32(18);
      const t_1316 = t_1314.where(accumulator_1315.accumulated);
      const accumulator_1317 = new SqlBuilder();
      accumulator_1317.appendSafe("active = ");
      accumulator_1317.appendBoolean(true);
      const q_1318 = t_1316.where(accumulator_1317.accumulated);
      function fn_1319() {
        return "chained where";
      }
      test_1313.assert(q_1318.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE", fn_1319);
      return;
    } finally {
      test_1313.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_1320 = new Test_799();
    try {
      const q_1321 = from(sid_1295("users")).orderBy(sid_1295("name"), true);
      function fn_1322() {
        return "order asc";
      }
      test_1320.assert(q_1321.toSql().toString() === "SELECT * FROM users ORDER BY name ASC", fn_1322);
      return;
    } finally {
      test_1320.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_1323 = new Test_799();
    try {
      const q_1324 = from(sid_1295("users")).orderBy(sid_1295("created_at"), false);
      function fn_1325() {
        return "order desc";
      }
      test_1323.assert(q_1324.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC", fn_1325);
      return;
    } finally {
      test_1323.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_1326 = new Test_799();
    try {
      let q_1327;
      try {
        const t_1328 = from(sid_1295("users")).limit(10);
        q_1327 = t_1328.offset(20);
      } catch {
        q_1327 = panic_796();
      }
      function fn_1329() {
        return "limit/offset";
      }
      test_1326.assert(q_1327.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20", fn_1329);
      return;
    } finally {
      test_1326.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_1330 = new Test_799();
    try {
      let didBubble_1331;
      try {
        from(sid_1295("users")).limit(-1);
        didBubble_1331 = false;
      } catch {
        didBubble_1331 = true;
      }
      function fn_1332() {
        return "negative limit should bubble";
      }
      test_1330.assert(didBubble_1331, fn_1332);
      return;
    } finally {
      test_1330.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_1333 = new Test_799();
    try {
      let didBubble_1334;
      try {
        from(sid_1295("users")).offset(-1);
        didBubble_1334 = false;
      } catch {
        didBubble_1334 = true;
      }
      function fn_1335() {
        return "negative offset should bubble";
      }
      test_1333.assert(didBubble_1334, fn_1335);
      return;
    } finally {
      test_1333.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_1336 = new Test_799();
    try {
      const minAge_1337 = 21;
      let q_1338;
      try {
        const t_1339 = from(sid_1295("users")).select(Object.freeze([sid_1295("id"), sid_1295("name"), sid_1295("email")]));
        const accumulator_1340 = new SqlBuilder();
        accumulator_1340.appendSafe("age >= ");
        accumulator_1340.appendInt32(21);
        const t_1341 = t_1339.where(accumulator_1340.accumulated);
        const accumulator_1342 = new SqlBuilder();
        accumulator_1342.appendSafe("active = ");
        accumulator_1342.appendBoolean(true);
        const t_1343 = t_1341.where(accumulator_1342.accumulated).orderBy(sid_1295("name"), true).limit(25);
        q_1338 = t_1343.offset(0);
      } catch {
        q_1338 = panic_796();
      }
      function fn_1344() {
        return "complex query";
      }
      test_1336.assert(q_1338.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0", fn_1344);
      return;
    } finally {
      test_1336.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_1345 = new Test_799();
    try {
      let t_1346;
      const q_1347 = from(sid_1295("users"));
      try {
        t_1346 = q_1347.safeToSql(100);
      } catch {
        t_1346 = panic_796();
      }
      const s_1348 = t_1346.toString();
      function fn_1349() {
        return "should have limit: " + s_1348;
      }
      test_1345.assert(s_1348 === "SELECT * FROM users LIMIT 100", fn_1349);
      return;
    } finally {
      test_1345.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_1350 = new Test_799();
    try {
      let t_1351;
      let q_1352;
      try {
        q_1352 = from(sid_1295("users")).limit(5);
      } catch {
        q_1352 = panic_796();
      }
      try {
        t_1351 = q_1352.safeToSql(100);
      } catch {
        t_1351 = panic_796();
      }
      const s_1353 = t_1351.toString();
      function fn_1354() {
        return "explicit limit preserved: " + s_1353;
      }
      test_1350.assert(s_1353 === "SELECT * FROM users LIMIT 5", fn_1354);
      return;
    } finally {
      test_1350.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_1355 = new Test_799();
    try {
      let didBubble_1356;
      try {
        from(sid_1295("users")).safeToSql(-1);
        didBubble_1356 = false;
      } catch {
        didBubble_1356 = true;
      }
      function fn_1357() {
        return "negative defaultLimit should bubble";
      }
      test_1355.assert(didBubble_1356, fn_1357);
      return;
    } finally {
      test_1355.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_1358 = new Test_799();
    try {
      const evil_1359 = "'; DROP TABLE users; --";
      const t_1360 = from(sid_1295("users"));
      const accumulator_1361 = new SqlBuilder();
      accumulator_1361.appendSafe("name = ");
      accumulator_1361.appendString("'; DROP TABLE users; --");
      const q_1362 = t_1360.where(accumulator_1361.accumulated);
      const s_1363 = q_1362.toSql().toString();
      const t_1364 = s_1363.indexOf("''") >= 0;
      function fn_1365() {
        return "quotes must be doubled: " + s_1363;
      }
      test_1358.assert(t_1364, fn_1365);
      const t_1366 = s_1363.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_1367() {
        return "structure intact: " + s_1363;
      }
      test_1358.assert(t_1366, fn_1367);
      return;
    } finally {
      test_1358.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_1368 = new Test_799();
    try {
      const attack_1369 = "users; DROP TABLE users; --";
      let didBubble_1370;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_1370 = false;
      } catch {
        didBubble_1370 = true;
      }
      function fn_1371() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_1368.assert(didBubble_1370, fn_1371);
      return;
    } finally {
      test_1368.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_1372 = new Test_799();
    try {
      const t_1373 = from(sid_1295("users"));
      const t_1374 = sid_1295("orders");
      const accumulator_1375 = new SqlBuilder();
      accumulator_1375.appendSafe("users.id = orders.user_id");
      const q_1376 = t_1373.innerJoin(t_1374, accumulator_1375.accumulated);
      function fn_1377() {
        return "inner join";
      }
      test_1372.assert(q_1376.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id", fn_1377);
      return;
    } finally {
      test_1372.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_1378 = new Test_799();
    try {
      const t_1379 = from(sid_1295("users"));
      const t_1380 = sid_1295("profiles");
      const accumulator_1381 = new SqlBuilder();
      accumulator_1381.appendSafe("users.id = profiles.user_id");
      const q_1382 = t_1379.leftJoin(t_1380, accumulator_1381.accumulated);
      function fn_1383() {
        return "left join";
      }
      test_1378.assert(q_1382.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id", fn_1383);
      return;
    } finally {
      test_1378.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_1384 = new Test_799();
    try {
      const t_1385 = from(sid_1295("orders"));
      const t_1386 = sid_1295("users");
      const accumulator_1387 = new SqlBuilder();
      accumulator_1387.appendSafe("orders.user_id = users.id");
      const q_1388 = t_1385.rightJoin(t_1386, accumulator_1387.accumulated);
      function fn_1389() {
        return "right join";
      }
      test_1384.assert(q_1388.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id", fn_1389);
      return;
    } finally {
      test_1384.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_1390 = new Test_799();
    try {
      const t_1391 = from(sid_1295("users"));
      const t_1392 = sid_1295("orders");
      const accumulator_1393 = new SqlBuilder();
      accumulator_1393.appendSafe("users.id = orders.user_id");
      const q_1394 = t_1391.fullJoin(t_1392, accumulator_1393.accumulated);
      function fn_1395() {
        return "full join";
      }
      test_1390.assert(q_1394.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id", fn_1395);
      return;
    } finally {
      test_1390.softFailToHard();
    }
});
it("chained joins", function () {
    const test_1396 = new Test_799();
    try {
      const t_1397 = from(sid_1295("users"));
      const t_1398 = sid_1295("orders");
      const accumulator_1399 = new SqlBuilder();
      accumulator_1399.appendSafe("users.id = orders.user_id");
      const t_1400 = t_1397.innerJoin(t_1398, accumulator_1399.accumulated);
      const t_1401 = sid_1295("profiles");
      const accumulator_1402 = new SqlBuilder();
      accumulator_1402.appendSafe("users.id = profiles.user_id");
      const q_1403 = t_1400.leftJoin(t_1401, accumulator_1402.accumulated);
      function fn_1404() {
        return "chained joins";
      }
      test_1396.assert(q_1403.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id", fn_1404);
      return;
    } finally {
      test_1396.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_1405 = new Test_799();
    try {
      let q_1406;
      try {
        const t_1407 = from(sid_1295("users"));
        const t_1408 = sid_1295("orders");
        const accumulator_1409 = new SqlBuilder();
        accumulator_1409.appendSafe("users.id = orders.user_id");
        const t_1410 = t_1407.innerJoin(t_1408, accumulator_1409.accumulated);
        const accumulator_1411 = new SqlBuilder();
        accumulator_1411.appendSafe("orders.total > ");
        accumulator_1411.appendInt32(100);
        q_1406 = t_1410.where(accumulator_1411.accumulated).orderBy(sid_1295("name"), true).limit(10);
      } catch {
        q_1406 = panic_796();
      }
      function fn_1412() {
        return "join with where/order/limit";
      }
      test_1405.assert(q_1406.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10", fn_1412);
      return;
    } finally {
      test_1405.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_1413 = new Test_799();
    try {
      const c_1414 = col(sid_1295("users"), sid_1295("id"));
      function fn_1415() {
        return "col helper";
      }
      test_1413.assert(c_1414.toString() === "users.id", fn_1415);
      return;
    } finally {
      test_1413.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_1416 = new Test_799();
    try {
      const onCond_1417 = col(sid_1295("users"), sid_1295("id"));
      const b_1418 = new SqlBuilder();
      b_1418.appendFragment(onCond_1417);
      b_1418.appendSafe(" = ");
      b_1418.appendFragment(col(sid_1295("orders"), sid_1295("user_id")));
      const q_1419 = from(sid_1295("users")).innerJoin(sid_1295("orders"), b_1418.accumulated);
      function fn_1420() {
        return "join with col";
      }
      test_1416.assert(q_1419.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id", fn_1420);
      return;
    } finally {
      test_1416.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_1421 = new Test_799();
    try {
      const t_1422 = from(sid_1295("users"));
      const accumulator_1423 = new SqlBuilder();
      accumulator_1423.appendSafe("status = ");
      accumulator_1423.appendString("active");
      const q_1424 = t_1422.orWhere(accumulator_1423.accumulated);
      function fn_1425() {
        return "orWhere basic";
      }
      test_1421.assert(q_1424.toSql().toString() === "SELECT * FROM users WHERE status = 'active'", fn_1425);
      return;
    } finally {
      test_1421.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_1426 = new Test_799();
    try {
      const t_1427 = from(sid_1295("users"));
      const accumulator_1428 = new SqlBuilder();
      accumulator_1428.appendSafe("age > ");
      accumulator_1428.appendInt32(18);
      const t_1429 = t_1427.where(accumulator_1428.accumulated);
      const accumulator_1430 = new SqlBuilder();
      accumulator_1430.appendSafe("vip = ");
      accumulator_1430.appendBoolean(true);
      const q_1431 = t_1429.orWhere(accumulator_1430.accumulated);
      function fn_1432() {
        return "where then orWhere";
      }
      test_1426.assert(q_1431.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE", fn_1432);
      return;
    } finally {
      test_1426.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_1433 = new Test_799();
    try {
      const t_1434 = from(sid_1295("users"));
      const accumulator_1435 = new SqlBuilder();
      accumulator_1435.appendSafe("active = ");
      accumulator_1435.appendBoolean(true);
      const t_1436 = t_1434.where(accumulator_1435.accumulated);
      const accumulator_1437 = new SqlBuilder();
      accumulator_1437.appendSafe("role = ");
      accumulator_1437.appendString("admin");
      const t_1438 = t_1436.orWhere(accumulator_1437.accumulated);
      const accumulator_1439 = new SqlBuilder();
      accumulator_1439.appendSafe("role = ");
      accumulator_1439.appendString("moderator");
      const q_1440 = t_1438.orWhere(accumulator_1439.accumulated);
      function fn_1441() {
        return "multiple orWhere";
      }
      test_1433.assert(q_1440.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'", fn_1441);
      return;
    } finally {
      test_1433.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_1442 = new Test_799();
    try {
      const t_1443 = from(sid_1295("users"));
      const accumulator_1444 = new SqlBuilder();
      accumulator_1444.appendSafe("age > ");
      accumulator_1444.appendInt32(18);
      const t_1445 = t_1443.where(accumulator_1444.accumulated);
      const accumulator_1446 = new SqlBuilder();
      accumulator_1446.appendSafe("active = ");
      accumulator_1446.appendBoolean(true);
      const t_1447 = t_1445.where(accumulator_1446.accumulated);
      const accumulator_1448 = new SqlBuilder();
      accumulator_1448.appendSafe("vip = ");
      accumulator_1448.appendBoolean(true);
      const q_1449 = t_1447.orWhere(accumulator_1448.accumulated);
      function fn_1450() {
        return "mixed where and orWhere";
      }
      test_1442.assert(q_1449.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE", fn_1450);
      return;
    } finally {
      test_1442.softFailToHard();
    }
});
it("whereNull", function () {
    const test_1451 = new Test_799();
    try {
      const q_1452 = from(sid_1295("users")).whereNull(sid_1295("deleted_at"));
      function fn_1453() {
        return "whereNull";
      }
      test_1451.assert(q_1452.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL", fn_1453);
      return;
    } finally {
      test_1451.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_1454 = new Test_799();
    try {
      const q_1455 = from(sid_1295("users")).whereNotNull(sid_1295("email"));
      function fn_1456() {
        return "whereNotNull";
      }
      test_1454.assert(q_1455.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL", fn_1456);
      return;
    } finally {
      test_1454.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_1457 = new Test_799();
    try {
      const t_1458 = from(sid_1295("users"));
      const accumulator_1459 = new SqlBuilder();
      accumulator_1459.appendSafe("active = ");
      accumulator_1459.appendBoolean(true);
      const q_1460 = t_1458.where(accumulator_1459.accumulated).whereNull(sid_1295("deleted_at"));
      function fn_1461() {
        return "whereNull chained";
      }
      test_1457.assert(q_1460.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL", fn_1461);
      return;
    } finally {
      test_1457.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_1462 = new Test_799();
    try {
      const t_1463 = from(sid_1295("users")).whereNull(sid_1295("deleted_at"));
      const accumulator_1464 = new SqlBuilder();
      accumulator_1464.appendSafe("role = ");
      accumulator_1464.appendString("admin");
      const q_1465 = t_1463.orWhere(accumulator_1464.accumulated);
      function fn_1466() {
        return "whereNotNull with orWhere";
      }
      test_1462.assert(q_1465.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'", fn_1466);
      return;
    } finally {
      test_1462.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1467 = new Test_799();
    try {
      const q_1468 = from(sid_1295("users")).whereIn(sid_1295("id"), Object.freeze([new SqlInt32(1), new SqlInt32(2), new SqlInt32(3)]));
      function fn_1469() {
        return "whereIn ints";
      }
      test_1467.assert(q_1468.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)", fn_1469);
      return;
    } finally {
      test_1467.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1470 = new Test_799();
    try {
      const q_1471 = from(sid_1295("users")).whereIn(sid_1295("name"), Object.freeze([new SqlString("Alice"), new SqlString("Bob's")]));
      function fn_1472() {
        return "whereIn strings";
      }
      test_1470.assert(q_1471.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')", fn_1472);
      return;
    } finally {
      test_1470.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1473 = new Test_799();
    try {
      const q_1474 = from(sid_1295("users")).whereIn(sid_1295("id"), Object.freeze([]));
      function fn_1475() {
        return "whereIn empty";
      }
      test_1473.assert(q_1474.toSql().toString() === "SELECT * FROM users WHERE 1 = 0", fn_1475);
      return;
    } finally {
      test_1473.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1476 = new Test_799();
    try {
      const t_1477 = from(sid_1295("users"));
      const accumulator_1478 = new SqlBuilder();
      accumulator_1478.appendSafe("active = ");
      accumulator_1478.appendBoolean(true);
      const q_1479 = t_1477.where(accumulator_1478.accumulated).whereIn(sid_1295("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      function fn_1480() {
        return "whereIn chained";
      }
      test_1476.assert(q_1479.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')", fn_1480);
      return;
    } finally {
      test_1476.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1481 = new Test_799();
    try {
      const q_1482 = from(sid_1295("users")).whereIn(sid_1295("id"), Object.freeze([new SqlInt32(42)]));
      function fn_1483() {
        return "whereIn single";
      }
      test_1481.assert(q_1482.toSql().toString() === "SELECT * FROM users WHERE id IN (42)", fn_1483);
      return;
    } finally {
      test_1481.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1484 = new Test_799();
    try {
      const t_1485 = from(sid_1295("users"));
      const accumulator_1486 = new SqlBuilder();
      accumulator_1486.appendSafe("active = ");
      accumulator_1486.appendBoolean(true);
      const q_1487 = t_1485.whereNot(accumulator_1486.accumulated);
      function fn_1488() {
        return "whereNot";
      }
      test_1484.assert(q_1487.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)", fn_1488);
      return;
    } finally {
      test_1484.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1489 = new Test_799();
    try {
      const t_1490 = from(sid_1295("users"));
      const accumulator_1491 = new SqlBuilder();
      accumulator_1491.appendSafe("age > ");
      accumulator_1491.appendInt32(18);
      const t_1492 = t_1490.where(accumulator_1491.accumulated);
      const accumulator_1493 = new SqlBuilder();
      accumulator_1493.appendSafe("banned = ");
      accumulator_1493.appendBoolean(true);
      const q_1494 = t_1492.whereNot(accumulator_1493.accumulated);
      function fn_1495() {
        return "whereNot chained";
      }
      test_1489.assert(q_1494.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)", fn_1495);
      return;
    } finally {
      test_1489.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1496 = new Test_799();
    try {
      const q_1497 = from(sid_1295("users")).whereBetween(sid_1295("age"), new SqlInt32(18), new SqlInt32(65));
      function fn_1498() {
        return "whereBetween ints";
      }
      test_1496.assert(q_1497.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65", fn_1498);
      return;
    } finally {
      test_1496.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_1499 = new Test_799();
    try {
      const t_1500 = from(sid_1295("users"));
      const accumulator_1501 = new SqlBuilder();
      accumulator_1501.appendSafe("active = ");
      accumulator_1501.appendBoolean(true);
      const q_1502 = t_1500.where(accumulator_1501.accumulated).whereBetween(sid_1295("age"), new SqlInt32(21), new SqlInt32(30));
      function fn_1503() {
        return "whereBetween chained";
      }
      test_1499.assert(q_1502.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30", fn_1503);
      return;
    } finally {
      test_1499.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_1504 = new Test_799();
    try {
      const q_1505 = from(sid_1295("users")).whereLike(sid_1295("name"), "John%");
      function fn_1506() {
        return "whereLike";
      }
      test_1504.assert(q_1505.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'", fn_1506);
      return;
    } finally {
      test_1504.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_1507 = new Test_799();
    try {
      const q_1508 = from(sid_1295("users")).whereILike(sid_1295("email"), "%@gmail.com");
      function fn_1509() {
        return "whereILike";
      }
      test_1507.assert(q_1508.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'", fn_1509);
      return;
    } finally {
      test_1507.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_1510 = new Test_799();
    try {
      const q_1511 = from(sid_1295("users")).whereLike(sid_1295("name"), "'; DROP TABLE users; --");
      const s_1512 = q_1511.toSql().toString();
      const t_1513 = s_1512.indexOf("''") >= 0;
      function fn_1514() {
        return "like injection escaped: " + s_1512;
      }
      test_1510.assert(t_1513, fn_1514);
      const t_1515 = s_1512.indexOf("LIKE") >= 0;
      function fn_1516() {
        return "like structure intact: " + s_1512;
      }
      test_1510.assert(t_1515, fn_1516);
      return;
    } finally {
      test_1510.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_1517 = new Test_799();
    try {
      const q_1518 = from(sid_1295("users")).whereLike(sid_1295("name"), "%son%");
      function fn_1519() {
        return "whereLike wildcard";
      }
      test_1517.assert(q_1518.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'", fn_1519);
      return;
    } finally {
      test_1517.softFailToHard();
    }
});
it("countAll produces COUNT(*)", function () {
    const test_1520 = new Test_799();
    try {
      const f_1521 = countAll();
      function fn_1522() {
        return "countAll";
      }
      test_1520.assert(f_1521.toString() === "COUNT(*)", fn_1522);
      return;
    } finally {
      test_1520.softFailToHard();
    }
});
it("countCol produces COUNT(field)", function () {
    const test_1523 = new Test_799();
    try {
      const f_1524 = countCol(sid_1295("id"));
      function fn_1525() {
        return "countCol";
      }
      test_1523.assert(f_1524.toString() === "COUNT(id)", fn_1525);
      return;
    } finally {
      test_1523.softFailToHard();
    }
});
it("sumCol produces SUM(field)", function () {
    const test_1526 = new Test_799();
    try {
      const f_1527 = sumCol(sid_1295("amount"));
      function fn_1528() {
        return "sumCol";
      }
      test_1526.assert(f_1527.toString() === "SUM(amount)", fn_1528);
      return;
    } finally {
      test_1526.softFailToHard();
    }
});
it("avgCol produces AVG(field)", function () {
    const test_1529 = new Test_799();
    try {
      const f_1530 = avgCol(sid_1295("price"));
      function fn_1531() {
        return "avgCol";
      }
      test_1529.assert(f_1530.toString() === "AVG(price)", fn_1531);
      return;
    } finally {
      test_1529.softFailToHard();
    }
});
it("minCol produces MIN(field)", function () {
    const test_1532 = new Test_799();
    try {
      const f_1533 = minCol(sid_1295("created_at"));
      function fn_1534() {
        return "minCol";
      }
      test_1532.assert(f_1533.toString() === "MIN(created_at)", fn_1534);
      return;
    } finally {
      test_1532.softFailToHard();
    }
});
it("maxCol produces MAX(field)", function () {
    const test_1535 = new Test_799();
    try {
      const f_1536 = maxCol(sid_1295("score"));
      function fn_1537() {
        return "maxCol";
      }
      test_1535.assert(f_1536.toString() === "MAX(score)", fn_1537);
      return;
    } finally {
      test_1535.softFailToHard();
    }
});
it("selectExpr with aggregate", function () {
    const test_1538 = new Test_799();
    try {
      const q_1539 = from(sid_1295("orders")).selectExpr(Object.freeze([countAll()]));
      function fn_1540() {
        return "selectExpr count";
      }
      test_1538.assert(q_1539.toSql().toString() === "SELECT COUNT(*) FROM orders", fn_1540);
      return;
    } finally {
      test_1538.softFailToHard();
    }
});
it("selectExpr with multiple expressions", function () {
    const test_1541 = new Test_799();
    try {
      const nameFrag_1542 = col(sid_1295("users"), sid_1295("name"));
      const q_1543 = from(sid_1295("users")).selectExpr(Object.freeze([nameFrag_1542, countAll()]));
      function fn_1544() {
        return "selectExpr multi";
      }
      test_1541.assert(q_1543.toSql().toString() === "SELECT users.name, COUNT(*) FROM users", fn_1544);
      return;
    } finally {
      test_1541.softFailToHard();
    }
});
it("selectExpr overrides selectedFields", function () {
    const test_1545 = new Test_799();
    try {
      const q_1546 = from(sid_1295("users")).select(Object.freeze([sid_1295("id"), sid_1295("name")])).selectExpr(Object.freeze([countAll()]));
      function fn_1547() {
        return "selectExpr overrides select";
      }
      test_1545.assert(q_1546.toSql().toString() === "SELECT COUNT(*) FROM users", fn_1547);
      return;
    } finally {
      test_1545.softFailToHard();
    }
});
it("groupBy single field", function () {
    const test_1548 = new Test_799();
    try {
      const q_1549 = from(sid_1295("orders")).selectExpr(Object.freeze([col(sid_1295("orders"), sid_1295("status")), countAll()])).groupBy(sid_1295("status"));
      function fn_1550() {
        return "groupBy single";
      }
      test_1548.assert(q_1549.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status", fn_1550);
      return;
    } finally {
      test_1548.softFailToHard();
    }
});
it("groupBy multiple fields", function () {
    const test_1551 = new Test_799();
    try {
      const q_1552 = from(sid_1295("orders")).groupBy(sid_1295("status")).groupBy(sid_1295("category"));
      function fn_1553() {
        return "groupBy multiple";
      }
      test_1551.assert(q_1552.toSql().toString() === "SELECT * FROM orders GROUP BY status, category", fn_1553);
      return;
    } finally {
      test_1551.softFailToHard();
    }
});
it("having basic", function () {
    const test_1554 = new Test_799();
    try {
      const t_1555 = from(sid_1295("orders")).selectExpr(Object.freeze([col(sid_1295("orders"), sid_1295("status")), countAll()])).groupBy(sid_1295("status"));
      const accumulator_1556 = new SqlBuilder();
      accumulator_1556.appendSafe("COUNT(*) > ");
      accumulator_1556.appendInt32(5);
      const q_1557 = t_1555.having(accumulator_1556.accumulated);
      function fn_1558() {
        return "having basic";
      }
      test_1554.assert(q_1557.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5", fn_1558);
      return;
    } finally {
      test_1554.softFailToHard();
    }
});
it("orHaving", function () {
    const test_1559 = new Test_799();
    try {
      const t_1560 = from(sid_1295("orders")).groupBy(sid_1295("status"));
      const accumulator_1561 = new SqlBuilder();
      accumulator_1561.appendSafe("COUNT(*) > ");
      accumulator_1561.appendInt32(5);
      const t_1562 = t_1560.having(accumulator_1561.accumulated);
      const accumulator_1563 = new SqlBuilder();
      accumulator_1563.appendSafe("SUM(total) > ");
      accumulator_1563.appendInt32(1000);
      const q_1564 = t_1562.orHaving(accumulator_1563.accumulated);
      function fn_1565() {
        return "orHaving";
      }
      test_1559.assert(q_1564.toSql().toString() === "SELECT * FROM orders GROUP BY status HAVING COUNT(*) > 5 OR SUM(total) > 1000", fn_1565);
      return;
    } finally {
      test_1559.softFailToHard();
    }
});
it("distinct basic", function () {
    const test_1566 = new Test_799();
    try {
      const q_1567 = from(sid_1295("users")).select(Object.freeze([sid_1295("name")])).distinct();
      function fn_1568() {
        return "distinct";
      }
      test_1566.assert(q_1567.toSql().toString() === "SELECT DISTINCT name FROM users", fn_1568);
      return;
    } finally {
      test_1566.softFailToHard();
    }
});
it("distinct with where", function () {
    const test_1569 = new Test_799();
    try {
      const t_1570 = from(sid_1295("users")).select(Object.freeze([sid_1295("email")]));
      const accumulator_1571 = new SqlBuilder();
      accumulator_1571.appendSafe("active = ");
      accumulator_1571.appendBoolean(true);
      const q_1572 = t_1570.where(accumulator_1571.accumulated).distinct();
      function fn_1573() {
        return "distinct with where";
      }
      test_1569.assert(q_1572.toSql().toString() === "SELECT DISTINCT email FROM users WHERE active = TRUE", fn_1573);
      return;
    } finally {
      test_1569.softFailToHard();
    }
});
it("countSql bare", function () {
    const test_1574 = new Test_799();
    try {
      const q_1575 = from(sid_1295("users"));
      function fn_1576() {
        return "countSql bare";
      }
      test_1574.assert(q_1575.countSql().toString() === "SELECT COUNT(*) FROM users", fn_1576);
      return;
    } finally {
      test_1574.softFailToHard();
    }
});
it("countSql with WHERE", function () {
    const test_1577 = new Test_799();
    try {
      const t_1578 = from(sid_1295("users"));
      const accumulator_1579 = new SqlBuilder();
      accumulator_1579.appendSafe("active = ");
      accumulator_1579.appendBoolean(true);
      const q_1580 = t_1578.where(accumulator_1579.accumulated);
      function fn_1581() {
        return "countSql with where";
      }
      test_1577.assert(q_1580.countSql().toString() === "SELECT COUNT(*) FROM users WHERE active = TRUE", fn_1581);
      return;
    } finally {
      test_1577.softFailToHard();
    }
});
it("countSql with JOIN", function () {
    const test_1582 = new Test_799();
    try {
      const t_1583 = from(sid_1295("users"));
      const t_1584 = sid_1295("orders");
      const accumulator_1585 = new SqlBuilder();
      accumulator_1585.appendSafe("users.id = orders.user_id");
      const t_1586 = t_1583.innerJoin(t_1584, accumulator_1585.accumulated);
      const accumulator_1587 = new SqlBuilder();
      accumulator_1587.appendSafe("orders.total > ");
      accumulator_1587.appendInt32(100);
      const q_1588 = t_1586.where(accumulator_1587.accumulated);
      function fn_1589() {
        return "countSql with join";
      }
      test_1582.assert(q_1588.countSql().toString() === "SELECT COUNT(*) FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100", fn_1589);
      return;
    } finally {
      test_1582.softFailToHard();
    }
});
it("countSql drops orderBy/limit/offset", function () {
    const test_1590 = new Test_799();
    try {
      let q_1591;
      try {
        const t_1592 = from(sid_1295("users"));
        const accumulator_1593 = new SqlBuilder();
        accumulator_1593.appendSafe("active = ");
        accumulator_1593.appendBoolean(true);
        const t_1594 = t_1592.where(accumulator_1593.accumulated).orderBy(sid_1295("name"), true).limit(10);
        q_1591 = t_1594.offset(20);
      } catch {
        q_1591 = panic_796();
      }
      const s_1595 = q_1591.countSql().toString();
      function fn_1596() {
        return "countSql drops extras: " + s_1595;
      }
      test_1590.assert(s_1595 === "SELECT COUNT(*) FROM users WHERE active = TRUE", fn_1596);
      return;
    } finally {
      test_1590.softFailToHard();
    }
});
it("full aggregation query", function () {
    const test_1597 = new Test_799();
    try {
      const t_1598 = from(sid_1295("orders")).selectExpr(Object.freeze([col(sid_1295("orders"), sid_1295("status")), countAll(), sumCol(sid_1295("total"))]));
      const t_1599 = sid_1295("users");
      const accumulator_1600 = new SqlBuilder();
      accumulator_1600.appendSafe("orders.user_id = users.id");
      const t_1601 = t_1598.innerJoin(t_1599, accumulator_1600.accumulated);
      const accumulator_1602 = new SqlBuilder();
      accumulator_1602.appendSafe("users.active = ");
      accumulator_1602.appendBoolean(true);
      const t_1603 = t_1601.where(accumulator_1602.accumulated).groupBy(sid_1295("status"));
      const accumulator_1604 = new SqlBuilder();
      accumulator_1604.appendSafe("COUNT(*) > ");
      accumulator_1604.appendInt32(3);
      const q_1605 = t_1603.having(accumulator_1604.accumulated).orderBy(sid_1295("status"), true);
      const expected_1606 = "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      function fn_1607() {
        return "full aggregation";
      }
      test_1597.assert(q_1605.toSql().toString() === "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC", fn_1607);
      return;
    } finally {
      test_1597.softFailToHard();
    }
});
it("unionSql", function () {
    const test_1608 = new Test_799();
    try {
      const t_1609 = from(sid_1295("users"));
      const accumulator_1610 = new SqlBuilder();
      accumulator_1610.appendSafe("role = ");
      accumulator_1610.appendString("admin");
      const a_1611 = t_1609.where(accumulator_1610.accumulated);
      const t_1612 = from(sid_1295("users"));
      const accumulator_1613 = new SqlBuilder();
      accumulator_1613.appendSafe("role = ");
      accumulator_1613.appendString("moderator");
      const b_1614 = t_1612.where(accumulator_1613.accumulated);
      const s_1615 = unionSql(a_1611, b_1614).toString();
      function fn_1616() {
        return "unionSql: " + s_1615;
      }
      test_1608.assert(s_1615 === "(SELECT * FROM users WHERE role = 'admin') UNION (SELECT * FROM users WHERE role = 'moderator')", fn_1616);
      return;
    } finally {
      test_1608.softFailToHard();
    }
});
it("unionAllSql", function () {
    const test_1617 = new Test_799();
    try {
      const a_1618 = from(sid_1295("users")).select(Object.freeze([sid_1295("name")]));
      const b_1619 = from(sid_1295("contacts")).select(Object.freeze([sid_1295("name")]));
      const s_1620 = unionAllSql(a_1618, b_1619).toString();
      function fn_1621() {
        return "unionAllSql: " + s_1620;
      }
      test_1617.assert(s_1620 === "(SELECT name FROM users) UNION ALL (SELECT name FROM contacts)", fn_1621);
      return;
    } finally {
      test_1617.softFailToHard();
    }
});
it("intersectSql", function () {
    const test_1622 = new Test_799();
    try {
      const a_1623 = from(sid_1295("users")).select(Object.freeze([sid_1295("email")]));
      const b_1624 = from(sid_1295("subscribers")).select(Object.freeze([sid_1295("email")]));
      const s_1625 = intersectSql(a_1623, b_1624).toString();
      function fn_1626() {
        return "intersectSql: " + s_1625;
      }
      test_1622.assert(s_1625 === "(SELECT email FROM users) INTERSECT (SELECT email FROM subscribers)", fn_1626);
      return;
    } finally {
      test_1622.softFailToHard();
    }
});
it("exceptSql", function () {
    const test_1627 = new Test_799();
    try {
      const a_1628 = from(sid_1295("users")).select(Object.freeze([sid_1295("id")]));
      const b_1629 = from(sid_1295("banned")).select(Object.freeze([sid_1295("id")]));
      const s_1630 = exceptSql(a_1628, b_1629).toString();
      function fn_1631() {
        return "exceptSql: " + s_1630;
      }
      test_1627.assert(s_1630 === "(SELECT id FROM users) EXCEPT (SELECT id FROM banned)", fn_1631);
      return;
    } finally {
      test_1627.softFailToHard();
    }
});
it("subquery with alias", function () {
    const test_1632 = new Test_799();
    try {
      const t_1633 = from(sid_1295("orders")).select(Object.freeze([sid_1295("user_id")]));
      const accumulator_1634 = new SqlBuilder();
      accumulator_1634.appendSafe("total > ");
      accumulator_1634.appendInt32(100);
      const inner_1635 = t_1633.where(accumulator_1634.accumulated);
      const s_1636 = subquery(inner_1635, sid_1295("big_orders")).toString();
      function fn_1637() {
        return "subquery: " + s_1636;
      }
      test_1632.assert(s_1636 === "(SELECT user_id FROM orders WHERE total > 100) AS big_orders", fn_1637);
      return;
    } finally {
      test_1632.softFailToHard();
    }
});
it("existsSql", function () {
    const test_1638 = new Test_799();
    try {
      const t_1639 = from(sid_1295("orders"));
      const accumulator_1640 = new SqlBuilder();
      accumulator_1640.appendSafe("orders.user_id = users.id");
      const inner_1641 = t_1639.where(accumulator_1640.accumulated);
      const s_1642 = existsSql(inner_1641).toString();
      function fn_1643() {
        return "existsSql: " + s_1642;
      }
      test_1638.assert(s_1642 === "EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)", fn_1643);
      return;
    } finally {
      test_1638.softFailToHard();
    }
});
it("whereInSubquery", function () {
    const test_1644 = new Test_799();
    try {
      const t_1645 = from(sid_1295("orders")).select(Object.freeze([sid_1295("user_id")]));
      const accumulator_1646 = new SqlBuilder();
      accumulator_1646.appendSafe("total > ");
      accumulator_1646.appendInt32(1000);
      const sub_1647 = t_1645.where(accumulator_1646.accumulated);
      const q_1648 = from(sid_1295("users")).whereInSubquery(sid_1295("id"), sub_1647);
      const s_1649 = q_1648.toSql().toString();
      function fn_1650() {
        return "whereInSubquery: " + s_1649;
      }
      test_1644.assert(s_1649 === "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000)", fn_1650);
      return;
    } finally {
      test_1644.softFailToHard();
    }
});
it("set operation with WHERE on each side", function () {
    const test_1651 = new Test_799();
    try {
      const t_1652 = from(sid_1295("users"));
      const accumulator_1653 = new SqlBuilder();
      accumulator_1653.appendSafe("age > ");
      accumulator_1653.appendInt32(18);
      const t_1654 = t_1652.where(accumulator_1653.accumulated);
      const accumulator_1655 = new SqlBuilder();
      accumulator_1655.appendSafe("active = ");
      accumulator_1655.appendBoolean(true);
      const a_1656 = t_1654.where(accumulator_1655.accumulated);
      const t_1657 = from(sid_1295("users"));
      const accumulator_1658 = new SqlBuilder();
      accumulator_1658.appendSafe("role = ");
      accumulator_1658.appendString("vip");
      const b_1659 = t_1657.where(accumulator_1658.accumulated);
      const s_1660 = unionSql(a_1656, b_1659).toString();
      function fn_1661() {
        return "union with where: " + s_1660;
      }
      test_1651.assert(s_1660 === "(SELECT * FROM users WHERE age > 18 AND active = TRUE) UNION (SELECT * FROM users WHERE role = 'vip')", fn_1661);
      return;
    } finally {
      test_1651.softFailToHard();
    }
});
it("whereInSubquery chained with where", function () {
    const test_1662 = new Test_799();
    try {
      const sub_1663 = from(sid_1295("orders")).select(Object.freeze([sid_1295("user_id")]));
      const t_1664 = from(sid_1295("users"));
      const accumulator_1665 = new SqlBuilder();
      accumulator_1665.appendSafe("active = ");
      accumulator_1665.appendBoolean(true);
      const q_1666 = t_1664.where(accumulator_1665.accumulated).whereInSubquery(sid_1295("id"), sub_1663);
      const s_1667 = q_1666.toSql().toString();
      function fn_1668() {
        return "whereInSubquery chained: " + s_1667;
      }
      test_1662.assert(s_1667 === "SELECT * FROM users WHERE active = TRUE AND id IN (SELECT user_id FROM orders)", fn_1668);
      return;
    } finally {
      test_1662.softFailToHard();
    }
});
it("existsSql used in where", function () {
    const test_1669 = new Test_799();
    try {
      const t_1670 = from(sid_1295("orders"));
      const accumulator_1671 = new SqlBuilder();
      accumulator_1671.appendSafe("orders.user_id = users.id");
      const sub_1672 = t_1670.where(accumulator_1671.accumulated);
      const q_1673 = from(sid_1295("users")).where(existsSql(sub_1672));
      const s_1674 = q_1673.toSql().toString();
      function fn_1675() {
        return "exists in where: " + s_1674;
      }
      test_1669.assert(s_1674 === "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)", fn_1675);
      return;
    } finally {
      test_1669.softFailToHard();
    }
});
it("UpdateQuery basic", function () {
    const test_1676 = new Test_799();
    try {
      let q_1677;
      try {
        const t_1678 = update(sid_1295("users")).set(sid_1295("name"), new SqlString("Alice"));
        const accumulator_1679 = new SqlBuilder();
        accumulator_1679.appendSafe("id = ");
        accumulator_1679.appendInt32(1);
        q_1677 = t_1678.where(accumulator_1679.accumulated).toSql();
      } catch {
        q_1677 = panic_796();
      }
      function fn_1680() {
        return "update basic";
      }
      test_1676.assert(q_1677.toString() === "UPDATE users SET name = 'Alice' WHERE id = 1", fn_1680);
      return;
    } finally {
      test_1676.softFailToHard();
    }
});
it("UpdateQuery multiple SET", function () {
    const test_1681 = new Test_799();
    try {
      let q_1682;
      try {
        const t_1683 = update(sid_1295("users")).set(sid_1295("name"), new SqlString("Bob")).set(sid_1295("age"), new SqlInt32(30));
        const accumulator_1684 = new SqlBuilder();
        accumulator_1684.appendSafe("id = ");
        accumulator_1684.appendInt32(2);
        q_1682 = t_1683.where(accumulator_1684.accumulated).toSql();
      } catch {
        q_1682 = panic_796();
      }
      function fn_1685() {
        return "update multi set";
      }
      test_1681.assert(q_1682.toString() === "UPDATE users SET name = 'Bob', age = 30 WHERE id = 2", fn_1685);
      return;
    } finally {
      test_1681.softFailToHard();
    }
});
it("UpdateQuery multiple WHERE", function () {
    const test_1686 = new Test_799();
    try {
      let q_1687;
      try {
        const t_1688 = update(sid_1295("users")).set(sid_1295("active"), new SqlBoolean(false));
        const accumulator_1689 = new SqlBuilder();
        accumulator_1689.appendSafe("age < ");
        accumulator_1689.appendInt32(18);
        const t_1690 = t_1688.where(accumulator_1689.accumulated);
        const accumulator_1691 = new SqlBuilder();
        accumulator_1691.appendSafe("role = ");
        accumulator_1691.appendString("guest");
        q_1687 = t_1690.where(accumulator_1691.accumulated).toSql();
      } catch {
        q_1687 = panic_796();
      }
      function fn_1692() {
        return "update multi where";
      }
      test_1686.assert(q_1687.toString() === "UPDATE users SET active = FALSE WHERE age < 18 AND role = 'guest'", fn_1692);
      return;
    } finally {
      test_1686.softFailToHard();
    }
});
it("UpdateQuery orWhere", function () {
    const test_1693 = new Test_799();
    try {
      let q_1694;
      try {
        const t_1695 = update(sid_1295("users")).set(sid_1295("status"), new SqlString("banned"));
        const accumulator_1696 = new SqlBuilder();
        accumulator_1696.appendSafe("spam_count > ");
        accumulator_1696.appendInt32(10);
        const t_1697 = t_1695.where(accumulator_1696.accumulated);
        const accumulator_1698 = new SqlBuilder();
        accumulator_1698.appendSafe("reported = ");
        accumulator_1698.appendBoolean(true);
        q_1694 = t_1697.orWhere(accumulator_1698.accumulated).toSql();
      } catch {
        q_1694 = panic_796();
      }
      function fn_1699() {
        return "update orWhere";
      }
      test_1693.assert(q_1694.toString() === "UPDATE users SET status = 'banned' WHERE spam_count > 10 OR reported = TRUE", fn_1699);
      return;
    } finally {
      test_1693.softFailToHard();
    }
});
it("UpdateQuery bubbles without WHERE", function () {
    const test_1700 = new Test_799();
    try {
      let didBubble_1701;
      try {
        update(sid_1295("users")).set(sid_1295("x"), new SqlInt32(1)).toSql();
        didBubble_1701 = false;
      } catch {
        didBubble_1701 = true;
      }
      function fn_1702() {
        return "update without WHERE should bubble";
      }
      test_1700.assert(didBubble_1701, fn_1702);
      return;
    } finally {
      test_1700.softFailToHard();
    }
});
it("UpdateQuery bubbles without SET", function () {
    const test_1703 = new Test_799();
    try {
      let didBubble_1704;
      try {
        const t_1705 = update(sid_1295("users"));
        const accumulator_1706 = new SqlBuilder();
        accumulator_1706.appendSafe("id = ");
        accumulator_1706.appendInt32(1);
        t_1705.where(accumulator_1706.accumulated).toSql();
        didBubble_1704 = false;
      } catch {
        didBubble_1704 = true;
      }
      function fn_1707() {
        return "update without SET should bubble";
      }
      test_1703.assert(didBubble_1704, fn_1707);
      return;
    } finally {
      test_1703.softFailToHard();
    }
});
it("UpdateQuery with limit", function () {
    const test_1708 = new Test_799();
    try {
      let q_1709;
      try {
        const t_1710 = update(sid_1295("users")).set(sid_1295("active"), new SqlBoolean(false));
        const accumulator_1711 = new SqlBuilder();
        accumulator_1711.appendSafe("last_login < ");
        accumulator_1711.appendString("2024-01-01");
        const t_1712 = t_1710.where(accumulator_1711.accumulated).limit(100);
        q_1709 = t_1712.toSql();
      } catch {
        q_1709 = panic_796();
      }
      function fn_1713() {
        return "update limit";
      }
      test_1708.assert(q_1709.toString() === "UPDATE users SET active = FALSE WHERE last_login < '2024-01-01' LIMIT 100", fn_1713);
      return;
    } finally {
      test_1708.softFailToHard();
    }
});
it("UpdateQuery escaping", function () {
    const test_1714 = new Test_799();
    try {
      let q_1715;
      try {
        const t_1716 = update(sid_1295("users")).set(sid_1295("bio"), new SqlString("It's a test"));
        const accumulator_1717 = new SqlBuilder();
        accumulator_1717.appendSafe("id = ");
        accumulator_1717.appendInt32(1);
        q_1715 = t_1716.where(accumulator_1717.accumulated).toSql();
      } catch {
        q_1715 = panic_796();
      }
      function fn_1718() {
        return "update escaping";
      }
      test_1714.assert(q_1715.toString() === "UPDATE users SET bio = 'It''s a test' WHERE id = 1", fn_1718);
      return;
    } finally {
      test_1714.softFailToHard();
    }
});
it("DeleteQuery basic", function () {
    const test_1719 = new Test_799();
    try {
      let q_1720;
      try {
        const t_1721 = deleteFrom(sid_1295("users"));
        const accumulator_1722 = new SqlBuilder();
        accumulator_1722.appendSafe("id = ");
        accumulator_1722.appendInt32(1);
        q_1720 = t_1721.where(accumulator_1722.accumulated).toSql();
      } catch {
        q_1720 = panic_796();
      }
      function fn_1723() {
        return "delete basic";
      }
      test_1719.assert(q_1720.toString() === "DELETE FROM users WHERE id = 1", fn_1723);
      return;
    } finally {
      test_1719.softFailToHard();
    }
});
it("DeleteQuery multiple WHERE", function () {
    const test_1724 = new Test_799();
    try {
      let q_1725;
      try {
        const t_1726 = deleteFrom(sid_1295("logs"));
        const accumulator_1727 = new SqlBuilder();
        accumulator_1727.appendSafe("created_at < ");
        accumulator_1727.appendString("2024-01-01");
        const t_1728 = t_1726.where(accumulator_1727.accumulated);
        const accumulator_1729 = new SqlBuilder();
        accumulator_1729.appendSafe("level = ");
        accumulator_1729.appendString("debug");
        q_1725 = t_1728.where(accumulator_1729.accumulated).toSql();
      } catch {
        q_1725 = panic_796();
      }
      function fn_1730() {
        return "delete multi where";
      }
      test_1724.assert(q_1725.toString() === "DELETE FROM logs WHERE created_at < '2024-01-01' AND level = 'debug'", fn_1730);
      return;
    } finally {
      test_1724.softFailToHard();
    }
});
it("DeleteQuery bubbles without WHERE", function () {
    const test_1731 = new Test_799();
    try {
      let didBubble_1732;
      try {
        deleteFrom(sid_1295("users")).toSql();
        didBubble_1732 = false;
      } catch {
        didBubble_1732 = true;
      }
      function fn_1733() {
        return "delete without WHERE should bubble";
      }
      test_1731.assert(didBubble_1732, fn_1733);
      return;
    } finally {
      test_1731.softFailToHard();
    }
});
it("DeleteQuery orWhere", function () {
    const test_1734 = new Test_799();
    try {
      let q_1735;
      try {
        const t_1736 = deleteFrom(sid_1295("sessions"));
        const accumulator_1737 = new SqlBuilder();
        accumulator_1737.appendSafe("expired = ");
        accumulator_1737.appendBoolean(true);
        const t_1738 = t_1736.where(accumulator_1737.accumulated);
        const accumulator_1739 = new SqlBuilder();
        accumulator_1739.appendSafe("created_at < ");
        accumulator_1739.appendString("2023-01-01");
        q_1735 = t_1738.orWhere(accumulator_1739.accumulated).toSql();
      } catch {
        q_1735 = panic_796();
      }
      function fn_1740() {
        return "delete orWhere";
      }
      test_1734.assert(q_1735.toString() === "DELETE FROM sessions WHERE expired = TRUE OR created_at < '2023-01-01'", fn_1740);
      return;
    } finally {
      test_1734.softFailToHard();
    }
});
it("DeleteQuery with limit", function () {
    const test_1741 = new Test_799();
    try {
      let q_1742;
      try {
        const t_1743 = deleteFrom(sid_1295("logs"));
        const accumulator_1744 = new SqlBuilder();
        accumulator_1744.appendSafe("level = ");
        accumulator_1744.appendString("debug");
        const t_1745 = t_1743.where(accumulator_1744.accumulated).limit(1000);
        q_1742 = t_1745.toSql();
      } catch {
        q_1742 = panic_796();
      }
      function fn_1746() {
        return "delete limit";
      }
      test_1741.assert(q_1742.toString() === "DELETE FROM logs WHERE level = 'debug' LIMIT 1000", fn_1746);
      return;
    } finally {
      test_1741.softFailToHard();
    }
});
it("orderByNulls NULLS FIRST", function () {
    const test_1747 = new Test_799();
    try {
      const q_1748 = from(sid_1295("users")).orderByNulls(sid_1295("email"), true, new NullsFirst());
      function fn_1749() {
        return "nulls first";
      }
      test_1747.assert(q_1748.toSql().toString() === "SELECT * FROM users ORDER BY email ASC NULLS FIRST", fn_1749);
      return;
    } finally {
      test_1747.softFailToHard();
    }
});
it("orderByNulls NULLS LAST", function () {
    const test_1750 = new Test_799();
    try {
      const q_1751 = from(sid_1295("users")).orderByNulls(sid_1295("score"), false, new NullsLast());
      function fn_1752() {
        return "nulls last";
      }
      test_1750.assert(q_1751.toSql().toString() === "SELECT * FROM users ORDER BY score DESC NULLS LAST", fn_1752);
      return;
    } finally {
      test_1750.softFailToHard();
    }
});
it("mixed orderBy and orderByNulls", function () {
    const test_1753 = new Test_799();
    try {
      const q_1754 = from(sid_1295("users")).orderBy(sid_1295("name"), true).orderByNulls(sid_1295("email"), true, new NullsFirst());
      function fn_1755() {
        return "mixed order";
      }
      test_1753.assert(q_1754.toSql().toString() === "SELECT * FROM users ORDER BY name ASC, email ASC NULLS FIRST", fn_1755);
      return;
    } finally {
      test_1753.softFailToHard();
    }
});
it("crossJoin", function () {
    const test_1756 = new Test_799();
    try {
      const q_1757 = from(sid_1295("users")).crossJoin(sid_1295("colors"));
      function fn_1758() {
        return "cross join";
      }
      test_1756.assert(q_1757.toSql().toString() === "SELECT * FROM users CROSS JOIN colors", fn_1758);
      return;
    } finally {
      test_1756.softFailToHard();
    }
});
it("crossJoin combined with other joins", function () {
    const test_1759 = new Test_799();
    try {
      const t_1760 = from(sid_1295("users"));
      const t_1761 = sid_1295("orders");
      const accumulator_1762 = new SqlBuilder();
      accumulator_1762.appendSafe("users.id = orders.user_id");
      const q_1763 = t_1760.innerJoin(t_1761, accumulator_1762.accumulated).crossJoin(sid_1295("colors"));
      function fn_1764() {
        return "cross + inner join";
      }
      test_1759.assert(q_1763.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id CROSS JOIN colors", fn_1764);
      return;
    } finally {
      test_1759.softFailToHard();
    }
});
it("lock FOR UPDATE", function () {
    const test_1765 = new Test_799();
    try {
      const t_1766 = from(sid_1295("users"));
      const accumulator_1767 = new SqlBuilder();
      accumulator_1767.appendSafe("id = ");
      accumulator_1767.appendInt32(1);
      const q_1768 = t_1766.where(accumulator_1767.accumulated).lock(new ForUpdate());
      function fn_1769() {
        return "for update";
      }
      test_1765.assert(q_1768.toSql().toString() === "SELECT * FROM users WHERE id = 1 FOR UPDATE", fn_1769);
      return;
    } finally {
      test_1765.softFailToHard();
    }
});
it("lock FOR SHARE", function () {
    const test_1770 = new Test_799();
    try {
      const q_1771 = from(sid_1295("users")).select(Object.freeze([sid_1295("name")])).lock(new ForShare());
      function fn_1772() {
        return "for share";
      }
      test_1770.assert(q_1771.toSql().toString() === "SELECT name FROM users FOR SHARE", fn_1772);
      return;
    } finally {
      test_1770.softFailToHard();
    }
});
it("lock with full query", function () {
    const test_1773 = new Test_799();
    try {
      let q_1774;
      try {
        const t_1775 = from(sid_1295("accounts"));
        const accumulator_1776 = new SqlBuilder();
        accumulator_1776.appendSafe("id = ");
        accumulator_1776.appendInt32(42);
        const t_1777 = t_1775.where(accumulator_1776.accumulated).limit(1);
        q_1774 = t_1777.lock(new ForUpdate());
      } catch {
        q_1774 = panic_796();
      }
      function fn_1778() {
        return "lock full query";
      }
      test_1773.assert(q_1774.toSql().toString() === "SELECT * FROM accounts WHERE id = 42 LIMIT 1 FOR UPDATE", fn_1778);
      return;
    } finally {
      test_1773.softFailToHard();
    }
});
it("query builder immutability - two queries from same base", function () {
    const test_1779 = new Test_799();
    try {
      const t_1780 = from(sid_1295("users"));
      const accumulator_1781 = new SqlBuilder();
      accumulator_1781.appendSafe("active = ");
      accumulator_1781.appendBoolean(true);
      const base_1782 = t_1780.where(accumulator_1781.accumulated);
      let q1_1783;
      try {
        q1_1783 = base_1782.limit(10);
      } catch {
        q1_1783 = panic_796();
      }
      let q2_1784;
      try {
        q2_1784 = base_1782.limit(20);
      } catch {
        q2_1784 = panic_796();
      }
      function fn_1785() {
        return "q1";
      }
      test_1779.assert(q1_1783.toSql().toString() === "SELECT * FROM users WHERE active = TRUE LIMIT 10", fn_1785);
      function fn_1786() {
        return "q2";
      }
      test_1779.assert(q2_1784.toSql().toString() === "SELECT * FROM users WHERE active = TRUE LIMIT 20", fn_1786);
      return;
    } finally {
      test_1779.softFailToHard();
    }
});
it("limit zero produces LIMIT 0", function () {
    const test_1787 = new Test_799();
    try {
      let q_1788;
      try {
        q_1788 = from(sid_1295("users")).limit(0);
      } catch {
        q_1788 = panic_796();
      }
      function fn_1789() {
        return "limit 0";
      }
      test_1787.assert(q_1788.toSql().toString() === "SELECT * FROM users LIMIT 0", fn_1789);
      return;
    } finally {
      test_1787.softFailToHard();
    }
});
it("safeToSql with zero defaultLimit", function () {
    const test_1790 = new Test_799();
    try {
      const q_1791 = from(sid_1295("users"));
      let s_1792;
      try {
        s_1792 = q_1791.safeToSql(0);
      } catch {
        s_1792 = panic_796();
      }
      function fn_1793() {
        return "safeToSql 0";
      }
      test_1790.assert(s_1792.toString() === "SELECT * FROM users LIMIT 0", fn_1793);
      return;
    } finally {
      test_1790.softFailToHard();
    }
});
it("UpdateQuery limit bubbles on negative", function () {
    const test_1794 = new Test_799();
    try {
      let didBubble_1795;
      try {
        const t_1796 = update(sid_1295("users")).set(sid_1295("name"), new SqlString("x"));
        const accumulator_1797 = new SqlBuilder();
        accumulator_1797.appendSafe("id = ");
        accumulator_1797.appendInt32(1);
        t_1796.where(accumulator_1797.accumulated).limit(-1);
        didBubble_1795 = false;
      } catch {
        didBubble_1795 = true;
      }
      function fn_1798() {
        return "UpdateQuery negative limit should bubble";
      }
      test_1794.assert(didBubble_1795, fn_1798);
      return;
    } finally {
      test_1794.softFailToHard();
    }
});
it("DeleteQuery limit bubbles on negative", function () {
    const test_1799 = new Test_799();
    try {
      let didBubble_1800;
      try {
        const t_1801 = deleteFrom(sid_1295("users"));
        const accumulator_1802 = new SqlBuilder();
        accumulator_1802.appendSafe("id = ");
        accumulator_1802.appendInt32(1);
        t_1801.where(accumulator_1802.accumulated).limit(-1);
        didBubble_1800 = false;
      } catch {
        didBubble_1800 = true;
      }
      function fn_1803() {
        return "DeleteQuery negative limit should bubble";
      }
      test_1799.assert(didBubble_1800, fn_1803);
      return;
    } finally {
      test_1799.softFailToHard();
    }
});
it("UpdateQuery immutability - two from same base", function () {
    const test_1804 = new Test_799();
    try {
      let t_1805;
      let t_1806;
      const t_1807 = update(sid_1295("users")).set(sid_1295("name"), new SqlString("Alice"));
      const accumulator_1808 = new SqlBuilder();
      accumulator_1808.appendSafe("id = ");
      accumulator_1808.appendInt32(1);
      const base_1809 = t_1807.where(accumulator_1808.accumulated);
      const q1_1810 = base_1809.set(sid_1295("age"), new SqlInt32(25));
      const q2_1811 = base_1809.set(sid_1295("age"), new SqlInt32(30));
      try {
        t_1805 = q1_1810.toSql();
      } catch {
        t_1805 = panic_796();
      }
      const s1_1812 = t_1805.toString();
      try {
        t_1806 = q2_1811.toSql();
      } catch {
        t_1806 = panic_796();
      }
      const s2_1813 = t_1806.toString();
      const t_1814 = s1_1812.indexOf("25") >= 0;
      function fn_1815() {
        return "q1 should have 25: " + s1_1812;
      }
      test_1804.assert(t_1814, fn_1815);
      const t_1816 = s2_1813.indexOf("30") >= 0;
      function fn_1817() {
        return "q2 should have 30: " + s2_1813;
      }
      test_1804.assert(t_1816, fn_1817);
      const t_1818 = s1_1812.indexOf("30") >= 0;
      function fn_1819() {
        return "q1 should NOT have 30: " + s1_1812;
      }
      test_1804.assert(! t_1818, fn_1819);
      return;
    } finally {
      test_1804.softFailToHard();
    }
});
it("DeleteQuery immutability", function () {
    const test_1820 = new Test_799();
    try {
      let t_1821;
      let t_1822;
      const t_1823 = deleteFrom(sid_1295("users"));
      const accumulator_1824 = new SqlBuilder();
      accumulator_1824.appendSafe("active = ");
      accumulator_1824.appendBoolean(false);
      const base_1825 = t_1823.where(accumulator_1824.accumulated);
      const accumulator_1826 = new SqlBuilder();
      accumulator_1826.appendSafe("age < ");
      accumulator_1826.appendInt32(18);
      const q1_1827 = base_1825.where(accumulator_1826.accumulated);
      const accumulator_1828 = new SqlBuilder();
      accumulator_1828.appendSafe("age > ");
      accumulator_1828.appendInt32(65);
      const q2_1829 = base_1825.where(accumulator_1828.accumulated);
      try {
        t_1821 = q1_1827.toSql();
      } catch {
        t_1821 = panic_796();
      }
      const s1_1830 = t_1821.toString();
      try {
        t_1822 = q2_1829.toSql();
      } catch {
        t_1822 = panic_796();
      }
      const s2_1831 = t_1822.toString();
      const t_1832 = s1_1830.indexOf("age < 18") >= 0;
      function fn_1833() {
        return "q1: " + s1_1830;
      }
      test_1820.assert(t_1832, fn_1833);
      const t_1834 = s2_1831.indexOf("age > 65") >= 0;
      function fn_1835() {
        return "q2: " + s2_1831;
      }
      test_1820.assert(t_1834, fn_1835);
      const t_1836 = s1_1830.indexOf("age > 65") >= 0;
      function fn_1837() {
        return "q1 should not have q2 condition: " + s1_1830;
      }
      test_1820.assert(! t_1836, fn_1837);
      return;
    } finally {
      test_1820.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_1838 = new Test_799();
    try {
      let id_1839;
      try {
        id_1839 = safeIdentifier("user_name");
      } catch {
        id_1839 = panic_796();
      }
      function fn_1840() {
        return "value should round-trip";
      }
      test_1838.assert(id_1839.sqlValue === "user_name", fn_1840);
      return;
    } finally {
      test_1838.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_1841 = new Test_799();
    try {
      let didBubble_1842;
      try {
        safeIdentifier("");
        didBubble_1842 = false;
      } catch {
        didBubble_1842 = true;
      }
      function fn_1843() {
        return "empty string should bubble";
      }
      test_1841.assert(didBubble_1842, fn_1843);
      return;
    } finally {
      test_1841.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_1844 = new Test_799();
    try {
      let didBubble_1845;
      try {
        safeIdentifier("1col");
        didBubble_1845 = false;
      } catch {
        didBubble_1845 = true;
      }
      function fn_1846() {
        return "leading digit should bubble";
      }
      test_1844.assert(didBubble_1845, fn_1846);
      return;
    } finally {
      test_1844.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_1847 = new Test_799();
    try {
      const cases_1848 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      const this_1849 = cases_1848;
      const n_1850 = this_1849.length;
      let i_1851 = 0;
      while (i_1851 < n_1850) {
        const el_1852 = listedGet_99(this_1849, i_1851);
        i_1851 = i_1851 + 1 | 0;
        const c_1853 = el_1852;
        let didBubble_1854;
        try {
          safeIdentifier(c_1853);
          didBubble_1854 = false;
        } catch {
          didBubble_1854 = true;
        }
        function fn_1855() {
          return "should reject: " + c_1853;
        }
        test_1847.assert(didBubble_1854, fn_1855);
      }
      return;
    } finally {
      test_1847.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_1856 = new Test_799();
    try {
      let t_1857;
      let t_1858;
      let t_1859;
      try {
        t_1857 = safeIdentifier("users");
      } catch {
        t_1857 = panic_796();
      }
      try {
        t_1858 = safeIdentifier("name");
      } catch {
        t_1858 = panic_796();
      }
      try {
        t_1859 = safeIdentifier("age");
      } catch {
        t_1859 = panic_796();
      }
      const td_1860 = new TableDef(t_1857, Object.freeze([new FieldDef(t_1858, new StringField(), false, null, false), new FieldDef(t_1859, new IntField(), false, null, false)]), null);
      let f_1861;
      try {
        f_1861 = td_1860.field("age");
      } catch {
        f_1861 = panic_796();
      }
      function fn_1862() {
        return "should find age field";
      }
      test_1856.assert(f_1861.name.sqlValue === "age", fn_1862);
      return;
    } finally {
      test_1856.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_1863 = new Test_799();
    try {
      let t_1864;
      let t_1865;
      try {
        t_1864 = safeIdentifier("users");
      } catch {
        t_1864 = panic_796();
      }
      try {
        t_1865 = safeIdentifier("name");
      } catch {
        t_1865 = panic_796();
      }
      const td_1866 = new TableDef(t_1864, Object.freeze([new FieldDef(t_1865, new StringField(), false, null, false)]), null);
      let didBubble_1867;
      try {
        td_1866.field("nonexistent");
        didBubble_1867 = false;
      } catch {
        didBubble_1867 = true;
      }
      function fn_1868() {
        return "unknown field should bubble";
      }
      test_1863.assert(didBubble_1867, fn_1868);
      return;
    } finally {
      test_1863.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_1869 = new Test_799();
    try {
      let t_1870;
      let t_1871;
      try {
        t_1870 = safeIdentifier("email");
      } catch {
        t_1870 = panic_796();
      }
      const required_1872 = new FieldDef(t_1870, new StringField(), false, null, false);
      try {
        t_1871 = safeIdentifier("bio");
      } catch {
        t_1871 = panic_796();
      }
      const optional_1873 = new FieldDef(t_1871, new StringField(), true, null, false);
      function fn_1874() {
        return "required field should not be nullable";
      }
      test_1869.assert(! required_1872.nullable, fn_1874);
      function fn_1875() {
        return "optional field should be nullable";
      }
      test_1869.assert(optional_1873.nullable, fn_1875);
      return;
    } finally {
      test_1869.softFailToHard();
    }
});
it("pkName defaults to id when primaryKey is null", function () {
    const test_1876 = new Test_799();
    try {
      let t_1877;
      let t_1878;
      try {
        t_1877 = safeIdentifier("users");
      } catch {
        t_1877 = panic_796();
      }
      try {
        t_1878 = safeIdentifier("name");
      } catch {
        t_1878 = panic_796();
      }
      const td_1879 = new TableDef(t_1877, Object.freeze([new FieldDef(t_1878, new StringField(), false, null, false)]), null);
      function fn_1880() {
        return "default pk should be id";
      }
      test_1876.assert(td_1879.pkName() === "id", fn_1880);
      return;
    } finally {
      test_1876.softFailToHard();
    }
});
it("pkName returns custom primary key", function () {
    const test_1881 = new Test_799();
    try {
      let t_1882;
      let t_1883;
      let t_1884;
      try {
        t_1882 = safeIdentifier("users");
      } catch {
        t_1882 = panic_796();
      }
      try {
        t_1883 = safeIdentifier("user_id");
      } catch {
        t_1883 = panic_796();
      }
      const t_1885 = Object.freeze([new FieldDef(t_1883, new IntField(), false, null, false)]);
      try {
        t_1884 = safeIdentifier("user_id");
      } catch {
        t_1884 = panic_796();
      }
      const td_1886 = new TableDef(t_1882, t_1885, t_1884);
      function fn_1887() {
        return "custom pk should be user_id";
      }
      test_1881.assert(td_1886.pkName() === "user_id", fn_1887);
      return;
    } finally {
      test_1881.softFailToHard();
    }
});
it("timestamps returns two DateField defs", function () {
    const test_1888 = new Test_799();
    try {
      let ts_1889;
      try {
        ts_1889 = timestamps();
      } catch {
        ts_1889 = panic_796();
      }
      function fn_1890() {
        return "should return 2 fields";
      }
      test_1888.assert(ts_1889.length === 2, fn_1890);
      function fn_1891() {
        return "first should be inserted_at";
      }
      test_1888.assert(listedGet_99(ts_1889, 0).name.sqlValue === "inserted_at", fn_1891);
      function fn_1892() {
        return "second should be updated_at";
      }
      test_1888.assert(listedGet_99(ts_1889, 1).name.sqlValue === "updated_at", fn_1892);
      function fn_1893() {
        return "inserted_at should be nullable";
      }
      test_1888.assert(listedGet_99(ts_1889, 0).nullable, fn_1893);
      function fn_1894() {
        return "updated_at should be nullable";
      }
      test_1888.assert(listedGet_99(ts_1889, 1).nullable, fn_1894);
      function fn_1895() {
        return "inserted_at should have default";
      }
      test_1888.assert(!(listedGet_99(ts_1889, 0).defaultValue == null), fn_1895);
      function fn_1896() {
        return "updated_at should have default";
      }
      test_1888.assert(!(listedGet_99(ts_1889, 1).defaultValue == null), fn_1896);
      return;
    } finally {
      test_1888.softFailToHard();
    }
});
it("FieldDef defaultValue field", function () {
    const test_1897 = new Test_799();
    try {
      let t_1898;
      let t_1899;
      try {
        t_1898 = safeIdentifier("status");
      } catch {
        t_1898 = panic_796();
      }
      const withDefault_1900 = new FieldDef(t_1898, new StringField(), false, new SqlDefault(), false);
      try {
        t_1899 = safeIdentifier("name");
      } catch {
        t_1899 = panic_796();
      }
      const withoutDefault_1901 = new FieldDef(t_1899, new StringField(), false, null, false);
      function fn_1902() {
        return "should have default";
      }
      test_1897.assert(!(withDefault_1900.defaultValue == null), fn_1902);
      function fn_1903() {
        return "should not have default";
      }
      test_1897.assert(withoutDefault_1901.defaultValue == null, fn_1903);
      return;
    } finally {
      test_1897.softFailToHard();
    }
});
it("FieldDef virtual flag", function () {
    const test_1904 = new Test_799();
    try {
      let t_1905;
      let t_1906;
      try {
        t_1905 = safeIdentifier("name");
      } catch {
        t_1905 = panic_796();
      }
      const normal_1907 = new FieldDef(t_1905, new StringField(), false, null, false);
      try {
        t_1906 = safeIdentifier("full_name");
      } catch {
        t_1906 = panic_796();
      }
      const virt_1908 = new FieldDef(t_1906, new StringField(), true, null, true);
      function fn_1909() {
        return "normal field should not be virtual";
      }
      test_1904.assert(! normal_1907.virtual, fn_1909);
      function fn_1910() {
        return "virtual field should be virtual";
      }
      test_1904.assert(virt_1908.virtual, fn_1910);
      return;
    } finally {
      test_1904.softFailToHard();
    }
});
it("safeIdentifier accepts single character names", function () {
    const test_1911 = new Test_799();
    try {
      let a_1912;
      try {
        a_1912 = safeIdentifier("a");
      } catch {
        a_1912 = panic_796();
      }
      function fn_1913() {
        return "single letter should work";
      }
      test_1911.assert(a_1912.sqlValue === "a", fn_1913);
      let u_1914;
      try {
        u_1914 = safeIdentifier("_");
      } catch {
        u_1914 = panic_796();
      }
      function fn_1915() {
        return "single underscore should work";
      }
      test_1911.assert(u_1914.sqlValue === "_", fn_1915);
      return;
    } finally {
      test_1911.softFailToHard();
    }
});
it("safeIdentifier accepts all-underscore names", function () {
    const test_1916 = new Test_799();
    try {
      let id_1917;
      try {
        id_1917 = safeIdentifier("___");
      } catch {
        id_1917 = panic_796();
      }
      function fn_1918() {
        return "all underscores should work";
      }
      test_1916.assert(id_1917.sqlValue === "___", fn_1918);
      return;
    } finally {
      test_1916.softFailToHard();
    }
});
it("TableDef with empty field list", function () {
    const test_1919 = new Test_799();
    try {
      let t_1920;
      try {
        t_1920 = safeIdentifier("empty");
      } catch {
        t_1920 = panic_796();
      }
      const tbl_1921 = new TableDef(t_1920, Object.freeze([]), null);
      let didBubble_1922;
      try {
        tbl_1921.field("anything");
        didBubble_1922 = false;
      } catch {
        didBubble_1922 = true;
      }
      function fn_1923() {
        return "field lookup on empty table should bubble";
      }
      test_1919.assert(didBubble_1922, fn_1923);
      return;
    } finally {
      test_1919.softFailToHard();
    }
});
it("string escaping", function () {
    const test_1924 = new Test_799();
    try {
      function build_1925(name_1926) {
        const accumulator_1927 = new SqlBuilder();
        accumulator_1927.appendSafe("select * from hi where name = ");
        accumulator_1927.appendString(name_1926);
        return accumulator_1927.accumulated.toString();
      }
      function buildWrong_1928(name_1929) {
        return "select * from hi where name = '" + name_1929 + "'";
      }
      function fn_1930() {
        return "expected build(\"world\") == (select * from hi where name = 'world') not (select * from hi where name = 'world')";
      }
      test_1924.assert(true, fn_1930);
      const bobbyTables_1931 = "Robert'); drop table hi;--";
      function fn_1932() {
        return "expected build(bobbyTables) == (select * from hi where name = 'Robert''); drop table hi;--') not (select * from hi where name = 'Robert''); drop table hi;--')";
      }
      test_1924.assert(true, fn_1932);
      function fn_1933() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_1924.assert(true, fn_1933);
      return;
    } finally {
      test_1924.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_1934 = new Test_799();
    try {
      const accumulator_1935 = new SqlBuilder();
      accumulator_1935.appendSafe("v = ");
      accumulator_1935.appendString("");
      const actual_1936 = accumulator_1935.accumulated.toString();
      function fn_1937() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_1936 + ")";
      }
      test_1934.assert(actual_1936 === "v = ''", fn_1937);
      const accumulator_1938 = new SqlBuilder();
      accumulator_1938.appendSafe("v = ");
      accumulator_1938.appendString("a''b");
      const actual_1939 = accumulator_1938.accumulated.toString();
      function fn_1940() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_1939 + ")";
      }
      test_1934.assert(actual_1939 === "v = 'a''''b'", fn_1940);
      const accumulator_1941 = new SqlBuilder();
      accumulator_1941.appendSafe("v = ");
      accumulator_1941.appendString("Hello 世界");
      const actual_1942 = accumulator_1941.accumulated.toString();
      function fn_1943() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_1942 + ")";
      }
      test_1934.assert(actual_1942 === "v = 'Hello 世界'", fn_1943);
      const accumulator_1944 = new SqlBuilder();
      accumulator_1944.appendSafe("v = ");
      accumulator_1944.appendString("Line1\nLine2");
      const actual_1945 = accumulator_1944.accumulated.toString();
      function fn_1946() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_1945 + ")";
      }
      test_1934.assert(actual_1945 === "v = 'Line1\nLine2'", fn_1946);
      return;
    } finally {
      test_1934.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_1947 = new Test_799();
    try {
      const accumulator_1948 = new SqlBuilder();
      accumulator_1948.appendSafe("select ");
      accumulator_1948.appendInt32(42);
      accumulator_1948.appendSafe(", ");
      accumulator_1948.appendInt64(BigInt("43"));
      accumulator_1948.appendSafe(", ");
      accumulator_1948.appendFloat64(19.99);
      accumulator_1948.appendSafe(", ");
      accumulator_1948.appendBoolean(true);
      accumulator_1948.appendSafe(", ");
      accumulator_1948.appendBoolean(false);
      const actual_1949 = accumulator_1948.accumulated.toString();
      function fn_1950() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_1949 + ")";
      }
      test_1947.assert(actual_1949 === "select 42, 43, 19.99, TRUE, FALSE", fn_1950);
      let date_1951;
      try {
        date_1951 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
      } catch {
        date_1951 = panic_796();
      }
      const accumulator_1952 = new SqlBuilder();
      accumulator_1952.appendSafe("insert into t values (");
      accumulator_1952.appendDate(date_1951);
      accumulator_1952.appendSafe(")");
      const actual_1953 = accumulator_1952.accumulated.toString();
      function fn_1954() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_1953 + ")";
      }
      test_1947.assert(actual_1953 === "insert into t values ('2024-12-25')", fn_1954);
      return;
    } finally {
      test_1947.softFailToHard();
    }
});
it("lists", function () {
    const test_1955 = new Test_799();
    try {
      let t_1956;
      let t_1957;
      const accumulator_1958 = new SqlBuilder();
      accumulator_1958.appendSafe("v IN (");
      accumulator_1958.appendStringList(Object.freeze(["a", "b", "c'd"]));
      accumulator_1958.appendSafe(")");
      const actual_1959 = accumulator_1958.accumulated.toString();
      function fn_1960() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_1959 + ")";
      }
      test_1955.assert(actual_1959 === "v IN ('a', 'b', 'c''d')", fn_1960);
      const accumulator_1961 = new SqlBuilder();
      accumulator_1961.appendSafe("v IN (");
      accumulator_1961.appendInt32List(Object.freeze([1, 2, 3]));
      accumulator_1961.appendSafe(")");
      const actual_1962 = accumulator_1961.accumulated.toString();
      function fn_1963() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_1962 + ")";
      }
      test_1955.assert(actual_1962 === "v IN (1, 2, 3)", fn_1963);
      const accumulator_1964 = new SqlBuilder();
      accumulator_1964.appendSafe("v IN (");
      accumulator_1964.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      accumulator_1964.appendSafe(")");
      const actual_1965 = accumulator_1964.accumulated.toString();
      function fn_1966() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_1965 + ")";
      }
      test_1955.assert(actual_1965 === "v IN (1, 2)", fn_1966);
      const accumulator_1967 = new SqlBuilder();
      accumulator_1967.appendSafe("v IN (");
      accumulator_1967.appendFloat64List(Object.freeze([1.0, 2.0]));
      accumulator_1967.appendSafe(")");
      const actual_1968 = accumulator_1967.accumulated.toString();
      function fn_1969() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_1968 + ")";
      }
      test_1955.assert(actual_1968 === "v IN (1.0, 2.0)", fn_1969);
      const accumulator_1970 = new SqlBuilder();
      accumulator_1970.appendSafe("v IN (");
      accumulator_1970.appendBooleanList(Object.freeze([true, false]));
      accumulator_1970.appendSafe(")");
      const actual_1971 = accumulator_1970.accumulated.toString();
      function fn_1972() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_1971 + ")";
      }
      test_1955.assert(actual_1971 === "v IN (TRUE, FALSE)", fn_1972);
      try {
        t_1956 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
      } catch {
        t_1956 = panic_796();
      }
      try {
        t_1957 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
      } catch {
        t_1957 = panic_796();
      }
      const dates_1973 = Object.freeze([t_1956, t_1957]);
      const accumulator_1974 = new SqlBuilder();
      accumulator_1974.appendSafe("v IN (");
      accumulator_1974.appendDateList(dates_1973);
      accumulator_1974.appendSafe(")");
      const actual_1975 = accumulator_1974.accumulated.toString();
      function fn_1976() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_1975 + ")";
      }
      test_1955.assert(actual_1975 === "v IN ('2024-01-01', '2024-12-25')", fn_1976);
      return;
    } finally {
      test_1955.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_1977 = new Test_799();
    try {
      const nan_1978 = NaN;
      const accumulator_1979 = new SqlBuilder();
      accumulator_1979.appendSafe("v = ");
      accumulator_1979.appendFloat64(NaN);
      const actual_1980 = accumulator_1979.accumulated.toString();
      function fn_1981() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_1980 + ")";
      }
      test_1977.assert(actual_1980 === "v = NULL", fn_1981);
      return;
    } finally {
      test_1977.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_1982 = new Test_799();
    try {
      const inf_1983 = Infinity;
      const accumulator_1984 = new SqlBuilder();
      accumulator_1984.appendSafe("v = ");
      accumulator_1984.appendFloat64(Infinity);
      const actual_1985 = accumulator_1984.accumulated.toString();
      function fn_1986() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_1985 + ")";
      }
      test_1982.assert(actual_1985 === "v = NULL", fn_1986);
      return;
    } finally {
      test_1982.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_1987 = new Test_799();
    try {
      const ninf_1988 = -Infinity;
      const accumulator_1989 = new SqlBuilder();
      accumulator_1989.appendSafe("v = ");
      accumulator_1989.appendFloat64(-Infinity);
      const actual_1990 = accumulator_1989.accumulated.toString();
      function fn_1991() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_1990 + ")";
      }
      test_1987.assert(actual_1990 === "v = NULL", fn_1991);
      return;
    } finally {
      test_1987.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_1992 = new Test_799();
    try {
      const accumulator_1993 = new SqlBuilder();
      accumulator_1993.appendSafe("v = ");
      accumulator_1993.appendFloat64(3.14);
      const actual_1994 = accumulator_1993.accumulated.toString();
      function fn_1995() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_1994 + ")";
      }
      test_1992.assert(actual_1994 === "v = 3.14", fn_1995);
      const accumulator_1996 = new SqlBuilder();
      accumulator_1996.appendSafe("v = ");
      accumulator_1996.appendFloat64(0.0);
      const actual_1997 = accumulator_1996.accumulated.toString();
      function fn_1998() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_1997 + ")";
      }
      test_1992.assert(actual_1997 === "v = 0.0", fn_1998);
      const accumulator_1999 = new SqlBuilder();
      accumulator_1999.appendSafe("v = ");
      accumulator_1999.appendFloat64(-42.5);
      const actual_2000 = accumulator_1999.accumulated.toString();
      function fn_2001() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_2000 + ")";
      }
      test_1992.assert(actual_2000 === "v = -42.5", fn_2001);
      return;
    } finally {
      test_1992.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_2002 = new Test_799();
    try {
      let d_2003;
      try {
        d_2003 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
      } catch {
        d_2003 = panic_796();
      }
      const accumulator_2004 = new SqlBuilder();
      accumulator_2004.appendSafe("v = ");
      accumulator_2004.appendDate(d_2003);
      const actual_2005 = accumulator_2004.accumulated.toString();
      function fn_2006() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_2005 + ")";
      }
      test_2002.assert(actual_2005 === "v = '2024-06-15'", fn_2006);
      return;
    } finally {
      test_2002.softFailToHard();
    }
});
it("nesting", function () {
    const test_2007 = new Test_799();
    try {
      const name_2008 = "Someone";
      const accumulator_2009 = new SqlBuilder();
      accumulator_2009.appendSafe("where p.last_name = ");
      accumulator_2009.appendString("Someone");
      const condition_2010 = accumulator_2009.accumulated;
      const accumulator_2011 = new SqlBuilder();
      accumulator_2011.appendSafe("select p.id from person p ");
      accumulator_2011.appendFragment(condition_2010);
      const actual_2012 = accumulator_2011.accumulated.toString();
      function fn_2013() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2012 + ")";
      }
      test_2007.assert(actual_2012 === "select p.id from person p where p.last_name = 'Someone'", fn_2013);
      const accumulator_2014 = new SqlBuilder();
      accumulator_2014.appendSafe("select p.id from person p ");
      accumulator_2014.appendPart(condition_2010.toSource());
      const actual_2015 = accumulator_2014.accumulated.toString();
      function fn_2016() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2015 + ")";
      }
      test_2007.assert(actual_2015 === "select p.id from person p where p.last_name = 'Someone'", fn_2016);
      const parts_2017 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      const accumulator_2018 = new SqlBuilder();
      accumulator_2018.appendSafe("select ");
      accumulator_2018.appendPartList(parts_2017);
      const actual_2019 = accumulator_2018.accumulated.toString();
      function fn_2020() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_2019 + ")";
      }
      test_2007.assert(actual_2019 === "select 'a''b', 3", fn_2020);
      return;
    } finally {
      test_2007.softFailToHard();
    }
});
it("SqlInt32 negative and zero values", function () {
    const test_2021 = new Test_799();
    try {
      const accumulator_2022 = new SqlBuilder();
      accumulator_2022.appendSafe("v = ");
      accumulator_2022.appendInt32(-42);
      const t_2023 = accumulator_2022.accumulated;
      function fn_2024() {
        return "negative int";
      }
      test_2021.assert(t_2023.toString() === "v = -42", fn_2024);
      const accumulator_2025 = new SqlBuilder();
      accumulator_2025.appendSafe("v = ");
      accumulator_2025.appendInt32(0);
      const t_2026 = accumulator_2025.accumulated;
      function fn_2027() {
        return "zero int";
      }
      test_2021.assert(t_2026.toString() === "v = 0", fn_2027);
      return;
    } finally {
      test_2021.softFailToHard();
    }
});
it("SqlInt64 negative value", function () {
    const test_2028 = new Test_799();
    try {
      const accumulator_2029 = new SqlBuilder();
      accumulator_2029.appendSafe("v = ");
      accumulator_2029.appendInt64(BigInt("-99"));
      const t_2030 = accumulator_2029.accumulated;
      function fn_2031() {
        return "negative int64";
      }
      test_2028.assert(t_2030.toString() === "v = -99", fn_2031);
      return;
    } finally {
      test_2028.softFailToHard();
    }
});
it("single element list rendering", function () {
    const test_2032 = new Test_799();
    try {
      const accumulator_2033 = new SqlBuilder();
      accumulator_2033.appendSafe("v IN (");
      accumulator_2033.appendInt32List(Object.freeze([42]));
      accumulator_2033.appendSafe(")");
      const t_2034 = accumulator_2033.accumulated;
      function fn_2035() {
        return "single int";
      }
      test_2032.assert(t_2034.toString() === "v IN (42)", fn_2035);
      const accumulator_2036 = new SqlBuilder();
      accumulator_2036.appendSafe("v IN (");
      accumulator_2036.appendStringList(Object.freeze(["only"]));
      accumulator_2036.appendSafe(")");
      const t_2037 = accumulator_2036.accumulated;
      function fn_2038() {
        return "single string";
      }
      test_2032.assert(t_2037.toString() === "v IN ('only')", fn_2038);
      return;
    } finally {
      test_2032.softFailToHard();
    }
});
it("SqlDefault renders DEFAULT keyword", function () {
    const test_2039 = new Test_799();
    try {
      const b_2040 = new SqlBuilder();
      b_2040.appendSafe("v = ");
      b_2040.appendPart(new SqlDefault());
      function fn_2041() {
        return "default keyword";
      }
      test_2039.assert(b_2040.accumulated.toString() === "v = DEFAULT", fn_2041);
      return;
    } finally {
      test_2039.softFailToHard();
    }
});
it("SqlString with backslash", function () {
    const test_2042 = new Test_799();
    try {
      const accumulator_2043 = new SqlBuilder();
      accumulator_2043.appendSafe("v = ");
      accumulator_2043.appendString("a\\b");
      const t_2044 = accumulator_2043.accumulated;
      function fn_2045() {
        return "backslash passthrough";
      }
      test_2042.assert(t_2044.toString() === "v = 'a\\b'", fn_2045);
      return;
    } finally {
      test_2042.softFailToHard();
    }
});
