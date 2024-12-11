export default class Produtos {
    #id: string;
    #nome: string;
    #preco: number;
    #estoque: number;
    #categoria: string;
    #descricao: string;

    // Propriedade estática para controlar o próximo ID
    static nextId: number = 1;

    constructor(nome: string, preco: number, estoque: number, categoria: string, descricao: string) {
        this.#id = Produtos.nextId.toString(); // Converte o ID para string
        Produtos.nextId++; // Incrementa o próximo ID
        this.#nome = nome;
        this.#preco = preco;
        this.#estoque = estoque;
        this.#categoria = categoria;
        this.#descricao = descricao;
    }

    static vazio() {
        return new Produtos("", 0, 0, "", "");
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get preco() {
        return this.#preco;
    }

    get estoque() {
        return this.#estoque;
    }

    get categoria() {
        return this.#categoria;
    }

    get descricao() {
        return this.#descricao;
    }
}