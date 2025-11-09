# Available Scripts

This document describes all the available npm scripts for code quality and formatting.

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

## 🚀 Development Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm run build:check` - Run TypeScript check + build
- `npm run preview` - Preview production build

## 📋 Usage Examples

### **Before Committing**

```bash
# Check code quality without fixing
npm run quality

# Fix all issues automatically
npm run quality:fix
```

### **During Development**

```bash
# Quick format check
npm run format:check

# Format your code
npm run format
```

### **For CI/CD Pipelines**

```bash
# Use this in your CI to ensure code quality
npm run quality
```

## ⚙️ Configuration

- **ESLint**: Configured in `eslint.config.js`
- **Prettier**: Configured in `.prettierrc`
- **Ignore Files**: `.prettierignore` and `.gitignore`

## 🎯 Best Practices

1. **Before committing**: Run `npm run quality:fix`
2. **In CI/CD**: Use `npm run quality`
3. **For code reviews**: Ensure `npm run quality` passes
4. **IDE Integration**: Set up your IDE to run Prettier on save

This setup ensures consistent code formatting and catches common issues before they reach production!
