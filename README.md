# Automate Instagram Login

This project uses Puppeteer to automate the login process to Instagram and navigate to a specific profile page.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/Ayush-dvplr/automate-instagram.git
```

2. **Navigate to the project directory:**

```bash
   cd automate-instagram

```

3. **Install the required packages:**

```bash
   npm install
```

4. **Create a .env file in the same directory as index.js:**

```bash
   pass="your_instagram_password"
```

5. **Update index.js:**

```bash
   await page.type("input[name='username']", "your_user_name", { delay: 100 }); // Delay of 100ms between keystrokes
```

### Running the Project

**Start the project with the following command:**

```bash
   npm start
```

### Notes

1. **Use accounts with two-factor authentication disabled: This automation script may not work with accounts that have two-factor authentication enabled.**

2. **Do not use your primary Instagram account: Automating login processes may result in your Instagram account being temporarily or permanently blocked. It is recommended to use a secondary or test account for this purpose.**