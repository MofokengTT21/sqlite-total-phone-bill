# Phone Bill Calculation API with SQLite3

This project is an API built with **Express.js** and **SQLite3** for calculating phone bills based on various price plans. It allows users to create, read, update, and delete price plans while calculating the total phone bill based on SMS and call usage.

## Features

- Calculate the total phone bill based on price plans, SMS count, and call duration.
- Create new price plans with customizable SMS and call rates.
- View a list of all price plans.
- Update existing price plans.
- Delete specific price plans.
- Automatically reset the database to initial data after updates (with a 2-minute delay).

## Technologies Used

- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for handling routes and middleware.
- **SQLite3**: Lightweight SQL database for storing price plans.
- **Knex.js**: SQL query builder for interacting with the SQLite3 database.
- **Cors**: For handling cross-origin requests.
- **File System (fs)**: For reading and resetting the database with initial data.

## Prerequisites

- **Node.js** installed on your machine.
- **SQLite3** for database management.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MofokengTT21/phone-bill-api-sqlite3.git
   ```

2. Navigate into the project directory:
   ```bash
   cd phone-bill-api-sqlite3
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up your database. Make sure you have an `initialData.json` file in the `db/` folder to populate your price plans data.

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. The API will be running at `http://localhost:3000/`.

## API Endpoints

### **Phone Bill Calculation**

- **POST** `/api/phonebill/`: Calculate the total phone bill based on a price plan, SMS count, and call duration.

  **Request body example**:
  ```json
  {
    "price_plan": "Standard",
    "smsCount": 50,
    "callDurationSeconds": 1200
  }
  ```

  **Response**:
  ```json
  {
    "total": 10.5
  }
  ```

### **Price Plans Management**

- **GET** `/price_plans`: Get a list of all available price plans.

- **POST** `/price_plans`: Create a new price plan.

  **Request body example**:
  ```json
  {
    "name": "Premium",
    "sms_price": 0.05,
    "call_price": 0.10
  }
  ```

- **PATCH** `/price_plans/:id`: Update an existing price plan.

- **DELETE** `/price_plans/:id`: Delete a price plan by ID.

### Data Reset Feature

After a price plan is created, updated, or deleted, the database will automatically reset to the initial data stored in `initialData.json` after 2 minutes. This feature ensures that your database is repopulated with a fresh set of data.

## File Structure

- `db/`: Contains the SQLite3 database setup and initial data for price plans.
- `public/`: Contains static files like the front-end HTML (if applicable).
- `server.js`: The main server file with all API routes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
