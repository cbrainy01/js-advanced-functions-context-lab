function createEmployeeRecord(info) {
    const employeeInfoTemplate = {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employeeInfoTemplate;

}
function createEmployeeRecords(recordTemplate) {
return recordTemplate.map( (pieceOfInfo) => {
    return createEmployeeRecord(pieceOfInfo);
} )

}



function createTimeInEvent(dateStamp) {
    const separated = dateStamp.split(" ");
    const hourIn = parseInt(separated[1], 10);
    const dateIn = separated[0];
     //console.log("the this is: ", this);
    this.timeInEvents.push( {
        type: "TimeIn",
        hour: hourIn,
        date: dateIn, 
    } );
   
    return this;
}

function createTimeOutEvent(dateStamp) {
    const separated = dateStamp.split(" ");
    const hourOut = parseInt(separated[1], 10);
    const dateOut = separated[0];

    this.timeOutEvents.push( {
        type: "TimeOut",
        hour: hourOut,
        date: dateOut
    } );
    return this;
}

function hoursWorkedOnDate(givenDate) {

    const outObject = this.timeOutEvents.find( (log) => {
            return log.date === givenDate
        }
    );
  
    const inObject = this.timeInEvents.find( (log) => {
            return log.date === givenDate
    } );

    //with those arrays, we go inside them and get the hour for the given date
    const timeIn = inObject.hour;
    const timeOut = outObject.hour;
    //subtract time in from time out and we have hours worked military time. divide by 100 to get it to actual hours
    const hoursWorked = (timeOut - timeIn) / 100
    return hoursWorked;
 
}

function wagesEarnedOnDate(givenDate) {
    //console.log("hourly pay: ",this.payPerHour);
    const hourlyPay = this.payPerHour;
    //console.log("this is: ", this);
    /**the this keyword refers to an employee record.
     * this record is an object which means it can be used as an execution context
     */
    //the hoursWorked variable refers to the hours worked for given employee on a given date
    const hoursWorked = hoursWorkedOnDate.call(this, givenDate)
  
    // console.log("hours worked: ", hoursWorked);
    const wagesEarned = hourlyPay * hoursWorked;
    return wagesEarned;
}

/* Your Code Here */

/*

 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(arrayOfRecords) {
   
  const payroll = arrayOfRecords.reduce(  (accumulator, record) => {
    return accumulator + allWagesFor.call(record);
  }, 0)

  return payroll;
}

function findEmployeeByFirstName(collection, firstNameString) {
    console.log("collection: ", collection);
    console.log("first name: ", firstNameString);
    
    const ans = collection.find( (record) => { return record.firstName === firstNameString} )
    return ans;
}