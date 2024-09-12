# Sports Card Marketplace
A Node.js-based marketplace for trading sports cards, where users can create accounts, list cards for sale, make offers, and manage their profiles. This project uses MongoDB for data storage and implements features like user authentication, rate limiting, and image uploading.

## Features
- User Authentication: Secure sign-up and login system with password hashing using bcrypt.
- Sports Card Listings: Users can create, edit, and delete sports card listings with details like price, condition, and images.
- Offers: Users can make offers on sports cards and sellers can accept or reject offers.
- Rate Limiting: Login attempts are rate-limited to prevent abuse.
- Image Upload: Users can upload images for sports cards using multer.
- Flash Messages: Flash messages notify users of successful operations or errors.

## Tech Stack
- Backend: Node.js, Express
- Frontend: EJS (Embedded JavaScript templates)
- Database: MongoDB
- Storage: multer for file uploads
- Security: bcrypt for password hashing, session-based authentication
- Other Libraries: express-rate-limit, connect-mongo, express-validator

## Setup
### Prerequisites
- Node.js (v16 or higher recommended)
- MongoDB database (local or hosted)
### Installation
1. Clone the repository:
```bash
git clone https://github.com/Codez1la/ITIS4166_SportCart
cd ITIS4166_SportCart
```
2. Install dependencies
```bash
npm install
```
3. Start the server
```bash
node app.js
```
