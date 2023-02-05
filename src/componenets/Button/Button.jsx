const Button = ({ className, text, onClick, disabled }) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>{text}</button>
  )
}

export default Button;