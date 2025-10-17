# Tasks Feature

This directory contains all task-related functionality for the application.

## Structure

```
tasks/
├── hooks/
│   └── useTasks.ts         # Task management hooks (queries and mutations)
└── components/
    └── TaskItem.tsx        # Task item component
```

## Key Components

- **useTasks.ts**: Custom hooks for managing tasks including fetching, creating, and updating
- **TaskItem.tsx**: UI component for displaying individual tasks

## Offline Support

- Uses TanStack Query for automatic caching and background synchronization
- Implements optimistic updates for immediate UI feedback
- Persists query cache to MMKV for offline access