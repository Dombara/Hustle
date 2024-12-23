const express = require('express');
const mongoose = require('mongoose'); // MongoDB library
const bcrypt = require('bcrypt'); // For password hashing
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Replace body-parser usage with built-in express methods
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors());

// MongoDB Atlas connection
const mongoUri = 'mongodb+srv://root:root@cluster0.7od4w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB Atlas URI

mongoose.connect(mongoUri)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection failed:', error));

// Define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Define trainer schema
const trainersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
});

const trainers = mongoose.model('trainers', trainersSchema);






// Define trainer schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
});

const admin = mongoose.model('admins', adminSchema);

// Define user details schema
const userdetailsSchema = new mongoose.Schema({
  mail: { type: String, required: true },
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  goal: { type: String, required: true },
  physicalLevel: { type: String, required: true },
  plan: { type: String, required: true },
  trainer: { type: String, required: true } // Reference to trainer
});

const Userdetails = mongoose.model('Userdetails', userdetailsSchema);


// Define login schema
const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});


// Define the user-trainer mapping schema
const userTrainerMappingSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  trainerEmail: { type: String, required: true }
});

// Create a model for the user-trainer mappings
const UserTrainerMapping = mongoose.model('UserTrainerMapping', userTrainerMappingSchema);







// Define meal schema
const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  intakeTime: { type: Date, required: true }, // Time when the meal is intended to be consumed
  userEmail: { type: String, required: true }, // Reference to the user
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the meal is created
});

const Meal = mongoose.model('Meal', mealSchema);



// Define workout schema
const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the workout
  reps: { type: Number, required: true }, // Number of repetitions
  userEmail: { type: String, required: true }, // Reference to the user
  date: { type: Date, required: true }, // Date of the workout
});

const Workout = mongoose.model('Workout', workoutSchema);


















// Pre-save middleware to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Define the login model
const login = mongoose.model('Login', loginSchema);

// Start server
app.listen(4545, () => {
  console.log('Server is running on port 4545');
});

// Route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    console.log('Users fetched:', users.length);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Route to add a new user
app.post('/add-user', async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  if (!name || !email || !phone || !address || !password) {
    return res.status(400).send('All fields are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('User added successfully');
    res.send('User added!');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
});

// Route to handle adding user details
app.post('/add-user-details', async (req, res) => {
  const { mail, gender, weight, height, goal, physicalLevel, plan, trainer } = req.body;

  if (!mail || !gender || !weight || !height || !goal || !physicalLevel || !plan || !trainer) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  try {
    const newUserdetails = new Userdetails({
      mail,
      gender,
      weight,
      height,
      goal,
      physicalLevel,
      plan,
      trainer // Save the selected trainer
    });

    await newUserdetails.save();
    res.status(201).json({ message: 'User details registered successfully' });
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).json({ error: 'Failed to register user details' });
  }
});












// Route for member login
app.post('/login-member', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});












// Route for admin login
app.post('/login-admin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await admin.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});
















// Route for trainer login
app.post('/login-trainer', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await trainers.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});








// Route to get all trainers
app.get('/trainers', async (req, res) => {
  try {
    const trainers_list = await trainers.find(); // Fetch all trainers from the collection
    res.json(trainers_list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainers', error });
  }
});












app.get('/users/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await User.findOne({ email: userEmail }, '-password'); // Exclude password field
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch additional user details if they exist
    const userDetails = await Userdetails.findOne({ mail: userEmail });

    // Combine user and userDetails
    const combinedUserData = {
      ...user.toObject(),
      ...(userDetails ? userDetails.toObject() : {})
    };

    console.log('User details fetched:', combinedUserData);
    res.status(200).json(combinedUserData);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
});



app.post('/add-user-trainer-mapping', async (req, res) => {
  const { userEmail, trainerEmail } = req.body;

  if (!userEmail || !trainerEmail) {
    return res.status(400).json({ error: 'Both user email and trainer email are required' });
  }

  try {
    const newMapping = new UserTrainerMapping({
      userEmail,
      trainerEmail
    });

    await newMapping.save();
    res.status(201).json({ message: 'User-trainer mapping saved successfully' });
  } catch (error) {
    console.error('Error saving mapping:', error);
    res.status(500).json({ error: 'Failed to save mapping' });
  }
});







app.get('/trainedusers/:trainerEmail', async (req, res) => {
  try {
    const trainerEmail = req.params.trainerEmail;

    // Find all mappings where the provided email is the trainer's email
    const userTrainerMapping = await UserTrainerMapping.find({ trainerEmail });

    if (!userTrainerMapping || userTrainerMapping.length === 0) {
      return res.status(404).json({ message: 'No users assigned to this trainer' });
    }

    // Extract user emails from the mappings
    const userEmails = userTrainerMapping.map(mapping => mapping.userEmail);

    // Fetch the users who are trained by this trainer using their emails
    const users = await User.find({ email: { $in: userEmails } }, '-password'); // Exclude password field

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for this trainer' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
});







// Route to add a new meal
app.post('/add-meal', async (req, res) => {
  const { name, calories, intakeTime, userEmail } = req.body;

  if (!name || !calories || !intakeTime || !userEmail) {
    return res.status(400).send('All fields are required');
  }

  try {
    const newMeal = new Meal({
      name,
      calories,
      intakeTime,
      userEmail,
    });

    await newMeal.save();
    console.log('Meal added successfully');
    res.status(201).send('Meal added!');
  } catch (error) {
    console.error('Error adding meal:', error);
    res.status(500).send('Error adding meal');
  }
});



















// Route to add a new workout
app.post('/add-workout', async (req, res) => {
  const { name, reps, userEmail, date } = req.body;

  if (!name || !reps || !userEmail || !date) {
    return res.status(400).send('All fields are required');
  }

  try {
    const newWorkout = new Workout({
      name,
      reps,
      userEmail,
      date,
    });

    await newWorkout.save();
    console.log('Workout added successfully');
    res.status(201).send('Workout added!');
  } catch (error) {
    console.error('Error adding workout:', error);
    res.status(500).send('Error adding workout');
  }
});

// Route to fetch all workouts for a specific user
app.get('/workouts/:userEmail', async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const workouts = await Workout.find({ userEmail }); // Fetch workouts associated with the user

    if (workouts.length === 0) {
      return res.status(404).json({ message: 'No workouts found for this user' });
    }

    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Error fetching workouts', error: error.message });
  }
});

// Route to delete a workout by ID
app.delete('/delete-workout/:id', async (req, res) => {
  const workoutId = req.params.id;

  try {
    const result = await Workout.findByIdAndDelete(workoutId);

    if (!result) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Error deleting workout', error: error.message });
  }
});app.post('/add-trainer', async (req, res) => {
  const { name, phone, email, address, password } = req.body;

  if (!name || !phone || !email || !address || !password) {
    return res.status(400).send('All fields are required');
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new trainer with the hashed password
    const newTrainer = new trainers({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newTrainer.save();
    res.status(201).json({ message: 'Trainer added successfully!' });
  } catch (error) {
    console.error('Error adding trainer:', error);
    res.status(500).json({ message: 'Error adding trainer' });
  }
});




app.get('/trainers', async (req, res) => {
  try {
    const trainers = await trainers.find();
    res.json(trainers);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({ message: 'Error fetching trainers' });
  }
});

// Route to add a trainer


// Route to delete a trainer by email
app.delete('/trainers/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const trainer = await trainers.findOneAndDelete({ email });

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    console.error('Error deleting trainer:', error);
    res.status(500).json({ message: 'Error deleting trainer' });
  }
});



// Route to fetch all meals for a specific user
app.get('/meals/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;

  try {
    // Fetch all meals associated with the user by email
    const meals = await Meal.find({ userEmail });

    if (meals.length === 0) {
      return res.status(404).json({ message: 'No meals found for this user' });
    }

    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ message: 'Error fetching meals', error: error.message });
  }
});





// Route to fetch all workouts for a specific user
app.get('/workouts/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;

  try {
    // Fetch all workouts associated with the user by email
    const workouts = await Workout.find({ userEmail });

    if (workouts.length === 0) {
      return res.status(404).json({ message: 'No workouts found for this user' });
    }

    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Error fetching workouts', error: error.message });
  }
});







