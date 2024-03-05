import React, { useEffect, useState } from "react";
import { getUserList, deleteUser } from "../../api/sdkgenApi";
import UserModal from "../Modal/UserModal";
import "./dataTable.scss";
import { XCircle, Pencil, Check } from "lucide-react";
import CreateUserModal from "@components/Modal/CreateUser/CreateUserModal";
import { Pagination } from "@components/Pagination/Pagination";

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleUserCreated = () => {
    fetchUsers();
  };

  const fetchUsers = async () => {
    const userList = await getUserList();
    setUsers(userList);
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    fetchUsers(); // Refresh user list after deletion
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div>
      <div className="datatable-container">
        <h1>Usuários</h1>
        <div className="header-table">
          <div className="header-h2">
            <h2>Lista</h2>
            <h2>Informações</h2>
          </div>
          <button onClick={() => setIsCreateModalOpen(true)}>
            Criar Novo Usuário
          </button>
          <CreateUserModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onUserCreated={handleUserCreated}
          />
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isActive ? "Ativo" : "Inativo"}</td>
                <td className="action-buttons">
                  <div>
                    {user.deletedAt ? (
                      <Check color="#595959" />
                    ) : (
                      <Check color="#00ff00" />
                    )}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="delete">
                      <XCircle />
                    </button>
                    <button onClick={() => handleEdit(user)} className="edit">
                      <Pencil />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <UserModal user={editingUser} onClose={handleCloseModal} />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default DataTable;
