Main Objectives:
1. Setup Landing Page
2. Setup Bar Registration Page
3. Setup User Registration Page
4. Setup Login Page
5. Setup User Page
6. Setup Add Tips Page
7. Setup Run Money Page
8. Setup Tip Output Page
9. Setup Shift History Page

Okay so they go to add a new person,
they can add name and hours worked,
what we need to add: 
a row to shift_tips (time_in, time_out, hours_worked, employee_id, drawer_id)

edit, populate data for hours:
 - shift_tips -> get at id

WAIT
Add:
    make a form:
    - dropdown: employee 
    - input: time-in 
    - input: time-out
    - input: break check
    - input: break time
    - dropdown: drawer 
    - 
Update:
    make a form that preloads:
    - input employee name
    - input: time-in
    - input: time-out
    - input: break check
    - input: break time
    - dropdown: drawer

when next is clicked:
    1. Hit saga that inserts or creates data:
       1. Update


barback_cut: "0.15"
​​​
city: "Fayetteville"
​​​
drawer_id: 3
​​​
employee_id: 8
​​​
hours_worked: "17"
​​​
id: 1
​​​
location_id: 1
​​​
name: "Tin Roof Fayetteville"
​​​
shift_id: 8
​​​
state: "AR"
​​​
time_in: "08:00"
​​​
time_out: "02:00"
​​​
total_tips: "$276.00"

okay i need to build a table that has all the 