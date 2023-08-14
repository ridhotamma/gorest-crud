"use client";

import { getPaginatedUsers, createUser, getUserDetailById, updateUser, deleteUser } from "@/lib/actions";
import { IParams, IUser, Status } from "@/lib/actions/interfaces";
import { useCallback, useEffect, useState } from "react";

import DataTable from "@/components/datatable";
import SkeletonLoader from "@/components/skeletons";
import Pagination from "@/components/pagination";
import Modal from "@/components/modal";
import UserForm from "@/components/forms/userForm";
import UserUpdateForm from "@/components/forms/userUpdateForm";

import { IHeader } from "@/components/datatable/interface";
import { useToast } from "@/components/toast";

export default function Users() {
  const [params, setParams] = useState<IParams>({ page: 1, per_page: 10 });
  const [dataSource, setDataSource] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetailLoading, setUserDetailLoading] = useState<boolean>(false);
  const [userCreateLoading, setUserCreateLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [createUserModalOpen, setCreateUserModalOpen] = useState<boolean>(false);
  const [updateUserModalOpen, setUpdateUserModalOpen] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<Partial<IUser>>({});

  const toast = useToast()

  const getDataSource = useCallback(async (callback?: () => void) => {
    setLoading(true);
    try {
      const response = await getPaginatedUsers(params);
      const { ok, data } = response;

      if (ok) {
        setDataSource(data as IUser[]);
      }
    } catch (error: any) {
      toast.trigger({
        type: 'danger',
        message: error.message
      })
    } finally {
      setLoading(false);
      if (callback) callback();
    }
  }, [params, toast]);

  const getUserDetail = async (id: number) => {
    setUserDetailLoading(true);

    try {
      const response = await getUserDetailById(id);
      const { ok, data } = response;

      if (ok) {
        setUserDetail(data as IUser);
        setUpdateUserModalOpen(true);
      } 

    } catch (error: any) {
      
      toast.trigger({
        type: 'danger', 
        message: error.message
      })

    } finally {
      setUserDetailLoading(false);
    }
  };

  const handleCreateUser = async (newUser: IUser) => {
    setUserCreateLoading(true) 
    
    try {
      const response = await createUser(newUser)
      const { ok, data } = response

      if (ok) {
        setDataSource(prevDataSource => [data as any, ...prevDataSource]);
        handleToggleCreateUserModal()
        toast.trigger({
          type: 'success',
          message: 'User Created Succesfully'
        })
      }

    } catch (error: any) {
      toast.trigger({
        type: 'danger',
        message: error.message
      })
    } finally {
      setUserCreateLoading(false)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    setUserDetailLoading(true)
    try {
      const response = await deleteUser(userId)

      const { ok, message } = response

      if (ok) {

        setDataSource(prevDataSource => prevDataSource.filter(user => user.id !== userId ));

        toast.trigger({
          type: 'success',
          message: message
        })
      }

    } catch (error: any) {
      toast.trigger({
        type: 'danger',
        message: error.message
      })

    } finally {
      setUserDetailLoading(false)
      handleToggleUpdateUserModal()
    }
  }

  const handleUpdateUser = async (userId: number, payload: Partial<IUser>) => {
    setUserDetailLoading(true) 
    try {
      const response = await updateUser(userId, payload)
      const { ok, data, message } = response

      if (ok) {

        setDataSource(prevDataSource => prevDataSource.map(user => 
          user.id === userId ? { ...user, ...data as any } : user
        ));

        toast.trigger({
          type: 'success',
          message: message
        })
      }

      
    } catch (error: any) {
      toast.trigger({
        type: 'danger',
        message: error.message
      })
    } finally {
      setUserDetailLoading(false)
      handleToggleUpdateUserModal()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (!e.target.value) {
      getDataSource();
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchText && e.key === "Enter") {
      getDataSource(() => {
        setDataSource((prev) =>
          prev.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      });
    }
  };

  const handleToggleCreateUserModal = () => {
    setCreateUserModalOpen((prev) => !prev);
  };

  const handleToggleUpdateUserModal = () => {
    setUpdateUserModalOpen((prev) => !prev);
  };

  useEffect(() => {
    getDataSource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page]);

  const headers: IHeader[] = [
    { text: "ID", value: "id" },
    {
      text: "Name",
      value: "name",
      rowStyles: () => "cursor-pointer font-semibold text-blue-600",
      rowClick: (data: IUser) => getUserDetail(data.id),
    },
    { text: "Gender", value: "gender" },
    { text: "Email", value: "email" },
    {
      text: "Status",
      value: "status",
      rowStyles: (data: any) => {
        if (data.status === Status.ACTIVE) {
          return "px-4 w-[100px] flex justify-center items-center text-center py-1 border-2 border-green-500 text-green-500 font-semibold rounded-xl shadow-md"
        } else {
          return "px-4 w-[100px] flex justify-center items-center text-center py-1 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl shadow-md"
        }
      }
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-between items-center py-6 px-4 md:px-10">
        <h1 className="text-xl font-bold">User List</h1>
        <button
          onClick={handleToggleCreateUserModal}
          className="bg-green-500 px-4 py-2 rounded-md shadow-lg text-white"
        >
          Add User
        </button>
      </div>
      <div className="w-full py-6 px-4 md:px-10 flex justify-between">
        <div className="w-full flex-1">
          <input
            onChange={handleInputChange}
            onKeyDown={handleSearch}
            placeholder="Search User"
            type="text"
            value={searchText}
            className="focus:outline-none w-full px-4 py-3 shadow-md"
          />
        </div>
        <div className="flex text-white rounded-r-lg cursor-pointer hover:bg-green-500 bg-green-400 items-center justify-center px-6 shadow-lg">
          <span className="material-icons">search</span>
        </div>
      </div>
      <hr />
      {loading ? (
        <SkeletonLoader row={8} />
      ) : (
        <DataTable dataSource={dataSource} headers={headers} />
      )}

      <Pagination
        onPrevPage={() => setParams({ ...params, page: params.page - 1 })}
        onNextPage={() => setParams({ ...params, page: params.page + 1 })}
        currentPage={params.page}
        totalPages={500}
      />

      {/* 
        TODO: need to refactor
        Belum use DRY, gk sempet :( 
        */}
      <Modal
        key={"createUser"}
        headerTitle="Create User"
        isOpen={createUserModalOpen}
        onClose={handleToggleCreateUserModal}
      >
        <UserForm
          handleCreateUser={handleCreateUser}
          setLoading={setUserCreateLoading}
          loading={userCreateLoading}
          setCreateUserModalOpen={setCreateUserModalOpen}
        />
      </Modal>

      <Modal
        key={"editUser"}
        headerTitle="Edit User"
        isOpen={updateUserModalOpen}
        onClose={handleToggleUpdateUserModal}
      >
        <UserUpdateForm
          loading={userDetailLoading}
          setUpdateUserModalOpen={setUpdateUserModalOpen}
          userDetail={userDetail}
          handleUpdateUser={handleUpdateUser}
          handleDeleteUser={handleDeleteUser}
        />
      </Modal>

      { toast.ToastPortal() }
    </div>
  );
}
