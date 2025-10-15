---
type: lesson
title: Frontend dalam SSR - Presentasi Layer
---

# Frontend dalam Arsitektur SSR 🖥️

Dalam arsitektur Server-Side Rendering (SSR), frontend berperan sebagai presentation layer yang menerima HTML yang sudah di-render dari server. Frontend fokus pada user interface, user experience, dan interaktivitas client-side.

## Apa itu Frontend dalam SSR?

Frontend dalam konteks SSR adalah:

- **Presentation Layer**: Menampilkan UI yang sudah di-render server
- **Client-Side Enhancement**: Menambah interaktivitas setelah halaman dimuat
- **Progressive Enhancement**: Membangun pengalaman bertahap
- **Hydration**: Menghubungkan HTML statis dengan JavaScript dinamis

## Karakteristik Frontend SSR

### 1. Server-First Approach
```html
<!-- HTML diterima dari server sudah lengkap -->
<!DOCTYPE html>
<html>
<head>
    <title>Blog Post - My Website</title>
    <meta name="description" content="Post description from server">
</head>
<body>
    <header>
        <nav>
            <!-- Navigation sudah di-render -->
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
        </nav>
    </header>

    <main>
        <article>
            <h1>Blog Post Title</h1>
            <p>Content yang sudah di-render dari server...</p>
        </article>
    </main>
</body>
</html>
```

### 2. Progressive Enhancement
```javascript
// JavaScript enhancement setelah page load
document.addEventListener('DOMContentLoaded', function() {
    // Enhance navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Add form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', validateAndEnhance);
    });

    // Initialize interactive components
    initializeCarousel();
    initializeModal();
    initializeDropdowns();
});
```

## Komponen Frontend SSR

### 1. Template System
Frontend menggunakan template yang di-render server:

```html
<!-- Template di server (contoh: EJS, Handlebars, Pug) -->
<!-- EJS Template -->
<div class="user-card">
    <img src="<%= user.avatar %>" alt="<%= user.name %>">
    <h3><%= user.name %></h3>
    <p><%= user.bio %></p>
    <% if (user.isOnline) { %>
        <span class="status online">Online</span>
    <% } else { %>
        <span class="status offline">Offline</span>
    <% } %>
</div>
```

### 2. CSS Architecture
```css
/* CSS untuk SSR biasanya lebih tradisional */
.user-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    transition: box-shadow 0.3s ease;
}

.user-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.status {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
}

.status.online {
    background-color: #d4edda;
    color: #155724;
}

.status.offline {
    background-color: #f8d7da;
    color: #721c24;
}

/* Responsive design tetap penting */
@media (max-width: 768px) {
    .user-card {
        margin: 0.5rem 0;
        padding: 0.75rem;
    }
}
```

### 3. Client-Side JavaScript
```javascript
// Frontend JavaScript dalam SSR lebih fokus pada enhancement
class SSRFrontend {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.enhanceComponents();
        this.setupAjax();
    }

    bindEvents() {
        // Form submissions dengan AJAX
        document.querySelectorAll('form[data-ajax]').forEach(form => {
            form.addEventListener('submit', this.handleAjaxSubmit.bind(this));
        });

        // Navigation enhancement
        document.querySelectorAll('a[data-nav]').forEach(link => {
            link.addEventListener('click', this.handleNavigation.bind(this));
        });
    }

    async handleAjaxSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData
            });

            if (response.ok) {
                const result = await response.text();
                this.updatePageContent(result);
            } else {
                this.showError('Submission failed');
            }
        } catch (error) {
            this.showError('Network error');
        }
    }

    updatePageContent(htmlContent) {
        // Update bagian tertentu dari halaman
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const newContent = doc.querySelector('#main-content');

        if (newContent) {
            document.getElementById('main-content').innerHTML = newContent.innerHTML;
            this.reinitializeComponents();
        }
    }

    enhanceComponents() {
        // Initialize interactive components
        this.initializeTabs();
        this.initializeAccordions();
        this.initializeModals();
    }

    initializeTabs() {
        document.querySelectorAll('[data-tab-container]').forEach(container => {
            const tabs = container.querySelectorAll('[data-tab]');
            const panels = container.querySelectorAll('[data-panel]');

            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = tab.dataset.tab;

                    // Update active states
                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));

                    tab.classList.add('active');
                    container.querySelector(`[data-panel="${target}"]`).classList.add('active');
                });
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SSRFrontend();
});
```

## Keuntungan Frontend SSR

### 1. SEO Friendly
- HTML sudah lengkap saat diterima crawler
- Meta tags dan structured data tersedia langsung
- Content accessible tanpa JavaScript

### 2. Fast Initial Load
- First Contentful Paint (FCP) lebih cepat
- User melihat konten immediately
- Tidak perlu menunggu JavaScript bundle

### 3. Progressive Enhancement
- Berfungsi tanpa JavaScript
- Enhanced experience dengan JavaScript
- Graceful degradation untuk koneksi lambat

### 4. Server-Side Data Fetching
```javascript
// Data sudah tersedia di template
<script>
    // Data dari server bisa di-pass ke frontend
    window.__INITIAL_DATA__ = <%- JSON.stringify(pageData) %>;

    // Frontend bisa langsung menggunakan data ini
    const initialData = window.__INITIAL_DATA__;
    console.log('User data:', initialData.user);
    console.log('Posts:', initialData.posts);
</script>
```

## Challenges Frontend SSR

### 1. Hydration Issues
```javascript
// Masalah: Server dan client render berbeda
// Solusi: Pastikan konsistensi data dan state

class HydrationManager {
    constructor() {
        this.serverData = window.__SERVER_DATA__;
        this.clientData = this.getClientData();
    }

    hydrate() {
        // Pastikan data server dan client sinkron
        if (this.isDataConsistent()) {
            this.attachEventListeners();
            this.initializeComponents();
        } else {
            // Re-render dengan data client
            this.rerender();
        }
    }

    isDataConsistent() {
        return JSON.stringify(this.serverData) === JSON.stringify(this.clientData);
    }
}
```

### 2. State Management
```javascript
// State management dalam SSR frontend
class StateManager {
    constructor(initialState) {
        this.state = initialState || {};
        this.listeners = [];
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();

        // Persist ke server jika perlu
        this.syncWithServer();
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    async syncWithServer() {
        try {
            await fetch('/api/sync-state', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
            });
        } catch (error) {
            console.error('Failed to sync state:', error);
        }
    }
}
```

## Modern SSR Frontend Patterns

### 1. Island Architecture
```javascript
// Components yang bisa di-hydrate secara terpisah
class IslandComponent {
    constructor(element, props) {
        this.element = element;
        this.props = props;
        this.hydrate();
    }

    hydrate() {
        // Hydrate hanya component ini
        this.bindEvents();
        this.setupState();
    }

    static hydrate(selector) {
        document.querySelectorAll(selector).forEach(element => {
            const props = JSON.parse(element.dataset.props || '{}');
            new IslandComponent(element, props);
        });
    }
}

// Hydrate specific islands
document.addEventListener('DOMContentLoaded', () => {
    IslandComponent.hydrate('[data-island="interactive-chart"]');
    IslandComponent.hydrate('[data-island="user-profile"]');
});
```

### 2. Streaming SSR
```javascript
// Handle streaming content
class StreamingSSR {
    constructor() {
        this.setupStreamHandlers();
    }

    setupStreamHandlers() {
        // Listen for server-sent events
        const eventSource = new EventSource('/stream');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleStreamUpdate(data);
        };
    }

    handleStreamUpdate(data) {
        switch (data.type) {
            case 'content-update':
                this.updateContent(data.payload);
                break;
            case 'user-status':
                this.updateUserStatus(data.payload);
                break;
        }
    }

    updateContent(content) {
        const target = document.getElementById(content.target);
        if (target) {
            target.innerHTML = content.html;
            this.reinitializeComponents(target);
        }
    }
}
```

## Best Practices

### 1. Performance Optimization
```javascript
// Lazy load non-critical JavaScript
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Load heavy components only when needed
async function initializeHeavyComponent() {
    const { HeavyComponent } = await import('./heavy-component.js');
    new HeavyComponent();
}

// Intersection Observer untuk lazy loading
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initializeHeavyComponent();
            observer.unobserve(entry.target);
        }
    });
});
```

### 2. Error Handling
```javascript
// Comprehensive error handling
class ErrorHandler {
    constructor() {
        this.setupGlobalHandlers();
    }

    setupGlobalHandlers() {
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    }

    handleError(event) {
        console.error('JavaScript Error:', event.error);
        this.logError({
            message: event.message,
            filename: event.filename,
            line: event.lineno,
            column: event.colno,
            error: event.error
        });
    }

    handlePromiseRejection(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        this.logError({
            type: 'promise-rejection',
            reason: event.reason
        });
    }

    async logError(errorData) {
        try {
            await fetch('/api/log-error', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(errorData)
            });
        } catch (e) {
            // Fallback error logging
            console.error('Failed to log error:', e);
        }
    }
}
```

## Tools dan Framework

### 1. Template Engines
- **EJS**: Embedded JavaScript templates
- **Handlebars**: Semantic templates
- **Pug**: Clean, whitespace sensitive syntax
- **Mustache**: Logic-less templates

### 2. CSS Frameworks
- **Bootstrap**: Component-based framework
- **Bulma**: Modern CSS framework
- **Tailwind CSS**: Utility-first CSS

### 3. Build Tools
- **Webpack**: Module bundler
- **Gulp**: Task runner
- **Parcel**: Zero-configuration build tool

## Kesimpulan

Frontend dalam arsitektur SSR menawarkan:
- **SEO benefits** dengan HTML yang sudah di-render
- **Fast initial loading** untuk better user experience
- **Progressive enhancement** untuk reliability
- **Server-side data integration** yang seamless

Namun memerlukan:
- **Careful hydration** management
- **State synchronization** antara server dan client
- **Performance optimization** untuk JavaScript enhancement

Frontend SSR adalah balance antara server-side rendering benefits dan client-side interactivity! 🌟
