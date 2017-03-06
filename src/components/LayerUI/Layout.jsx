import React, { Component,PropTypes } from 'react';
import './layer.scss';


const propTypes = {
  orient: PropTypes.string,
  align: PropTypes.string,
  pack: PropTypes.string,
  flex: PropTypes.bool,
  className: PropTypes.string
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.baseClassName = "layer_";
    this.className = "";
    this.styles = {};
  }

  render() {
    let self = this;
    let clsNames = this.baseClassName;
    let styleObj = "";

    if (this.props.orient === "row") {
      clsNames += "h";
    } else {
      clsNames += "v";
    }

    if (self.props.pack) {
      clsNames += "p" + self.props.pack.charAt(0);
    }
    if (self.props.align) {
      clsNames += "a" + self.props.align.charAt(0);
    }

    if(self.props.flex){
      clsNames += " layer_flex";
    }

    if (self.props.className) {
      clsNames += " " + self.props.className;
    }




    return (
      <div onClick={this.props.onClick} className={clsNames}>{this.props.children}</div>
    )
  }
}

Layout.defaultProps = {orient: "row"};
Layout.propTypes = propTypes;


export default Layout;

/*
 <LineLayout orient="row" pack="center" align="center" flex class="xxx">
 <LineLayout></LineLayout>
 </LineLayout>*/
