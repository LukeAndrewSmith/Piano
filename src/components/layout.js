/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import NavigationBar from "./navigation-bar"
import "./layout.css"

const Layout = ({ title, children }) => {
  return (
    <>
      <NavigationBar siteTitle={title} />
      <div
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
