// import { createHashHistory } from 'history';

// export default createHashHistory({
//     hashType: 'slash',
//     //basename : 'gntv',
//     getUserConfirmation: (message, callback) => callback(window.confirm(message))
// });



import  { createBrowserHistory } from "history"

export default createBrowserHistory({basename:'gntv'});
