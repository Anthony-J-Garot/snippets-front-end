import {Dispatch, SetStateAction} from 'react';

// A BehaviorSubject initializes its subscribers with the current value, as opposed to a normal
// subject, which does not initialize new observers on subscription
import {BehaviorSubject} from 'rxjs';

export interface NoticeState {
  notice: string
}

// Blank to start
const initialState: NoticeState = {notice: ''};
const noticeState = initialState;

const noticesSubject = new BehaviorSubject(noticeState);

const noticesStore = {
  subscribe: (setState: Dispatch<SetStateAction<NoticeState>>): void => {
    const observer = {
      next: (noticeState: NoticeState) => {
        setState((prevState: NoticeState) => ({
          ...prevState,
          notice: Object.values(noticeState.notice)
        }));
      }
    };
    noticesSubject.subscribe(observer);
  },
  setNotice: (notice: NoticeState): void => {
    // console.log('setNotice() ', notice);
    noticeState.notice = notice.notice;
    noticesSubject.next(noticeState);

    setTimeout(
      noticesStore.clearNotice,
      4000
    );
  },
  clearNotice: (): void => {
    noticeState.notice = '';
    noticesSubject.next(noticeState);
  },
  initialState: initialState
};

export default noticesStore;
