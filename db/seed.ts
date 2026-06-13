import { db, Comment } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Comment).values([
    {
      id: 1,
      postSlug: 'breaking-the-script',
      parentId: null,
      name: 'Tenzin',
      email: 'tenzin@example.com',
      body: 'This is so cool!',
      likes: 4,
      createdAt: new Date('2025-06-09T10:32:00'),
    },
    {
      id: 2,
      postSlug: 'breaking-the-script',
      parentId: null,
      name: 'Jon',
      email: 'jon@example.com',
      body: 'Wowow. Bookmarked to come back to this.',
      likes: 2,
      createdAt: new Date('2025-06-10T14:15:00'),
    },
    {
      id: 3,
      postSlug: 'breaking-the-script',
      parentId: 2,
      name: 'Mat',
      email: 'mat@example.com',
      body: 'So true!',
      likes: 3,
      createdAt: new Date('2025-06-11T14:15:00'),
    },
  ])
}
