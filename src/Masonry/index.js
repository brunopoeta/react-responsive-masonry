import PropTypes from "prop-types"
import React from "react"

class Masonry extends React.Component {
  getColumns() {
    const {children, columnsCount} = this.props
    let columns
    let handledColumnsCount = columnsCount
    let validItems = 0

    React.Children.forEach(children, (child, index) => {
      if (
        child &&
        React.isValidElement(child) &&
        Boolean(child.type) !== null
      ) {
        validItems++
      }
    })

    if (columnsCount > validItems) {
      handledColumnsCount = validItems
    }

    columns = Array.from({length: handledColumnsCount}, () => [])

    React.Children.toArray(children)
      .filter((child, index) => {
        return (
          child && React.isValidElement(child) && Boolean(child.type) !== null
        )
      })
      .forEach((child, index) => {
        if (
          child &&
          React.isValidElement(child) &&
          Boolean(child.type) !== null
        ) {
          columns[index % handledColumnsCount].push(child)
        }
      })

    return columns
  }

  renderColumns() {
    const {gutter} = this.props
    return this.getColumns().map((column, i) => (
      <div
        key={`masonryColumn${i}`}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignContent: "stretch",
          flex: 1,
          width: 0,
          gap: gutter,
        }}
      >
        {column.map((item) => item)}
      </div>
    ))
  }

  render() {
    const {gutter, className, style} = this.props
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "stretch",
          boxSizing: "border-box",
          width: "100%",
          gap: gutter,
          ...style,
        }}
        className={className}
      >
        {this.renderColumns()}
      </div>
    )
  }
}

Masonry.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  columnsCount: PropTypes.number,
  gutter: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

Masonry.defaultProps = {
  columnsCount: 3,
  gutter: "0",
  className: null,
  style: {},
}

export default Masonry
