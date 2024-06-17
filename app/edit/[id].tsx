import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import asyncStorage from "@/utils/AsyncStorage";
import { ReminderType } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";

const EditReminderScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  useEffect(() => {
    const getReminder = async () => {
      if (!id) return; // Handle case where id is undefined

      const reminders = (await asyncStorage.getItem("reminders")) as ReminderType[];
      const reminder = reminders.find((r) => r.id === parseFloat(id));
      if (reminder) {
        setTitle(reminder.title ?? ""); // Default to empty string if undefined
        setNotes(reminder.notes ?? ""); // Default to empty string if undefined
        setStartDate(reminder.startDate ? new Date(reminder.startDate) : null); // Default to null if undefined
        setEndDate(reminder.endDate ? new Date(reminder.endDate) : null); // Default to null if undefined
      }
    };
    getReminder();
  }, [id]);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleConfirmStartDate = (date: Date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleConfirmEndDate = (date: Date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const handleUpdateReminder = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Title is required to update the reminder.");
      return;
    }

    if (!startDate || !endDate) {
      Alert.alert("Validation Error", "Both start and end dates are required.");
      return;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to start of the day for comparison

    if (startDate < currentDate) {
      Alert.alert("Validation Error", "Start date cannot be in the past.");
      return;
    }

    if (endDate <= startDate) {
      Alert.alert("Validation Error", "End date must be greater than start date.");
      return;
    }

    const updatedReminder: ReminderType = {
      id: parseFloat(id!), // Use non-null assertion since we check if id is defined
      title,
      notes,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    const reminders = (await asyncStorage.getItem("reminders")) as ReminderType[];
    const updatedReminders = reminders.map((r) =>
      r.id === parseFloat(id!) ? updatedReminder : r // Use non-null assertion
    );

    await asyncStorage.setItem("reminders", updatedReminders);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />
      <TouchableOpacity onPress={showStartDatePicker} style={styles.datePickerButton}>
        <Text style={styles.datePickerButtonText}>
          {startDate ? startDate.toDateString() : "Choose Start Date"}
        </Text>
        <Ionicons name="calendar" size={24} color="black" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={hideStartDatePicker}
      />
      <TouchableOpacity onPress={showEndDatePicker} style={styles.datePickerButton}>
        <Text style={styles.datePickerButtonText}>
          {endDate ? endDate.toDateString() : "Choose End Date"}
        </Text>
        <Ionicons name="calendar" size={24} color="black" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={hideEndDatePicker}
      />
      <Button title="Update Reminder" onPress={handleUpdateReminder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  input: {
    height: 50,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  datePickerButtonText: {
    fontSize: 16,
  },
});

export default EditReminderScreen;
