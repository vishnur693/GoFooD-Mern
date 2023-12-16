import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <div className="col-md-4 d-flex align-items-center">
        <NavLink className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        </NavLink>
        <span className="text-muted">© 2023 GoFooD, Inc</span>
      </div>
    </div>
  )
}

export default Footer