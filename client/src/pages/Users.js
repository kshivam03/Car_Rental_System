import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popconfirm } from "antd";
import { deleteUser, getAllUsers } from "../redux/actions/userActions";
import { DeleteOutlined } from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";

function Users() {
  const { users } = useSelector((state) => state.usersReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalUsers, setTotalusers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    var index;

    for(let i=0; i<users?.length; i++)
    {
      if(users[i].username=="admin@gmail.com")
        index=i;
    }

    users.splice(index, 1)

    setTotalusers(users);
  }, [users]);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div>
        <table>
          <thead style={{ backgroundColor: "green", color: "white" }}>
            <tr>
              <th>Username</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {totalUsers?.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>
                  <Popconfirm
                    title="Are you sure to delete this car?"
                    onConfirm={() => {
                      dispatch(deleteUser({ userid: user._id }));
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
}

export default Users;
