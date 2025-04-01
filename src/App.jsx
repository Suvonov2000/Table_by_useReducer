import { Button, Table } from "antd";
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

const onSave = () => {};
const onEdit = () => {};

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE":
      return onDelete(state, action);
    case "SAVE":
      return onSave(state, action);
    case "Edit":
      return onEdit(state, action);
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    dataSource,
  });
  const columns = [
    {
      title: "id",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return record.name;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text, record, index) => {
        return record.age;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record, index) => {
        return record.address;
      },
    },
    {
      title: "Actions",
      render: (record) => {
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
            <Button>Edit</Button>
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
