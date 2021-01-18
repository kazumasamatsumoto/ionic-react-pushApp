import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";

const resetBadgeCount = () => {
  PushNotifications.removeAllDeliveredNotifications();
}

const push = () => {
  PushNotifications.requestPermission().then((permission) => {
    if (permission.granted) {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // No permission for push granted
    }
  });

  PushNotifications.addListener(
    'registration',
    (token: PushNotificationToken) => {
      console.log('My token: ' + JSON.stringify(token));
    }
  );

  PushNotifications.addListener('registrationError', (error: any) => {
    console.log('Error: ' + JSON.stringify(error));
  });

  PushNotifications.addListener(
    'pushNotificationReceived',
    async (notification: PushNotification) => {
      console.log('Push received: ' + JSON.stringify(notification));
    }
  );

  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    async (notification: PushNotificationActionPerformed) => {
      console.log('Action performed: ' + JSON.stringify(notification.notification));
    }
  );
}

const { PushNotifications } = Plugins;

export class Home extends React.Component {
  ionViewDidEnter() {
    push();
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="medium">
            <IonTitle>Ionic React Push Example</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButton onClick={push} expand="full">Register for Push</IonButton>
          <IonButton onClick={resetBadgeCount} expand="full">Reset Badge Count</IonButton>
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
