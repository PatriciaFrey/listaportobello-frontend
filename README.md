
#  Sistema de Pedidos B2B - Frontend

Este projeto é o frontend de um sistema de gestão de pedidos B2B, desenvolvido em **React com TypeScript**, com estilização via **styled-components** e comunicação com um backend Java via API REST.

## Funcionalidades

- Cadastro de pedidos com cliente, produtos, quantidades e preço.
- Listagem dos pedidos com cálculo do valor total.
- Filtro de pedidos por nome do cliente.
- Exclusão de pedidos com atualização da lista em tempo real.
- Interface responsiva e estilizada com `styled-components`.

## Estrutura do Projeto

```
listaportobello-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── PedidoForm.tsx         # Formulário de criação de pedido
│   │   └── PedidoList.tsx         # Lista de pedidos com opção de exclusão
│   ├── services/
│   │   └── pedidoService.ts       # Comunicação com a API
│   ├── types/
│   │   └── Pedido.ts              # Tipagem do modelo de dados
│   ├── App.tsx                    # Componente principal
│   └── index.tsx                  # Ponto de entrada do React
├── package.json
└── tsconfig.json
```

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/)
- [Axios](https://axios-http.com/) (via `pedidoService.ts`)

## Como rodar o projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Backend rodando na porta correta (ex: `http://localhost:8080`)

### Passo a passo

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/listaportobello-frontend.git
cd listaportobello-frontend
```

2. **Instale as dependências**:

```bash
npm install
# ou
yarn
```

3. **Configure a URL da API (se necessário)**  
No arquivo `pedidoService.ts`, ajuste a URL da API conforme o backend:

```ts
const API_URL = 'http://localhost:8080/pedidos';
```

4. **Inicie a aplicação**:

```bash
npm start
# ou
yarn start
```

O sistema será aberto no navegador em `http://localhost:3000`.

## Contato

Desenvolvido por Patricia Frey  
Email: patricia.frey@gmail.com  
LinkedIn:(https://www.linkedin.com/in/patricia-frey-7645131a5/)
Git:https://github.com/PatriciaFrey
