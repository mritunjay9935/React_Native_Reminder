// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
// import asyncStorage from '@/utils/AsyncStorage';
// import { useRouter } from 'expo-router';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { ReminderType } from '@/constants/types';

// const AddReminder = () => {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [notes, setNotes] = useState('');
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
//   const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

//   const handleAddReminder = async () => {
//     if (!title.trim()) {
//       Alert.alert('Validation Error', 'You must enter a title to add a reminder.');
//       return;
//     }

//     if (startDate && new Date(startDate) < new Date()) {
//       Alert.alert('Validation Error', 'Start date must not be in the past.');
//       return;
//     }

//     if (endDate && startDate && new Date(endDate) <= new Date(startDate)) {
//       Alert.alert('Validation Error', 'End date must be greater than start date.');
//       return;
//     }

//     const newReminder: ReminderType = {
//       id: Math.floor(Math.random() * 1000),
//       title,
//       notes,
//       startDate: startDate || '',
//       endDate: endDate || '',
//     };

//     const existingReminders = (await asyncStorage.getItem('reminders')) as ReminderType[];
//     const updatedReminders = [...(existingReminders || []), newReminder];

//     await asyncStorage.setItem('reminders', updatedReminders);
//     router.push('/');
//   };

//   const handleConfirmStartDate = (date: Date) => {
//     if (date < new Date()) {
//       Alert.alert('Validation Error', 'Start date must not be in the past.');
//     } else {
//       setStartDate(date.toISOString());
//     }
//     setStartDatePickerVisibility(false);
//   };

//   const handleConfirmEndDate = (date: Date) => {
//     if (date <= new Date(startDate)) {
//       Alert.alert('Validation Error', 'End date must be greater than start date.');
//     } else {
//       setEndDate(date.toISOString());
//     }
//     setEndDatePickerVisibility(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Title"
//         value={title}
//         onChangeText={(text) => setTitle(text)}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Notes"
//         value={notes}
//         onChangeText={(text) => setNotes(text)}
//         style={styles.input}
//       />
//       <Button title="Choose Start Date" onPress={() => setStartDatePickerVisibility(true)} />
//       <Text>{startDate ? new Date(startDate).toLocaleString() : ''}</Text>
//       <Button title="Choose End Date" onPress={() => setEndDatePickerVisibility(true)} />
//       <Text>{endDate ? new Date(endDate).toLocaleString() : ''}</Text>
//       <Button title="Add Reminder" onPress={handleAddReminder} />

//       <DateTimePickerModal
//         isVisible={isStartDatePickerVisible}
//         mode="datetime"
//         onConfirm={handleConfirmStartDate}
//         onCancel={() => setStartDatePickerVisibility(false)}
//       />
//       <DateTimePickerModal
//         isVisible={isEndDatePickerVisible}
//         mode="datetime"
//         onConfirm={handleConfirmEndDate}
//         onCancel={() => setEndDatePickerVisibility(false)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 10,
//     marginBottom: 10,
//     width: '100%',
//   },
// });

// export default AddReminder;



// import React, { useState } from "react";
// import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { useRouter } from "expo-router";
// import asyncStorage from "@/utils/AsyncStorage";
// import { ReminderType } from "@/constants/types";
// import { Ionicons } from "@expo/vector-icons";

// const AddReminderScreen = () => {
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [notes, setNotes] = useState("");
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
//   const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

//   const showStartDatePicker = () => {
//     setStartDatePickerVisibility(true);
//   };

//   const hideStartDatePicker = () => {
//     setStartDatePickerVisibility(false);
//   };

//   const handleConfirmStartDate = (date: Date) => {
//     setStartDate(date);
//     hideStartDatePicker();
//   };

//   const showEndDatePicker = () => {
//     setEndDatePickerVisibility(true);
//   };

//   const hideEndDatePicker = () => {
//     setEndDatePickerVisibility(false);
//   };

//   const handleConfirmEndDate = (date: Date) => {
//     setEndDate(date);
//     hideEndDatePicker();
//   };

//   const handleAddReminder = async () => {
//     if (!title.trim()) {
//       Alert.alert("Validation Error", "Title is required to add a reminder.");
//       return;
//     }

//     if (!startDate || !endDate) {
//       Alert.alert("Validation Error", "Both start and end dates are required.");
//       return;
//     }

//     if (endDate < startDate) {
//       Alert.alert("Validation Error", "End date must be greater than start date.");
//       return;
//     }

//     const newReminder: ReminderType = {
//       id: Math.random(), // You should use a more robust way of generating unique IDs
//       title,
//       notes,
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//     };

//     const reminders = (await asyncStorage.getItem("reminders")) as ReminderType[];
//     const updatedReminders = reminders ? [...reminders, newReminder] : [newReminder];

//     await asyncStorage.setItem("reminders", updatedReminders);
//     router.push("/");
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Notes"
//         value={notes}
//         onChangeText={setNotes}
//       />
//       <TouchableOpacity onPress={showStartDatePicker} style={styles.datePickerButton}>
//         <Text style={styles.datePickerButtonText}>
//           {startDate ? startDate.toDateString() : "Choose Start Date"}
//         </Text>
//         <Ionicons name="calendar" size={24} color="black" />
//       </TouchableOpacity>
//       <DateTimePickerModal
//         isVisible={isStartDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirmStartDate}
//         onCancel={hideStartDatePicker}
//       />
//       <TouchableOpacity onPress={showEndDatePicker} style={styles.datePickerButton}>
//         <Text style={styles.datePickerButtonText}>
//           {endDate ? endDate.toDateString() : "Choose End Date"}
//         </Text>
//         <Ionicons name="calendar" size={24} color="black" />
//       </TouchableOpacity>
//       <DateTimePickerModal
//         isVisible={isEndDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirmEndDate}
//         onCancel={hideEndDatePicker}
//       />
//       <Button title="Add Reminder" onPress={handleAddReminder} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   input: {
//     height: 50,
//     borderColor: "#ced4da",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   datePickerButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#e9ecef",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 20,
//   },
//   datePickerButtonText: {
//     fontSize: 16,
//   },
// });

// export default AddReminderScreen;


import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";
import asyncStorage from "@/utils/AsyncStorage";
import { ReminderType } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";

const AddReminderScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

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

  const handleAddReminder = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Title is required to add a reminder.");
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

    if (endDate < startDate) {
      Alert.alert("Validation Error", "End date must be greater than start date.");
      return;
    }

    const newReminder: ReminderType = {
      id: Date.now(), // Using current timestamp as a unique ID
      title,
      notes,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    const reminders = (await asyncStorage.getItem("reminders")) as ReminderType[] || [];
    reminders.push(newReminder);

    await asyncStorage.setItem("reminders", reminders);
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
      <Button title="Add Reminder" onPress={handleAddReminder} />
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

export default AddReminderScreen;
