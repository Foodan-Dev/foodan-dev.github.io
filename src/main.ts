import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import DocsView from './views/DocsView.vue'
import PostView from './views/PostView.vue'
import { isPostId } from './lib/post-links'
import './styles.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/post/:id', name: 'post', component: PostView },
    { path: '/docs', name: 'docs', component: DocsView },
    { path: '/docs/:page', name: 'doc-page', component: DocsView },
  ],
  scrollBehavior: (to) => (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }),
})

// Global guards also validate changes between IDs on the same route.
router.beforeEach(to => to.name === 'post' && !isPostId(to.params.id) ? { name: 'home' } : true)

createApp(App).use(router).mount('#app')
