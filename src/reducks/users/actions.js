export const FETCH_TICKETS_IN_CART = 'FETCH_TICKETS_IN_CART';
export const fetchTicketsInCartAction = (tickets) => {
  return {
    type: 'FETCH_TICKETS_IN_CART',
    payload: tickets
  }
}

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      role: "",
      uid: "",
      username: "",
    },
  };
};
