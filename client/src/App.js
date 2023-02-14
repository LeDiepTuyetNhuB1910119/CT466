import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Home from "./views/Home";
import About from "./views/About";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./routing/ProtectedRoute";
import Auth from "./views/Auth";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Route
          exact
          path="/login"
          render={(props) => <Auth {...props} authRoute="login" />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Auth {...props} authRoute="register" />}
        />
        <Switch>
          <Route exact path="/" component={Landing} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/about" component={About} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
