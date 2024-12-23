/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";

// Error Boundary component to catch errors in the app
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to show fallback UI
  }

  componentDidCatch(error, info) {
    console.log("Error:", error, "Info:", info); // Log the error details
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

const Layout = () => {
  return (
    <ErrorBoundary>
      {/* SEO improvements with Helmet */}
      <Helmet>
        <title>Your App Title</title>
        <meta
          name="description"
          content="Description of your app"
        />
        <meta
          name="keywords"
          content="React, SEO, App"
        />
        <meta
          name="author"
          content="Your Name"
        />
      </Helmet>

      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </ErrorBoundary>
  );
};

export default Layout;
