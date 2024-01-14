import * as Notifications from "expo-notifications";

let navigator = undefined;
let last_notification = undefined;

export const setNotificationNavigator = (nav) => {
  navigator = nav;
};

export const sendNotification = async (title : string, body : string) => {
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (
          response.actionIdentifier ==
            "expo.modules.notifications.actions.DEFAULT" &&
          response.notification.request.identifier != last_notification
        ) {
          last_notification = response.notification.identifier;
        }
      });
      return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    },
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: null,
  });
};
