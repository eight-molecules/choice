export const Overflowable = ({ children, x, y, }) => {
  if ((x && y) || (typeof x === 'undefined' && typeof y === 'undefined')) {
    return <div className="overflow-auto">{children}</div>
  } else if (x) {
    return <div className="overflow-y-auto">{children}</div>
  } else if (y) {
    return <div className="overflow-y-auto">{children}</div>
  } else {
    return children
  }
}

export default Overflowable;