API, Body and Response:


1. Api for Creating Candidate
    Request: ...../api/candidate/addCandidate
    Body: {
            "name": "abcd1234",
            "email": "abcd1234@test.com"
        }

2. Api for Getting Candidates
    Request: ..../api/candidate/
    Response: {
        {
    "candidates": [
        {
            "_id": "5f93f4e98a764b3ec00bd7f5",
            "name": "abc",
            "email": "abc@test.com",
            "__v": 0
        },
        {
            "_id": "5fbf90c98cacdc695c310c9f",
            "name": "abcd",
            "email": "abcd@test.com",
            "__v": 0
        },
        {
            "_id": "5fbf90d28cacdc695c310ca0",
            "name": "abcd123",
            "email": "abcd123@test.com",
            "__v": 0
        },
        {
            "_id": "5fbf90d68cacdc695c310ca1",
            "name": "abcd1234",
            "email": "abcd1234@test.com",
            "__v": 0
        }
    ]
}
    }

3. Api For Assigning to score to candidate with Id
    Request: ....../api/testScore/addScore
    Body: {    
        "firstRound": "9",
        "secondRound": "5",
        "thirdRound": "2",
        "candidate" : "5fbf90d68cacdc695c310ca1"  
    }

4. Api for getting highest Scoring Candidate
    Request: ...../api/testScore/hsCandidate
    Response: {
    "highestScoringCandidate": {
        "candidate": {
            "_id": "5fbf90d28cacdc695c310ca0",
            "name": "abcd123",
            "email": "abcd123@test.com",
            "__v": 0
        },
        "testScore": {
            "_id": "5fbf91248cacdc695c310ca3",
            "firstRound": 9,
            "secondRound": 5,
            "thirdRound": 4,
            "totalScore": 18,
            "candidate": "5fbf90d28cacdc695c310ca0",
            "__v": 0
        }
    }
}

5. Api for getting Average score for each round for all candidates
    Request: ......./api/testScore/avgScore
    Response: {
        "firstRoundAvg": 7,
    "secondRoundAvg": 4.75,
    "thirdRoundAvg": 3.5
    }