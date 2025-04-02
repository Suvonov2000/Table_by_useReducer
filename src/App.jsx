import { Button, Input, Table } from "antd";
import { useReducer, state } from "react";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "5",
    name: "Mark",
    age: 22,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
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

const onSave = (state) => {
  return {
    ...state,
    selectedRow: null,
    dataSource: state.dataSource.map((value) => {
      if (value.key === state.selectedRow.key) {
        return state.selectedRow;
      }

      return value;
    }),
  };
};

const onSelect = (state, action) => {
  return {
    ...state,
    selectedRow: action.payload,
  };
};

const onChange = (state, action) => {
  return {
    ...state,
    selectedRow: {
      ...state.selectedRow,
      ...action.payload,
    },
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

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    dataSource,
    selectedRow: null,
  });
  const columns = [
    {
      title: "id",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        if (record.key === state.selectedRow?.key) {
          return (
            <Input
              onChange={(e) => {
                dispatch({
                  type: "CHANGE",
                  payload: {
                    name: e.target.value,
                  },
                });
              }}
              value={state.selectedRow.name}
            />
          );
        }

        return record.name;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (_, record) => {
        if (record.key === state.selectedRow?.key) {
          return (
            <Input
              onChange={(e) => {
                dispatch({
                  type: "CHANGE",
                  payload: {
                    age: e.target.value,
                  },
                });
              }}
              value={state.selectedRow.age}
            />
          );
        }

        return record.age;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, record) => {
        if (record.key === state.selectedRow?.key) {
          return (
            <Input
              onChange={(e) => {
                dispatch({
                  type: "CHANGE",
                  payload: {
                    address: e.target.value,
                  },
                });
              }}
              value={state.selectedRow.address}
            />
          );
        }

        return record.address;
      },
    },
    {
      title: "Actions",
      render: (record) => {
        if (state.selectedRow?.key === record.key) {
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                onClick={() => {
                  dispatch({
                    type: "SELECT",
                    payload: null,
                  });
                }}
                danger
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  dispatch({
                    type: "SAVE",
                  });
                }}
              >
                Save
              </Button>
            </div>
          );
        }

        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              onClick={() => {
                dispatch({
                  type: "DELETE",
                  payload: record,
                });
              }}
              danger
            >
              Delete
            </Button>{" "}
            <Button
              onClick={() => {
                dispatch({
                  type: "SELECT",
                  payload: record,
                });
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Table
        style={{ width: 600 }}
        dataSource={state.dataSource}
        columns={columns}
      />
      ;
    </div>
  );
};

export default App;
