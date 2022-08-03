import * as React from "react"
import NavigationBar from "./navigation-bar"

const FunctionLayout = ({ title, children }) => {
    return (
      <div className="wrapper">
        <NavigationBar title={title}></NavigationBar>
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
