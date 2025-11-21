import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route
            path="*"
            element={
              <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                <p className="text-gray-600 mb-8">
                  The page you're looking for doesn't exist.
                </p>
                <a
                  href="/"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
