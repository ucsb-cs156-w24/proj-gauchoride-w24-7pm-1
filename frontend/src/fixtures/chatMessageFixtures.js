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

const pagedChatFixtures = {
    
        "content": [
          {
            "id": 1,
            "userId": 1,
            "payload": "12:30AM",
            "timestamp": "2023-08-18T08:24:30.661204",
            "dm": false,
            "toUserId": 0
          },
          {
            "id": 2,
            "userId": 1,
            "payload": "12:31AM",
            "timestamp": "2023-08-18T08:25:04.62341",
            "dm": false,
            "toUserId": 0
          },
          {
            "id": 3,
            "userId": 1,
            "payload": "12:31AM",
            "timestamp": "2023-08-18T08:33:08.465613",
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
          "pageSize": 5,
          "offset": 0,
          "paged": true,
          "unpaged": false
        },
        "totalPages": 1,
        "totalElements": 3,
        "last": true,
        "size": 5,
        "number": 0,
        "sort": {
          "sorted": true,
          "unsorted": false,
          "empty": false
        },
        "first": true,
        "numberOfElements": 3,
        "empty": false
      
}
export { chatMessageFixtures, pagedChatFixtures };