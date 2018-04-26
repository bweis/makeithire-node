import React, { Component } from 'react';
import { ThemeProvider, ChatList, ChatListItem, Avatar, Column, TextInput, SendButton, Row, Title, Subtitle, TextComposer, MessageList, Message, MessageGroup, MessageButtons, MessageMedia, MessageTitle, MessageText, FixedWrapper } from '@livechat/ui-kit'
import { getUserDetails, getStudentChats, getRecruiterChats} from '../helpers/api'
import { Button, Input, Grid, TextArea, Image, Form, Header  } from 'semantic-ui-react';
import axios from 'axios/index';

import MenuContainer from '../containers/MenuContainer';

const c = [
    {
        company: 'Salesforce',
        recruiter: 'Zack',
        time: '2:00pm',
        id: 0,
    },
    {
        company: 'Google',
        recruiter: 'Ben',
        time: '1:00pm',
        id: 1,
    },
    {
        company: 'Amazon',
        recruiter: 'Josh',
        time: '12:00pm',
        id: 2,
    },
];

const m = [
    {
        chatid: '0',
        message: 'Message 1 test',
        sender: 175,
        time: '11:59am'
    },
    {
        chatid: '0',
        message: 'Message 2 test',
        sender: 0,
        sender: 'recruiter',
        time: '12:00pm'
    },
    {
        chatid: '0',
        message: 'Message 3 test',
        sender: 0,
        time: '12:15pm'
    },
    {
        chatid: '0',
        message: 'Message 4 test',
        sender: 175,
        time: '12:30pm'
    },
    {
        chatid: '0',
        message: 'Message 5 test',
        sender: 0,
        time: '1:00pm'
    },
    {
        chatid: '0',
        message: 'Message 6 test',
        sender: 175,
        time: '1:30pm'
    },

];

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            messages: [],
            message: '',
            chatid: '',
            userInfo: {},
            selectedChat: '',
            chatSelected: false,
        };
        this.getChats = this.getChats.bind(this);
        this.generateChats = this.generateChats.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        getUserDetails((res) => {
            if (!res) {
                console.log('Could not get user details');
            } else {
                this.setState({ userInfo: res.data.response});
                this.getChats();
            }
        });
    }

    handleChange(e) {

    }

    sendMessage(e) {
        console.log(e);
        var m = this.state.messages;
        var newm = {
            'chatid': '0',
            'message': e,
            'time': '1:35',
            'sender': this.state.userInfo.idUser
        }
        m.push(newm);
        this.setState({messages: m});
    }

    getChats() {
        if (this.state.userInfo) {
            console.log(this.state.userInfo);
            if (this.state.userInfo.idCompany == 0) {
                getStudentChats((res) => {
                    if (!res) {
                        console.log('Could not get student chats');
                    } else {
                        this.setState({chats: res.data.response});
                    }
                })
            } else {
                getRecruiterChats((res) => {
                    if (!res) {
                        console.log('Could not get recruiter chats');
                    } else {
                        this.setState({chats: res.data.response});
                    }
                })
            }
        }
    }

    generateChats() {
        console.log(this.state.chats);
        const chats = this.state.chats;
        const chatItems = chats.map(chat =>
                <ChatListItem key={chat.idChat} chatid={chat.idChat} onClick={() => this.getMessages(chat.idChat)}>
                    <Avatar letter="K" />
                    <Column fill>
                        <Row justify>
                            <Title ellipsis>{chat.Recruiter}</Title>
                            <Subtitle nowrap>test</Subtitle>
                        </Row>
                        <Subtitle ellipsis>
                            Company
                        </Subtitle>
                    </Column>
                </ChatListItem>
        );
        return (
            <ChatList style={{overflowY:'auto', whiteSpace:'nowrap'}}>
                {chatItems}
            </ChatList>
        )
    }

    getMessages(id) {
        console.log('chat id: ' + id);
        this.setState({ messages: m, selectedChat: id, chatSelected: true});
    }

    generateMessages() {
        const messages = this.state.messages;
        const messItems = messages.map(mess =>
            <Message key={mess.time} date={mess.time} isOwn={mess.sender == this.state.userInfo.idUser} authorName="blah">
                <MessageText>
                    {mess.message}
                </MessageText>
            </Message>
        );
        return (
            <Grid.Column width={10}>
                {!this.state.chatSelected &&
                <Header>
                    No chat selected
                </Header>}
                    <MessageList active style={{overflowY:'auto', whiteSpace:'nowrap'}}>
                        {messItems}
                    </MessageList>
                {this.state.chatSelected && <TextComposer value="" onSend={this.sendMessage}>
                        <Row align="center">
                            <TextInput fill />
                            <SendButton fit />
                        </Row>
                    </TextComposer>}
                </Grid.Column>
        )
    }

    render() {
        return (
            <MenuContainer loggedIn>
                <ThemeProvider>
                    <Grid style={{height: '85vh'}} >
                        <Grid.Column width={6} >
                            <Header as='h2' icon textAlign='center'>
                                <Header.Content>
                                    Chats
                                </Header.Content>
                            </Header>
                            {this.generateChats()}
                        </Grid.Column>
                        {this.generateMessages()}
                    </Grid>
                </ThemeProvider>
            </MenuContainer>

        );
    }
}