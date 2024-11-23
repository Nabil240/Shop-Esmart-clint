import { useEffect, useState } from "react";
import useUsers from "../../../hooks/useUsers";
import { animatedProps, timeCoverterGMTtoLocal } from "../../../utils/modules";
import { MdDeleteForever } from "react-icons/md";
import {
  confirmAlert,
  confirmationAlert,
  failedAlert,
} from "../../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { animated } from "@react-spring/web";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import LoadMoreButton from "../../../Component/LoadMoreButton/LoadMoreButton";
import SearchTextButton from "../../../Component/SearchTextButton/SearchTextButton";
import EmptyPage from "../../../Component/EmptyPage/EmptyPage";
import useUserRoleCheck from "../../../hooks/useUserRoleCheck";

const AllUsers = () => {
  const [dataLoad, setDataLoad] = useState(10);
  const path = "/users";
  const [searchText, setSearchText] = useState("");

  const [users, isLoading, totalResults, refetch] = useUsers({
    path,
    dataLoad,
    searchText,
  });

  const axiosSecure = useAxiosSecure();
  const { userType, isRoleLoading } = useUserRoleCheck();

  const userRole = [
    { role: "manager" },
    { role: "admin" },
    { role: "moderator" },
    { role: "user" },
  ];

  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [refetch, dataLoad, isLoading, searchText]);

  const handleUserRoleChange = (e, email, userCurrentRole) => {

    const type = e.target.value;

    if (type === "manager" && (userType === "admin" || userType === 'moderator')) {
      return failedAlert("Admins cannot assign the manager role!");
    }

    confirmationAlert({
      detailsText: "Change the type of user?",
      confirmButtonText: "Yes! Change it",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const userRole = { email: email, type: type };

       try{
        const res = await axiosSecure.patch(`/users/type/update?userCurrentCole=${userCurrentRole}`, userRole);
        if (res.data.success) {
          confirmAlert("User Type Change Success!");
          refetch();
        } else {
          failedAlert("Change failed !");
        }
       }
       catch(err){
        failedAlert("Change failed !");
       }
      }
    });
  };

  const handleUserBaned = (e, email) => {

    const isBaned = e.target.value === "true";
    confirmationAlert({
      detailsText: "Ban this user",
      confirmButtonText: "Yes! Ban User",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const userAccess = { email: email, isBaned: isBaned };

        try {
          const res = await axiosSecure.patch(
            "/users/access/update",
            userAccess
          );
          if (res.data.success) {
            confirmAlert("This user has been successfully banned!");
            await refetch();
          } else {
            failedAlert("Failed to ban user !");
          }
        } catch (err) {
          failedAlert("Failed to ban user !");
        }
      }
    });
  };

  const handleUsersDelete = (_id) => {
    confirmationAlert({}).then(async (result) => {
      if (result.isConfirmed) {
        // operation
        const res = await axiosSecure.delete(`/users/${_id}`);
        if (res.data.deletedCount > 0) {
          confirmAlert("Deleted Success!");
          refetch();
        } else {
          failedAlert("Delete Failed!");
        }
      }
    });
  };

  return (
    <div className="mb-10">
      {(isLoading || isRoleLoading) && <WaitingLoader></WaitingLoader>}
      <h2 className="text-2xl md:text-4xl text-center py-4">
        All Users{" "}
        <animated.span>
          {animatedProps(totalResults).number.to((n) => n.toFixed(0))}
        </animated.span>
      </h2>

      <div>
        <SearchTextButton
          placeholder="Search by Email Phone or User_id"
          setSearchText={setSearchText}
        ></SearchTextButton>
      </div>

      {totalResults > 0 ? (
        <div className="overflow-x-auto pb-10">
          <table className="table">
            <thead>
              <tr className="md:text-2xl text-lg bg-gray-200 dark:bg-gray-700">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Type</th>
                <th>Last Login</th>
                <th>Last Logout</th>
                <th>Activity</th>
                <th>Create Time</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="md:text-base text-sm">
              {users?.map((user) => (
                <tr className="hover px-2" key={user._id}>
                  <td>#{user._id.slice(-8)}</td>
                  <td className="capitalize">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user?.phone ? user.phone : 'N/A'}</td>
                  <td>
                    <select
                      onChange={(e) => handleUserBaned(e, user.email)}
                      className={`${
                        user.isBaned ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {user.isBaned ? (
                        <>
                          <option value={true} className="text-red-500">
                            Banned
                          </option>
                          <option value={false} className="text-green-500">
                            Access
                          </option>
                        </>
                      ) : (
                        <>
                          <option value={false} className="text-green-500">
                            Access
                          </option>
                          <option value={true} className="text-red-500">
                            Banned
                          </option>
                        </>
                      )}
                    </select>
                  </td>
                  <td>
                    {userType === "manager" || userType === "admin" ? (
                      <select
                        className="capitalize px-2 py-1"
                        onChange={(e) => handleUserRoleChange(e, user.email, user.type)}
                        default={user.type}
                      >
                        <option value={user.type}>{user.type}</option>
                        {userRole
                          .filter(
                            (role) =>
                              !(userType === "admin" && role.role === "manager")
                          )
                          .map(
                            (role, i) =>
                              user.type === role.role || (
                                <option key={i} value={role.role}>
                                  {role.role}
                                </option>
                              )
                          )}
                      </select>
                    ) : (
                      <span className="capitalize">{user.type}</span>
                    )}
                  </td>
                  <td>{timeCoverterGMTtoLocal(user.lastSignInTime)}</td>
                  <td>
                    {user?.lastSignOutTime
                      ? timeCoverterGMTtoLocal(user.lastSignOutTime)
                      : "Still logged in"}
                  </td>
                  <td>
                    {user.activity ? (
                      <span className="text-green-600 text-sm flex items-center">
                        🟢 Online
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm flex items-center">
                        🔴 Offline
                      </span>
                    )}
                  </td>

                  <td>{timeCoverterGMTtoLocal(user.creationTime)}</td>
                  {(userType === 'admin' || userType === 'manager' ) ? <td>
                    <button
                      onClick={() => handleUsersDelete(user._id)}
                      className="p-3 rounded-sm bg-gray-100 hover:bg-gray-300 dark:bg-gray-600 hover:dark:bg-gray-700 text-[#ff3811] text-2xl"
                    >
                      <MdDeleteForever />{" "}
                    </button>
                  </td> : <td>
                    <button
                      
                      className="p-3 rounded-sm bg-gray-100 hover:bg-gray-300 dark:bg-gray-600 hover:dark:bg-gray-700 text-gray-400 text-2xl"
                    >
                      <MdDeleteForever />{" "}
                    </button>
                  </td> }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyPage></EmptyPage>
      )}
      {totalResults > 10 && totalResults !== users?.length && (
        <LoadMoreButton setDataLoad={setDataLoad} />
      )}
    </div>
  );
};

export default AllUsers;
