import { Epic, combineEpics, ofType } from 'redux-observable';
import { of, EMPTY } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
import {
  closeNotification,
  ITriggerNotificationAction,
  NotificationsAction,
} from './actions';
import { NotificationsActionTypes } from './types';

export const triggerNotificationEpic: Epic<
  NotificationsAction,
  any,
  any
> = action$ =>
  action$.pipe(
    ofType(NotificationsActionTypes.TRIGGER_NOTIFICATION),
    mergeMap(({ payload: { notification } }: ITriggerNotificationAction) => {
      if (notification.ttl === undefined) return EMPTY;

      return of(closeNotification(notification.id)).pipe(
        delay(notification.ttl),
      );
    }),
  );

export const notificationsEpic = combineEpics(triggerNotificationEpic);
