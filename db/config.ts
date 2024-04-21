import { defineDb, defineTable, column } from 'astro:db';

const Courses = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    goal: column.text(),
    curator: column.text(),
    description: column.text(),
    habitat: column.text({ optional: true }),
  },
  indexes: [
    { on: ["habitat", "id"], unique: true },
  ]
});

const Checkpoints = defineTable({
  columns: {
    courseId: column.text({ references: () => Courses.columns.id }),
    task: column.text({ primaryKey: true }),
    href: column.text(),
  }
});

const People = defineTable({
  columns: {
    alias: column.text({ primaryKey: true })
  }
})

const Socials = defineTable({
  columns: {
    alias: column.text({ references: () => People.columns.alias }),
    linkedin: column.text({ primaryKey: true })
  }
})

export default defineDb({
  tables: { People, Socials, Courses, Checkpoints },
})


