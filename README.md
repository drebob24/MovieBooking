## Project Requirements:

Add Functionaly for 2 Level's of Access:

### 1. Admins:

#### Create New Screenings:

Will Require a new Screening Table

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

### 2. Users:

#### Look Up Movies:

- Input: List of movie id's (/movies?id=1,2,3)
- Action: Return All from Movie DB for provided IDs
- Output: List of Movie Titles and Year for Each ID.

#### Look Up Screenings:

- Input: None/ID
- Action: Return Lists from Screening Table
- Output: List of Screenings with Movie Title, Year, Time, Tickets, Tickets Left/Reserved

#### Reserve Ticket:

Will Require a Reservations Table and Users Table

- Input: Screening ID or Movie Title + Screening Time
- Action: Verify Tickets Available, Add Record to Reservations Table, tied to User's ID
- Output: Confirmation with Ticket Count, Movie Info, and Screening Time

#### Look Up Tickets:

- Input: User ID
- Action: Grab data from Reservations Table for given User ID
- Output: List of Ticket Reservations

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
