import React, {ReactElement, useState, useEffect} from 'react';
import userStore from './Observables/userStore';

// This only flashes onscreen for a moment.
// Having it blank means it doesn't show at all.
const defaultState = {username: ''};

const Username = (): ReactElement => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    console.log('<Username /> component subscribing to userstore');
    userStore.subscribe(setState);
  }, []);

  return (
    <p className='username'>{state.username}</p>
  );
};

export default Username;
