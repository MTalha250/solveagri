import styles from "./AlternatingButton.module.css"

interface AlternatingButtonProps {
    text: string;
    alternateText: string;
    onClick?: (e: any) => void | Promise<void>;
    disabled?: boolean;
    textColour?: string;
    type?: "button" | "submit" | "reset" | undefined;
}

const AlternatingButton:React.FC<AlternatingButtonProps> = ({
    text,
    alternateText,
    onClick,
    type = "button",
    textColour = "white",
    disabled = false
}) => {
    return (
        <button type={type} onClick={onClick} className={`${styles.button_57} ${textColour? `text-${textColour} border border-green-700` : "border border-green-900"} ${disabled ? styles.button_disabled: ""}`} role="button"><span className={styles.text}>{text}</span>
        <span>
        {alternateText}    
        </span></button>
    )
}

export default AlternatingButton