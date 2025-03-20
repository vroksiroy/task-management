import type { ComponentProps } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  type StyleProp,
  type ViewStyle,
  type TouchableOpacityProps,
  type TextStyle,
} from "react-native";

import { Theme } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ContentView = ({
  hasIcon,
  icon,
  iconSize,
  customTextStyles,
  title,
}: {
  hasIcon?: boolean;
  title?: string;
  iconSize?: number;
  icon?: ComponentProps<typeof Ionicons>["name"];
  customTextStyles?: StyleProp<TextStyle>;
}) => {
  return hasIcon ? (
    <Ionicons name={icon} size={iconSize} color={Theme.brand.white} />
  ) : (
    <Text style={[styles.text, customTextStyles]}>{title}</Text>
  );
};

export function Button({
  title = "",
  isDisable,
  loading,
  fullWidth = false,
  icon,
  hasIcon = false,
  iconSize = 28,
  customOpacityStyles,
  customTextStyles,
  onPress,
  indicatorStyle = {},
  ...props
}: {
  title?: string;
  isDisable?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconSize?: number;
  icon?: ComponentProps<typeof Ionicons>["name"];
  hasIcon?: boolean;
  customOpacityStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
  onPress: () => void;
  indicatorStyle?: StyleProp<ViewStyle>;
} & TouchableOpacityProps) {
  const handleButtonPress = () => {
    onPress();
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableOpacity
      disabled={isDisable || loading}
      onPress={handleButtonPress}
      style={[
        styles.container,
        fullWidth && { flex: 1 },
        customOpacityStyles,
        { opacity: isDisable ? 0.6 : 1 },
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={Theme.brand.white}
          style={[{ height: styles.text.lineHeight }, indicatorStyle]}
        />
      ) : (
        <ContentView
          title={title}
          iconSize={iconSize}
          customTextStyles={customTextStyles}
          hasIcon={hasIcon}
          icon={icon}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.brand.green,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: Theme.brand.white,
    lineHeight: 25,
    includeFontPadding: false,
  },
});
