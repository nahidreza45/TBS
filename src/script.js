

let buy_check_section = document.getElementById("buy-check-button");
let ticket_buy_section = document.getElementById("ticket-buy-section");
let payment_section = document.getElementById("payment-section");
let final_section = document.getElementById("final-section");
let ticket_check_section = document.getElementById("check-ticket-details");
let saved_ticket_show = document.getElementById("saved-ticket-show");


function geID(id){
  return document.getElementById(id);
}

// BUS ROUTES FROM RAJSHAHI
const busRoutes = [
  { 
    route: "Rajshahi - Dhaka", 
    fare: 600, 
    times: ["6:00 AM", "8:00 AM", "10:00 AM", "1:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"] 
  },
  { 
    route: "Rajshahi - Chittagong", 
    fare: 1250, 
    times: ["7:00 AM", "10:00 AM", "2:00 PM", "8:00 PM"] 
  },
  { 
    route: "Rajshahi - Sylhet", 
    fare: 1100, 
    times: ["7:30 AM", "1:00 PM", "7:00 PM"] 
  },
  { 
    route: "Rajshahi - Khulna", 
    fare: 500, 
    times: ["6:30 AM", "9:00 AM", "12:00 PM", "4:00 PM"] 
  },
  { 
    route: "Rajshahi - Rangpur", 
    fare: 350, 
    times: ["7:00 AM", "10:30 AM", "2:00 PM", "5:00 PM"] 
  },
  { 
    route: "Rajshahi - Bogura", 
    fare: 200, 
    times: ["6:00 AM", "8:00 AM", "11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"] 
  },
  { 
    route: "Rajshahi - Pabna", 
    fare: 180, 
    times: ["7:00 AM", "9:30 AM", "12:00 PM", "3:00 PM", "6:00 PM"] 
  },
  { 
    route: "Rajshahi - Chapainawabganj", 
    fare: 150, 
    times: ["6:30 AM", "9:00 AM", "12:30 PM", "3:30 PM", "6:00 PM"] 
  }
];

// TRAIN ROUTES FROM RAJSHAHI
const trainRoutes = [
  { 
    route: "Rajshahi - Dhaka", 
    fare: 450, 
    times: ["6:40 AM", "7:40 AM", "11:40 AM", "4:00 PM", "11:20 PM"] 
  },
  { 
    route: "Rajshahi - Khulna", 
    fare: 320, 
    times: ["6:00 AM", "12:20 PM", "2:30 PM"] 
  },
  { 
    route: "Rajshahi - Chapainawabganj", 
    fare: 80, 
    times: ["7:15 AM", "10:25 AM", "1:00 PM", "6:25 PM"] 
  },
  { 
    route: "Rajshahi - Chilahati", 
    fare: 250, 
    times: ["6:20 AM", "3:00 PM"] 
  },
  { 
    route: "Rajshahi - Panchagarh", 
    fare: 300, 
    times: ["9:00 PM"] 
  },
  { 
    route: "Rajshahi - Parbatipur", 
    fare: 220, 
    times: ["12:30 PM"] 
  },
  { 
    route: "Rajshahi - Dhalarchar", 
    fare: 150, 
    times: ["5:20 PM"] 
  },
  { 
    route: "Rajshahi - Gobra", 
    fare: 260, 
    times: ["1:15 PM"] 
  }
];

// FLIGHT ROUTES FROM RAJSHAHI
const flightRoutes = [
  { 
    route: "Rajshahi - Dhaka", 
    fare: 4300, 
    times: ["9:00 AM", "12:00 PM", "7:00 PM"] 
  },
  { 
    route: "Rajshahi - Chittagong", 
    fare: 5600, 
    times: ["10:30 AM", "2:00 PM"] 
  },
  { 
    route: "Rajshahi - Cox's Bazar", 
    fare: 6500, 
    times: ["11:00 AM", "3:30 PM"] 
  }
];

let passenger = {
  ticketId : "",
  transactionId: "",
  booktime : "",
  name: "",
  age: 0,
  contact: "",
  ticketType : "BUS",
  premiumFare: 1,
  selectedRoute: "",
  selectedTime: "",
  class: "Regular",
  fare : 0
}

function savePassenger(passenger) {
    // Load existing list OR create empty array
    let passengers = JSON.parse(sessionStorage.getItem("passengerList")) || [];

    // Add new passenger
    passengers.push(passenger);

    // Save back to sessionStorage
    sessionStorage.setItem("passengerList", JSON.stringify(passengers));
}
function getPassengerByTicketId(ticketId) {
    let passengers = JSON.parse(sessionStorage.getItem("passengerList")) || [];

    return passengers.find(p => p.ticketId === ticketId);
}


function randomText(){
  str = "ABCDEFGHIJKL0123456789MNOPQRSTUVWYZ";
  let len = str.length;
  let output = "";
  for(let i = 0; i < 5; i++){
    let randNum = Math.floor(Math.random() * len);
    output = output + str[randNum];
  }
  return "-" + output;
}


function upFive(value){
    return Math.floor((value - value % 5));
}

function hideAll(){
    let idArr = [
        buy_check_section,
        ticket_buy_section,
        payment_section,
        final_section,
        ticket_check_section,
        saved_ticket_show,
    ];

    idArr.forEach(element => {
        element.style.display = "none";        
    });
}
function showSection(id){
    hideAll();
    id.style.display = "block";
}

function generateTicketId(){
  let temp = "";
  if(passenger.ticketType === "BUS"){
    temp = "BU";
  } else if (passenger.ticketType === "TRAIN"){
    temp = "TR";
  } else {
    temp = "FL";
  }
  return (temp + randomText());
}
function generateTransactionID(){
  return "TX" + randomText();
}

document.getElementById("process-next-button").addEventListener("click",function(){
  showSection(payment_section);
  passenger.name = geID("passenger-name").value;
  passenger.age = geID("passenger-age").value;
  passenger.contact = "+880" + geID("passenger-contact").value;
  passenger.selectedRoute = geID("route").value;
  passenger.selectedTime = geID("departure-time").value;
  passenger.ticketId = generateTicketId();
  geID("summary-show").innerHTML = ticket_summary_show();
})

document.getElementById("buy-button").addEventListener("click", function(){
    showSection(ticket_buy_section);
})


function premiumFare(value){
    if (value==="yes"){
        passenger.premiumFare = 1.25;
        passenger.class = "Premium";
    } else {
      passenger.premiumFare = 1;
      passenger.class = "Regular";
    }
    displayRoutesTimes(passenger.ticketType);
}

let routes;
function showTime(value){
    let routeData = routes.find(r => r.route === value)
    passenger.fare = upFive(routeData.fare * passenger.premiumFare);
    let html = `
    <div class="flex mt-2 items-center">
    <p class="w-80">Select Depurture time</p>
    <select class="border-2 p-2 hover:ring rounded w-full" name="departure-time" id="departure-time">
    <option value="">Select time</option>
    ${routeData.times.map(time =>
        (`<option value="${time}">${time}</option>`)
    ).join('')}
    </select>
    </div>
    `;
    document.getElementById("time-container").innerHTML = html;
}

function displayRoutesTimes(ticketType){
    passenger.ticketType = ticketType;
    let container = document.getElementById('route-container');

    if (ticketType === 'BUS') {
        routes = busRoutes;
    } else if (ticketType === 'TRAIN') {
        routes = trainRoutes;
    } else if (ticketType === 'FLIGHT') {
        routes = flightRoutes;
    }

    let html = `
        <div class="flex mt-2 items-center">
            <p class="w-80">Available Routes</p>
            <select onchange = {showTime(value)} class="border-2 p-2 hover:ring rounded w-full" name="route" id="route">
                <option value="">Select a route</option>
                ${routes.map(route =>
                    (`<option value="${route.route}">${route.route} - ${upFive(passenger.premiumFare * route.fare)} BDT</option>`)
                ).join('')}
            </select>
        </div>
    `;
    container.innerHTML = html;
}

function ticket_summary_show(){
  html = `
    <div class="bg-gray-100 text-cyan-800 px-4 border-l-5 rounded border-cyan-800">
                                <div class="summary-card-element">
                                    <span>Ticket ID</span>
                                    <span>${passenger.ticketId}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Name</span>
                                    <span>${passenger.name}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Age</span>
                                    <span>${passenger.age}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Contact</span>
                                    <span>${passenger.contact}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Ticket Type</span>
                                    <span>${passenger.ticketType}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Selected Route</span>
                                    <span>${passenger.selectedRoute}</span>
                                </div>
                                <div class="summary-card-element">
                                    <span>Departure Time</span>
                                    <span>${passenger.selectedTime}</span>
                                </div>
                                <div class="summary-card-element">
                                    <span>Class</span>
                                    <span>${passenger.class}</span>
                                </div>
                                <div style = "border: 0;" class="summary-card-element">
                                    <span>Total Fare</span>
                                    <span id = "total-fare">${passenger.fare}</span>
                                </div>
                            </div>
  `
  return html;
}

let couponNotUsed = true;
document.getElementById("apply-coupon-button").addEventListener("click", function(){
  let couponValue = geID("coupon-input").value;
  if(couponValue === "ECE" && couponNotUsed){
    let initialFare = passenger.fare;
    passenger.fare = upFive(passenger.fare * 0.8889);
    let saved = initialFare - passenger.fare;
    geID("bdt-saved-msg").innerText = `(${saved} BDT Saved..!)`;
    geID("total-fare").innerText = `${passenger.fare}`;
    geID("coupon-success-div").style.display = "block";
    couponNotUsed = false;
  } else {
    if(!couponNotUsed){
      alert("Coupon already applied.");
    } else {
      alert("Invalid Coupon.");
    }
  }
})


const payment_number = geID("payment-account-number");
const buttons = document.querySelectorAll("#payment-buttons .btn");
buttons.forEach(btn => {
  btn.addEventListener("click" ,() => {
    buttons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    payment_number.style.display = "block";
  });
});

const confirm_payment_button = geID("confirm-payment-button");
confirm_payment_button.addEventListener("click", () => {
  passenger.transactionId = generateTransactionID();
  geID("show-transaction-id").innerText = passenger.transactionId;
  geID("show-ticket-id").innerText = passenger.ticketId;
  const date = new Date();
  passenger.booktime = date.toDateString() + "  " + date.toTimeString().slice(0,5);
  showSection(final_section);
  savePassenger(passenger);
})

geID("check-ticket").addEventListener("click", function(){
  showSection(ticket_check_section);
})
geID("check-ticket-last").addEventListener("click", function(){
  showSection(ticket_check_section);
})

function showSavedTicket(tickedID){

  tickedID = geID("ticket-id-input_home").value;
  const invalid_ticket_id = geID("invalid-ticket-id")
  passenger = getPassengerByTicketId(tickedID);
  if(passenger === undefined){
    invalid_ticket_id.style.display = "block";
    return ;
  }
  invalid_ticket_id.style.display = "none";
  html = `
    <div class="bg-gray-100 text-cyan-800 px-4 border-l-5 rounded border-cyan-800">
                                <div class="summary-card-element">
                                    <span>Ticket ID</span>
                                    <span>${passenger.ticketId}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Transaction ID</span>
                                    <span>${passenger.transactionId}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Name</span>
                                    <span>${passenger.name}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Age</span>
                                    <span>${passenger.age}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Contact</span>
                                    <span>${passenger.contact}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Ticket Type</span>
                                    <span>${passenger.ticketType}</span>
                                </div>                            
                                <div class="summary-card-element">
                                    <span>Selected Route</span>
                                    <span>${passenger.selectedRoute}</span>
                                </div>
                                <div class="summary-card-element">
                                    <span>Departure Time</span>
                                    <span>${passenger.selectedTime}</span>
                                </div>
                                <div class="summary-card-element">
                                    <span>Class</span>
                                    <span>${passenger.class}</span>
                                </div>
                                <div class="summary-card-element">
                                    <span>Booking Time</span>
                                    <span>${passenger.booktime}</span>
                                </div>
                                <div style = "border: 0;" class="summary-card-element">
                                    <span>Total Fare</span>
                                    <span id = "total-fare">${passenger.fare}</span>
                                </div>
                            </div>
  `
  geID("saved-ticket-summary-show").innerHTML = html;
  showSection(saved_ticket_show);
}

displayRoutesTimes(passenger.ticketType);
