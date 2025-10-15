---
type: lesson
title: Frontend dalam SPA - Client-Side Rendering
---

# Frontend dalam Arsitektur SPA (CSR) ⚛️

Single Page Application (SPA) menggunakan Client-Side Rendering (CSR) dimana frontend bertanggung jawab penuh untuk rendering UI, routing, dan state management. Semua logic presentasi berjalan di browser menggunakan JavaScript.

## Apa itu Frontend SPA?

Frontend SPA adalah:

- **Client-Side Rendering**: Semua rendering terjadi di browser
- **Dynamic Routing**: Navigasi tanpa page reload
- **State Management**: Mengelola application state di client
- **API Communication**: Berkomunikasi dengan backend via API
- **Component-Based**: UI dibuat dari komponen yang reusable

## Karakteristik Frontend SPA

### 1. Single HTML Entry Point
```html
<!-- index.html - satu-satunya file HTML -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My SPA App</title>
</head>
<body>
    <div id="root">
        <!-- Semua konten akan di-render di sini oleh JavaScript -->
    </div>
    <script src="/dist/bundle.js"></script>
</body>
</html>
```

### 2. JavaScript-Driven Rendering
```javascript
// React example - App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication status on app start
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/auth/me', {
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    return (
        <Router>
            <div className="app">
                <Header user={user} onLogout={() => setUser(null)} />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
```

## Component Architecture

### 1. Reusable Components
```javascript
// Button component
import React from 'react';
import './Button.css';

export const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    onClick,
    ...props
}) => {
    const className = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        loading && 'btn--loading',
        disabled && 'btn--disabled'
    ].filter(Boolean).join(' ');

    return (
        <button
            className={className}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? (
                <>
                    <span className="btn__spinner" />
                    Loading...
                </>
            ) : children}
        </button>
    );
};

// Usage
<Button
    variant="secondary"
    size="large"
    loading={isSubmitting}
    onClick={handleSubmit}
>
    Submit Form
</Button>
```

### 2. Page Components
```javascript
// Blog page component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import { Pagination } from '../components/Pagination';
import { SearchBox } from '../components/SearchBox';
import { usePagination } from '../hooks/usePagination';
import { useDebounce } from '../hooks/useDebounce';
import { blogApi } from '../services/blogApi';

export const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);

    const {
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage
    } = usePagination();

    useEffect(() => {
        fetchPosts();
    }, [currentPage, debouncedSearch]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await blogApi.getPosts({
                page: currentPage,
                limit: 10,
                search: debouncedSearch
            });

            setPosts(response.data);
            // Update pagination info
            updatePagination(response.pagination);
        } catch (err) {
            setError('Failed to load blog posts');
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        goToPage(1); // Reset to first page on search
    };

    if (loading && posts.length === 0) {
        return <div className="loading">Loading posts...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <h2>Something went wrong</h2>
                <p>{error}</p>
                <button onClick={fetchPosts}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="blog-page">
            <header className="blog-header">
                <h1>Blog Posts</h1>
                <SearchBox
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search posts..."
                />
            </header>

            <div className="blog-content">
                {posts.length === 0 ? (
                    <div className="no-posts">
                        <h3>No posts found</h3>
                        <p>Try adjusting your search criteria.</p>
                    </div>
                ) : (
                    <div className="posts-grid">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    onNext={nextPage}
                    onPrev={prevPage}
                />
            </div>
        </div>
    );
};
```

## Client-Side Routing

### 1. React Router Setup
```javascript
// routing/AppRouter.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LoadingFallback } from '../components/LoadingFallback';

// Lazy load components for code splitting
const Home = lazy(() => import('../pages/Home'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected routes */}
                    <Route
                        path="/dashboard/*"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* 404 route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

// ProtectedRoute component
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingFallback />;
    }

    if (!user) {
        return <Navigate
            to="/login"
            state={{ from: location }}
            replace
        />;
    }

    return children;
};
```

### 2. Programmatic Navigation
```javascript
// useNavigation hook
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export const useNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goTo = useCallback((path, options = {}) => {
        navigate(path, options);
    }, [navigate]);

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const replace = useCallback((path) => {
        navigate(path, { replace: true });
    }, [navigate]);

    const reload = useCallback(() => {
        navigate(0);
    }, [navigate]);

    return {
        goTo,
        goBack,
        replace,
        reload,
        currentPath: location.pathname,
        search: location.search,
        state: location.state
    };
};

// Usage in component
const BlogPost = () => {
    const { slug } = useParams();
    const { goTo, goBack } = useNavigation();

    const handleEditPost = () => {
        goTo(`/dashboard/posts/edit/${slug}`);
    };

    const handleBackToList = () => {
        goBack(); // or goTo('/blog')
    };

    return (
        <article>
            <button onClick={handleBackToList}>← Back to Blog</button>
            {/* Post content */}
            <button onClick={handleEditPost}>Edit Post</button>
        </article>
    );
};
```

## State Management

### 1. React Context + Reducer
```javascript
// contexts/AppContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
    user: null,
    posts: [],
    loading: false,
    error: null,
    theme: 'light',
    notifications: []
};

// Action types
export const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_USER: 'SET_USER',
    SET_POSTS: 'SET_POSTS',
    ADD_POST: 'ADD_POST',
    UPDATE_POST: 'UPDATE_POST',
    DELETE_POST: 'DELETE_POST',
    SET_THEME: 'SET_THEME',
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
};

// Reducer
const appReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, loading: action.payload };

        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload, loading: false };

        case ACTIONS.SET_USER:
            return { ...state, user: action.payload };

        case ACTIONS.SET_POSTS:
            return { ...state, posts: action.payload, loading: false };

        case ACTIONS.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };

        case ACTIONS.UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload.id ? action.payload : post
                )
            };

        case ACTIONS.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            };

        case ACTIONS.SET_THEME:
            localStorage.setItem('theme', action.payload);
            return { ...state, theme: action.payload };

        case ACTIONS.ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            };

        case ACTIONS.REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.id !== action.payload
                )
            };

        default:
            return state;
    }
};

// Context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};
```

### 2. Custom Hooks for State Logic
```javascript
// hooks/usePosts.js
import { useApp } from '../contexts/AppContext';
import { blogApi } from '../services/blogApi';
import { ACTIONS } from '../contexts/AppContext';

export const usePosts = () => {
    const { state, dispatch } = useApp();

    const fetchPosts = async (params = {}) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });

        try {
            const response = await blogApi.getPosts(params);
            dispatch({ type: ACTIONS.SET_POSTS, payload: response.data });
            return response;
        } catch (error) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
            throw error;
        }
    };

    const createPost = async (postData) => {
        try {
            const newPost = await blogApi.createPost(postData);
            dispatch({ type: ACTIONS.ADD_POST, payload: newPost });

            // Show success notification
            dispatch({
                type: ACTIONS.ADD_NOTIFICATION,
                payload: {
                    id: Date.now(),
                    type: 'success',
                    message: 'Post created successfully!'
                }
            });

            return newPost;
        } catch (error) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
            throw error;
        }
    };

    const updatePost = async (id, updates) => {
        try {
            const updatedPost = await blogApi.updatePost(id, updates);
            dispatch({ type: ACTIONS.UPDATE_POST, payload: updatedPost });
            return updatedPost;
        } catch (error) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
            throw error;
        }
    };

    const deletePost = async (id) => {
        try {
            await blogApi.deletePost(id);
            dispatch({ type: ACTIONS.DELETE_POST, payload: id });

            dispatch({
                type: ACTIONS.ADD_NOTIFICATION,
                payload: {
                    id: Date.now(),
                    type: 'success',
                    message: 'Post deleted successfully!'
                }
            });
        } catch (error) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
            throw error;
        }
    };

    return {
        posts: state.posts,
        loading: state.loading,
        error: state.error,
        fetchPosts,
        createPost,
        updatePost,
        deletePost
    };
};
```

## API Communication

### 1. API Service Layer
```javascript
// services/api.js
class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.interceptors = [];
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            credentials: 'include', // Include cookies for auth
            ...options
        };

        // Apply request interceptors
        for (const interceptor of this.interceptors) {
            await interceptor.request(config);
        }

        try {
            const response = await fetch(url, config);

            // Handle HTTP errors
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new ApiError(
                    error.message || `HTTP ${response.status}`,
                    response.status,
                    error
                );
            }

            const data = await response.json();

            // Apply response interceptors
            for (const interceptor of this.interceptors) {
                await interceptor.response(data, response);
            }

            return data;

        } catch (error) {
            // Apply error interceptors
            for (const interceptor of this.interceptors) {
                if (interceptor.error) {
                    await interceptor.error(error);
                }
            }
            throw error;
        }
    }

    addInterceptor(interceptor) {
        this.interceptors.push(interceptor);
    }

    // HTTP methods
    get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url);
    }

    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
}

class ApiError extends Error {
    constructor(message, status, details) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }
}

// Create API instance
const api = new ApiService('/api');

// Add auth interceptor
api.addInterceptor({
    request: async (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    },
    error: async (error) => {
        if (error.status === 401) {
            // Redirect to login on auth error
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
    }
});

export { api, ApiError };
```

### 2. Domain-Specific API Services
```javascript
// services/blogApi.js
import { api } from './api';

export const blogApi = {
    // Get posts with filtering and pagination
    getPosts: (params = {}) => {
        return api.get('/posts', {
            page: params.page || 1,
            limit: params.limit || 10,
            search: params.search,
            category: params.category,
            tag: params.tag,
            sort: params.sort || 'created_at',
            order: params.order || 'desc'
        });
    },

    // Get single post
    getPost: (slug) => {
        return api.get(`/posts/${slug}`);
    },

    // Create new post
    createPost: (postData) => {
        return api.post('/posts', postData);
    },

    // Update existing post
    updatePost: (id, updates) => {
        return api.put(`/posts/${id}`, updates);
    },

    // Delete post
    deletePost: (id) => {
        return api.delete(`/posts/${id}`);
    },

    // Get categories
    getCategories: () => {
        return api.get('/categories');
    },

    // Get tags
    getTags: () => {
        return api.get('/tags');
    },

    // Upload image
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        return api.request('/upload/image', {
            method: 'POST',
            body: formData,
            headers: {} // Let browser set Content-Type for FormData
        });
    }
};
```

## Performance Optimization

### 1. Code Splitting & Lazy Loading
```javascript
// Lazy load heavy components
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

const HeavyChart = lazy(() => import('./HeavyChart'));
const RichTextEditor = lazy(() => import('./RichTextEditor'));

export const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <Suspense fallback={<LoadingSpinner />}>
                <HeavyChart />
            </Suspense>

            <Suspense fallback={<div>Loading editor...</div>}>
                <RichTextEditor />
            </Suspense>
        </div>
    );
};
```

### 2. Memoization & Optimization
```javascript
// useMemo for expensive calculations
import { useMemo } from 'react';

export const PostList = ({ posts, filters }) => {
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            if (filters.category && post.category !== filters.category) {
                return false;
            }
            if (filters.search && !post.title.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            return true;
        }).sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
    }, [posts, filters]);

    return (
        <div className="post-list">
            {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

// React.memo for component optimization
export const PostCard = React.memo(({ post }) => {
    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span>{post.created_at}</span>
        </div>
    );
});
```

## Keuntungan Frontend SPA

### 1. Rich User Experience
- **Smooth Navigation**: Tidak ada page reload
- **Instant Feedback**: Real-time updates
- **Interactive UI**: Complex interactions
- **App-like Feel**: Native app experience

### 2. Performance Benefits
- **Faster Navigation**: Setelah initial load
- **Caching**: Client-side caching
- **Optimistic Updates**: UI updates before server response
- **Background Loading**: Pre-fetch data

### 3. Development Efficiency
- **Component Reusability**: DRY principle
- **Modern Tooling**: Rich ecosystem
- **Hot Reloading**: Fast development cycle
- **Testing**: Component-based testing

## Challenges Frontend SPA

### 1. SEO Limitations
```javascript
// Solution: Meta management dengan react-helmet
import { Helmet } from 'react-helmet';

export const BlogPost = ({ post }) => {
    return (
        <>
            <Helmet>
                <title>{post.title} | My Blog</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.featured_image} />
                <link rel="canonical" href={`https://myblog.com/blog/${post.slug}`} />
            </Helmet>

            <article>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </>
    );
};
```

### 2. Initial Loading Performance
```javascript
// Solution: Loading states dan progressive enhancement
export const App = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        Promise.all([
            loadCriticalData(),
            loadUserSession(),
            loadAppConfig()
        ]).then(() => {
            setAppReady(true);
            setInitialLoading(false);
        }).catch(() => {
            setInitialLoading(false);
        });
    }, []);

    if (initialLoading) {
        return <AppLoadingSkeleton />;
    }

    return appReady ? <MainApp /> : <FallbackApp />;
};
```

## Modern SPA Frameworks

### 1. React Ecosystem
- **React**: Library untuk UI components
- **React Router**: Client-side routing
- **Redux/Zustand**: State management
- **React Query**: Data fetching & caching

### 2. Vue Ecosystem
- **Vue 3**: Progressive framework
- **Vue Router**: Official router
- **Pinia**: State management
- **Nuxt**: Meta framework untuk Vue

### 3. Angular
- **Full framework**: Complete solution
- **TypeScript**: Built-in TypeScript support
- **RxJS**: Reactive programming
- **Angular CLI**: Powerful tooling

## Kesimpulan

Frontend SPA menawarkan:
- **Rich user experience** dengan interaktivitas tinggi
- **Component-based development** yang maintainable
- **Client-side routing** untuk smooth navigation
- **Real-time updates** dan dynamic content

Challenges yang perlu diatasi:
- **SEO optimization** untuk search engine visibility
- **Initial bundle size** dan loading performance
- **Browser compatibility** dan progressive enhancement
- **State complexity** dalam aplikasi besar

SPA ideal untuk aplikasi yang mengutamakan user experience dan interaktivitas! ⚡
