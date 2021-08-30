import React, {ReactElement, useState, useEffect} from 'react';
import userStore from './Observables/userStore';

// This only flashes onscreen for a moment.
// Having it blank means it doesn't show at all.
const defaultState = {username: ''};

const Username = (): ReactElement => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    // Subscribe so that state changes occur
    userStore.subscribe(setState);
  }, []);

  if (state.username !== '') {
    return (
      <p><span className='username-label'>User: </span><span className='username'>{state.username}</span></p>
    );
  } else {
    return (
      <p>&nbsp;</p>
    );
  }
};

export default Username;
