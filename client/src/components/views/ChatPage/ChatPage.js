import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../../../_actions/chat_actions";
import ChatCard from "./Sections/ChatCard";
import Dropzone from "react-dropzone";
import Axios from "axios";

export class ChatPage extends Component {
  state = {
    chatMessage: "",
  };

  componentDidMount() {
    let server = "http://localhost:5000";

    this.props.dispatch(getChats());

    this.socket = io(server);

    this.socket.on("Output Chat Message", (messageFromBackEnd) => {
      console.log(messageFromBackEnd);
      this.props.dispatch(afterPostMessage(messageFromBackEnd));
    });
  }

  hanleSearchChange = (e) => {
    this.setState({
      chatMessage: e.target.value,
    });
  };

  renderCards = () =>
    this.props.chats.chats &&
    this.props.chats.chats.map((chat) => <ChatCard key={chat._id} {...chat} />);

  onDrop = (files) => {
    console.log(files);

    if (this.props.user.userData && !this.props.user.userData.isAuth) {
      return alert("Please Log in first");
    }

    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    Axios.post("api/chat/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let chatMessage = response.data.url;
        let userId = this.props.user.userData._id;
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let nowTime = moment();
        let type = "VideoOrImage";

        this.socket.emit("Input Chat Message", {
          chatMessage,
          userId,
          userName,
          userImage,
          nowTime,
          type,
        });
      }
    });
  };

  submitChatMessage = (e) => {
    e.preventDefault();

    if (this.props.user.userData && !this.props.user.userData.isAuth) {
      return alert("Please Log in first");
    }

    let chatMessage = this.state.chatMessage;
    let userId = this.props.user.userData._id;
    let userName = this.props.user.userData.name;
    let userImage = this.props.user.userData.image;
    let nowTime = moment();
    let type = "Text";

    this.socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      userName,
      userImage,
      nowTime,
      type,
    });
    this.setState({ chatMessage: "" });
  };

  render() {
    return (
      <div class="chat-main-row">
        <div class="chat-main-wrapper">
          <div class="col-lg-9 message-view task-view">
            <div class="chat-window">
              <div class="chat-contents">
                <div class="chat-content-wrap">
                  <div class="chat-wrap-inner">
                    <div class="chat-box">
                      <div class="chats">
                        {this.props.chats && this.renderCards()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chat-footer">
                <div class="message-bar">
                  <div class="message-inner">
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Button>
                              <img
                                src="https://dreamguys.co.in/smarthr/light/assets/img/attachment.png"
                                alt=""
                              />
                            </Button>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                    <div class="message-area">
                      <form onSubmit={this.submitChatMessage}>
                        <div class="input-group">
                          <input
                            onChange={this.hanleSearchChange}
                            class="form-control"
                            placeholder="Type message..."
                            value={this.state.chatMessage}
                          />

                          <span class="input-group-append">
                            <button
                              style={{ width: "90px" }}
                              class="btn btn-custom"
                              type="button"
                              onClick={this.submitChatMessage}
                            >
                              SEND
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chats: state.chat,
  };
};

export default connect(mapStateToProps)(ChatPage);
