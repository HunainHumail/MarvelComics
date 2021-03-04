import { Toast } from "native-base";
import Colors from "../Colors";
import Fonts from "../Fonts";
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