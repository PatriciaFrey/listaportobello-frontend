import axios from "axios";
import { Pedido } from "../types/Pedido"; // ajuste o caminho se necessário

const API_URL = "http://localhost:8080";

export const pedidoService = {
  async listar(): Promise<Pedido[]> {
    const response = await axios.get<Pedido[]>(`${API_URL}/pedidos`);
    return response.data;
  },

  // Esse método é idêntico ao listar(), então pode ser removido se não for usado separadamente
  async listarTodos(): Promise<Pedido[]> {
    const response = await axios.get<Pedido[]>(`${API_URL}/pedidos`);
    return response.data;
  },

  async criar(pedido: Omit<Pedido, 'id'>): Promise<Pedido> {
    const response = await axios.post<Pedido>(`${API_URL}/pedidos`, pedido);
    return response.data;
  }
};

