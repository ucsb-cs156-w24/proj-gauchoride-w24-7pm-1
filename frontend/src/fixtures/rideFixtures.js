const rideFixtures = {
    oneRide:
    [
      {
       "id": 1,
        "day": "Monday",
        "start": "3:30PM",
        "end": "4:45PM",
        "pickupBuilding": "Cambell",
        "dropoffBuilding": "HSSB",
        "dropoffRoom": "123",
        "pickupRoom" : "111",
        "course": "CMPSC111",
        "notes": "",
        "shiftId": "2"
      }
    ],
    threeRidesTable:
    [
        {
            "id": 2,
            "day": "Tuesday",
            "student": "CGaucho",
            "driver": "Chris",
            "startTime": "5:00PM",
            "endTime": "5:50PM",
            "pickupBuilding": "Girvetz",
            "dropoffBuilding": "Phelps",
            "dropoffRoom": "123",
            "pickupRoom": "124",
            "course": "CMPSC64",
            "notes": "N/A",
            "shiftId": "2"
        },

        {
            "id": 3,
            "day": "Wednesday",
            "student": "CGaucho",
            "driver": "Chris",
            "startTime": "11:00AM",
            "endTime": "11:15AM",
            "pickupBuilding": "SRB",
            "dropoffBuilding": "HFH",
            "dropoffRoom": "123",
            "pickupRoom": "125",
            "course": "CMPSC138",
            "notes": "Hi",
            "shiftId": "100"
        },

        {
            "id": 4,
            "day": "Thursday",
            "student": "CGaucho",
            "driver": "Chris",
            "startTime": "4:15PM",
            "endTime": "5:30PM",
            "pickupBuilding": "Buchanan",
            "dropoffBuilding": "Phelps",
            "dropoffRoom": "123",
            "pickupRoom": "125",
            "course": "CMPSC156",
            "notes": "2 people",   
            "shiftId": "10"
        },
        
    ],
    threeRides:
    [
        {
            "id": 2,
            "day": "Tuesday",
            "start": "5:00PM",
            "end": "5:50PM",
            "pickupBuilding": "Girvetz",
            "dropoffBuilding": "Phelps",
            "dropoffRoom": "123",
            "pickupRoom": "125",
            "course": "CMPSC64",
            "notes": "3rides1",
            "shiftId": "2"
        },

        {
            "id": 3,
            "day": "Wednesday",
            "start": "11:00AM",
            "end": "11:15AM",
            "pickupBuilding": "SRB",
            "dropoffBuilding": "HFH",
            "dropoffRoom": "123",
            "pickupRoom": "125",
            "course": "CMPSC138",
            "notes": "3rides2",
            "shiftId": "7"
        },

        {
            "id": 4,
            "day": "Thursday",
            "start": "4:15PM",
            "end": "5:30PM",
            "pickup": "Buchanan",
            "dropoff": "Phelps",
            "dropoffRoom": "123",
            "pickupRoom": "125",
            "course": "CMPSC156",
            "notes": "3rides3",
            "shiftId": "3"
        },
        
    ]
};

export { rideFixtures };