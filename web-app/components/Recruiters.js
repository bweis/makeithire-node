import React, { Component } from 'react';

import { Grid, Header, Card, Button, Modal, Input } from 'semantic-ui-react';

import { requestRecruiter, adminAddRecruiter, adminDeleteRecruiter } from '../helpers/api';

class Recruiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRemove: false,
      openAdd: false,
      recruiterToRemove: '',
      recruiterToAdd: '',
    };
    console.log(this.props);
    this.makeTiles = this.makeTiles.bind(this);
    this.showRemove = this.showRemove.bind(this);
    this.showAdd = this.showAdd.bind(this);
    this.hideRemove = this.hideRemove.bind(this);
    this.hideAdd = this.hideAdd.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getHR() {
    if (this.props.user.isAdmin) {
    return (<Card.Group>
      <Card fluid key={this.props.headRecruiter.idUser}>
        <Card.Content>
          <Card.Header>{this.props.headRecruiter.FirstName} {this.props.headRecruiter.LastName}</Card.Header>
          <Card.Meta>Head Recruiter</Card.Meta>
        </Card.Content>
      </Card>
    </Card.Group>)}
  }
  handleClick(e, { name, value }) {
    this.setState({ [ name ]: value });
  }

  showRemove(e, { userID }) {
    this.setState({
      openRemove: true,
      recruiterToRemove: userID
    });
  }

  showAdd() {
    this.setState({
      openAdd: true,
      recruiterToAdd: ''
    });
  }

  hideRemove() {
    this.setState({
      openRemove: false,
      recruiterToRemove: ''
    });
  }

  hideAdd() {
    this.setState({
      openAdd: false,
      recruiterToAdd: ''
    });
  }

  remove() {
    var idUser = {
      idUser: this.state.recruiterToRemove
    };
    adminDeleteRecruiter((res) => {
      if (!res) {
        console.log('could not delete recruiter');
      } else {
        console.log('deleted ' + idUser);
        this.setState({recruiterToRemove: ''});
        this.forceUpdate();
      }
    }, idUser)
  }

  add() {
    var emailID = {
      EmailID: this.state.recruiterToAdd
    };
    if (this.props.user.isAdmin) {
      adminAddRecruiter((res) => {
        if (!res) {
          console.log('Could not add recruiter');
        } else {
          console.log('added! ' + this.state.recruiterToAdd)
          this.forceUpdate();
        }
      }, emailID);
    } else {
      requestRecruiter((res) => {
        if (!res) {
          console.log('Could not add recruiter');
        } else {
          console.log('added! ' + this.state.recruiterToAdd)
          this.forceUpdate();
        }
      }, emailID);
    }
    this.hideAdd();
  }

  handleChange(e, { name, value }) {
    this.setState({ [ name ]: value });
  }

  makeTiles() {
    return this.props.companyRecruiters.map((item, key) => (
      <Card fluid key={key}>
        <Card.Content>
          <Card.Header>{item.FirstName} {item.LastName}</Card.Header>
          <Card.Meta>Recruiter</Card.Meta>
        </Card.Content>
        <Card.Content extra><Button basic color='red' userID={item.idUser} onClick={this.showRemove}>Remove Recruiter</Button></Card.Content>
      </Card>
    ));
  }

  render() {
    return (
      <Grid.Column>
        {this.props.user.isAdmin &&
        <Grid.Row>
          <Header size='large'>
            Head Recruiter
          </Header>
        </Grid.Row>}
        {this.getHR()}
        <Grid.Row>
          <Header size='Medium'>
            Recruiters <Button circular icon='add user' size='small' floated='right' onClick={this.showAdd}/>
          </Header>
        </Grid.Row>
        <Card.Group>
          {this.makeTiles()}
        </Card.Group>
        <Modal size='tiny' open={this.state.openRemove} onClose={this.hideRemove}>
          <Modal.Header>
            Delete Your Account
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete {this.state.recruiterToRemove}?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.hideRemove}>
              No
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.remove}/>
          </Modal.Actions>
        </Modal>
        <Modal size='tiny' open={this.state.openAdd} onClose={this.hideAdd}>
          <Modal.Header>
            Add Recruiter
          </Modal.Header>
          <Modal.Content>
            <p>Enter the email address of the recruiter you wish to add</p>
            <Input fluid name='recruiterToAdd' placeholder='Recruiter email' onChange={this.handleChange}/>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.hideAdd}>
              No
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.add}/>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    );
  }
}

export default Recruiter;
