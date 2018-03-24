import React from 'react';
import {
  Container,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';

import MenuContainer from '../containers/MenuContainer';

const LandingPageHeading = () => (
  <Segment inverted color='teal' padded='very' vertical>
    <Container textAlign='center'>
      <Header
        as='h1'
        content='MakeItHire'
        inverted
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
        }}
      />
      <Header
        as='h2'
        content='Hiring made simple'
        inverted
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
        }}
      />
    </Container>
  </Segment>
);

const LandingPage = () => (
  <MenuContainer >
    <LandingPageHeading />
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>Lorem Ipsum</Header>
            <p style={{ fontSize: '1.33em' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempor dolor a urna semper egestas.
              In hac habitasse platea dictumst. Duis porta ex ac justo egestas placerat. Donec at ante porttitor,
              facilisis orci eu, pulvinar erat. Aliquam sollicitudin odio vitae magna dictum finibus. Sed placerat
              congue augue sed pharetra. Praesent tempus malesuada sem. Donec scelerisque finibus elementum.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>Lorem Ipsum</Header>
            <p style={{ fontSize: '1.33em' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempor dolor a urna semper egestas.
              In hac habitasse platea dictumst. Duis porta ex ac justo egestas placerat. Donec at ante porttitor,
              facilisis orci eu, pulvinar erat. Aliquam sollicitudin odio vitae magna dictum finibus. Sed placerat
              congue augue sed pharetra. Praesent tempus malesuada sem. Donec scelerisque finibus elementum.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image
              bordered
              rounded
              size='large'
              src='/img/hired.jpg'
            />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>&ldquo;Best website to find a job as a student!&rdquo;</Header>
            <p style={{ fontSize: '1.33em' }}>Fake Review Magazine</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>&ldquo;These CS Students really deserve an A&rdquo;</Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/img/grr.jpg' />
              Prof. Gustavo
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Privacy Policy</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Register Your Company</List.Item>
                <List.Item as='a'>Apply to Jobs</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>Footer</Header>
              <p>MakeItHire was built for Purdue&apos;s CS 407 class</p>
              <p>Copyright 2018 All rights reserved. Built with ♥ by Team 23</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </MenuContainer>
);

export default LandingPage;
