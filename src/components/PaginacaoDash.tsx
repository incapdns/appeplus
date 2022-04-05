import React from 'react'

const PaginacaoDash = () => {
  return (
    <nav aria-label="Page navigation"  >
    <ul className="pagination justify-content-end mt-4 mb-4">
        <li className="page-item">
          <button className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
          <li  className="page-item">
            <button className= "page-link">
              1
            </button>
          </li>
          <li  className="page-item">
            <button className= "page-link">
              2
            </button>
          </li>
          <li  className="page-item">
            <button className= "page-link">
              3
            </button>
          </li>
          <li  className="page-item">
            <button className= "page-link">
              ...
            </button>
          </li>
          <li  className="page-item">
            <button className= "page-link">
              27
            </button>
          </li>
        <li className="page-item">
          <button className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
    </ul>
  </nav>
  )
}

export default PaginacaoDash
