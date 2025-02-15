import { Image, StyleSheet, Platform, View, Button } from 'react-native';

import { Text } from 'react-native';
import Welcome from '../screens/welcome';
import Welcome2 from '../screens/welcome2';
import Home from '../screens/home';
import Register from '../screens/register';
import PaymentScreen from '../screens/paymentScreen';
import Register2 from  '../screens/register2'
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuccessScreen from '../screens/successScreen';
import Trainer_ad from '../screens/trainer_ad';
import Login from '../screens/login';
import Login_admin from '../screens/login_admin';
import Login_member from '../screens/login_member';
import Login_trainer from '../screens/login_trainer';
import Users from '../screens/users';
import Trainerdash from '../screens/trainerdash';
import Addmeals from '../screens/addmeals';
import Addworkouts from '../screens/addworkouts';
import AdminHomescreen from '../screens/admin_home_screen';
import ManageTrainers from '../screens/add_trainer';
import MealListScreen from '../screens/meallistscreen';
import WorkoutListScreen from '../screens/workoutlist';
import Schemes from '../screens/schemes';
import MemberProfile from '../screens/profile_mem';




export default function HomeScreen() {

  const Stack=createNativeStackNavigator();

  return (
    


    <View style={{ flex: 1 }}>
      {/* <NavigationContainer> */}
      <Stack.Navigator
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen
        name="trainer_ad"
        component={Trainer_ad}
      /> */}
      {/* <Stack.Screen
        name="welcome"
        component={Welcome}
        /> */}
        
      <Stack.Screen
        name="welcome"
        component={Welcome}
      />
      <Stack.Screen
        name="welcome2"
        component={Welcome2}
      />
        <Stack.Screen
          name="users"
          component={Users}
        />
        <Stack.Screen
          name="trainerdash"
          component={Trainerdash}
        />
            <Stack.Screen
              name="register"
              component={Register}
            />
            <Stack.Screen
          name="register2"
          component={Register2}
        />  
          <Stack.Screen
            name="login_admin"
            component={Login_admin}
          />
          <Stack.Screen
            name="login_trainer"
            component={Login_trainer}
          />
          <Stack.Screen
          name="admin-homescreen"
          component={AdminHomescreen}
        />
          <Stack.Screen
            name="login_member"
            component={Login_member}
          />
        <Stack.Screen
          name="successScreen"
          component={SuccessScreen}
          />
          

          <Stack.Screen
            name="paymentScreen"
            component={PaymentScreen}
          />
        <Stack.Screen
          name="home"
          component={Home}
        />
        <Stack.Screen
          name="add-workouts"
          component={Addworkouts}
        />
        <Stack.Screen
          name="add-meals"
          component={Addmeals}
        />
        <Stack.Screen
          name="manage-trainers"
          component={ManageTrainers}
        />
        <Stack.Screen
          name="meal-list"
          component={MealListScreen}
        />
        <Stack.Screen
          name="workout-list"
          component={WorkoutListScreen}
        />
        <Stack.Screen
          name="schemes"
          component={Schemes}
        />
        <Stack.Screen
          name="trainer_ad"
          component={Trainer_ad}
        />
        <Stack.Screen
          name="member_profile"
          component={MemberProfile}
        />
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    {/* </NavigationContainer> */}
      {/* <Login /> */}
      {/* <Register/> */}
    </View>
  );
}




