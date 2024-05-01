import { defineDb, defineTable, column } from 'astro:db';

const Courses = defineTable({
  columns: {
    goal: column.text({ primaryKey: true }),
    curator: column.text(),
    description: column.text(),
    habitat: column.text({ optional: true }),
  },
  indexes: [
    { on: ["goal", "habitat"], unique: true },
  ]
});

const Checkpoints = defineTable({
  columns: {
    goal: column.text({ references: () => Courses.columns.goal }),
    task: column.text(),
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
    linkedin: column.text({ optional: true })
  }
})

export default defineDb({
  tables: { Courses, Checkpoints, People, Socials },
})


