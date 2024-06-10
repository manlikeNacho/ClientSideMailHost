# ClientSideMailHost

## Overview

ClientSideMailHost is a web application that allows users to fetch, view, and classify emails from their Gmail accounts using Google OAuth2.0 and OpenAI's API. This project is designed to enhance email management by automatically categorizing emails into different classes such as important, social, and promotional.

## Features

- **Google OAuth Authentication**: Securely log in with your Google account to access Gmail data.
- **Fetch Emails**: Retrieve emails from your Gmail account.
- **Email Classification**: Utilize OpenAI's API to classify emails into different categories.
- **Responsive UI**: User-friendly interface optimized for both desktop and mobile devices.
- **Dashboard**: View and manage your classified emails in a clean and organized dashboard.

## Hosting

The application is hosted on [Vercel](https://vercel.com/). You can access it [here](https://client-side-mail-host-git-main-iheanacho-emmas-projects.vercel.app).

## Screenshots

### Login Page
Login Page![Screenshot (325)](https://github.com/manlikeNacho/ClientSideMailHost/assets/73090335/a6f3cbd1-7404-46f6-8cec-e4dcd649e517)


## Installation

### Prerequisites

- Node.js and npm installed.
- Google Cloud project with Gmail API enabled.
- OpenAI API key.

### Steps

1. **Clone the repository**:
   ```
   git clone https://github.com/manlikeNacho/ClientSideMailHost.git
   cd ClientSideMailHost
   
   ```
2. Install dependencies:
    ` npm install`
3. Environment Variables:
    Create a .env file in the root directory and add the following
    ```
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-nextauth-secret
    ```
4. Run the development server:
`npm run dev`

5. Open your browser:
Navigate to http://localhost:3000 to view the application.

## Contributing
We welcome contributions to enhance ClientSideMailHost. Please fork the repository and submit pull requests for any features or bug fixes.
