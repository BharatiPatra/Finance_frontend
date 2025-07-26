# Session Management in Next.js Finance App

This document explains how user ID, session ID, and MCP session ID are consistently managed across all pages in the Next.js application.

## Overview

The application uses React Context to manage user session data consistently across all pages. This eliminates the need to pass session parameters through URL query strings or manually manage them in each component.

## Architecture

### 1. UserSessionContext (`src/contexts/UserSessionContext.tsx`)

The main context that manages user session state:

```typescript
interface UserSessionData {
  userId: string | null;
  sessionId: string | null;
  mcpSessionId: string | null;
}
```

**Key Features:**
- Stores session data in React state
- Persists session data to localStorage for page refreshes
- Provides authentication status
- Handles session clearing

### 2. useApiWithSession Hook (`src/hooks/useApiWithSession.ts`)

A custom hook that simplifies API calls with session parameters:

```typescript
const { fetchWithSession, hasSession, getSessionParams } = useApiWithSession();
```

**Key Features:**
- Automatically includes session parameters in API calls
- Provides session validation
- Offers multiple ways to access session data

### 3. LayoutContent Component (`src/components/LayoutContent.tsx`)

Handles conditional rendering based on authentication status:
- Shows login page if not authenticated
- Shows main app layout if authenticated

## Usage Examples

### 1. Basic Session Access

```typescript
import { useUserSession } from '../contexts/UserSessionContext';

const MyComponent = () => {
  const { userSession, isAuthenticated } = useUserSession();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <p>Welcome, User ID: {userSession.userId}</p>
    </div>
  );
};
```

### 2. API Calls with Session

```typescript
import { useApiWithSession } from '../hooks/useApiWithSession';

const MyComponent = () => {
  const { fetchWithSession, hasSession } = useApiWithSession();
  
  const loadData = async () => {
    if (!hasSession) return;
    
    try {
      const response = await fetchWithSession('http://127.0.0.1:8000/api/data');
      const data = await response.json();
      // Handle data
    } catch (error) {
      console.error('API call failed:', error);
    }
  };
  
  return <button onClick={loadData}>Load Data</button>;
};
```

### 3. Manual Session Parameter Usage

```typescript
import { useUserSession } from '../contexts/UserSessionContext';

const MyComponent = () => {
  const { userSession } = useUserSession();
  
  const makeManualApiCall = async () => {
    const { userId, sessionId, mcpSessionId } = userSession;
    
    if (!userId || !sessionId || !mcpSessionId) {
      console.error('Session not available');
      return;
    }
    
    const url = `http://127.0.0.1:8000/api/endpoint?userId=${userId}&sessionId=${sessionId}&mcpSessionId=${mcpSessionId}`;
    const response = await fetch(url);
    // Handle response
  };
  
  return <button onClick={makeManualApiCall}>Manual API Call</button>;
};
```

## Implementation Details

### Session Flow

1. **Login Process:**
   - User completes authentication
   - Login component receives userId, sessionId, mcpSessionId
   - Session data is stored in context and localStorage
   - User is redirected to main app

2. **Page Navigation:**
   - Session data persists across page changes
   - No need to pass session data through URLs
   - Components can access session data anywhere in the app

3. **API Calls:**
   - Use `useApiWithSession` hook for automatic session inclusion
   - Or manually access session data from context

4. **Logout:**
   - Call `clearUserSession()` to clear all session data
   - User is automatically redirected to login page

### Persistence

- Session data is stored in localStorage
- Survives page refreshes and browser restarts
- Automatically cleared on logout

### Error Handling

- Components check `isAuthenticated` before rendering protected content
- API calls validate session availability before making requests
- Graceful fallbacks for missing session data

## Migration from URL Parameters

If you have existing components using URL parameters for session data:

**Before:**
```typescript
const searchParams = useSearchParams();
const userId = searchParams.get("userId");
const sessionId = searchParams.get("sessionId");
const mcpSessionId = searchParams.get("mcpSessionId");
```

**After:**
```typescript
const { userSession } = useUserSession();
const { userId, sessionId, mcpSessionId } = userSession;
```

## Best Practices

1. **Always check authentication status** before rendering protected content
2. **Use the `useApiWithSession` hook** for API calls when possible
3. **Handle loading states** while session data is being initialized
4. **Clear session data** on logout or authentication errors
5. **Validate session data** before making critical API calls

## Troubleshooting

### Session Not Available
- Check if user is properly authenticated
- Verify localStorage contains session data
- Ensure UserSessionProvider wraps your components

### API Calls Failing
- Verify session data is available using `hasSession`
- Check network requests include session parameters
- Validate backend expects the session format

### Page Refresh Issues
- Session data should persist via localStorage
- If not persisting, check browser storage settings
- Verify UserSessionProvider is in the correct location in component tree
