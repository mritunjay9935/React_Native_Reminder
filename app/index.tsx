// import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import React, { useEffect, useState } from "react";
// import Reminder from "@/components/Reminder";


// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import asyncStorage from "@/utils/AsyncStorage";
// import { ReminderType } from "@/constants/types";
// import { usePushNotifications } from "@/hooks/usePushNotification";
// import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

// const HomeScreen = () => {
//   const router = useRouter();

//   const [reminders, setReminders] = useState<ReminderType[]>([]);
//   const { schedulePushNotification } = usePushNotifications();
//   const onDelete = async (id: number) => {
//     const updatedReminders = reminders.filter((r) => r.id !== id);
//     await asyncStorage.setItem("reminders", updatedReminders);
//     router.push("/");
//   };

//   useEffect(() => {
//     const getData = async () => {
//       const reminders = (await asyncStorage.getItem(
//         "reminders"
//       )) as ReminderType[];
//       setReminders(reminders || []);
//       console.log("reminders", reminders);
//     };
//     getData();
//   }, []);

//   useEffect(() => {
//     schedulePushNotification();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {reminders.map((reminder) => (
//         <Reminder key={reminder.id} onDelete={onDelete} {...reminder} />
//       ))}
//       {reminders.length === 0 && (
//         <View>
//           <Text style={styles.emptyText}>No Reminder for today!</Text>
//           <Text style={styles.emptyText2}>It's time to plan your day!</Text>
//         </View>
//       )}
//       <View style={styles.options}>
//         <TouchableOpacity
//           onPress={() => {
//             router.push({
//               pathname: "/add-reminder",
//             });
//           }}
//           style={[
//             {
//               flexDirection: "row",
//               gap: 16,
//               marginTop: 20,
//               backgroundColor: "red",
//               borderRadius: 8,
//               margin: "auto",
//               paddingHorizontal: 30,
//               paddingVertical: 10,
//             },
//           ]}
//         >
//           <Ionicons name="add" size={36} />
//           <Text style={styles.buttonText}>New Reminder</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     marginTop: 40,
//     backgroundColor: "#f8f9fa",
//   },
//   options: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 30,
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#007bff",
//     borderRadius: 8,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "black",
//     marginLeft: 10,
//   },
//   emptyContainer: {
//     alignItems: "center",
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 28,
//     fontWeight: "600",
//     color: "#343a40",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   emptyText2: {
//     fontSize: 22,
//     fontWeight: "400",
//     color: "#6c757d",
//     textAlign: "center",
//   },
// });


// export default HomeScreen;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import Reminder from "@/components/Reminder";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import asyncStorage from "@/utils/AsyncStorage";
import { ReminderType } from "@/constants/types";
import { usePushNotifications } from "@/hooks/usePushNotification";

const HomeScreen = () => {
  const router = useRouter();
  const { schedulePushNotification } = usePushNotifications();
  const [reminders, setReminders] = useState<ReminderType[]>([]);
  const [currentDateRemindersCount, setCurrentDateRemindersCount] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const storedReminders = (await asyncStorage.getItem("reminders")) as ReminderType[];
      console.log("Stored Reminders:", storedReminders);
      if (storedReminders) {
        setReminders(storedReminders);
        calculateCurrentDateRemindersCount(storedReminders);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    schedulePushNotification(); // Assuming this handles scheduling push notifications
  }, []);

  const calculateCurrentDateRemindersCount = (reminders: ReminderType[]) => {
    const today = new Date().toLocaleDateString();
    console.log("Today's Date:", today);
    const count = reminders.filter((reminder) => {
      const reminderDate = new Date(reminder.startDate!).toLocaleDateString();
      console.log("Reminder Date:", reminderDate);
      return reminderDate === today;
    }).length;
    console.log("Current Date Reminders Count:", count);
    setCurrentDateRemindersCount(count);
  };

  const onDelete = async (id: number) => {
    const updatedReminders = reminders.filter((r) => r.id !== id);
    await asyncStorage.setItem("reminders", updatedReminders);
    setReminders(updatedReminders);
    calculateCurrentDateRemindersCount(updatedReminders);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.remindersPerDay}>
        <Text style={styles.remindersPerDayTitle}>Total agendas for Today</Text>
        <Text style={styles.remindersPerDayText}>{currentDateRemindersCount}</Text>
      </View>

      <ScrollView>
        {reminders.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>There are no events for today.</Text>
            <Text style={styles.emptyText2}>It's time to plan your day!</Text>
          </View>
        )}

        {reminders.map((reminder) => (
          <Reminder key={reminder.id} onDelete={onDelete} {...reminder} />
        ))}
      </ScrollView>
      
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => {
            router.push("/add-reminder");
          }}
          style={[styles.button, { backgroundColor: "yellow" }]}
        >
          <Ionicons name="add" size={36} color="black" />
          <Text style={styles.buttonText}>New Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#f8f9fa",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#343a40",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText2: {
    fontSize: 22,
    fontWeight: "400",
    color: "#6c757d",
    textAlign: "center",
  },
  options: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  button: {
    marginTop: 100,
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 500,
    backgroundColor: '#ccc',

    
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
    fontWeight:'bold'
  },
  remindersPerDay: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ced4da",
    paddingBottom: 10,
  },
  remindersPerDayTitle: {
    fontSize: 30, // Increased font size
    fontWeight: "600",
    color: "#343a40",
    textAlign: "center",
  },
  remindersPerDayText: {
    fontSize: 30, // Increased font size
    fontWeight: "400",
    color: "#6c757d",
    textAlign: "center",
  },
});

export default HomeScreen;
