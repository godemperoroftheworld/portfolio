import { column, defineDb, defineTable } from 'astro:db';

const Comment = defineTable({
  columns: {
    id:        column.number({ primaryKey: true }),
    postSlug:  column.text(),
    parentId:  column.number({ optional: true }),
    name:      column.text(),
    body:      column.text(),
    likes:     column.number({ default: 0 }),
    createdAt: column.date(),
  }
})


// https://astro.build/db/config
export default defineDb({
  tables: { Comment }
});
