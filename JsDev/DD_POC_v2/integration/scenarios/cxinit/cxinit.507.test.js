////////////////////////////////////////////////////////
// As defined at the following location
// https://atlassian/jira/browse/CXINIT-507
//  See Subtask cxinit-510 "Automation testing" for greater detail explaining testing this story
//
// Fields to be tested:
//
// First Name
// Middle Initial
// Last Name
// Gender ( Selection )
// Birthdate ( mm: dd: yyyy )
//  * we need to develop and implement some special testing in this area that checks 
//  * if the user is greater than or equal to 18 years age.  What's special about what
//  * is needed here is an algorithm that looks at the system date and tests values appropriate.
//  * This is the magic cus we need this test to run continuously regardless of the
//  * constantly changing system date.
//  Additionally we need to test some edge case dates. I'll get those and paste somewhere appropriate.
// Social Security Number 
// Alternate ID
//
// spec cxinit.507.test.js
// 
"use strict"
