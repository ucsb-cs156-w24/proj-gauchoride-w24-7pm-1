const chatMessageFixtures = {
    oneMessage:
    [
      {
        "id": 1,
      "userId": 1,
      "payload": "12:30AM",
      "timestamp": "2023-08-18T08:24:30.661204",
      "dm": false,
      "toUserId": 0
      }
    ],
    threeMessages:
    [
        {
            "id": 2,
            "userId": 11,
            "payload": "OneMessageThree",
            "timestamp": "2023-07-18T10:08:36",
            "toUserId": null,
            "dm": false       
        },

        {
            "id": 3,
            "userId": 12,
            "payload": "TwoMessageThree",
            "timestamp": "2023-06-18T10:08:36",
            "toUserId": null,
            "dm": false  
        },

        {
            "id": 4,
            "userId": 13,
            "payload": "ThreeMessageThree",
            "timestamp": "2023-05-18T10:08:36",
            "toUserId": null,
            "dm": false   
        },
        
    ]
};

export { chatMessageFixtures };