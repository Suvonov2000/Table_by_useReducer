import { Button, Table } from "antd";
import { useContext } from "react";
import { tableContext } from "./context/table";

const App = () => {
  const { state, dispatch } = useContext(tableContext);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <div>
            <Button
              onClick={() => dispatch({ type: "DELETE", payload: record })}
            >
              Delete
            </Button>{" "}
            <Button>Edit</Button>
          </div>
        );
      },
    },
  ];

  console.log(state);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "cenetr",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Table dataSource={state.dataSource} columns={columns} />
    </div>
  );
};

export default App;
