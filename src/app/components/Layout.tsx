import Titulo from "./Titulo";

interface LayoutProps {
    titulo: string
    children: any
};

export default function Layout(props: LayoutProps) { // Adicionado o tipo 'LayoutProps' aos props
    return (
        <div className={`
        flex flex-col w-4/5
        bg-white text-gray-900
        `}>
            <Titulo>{props.titulo}</Titulo> 
            <div className="p-5">
                {props.children}
            </div>
        </div>
    );
};