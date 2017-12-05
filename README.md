maeva-json
===

JSON in-memory database compatible with maeva

# Usage

```js
import * as data from 'maeva';
import json from 'maeva-json';

// connect
data.connect(json());

// define a model
const usersModel = data.model('users', {email: String});

// fire queries
const user = await data.findOne(usersModel, {email: 'joe@doe.com'});
// {id: 1, "email": "joe@doe.com"}
```

View [maeva](https://github.com/co2-git/maeva) for more information.
