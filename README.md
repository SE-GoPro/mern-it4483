

# dsd_20201
Phát triển phần mềm phân tán 20201

### Env Variables

Create a .env file in the root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```
Create a .env file in the frontend Directory and  add the following 

```
REACT_APP_API_DOMAIN=YOUR_API_DOMAIN #the domain that backend is running 

```
### Install Dependencies (frontend & backend)
```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```
You can check more commands in package.json file
## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

You can deploy on heroku or your VPS depend on your money :))
Remember to change NODE_ENV=production in .env file when you deploy on your server.

### Seed Database

You can use the following commands to seed the database with some sample users as well as destroy all data

```
# Import data
npm run data:import
```
# Destroy data
```
npm run data:destroy
```
# Sample User 
Sample User Logins
```
admin@example.com (Admin)
123456

test@example.com (Customer)
123456
```