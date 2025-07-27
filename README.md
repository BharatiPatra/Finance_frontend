# Finance Frontend

A modern Next.js frontend application that provides an intuitive chat-based interface for AI-powered financial analysis and advice. Built with React, TypeScript, and Tailwind CSS, it seamlessly integrates with the Finance Backend to deliver personalized financial insights.

## Features

- **Chat-Based Interface**: Conversational UI for natural financial queries
- **File Upload Support**: Upload and analyze financial documents (PDFs, images, etc.)
- **Session Management**: Persistent user sessions with automatic authentication
- **Real-Time Analysis**: Instant AI-powered financial advice and insights
- **Responsive Design**: Mobile-first design that works across all devices
- **Dark/Light Theme**: User preference-based theme switching
- **Document Processing**: Support for bank statements, tax documents, and reports

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI components
- **State Management**: React Context API
- **HTTP Client**: Fetch API with custom hooks
- **File Handling**: FormData for multipart uploads
- **Font**: Geist font family (optimized by Next.js)

## Project Structure

```
Finance_frontend/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout component
│   │   ├── page.tsx                 # Home page (Dashboard)
│   │   └── globals.css              # Global styles
│   ├── components/                   # Reusable React components
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx        # Main dashboard component
│   │   ├── chat/
│   │   │   ├── ChatInterface.tsx    # Chat UI component
│   │   │   ├── MessageBubble.tsx    # Individual message display
│   │   │   └── FileUpload.tsx       # File upload component
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Application header
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   └── LayoutContent.tsx    # Main layout wrapper
│   │   └── auth/
│   │       └── LoginForm.tsx        # Authentication component
│   ├── contexts/                     # React Context providers
│   │   └── UserSessionContext.tsx   # Session management context
│   ├── hooks/                        # Custom React hooks
│   │   ├── useApiWithSession.ts     # API calls with session
│   │   └── useFileUpload.ts         # File upload handling
│   ├── utils/                        # Utility functions
│   │   ├── api.ts                   # API configuration
│   │   └── constants.ts             # Application constants
│   └── docs/                         # Documentation
│       └── SESSION_MANAGEMENT.md    # Session management guide
├── public/                           # Static assets
│   ├── favicon.ico
│   └── images/
├── .next/                           # Next.js build output
├── .env.local                       # Environment variables (local)
├── .gitignore                       # Git ignore rules
├── Dockerfile                       # Container configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Optional: Enable debug mode
NEXT_PUBLIC_DEBUG=false
```

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Finance Backend running on port 8000

### Local Development

1. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Set environment variables**:

```bash
cp .env.example .env.local
# Edit .env.local with your backend URL
```

3. **Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Docker Deployment

```bash
# Build with backend URL
docker build --build-arg NEXT_PUBLIC_BACKEND_URL=http://your-backend:8000 -t finance-frontend .

# Run container
docker run -p 3000:3000 finance-frontend
```

## Usage

### Authentication Flow

1. User enters phone number on login page
2. System validates with Fi Money MCP server
3. User receives session credentials
4. Automatic redirect to dashboard

### Chat Interface

1. Type financial questions in the chat input
2. Upload documents using the file upload button
3. Receive AI-powered analysis and advice
4. View conversation history

### File Upload

- Supported formats: PDF, DOC, DOCX, JPG, PNG
- Maximum file size: 10MB
- Automatic processing and analysis

## Key Features

### Session Management

- **Persistent Sessions**: Survives page refreshes and browser restarts
- **Automatic Authentication**: Seamless login state management
- **Context-Aware**: Session data available throughout the app

### Chat Interface

- **Real-Time Messaging**: Instant responses from AI agents
- **File Integration**: Upload and analyze documents inline
- **Message History**: Persistent conversation tracking
- **Typing Indicators**: Visual feedback during processing

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layout for tablets
- **Desktop Experience**: Full-featured desktop interface

## API Integration

### Backend Communication

The frontend communicates with the Finance Backend through:

```typescript
// Example API call with session
const { fetchWithSession } = useApiWithSession();

const response = await fetchWithSession("/agent/query", {
  method: "POST",
  body: formData,
});
```

### Session Context

```typescript
// Access session data anywhere in the app
const { userId, sessionId, mcpSessionId, isAuthenticated } = useUserSession();
```

## Development

### Adding New Components

1. Create component in appropriate directory under `src/components/`
2. Follow TypeScript interfaces for props
3. Use Tailwind CSS for styling
4. Add to exports if reusable

### Custom Hooks

```typescript
// Example custom hook structure
export const useCustomHook = () => {
  // Hook logic
  return { data, loading, error };
};
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use CSS modules for complex components

## Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

## Performance Optimization

### Next.js Features

- **App Router**: Latest Next.js routing system
- **Server Components**: Optimized rendering
- **Image Optimization**: Automatic image optimization
- **Font Optimization**: Geist font with Next.js optimization

### Bundle Optimization

- **Tree Shaking**: Automatic dead code elimination
- **Code Splitting**: Route-based code splitting
- **Static Generation**: Pre-rendered pages where possible

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Self-Hosted

```bash
# Build and export
npm run build

# Serve with any static hosting service
# or use the included server
npm run start
```

### Docker

```bash
# Multi-stage build for production
docker build -t finance-frontend .
docker run -p 3000:3000 finance-frontend
```

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**

   - Check `NEXT_PUBLIC_BACKEND_URL` environment variable
   - Ensure Finance Backend is running on correct port

2. **Session Not Persisting**

   - Check browser localStorage
   - Verify session context is properly wrapped

3. **File Upload Errors**

   - Check file size limits
   - Verify supported file formats

4. **Build Errors**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

### Debug Mode

Enable debug logging by setting:

```bash
NEXT_PUBLIC_DEBUG=true
```

## Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile**: iOS Safari, Chrome Mobile

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes following coding standards
4. Test thoroughly
5. Submit pull request with detailed description

### Code Standards

- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful component and function names
- Add JSDoc comments for complex functions

## Security

- **Environment Variables**: Never commit sensitive data
- **Input Validation**: All user inputs are validated
- **Session Security**: Secure session token handling
- **File Upload**: Validated file types and sizes

## License

[Add your license information here]

## Support

For issues and questions:

1. Check existing GitHub issues
2. Create new issue with detailed description
3. Include browser version and error logs
4. Provide steps to reproduce

---

Built with ❤️ using Next.js and modern web technologies.
