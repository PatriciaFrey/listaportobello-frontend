export interface Pedido {
  id: string;
  cliente: string;
  produto: string;
  quantidade: number;
  valorTotal: number;
  data: string; // ou Date, dependendo do backend
}

