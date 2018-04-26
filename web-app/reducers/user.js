import { LOGIN_USER } from '../actions/user';

function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.user; // changed to data.user
    default:
      return state;
  }
}

export default user;
