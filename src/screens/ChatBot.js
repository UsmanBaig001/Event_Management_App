import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';

const qaFlow = {
  start: {
    options: ['Hi', 'What is your name?', 'How can I reset my password?'],
  },
  Hi: {
    answer: 'Hello! How can I help you today?',
    options: ['How can I reset my password?', 'What are your operating hours?'],
  },
  'What is your name?': {
    answer: "I'm a chatbot created to assist you.",
    options: ['How can I reset my password?', 'Can I change my event tickets?'],
  },
  'How can I reset my password?': {
    answer:
      'To reset your password, go to the settings page and follow the instructions.',
    options: [
      'What are your operating hours?',
      'Can I change my event tickets?',
    ],
  },
  'What are your operating hours?': {
    answer: 'We are available 24/7 to assist you.',
    options: [
      'Can I get a refund for my ticket?',
      'How do I use my promo code?',
    ],
  },
  'Can I change my event tickets?': {
    answer:
      'Ticket changes depend on the event organizer’s policy. Please contact support for assistance.',
    options: ['How do I contact support?', 'Can I get a refund for my ticket?'],
  },
};

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: '',
      currentOptions: qaFlow.start.options,
      typing: false,
    };
  }
  handleSend = message => {
    const {messages} = this.state;
    const userMessage = message.trim();

    if (userMessage) {
      const responseFlow = qaFlow[userMessage];
      const newMessages = [
        ...messages,
        {
          id: Date.now().toString(),
          text: userMessage,
          user: {id: 1},
          createdAt: new Date(),
        },
      ];

      this.setState({
        messages: newMessages,
        currentMessage: '',
        typing: true,
      });

      setTimeout(() => {
        if (responseFlow) {
          this.setState(
            prevState => ({
              messages: [
                ...prevState.messages,
                {
                  id: (Date.now() + 1).toString(),
                  text: responseFlow.answer,
                  user: {id: 2},
                  createdAt: new Date(),
                  fadeAnim: new Animated.Value(0),
                },
              ],
              currentOptions: responseFlow.options || [],
              typing: false,
            }),
            () => {
              this.startFadeInAnimation();
            },
          );
        } else {
          this.setState(
            prevState => ({
              messages: [
                ...prevState.messages,
                {
                  id: (Date.now() + 1).toString(),
                  text: "I'm sorry, I don't understand. Can you please rephrase?",
                  user: {id: 2},
                  createdAt: new Date(),
                  fadeAnim: new Animated.Value(0),
                },
              ],
              typing: false,
            }),
            () => {
              this.startFadeInAnimation();
            },
          );
        }
      }, 1000);
    }
  };

  // Function to trigger fade-in animation
  startFadeInAnimation = () => {
    const {messages} = this.state;
    const lastMessage = messages[messages.length - 1];
    Animated.timing(lastMessage.fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  handleOptionPress = option => {
    this.handleSend(option);
  };

  renderMessageItem = ({item}) => {
    const isUserMessage = item.user.id === 1;
    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage ? styles.myMessage : styles.theirMessage,
        ]}>
        {isUserMessage ? (
          <Text style={styles.messageText}>{item.text}</Text>
        ) : (
          <Animated.View style={{opacity: item.fadeAnim}}>
            <Text style={styles.messageText}>{item.text}</Text>
          </Animated.View>
        )}
        <Text style={styles.messageTime}>
          {item.createdAt.toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  renderOptionItem = ({item}) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => this.handleOptionPress(item)}>
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  render() {
    const {currentMessage, messages, currentOptions, typing} = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Header
          navigation={this.props.navigation}
          leftArrow
          title={'AI Support'}
        />

        <FlatList
          data={messages}
          renderItem={this.renderMessageItem}
          keyExtractor={item => item.id}
          style={styles.messageList}
        />

        {typing && (
          <View style={styles.typingIndicator}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.typingText}>Typing...</Text>
          </View>
        )}

        <FlatList
          data={currentOptions}
          renderItem={this.renderOptionItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.optionsList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={currentMessage}
            onChangeText={text => this.setState({currentMessage: text})}
            placeholder="Type your message"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => this.handleSend(currentMessage)}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageList: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
  },
  messageText: {
    color: '#000',
  },
  messageTime: {
    marginTop: 5,
    fontSize: 10,
    color: '#aaa',
  },
  optionsList: {
    maxHeight: 65,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  optionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#007AFF',
  },
});
