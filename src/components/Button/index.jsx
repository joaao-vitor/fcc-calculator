import './Button.scss'

export default function Button({ symbol, className, id, onClick, operation = false, colSpan = 0, rowSpan = 0 }) {
  return (
    <button
    onClick={onClick}
      id={id ? id : null}
      className={`action-btn ${className ? className : ''}`}
      style={{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}`, backgroundColor: operation ? 'rgb(113 113 122)' : '' }}>{symbol}</button>
  )
}
