import {Dispatch, SetStateAction} from 'react';
import {BehaviorSubject} from 'rxjs';

/*
 * At present, this observable is simply used to update the username in the
 * NavBar when the person signs on/off. I didn't name it "usernameStore"
 * because I may add something in the future.
 */

// Any message to the user, or "username," is simply a string
export interface IUserState {
  username: string
}

// Blank username to start
const initialState: IUserState = {username: ''} as IUserState;
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
  setUser: (username: IUserState): void => {
    // console.log('setUser() . . . ', username);
    userState.username = username.username;
    userSubject.next(userState);
  },
  initialState: initialState
};

export default userStore;
