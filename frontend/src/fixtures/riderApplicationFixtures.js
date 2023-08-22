const riderApplicationFixtures = {
    oneRiderApplication:
    [
      {
       "id": 1,
        "status": "deny",
        "perm_number": "123",
        "created_date": "2023-06-22T05:22:22",
        "updated_date": "2023-07-22T05:22:22",
        "cancelled_date": "2023-07-25T05:22:22",
        "description": "I have broken leg",
        "notes": "no notes"    
      }
    ],
    threeRiderApplication:
    [
        {
            "id": 2,
            "status": "approved",
            "perm_number": "456",
            "created_date": "2023-07-22T05:22:22",
            "updated_date": "2023-08-22T05:22:22",
            "cancelled_date": "2023-09-25T05:22:22",
            "description": "I have broken arm",
            "notes": "no notes"
        },

        {
            "id": 3,
            "status": "deny",
            "perm_number": "789",
            "created_date": "2023-07-22T05:22:22",
            "updated_date": "2023-08-22T05:22:22",
            "cancelled_date": "2023-09-25T05:22:22",
            "description": "I have broken foot",
            "notes": "some notes" 
        },

        {
            "id": 4,
            "status": "approved",
            "perm_number": "101112",
            "created_date": "2023-10-22T05:22:22",
            "updated_date": "2023-11-22T05:22:22",
            "cancelled_date": "2023-12-25T05:22:22",
            "description": "I have broken finger",
            "notes": "long notes"
        },
        
    ]
};

export { riderApplicationFixtures };