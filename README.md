## Project Requirements:

Add Functionaly for 2 Level's of Access:

### 1. Admins:

#### Create New Screenings:

- [x] Will Require a new Screening Table 

- [x] - Input: Date & Time of the Screening (Timestamp), Movie ID, Ticket Count
- [x] - Constraints:
  - [x] - DateTime: Future Date, Timestamp Format
  - [x] - Movide ID: must exist in DB
  - [x] - Ticket Count: > 0 and < 200 (let's assume a medium sized theater)
  - Bonus Constraint: Limit of screenings for show times (could use like 2hr showtime length since the db doesn't have movie lengths)
- [x] - Action: Create DB record in Screening Table: id, movie_id, tickets, reservations (to be handled seperately), time
- [x] - Output: Created Successfully Message + Screening ID : Currently Returns a 201 Status and the new Entry as a JSON

#### Delete Empty Screening (Optional)

-Constraints: Reserved Tickets = 0

#### Change Screening Size (Optional)

-Constraints: Ticket Amount >= Reserved Tickets

### 2. Users:

#### Look Up Movies:

- [x] - Input: List of movie id's or titles (/movies?id=1,2,3)
- [x] - Action: Return All from Movie DB for provided IDs/Titles.
- [x] - Output: List of Movie Titles and Year for Each ID/TItle.

#### Look Up Screenings:

- [x] - Input: None/ID/MovieId
- [x] - Action: Return Lists from Screening Table
- Output: List of Screenings with ~Movie Title, Year, Time, Tickets,~ Tickets Left/Reserved--Reserved Count To Be Added

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
