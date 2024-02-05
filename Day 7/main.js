// async function fetchUserData() {
//   try {
//     const response = await fetch("https://dummyjson.com/users");
//     const data = await response.json();
//     processUserData(data.users);
//   } catch (error) {
//     console.error(eroor);
//   }
// }
// const processUserData = (Users) => {
//   const filteredUsers = Users.filter((user) => user.gender !== "male");
//   const maleUsers = filteredUsers.map(
//     ({ firstName: Name, age: age }) => `-Name: ${Name}, Age ${age}`
//   );
//   console.log("Processed Users:");
//   console.log(maleUsers);
//   const totalAge = summarizeAge(filteredUsers);
//   console.log("Total Age of Active Users: " + totalAge);
// };
// const summarizeAge = (Users) => {
//   const totalAge = Users.reduce((acc, { age: age }) => acc + age, 0);
//   return totalAge;
// };
// fetchUserData();
