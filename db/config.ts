import { defineDb, defineTable, column } from 'astro:db';


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
  tables: { People, Socials },
})


