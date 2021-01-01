import React from "react";
import "./SearchBar.css";

/*  
PROPS: 
 - fetchData: func (called when search is triggered)
 - placeHolder: string (placeholder for search input)
*/

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "", //Saves the values entered in the search input
    };
  }

  componentWillUnmount() {
    this.setState({ input: "" });
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSearch = () => {
    const { fetchData } = this.props;

    fetchData(this.state.input);
  };

  render() {
    return (
      <div className="container">
        <input
          type="text"
          placeholder={this.props.placeholder}
          className="input"
          onChange={this.handleInputChange}
        />
        <button type="submit" className="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
