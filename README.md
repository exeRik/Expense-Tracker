# Expense Tracker App

An interactive **Expense Tracker** built with **React** and **Mantine** that allows users to add, view, and manage expenses. The app also visualizes spending with charts and persists data between sessions using **localStorage**.


## Features

### Core Features

* **Add an Expense**
  Users can input:

  * Description (e.g., "Groceries")
  * Amount (numeric value)
  * Category (dropdown: Food, Transport, Entertainment, etc.)
  * Date (date picker, defaults to today)

* **Expense List**

  * Displays all added expenses in a table.
  * Shows description, amount, category, and date.
  * Edit or delete expenses.
  * Dynamically calculates and displays total expenses.

* **Data Visualization**

  * **Expenses per Category** – Pie or Bar chart to see spending distribution.
  * **Expenses Over Time** – Line or Bar chart showing spending trends over days, weeks, or months.

### Optional Features

* Filter expenses by **category** or **date range**.
* Custom hooks and utility functions for cleaner, modular code.
* Persistent data using **localStorage**.

---

## Demo


---

## Tech Stack

* **Frontend:** React, Mantine UI
* **Charts:** Mantine Charts (PieChart, BarChart, LineChart)
* **Icons:** Tabler Icons
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Data Persistence:** `localStorage`

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```
http://localhost:5173
```

---

## Usage

1. **Add Expenses** – Fill out the form with description, amount, category, and date.
2. **View List** – See all expenses in the table with total expense at the top/bottom.
3. **Edit/Delete** – Use the edit or delete buttons on each expense row.
4. **Filter Expenses** – Filter by category or date range.
5. **View Charts** – Analyze spending with visual charts (category-wise and over time).

---


## Future Improvements

* User authentication and multiple user profiles.
* Export expenses to CSV or PDF.
* Recurring expenses and notifications.
* Dark/light theme toggle.
* Advanced filtering and sorting options.

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---


