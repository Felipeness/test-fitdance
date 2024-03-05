import React, { useState, useEffect } from "react";
import {
  createUser,
  updateUser,
  activateUser,
  inactivateUser,
} from "../../api/sdkgenApi";
import "./userModal.scss";

const UserModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    birthDate: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      const formattedUser = {
        ...user,
        birthDate: user.birthDate
          ? new Date(user.birthDate).toISOString().split("T")[0]
          : "", // Formata a data
      };
      setFormData(formattedUser);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleActiveStatus = async () => {
    if (user && user.isActive) {
      // Usuário está ativo, solicite o motivo da desativação
      const reason = window.prompt("Motivo da desativação (opcional):");
      try {
        await inactivateUser(user.id, reason);
      } catch (error) {
        console.error("Erro ao desativar usuário", error);
      }
    } else {
      try {
        await activateUser(user.id);
      } catch (error) {
        console.error("Erro ao ativar usuário", error);
      }
    }
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await updateUser(user.id, formData);
    } else {
      await createUser(formData);
    }
    onClose();
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="username"
          />
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />

          <label htmlFor="birthDate">Data de Nascimento:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />

          <label htmlFor="password">Nova Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password" // Dica do back do rpc
          />

          <button type="button" onClick={handleToggleActiveStatus}>
            {user && user.isActive ? "Desativar" : "Ativar"} Usuário
          </button>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
