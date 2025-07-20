import axios from "axios";
import { Pedido, NovoPedido } from "../types/Pedido";
import api from "./api";

const API_URL = "http://localhost:8080";


export const pedidoService = {
  async listar(): Promise<Pedido[]> {
    const response = await axios.get<Pedido[]>(`${API_URL}/pedidos`);
    return response.data;
  },

  async listarTodos(): Promise<Pedido[]> {
    const response = await axios.get<Pedido[]>(`${API_URL}/pedidos`);
    return response.data;
  },

  async criar(pedido: NovoPedido): Promise<Pedido> {
    const response = await axios.post<Pedido>(`${API_URL}/pedidos`, pedido);
    return response.data;
  }

};
  export async function deletarPedido(id: string) {
  await api.delete(`/pedidos/${id}`);
}