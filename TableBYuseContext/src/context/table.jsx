import { createContext, useReducer, useState } from "react";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "5",
    name: "Mark",
    age: 22,
    address: "10 Downing Street",
  },
];

const onDelete = (state, action) => {
  return {
    ...state,
    dataSource: state.dataSource.filter(
      (value) => value.key !== action.payload.key
    ),
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE":
      return onDelete(state, action);
    case "SAVE":
      return onSave(state, action);
    case "SELECT":
      return onSelect(state, action);
    case "CHANGE":
      return onChange(state, action);
    default:
      return state;
  }
};

export const tableContext = createContext();

const TableContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    dataSource,
  });

  return (
    <tableContext.Provider value={{ dispatch, state }}>
      {children}
    </tableContext.Provider>
  );
};

export default TableContextProvider;
