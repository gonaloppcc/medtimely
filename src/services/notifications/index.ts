import * as Notifications from 'expo-notifications';

export const setNotificationHandler = async () : Promise<void> => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
    });
};

export const scheduleNotification = (title : string, body : string, dateNotification : Date) : void => {
    Notifications.scheduleNotificationAsync({
        content: {
        title: title,
        body: body,
        },
        trigger: dateNotification,
    });
};


export async function allowsNotificationsAsync() {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  }