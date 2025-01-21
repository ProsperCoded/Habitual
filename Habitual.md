---
title: Habitual
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.23"

---

# Habitual

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# auth

## POST logout

POST /serverUrl/auth/logout

Logout User, by deleting Authorization cookie

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|User-Agent|header|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Login/Signup

GET /auth/callback

 **User Login with Google**  
   Users authenticate using their Google accounts. Upon successful login, the backend generates a session cookie.

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|User-Agent|header|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Request Token From Server, for Sepecific ID 

GET /auth/request-token/1

This is only for testing purpose, and will be removed in production

> Response Examples

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzQ4NTQ2OSwiZXhwIjoxNzM4MDkwMjY5fQ._egWzqUn6gGaPq0kPo-tuXnag-np56f6yx5u-u1eQkU"
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# user

## GET Profile

GET /user/profile

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|User-Agent|header|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# habit

## GET Get Habits

GET /habit

Get all Haibts available in habitual

> Response Examples

```json
{
  "data": [
    {
      "id": 1,
      "name": "verus",
      "description": "Claro cupressus bos alo candidus suffoco.",
      "creatorId": 8,
      "creator": {
        "id": 8,
        "firstName": "Hassan",
        "lastName": "Braun",
        "email": "Daniella_Gerhold@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 2,
      "name": "creo",
      "description": "Aliquid cognatus venustas.",
      "creatorId": 1,
      "creator": {
        "id": 1,
        "firstName": "Cheyanne",
        "lastName": "Mayert",
        "email": "Margarita57@hotmail.com",
        "profilePicture": null
      }
    },
    {
      "id": 3,
      "name": "denique",
      "description": "Cito texo cedo curriculum.",
      "creatorId": 6,
      "creator": {
        "id": 6,
        "firstName": "Cleta",
        "lastName": "Mraz",
        "email": "Corene.Kunze@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 4,
      "name": "capto",
      "description": "Urbs tertius animadverto baiulus comedo audax.",
      "creatorId": 9,
      "creator": {
        "id": 9,
        "firstName": "Kyla",
        "lastName": "Quigley",
        "email": "Archibald_Hackett@gmail.com",
        "profilePicture": null
      }
    },
    {
      "id": 5,
      "name": "causa",
      "description": "Adeo curis verbum campana spectaculum bis.",
      "creatorId": 5,
      "creator": {
        "id": 5,
        "firstName": "Casimir",
        "lastName": "Dare",
        "email": "Talia.Huels90@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 6,
      "name": "adaugeo",
      "description": "Credo condico versus artificiose antiquus corona numquam conturbo.",
      "creatorId": 7,
      "creator": {
        "id": 7,
        "firstName": "Marcellus",
        "lastName": "Walsh",
        "email": "Gerard52@hotmail.com",
        "profilePicture": null
      }
    },
    {
      "id": 7,
      "name": "spoliatio",
      "description": "Theologus vinculum coma cupio viridis theatrum patrocinor denego aufero accommodo.",
      "creatorId": 10,
      "creator": {
        "id": 10,
        "firstName": "Lane",
        "lastName": "Bernhard",
        "email": "Willie49@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 8,
      "name": "dolorem",
      "description": "Illum videlicet taceo strenuus aggero.",
      "creatorId": 4,
      "creator": {
        "id": 4,
        "firstName": "Veronica",
        "lastName": "Kutch",
        "email": "Arno.Walsh@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 9,
      "name": "coniecto",
      "description": "Surculus fuga quaerat accendo aveho decet error quos eum.",
      "creatorId": 2,
      "creator": {
        "id": 2,
        "firstName": "Christopher",
        "lastName": "McDermott",
        "email": "Gust.Haag-Reichel51@gmail.com",
        "profilePicture": null
      }
    },
    {
      "id": 10,
      "name": "eius",
      "description": "Aiunt amaritudo cogo tersus canonicus tenuis illo deleniti.",
      "creatorId": 3,
      "creator": {
        "id": 3,
        "firstName": "Germaine",
        "lastName": "Grimes",
        "email": "Michael_Koss@hotmail.com",
        "profilePicture": null
      }
    },
    {
      "id": 11,
      "name": "uterque",
      "description": "Concedo stabilis alienus succedo.",
      "creatorId": 13,
      "creator": {
        "id": 13,
        "firstName": "Alexane",
        "lastName": "Nienow",
        "email": "Tillman91@gmail.com",
        "profilePicture": null
      }
    },
    {
      "id": 12,
      "name": "victoria",
      "description": "Harum trado tricesimus.",
      "creatorId": 11,
      "creator": {
        "id": 11,
        "firstName": "Torrance",
        "lastName": "Schuster",
        "email": "Raquel0@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 13,
      "name": "tero",
      "description": "Vereor contego denuncio denuncio.",
      "creatorId": 19,
      "creator": {
        "id": 19,
        "firstName": "Albin",
        "lastName": "West",
        "email": "Camren.Altenwerth21@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 14,
      "name": "thesaurus",
      "description": "Ex suggero certe carmen bos facilis adulatio custodia viduo depraedor.",
      "creatorId": 12,
      "creator": {
        "id": 12,
        "firstName": "Pete",
        "lastName": "Wolff",
        "email": "Mabelle.Paucek-Rodriguez80@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 15,
      "name": "aggredior",
      "description": "Umquam dolorem bis crebro cohaero somnus.",
      "creatorId": 15,
      "creator": {
        "id": 15,
        "firstName": "Zita",
        "lastName": "Stroman",
        "email": "Ofelia_Abshire@gmail.com",
        "profilePicture": null
      }
    },
    {
      "id": 16,
      "name": "aestas",
      "description": "Decretum porro ciminatio approbo deporto.",
      "creatorId": 14,
      "creator": {
        "id": 14,
        "firstName": "Abner",
        "lastName": "Fritsch",
        "email": "Curtis_Gutkowski41@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 17,
      "name": "adficio",
      "description": "Amiculum aestus quas tubineus.",
      "creatorId": 16,
      "creator": {
        "id": 16,
        "firstName": "Collin",
        "lastName": "Huels",
        "email": "Gwendolyn54@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 18,
      "name": "crepusculum",
      "description": "Universe campana aut sperno depopulo delicate.",
      "creatorId": 17,
      "creator": {
        "id": 17,
        "firstName": "Treva",
        "lastName": "Denesik",
        "email": "Mckenna_Koss95@gmail.com",
        "profilePicture": null
      }
    },
    {
      "id": 19,
      "name": "delicate",
      "description": "Deleniti alius sufficio atrocitas vita.",
      "creatorId": 18,
      "creator": {
        "id": 18,
        "firstName": "Jackson",
        "lastName": "Wiza",
        "email": "Piper6@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 20,
      "name": "vinum",
      "description": "Tam careo vobis.",
      "creatorId": 20,
      "creator": {
        "id": 20,
        "firstName": "Francisco",
        "lastName": "Jenkins",
        "email": "Trinity_Thompson@hotmail.com",
        "profilePicture": null
      }
    },
    {
      "id": 21,
      "name": "Terrence Bode",
      "description": "Cito templum assentator tum esse. Reprehenderit ullam acidus accendo audio curo demo vestigium curriculum creo. Rem deserunt pecto atqui exercitationem titulus. Curto contra volva aqua quisquam defungo iure ciminatio amissio crinis. Benevolentia vix allatus tripudio callide adsum solvo comes. Velum sunt cruentus voluptatibus tardus perferendis tondeo deprimo aegre. Spiritus error curtus. Caveo auctor accedo.",
      "creatorId": 37,
      "creator": {
        "id": 37,
        "firstName": "Ike",
        "lastName": "Olson",
        "email": "Chase_Nader@yahoo.com",
        "profilePicture": null
      }
    },
    {
      "id": 26,
      "name": "Terrence Bode",
      "description": "Cito templum assentator tum esse. Reprehenderit ullam acidus accendo audio curo demo vestigium curriculum creo. Rem deserunt pecto atqui exercitationem titulus. Curto contra volva aqua quisquam defungo iure ciminatio amissio crinis. Benevolentia vix allatus tripudio callide adsum solvo comes. Velum sunt cruentus voluptatibus tardus perferendis tondeo deprimo aegre. Spiritus error curtus. Caveo auctor accedo.",
      "creatorId": 1,
      "creator": {
        "id": 1,
        "firstName": "Cheyanne",
        "lastName": "Mayert",
        "email": "Margarita57@hotmail.com",
        "profilePicture": null
      }
    }
  ],
  "message": "Successfully Fetched Habits"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Create Habit

POST /habit

Create Habit

> Body Parameters

```json
{
  "name": "string",
  "description": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |name|
|» description|body|string| yes |none|

> Response Examples

```json
{
  "data": {
    "id": 27,
    "name": "Ginger Gislason",
    "description": "Volva aeneus urbs dolores pariatur praesentium sol. Conitor adsidue ait sublime advoco. Ad condico provident pectus corrigo vereor tondeo. Congregatio arcus suspendo suscipio tracto xiphias absconditus accusantium cicuta. Suspendo commodo mollitia vergo tamdiu aperio templum clamo neque velit. Testimonium virga utrimque benevolentia aurum magnam trucido. Crepusculum tardus demens aeternus tolero aestivus sollicito adstringo ocer. Aufero adeo patrocinor approbo conspergo appello color minima cognatus nemo.",
    "creatorId": 20
  },
  "message": "Successfully Created Habit"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## DELETE Delete a Habit 

DELETE /habit/{id}

Delete Created habit 

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# HabitGroup

## GET Get User Habit Groups

GET /habit-group/user

Get all habits groups that the user has joined in the past

> Response Examples

```json
{
  "message": "Successfully fetched all habit groups",
  "data": [
    {
      "id": 12,
      "name": "Phyllis Rau",
      "description": "Credo dens corrupti facilis ustilo. Titulus tamisium credo aestivus constans suggero spes quae tum. Talus delectatio animi undique. Consectetur animus pecto quo surgo eum modi defessus optio circumvenio. Catena cilicium argentum tam tabgo cito territo videlicet. Verus vox clam vitiosus beatus. Libero sumptus comedo voluptatum curso adsuesco claudeo decretum tego. Subnecto termes summa similique verto asper.",
      "groupState": "private",
      "habitId": 20,
      "startDate": "2025-04-05",
      "interval": "28 days",
      "creatorId": 1,
      "habit": {
        "id": 20,
        "name": "vinum",
        "description": "Tam careo vobis.",
        "creatorId": 20
      }
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Create Haibt Group

POST /habit-group

Create a group associated with a specific existing habit 

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "groupState": "public",
  "habitId": 1,
  "startDate": "2019-08-24",
  "interval": "1 day"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |name|
|» description|body|string| yes |none|
|» groupState|body|string| yes |none|
|» habitId|body|integer| yes |none|
|» startDate|body|string(date)| yes |none|
|» interval|body|string| yes |none|

#### Enum

|Name|Value|
|---|---|
|» groupState|public|
|» groupState|private|

> Response Examples

```json
{
  "message": "Successfully created habit group",
  "data": {
    "id": 14,
    "name": "Spencer Mills",
    "description": "Ago temeritas turba accusantium stultus delego veritatis. Convoco ocer aveho infit. Stipes cupiditas curis super textus. Auctor vergo capto ipsum amor denuncio dignissimos agnitio. Deprecator vado aeger ocer virga provident asperiores. Aer excepturi comminor suggero voluptatibus repudiandae voluptatum deprimo una. Terror adsuesco sumo stips vulgus adsuesco.",
    "groupState": "public",
    "habitId": 1,
    "startDate": "2025-09-06",
    "interval": "2 mons",
    "creatorId": 1
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Fetch all Public Habit Group

GET /habit-group

Fetch all Public Habit Group, the user may or not be part of 

> Response Examples

```json
{
  "message": "Successfully fetched all habit groups",
  "data": [
    {
      "id": 14,
      "name": "Spencer Mills",
      "description": "Ago temeritas turba accusantium stultus delego veritatis. Convoco ocer aveho infit. Stipes cupiditas curis super textus. Auctor vergo capto ipsum amor denuncio dignissimos agnitio. Deprecator vado aeger ocer virga provident asperiores. Aer excepturi comminor suggero voluptatibus repudiandae voluptatum deprimo una. Terror adsuesco sumo stips vulgus adsuesco.",
      "groupState": "public",
      "habitId": 1,
      "startDate": "2025-09-06",
      "interval": "2 mons",
      "creatorId": 1,
      "creator": {
        "id": 1,
        "firstName": "Cheyanne",
        "lastName": "Mayert",
        "email": "Margarita57@hotmail.com",
        "profilePicture": null
      },
      "habit": {
        "id": 1,
        "name": "verus",
        "description": "Claro cupressus bos alo candidus suffoco.",
        "creatorId": 8
      },
      "members": [
        {
          "userId": 1,
          "groupId": 14
        }
      ]
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## DELETE Delete a Habit Group

DELETE /habit-group/{id}

Delete a specific group, if you are the creator of the group

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Get A Group

GET /habit-group/{id}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|

> Response Examples

```json
{
  "message": "Successfully fetched habit group",
  "data": {
    "id": 12,
    "name": "Phyllis Rau",
    "description": "Credo dens corrupti facilis ustilo. Titulus tamisium credo aestivus constans suggero spes quae tum. Talus delectatio animi undique. Consectetur animus pecto quo surgo eum modi defessus optio circumvenio. Catena cilicium argentum tam tabgo cito territo videlicet. Verus vox clam vitiosus beatus. Libero sumptus comedo voluptatum curso adsuesco claudeo decretum tego. Subnecto termes summa similique verto asper.",
    "groupState": "private",
    "habitId": 20,
    "startDate": "2025-04-05",
    "interval": "28 days",
    "creatorId": 1,
    "creator": {
      "id": 1,
      "firstName": "Cheyanne",
      "lastName": "Mayert",
      "email": "Margarita57@hotmail.com",
      "profilePicture": null
    },
    "habit": {
      "id": 20,
      "name": "vinum",
      "description": "Tam careo vobis.",
      "creatorId": 20
    },
    "members": [
      {
        "userId": 1,
        "groupId": 12,
        "user": {
          "id": 1,
          "firstName": "Cheyanne",
          "lastName": "Mayert",
          "email": "Margarita57@hotmail.com",
          "profilePicture": null
        }
      }
    ]
  }
}
```

```json
{
  "message": "Successfully fetched habit group",
  "data": {
    "id": 12,
    "name": "Phyllis Rau",
    "description": "Credo dens corrupti facilis ustilo. Titulus tamisium credo aestivus constans suggero spes quae tum. Talus delectatio animi undique. Consectetur animus pecto quo surgo eum modi defessus optio circumvenio. Catena cilicium argentum tam tabgo cito territo videlicet. Verus vox clam vitiosus beatus. Libero sumptus comedo voluptatum curso adsuesco claudeo decretum tego. Subnecto termes summa similique verto asper.",
    "groupState": "private",
    "habitId": 20,
    "startDate": "2025-04-05",
    "interval": "28 days",
    "creatorId": 1,
    "creator": {
      "id": 1,
      "firstName": "Cheyanne",
      "lastName": "Mayert",
      "email": "Margarita57@hotmail.com",
      "profilePicture": null
    },
    "habit": {
      "id": 20,
      "name": "vinum",
      "description": "Tam careo vobis.",
      "creatorId": 20
    },
    "members": [
      {
        "userId": 1,
        "groupId": 12,
        "user": {
          "id": 1,
          "firstName": "Cheyanne",
          "lastName": "Mayert",
          "email": "Margarita57@hotmail.com",
          "profilePicture": null
        }
      }
    ]
  }
}
```

```json
{
  "message": "Habit Group not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|0|Unknown|none|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|Inline|

### Responses Data Schema

## PUT Leave Group 

PUT /habit-group/leave-group/{id}

Leave Group As a Member

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|

> Response Examples

```json
{
  "message": "Successfully Left Habit Group Phyllis Rau",
  "data": {
    "id": 12,
    "name": "Phyllis Rau",
    "description": "Credo dens corrupti facilis ustilo. Titulus tamisium credo aestivus constans suggero spes quae tum. Talus delectatio animi undique. Consectetur animus pecto quo surgo eum modi defessus optio circumvenio. Catena cilicium argentum tam tabgo cito territo videlicet. Verus vox clam vitiosus beatus. Libero sumptus comedo voluptatum curso adsuesco claudeo decretum tego. Subnecto termes summa similique verto asper.",
    "groupState": "private",
    "habitId": 20,
    "startDate": "2025-04-05",
    "interval": "28 days",
    "creatorId": 1,
    "members": []
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT Join Habit Group

PUT /habit-group/join-group/{id}

Join a user to a specific group 

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|

> Response Examples

```json
{
  "message": "Successfully Joined Habit Group",
  "data": null
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Data Schema

