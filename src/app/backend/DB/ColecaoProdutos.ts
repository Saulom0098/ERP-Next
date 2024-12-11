import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import Produtos from "../../core/Produtos";
import ProdutosRepositorio from "../../core/ProdutosRepositorio";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error("Configuração do Firebase:", firebaseConfig);
  throw new Error("Configuração do Firebase está incompleta. Verifique suas variáveis de ambiente.");
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default class ColecaoProdutos implements ProdutosRepositorio {
  private conversor = {
    toFirestore(produto: Produtos) {
      if (!produto.nome || produto.preco === undefined || produto.estoque === undefined) {
        throw new Error("Produto inválido. Certifique-se de que os campos obrigatórios estão preenchidos.");
      }

      return {
        nome: produto.nome,
        preco: produto.preco,
        estoque: produto.estoque,
        categoria: produto.categoria || null,
        descricao: produto.descricao || null,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Produtos {
      const dados = snapshot.data();
      if (!dados) {
         throw new Error(`Dados do documento "${snapshot.id}" estão vazios.`);
      }
      return new Produtos(
         dados.nome,
         Number(dados.preco),
         dados.estoque,
         dados.categoria,
         dados.descricao,
         snapshot.id // Confirma o ID do Firestore
      );
   }
   
  };

  async salvar(produto: Produtos): Promise<Produtos> {
    try {
      if (produto.id) {
        await setDoc(doc(db, "produtos", produto.id), this.conversor.toFirestore(produto));
      } else {
        const docRef = await addDoc(collection(db, "produtos"), this.conversor.toFirestore(produto));
        produto.id = docRef.id;
      }
      return produto;
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      throw new Error("Não foi possível salvar o produto.");
    }
  }

  async excluir(produto: Produtos): Promise<void> {
    if (!produto || !produto.id) {
       throw new Error("Produto inválido. O ID do produto é necessário para exclusão.");
    }
    try {
       await deleteDoc(doc(db, "produtos", produto.id)); // Exclui o documento do Firestore
    } catch (error) {
       console.error("Erro ao excluir produto:", error);
       throw new Error(`Não foi possível excluir o produto com ID "${produto.id}".`);
    }
 }
 
  
  async obterTodos(): Promise<Produtos[]> {
    try {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      return querySnapshot.docs.map((snapshot) =>
        this.conversor.fromFirestore(snapshot)
      );
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
      throw new Error("Não foi possível recuperar os produtos.");
    }
  }
}