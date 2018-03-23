import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class NewProfile extends Component{

  constructor(props) {
    super(props);
    this.state = {};
    this.handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable >
        <Menu.Item>
          <img src='/img/logo.png' />
        </Menu.Item>

        <Menu.Item
          name='Applications'
          active={activeItem === 'Applications'}
          onClick={this.handleItemClick}
        >
          Applications
        </Menu.Item>

        <Menu.Item
          name='Jobs'
          active={activeItem === 'Jobs'}
          onClick={this.handleItemClick}
        >
          Jobs
        </Menu.Item>

        <Menu.Item
          name='Chat'
          active={activeItem === 'Chat'}
          onClick={this.handleItemClick}
        >
          Chat
        </Menu.Item>
      </Menu>
    );
  }
}
