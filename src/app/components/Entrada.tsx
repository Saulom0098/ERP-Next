import Botao from "./Botao"

interface EntradaProps {
    valor: any
    id: string
    nome: string
    preco: number
    estoque: number
    categoria: string
    descricao: string
    tipo?: "text" | "number"
    texto: string
    somenteLeitura: boolean
    className?: string
    valorMudou?: (valor: any) => void
}

export default function Entrada(props: EntradaProps) {
    const id = props.texto.toLowerCase().replace(/\s+/g, "-"); // Gera um id único baseado no texto do label

    return (
        <div className={`flex flex-col ${props.className}`}>
            <label htmlFor={id} className="mb-2 font-bold">{props.texto}</label>
            <input
                id={id}
                name={id}
                type={props.tipo ?? "text"}
                value={props.valor}
                readOnly={props.somenteLeitura}
                onChange={(e) => props.valorMudou?.(e.target.value)}
                className={`
                    border border-gray-300 rounded-lg px-4 py-2
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${props.somenteLeitura ? "bg-gray-200" : "bg-white"}
                `}
            />
        </div>
    );
}