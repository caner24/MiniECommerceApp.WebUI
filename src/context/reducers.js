export default function reducers(state, action) {
    switch (action.type) {
      case 'LOGIN_USER':
        const {user} = action.payload;
        return {...state, user};
      default:
        return state;
    }
  }