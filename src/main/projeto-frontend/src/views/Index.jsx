import React from "react";

import PageHeader from "components/PageHeader/PageHeader.jsx";
import Basics from "views/IndexSections/Basics.jsx";

class Index extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <div className="wrapper">
          <PageHeader />
          <div className="main">
            <Basics />
          </div>
        </div>
      </>
    );
  }
}

export default Index;
