const employees = [
    {
        "firstName" : "Sam",
        "department" : "Tech",
        "designation" : "Manager",
        "salary" : "40000",
        "raise eligible" : "true"
        
      },
      {
          "firstName" : "Mary",
          "department" : "Finance",
          "designation" : "Trainee",
          "salary" : "18500",
            "raise eligible" : "true"
          
        },
        {
          "firstName" : "Bill",
          "department" : "HR",
          "designation" : "Executive",
          "salary" : "21200",
            "raise eligible" : "false"
          
        }
];
console.log("Employee JSON:");
console.log(JSON.stringify(employees, null,2));