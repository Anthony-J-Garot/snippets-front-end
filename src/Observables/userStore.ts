import {Dispatch, SetStateAction} from 'react';
import {BehaviorSubject} from 'rxjs';
import {ANONYMOUS_USER} from '../constants';

/*
 * This observable is used to update the username in the NavBar when the
 * person signs on/off.
 */

// Any message to the user, or "username," is simply a string
export interface IUserState {
  username: string
}

// Blank username to start
const initialState: IUserState = ANONYMOUS_USER as IUserState;
const userState: IUserState = initialState;

const userSubject = new BehaviorSubject(userState);

const userStore = {
  subscribe: (setState: Dispatch<SetStateAction<IUserState>>): void => {
    const observer = {
      next: (userState: IUserState) => {
        setState((prevState: IUserState) => ({
          ...prevState,
          username: userState.username
        }));
      }
    };
    userSubject.subscribe(observer);
  },
  initialState: initialState,
  // Setter
  setUser: (username: IUserState): void => {
    console.log('userStore.setUser() . . . ', username);
    userState.username = username.username;
    userSubject.next(userState);
  },
  // Getter
  getUser: (): string => {
    return userState.username;
  }
};

export default userStore;
