interface Botaoprops {
    cor?: 'green' | 'blue' | 'gray'
    className?: string
    children: any
    onClick?: () => void
}

export default function Botao(props: Botaoprops) {
    const cor = props.cor ?? 'gray';

    return (
        <button 
            onClick={props.onClick} 
            className={`
                bg-gradient-to-r from-${cor}-700 to-${cor}-500
                px-4
                py-2
                rounded-md
                text-white
                ${props.className}
            `}
        >
            {props.children}
        </button>
    );
}