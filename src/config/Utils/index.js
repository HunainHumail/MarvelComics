import { Toast } from "native-base";
import Colors from "../Colors";
import Fonts from "../Fonts";
import moment from "moment";
import md5 from "md5";

export function showToast(message, type = "error", duration = 3000) {
    Toast.show({
      text: message,
      position: "bottom",
      type,
      textStyle: { fontFamily: Fonts["Poppins-Regular"], textAlign: "center" },
      duration: duration,
      style: {
        zIndex: 3000,
        backgroundColor: type != "error" ? Colors.Primary : Colors.Red,
      },
      textStyle: {
        color: Colors.White,
        textAlign: "center",
        fontFamily: Fonts["Poppins-Bold-Italic"],
      },
    });
  }


  export const PRIVATE_KEY = "4e7b6885fbb0e9d91aec0d9d60bbd6af";
  export const PUBLIC_KEY = "c5ec22114831d4a03079737c05140b314216d7a9";
  export const TIME_STAMP = moment().unix();
  export const MD5_HASH = md5(TIME_STAMP + PUBLIC_KEY + PRIVATE_KEY);