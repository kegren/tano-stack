# Database & DI Container: TanStack Start Best Practices Review

A comprehensive review of database integration patterns for TanStack Start applications, focusing on server functions, server components, and full-stack TypeScript patterns with Awilix DI container.

## Executive Summary

The current database DI guide provides a solid foundation but requires significant updates to align with TanStack Start's full-stack architecture. Key gaps include proper server function integration with middleware, TanStack Router loader patterns for data fetching, DI container access in server contexts, and production-grade observability tailored for TanStack Start's unique server/client boundary patterns.

## Critical Gaps in Current Implementation

### 1. Missing TanStack Start Server Function Patterns

#### ❌ Current State
- No discussion of TanStack Start server functions
- Missing server component data fetching patterns
- No TanStack Router loader integration
- Limited understanding of TanStack Start's server/client boundary

#### ✅ TanStack Start Requirements

**Server Functions with Database:**

```typescript
// ✅ TanStack Start Pattern: Server Functions with Database
// routes/users.create.ts
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export const createUser = createServerFn({ method: 'POST' })
  .validator(createUserSchema)
  .handler(async ({ data }) => {
    // Direct database access in server function
    const result = await db.insert(users).values(data).returning()

    // TanStack Start handles cache invalidation
    return result[0]
  })
```

**Server Components with Data Fetching:**

```typescript
// ✅ TanStack Start Pattern: Server Components
// routes/users.index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'

export const Route = createFileRoute('/users')({
  // Server-side data loading with TanStack Router
  loader: async () => {
    const userList = await db.select().from(users).limit(20)
    return { users: userList }
  },

  component: UsersPage,
})

function UsersPage() {
  const { users } = Route.useLoaderData()

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### 2. Missing TanStack Router Data Loading Patterns

#### ❌ Current State
- No discussion of TanStack Router loaders
- Missing server-side data fetching patterns
- No integration with TanStack Start's data flow

#### ✅ TanStack Start Data Loading Patterns

**Route Loaders with Database Queries:**

```typescript
// ✅ TanStack Start Pattern: Route Loaders
// routes/dashboard.index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { db } from '@/lib/db'
import { users, posts } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const Route = createFileRoute('/dashboard')({
  // Server-side loader runs on each navigation
  loader: async ({ context }) => {
    // Access to DI container through router context
    const userRepo = context.container.resolve('userRepository')

    const [userStats, recentPosts] = await Promise.all([
      // Direct database queries in loaders
      db.$count(users),
      db.select()
        .from(posts)
        .orderBy(desc(posts.createdAt))
        .limit(5)
    ])

    return {
      userStats,
      recentPosts,
    }
  },

  component: DashboardPage,
})

function DashboardPage() {
  const { userStats, recentPosts } = Route.useLoaderData()

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <p>Total Users: {userStats}</p>
      </div>
      <div className="posts">
        {recentPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
```

**Server Functions for Data Mutations:**

```typescript
// ✅ TanStack Start Pattern: Server Functions for Mutations
// routes/posts.create.ts
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/lib/db'
import { posts } from '@/lib/db/schema'
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  authorId: z.string(),
})

export const createPost = createServerFn({ method: 'POST' })
  .middleware(async ({ context }) => {
    // Access to DI container in server functions
    const authService = context.container.resolve('authService')
    const user = await authService.getCurrentUser()

    return { user }
  })
  .validator(createPostSchema)
  .handler(async ({ data, context: { user } }) => {
    // Database mutation in server function
    const result = await db.insert(posts).values({
      ...data,
      authorId: user.id,
      createdAt: new Date(),
    }).returning()

    // TanStack Start handles cache invalidation automatically
    return result[0]
  })
```

### 3. Advanced Scalability Patterns Missing

#### ❌ Current State
- Basic horizontal scaling only
- No database sharding strategy
- Missing multi-region deployment patterns

#### ✅ 2025 Advanced Scalability

**Database Sharding Strategy:**

```typescript
// ✅ 2025 Pattern: Database Sharding
// lib/db/sharding.ts
export class ShardedDatabase {
  private shards: Map<string, Database> = new Map()

  constructor(private shardStrategy: (key: string) => string) {}

  getShard(key: string): Database {
    const shardId = this.shardStrategy(key)
    let shard = this.shards.get(shardId)

    if (!shard) {
      shard = createShardDatabase(shardId)
      this.shards.set(shardId, shard)
    }

    return shard
  }

  async executeOnShard<T>(
    key: string,
    operation: (db: Database) => Promise<T>
  ): Promise<T> {
    const shard = this.getShard(key)
    return operation(shard)
  }
}

// Usage
const shardedDb = new ShardedDatabase((userId) => {
  // Simple modulo sharding
  const shardId = parseInt(userId) % 4
  return `shard-${shardId}`
})

await shardedDb.executeOnShard(userId, async (db) => {
  return db.query.users.findFirst({ where: eq(users.id, userId) })
})
```

**CQRS with Read/Write Separation:**

```typescript
// ✅ 2025 Pattern: CQRS Architecture
// lib/db/cqrs.ts
export class CQRS {
  constructor(
    private writeDb: Database,
    private readDb: Database
  ) {}

  // Commands (write operations)
  async executeCommand<T>(command: (db: Database) => Promise<T>): Promise<T> {
    return command(this.writeDb)
  }

  // Queries (read operations)
  async executeQuery<T>(query: (db: Database) => Promise<T>): Promise<T> {
    return query(this.readDb)
  }
}

// Usage
const cqrs = new CQRS(writeDatabase, readDatabase)

// Write operation
await cqrs.executeCommand(async (db) => {
  return db.insert(users).values(userData)
})

// Read operation
const users = await cqrs.executeQuery(async (db) => {
  return db.select().from(users).limit(10)
})
```

### 4. Performance & Monitoring Gaps

#### ❌ Current State
- Basic connection pooling
- No query performance monitoring
- Missing caching strategies
- No slow query detection

#### ✅ 2025 Performance Patterns

**Advanced Query Performance Monitoring:**

```typescript
// ✅ 2025 Pattern: Query Performance Monitoring
// lib/db/performance.ts
export class QueryPerformanceMonitor {
  private queryStats: Map<string, QueryStat> = new Map()

  async executeWithMonitoring<T>(
    queryName: string,
    query: () => Promise<T>
  ): Promise<T> {
    const start = performance.now()

    try {
      const result = await query()
      const duration = performance.now() - start

      this.recordQueryStat(queryName, duration, true)
      return result
    } catch (error) {
      const duration = performance.now() - start
      this.recordQueryStat(queryName, duration, false)
      throw error
    }
  }

  private recordQueryStat(queryName: string, duration: number, success: boolean) {
    const stat = this.queryStats.get(queryName) || {
      count: 0,
      totalTime: 0,
      errors: 0,
      p95: 0,
    }

    stat.count++
    stat.totalTime += duration
    if (!success) stat.errors++

    // Update P95 calculation
    stat.p95 = this.calculateP95(queryName, duration)

    this.queryStats.set(queryName, stat)

    // Log slow queries
    if (duration > 1000) {
      console.warn(`Slow query: ${queryName} took ${duration}ms`)
    }
  }

  getMetrics() {
    return Object.fromEntries(this.queryStats)
  }
}
```

**Intelligent Connection Pooling:**

```typescript
// ✅ 2025 Pattern: Adaptive Connection Pooling
// lib/db/adaptive-pool.ts
export class AdaptiveConnectionPool {
  private pool: postgres.Pool
  private metrics = new QueryPerformanceMonitor()

  constructor(private config: PoolConfig) {
    this.pool = this.createPool()
    this.startAdaptiveScaling()
  }

  private createPool(): postgres.Pool {
    return new postgres.Pool({
      ...this.config,
      // Start with minimal connections
      min: 2,
      max: this.calculateOptimalMax(),
    })
  }

  private calculateOptimalMax(): number {
    // Adaptive sizing based on load
    const loadFactor = this.getCurrentLoadFactor()
    const baseMax = this.config.max || 10

    return Math.max(5, Math.min(baseMax * 2, Math.floor(baseMax * loadFactor)))
  }

  private getCurrentLoadFactor(): number {
    const metrics = this.metrics.getMetrics()
    const avgResponseTime = this.calculateAverageResponseTime(metrics)

    // Scale up if response time > 100ms, scale down if < 50ms
    if (avgResponseTime > 100) return 1.5
    if (avgResponseTime < 50) return 0.8
    return 1.0
  }

  private startAdaptiveScaling() {
    setInterval(() => {
      const newMax = this.calculateOptimalMax()
      if (newMax !== this.pool.options.max) {
        console.log(`Adjusting pool max to: ${newMax}`)
        this.pool.options.max = newMax
      }
    }, 30000) // Every 30 seconds
  }
}
```

### 5. TanStack Start Data Flow Integration

#### ❌ Current State
- Traditional repository pattern only
- No TanStack Router loader integration
- Missing server function middleware patterns
- No understanding of TanStack Start's data flow

#### ✅ TanStack Start Data Flow Patterns

**Server Functions with Middleware & Database:**

```typescript
// ✅ TanStack Start Pattern: Server Functions with Middleware
// routes/users.update-profile.ts
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const updateProfileSchema = z.object({
  name: z.string().min(1),
  bio: z.string().optional(),
})

export const updateProfile = createServerFn({ method: 'POST' })
  .middleware(async ({ context }) => {
    // Access DI container in middleware
    const authService = context.container.resolve('authService')
    const session = await authService.getSession()

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    return { user: session.user }
  })
  .validator(updateProfileSchema)
  .handler(async ({ data, context: { user } }) => {
    // Database mutation with user context
    const result = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning()

    return result[0]
  })
```

**Route Loaders with Error Boundaries:**

```typescript
// ✅ TanStack Start Pattern: Loaders with Error Handling
// routes/users.$userId.tsx
import { createFileRoute } from '@tanstack/react-router'
import { db } from '@/lib/db'
import { users, posts } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const Route = createFileRoute('/users/$userId')({
  // Server-side loader with error handling
  loader: async ({ params, context }) => {
    const authService = context.container.resolve('authService')
    const currentUser = await authService.getCurrentUser()

    const [user, userPosts] = await Promise.all([
      db.select().from(users).where(eq(users.id, params.userId)).limit(1),
      db.select().from(posts).where(eq(posts.authorId, params.userId)).limit(10)
    ])

    if (!user[0]) {
      throw new Error('User not found')
    }

    // Check permissions
    const canViewProfile = currentUser?.id === params.userId ||
                          currentUser?.role === 'admin'

    if (!canViewProfile) {
      throw new Error('Access denied')
    }

    return {
      user: user[0],
      posts: userPosts,
    }
  },

  // Error boundary for database errors
  errorComponent: ({ error }) => (
    <div className="error">
      <h1>Error Loading User</h1>
      <p>{error.message}</p>
    </div>
  ),

  component: UserProfilePage,
})

function UserProfilePage() {
  const { user, posts } = Route.useLoaderData()

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.bio}</p>

      <h2>Recent Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### 6. Production-Grade Observability

#### ❌ Current State
- Basic error handling
- No health checks
- Missing monitoring integration

#### ✅ 2025 Observability Patterns

**Comprehensive Database Health Checks:**

```typescript
// ✅ 2025 Pattern: Database Health Monitoring
// lib/db/health.ts
export class DatabaseHealthMonitor {
  constructor(private db: Database) {}

  async getHealthStatus(): Promise<HealthStatus> {
    const start = Date.now()

    try {
      // Connection health
      await this.db.execute(sql`SELECT 1`)

      // Performance metrics
      const metrics = await this.getPerformanceMetrics()

      // Schema validation
      await this.validateSchema()

      return {
        status: 'healthy',
        responseTime: Date.now() - start,
        metrics,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        responseTime: Date.now() - start,
        timestamp: new Date().toISOString(),
      }
    }
  }

  private async getPerformanceMetrics() {
    // Query active connections
    const connections = await this.db.execute(sql`
      SELECT count(*) as active_connections
      FROM pg_stat_activity
      WHERE state = 'active'
    `)

    // Query slow queries
    const slowQueries = await this.db.execute(sql`
      SELECT query, total_time, calls
      FROM pg_stat_statements
      WHERE total_time / calls > 1000
      ORDER BY total_time DESC
      LIMIT 10
    `)

    return {
      activeConnections: connections[0].active_connections,
      slowQueries: slowQueries,
    }
  }

  private async validateSchema() {
    // Validate critical tables exist
    const tables = await this.db.execute(sql`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
    `)

    const requiredTables = ['users', 'sessions', 'accounts']
    const existingTables = tables.map(t => t.tablename)

    for (const required of requiredTables) {
      if (!existingTables.includes(required)) {
        throw new Error(`Required table missing: ${required}`)
      }
    }
  }
}
```

**Distributed Tracing Integration:**

```typescript
// ✅ 2025 Pattern: Database Tracing
// lib/db/tracing.ts
export class DatabaseTracer {
  constructor(private tracer: Tracer) {}

  async traceQuery<T>(
    queryName: string,
    query: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    const span = this.tracer.startSpan(`db.query.${queryName}`, {
      attributes: {
        'db.operation': 'query',
        'db.query.name': queryName,
        ...metadata,
      },
    })

    try {
      const result = await query()
      span.setStatus({ code: SpanStatusCode.OK })
      return result
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      })
      span.recordException(error)
      throw error
    } finally {
      span.end()
    }
  }
}
```

### 7. Security Enhancements

#### ❌ Current State
- Basic connection strings
- No encryption discussion
- Missing access control patterns

#### ✅ 2025 Security Patterns

**Secure Connection Management:**

```typescript
// ✅ 2025 Pattern: Secure Database Connections
// lib/db/secure.ts
export class SecureDatabase {
  constructor(private config: SecureDatabaseConfig) {}

  private createSecureConnection() {
    const connectionString = this.decryptConnectionString()

    return postgres(connectionString, {
      // SSL/TLS configuration
      ssl: {
        rejectUnauthorized: true,
        ca: this.getCACertificate(),
      },

      // Connection timeout for security
      connect_timeout: 5,

      // Prepared statements for SQL injection prevention
      prepare: true,
    })
  }

  private decryptConnectionString(): string {
    // Decrypt encrypted connection string from environment
    const encrypted = process.env.DB_ENCRYPTED_URL
    if (!encrypted) throw new Error('Encrypted DB URL required')

    return this.config.kms.decrypt(encrypted)
  }

  private getCACertificate(): string {
    // Load CA certificate from secure storage
    return this.config.certStore.getCACert()
  }
}
```

### 8. Migration & Schema Management

#### ❌ Current State
- Basic schema imports
- No migration strategies
- Missing schema versioning

#### ✅ 2025 Migration Patterns

**Advanced Schema Management:**

```typescript
// ✅ 2025 Pattern: Schema Versioning
// lib/db/migrations/manager.ts
export class MigrationManager {
  constructor(private db: Database) {}

  async getCurrentVersion(): Promise<string> {
    const result = await this.db.execute(sql`
      SELECT version FROM schema_versions
      ORDER BY applied_at DESC
      LIMIT 1
    `)

    return result[0]?.version || '0.0.0'
  }

  async applyMigrations(targetVersion?: string) {
    const currentVersion = await this.getCurrentVersion()
    const migrations = await this.getPendingMigrations(currentVersion, targetVersion)

    for (const migration of migrations) {
      await this.executeMigration(migration)
      await this.recordMigration(migration)
    }
  }

  private async executeMigration(migration: Migration) {
    const { up } = await import(`./migrations/${migration.file}`)

    await this.db.transaction(async (tx) => {
      await up(tx)
    })
  }
}
```

## Recommended Architecture for TanStack Start

### 1. TanStack Start Data Access Pattern

```typescript
// lib/data-access/tanstack-start.ts
export class TanStackStartDataAccess {
  constructor(
    private db: Database,           // DI container database
    private cache: CacheLayer,      // Optional caching layer
  ) {}

  // Route Loaders: Server-side data fetching
  async getUserForLoader(id: string) {
    // Direct database access in loaders
    return this.db.drizzle.query.users.findFirst({
      where: eq(users.id, id)
    })
  }

  // Server Functions: Data mutations with caching
  async updateUser(id: string, data: Partial<User>) {
    const result = await this.db.drizzle.update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning()

    // Invalidate cache if using caching
    if (this.cache) {
      await this.cache.del(`user:${id}`)
    }

    return result[0]
  }

  // Cached reads for performance
  async getUserCached(id: string) {
    if (this.cache) {
      const cached = await this.cache.get(`user:${id}`)
      if (cached) return cached
    }

    const user = await this.getUserForLoader(id)

    if (this.cache && user) {
      await this.cache.set(`user:${id}`, user, { ttl: 300 })
    }

    return user
  }
}
```

### 2. Server Function Middleware Pattern

```typescript
// lib/server-functions/auth-middleware.ts
export function withAuth<T extends any[], R>(
  serverFn: (...args: T) => Promise<R>
) {
  return createServerFn()
    .middleware(async ({ context }) => {
      const authService = context.container.resolve('authService')
      const user = await authService.getCurrentUser()

      if (!user) {
        throw new Error('Unauthorized')
      }

      return { user }
    })
    .handler(async ({ context: { user }, ...args }) => {
      // User context available in handler
      return serverFn(user, ...args)
    })
}

// Usage
export const updateUserProfile = withAuth(
  async (user: User, profileData: ProfileData) => {
    const db = resolve<Database>('db')
    return db.drizzle.update(users)
      .set(profileData)
      .where(eq(users.id, user.id))
      .returning()
  }
)
```

## Implementation Roadmap for TanStack Start

### Phase 1: Core Infrastructure (Weeks 1-2)
- [ ] Implement Database wrapper class with health checks
- [ ] Set up connection pooling with adaptive sizing
- [ ] Register database in router context
- [ ] Create basic repository pattern with DI
- [ ] Add error handling and logging

### Phase 2: TanStack Start Integration (Weeks 3-4)
- [ ] Implement Server Functions for data mutations
- [ ] Add Route Loaders for server-side data fetching
- [ ] Integrate DI container in router context
- [ ] Create middleware patterns for server functions
- [ ] Add validation with Zod in server functions

### Phase 3: Data Flow Optimization (Weeks 5-6)
- [ ] Implement query performance monitoring
- [ ] Add caching layer for route loaders
- [ ] Set up error boundaries for database errors
- [ ] Optimize database queries in loaders
- [ ] Add TanStack Query integration for client-side caching

### Phase 4: Production Readiness (Weeks 7-8)
- [ ] Implement comprehensive health checks
- [ ] Add distributed tracing for server functions
- [ ] Set up monitoring and alerting for loaders
- [ ] Create database migration system
- [ ] Add backup and recovery procedures
- [ ] Implement circuit breakers for database failures

### Phase 5: Advanced TanStack Start Features (Weeks 9-10)
- [ ] Implement streaming responses in loaders
- [ ] Add progressive enhancement with fallbacks
- [ ] Create advanced middleware patterns
- [ ] Set up database connection monitoring
- [ ] Implement optimistic updates with server functions

## Key Metrics to Track

### Performance Metrics
- Query response time (P50, P95, P99)
- Connection pool utilization
- Cache hit ratio
- Database throughput

### Scalability Metrics
- Concurrent connections
- Query load distribution
- Cross-region latency
- Auto-scaling triggers

### Reliability Metrics
- Database uptime
- Error rates by operation
- Circuit breaker activation
- Fallback usage

## Conclusion

The current database DI guide needs significant updates to align with TanStack Start's architecture. Key improvements needed:

1. **Server Functions Integration**: Proper middleware patterns with DI container access
2. **Route Loaders with Database**: Server-side data fetching with error boundaries
3. **TanStack Router Data Flow**: Proper loading states and navigation
4. **DI Container Context**: Access to services in loaders and server functions
5. **Full-Stack TypeScript Patterns**: Type-safe data flow from server to client
6. **Performance Monitoring**: Query performance, connection pooling, caching
7. **Production Observability**: Health checks, tracing, monitoring for TanStack Start

The recommended architecture provides a solid foundation for building scalable, performant, and maintainable TanStack Start applications with proper database integration and dependency injection.
