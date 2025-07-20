// src/types/Pedido.ts

export interface ItemPedido {
  produto: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Pedido {
  id: string;
  cliente: string;
  dataCriacao: string;
  itens: ItemPedido[];
  total: number;
}

export interface NovoPedido {
  cliente: string;
  itens: ItemPedido[];
  total: number;
}

