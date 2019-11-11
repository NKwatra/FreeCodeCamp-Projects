import React, {createContext} from 'react';

const AppContext = createContext([{
    displayText: ""
}, () => {}]);

export default AppContext;