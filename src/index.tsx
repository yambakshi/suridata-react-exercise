import { BlogPostsProvider } from './common/providers/BlogPostsProvider';
import { LanguageProvider } from './common/providers/LanguageProvider';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <LanguageProvider>
    <BlogPostsProvider>
      <App />
    </BlogPostsProvider>
  </LanguageProvider>
);
