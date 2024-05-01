export default function reducers(state, action) {
  switch (action.type) {
    case "LOGIN_USER":
      const { user } = action.payload;
      return { ...state, user };

    case "SET_BEARER":
      const { bearer } = action.payload;
      return { ...state, bearer };

    case "SET_BASKET":
      const { basket } = action.payload;
      return { ...state, basket };

    default:
      return state;
  }
}
