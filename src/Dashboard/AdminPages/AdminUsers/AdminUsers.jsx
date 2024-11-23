import { useEffect, useState } from "react";
import useUsers from "../../../hooks/useUsers";
import {
  animatedProps,
  timeCoverterGMTtoLocal,
} from "./../../../utils/modules";

import {
  confirmAlert,
  confirmationAlert,
  failedAlert,
} from "../../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { animated } from "@react-spring/web";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import LoadMoreButton from "../../../Component/LoadMoreButton/LoadMoreButton";
import SearchTextButton from "../../../Component/SearchTextButton/SearchTextButton";
import EmptyPage from "../../../Component/EmptyPage/EmptyPage";
import useUserRoleCheck from "../../../hooks/useUserRoleCheck";
import useAuth from "../../../hooks/useAuth";

const AdminUsers = () => {
  const [dataLoad, setDataLoad] = useState(10);
  const { user } = useAuth();
  const path = "/users/admin";
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

    if (email === user.email) {
      return failedAlert("You cannot change your own role!");
    }

    if (
      type === "manager" &&
      (userType === "admin" || userType === "moderator")
    ) {
      return failedAlert("Admins cannot assign the Manager role!");
    }

    if (
      userCurrentRole === "manager" &&
      (userType === "admin" ||
        userType === "moderator" ||
        userType !== "manager")
    ) {
      return failedAlert("Admins cannot assign the Manager role!");
    }

    confirmationAlert({
      detailsText: "Change the type of user?",
      confirmButtonText: "Yes! Change it",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const userRole = { email: email, type: type };

        try {
          const res = await axiosSecure.patch(
            `/users/type/update?userCurrentCole=${userCurrentRole}`,
            userRole
          );
          if (res.data.success) {
            confirmAlert("User Type Change Success!");
            refetch();
          } else {
            failedAlert("Change failed !");
          }
        } catch (err) {
          failedAlert("Change failed !");
        }
      }
    });
  };

  const handleUserBaned = (e, email, userCurrentRole) => {
    if (email === user.email) {
      return failedAlert("You cannot change your own access control!");
    }

    if (
      userCurrentRole === "manager" &&
      (userType === "admin" ||
        userType === "moderator" ||
        userType !== "manager")
    ) {
      return failedAlert(
        "Admins cannot change the access of the Manager role!"
      );
    }

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

  const handleUsersDelete = (email, _id, userCurrentRole) => {
    if (email === user.email) {
      return failedAlert("You cannot Delete your own Data!");
    }
    if (
      userCurrentRole === "manager" &&
      (userType === "admin" ||
        userType === "moderator" ||
        userType !== "manager")
    ) {
      return failedAlert("Admins cannot Delete the Manager role data!");
    }

    confirmationAlert({}).then(async (result) => {
      if (result.isConfirmed) {
        // operation
        const res = await axiosSecure.delete(`/users/${_id}`);
        if (res.data.deletedCount>0) {
          confirmAlert("Deletion successful!");
          refetch();
        } else {
          failedAlert("Deletion Failed!");
        }
      }
    });
  };
  return (
    <div className="mb-10">
      {(isLoading || isRoleLoading) && <WaitingLoader></WaitingLoader>}
      <h2 className="text-2xl md:text-4xl text-center py-4">
        Admin Users{" "}
        <animated.span>
          {animatedProps(totalResults).number.to((n) => n.toFixed(0))}
        </animated.span>
      </h2>

      <div>
        <SearchTextButton
          setSearchText={setSearchText}
          placeholder="Search By Email Phone or User_id"
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
              {users?.map((admin) => (
                <tr className="hover px-2" key={admin._id}>
                  <td>#{admin._id.slice(-8)}</td>
                  <td className="capitalize">
                    {admin.name}{" "}
                    {admin.email === user.email && (
                      <span className="text-xs lowercase text-green-500">
                        (you)
                      </span>
                    )}
                  </td>
                  <td>{admin.email}</td>
                  <td>{admin?.phone ? admin.phone : 'N/A'}</td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleUserBaned(e, admin.email, admin.type)
                      }
                      className={`${
                        admin.isBaned ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {admin.isBaned ? (
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
                        onChange={(e) =>
                          handleUserRoleChange(e, admin.email, admin.type)
                        }
                        default={admin.type}
                      >
                        <option value={admin.type}>{admin.type}</option>
                        {userRole
                          .filter(
                            (role) =>
                              !(userType === "admin" && role.role === "manager")
                          )
                          .map(
                            (role, i) =>
                              admin.type === role.role || (
                                <option key={i} value={role.role}>
                                  {role.role}
                                </option>
                              )
                          )}
                      </select>
                    ) : (
                      <span className="capitalize">{admin.type}</span>
                    )}
                  </td>
                  <td>{timeCoverterGMTtoLocal(admin.lastSignInTime)}</td>
                  <td>
                    {admin?.lastSignOutTime
                      ? timeCoverterGMTtoLocal(admin.lastSignOutTime)
                      : "Still logged in"}
                  </td>
                  <td>
                    {admin.activity ? (
                      <span className="text-green-600 text-sm flex items-center">
                        🟢 Online
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm flex items-center">
                        🔴 Offline
                      </span>
                    )}
                  </td>

                  <td>{timeCoverterGMTtoLocal(admin.creationTime)}</td>
                  {userType === "admin" || userType === "manager" ? (
                    <td>
                      <button
                        onClick={() =>
                          handleUsersDelete(admin.email, admin._id, admin.type)
                        }
                        className="p-3 rounded-sm bg-gray-100 hover:bg-gray-300 dark:bg-gray-600 hover:dark:bg-gray-700 text-[#ff3811] text-2xl"
                      >
                        <MdDeleteForever />{" "}
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button className="p-3 rounded-sm bg-gray-100 hover:bg-gray-300 dark:bg-gray-600 hover:dark:bg-gray-700 text-gray-400 text-2xl">
                        <MdDeleteForever />{" "}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyPage></EmptyPage>
      )}
      {totalResults > 10 && totalResults !== users.length && (
        <LoadMoreButton setDataLoad={setDataLoad} />
      )}
    </div>
  );
};

export default AdminUsers;
