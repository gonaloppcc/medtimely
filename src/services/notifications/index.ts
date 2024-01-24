import * as Notifications from 'expo-notifications';
import { MedicationRecord } from '../../model/medicationRecord';

export const setNotificationHandler = async () : Promise<void> => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
    });
};

const scheduleNotification = (title : string, body : string, dateNotification : Date) : void => {
    Notifications.scheduleNotificationAsync({
        content: {
        title: title,
        body: body,
        },
        trigger: dateNotification,
    });
};


export const scheduleNotificationsForUser = (records : MedicationRecord[]) : void => {
  if(records.length > 0 ){
      let today = new Date();
      let todayDay = today.getDay();
      let todayMonth = today.getMonth()
      let todayYear = today.getFullYear();
      let firstRecord = records[0].scheduledTime;
      let firstRecordDay = firstRecord.getDay();
      let firstRecordMonth = firstRecord.getMonth()
      let firstRecordYear = firstRecord.getFullYear();
      let todayMidnight = new Date(todayYear, todayMonth, todayDay, 0, 0);
      let firstRecordMidnight = new Date(firstRecordYear, firstRecordMonth, firstRecordDay, 0, 0);
      // if first record is not from today, then no notification is scheduled 
      if(firstRecordMidnight > todayMidnight){
          return;
      }
      records.forEach((record : MedicationRecord) =>
      {
          if(record.scheduledTime > today) { 
            console.log("Scheduling Notification for " + record.name);
            let title = 'Don\'t forget to take your medication';
            let body = 'Take your ' + record.dosage 
                        + ' ' + record.units + ' of ' 
                        + record.name; 
            scheduleNotification(title, body, record.scheduledTime);
          }
      }
  );
  }
};

export async function allowsNotificationsAsync() {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  }