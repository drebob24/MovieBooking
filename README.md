## Project Requirements:

Add Functionaly for 2 Level's of Access:

### 1. Admins:

#### Create New Screenings:

- Input: Date & Time of the Screening (Timestamp), Movie ID, Ticket Count
- Constraints:
  - DateTime: Future Date, Timestamp Format
  - Movide ID: must exist in DB
  - Ticket Count: > 0 and < 200 (let's assume a medium sized theater)
  - Bonus Constraint: Limit of screenings for show times (could use like 2hr showtime length since the db doesn't have movie lengths)
- Action: Create DB record in Screening Table: id, movie_id, tickets, reservations, time
- Output: Created Successfully Message + Screening ID

### Delete Empty Screening (Optional)

-Constraints: Reserved Tickets = 0

### Change Screening Size (Optional)

-Constraints: Ticket Amount >= Reserved Tickets

## Setup

**Note:** For this exercise, we have provided an `.env` file with the database connection string. Normally, you would not commit this file to version control. We are doing it here for simplicity and given that we are using a local SQLite database.

## Migrations

Before running the migrations, we need to create a database. We can do this by running the following command:

```bash
npm run migrate:latest
```

## Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run start
```

## Updating types

If you make changes to the database schema, you will need to update the types. You can do this by running the following command:

```bash
npm run generate-types
```
