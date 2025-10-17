---
type: lesson
title: Backend dalam SSR - Server Logic & Rendering
---

# Backend dalam Arsitektur SSR 🔧

Backend dalam Server-Side Rendering (SSR) adalah jantung aplikasi yang menangani logic bisnis, rendering HTML, dan komunikasi dengan database. Backend bertanggung jawab menghasilkan HTML lengkap sebelum dikirim ke browser.

## Apa itu Backend dalam SSR?

Backend SSR adalah:

- **Server-Side Rendering Engine**: Menghasilkan HTML di server
- **Business Logic Handler**: Memproses data dan logic aplikasi
- **Database Interface**: Mengelola komunikasi dengan database
- **API Provider**: Menyediakan endpoints untuk berbagai kebutuhan
- **Authentication Manager**: Menangani autentikasi dan autorisasi

## Komponen Utama Backend SSR

### 1. Web Server Framework
```javascript
// Contoh menggunakan Express.js (Node.js)
const express = require('express');
const path = require('path');
const app = express();

// Template engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
    try {
        // Fetch data from database
        const posts = await Post.findAll({ limit: 10 });
        const user = req.session.user;

        // Render HTML with data
        res.render('index', {
            title: 'Home Page',
            posts: posts,
            user: user,
            meta: {
                description: 'Welcome to our blog',
                keywords: 'blog, articles, news'
            }
        });
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### 2. Template Rendering System
```javascript
// Controller untuk blog posts
class BlogController {
    async showPost(req, res) {
        try {
            const postId = req.params.id;

            // Fetch post data
            const post = await Post.findByPk(postId, {
                include: [
                    { model: User, as: 'author' },
                    { model: Comment, include: [User] }
                ]
            });

            if (!post) {
                return res.status(404).render('404', {
                    title: 'Post Not Found'
                });
            }

            // Prepare data for template
            const templateData = {
                title: post.title,
                post: post,
                author: post.author,
                comments: post.Comments,
                meta: {
                    description: post.excerpt,
                    keywords: post.tags.join(', '),
                    ogImage: post.featured_image,
                    canonical: `${process.env.BASE_URL}/blog/${post.slug}`
                },
                breadcrumbs: [
                    { text: 'Home', url: '/' },
                    { text: 'Blog', url: '/blog' },
                    { text: post.title, url: null }
                ]
            };

            // Render template dengan data
            res.render('blog/post', templateData);

        } catch (error) {
            console.error('Error showing post:', error);
            res.status(500).render('error', {
                title: 'Server Error',
                message: 'Unable to load post'
            });
        }
    }

    async createPost(req, res) {
        try {
            const { title, content, tags } = req.body;
            const userId = req.session.user.id;

            // Validate input
            const errors = this.validatePostData(req.body);
            if (errors.length > 0) {
                return res.render('blog/create', {
                    title: 'Create Post',
                    errors: errors,
                    formData: req.body
                });
            }

            // Create new post
            const post = await Post.create({
                title,
                content,
                slug: this.generateSlug(title),
                author_id: userId,
                tags: tags.split(',').map(tag => tag.trim())
            });

            // Redirect to new post
            res.redirect(`/blog/${post.slug}`);

        } catch (error) {
            console.error('Error creating post:', error);
            res.render('blog/create', {
                title: 'Create Post',
                errors: ['Failed to create post. Please try again.'],
                formData: req.body
            });
        }
    }

    validatePostData(data) {
        const errors = [];

        if (!data.title || data.title.trim().length < 5) {
            errors.push('Title must be at least 5 characters long');
        }

        if (!data.content || data.content.trim().length < 50) {
            errors.push('Content must be at least 50 characters long');
        }

        return errors;
    }

    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }
}
```

### 3. Database Integration
```javascript
// Database models dan queries
const { Sequelize, DataTypes } = require('sequelize');

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Post model
const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 200]
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    excerpt: {
        type: DataTypes.STRING(500)
    },
    featured_image: DataTypes.STRING,
    tags: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    published_at: DataTypes.DATE,
    status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft'
    }
});

// User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
});

// Associations
Post.belongsTo(User, { as: 'author', foreignKey: 'author_id' });
User.hasMany(Post, { foreignKey: 'author_id' });

// Database service
class DatabaseService {
    static async getPublishedPosts(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        return await Post.findAndCountAll({
            where: { status: 'published' },
            include: [{ model: User, as: 'author', attributes: ['username', 'profile'] }],
            order: [['published_at', 'DESC']],
            limit,
            offset
        });
    }

    static async getPostBySlug(slug) {
        return await Post.findOne({
            where: { slug, status: 'published' },
            include: [{ model: User, as: 'author' }]
        });
    }

    static async searchPosts(query) {
        const { Op } = require('sequelize');

        return await Post.findAll({
            where: {
                status: 'published',
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { content: { [Op.iLike]: `%${query}%` } },
                    { tags: { [Op.contains]: [query] } }
                ]
            },
            include: [{ model: User, as: 'author' }],
            limit: 20
        });
    }
}
```

### 4. Authentication & Session Management
```javascript
const bcrypt = require('bcryptjs');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));

// Authentication middleware
class AuthMiddleware {
    static async requireAuth(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login?redirect=' + encodeURIComponent(req.originalUrl));
        }

        // Verify user still exists and is active
        const user = await User.findByPk(req.session.user.id);
        if (!user || user.status === 'inactive') {
            req.session.destroy();
            return res.redirect('/login');
        }

        req.user = user;
        next();
    }

    static requireRole(role) {
        return async (req, res, next) => {
            if (!req.user || req.user.role !== role) {
                return res.status(403).render('error', {
                    title: 'Access Denied',
                    message: 'You do not have permission to access this resource'
                });
            }
            next();
        };
    }
}

// Authentication controller
class AuthController {
    async showLogin(req, res) {
        if (req.session.user) {
            return res.redirect('/dashboard');
        }

        res.render('auth/login', {
            title: 'Login',
            redirect: req.query.redirect || '/',
            errors: req.flash('errors') || [],
            message: req.flash('message') || ''
        });
    }

    async processLogin(req, res) {
        const { email, password } = req.body;
        const redirect = req.body.redirect || '/';

        try {
            // Find user
            const user = await User.findOne({ where: { email } });
            if (!user) {
                req.flash('errors', ['Invalid email or password']);
                return res.redirect('/login');
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                req.flash('errors', ['Invalid email or password']);
                return res.redirect('/login');
            }

            // Create session
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };

            // Update last login
            await user.update({ last_login: new Date() });

            res.redirect(redirect);

        } catch (error) {
            console.error('Login error:', error);
            req.flash('errors', ['An error occurred during login']);
            res.redirect('/login');
        }
    }

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err);
            }
            res.redirect('/');
        });
    }
}
```

## Keuntungan Backend SSR

### 1. SEO Optimization
```javascript
// SEO-friendly routing dan meta data
app.get('/blog/:slug', async (req, res) => {
    const post = await Post.findOne({ where: { slug: req.params.slug } });

    if (!post) {
        return res.status(404).render('404');
    }

    // Generate comprehensive meta data
    const seoData = {
        title: `${post.title} | My Blog`,
        description: post.excerpt,
        canonical: `${process.env.BASE_URL}/blog/${post.slug}`,
        ogTitle: post.title,
        ogDescription: post.excerpt,
        ogImage: post.featured_image,
        ogUrl: `${process.env.BASE_URL}/blog/${post.slug}`,
        structuredData: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
                "@type": "Person",
                "name": post.author.username
            },
            "datePublished": post.published_at,
            "image": post.featured_image
        }
    };

    res.render('blog/post', { post, seo: seoData });
});
```

### 2. Server-Side Data Fetching
```javascript
// Data fetching sebelum rendering
class PageController {
    async showHomePage(req, res) {
        try {
            // Parallel data fetching
            const [
                recentPosts,
                featuredPosts,
                categories,
                siteStats
            ] = await Promise.all([
                Post.findAll({ limit: 5, order: [['createdAt', 'DESC']] }),
                Post.findAll({ where: { featured: true }, limit: 3 }),
                Category.findAll({ attributes: ['name', 'slug', 'post_count'] }),
                this.getSiteStatistics()
            ]);

            res.render('index', {
                title: 'Home',
                recentPosts,
                featuredPosts,
                categories,
                stats: siteStats,
                user: req.session.user || null
            });

        } catch (error) {
            console.error('Error loading home page:', error);
            res.status(500).render('error');
        }
    }

    async getSiteStatistics() {
        const [postCount, userCount, commentCount] = await Promise.all([
            Post.count({ where: { status: 'published' } }),
            User.count({ where: { status: 'active' } }),
            Comment.count({ where: { approved: true } })
        ]);

        return { postCount, userCount, commentCount };
    }
}
```

### 3. Caching Strategies
```javascript
const Redis = require('redis');
const redis = Redis.createClient(process.env.REDIS_URL);

// Page caching middleware
function cacheMiddleware(duration = 300) {
    return async (req, res, next) => {
        const key = `page:${req.originalUrl}`;

        try {
            const cached = await redis.get(key);
            if (cached) {
                return res.send(cached);
            }

            // Override res.render to cache the output
            const originalRender = res.render;
            res.render = function(view, data) {
                originalRender.call(this, view, data, (err, html) => {
                    if (err) return next(err);

                    // Cache the rendered HTML
                    redis.setex(key, duration, html);
                    res.send(html);
                });
            };

            next();
        } catch (error) {
            console.error('Cache error:', error);
            next();
        }
    };
}

// Usage
app.get('/', cacheMiddleware(600), homeController.index);
app.get('/blog/:slug', cacheMiddleware(1800), blogController.show);
```

## Challenges Backend SSR

### 1. Performance Optimization
```javascript
// Database query optimization
class OptimizedQuery {
    static async getPostsWithPagination(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        // Use eager loading dan select only needed fields
        return await Post.findAndCountAll({
            attributes: ['id', 'title', 'slug', 'excerpt', 'published_at'],
            include: [{
                model: User,
                as: 'author',
                attributes: ['username', 'profile']
            }],
            where: { status: 'published' },
            order: [['published_at', 'DESC']],
            limit,
            offset,
            // Use database-level pagination
            subQuery: false
        });
    }

    // Query result caching
    static async getCachedCategories() {
        const cacheKey = 'categories:all';
        let categories = await redis.get(cacheKey);

        if (!categories) {
            categories = await Category.findAll({
                attributes: ['id', 'name', 'slug'],
                order: [['name', 'ASC']]
            });

            await redis.setex(cacheKey, 3600, JSON.stringify(categories));
        } else {
            categories = JSON.parse(categories);
        }

        return categories;
    }
}
```

### 2. Error Handling & Monitoring
```javascript
// Comprehensive error handling
app.use((error, req, res, next) => {
    console.error('Application Error:', {
        error: error.message,
        stack: error.stack,
        url: req.originalUrl,
        method: req.method,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        user: req.session.user?.id || 'anonymous'
    });

    // Different responses based on error type
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).render('error', {
            title: 'Validation Error',
            message: 'Please check your input and try again'
        });
    }

    if (error.name === 'SequelizeConnectionError') {
        return res.status(503).render('error', {
            title: 'Service Unavailable',
            message: 'Database connection error. Please try again later.'
        });
    }

    // Generic server error
    res.status(500).render('error', {
        title: 'Server Error',
        message: process.env.NODE_ENV === 'development'
            ? error.message
            : 'Something went wrong. Please try again later.'
    });
});

// Health check endpoint
app.get('/health', async (req, res) => {
    const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'disconnected',
        redis: 'disconnected'
    };

    try {
        await sequelize.authenticate();
        health.database = 'connected';
    } catch (error) {
        health.database = 'error';
        health.status = 'degraded';
    }

    try {
        await redis.ping();
        health.redis = 'connected';
    } catch (error) {
        health.redis = 'error';
        health.status = 'degraded';
    }

    const statusCode = health.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(health);
});
```

## Modern SSR Frameworks

### 1. Next.js (React-based)
```javascript
// Next.js getServerSideProps
export async function getServerSideProps(context) {
    const { params } = context;

    try {
        const post = await fetchPost(params.slug);

        if (!post) {
            return { notFound: true };
        }

        return {
            props: {
                post,
                meta: {
                    title: post.title,
                    description: post.excerpt
                }
            }
        };
    } catch (error) {
        return {
            props: {
                error: 'Failed to load post'
            }
        };
    }
}
```

### 2. Nuxt.js (Vue-based)
```javascript
// Nuxt.js asyncData
export default {
    async asyncData({ params, $axios }) {
        try {
            const post = await $axios.$get(`/api/posts/${params.slug}`);
            return { post };
        } catch (error) {
            throw new Error('Post not found');
        }
    },

    head() {
        return {
            title: this.post.title,
            meta: [
                { hid: 'description', name: 'description', content: this.post.excerpt }
            ]
        };
    }
};
```

## Best Practices

### 1. Security
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"]
        }
    }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

### 2. Performance Monitoring
```javascript
// Response time tracking
app.use((req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);

        // Log slow requests
        if (duration > 1000) {
            console.warn(`Slow request: ${req.originalUrl} took ${duration}ms`);
        }
    });

    next();
});
```

## Kesimpulan

Backend SSR menyediakan:
- **Complete HTML rendering** di server
- **SEO-friendly** content delivery
- **Fast initial page loads** dengan pre-rendered content
- **Server-side data fetching** untuk dynamic content
- **Centralized authentication** dan session management

Challenges yang perlu diperhatikan:
- **Server resource management** untuk rendering
- **Caching strategies** untuk performance
- **Database optimization** untuk scalability
- **Error handling** untuk reliability

Backend SSR adalah pilihan solid untuk aplikasi yang mengutamakan SEO dan performance! 🚀
