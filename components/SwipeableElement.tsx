import { ComponentProps, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { Theme } from "@/constants/Colors";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function SwipeableElement({
  leftActionText = "View",
  rightActionText = "Clear",
  isLeftIcon = false,
  duoLeftActions,
  onLeftAction,
  onRightAction,
  processingItem,
  shadow = false,
  stylesProps,
  swipeableContainerStyle,
  children,
  leftActionStyle,
  onPressMessage = () => {},
}: {
  leftActionText?: string;
  rightActionText?: string | ComponentProps<typeof Ionicons>["name"];
  isLeftIcon?: boolean;
  duoLeftActions?: Record<string, Record<string, string>>;
  onLeftAction?: () => void;
  onRightAction?: () => void;
  processingItem?: boolean;
  shadow?: boolean;
  stylesProps?: object;
  swipeableContainerStyle?: object;
  children: React.ReactNode;
  leftActionStyle?: object;
  onPressMessage?: () => void;
}) {
  const swipeableRef = useRef<any>(null);

  const handleLeftAction = (duoActionPressed: boolean = false) => {
    if (duoLeftActions && !duoActionPressed) return;

    if (onLeftAction) {
      onLeftAction();
    }

    if (typeof processingItem !== "undefined") return;

    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const handleRightAction = () => {
    if (onRightAction) {
      onRightAction();
    }
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return duoLeftActions ? (
      <ThemedView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => handleLeftAction()}
          style={[
            {
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Theme.brand.purple[300],
              color: Theme.brand.white,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
            stylesProps,
          ]}
        >
          <Animated.View style={{ opacity }}>
            <ThemedText
              style={styles.swipeActionText}
              onPress={() => handleLeftAction(true)}
            >
              {duoLeftActions.texts.top}
            </ThemedText>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLeftAction()}
          style={[
            {
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Theme.brand.purple[900],
              color: Theme.brand.white,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
            ,
            stylesProps,
          ]}
        >
          <Animated.View style={{ opacity }}>
            <ThemedText
              style={styles.swipeActionText}
              onPress={() => handleLeftAction(true)}
            >
              {duoLeftActions.texts.bottom}
            </ThemedText>
          </Animated.View>
        </TouchableOpacity>
      </ThemedView>
    ) : (
      <Pressable
        onPress={() => handleLeftAction()}
        style={[styles.swipeAction, stylesProps]}
      >
        <Animated.View style={{ opacity }}>
          <ThemedText style={[styles.swipeActionText, leftActionStyle]}>
            {leftActionText}
          </ThemedText>
        </Animated.View>
      </Pressable>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <Pressable
        onPress={handleRightAction}
        style={[styles.swipeAction, styles.swipeActionRight, stylesProps]}
      >
        <Animated.View
          style={{ opacity, alignItems: "center", justifyContent: "center" }}
        >
          {isLeftIcon ? (
            <Ionicons
              name={rightActionText as ComponentProps<typeof Ionicons>["name"]}
              color={Theme.brand.red}
              size={28}
              style={{ paddingHorizontal: 30 }}
            />
          ) : (
            <ThemedText style={styles.swipeActionText}>
              {rightActionText}
            </ThemedText>
          )}
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={onLeftAction ? renderLeftActions : () => null}
      renderRightActions={onRightAction ? renderRightActions : () => null}
      onSwipeableOpen={(direction) => {
        if (direction === "left") {
          handleLeftAction();
        } else {
          handleRightAction();
        }
      }}
      containerStyle={[
        shadow && styles.shadow,
        swipeableContainerStyle && swipeableContainerStyle,
      ]}
    >
      {onPressMessage ? (
        <Pressable onPress={onPressMessage}>{children}</Pressable>
      ) : (
        children
      )}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  swipeAction: {
    backgroundColor: Theme.brand.purple[900],
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    color: Theme.brand.white,
    borderRadius: 16,
  },
  swipeActionRight: {
    justifyContent: "flex-end",
  },
  swipeActionText: {
    color: Theme.brand.white,
    paddingHorizontal: 16,
    textAlign:'center'
  },
  shadow: {
    overflow: "visible",
    shadowColor: Theme.brand.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
  },
});
