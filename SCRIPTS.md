# Available Scripts

This document describes all the available npm scripts for development, testing, building, and deployment.

## 📝 Development Scripts

### **Development Server**

- `npm run dev` - Start development server on port 4000 with hot reload
- `npm run preview` - Preview production build locally

### **Build Scripts**

- `npm run build` - Build for production
- `npm run build:check` - Run TypeScript check before building

## 🧪 Testing Scripts

### **Test Runner**

- `npm run test` - Run tests in watch mode with hot reload
- `npm run test:ui` - Run tests with visual UI interface
- `npm run test:run` - Run tests once in CI mode
- `npm run test:coverage` - Run tests with coverage report

### **Test Coverage**

- `npm run test:coverage` - Generate coverage report with detailed statistics
- `timeout 30 npm run test:coverage` - Run coverage with timeout to prevent hanging

## 📝 Code Quality Scripts

### **Linting**

- `npm run lint` - Check for ESLint issues (fails on errors/warnings)
- `npm run lint:fix` - Auto-fix ESLint issues where possible

### **Formatting**

- `npm run prettier:check` - Check Prettier formatting (fails if files need formatting)
- `npm run prettier:fix` - Auto-format all files with Prettier
- `npm run format` - Alias for `npm run prettier:fix`
- `npm run format:check` - Alias for `npm run prettier:check`

### **Combined Commands** ⭐

- `npm run quality` - Run both `lint` and `prettier:check` (recommended for CI/CD)
- `npm run quality:fix` - Run both `lint:fix` and `prettier:fix` (recommended for development)

## 🐳 Docker Scripts

### **Deployment**

- `./deploy.sh` - Deploy application with Docker
- `./rebuild-and-deploy.sh` - Rebuild and deploy with fixes
- `./test-build.sh` - Test build locally before deployment

## 📋 Usage Examples

### **Development Workflow**

```bash
# Start development server
npm run dev

# Run tests while developing
npm run test

# Check code quality
npm run quality:fix
```

### **Before Committing**

```bash
# Ensure all checks pass
npm run quality

# Run tests once
npm run test:run

# Verify build works
npm run build:check
```

### **CI/CD Pipeline**

```bash
# Code quality checks
npm run quality

# Run all tests
npm run test:run

# Generate coverage report
npm run test:coverage

# Build application
npm run build
```

### **Testing Specific Areas**

```bash
# Test specific files
npm run test:run -- src/hooks/useDebouncedSearch.test.ts

# Test specific component
npm run test:run -- src/features/detail/components/AnimeCard.test.tsx

# Run with coverage for specific area
npm run test:coverage -- --reporter=text src/features/
```

### **Deployment Preparation**

```bash
# Test build locally
./test-build.sh

# Deploy to production
./deploy.sh
```

## ⚙️ Configuration

### **Development Tools**
- **Vitest**: Test runner configuration (`vitest.config.ts`)
- **ESLint**: Linting rules (`eslint.config.js`)
- **Prettier**: Code formatting (`.prettierrc`)
- **TypeScript**: Type checking (`tsconfig.json`)

### **Test Environment**
- **Test Setup**: `src/test/setup.ts` with mocks and configuration
- **Coverage**: Configured with v8 provider
- **Path Aliases**: `@/` → `src/` for imports

### **Docker**
- **Multi-stage Build**: Optimized production builds
- **Nginx**: Production-ready static hosting
- **Health Checks**: Container health monitoring

## 🎯 Best Practices

### **Development**
1. **Before committing**: Run `npm run quality:fix`
2. **During development**: Use `npm run test` for TDD
3. **For code reviews**: Ensure `npm run quality` passes
4. **IDE Integration**: Set up IDE to run tests and format on save

### **Testing**
1. **Write tests first** (TDD approach)
2. **Test coverage**: Aim for high coverage on critical paths
3. **Edge cases**: Test error scenarios and boundary conditions
4. **Integration**: Test component interactions
5. **Accessibility**: Test keyboard navigation and screen readers

### **Production**
1. **Quality Gates**: Use `npm run quality` in CI/CD
2. **Testing**: Run `npm run test:run` in pipelines
3. **Build Verification**: Use `npm run build:check` before deployment
4. **Docker**: Test deployment locally with `./test-build.sh`

### **Performance**
1. **Bundle Analysis**: Monitor bundle size with coverage reports
2. **Lazy Loading**: Ensure route-level code splitting works
3. **Asset Optimization**: Verify gzip compression and caching
4. **Memory Usage**: Monitor for memory leaks in long-running apps

This comprehensive script setup ensures high-quality code, thorough testing, and smooth deployment workflows!
