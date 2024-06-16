import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useEffect } from "react";
import { Platform } from "react-native"; // Importing Platform

export const usePushNotifications = () => {
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const schedulePushNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Daily reminder at 8:00 am
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Good morning! 🌞",
        body: "Check your schedule for today!",
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
    });
  };

  return {
    schedulePushNotification,
  };
};
