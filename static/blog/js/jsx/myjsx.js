var HelloWorld = React.createClass({
  render: function(){
    return (
      <span>Hello World!</span>
    )
  }
});

ReactDOM.render(
	<HelloWorld />,
  document.getElementsByClassName('rip')[0]
);

