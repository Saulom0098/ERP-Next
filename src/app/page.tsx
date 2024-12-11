"use client";

import { useEffect, useState } from "react";
import Botao from "./components/Botao";
import Formulario from "./components/Formulario";
import Layout from "./components/Layout";
import Tabela from "./components/Tabela";
import Produtos from "./core/Produtos";
import ProdutosRepositorio from "./core/ProdutosRepositorio";
import ColecaoProdutos from "./backend/DB/ColecaoProdutos";
import useProdutos from "./hooks/UseProdutos";

export default function Home() {
  const { produtoExcluido, produto, produtos, produtoSelecionado, setVisivel, salvarProduto, novoProduto, visivel } = useProdutos();

  return (
    <div className="bg-gradient-to-r from-gray-600 via-cyan-400 to-cyan-900 flex h-screen justify-center items-center rounded-xl">
      <Layout titulo="Produtos">
        {visivel === "tabela" ? (
          <>
            <div className="flex justify-end">
              <Botao
                cor="green"
                className="mb-4 bg-blue-400"
                onClick={novoProduto}
                aria-label="Adicionar novo produto"
              >
                Novo Produto
              </Botao>
            </div>
            <Tabela
              produtos={produtos}
              produtoSelecionado={produtoSelecionado}
              produtoExcluido={produtoExcluido}
            />
          </>
        ) : (
          <Formulario
            produto={produto}
            produtoMudou={salvarProduto}
            cancelado={() => setVisivel("tabela")}
          />
        )}
      </Layout>
    </div>
  );
}