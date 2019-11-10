import React from "react";
import "./App.css";
import Colors from "./Colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default class App extends React.Component {
  state = {
    quotes: [],
    loading: true,
    textColor: "red"
  };

  fetchQuotes = async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
    const { quotes } = await response.json();
    this.setState({
      quotes: quotes,
      loading: false,
      currentQuote: quotes[0]
    });
  };

  componentDidMount() {
    this.fetchQuotes();
  }

  getQuote = () => {
    const newQuote = this.state.quotes[
      Math.floor(Math.random() * this.state.quotes.length)
    ];
    const newColor = Colors[Math.floor(Math.random() * Colors.length)];
    this.setState({
      currentQuote: newQuote,
      textColor: newColor
    });
  };

  render() {
    return this.state.loading ? (
      <h1>Loading .. </h1>
    ) : (
      <div id="container" style={{ backgroundColor: this.state.textColor }}>
        <div id="quote-box">
          <div
            id="text"
            className="text-center"
            style={{ color: this.state.textColor }}
          >
            {this.state.currentQuote.quote}
          </div>
          <div
            id="author"
            style={{ color: this.state.textColor }}
            className="mt-2"
          >
            - {this.state.currentQuote.author}
          </div>
          <button
            id="new-quote"
            className="btn btn-lg float-right mt-3"
            style={{ backgroundColor: this.state.textColor, color: "white" }}
            onClick={this.getQuote}
          >
            New Quote
          </button>
          <a
            href="https://twitter.com/intent/tweet"
            className="btn  mt-4"
            style={{ backgroundColor: this.state.textColor, color: "white" }}
            id="tweet-quote"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>
    );
  }
}
