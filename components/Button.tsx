import React from 'react';
import { Text, StyleSheet, Pressable, GestureResponderEvent } from 'react-native';

type Props = {
 title: string;
 onPress: (event: GestureResponderEvent) => void;
 style: Record<string, any>;
}
export default function Button(props: Props) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={[styles.button, props.style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
