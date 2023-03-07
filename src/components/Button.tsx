interface ButtonType {
    className: string;
    text: string;
    onClick: () => void;
}
export default function Button({ className, text, onClick }: ButtonType) {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
}
