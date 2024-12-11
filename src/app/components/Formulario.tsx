import React, { Dispatch, SetStateAction } from "react";
import Entrada from "./Entrada";
import Botao from "./Botao";
import Produtos from "../core/Produtos";

interface FormularioProps {
  produto: Produtos;
  produtoMudou?: (produto: Produtos) => void;
  cancelado?: () => void;
}

export default function Formulario({ produto, produtoMudou, cancelado }: FormularioProps) {
  const [nome, setNome] = React.useState(produto?.nome ?? "");
  const [preco, setPreco] = React.useState(produto?.preco ?? 0);
  const [estoque, setEstoque] = React.useState(produto?.estoque ?? 0);
  const [categoria, setCategoria] = React.useState(produto?.categoria ?? "");
  const [descricao, setDescricao] = React.useState(produto?.descricao ?? "");

  function enviarFormulario() {
    if (produtoMudou) {
      produtoMudou(
        new Produtos(nome, preco, estoque, categoria, descricao, produto?.id)
      );
    }
  }

  return (
    <div>
      <Entrada
        texto="Nome"
        valor={nome}
        valorMudou={setNome}
        className="mb-5"
        aria-label="Nome do produto"
      />
      <Entrada
        texto="Preço"
        tipo="number"
        valor={preco}
        valorMudou={setPreco}
        className="mb-5"
        aria-label="Preço do produto"
      />
      <Entrada
        texto="Estoque"
        tipo="number"
        valor={estoque}
        valorMudou={setEstoque}
        className="mb-5"
        aria-label="Quantidade em estoque"
      />
      <Entrada
        texto="Categoria"
        valor={categoria}
        valorMudou={setCategoria}
        className="mb-5"
        aria-label="Categoria do produto"
      />
      <Entrada
        texto="Descrição"
        valor={descricao}
        valorMudou={setDescricao}
        className="mb-5"
        aria-label="Descrição do produto"
      />
      <div className="flex justify-end mt-7">
        <Botao cor="blue" className="mr-2" onClick={enviarFormulario}>
          Salvar
        </Botao>
        <Botao cor="gray" onClick={cancelado}>
          Cancelar
        </Botao>
      </div>
    </div>
  );
}
