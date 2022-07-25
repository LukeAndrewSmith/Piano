import * as React from "react"
import Header from "./header"

const FunctionLayout = ({ title, children }) => {
    return (
      <div className="wrapper">
        <Header title={title}></Header>
        <main className="page-main">
            {children}
        </main>
        {/* <footer className="page-footer">
          <></>
        </footer> */}
      </div>
    )
}

export default FunctionLayout
