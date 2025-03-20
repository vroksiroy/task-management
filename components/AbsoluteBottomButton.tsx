import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import { Theme } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export const AbsoluteBottomButton = ({
  title,
  icon,
  size,
  onPress,
}: {
  title?: string;
  icon?: string;
  size?: number;
  onPress: () => void;
}) => {
  return (
    <ThemedView style={styles.addEventBox}>
      <TouchableOpacity onPress={onPress}>
        <ThemedView style={{ backgroundColor: 'transparent' }}>
          {icon && (
            <Ionicons
              name={icon as keyof typeof Ionicons.glyphMap}
              size={size}
              color={Theme.brand.white}
            />
          )}
          {title && (
            <ThemedText type="default" style={styles.addEventBoxText}>
              {title}
            </ThemedText>
          )}
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  addEventBox: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 12,
    borderRadius: 12,
    backgroundColor: Theme.brand.purple[500],
  },
  addEventBoxText: {
    color: Theme.brand.white,
    fontWeight: "bold",
  },
});
