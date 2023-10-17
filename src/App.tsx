import { BlogPostsProvider } from './providers/BlogPostsProvider';
import { BlogPostsFeed } from './pages/BlogPostsFeed';
import './App.css';

function App() {
  return (
    <div className="app">
      <BlogPostsProvider>
        <BlogPostsFeed />
      </BlogPostsProvider>
    </div>
  );
}

export default App;
