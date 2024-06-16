// add-reminder.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import asyncStorage from "@/utils/AsyncStorage";
import { ReminderType } from "@/constants/types";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddReminderScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const addReminder = async () => {
    const reminders = (await asyncStorage.getItem("reminders")) as ReminderType[] || [];
    const newReminder: ReminderType = {
      id: reminders.length + 1,
      title,
      notes,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };
    await asyncStorage.setItem("reminders", [...reminders, newReminder]);
    router.push("/");
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
    setShowEndDatePicker(false); // Close end date picker if open
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
    setShowStartDatePicker(false); // Close start date picker if open
  };

  const handleStartDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={showStartDatePickerModal} style={styles.dateButton}>
        <Text>Select Start Date</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      <TouchableOpacity onPress={showEndDatePickerModal} style={styles.dateButton}>
        <Text>Select End Date</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}
      <Button title="Add Reminder" onPress={addReminder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  dateButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
  },
});

export default AddReminderScreen;
