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
    { on: ["id", "habitat"], unique: true },
  ]
});

const Checkpoints = defineTable({
  columns: {
    courseId: column.text({ references: () => Courses.columns.id }),
    task: column.text(),
    href: column.text(),
    description: column.text({ optional: true })
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
    linkedin: column.text({ optional: true })
  }
})

export default defineDb({
  tables: { Courses, Checkpoints, People, Socials },
})


