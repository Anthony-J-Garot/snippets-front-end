import {Dispatch, SetStateAction} from 'react';

// A BehaviorSubject initializes its subscribers with the current value, as opposed to a normal
// subject, which does not initialize new observers on subscription
import {BehaviorSubject} from 'rxjs';
import {isBrowser} from '../utils';

// Any message to the user, or "notice," is simply a string
export interface NoticeState {
  notice: string
}

// Blank notice to start
const initialState: NoticeState = {notice: ''} as NoticeState;
const noticeState: NoticeState = initialState;

const noticesSubject = new BehaviorSubject(noticeState);

const noticesStore = {
  subscribe: (setState: Dispatch<SetStateAction<NoticeState>>): void => {
    const observer = {
      next: (noticeState: NoticeState) => {
        setState((prevState: NoticeState) => ({
          ...prevState,
          notice: noticeState.notice
        }));
      }
    };
    noticesSubject.subscribe(observer);
  },
  setNotice: (notice: NoticeState): void => {
    // console.log('setNotice() . . . ', notice);
    noticeState.notice = notice.notice;
    noticesSubject.next(noticeState);

    // This causes the notice to disappear after the set time so as
    // not to clutter up the user's screen or add to confusion later.
    if (isBrowser()) {
      setTimeout(
        noticesStore.clearNotice,
        4000
      );
    }
  },
  clearNotice: (): void => {
    // console.log('clearNotice() . . . ');
    noticeState.notice = '';
    noticesSubject.next(noticeState);
  },
  initialState: initialState
};

export default noticesStore;
