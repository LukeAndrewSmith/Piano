import * as React from "react"
import Header from "./header"

const FunctionLayout = ({ title, children }) => {
    return (
      <div class="wrapper">
        <header class="page-header">
            <Header title={title}></Header>
        </header>
        <main class="page-main">
            {children}
        </main>
        <footer class="page-footer">
          <></>
        </footer>
      </div>
    )
}

export default FunctionLayout
