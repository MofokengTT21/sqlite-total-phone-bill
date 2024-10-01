# Phone Bill Calculation API with SQLite3 and Knex.js

This project is a RESTful API built with **Express.js**, **SQLite3**, and **Knex.js** to manage phone bill price plans and calculate total phone bills based on SMS usage and call durations. The API allows you to create, read, update, delete price plans, and calculate phone bills dynamically.

## Features

- **Phone Bill Calculation**: Calculate total phone bills based on the selected price plan, SMS count, and call duration.
- **CRUD Operations for Price Plans**: 
  - Create new price plans with customizable SMS and call rates.
  - Retrieve a list of all available price plans.
  - Update specific price plans.
  - Delete price plans by ID.
- **Dynamic Price Plan Lookup**: Retrieve price plan details by name to calculate total bills.

## Technologies Used

- **Node.js**: Backend server.
- **Express.js**: Web framework for building the API.
- **SQLite3**: Embedded SQL database for managing price plans.
- **Knex.js**: SQL query builder to interact with the SQLite3 database.
- **Cors**: Cross-Origin Resource Sharing middleware.
- **File System (fs)**: For handling data reset and initial data loading.

## Prerequisites

- **Node.js** installed.
- **SQLite3** for database storage.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MofokengTT21/sqlite-total-phone-bill.git
   ```

2. Navigate into the project directory:
   ```bash
   cd sqlite-total-phone-bill
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Ensure you have an `initialData.json` file in the `db/` directory to populate your price plan data.

### Running the Application

1. Start the server:
   ```bash
   node server.js
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

- **GET** `/price_plans`: Retrieve a list of all available price plans.

- **POST** `/price_plans`: Create a new price plan.

  **Request body example**:
  ```json
  {
    "plan_name": "Premium",
    "sms_price": 0.05,
    "call_price": 0.10
  }
  ```

- **PATCH** `/price_plans/:id`: Update an existing price plan by ID.

  **Request body example**:
  ```json
  {
    "sms_price": 0.06,
    "call_price": 0.12
  }
  ```

- **DELETE** `/price_plans/:id`: Delete a price plan by its ID.

  **Response**:
  ```json
  {
    "success": true
  }
  ```

### **Price Plan Lookup**

- **GET** `/price_plans/:plan_name`: Retrieve a price plan by its name to calculate the bill.

## Dynamic Price Plan Functions

The following database functions are used to manage price plans and calculate phone bills:

- **createPricePlan(pricePlan)**: Inserts a new price plan into the database.
- **getAllPricePlans()**: Fetches all available price plans.
- **deletePricePlan(id)**: Deletes a price plan based on its ID.
- **updatePricePlan(id, pricePlan)**: Updates a specific price plan by ID.
- **getPricePlanByName(planName)**: Fetches a price plan by name, used in calculating the total bill.

## File Structure

- `db/`: Contains the SQLite3 database setup, `knex` configuration, and initial data file (`initialData.json`).
- `public/`: Contains static files like the front-end HTML (if applicable).
- `server.js`: Main server file that defines the API routes.
- `db/pricePlans.js`: Contains the database query logic for CRUD operations using Knex.js.

## Data Reset Feature

After price plan changes (create, update, delete), the database automatically resets to the initial data stored in `initialData.json` after 2 minutes. This ensures that test data is always refreshed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This README includes details of the SQLite3 and Knex.js functionality with the updated price plan logic you added.
