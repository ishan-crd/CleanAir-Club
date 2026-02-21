import { mutation } from './_generated/server';
import type { Id } from './_generated/dataModel';
import { v } from 'convex/values';

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10) || phone.trim();
}

export const signInWithPhone = mutation({
  args: { phone: v.string() },
  handler: async (ctx, { phone }): Promise<Id<'users'>> => {
    const normalized = normalizePhone(phone);
    if (!normalized) throw new Error('Please enter a valid phone number');

    const existing = await ctx.db
      .query('users')
      .withIndex('by_phone', (q) => q.eq('phone', normalized))
      .first();

    let userId: Id<'users'>;
    if (existing) {
      userId = existing._id;
    } else {
      userId = await ctx.db.insert('users', {
        phone: normalized,
        createdAt: Date.now(),
      });
    }

    const profile = await ctx.db
      .query('profiles')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .first();

    if (!profile) {
      await ctx.db.insert('profiles', {
        userId,
        createdAt: Date.now(),
      });
    }

    return userId;
  },
});
