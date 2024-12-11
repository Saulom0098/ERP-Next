import Produtos from "./Produtos";

export default interface ProdutosRepositorio {
    salvar(produtos: Produtos): Promise<Produtos>;
    excluir(produtos: Produtos): Promise<void>;
    obterTodos(): Promise<Produtos[]>;
}