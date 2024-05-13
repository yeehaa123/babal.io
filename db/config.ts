import { defineDb, defineTable, column } from 'astro:db';

const Courses = defineTable({
  columns: {
    courseId: column.text({ primaryKey: true }),
    goal: column.text(),
    curator: column.text(),
    description: column.text(),
    habitat: column.text({ unique: true, optional: true }),
  },
  indexes: [
    { on: ["courseId", "habitat"], unique: true },
  ]
});

const Checkpoints = defineTable({
  columns: {
    checkpointId: column.text({ primaryKey: true }),
    courseId: column.text({ references: () => Courses.columns.courseId }),
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

const CompletionData = defineTable({
  columns: {
    courseId: column.text({ references: () => Courses.columns.courseId }),
    checkpointId: column.text({ references: () => Checkpoints.columns.checkpointId }),
    userName: column.text({ references: () => People.columns.alias }),
    completedAt: column.date()
  },
  indexes: [
    { on: ["courseId", "userName"] },
  ]
})

const BookmarkData = defineTable({
  columns: {
    courseId: column.text({ references: () => Courses.columns.courseId }),
    userName: column.text({ references: () => People.columns.alias }),
    bookmarkedAt: column.date()
  },
  indexes: [
    { on: ["courseId", "userName"] },
  ]
})

const NoteData = defineTable({
  columns: {
    courseId: column.text({ references: () => Courses.columns.courseId }),
    userName: column.text({ references: () => People.columns.alias }),
    createdAt: column.date(),
    message: column.text()
  },
  indexes: [
    { on: ["courseId", "userName"] },
  ]
})

export default defineDb({
  tables: {
    Courses,
    Checkpoints,
    People,
    Socials,
    CompletionData,
    BookmarkData,
    NoteData
  },
})
