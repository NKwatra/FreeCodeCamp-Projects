import React from 'react';
import './App.css';
import marked from 'marked';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      text: `# React
## Lightweight Javascript Framework
See the full documentation [here](https://reactjs.org/docs/getting-started.html)
An inline code element may be added like \`<div></div>\` this
Block code can also be added like below:
\`\`\`
var x = [1, 2, 3, 4, 5]
console.log(x)
\`\`\`
> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 
* An unordered list item
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Sample Image")`
    }
  }

  updateText = (e)  => {
    const text = e.target.value;
    this.setState({
      text : text
    })
  }

  render(){
    return (
      <div id="container">
        <textarea id="editor" value={this.state.text} onChange={this.updateText}></textarea>
        <div id="preview" dangerouslySetInnerHTML={{
          __html: marked(this.state.text, {
            gfm: true,
            breaks: true
          })}} ></div>
      </div>
    );
  }
}

export default App;
