import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  id: number;
  title: string;
  notes?: string;
  startDate?: string;
  endDate?: string;
  onDelete: (id: number) => void;
};

const Reminder = ({ id, title, notes, startDate, endDate, onDelete }: Props) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {notes ? <Text style={styles.notes}>{notes}</Text> : null}
        {startDate ? <Text style={styles.date}>Start: {new Date(startDate).toLocaleDateString()}</Text> : null}
        {endDate ? <Text style={styles.date}>End: {new Date(endDate).toLocaleDateString()}</Text> : null}
      </View>
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/edit/[id]",
              params: { id: id },
            });
          }}
          style={styles.iconContainer}
        >
          <Ionicons name="pencil-sharp" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={styles.iconContainer}
        >
          <Ionicons name="trash-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#007bff",
    marginVertical: 5,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  notes: {
    fontSize: 14,
    color: "#fff",
  },
  date: {
    fontSize: 12,
    color: "#fff",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    padding: 5,
  },
});

export default Reminder;
