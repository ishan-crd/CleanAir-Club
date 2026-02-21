import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    phone: v.string(),
    createdAt: v.number(),
  }).index('by_phone', ['phone']),

  profiles: defineTable({
    userId: v.id('users'),
    onboardingCompleted: v.optional(v.boolean()),
    createdAt: v.number(),
  }).index('by_userId', ['userId']),
});
