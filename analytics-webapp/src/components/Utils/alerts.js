import React from 'react'
import { Alert } from 'reactstrap';

class MyAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: this.props.isVisible
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div style={{ position: "fixed", top: 50, left: 0, right: 0, zIndex: 999 }}>
      <Alert color={this.props.type} isOpen={this.state.visible} toggle={this.onDismiss}>
        {this.props.message}
      </Alert>
      </div>
    );
  }
}

export default MyAlert;