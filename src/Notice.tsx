import React, {ReactElement, useState, useEffect} from 'react';
import noticesStore from './Observables/noticesStore';

// This only flashes onscreen for a moment.
// Having it blank means it doesn't show at all.
const defaultState = {notice: ''};

const Notice = (): ReactElement => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    console.log('<Notice /> component subscribing to notice store');
    noticesStore.subscribe(setState);
  }, []);

  return (
    <p className="notice">{state.notice}</p>
  );
};

export default Notice;
