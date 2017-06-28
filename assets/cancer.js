/* eslint-disable */
/**
 *  防癌险计算
 */
define(function(require, exports, module) {
  module.exports = {
    cancerList: {
      "3150": {
        rule: {
          M_A1_1_0: "2.37",
          M_A1_1_1: "2.09",
          M_A1_1_2: "1.85",
          M_A1_1_3: "1.63",
          M_A1_1_4: "1.44",
          M_A1_1_5: "1.29",
          M_A1_1_6: "1.16",
          M_A1_1_7: "1.07",
          M_A1_1_8: "1",
          M_A1_1_9: "0.96",
          M_A1_1_10: "0.96",
          M_A1_1_11: "0.96",
          M_A1_1_12: "0.99",
          M_A1_1_13: "1.02",
          M_A1_1_14: "1.07",
          M_A1_1_15: "1.11",
          M_A1_1_16: "1.15",
          M_A1_1_17: "1.19",
          M_A1_1_18: "1.24",
          M_A1_1_19: "1.29",
          M_A1_1_20: "1.34",
          M_A1_1_21: "1.4",
          M_A1_1_22: "1.47",
          M_A1_1_23: "1.56",
          M_A1_1_24: "1.67",
          M_A1_1_25: "1.8",
          M_A1_1_26: "1.95",
          M_A1_1_27: "2.14",
          M_A1_1_28: "2.34",
          M_A1_1_29: "2.56",
          M_A1_1_30: "2.81",
          M_A1_1_31: "3.07",
          M_A1_1_32: "3.37",
          M_A1_1_33: "3.68",
          M_A1_1_34: "4.04",
          M_A1_1_35: "4.46",
          M_A1_1_36: "4.93",
          M_A1_1_37: "5.48",
          M_A1_1_38: "6.11",
          M_A1_1_39: "6.82",
          M_A1_1_40: "7.66",
          M_A1_1_41: "8.66",
          M_A1_1_42: "9.81",
          M_A1_1_43: "11.15",
          M_A1_1_44: "12.67",
          M_A1_1_45: "14.37",
          M_A1_1_46: "16.26",
          M_A1_1_47: "18.33",
          M_A1_1_48: "20.58",
          M_A1_1_49: "23",
          M_A1_1_50: "25.56",
          M_A1_1_51: "28.27",
          M_A1_1_52: "31.11",
          M_A1_1_53: "34.09",
          M_A1_1_54: "37.22",
          M_A1_1_55: "40.5",
          M_A1_1_56: "43.96",
          M_A1_1_57: "47.6",
          M_A1_1_58: "51.42",
          M_A1_1_59: "55.36",
          M_A1_1_60: "59.42",
          M_A1_1_61: "63.53",
          M_A1_1_62: "67.72",
          M_A1_1_63: "72.02",
          M_A1_1_64: "76.5",
          M_A1_1_65: "81.28",
          M_A1_1_66: "95.88",
          M_A1_1_67: "103.19",
          M_A1_1_68: "110.3",
          M_A1_1_69: "118.07",
          M_A1_1_70: "127.45",
          M_A1_1_71: "136.19",
          M_A1_1_72: "145.4",
          M_A1_1_73: "153.58",
          M_A1_1_74: "161.88",
          M_A1_1_75: "170.22",
          M_A1_1_76: "178.58",
          M_A1_1_77: "186.9",
          M_A1_1_78: "193.77",
          M_A1_1_79: "200.43",
          M_A1_1_80: "207.44",
          M_A1_1_81: "214.29",
          M_A1_1_82: "221",
          M_A1_1_83: "226.6",
          M_A1_1_84: "232.13",
          M_A1_1_85: "237.7",
          F_A1_1_0: "2.56",
          F_A1_1_1: "2.16",
          F_A1_1_2: "1.84",
          F_A1_1_3: "1.58",
          F_A1_1_4: "1.37",
          F_A1_1_5: "1.21",
          F_A1_1_6: "1.08",
          F_A1_1_7: "1",
          F_A1_1_8: "0.95",
          F_A1_1_9: "0.92",
          F_A1_1_10: "0.93",
          F_A1_1_11: "0.96",
          F_A1_1_12: "0.99",
          F_A1_1_13: "1.03",
          F_A1_1_14: "1.08",
          F_A1_1_15: "1.14",
          F_A1_1_16: "1.22",
          F_A1_1_17: "1.3",
          F_A1_1_18: "1.41",
          F_A1_1_19: "1.53",
          F_A1_1_20: "1.69",
          F_A1_1_21: "1.86",
          F_A1_1_22: "2.06",
          F_A1_1_23: "2.3",
          F_A1_1_24: "2.57",
          F_A1_1_25: "2.89",
          F_A1_1_26: "3.24",
          F_A1_1_27: "3.65",
          F_A1_1_28: "4.11",
          F_A1_1_29: "4.61",
          F_A1_1_30: "5.16",
          F_A1_1_31: "5.75",
          F_A1_1_32: "6.37",
          F_A1_1_33: "7.03",
          F_A1_1_34: "7.73",
          F_A1_1_35: "8.49",
          F_A1_1_36: "9.32",
          F_A1_1_37: "10.24",
          F_A1_1_38: "11.26",
          F_A1_1_39: "12.36",
          F_A1_1_40: "13.55",
          F_A1_1_41: "14.81",
          F_A1_1_42: "16.12",
          F_A1_1_43: "17.45",
          F_A1_1_44: "18.81",
          F_A1_1_45: "20.07",
          F_A1_1_46: "21.27",
          F_A1_1_47: "22.43",
          F_A1_1_48: "23.56",
          F_A1_1_49: "24.67",
          F_A1_1_50: "25.79",
          F_A1_1_51: "26.93",
          F_A1_1_52: "28.09",
          F_A1_1_53: "29.27",
          F_A1_1_54: "30.48",
          F_A1_1_55: "31.73",
          F_A1_1_56: "33.04",
          F_A1_1_57: "34.44",
          F_A1_1_58: "35.96",
          F_A1_1_59: "37.66",
          F_A1_1_60: "39.58",
          F_A1_1_61: "41.76",
          F_A1_1_62: "44.2",
          F_A1_1_63: "46.94",
          F_A1_1_64: "49.98",
          F_A1_1_65: "53.31",
          F_A1_1_66: "62.11",
          F_A1_1_67: "66.2",
          F_A1_1_68: "70.55",
          F_A1_1_69: "75.09",
          F_A1_1_70: "79.39",
          F_A1_1_71: "84.1",
          F_A1_1_72: "89.02",
          F_A1_1_73: "93.21",
          F_A1_1_74: "97.44",
          F_A1_1_75: "101.7",
          F_A1_1_76: "105.96",
          F_A1_1_77: "110.21",
          F_A1_1_78: "113.22",
          F_A1_1_79: "116.19",
          F_A1_1_80: "119.5",
          F_A1_1_81: "122.83",
          F_A1_1_82: "126.24",
          F_A1_1_83: "129.38",
          F_A1_1_84: "132.66",
          F_A1_1_85: "136.12"
        },
        min: 0
      },
      "3152": {
        rule: {
          M_A1_1_0: "1.67",
          M_A1_1_1: "1.47",
          M_A1_1_2: "1.3",
          M_A1_1_3: "1.15",
          M_A1_1_4: "1.02",
          M_A1_1_5: "0.91",
          M_A1_1_6: "0.82",
          M_A1_1_7: "0.75",
          M_A1_1_8: "0.7",
          M_A1_1_9: "0.68",
          M_A1_1_10: "0.67",
          M_A1_1_11: "0.68",
          M_A1_1_12: "0.7",
          M_A1_1_13: "0.72",
          M_A1_1_14: "0.75",
          M_A1_1_15: "0.78",
          M_A1_1_16: "0.81",
          M_A1_1_17: "0.84",
          M_A1_1_18: "0.87",
          M_A1_1_19: "0.91",
          M_A1_1_20: "0.94",
          M_A1_1_21: "0.99",
          M_A1_1_22: "1.03",
          M_A1_1_23: "1.1",
          M_A1_1_24: "1.18",
          M_A1_1_25: "1.27",
          M_A1_1_26: "1.38",
          M_A1_1_27: "1.51",
          M_A1_1_28: "1.65",
          M_A1_1_29: "1.81",
          M_A1_1_30: "1.98",
          M_A1_1_31: "2.17",
          M_A1_1_32: "2.38",
          M_A1_1_33: "2.6",
          M_A1_1_34: "2.85",
          M_A1_1_35: "3.15",
          M_A1_1_36: "3.48",
          M_A1_1_37: "3.87",
          M_A1_1_38: "4.31",
          M_A1_1_39: "4.81",
          M_A1_1_40: "5.41",
          M_A1_1_41: "6.11",
          M_A1_1_42: "6.93",
          M_A1_1_43: "7.87",
          M_A1_1_44: "8.94",
          M_A1_1_45: "10.14",
          M_A1_1_46: "11.47",
          M_A1_1_47: "12.94",
          M_A1_1_48: "14.53",
          M_A1_1_49: "16.23",
          M_A1_1_50: "18.04",
          M_A1_1_51: "19.96",
          M_A1_1_52: "21.96",
          M_A1_1_53: "24.06",
          M_A1_1_54: "26.27",
          M_A1_1_55: "28.59",
          M_A1_1_56: "31.03",
          M_A1_1_57: "33.6",
          M_A1_1_58: "36.3",
          M_A1_1_59: "39.08",
          M_A1_1_60: "41.94",
          M_A1_1_61: "44.85",
          M_A1_1_62: "47.8",
          M_A1_1_63: "50.83",
          M_A1_1_64: "54",
          M_A1_1_65: "57.37",
          M_A1_1_66: "67.68",
          M_A1_1_67: "72.84",
          M_A1_1_68: "77.86",
          M_A1_1_69: "83.34",
          M_A1_1_70: "89.97",
          M_A1_1_71: "96.13",
          M_A1_1_72: "102.64",
          M_A1_1_73: "108.41",
          M_A1_1_74: "114.27",
          M_A1_1_75: "120.16",
          M_A1_1_76: "126.06",
          M_A1_1_77: "131.93",
          M_A1_1_78: "136.78",
          M_A1_1_79: "141.48",
          M_A1_1_80: "146.43",
          M_A1_1_81: "151.26",
          M_A1_1_82: "156",
          M_A1_1_83: "159.95",
          M_A1_1_84: "163.86",
          M_A1_1_85: "167.79",
          F_A1_1_0: "1.81",
          F_A1_1_1: "1.53",
          F_A1_1_2: "1.3",
          F_A1_1_3: "1.12",
          F_A1_1_4: "0.97",
          F_A1_1_5: "0.85",
          F_A1_1_6: "0.76",
          F_A1_1_7: "0.7",
          F_A1_1_8: "0.67",
          F_A1_1_9: "0.65",
          F_A1_1_10: "0.66",
          F_A1_1_11: "0.67",
          F_A1_1_12: "0.7",
          F_A1_1_13: "0.73",
          F_A1_1_14: "0.76",
          F_A1_1_15: "0.81",
          F_A1_1_16: "0.86",
          F_A1_1_17: "0.92",
          F_A1_1_18: "0.99",
          F_A1_1_19: "1.08",
          F_A1_1_20: "1.19",
          F_A1_1_21: "1.31",
          F_A1_1_22: "1.45",
          F_A1_1_23: "1.62",
          F_A1_1_24: "1.81",
          F_A1_1_25: "2.04",
          F_A1_1_26: "2.29",
          F_A1_1_27: "2.58",
          F_A1_1_28: "2.9",
          F_A1_1_29: "3.25",
          F_A1_1_30: "3.64",
          F_A1_1_31: "4.06",
          F_A1_1_32: "4.5",
          F_A1_1_33: "4.96",
          F_A1_1_34: "5.46",
          F_A1_1_35: "5.99",
          F_A1_1_36: "6.58",
          F_A1_1_37: "7.23",
          F_A1_1_38: "7.95",
          F_A1_1_39: "8.73",
          F_A1_1_40: "9.57",
          F_A1_1_41: "10.45",
          F_A1_1_42: "11.38",
          F_A1_1_43: "12.32",
          F_A1_1_44: "13.27",
          F_A1_1_45: "14.17",
          F_A1_1_46: "15.01",
          F_A1_1_47: "15.83",
          F_A1_1_48: "16.63",
          F_A1_1_49: "17.41",
          F_A1_1_50: "18.21",
          F_A1_1_51: "19.01",
          F_A1_1_52: "19.83",
          F_A1_1_53: "20.66",
          F_A1_1_54: "21.51",
          F_A1_1_55: "22.39",
          F_A1_1_56: "23.32",
          F_A1_1_57: "24.31",
          F_A1_1_58: "25.38",
          F_A1_1_59: "26.58",
          F_A1_1_60: "27.94",
          F_A1_1_61: "29.47",
          F_A1_1_62: "31.2",
          F_A1_1_63: "33.13",
          F_A1_1_64: "35.28",
          F_A1_1_65: "37.63",
          F_A1_1_66: "43.84",
          F_A1_1_67: "46.73",
          F_A1_1_68: "49.8",
          F_A1_1_69: "53.01",
          F_A1_1_70: "56.04",
          F_A1_1_71: "59.37",
          F_A1_1_72: "62.83",
          F_A1_1_73: "65.79",
          F_A1_1_74: "68.78",
          F_A1_1_75: "71.79",
          F_A1_1_76: "74.8",
          F_A1_1_77: "77.8",
          F_A1_1_78: "79.92",
          F_A1_1_79: "82.02",
          F_A1_1_80: "84.35",
          F_A1_1_81: "86.7",
          F_A1_1_82: "89.11",
          F_A1_1_83: "91.33",
          F_A1_1_84: "93.64",
          F_A1_1_85: "96.09"
        },
        min: 0
      }
    }
  };
});