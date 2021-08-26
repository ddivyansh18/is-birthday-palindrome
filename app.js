const birthDate = document.querySelector("#birth-date");
const checkButton = document.querySelector("#check-button") 
const output = document.querySelector("#output")

console.log(birthDate)
console.log(checkButton)

function reverseStr(str) {
    var listOfChars = str.split('');
    var reversedListOfChars = listOfChars.reverse();
    var reversedStr = reversedListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reversedStr = reverseStr(str);

    return str === reversedStr;
}

var date = {
    day: 1,
    month: 3,
    year: 2400
}

function convertDateToStr(date) {
    var dateStr = {day : '', month : '',  year : ''};
    if(Number(date.day) < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if(Number(date.month) < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}



function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + date.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkAllDateFormatsForPalindrome(date) {
    var listOfDateFormats = getAllDateFormats(date);
    
    for(let i=0;i<listOfDateFormats.length;i++) {
        if(isPalindrome(listOfDateFormats[i]))
        return true;
    }

    return false;
}


function isLeapYear(year) {
    if(year % 400 == 0) {
        return true;
    }

    if(year % 100 == 0) {
        return false;
    }

    if(year % 4 == 0) {
        return true;
    }
    
    return false;
}

function getNextDate(date) {

    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    
    if(month == 2) {
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month++;
            }
        } else {
            if(day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else {
        if(day > daysInMonth[month-1]) {
            day = 1;
            month++;
        } 
    }


    if(month > 12) {
        month = 1;
        year++;
    }

    return {
        day : day,
        month : month,
        year : year
    }
}

function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date);


    while(1) {
        counter++;
        
        if(checkAllDateFormatsForPalindrome(nextDate)) {
            break;
        }
        nextDate = getNextDate(nextDate);
    
    }

    return [counter, nextDate]
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    
    if(month == 3) {
        if(isLeapYear(year)) {
            if(day == 0) {
                day = 29;
                month--;
            }
        } else {
            if(day == 0) {
                day = daysInMonth[month];
                month--;
            }
        }
    }
    else {
        if(day == 0) {
            day = daysInMonth[month-1];
            month--;
        } 
    }


    if(month == 0) {
        month = 12;
        year--;
    }

    return {
        day : day,
        month : month,
        year : year
    }
}

function getPreviousPalindromeDate(date) {
    var counter = 0;
    var previousDate = getPreviousDate(date);


    while(1) {
        counter++;
        
        if(checkAllDateFormatsForPalindrome(previousDate)) {
            break;
        }
        previousDate = getNextDate(previousDate);
    
    }

    return [counter, previousDate]
}


function getNearestPalindrome(date) {

    var nextPalindromeDate = getNextPalindromeDate(date);
    var previousPalindromeDate = getPreviousPalindromeDate(date);

    if(nextPalindromeDate[0] < previousPalindromeDate[0])
    return nextPalindromeDate;

    return previousPalindromeDate;
}


function clickHandler() {
    
    var dateList = birthDate.value.split('-');
    var date = {
        day : Number(dateList[2]),
        month : Number(dateList[1]),
        year : Number(dateList[0])
    }

    var nearestPalindrome = getNearestPalindrome(date);

    if(checkAllDateFormatsForPalindrome(date)) {
        output.innerText = "Your b'day is a palindrome !"
    }
    else {
        var nearestPalindromeDate = getNearestPalindrome(date);
        output.innerText = "You missed a palindrome b'day by " + nearestPalindrome[0] + " days, nearest palindrome b'day is " + nearestPalindrome[1].day + "-" + nearestPalindrome[1].month + "-" + nearestPalindrome[1].year;
    }
    

}   


checkButton.addEventListener("click", clickHandler)

