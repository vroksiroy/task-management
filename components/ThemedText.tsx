import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
  | "default"
  | "defaultBold"
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const textElement = (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "defaultBold" ? styles.defaultBold : undefined,
        style,
      ]}
      {...rest}
    />
  );

  return textElement;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'outfit'
  },
  defaultBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'outfit-bold'
  },
});
