const chatMessageFixtures = {
    oneMessage:
    [
      {
        "id": 1,
        "userId": 1,
        "payload": "12:30AM",
        "timestamp": "2023-08-18T08:24:30.661204",
        "dm": false,
        "toUserId": null
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
        }
        
    ]
};

const firstPagedChatFixtures = {
    
  "content": [
    {
      "chatMessage": {
        "id": 30,
        "userId": 1,
        "payload": "message30",
        "timestamp": "2024-11-24T21:51:17.644146",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 29,
        "userId": 1,
        "payload": "message29",
        "timestamp": "2024-08-04T01:09:08.790645",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 28,
        "userId": 1,
        "payload": "message28",
        "timestamp": "2023-08-24T21:50:00.182364",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 27,
        "userId": 1,
        "payload": "message27",
        "timestamp": "2023-08-24T21:49:56.026918",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 26,
        "userId": 1,
        "payload": "message26",
        "timestamp": "2023-08-24T21:49:48.278688",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 25,
        "userId": 1,
        "payload": "message25",
        "timestamp": "2023-08-24T21:49:44.172651",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 24,
        "userId": 1,
        "payload": "message24",
        "timestamp": "2023-08-24T21:49:40.602912",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 23,
        "userId": 1,
        "payload": "message23",
        "timestamp": "2023-08-24T21:49:36.802511",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 22,
        "userId": 1,
        "payload": "message22",
        "timestamp": "2023-08-24T21:49:33.488459",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 21,
        "userId": 1,
        "payload": "message21",
        "timestamp": "2023-08-24T21:49:31.106867",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    }
  ],
  "pageable": {
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalPages": 3,
  "totalElements": 30,
  "last": false,
  "size": 10,
  "number": 0,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "first": true,
  "numberOfElements": 10,
  "empty": false
      
}

const secondPagedChatFixtures = {
    
  "content": [
    {
      "chatMessage": {
        "id": 20,
        "userId": 1,
        "payload": "message20",
        "timestamp": "2023-08-24T21:49:28.229408",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 19,
        "userId": 1,
        "payload": "message19",
        "timestamp": "2023-08-24T21:49:24.438798",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 18,
        "userId": 1,
        "payload": "message18",
        "timestamp": "2023-08-24T21:49:21.232491",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 17,
        "userId": 1,
        "payload": "message17",
        "timestamp": "2023-08-24T21:49:18.591473",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 16,
        "userId": 1,
        "payload": "message16",
        "timestamp": "2023-08-24T21:49:15.078777",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 15,
        "userId": 1,
        "payload": "message15",
        "timestamp": "2023-08-24T21:49:12.166436",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 14,
        "userId": 1,
        "payload": "message14",
        "timestamp": "2023-08-24T21:49:08.582609",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 13,
        "userId": 1,
        "payload": "message13",
        "timestamp": "2023-08-24T21:49:05.79907",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 12,
        "userId": 1,
        "payload": "message12",
        "timestamp": "2023-08-24T21:49:02.649196",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 11,
        "userId": 1,
        "payload": "message11",
        "timestamp": "2023-08-24T21:48:59.403401",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    }
  ],
  "pageable": {
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "pageNumber": 1,
    "pageSize": 10,
    "offset": 10,
    "paged": true,
    "unpaged": false
  },
  "totalPages": 3,
  "totalElements": 30,
  "last": false,
  "size": 10,
  "number": 1,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "first": false,
  "numberOfElements": 10,
  "empty": false
      
}

const thirdPagedChatFixtures = {
    
  "content": [
    {
      "chatMessage": {
        "id": 10,
        "userId": 1,
        "payload": "message10",
        "timestamp": "2023-08-24T21:48:56.268648",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 9,
        "userId": 1,
        "payload": "message9",
        "timestamp": "2023-08-24T21:48:52.848812",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 8,
        "userId": 1,
        "payload": "message8",
        "timestamp": "2023-08-24T21:48:49.813983",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 7,
        "userId": 1,
        "payload": "message7",
        "timestamp": "2023-08-24T21:48:47.775468",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 6,
        "userId": 1,
        "payload": "message6",
        "timestamp": "2023-08-24T21:48:45.248654",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 5,
        "userId": 1,
        "payload": "message5",
        "timestamp": "2023-08-24T21:48:41.120841",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 4,
        "userId": 1,
        "payload": "message4",
        "timestamp": "2023-08-24T21:48:38.388776",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 3,
        "userId": 1,
        "payload": "message3",
        "timestamp": "2023-08-24T21:48:35.653172",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 2,
        "userId": 1,
        "payload": "message2",
        "timestamp": "2023-08-24T21:48:33.036862",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    },
    {
      "chatMessage": {
        "id": 1,
        "userId": 1,
        "payload": "message1",
        "timestamp": "2023-08-24T21:47:48.121942",
        "dm": false,
        "toUserId": null
      },
      "email": "cGaucho@ucsb.edu"
    }
  ],
  "pageable": {
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "pageNumber": 2,
    "pageSize": 10,
    "offset": 20,
    "paged": true,
    "unpaged": false
  },
  "totalPages": 3,
  "totalElements": 30,
  "last": true,
  "size": 10,
  "number": 2,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "first": false,
  "numberOfElements": 10,
  "empty": false
}


export { chatMessageFixtures, firstPagedChatFixtures, secondPagedChatFixtures, thirdPagedChatFixtures};

