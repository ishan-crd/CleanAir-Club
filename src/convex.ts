import { ConvexReactClient } from 'convex/react';

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  console.warn(
    'EXPO_PUBLIC_CONVEX_URL is not set. Add it to .env.local (from npx convex dev).'
  );
}

export const convex = new ConvexReactClient(convexUrl || 'https://placeholder.convex.cloud', {
  unsavedChangesWarning: false,
});
