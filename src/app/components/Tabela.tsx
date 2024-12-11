
import React from "react";
import Produtos from "../core/Produtos";
import { IconeEdicao, iconeLixo } from "./icones";

interface TabelaProps {
  produtos: Produtos[];
  produtoSelecionado?: (produto: Produtos) => void;
  produtoExcluido?: (produto: Produtos) => void;
}

export default function Tabela(props: TabelaProps) {
  const { produtos, produtoSelecionado, produtoExcluido } = props;

  // Verifica se há ações disponíveis (editar ou excluir)
  const exibirAcoes = produtoSelecionado || produtoExcluido;

  // Renderiza os cabeçalhos da tabela
  function renderizarCabecalho() {
    return (
      <tr>
        <th className="text-left p-4">ID</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Preço</th>
        <th className="text-left p-4">Estoque</th>
        <th className="text-left p-4">Categoria</th>
        <th className="text-left p-4">Descrição</th>
        {exibirAcoes && <th className="text-center p-4">Ações</th>}
      </tr>
    );
  }

  // Renderiza as ações (editar/excluir) para cada linha
  function renderizarAcoes(produto: Produtos) {
    return (
      <td className="flex justify-center items-center p-2">
        {produtoSelecionado && (
          <button
            onClick={() => produtoSelecionado(produto)}
            className="flex justify-center items-center text-green-500 rounded-full hover:bg-purple-100 p-2"
          >
            {IconeEdicao}
          </button>
        )}
        {produtoExcluido && (
          <button
            onClick={() => produtoExcluido(produto)}
            className="flex justify-center items-center text-red-500 rounded-full hover:bg-purple-100 p-2"
          >
            {iconeLixo}
          </button>
        )}
      </td>
    );
  }

  // Renderiza os dados dos produtos
  function renderizarDados() {
    return produtos.map((produto, index) => (
      <tr
        key={produto.id}
        className={`${index % 2 === 0 ? "bg-purple-200" : "bg-cyan-400"}`}
      >
        <td className="text-left p-4">{produto.id}</td>
        <td className="text-left p-4">{produto.nome}</td>
        <td className="text-left p-4">R$ {produto.preco.toFixed(2)}</td>
        <td className="text-left p-4">{produto.estoque}</td>
        <td className="text-left p-4">{produto.categoria}</td>
        <td className="text-left p-4">{produto.descricao}</td>
        {exibirAcoes && renderizarAcoes(produto)}
      </tr>
    ));
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className="bg-gradient-to-r from-purple-800 to-purple-400 text-gray-300">
        {renderizarCabecalho()}
      </thead>
      <tbody>{renderizarDados()}</tbody>
    </table>
  );
}
