import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Home from "./views/Home";
import About from "./views/About";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./routing/ProtectedRoute";
import AdminRoute from "./routing/AdminRoute";
import Auth from "./views/Auth";
import LandingAdmin from "./components/layout/LandingAdmin";
import BookList from "./views/Admin/BookList";
import CategoryList from "./views/Admin/CategoryList";
import UserList from "./views/Admin/UserList";

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
          <AdminRoute exact path="/admin" component={LandingAdmin} />
          <AdminRoute exact path="/admin/books" component={BookList} />
          <AdminRoute exact path="/admin/categories" component={CategoryList} />
          <AdminRoute exact path="/admin/users" component={UserList} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
