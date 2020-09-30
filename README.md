# BlueTech

Implemented {admin panel} for a hypothetical website called {BlueTech}<br />

Part A<br />
1)registration and login. <br />
2)support ability to register a user as admin or Normal user. <br />
3)When a normal user Logs In : <br />
  he/she should be able to see his [last login details] + [Name] + [point] at top <br />
 
Three sections containing different courses with some action associated with them- <br />
   1) completed(courses completed)  <br />
   2. Attempted(Ongoing with "due date")<br />
   3. TO DO (Needs to attempt along with due date ) <br />
   When a user clicks on action button in <br />
      Completed -> shows points and date completed on [without click]. <br />
      Attempted -> It moves to Completed (past test) and adds some points to user's account <br />
      To Dos -> It moves to Attempted  section<br />

If there are no more tests left in a section it shows some message <br />

---

Part B

When an admin logs in he/she see list of all users<br />
Ability to search through users by Name<br />

On clicking a user he/she is able to see :<br />
1)ALL TESTS TAKEN taken by user along with points earned.<br />
2)User's last 3 activities (login, completed a test , started a test)<br />
    
---

[*]Front-End-
      React and other relevant components like Redux or Redux store , thunk etc .<br />
      Used materliazecss
      
      
[*]Back-End-
  For backend node express for APIs is used .
  MongoDB is used as database
  
[*]persistent storage like local file system is also available.
