// -----------simple use Redux---------------

// import { createStore } from "redux";
// //el store banaya jahan pr sab kuch hona hai
// const store = createStore(reducer);
// //is array m history value push honi hai
// const history = [];
// //reducer kuch nhi hota simple ek function hai jsike pass state hota hai or action ek new state return karta hai
// //action ke sath
// function reducer(state = { amount: 1 }, action) {
//   if (action.type === "increament") {
//     return { amount: state.amount + 1 };
//   }
//   if (action.type === "decreament") {
//     return { amount: state.amount - 1 };
//   }
//   if (action.type === "increamentByAmount") {
//     return { amount: state.amount + action.payload };
//   }
//   return state;
// }
// //getStore kuch nhi simple ek tarah se call karna hota hai state ko
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });
// //ye manlo action ko control karta hai
// setInterval(() => {
//   store.dispatch({ type: "increamentByAmount", payload:4 });
// }, 2000);

// -----------------applyMiddleware---------------------

// import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

// action name
// const inc = "increament";
// const dec = "decreament";
// const incByAmount = "increamentByAmount";
// const store = createStore(reducer, applyMiddleware(logger.default));

// const history = [];

// // reducer
// function reducer(state = { amount: 1 }, action) {
//   if (action.type === inc) {
//     return { amount: state.amount + 1 };
//   }
//   if (action.type === dec) {
//     return { amount: state.amount - 1 };
//   }
//   if (action.type === incByAmount) {
//     return { amount: state.amount + action.payload };
//   }
//   return state;
// }

// //action creators
// function increament() {
//   return { type: inc };
// }
// function decreament() {
//   return { type: dec };
// }
// function increamentByAmount(value) {
//   return { type: incByAmount, payload: value };
// }

// setInterval(() => {
//   store.dispatch(increamentByAmount(5));
// }, 2000);

// --------------------datafetch---------------------
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import axios from "axios";
import { thunk } from "redux-thunk";

const init = "INIT";

// Reducer
function reducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case init:
      return { amount: action.payload };
    default:
      return state;
  }
}

// Action creator
function initUser(value) {
  return { type: init, payload: value }; // Fixing the action type
}

// Thunk action creator
function getUser() {
  return async function(dispatch) { // thunk action creator returns a function
    try {
      const { data } = await axios.get("http://localhost:3000/accounts/2");
      dispatch(initUser(data.amount));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
}

const store = createStore(
  reducer,
  applyMiddleware(logger.default, thunk) // Applying thunk middleware correctly
);

store.dispatch(getUser()); // Dispatching the thunk action creator
