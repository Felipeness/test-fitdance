import React, { useState } from "react";
import { createUser } from "@api/sdkgenApi";
import "./createUserModal.scss";

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, cpf, birthDate, password };
    try {
      await createUser(userData);
      onUserCreated();
      onClose();
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-user-modal">
      <div className="modal-content">
        <h2>Criar Novo Usuário</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </label>
          <label>
            Data de nascimento:
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Criar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
