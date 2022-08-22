import React, { Component } from 'react';

export default class Description extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.state = {
      parrent: null,
    };
  }

  componentDidMount() {
    this.setState({ parrent: false });
  }

  render() {
    const { description } = this.props;
    const parser = new DOMParser();
    const parsed = parser.parseFromString(`<div>${description}</div>`, 'text/html').body.firstChild;
    if (this.state.parrent) {
      document.getElementById('desc').innerHTML = '';
      document.getElementById('desc').appendChild(parsed);
    }
    return (
      <>
        <div
          id="desc"
          className="text-Description"
          ref={this.divRef}
        />
        {this.divRef.current && !this.state.parrent ? (this.setState({ parrent: this.divRef.current })) : ''}
      </>
    );
  }
}
