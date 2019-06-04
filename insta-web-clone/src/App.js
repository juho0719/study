import React from 'react';
import Header from './components/Header';
import Posts from './components/Posts';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Pusher from 'pusher-js';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends React.Component {
  constructor() {
    super();
    // connect to pusher
    this.pusher = new Pusher("561b437138b0fb79238c", {
      cluster: 'ap3',
      encrypted: true
    });
  }

  componentDidMount() {
    if ('action' in Notification.prototype) {
      alert('You can enjoy the notification feature');
    } else {
      alert('Sorry notifications are NOT supported on your browser');
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <section className="App-main">
            {/* pass ther pusher object and apollo to the posts component */}
            <Posts pusher={this.pusher} apollo_client={client} />
          </section>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
