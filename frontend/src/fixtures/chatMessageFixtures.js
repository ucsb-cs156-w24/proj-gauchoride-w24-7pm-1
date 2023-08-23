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
      "id": 1,
      "userId": 1,
      "payload": "Message1",
      "timestamp": "2023-08-22T16:39:54.981211",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 2,
      "userId": 1,
      "payload": "Message2",
      "timestamp": "2023-08-22T16:40:09.555741",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 3,
      "userId": 1,
      "payload": "Message3",
      "timestamp": "2023-08-22T16:40:13.792036",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 4,
      "userId": 1,
      "payload": "Message4",
      "timestamp": "2023-08-22T16:40:16.251808",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 5,
      "userId": 1,
      "payload": "Message5",
      "timestamp": "2023-08-22T16:40:18.538566",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 6,
      "userId": 1,
      "payload": "Message6",
      "timestamp": "2023-08-22T16:40:21.819083",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 7,
      "userId": 1,
      "payload": "Message7",
      "timestamp": "2023-08-22T16:40:24.223265",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 8,
      "userId": 1,
      "payload": "Message8",
      "timestamp": "2023-08-22T16:40:27.476765",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 9,
      "userId": 1,
      "payload": "Message9",
      "timestamp": "2023-08-22T16:40:30.032275",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 10,
      "userId": 1,
      "payload": "Message10",
      "timestamp": "2023-08-22T16:40:32.280206",
      "dm": false,
      "toUserId": 0
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
  "totalElements": 25,
  "last": false,
  "size": 10,
  "number": 0,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "numberOfElements": 10,
  "first": true,
  "empty": false
      
}

const secondPagedChatFixtures = {
    
  "content": [
    {
      "id": 11,
      "userId": 1,
      "payload": "Message11",
      "timestamp": "2023-08-22T16:40:34.419921",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 12,
      "userId": 1,
      "payload": "Message12",
      "timestamp": "2023-08-22T16:40:36.385311",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 13,
      "userId": 1,
      "payload": "Message13",
      "timestamp": "2023-08-22T16:40:38.490139",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 14,
      "userId": 1,
      "payload": "Message14",
      "timestamp": "2023-08-22T16:40:40.739879",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 15,
      "userId": 1,
      "payload": "Message15",
      "timestamp": "2023-08-22T16:40:43.231666",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 16,
      "userId": 1,
      "payload": "Message16",
      "timestamp": "2023-08-22T21:03:47.510025",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 17,
      "userId": 1,
      "payload": "Message17",
      "timestamp": "2023-08-22T21:03:53.146248",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 18,
      "userId": 1,
      "payload": "Message18",
      "timestamp": "2023-08-22T21:03:55.786879",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 19,
      "userId": 1,
      "payload": "Message19",
      "timestamp": "2023-08-22T21:03:58.940428",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 20,
      "userId": 1,
      "payload": "Message20",
      "timestamp": "2023-08-22T21:04:03.1719",
      "dm": false,
      "toUserId": 0
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
  "totalElements": 25,
  "last": false,
  "size": 10,
  "number": 1,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "numberOfElements": 10,
  "first": false,
  "empty": false
      
}

const thirdPagedChatFixtures = {
    
  "content": [
    {
      "id": 21,
      "userId": 1,
      "payload": "Message21",
      "timestamp": "2023-08-22T21:04:05.392204",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 22,
      "userId": 1,
      "payload": "Message22",
      "timestamp": "2023-08-22T21:04:08.245983",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 23,
      "userId": 1,
      "payload": "Message23",
      "timestamp": "2023-08-22T21:04:10.863978",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 24,
      "userId": 1,
      "payload": "Message24",
      "timestamp": "2023-08-22T21:04:13.498318",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 25,
      "userId": 1,
      "payload": "Message25",
      "timestamp": "2023-08-22T21:04:15.914394",
      "dm": false,
      "toUserId": 0
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
  "totalElements": 25,
  "last": true,
  "size": 10,
  "number": 2,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "numberOfElements": 5,
  "first": false,
  "empty": false
      
}

const onePagedChatFixtures = {
  "content": [
    {
      "id": 1,
      "userId": 1,
      "payload": "Message1",
      "timestamp": "2023-08-22T16:39:54.981211",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 2,
      "userId": 1,
      "payload": "Message2",
      "timestamp": "2023-08-22T16:40:09.555741",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 3,
      "userId": 1,
      "payload": "Message3",
      "timestamp": "2023-08-22T16:40:13.792036",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 4,
      "userId": 1,
      "payload": "Message4",
      "timestamp": "2023-08-22T16:40:16.251808",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 5,
      "userId": 1,
      "payload": "Message5",
      "timestamp": "2023-08-22T16:40:18.538566",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 6,
      "userId": 1,
      "payload": "Message6",
      "timestamp": "2023-08-22T16:40:21.819083",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 7,
      "userId": 1,
      "payload": "Message7",
      "timestamp": "2023-08-22T16:40:24.223265",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 8,
      "userId": 1,
      "payload": "Message8",
      "timestamp": "2023-08-22T16:40:27.476765",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 9,
      "userId": 1,
      "payload": "Message9",
      "timestamp": "2023-08-22T16:40:30.032275",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 10,
      "userId": 1,
      "payload": "Message10",
      "timestamp": "2023-08-22T16:40:32.280206",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 11,
      "userId": 1,
      "payload": "Message11",
      "timestamp": "2023-08-22T16:40:34.419921",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 12,
      "userId": 1,
      "payload": "Message12",
      "timestamp": "2023-08-22T16:40:36.385311",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 13,
      "userId": 1,
      "payload": "Message13",
      "timestamp": "2023-08-22T16:40:38.490139",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 14,
      "userId": 1,
      "payload": "Message14",
      "timestamp": "2023-08-22T16:40:40.739879",
      "dm": false,
      "toUserId": 0
    },
    {
      "id": 15,
      "userId": 1,
      "payload": "Message15",
      "timestamp": "2023-08-22T16:40:43.231666",
      "dm": false,
      "toUserId": 0
    }
  ],
  "pageable": {
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "pageNumber": 0,
    "pageSize": 15,
    "offset": 0,
    "unpaged": false,
    "paged": true
  },
  "totalPages": 1,
  "totalElements": 15,
  "last": true,
  "size": 15,
  "number": 0,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "first": true,
  "numberOfElements": 15,
  "empty": false
}


export { chatMessageFixtures, firstPagedChatFixtures, secondPagedChatFixtures, thirdPagedChatFixtures, onePagedChatFixtures};