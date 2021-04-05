/* eslint-disable import/newline-after-import */
/* eslint-disable import/named */
import { reducer as auth, actions as authActions } from './reducer';
import authWatcher from './saga';
export { auth, authActions, authWatcher };
