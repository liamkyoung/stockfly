import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(e) {
    const target = e.target;
    const name = target.name;

    await this.setState({ [name]: target.value });
    this.props.handler(this.state.selected);
  }

  async handleSubmit(e) {
    await this.setState({ selected: !this.state.selected });
    this.props.handler(this.state.selected);
  }

  /*
  componentDidUpdate (prevProps) {
    if (prevProps.reset !== this.props.reset) {
      this.setState({
        days: ''
      })
    }
  }
  */

  render() {
    return (
      <div className="container">
        <div className="d-flex flex-row">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Checkbox
                aria-label="Checkbox for following text input"
                onChange={this.handleSubmit}
              />
            </InputGroup.Prepend>
          </InputGroup>
          <h5>{this.props.pHolder}</h5>
        </div>
      </div>
    );
  }
}

export default Options;
