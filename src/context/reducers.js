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

    case "SET_REFRESH":
      const { refreshToken } = action.payload;
      return { ...state, refreshToken };

    default:
      return state;
  }
}
