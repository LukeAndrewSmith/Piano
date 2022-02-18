import * as React from "react"
import Dropdown from "react-bootstrap/Dropdown"
import { Link } from "gatsby"

const Header = ({ title }) => {
    return (
        <header class="page-header">
        <nav>
            <h2 class="logo">
            {title}
            </h2>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Function
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/exercise-analysis">Exercise Analysis</Link></Dropdown.Item>
                    <Dropdown.Item><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">(Pedal Analysis)</Link></Dropdown.Item>
                    <Dropdown.Item><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">(Chord Analysis)</Link></Dropdown.Item>
                    <Dropdown.Item><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">(Piece Analysis)</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </nav>
        </header>
    )
}

export default Header