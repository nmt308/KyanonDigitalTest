interface InputType {
    type?: string;
    value: string;
    label: string;
    labelColor?: string;
    placeholder?: string;
    marginLabel?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({ type, label, labelColor, placeholder, marginLabel, value, onChange }: InputType) {
    return (
        <div className="form-group">
            <div className="form-label" style={{ color: labelColor, margin: marginLabel }}>
                {label}
            </div>
            <div className="form-input">
                <input placeholder={placeholder} value={value} onChange={onChange} type={type} />
            </div>
        </div>
    );
}
