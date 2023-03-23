import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./views/Auth";
import Landing from "./components/layout/Landing";
import LandingAdmin from "./components/layout/LandingAdmin";
import Home from "./views/Home";
import BooksByCategory from "./views/BooksByCategory";
import About from "./views/About";
import MyPage from "./views/MyPage";
import PageNotFound from "./views/PageNotFound";

import AuthContextProvider from "./contexts/AuthContext";
import UserContextProvider from "./contexts/UserContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import BookContextProvider from "./contexts/BookContext";
import CommentContextProvider from "./contexts/CommentContext";

import ProtectedRoute from "./routing/ProtectedRoute";
import AdminRoute from "./routing/AdminRoute";
import UserRoute from "./routing/UserRoute";

import BookList from "./views/Admin/BookList";
import CategoryList from "./views/Admin/CategoryList";
import UserList from "./views/Admin/UserList";
import CommentList from "./views/Admin/CommentList.js";

import InfoBook from "./components/books/InfoBook";
import DetailReviewBook from "./components/books/DetailReviewBook";

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <CategoryContextProvider>
          <BookContextProvider>
            <CommentContextProvider>
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
                  <ProtectedRoute
                    exact
                    path="/category/:id"
                    component={BooksByCategory}
                  />
                  <ProtectedRoute exact path="/about" component={About} />
                  <ProtectedRoute
                    exact
                    path="/books/detail/:id"
                    component={DetailReviewBook}
                  />
                  <UserRoute exact path="/mypage" component={MyPage} />
                  <AdminRoute exact path="/admin" component={LandingAdmin} />
                  <AdminRoute exact path="/admin/books" component={BookList} />
                  <AdminRoute
                    exact
                    path="/admin/categories"
                    component={CategoryList}
                  />
                  <AdminRoute exact path="/admin/users" component={UserList} />
                  <AdminRoute
                    exact
                    path="/admin/comments"
                    component={CommentList}
                  />
                  <AdminRoute
                    exact
                    path="/admin/comments-of-book/:id"
                    component={CommentList}
                  />
                  <AdminRoute
                    exact
                    path="/admin/books/info/:id"
                    component={InfoBook}
                  />

                  <Route path="*" component={PageNotFound} />
                </Switch>
              </Router>
            </CommentContextProvider>
          </BookContextProvider>
        </CategoryContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
