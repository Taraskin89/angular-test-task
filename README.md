# FrontEnd developer Test

## Required Technologies
 - [AngularJS](https://angularjs.org/)
 - [Twitter Bootstrap](http://getbootstrap.com/)
 - [Underscore.js](http://underscorejs.org/)
 - [Karma](https://karma-runner.github.io/)
 - [Jasmine](https://jasmine.github.io/)
## How to run

```
npm install
grunt start
```

## REST Services

There are a few services that you're supposed to use in order to create your application.

### Add a new album

- Url: `/albums/add`
- HTTP Method: `POST`
- Request data type: `application/json`
- Params: 
```json
{
  "title": "Empire Burlesque",
  "artist": "Bob Dylan",
  "country": "USA",
  "company": "Columbia",
  "price": 10.9,
  "year": 1985,
}
```

### Update an existing album

- Url: `/albums/update/:id`
- HTTP Method: `POST`
- Request data type: `application/json`
- Params: 
```json
{
  "title": "Empire Burlesque",
  "artist": "Bob Dylan",
  "country": "USA",
  "company": "Columbia",
  "price": 10.9,
  "year": 1985,
}
```

### Delete an existing album

- Url: `/albums/delete/:id`
- HTTP Method: `DELETE`

### Count how many albums are registered

- Url: `/albums/count`
- HTTP Method: `GET`

### Returns all albums

- Url: `/albums/all`
- HTTP Method: `GET`
