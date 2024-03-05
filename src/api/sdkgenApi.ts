import { ApiClient } from "./web-client";

const apiBaseUrl = "http://localhost:3000";
const apiClient = new ApiClient(apiBaseUrl);
import { toast } from "sonner";

// Lista todos os usuários
export const getUserList = async () => {
  try {
    const users = await apiClient.getAllUsers();
    return users;
  } catch (error) {
    console.error("Erro ao buscar usuários", error);
    toast.error("Erro ao buscar usuários!", error);
    throw error;
  }
};

// Cria um novo usuário
export const createUser = async (userData) => {
  try {
    const newUser = await apiClient.createUser({ user: userData });
    toast.success("Usuário criado com sucesso!");
    return newUser;
  } catch (error) {
    console.error("Erro ao criar usuário", error);
    toast.error("Erro ao criar usuário!", error);
    throw error;
  }
};

// Edita um usuário existente
export const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await apiClient.updateUser({
      id: userId,
      user: userData,
    });
    toast.success("Usuário atualizado com sucesso!");
    return updatedUser;
  } catch (error) {
    console.error("Erro ao editar usuário", error);
    toast.error("Erro ao editar usuário!", error);
    throw error;
  }
};

// Exclui um usuário
export const deleteUser = async (userId) => {
  try {
    const isDeleted = await apiClient.deleteUser({ userId });
    toast.success("Usuário excluído com sucesso!");
    return isDeleted;
  } catch (error) {
    console.error("Erro ao excluir usuário", error);
    toast.error("Erro ao excluir usuário!", error);
    throw error;
  }
};

export const activateUser = async (userId) => {
  try {
    const result = await apiClient.activateUser({ userId });
    if (result) {
      toast.success("Usuário ativado com sucesso!");
    }
    return result;
  } catch (error) {
    console.error("Erro ao ativar usuário", error);
    toast.error("Erro ao ativar usuário!");
    throw error;
  }
};

// Função para desativar um usuário
export const inactivateUser = async (userId, reason = "") => {
  try {
    const result = await apiClient.inactivateUser({ userId, reason });
    if (result) {
      toast.success("Usuário desativado com sucesso.");
    }
    return result;
  } catch (error) {
    console.error("Erro ao desativar usuário", error);
    toast.error("Erro ao desativar usuário!");
    throw error;
  }
};
