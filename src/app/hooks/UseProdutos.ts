import { useState, useEffect } from "react"; // Importar useState e useEffect
import Produtos from "../core/Produtos";
import ColecaoProdutos from "../backend/DB/ColecaoProdutos";
import ProdutosRepositorio from "../core/ProdutosRepositorio";

export default function useProdutos() {
    const repo: ProdutosRepositorio = new ColecaoProdutos();

    const [produto, setProduto] = useState<Produtos>(Produtos.vazio());
    const [produtos, setTodosProdutos] = useState<Produtos[]>([]);
    const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");
    const [erro, setErro] = useState<string | null>(null); // Estado para erro

    const obterTodos = async () => {
        try {
            const produtosObtidos = await repo.obterTodos();
            setTodosProdutos(produtosObtidos);
            setVisivel("tabela");
            setErro(null); // Limpar erro ao obter produtos com sucesso
        } catch (error) {
            console.error("Erro ao obter produtos:", error);
            setErro("Erro ao obter produtos."); // Definir mensagem de erro
        }
    };

    useEffect(() => {
        obterTodos();
    }, []);

    const produtoSelecionado = (produto: Produtos) => {
        setProduto(produto);
        setVisivel("form");
    };

    const produtoExcluido = async (produto: Produtos) => {
        if (!produto || !produto.id) {
           setErro("Produto inválido."); // Valida o ID do produto
           return;
        }
        try {
           await repo.excluir(produto); // Remove do repositório
           await obterTodos(); // Atualiza a lista após exclusão
           setErro(null); // Limpa erros
        } catch (error) {
           console.error("Erro ao excluir produto:", error);
           setErro("Erro ao excluir produto."); // Mostra erro para o usuário
        }
     };
     

    const novoProduto = () => {
        setProduto(Produtos.vazio());
        setVisivel("form");
    };

    const salvarProduto = async (produto: Produtos) => {
        try {
            await repo.salvar(produto);
            await obterTodos();
            setErro(null); // Limpar erro ao salvar com sucesso
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            setErro("Erro ao salvar produto."); // Definir mensagem de erro
        }
    };

    return {
        produto,
        produtos,
        visivel,
        erro, // Retornar o estado de erro
        obterTodos,
        produtoSelecionado,
        produtoExcluido,
        novoProduto,
        salvarProduto,
    };
}