const Textarea = ({ className, placeholder, value, onChange }) => {
  return (
    <textarea
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default Textarea;