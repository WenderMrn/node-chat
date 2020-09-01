class StringUtils {
  static getInitialsText(name) {
    return name
      ? name
          .toUpperCase()
          .split(" ")
          .map((s) => s.charAt(0))
          .join("")
      : "";
  }
}

export default StringUtils;
