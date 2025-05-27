import fs from 'fs'
import path from 'path'
import 'dotenv/config'

const { MIGRATIONS_URL } = process.env

if (!MIGRATIONS_URL) {
  console.error('Error: MIGRATIONS_URL is not set in the environment.')
  process.exit(1)
}

const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0]
const migrationName = process.argv[2] || 'newMigration'
const fileName = `${timestamp}-${migrationName}.ts`
const migrationsPath = path.join(MIGRATIONS_URL, fileName)

function formatTimestamp(isoStamp: string): string {
  const year = isoStamp.slice(0, 4)
  const month = isoStamp.slice(4, 6)
  const day = isoStamp.slice(6, 8)
  const hours = isoStamp.slice(9, 11)
  const minutes = isoStamp.slice(11, 13)
  const seconds = isoStamp.slice(13, 15)

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
}

const migrationTemplate = `import { Kysely, SqliteDatabase } from 'kysely'

export const timestamp = new Date('${formatTimestamp(timestamp)}')

export async function up(db: Kysely<any>): Promise<void> {
  // Define update logic here
}

export async function down(db: Kysely<any>): Promise<void> {
  // Define rollback logic here
}`

fs.writeFileSync(migrationsPath, migrationTemplate)
console.log(`Created migration: ${fileName}`)
