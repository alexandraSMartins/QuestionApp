import React, { Fragment } from "react";
//Import Components
import Alert from "@material-ui/lab/Alert";
import ScrollableTable from "../../components/ScrollableTable";
import SearchBar from "../../components/SearchBar/SearchBar";

//Questions table column headers
const columns = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "observations",
    label: "Observations",
  },
  {
    id: "creationDate",
    label: "Creation Date",
  },
];

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionResult: {}, //result from fetching questions to the db
      errorAlert: false, //turns true whenever an error occurs from external requests. When true, an alert will appear with an error message
      errorMessage: "", //saves the error message if an error occurs
    };

    this.handleNewPage = this.handleNewPage.bind(this)
    this.handleSearchQuestion = this.handleSearchQuestion.bind(this)
  }

  componentDidMount() {
    this.fetchQuestionList();
  }

  componentWillUnmount() {
    this.setState({ questionList: {}, errorAlert: false, errorMessage: "" });
  }

  // API Requests

  fetchQuestionList(id, page){
    let url = process.env.REACT_APP_SERVER_URL + "/questions";

    if (id) {
      url += `?id=${id}`;
    } else if (page) {
      url += `?page=${page}`;
    }

    fetch(url)
      .then(this.handleErrors)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          questionResult: result,
          errorAlert: false,
          errorMessage: "",
        });
      })
      .catch((error) => {
        this.setState({
          errorAlert: true,
          errorMessage: error.message,
        });
      });
  };

  handleErrors(response) {
    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw Error("The question with the specified id could not be found.");
        default:
          throw Error(
            "An Internal Error has occurred. Please retry the operation."
          );
      }
    }
    return response;
  }

  //API Requests END

  handleNewPage(pageNumber) {
    console.log("PAGE: ", pageNumber)
    this.fetchQuestionList(null, pageNumber);
  }

  handleSearchQuestion(searchValue) {
    this.fetchQuestionList(searchValue, null);
  }

  render() {
    const questionResult = this.state.questionResult;
    const errorMessage = this.state.errorMessage;
    const errorAlert = this.state.errorAlert;

    return (
      <Fragment>
        {errorAlert && <Alert severity="error">{errorMessage}</Alert>}
        <br></br>
        <SearchBar
          fetchData={this.handleSearchQuestion}
          placeholder={"Enter question id..."}
        />
        <br></br>
        <ScrollableTable
          columns={columns}
          rows={questionResult ? questionResult.questions : []}
          totalResults={questionResult.count}
          handleNewPage={this.handleNewPage}
        />
      </Fragment>
    );
  }
}

export default QuestionList;
