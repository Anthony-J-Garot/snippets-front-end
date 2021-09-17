import {Dispatch, SetStateAction} from 'react';
import {BehaviorSubject} from 'rxjs';
import {PUBLIC_USER} from '../constants';

/*
 * This observable is used to update the username in the NavBar when the
 * person signs on/off.
 */

// Any message to the user, or "username," is simply a string
export interface IUserState {
  id: number,
  username: string
}

// Blank username to start
const initialState: IUserState = Object.assign({}, PUBLIC_USER) as IUserState;
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
        setState((prevState: IUserState) => ({
          ...prevState,
          id: userState.id
        }));
      }
    };
    userSubject.subscribe(observer);
  },
  initialState: initialState,
  // Setter
  setUser: (newUserDetails: IUserState): void => {
    console.log('userStore.setUser() . . . ', newUserDetails);
    userState.id = newUserDetails.id;
    userState.username = newUserDetails.username;
    userSubject.next(userState);
  },
  // Getters
  getUsername: (): string => {
    return userState.username;
  },
  getUserId: (): number => {
    return userState.id;
  }
};

export default userStore;
