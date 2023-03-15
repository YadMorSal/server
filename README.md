## Service Routes

| URI path                          |  HTTP Method | Descripción                          |
|: -------------------------------: |: ---------- :|: ---------------------------------- :|
| /api/service/getAllServices       |GET           | Announcement list                    |
| /api/service/details/:service_id          |GET           | Details of an ad according to its ID |
| /api/service/saveServices         |POST          | Create a new ad                      |
| /api/service/editService/:service_id             |PUT           | Edit service an ad based on its ID           |
| /api/service/deleteService/:service_id           |DELETE        | Delete an ad based on its ID         |


## **User routes**:

| URL path                     | HTTP Method       | Action                                            |
| :---------------------------:|:-----------------:|  :-----------------------------------------------:|
| /api/users/getAllUsers       | GET               | Get all users from the DB                         |
| /api/users/getOneUsers/:id   | GET               | Get all user an ad based on its ID from the DB    |
| /api/users/editusers/:id     | PUT               | Edit user an ad based on its ID   |
| /api/users/addToFav/:user_id     | PUT          | Edit user add to Favorite from DB                           |
| /api/users/substractToFav/:user_id  | PUT     | substract announcement and edit user favorite from DB  |
| /api/users/delete/:user_id        | DELETE    | Delete a user                                     |

## Auth Routes

| URI path      |HTTP Method |  Descripción                |
|:-------------:|: ---------:|: ------------------------- :|
| /api/verify   |GET         | Verify authentication token |
| /api/signup   |POST        |  User register              |
| /api/login    |POST        | user login                  |