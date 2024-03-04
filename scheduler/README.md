# Installation

## Install gems

```
bundle
```

## Create database

You will need to install and run Postgres if you haven't done so yet. I recommend using [Postgres.app](https://postgresapp.com/downloads.html) on Mac OS.

```
bundle exec rails db:create
```

## Run migration

```
bundle exec rails db:migrate db:test:prepare
```

## Install js packages

```
yarn
```

## Setup and configure Google application for local authentication

Go to https://console.cloud.google.com and create a new project.

After creating a project, got the `Credentials` section in the left-hand navigation, and use the button at the top to `Create Credentials`. From that menu, pick `OAuth Client ID`.

In the flow that appears, pick `Web application` from the menu and then name your new ID `Local Development Client` and update the `Authorized redirects URIs` to include `http://localhost:3000/auth/google_oauth2/callback`.

After that is created, you should have both a client id and a secret, you can add these to a `.env` file in the root of this project, with the following environment variables set.

```
GOOGLE_CLIENT_ID=<your-new-id-here>
GOOGLE_CLIENT_SECRET=<your-new-client-secret-here>
PORT=3000
```

## Run server in a terminal tab

```
bundle exec rails server
```

## Run esbuild in another terminal tab

```
bin/dev
```

# JSON API request and response examples

## POST /events

* Request
```
{
  event: {
    title: "My event",
    description: "My event description",
    expires_on: "2021-01-01",
    event_availabilities: [
      {
        from: "2021-01-01 10:00:00", # iso8601 format
        to: "2021-01-01 12:00:00" # iso8601 format
      },
      {
        from: "2021-01-01 14:00:00", # iso8601 format
        to: "2021-01-01 16:00:00" # iso8601 format
      }
    ]
  }
}
```

* Response

`Same as GET /events/:id`

## GET /events/:id

```
{
  "event": {
    "data": {
      "id":"0147a6f6-1526-43bf-a5c9-74b7d84731d9",
      "type":"event",
      "attributes":{
        "title":"Event 1",
        "code":"RVZZF4","expires_on":"2023-09-09",
        "description":"",
        "common_times":{
          "2023-08-31 10:00:00 -0700..2023-08-31 11:00:00 -0700":["d5a59c5b-6b30-496c-b37f-42b1b9013b9c","11cbf189-efa9-4bb5-9ddf-0ff07d95930f"]
          },
        "common_times_votes":{
          "2023-08-31 10:00:00 -0700..2023-08-31 11:00:00 -0700":["d5a59c5b-6b30-496c-b37f-42b1b9013b9c"]}
        },
        "relationships": {
          "user":{
            "data":{
              "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
              "type":"user"
            }
          },
          "participants":{
            "data":[
              {
                "id":"11cbf189-efa9-4bb5-9ddf-0ff07d95930f",
                "type":"user"
              },
              {
                "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
                "type":"user"
              }
            ]
          },
          "event_availabilities":{
            "data":[
              {
                "id":"1",
                "type":"event_availability"
              },
              {
                "id":"2",
                "type":"event_availability"
              },
              {
                "id":"3",
                "type":"event_availability"
              },
              {
                "id":"4",
                "type":"event_availability"
              },
              {
                "id":"5",
                "type":"event_availability"
              }
            ]
          }
        }
      }
    },
    "availabilities_by_user":{
      "d5a59c5b-6b30-496c-b37f-42b1b9013b9c":{
        "data":[
          {
            "id":"1",
            "type":"event_availability",
            "attributes":{
              "from":"2023-08-18T10:00:00.000-07:00",
              "to":"2023-08-18T12:00:00.000-07:00"
            },
            "relationships":{
              "event":{
                "data":{
                  "id":"0147a6f6-1526-43bf-a5c9-74b7d84731d9",
                  "type":"event"
                }
              },
              "user":{
                "data":{
                  "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
                  "type":"user"
                }
              }
            }
          },
          {
            "id":"2",
            "type":"event_availability",
            "attributes":{
              "from":"2023-08-19T09:00:00.000-07:00",
              "to":"2023-08-19T15:00:00.000-07:00"
            },
            "relationships":{
              "event":{
                "data":{
                  "id":"0147a6f6-1526-43bf-a5c9-74b7d84731d9",
                  "type":"event"
                }
              },
              "user":{
                "data":{
                  "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
                  "type":"user"
                }
              }
            }
          },
          {
            "id":"5",
            "type":"event_availability",
            "attributes":{
              "from":"2023-08-30T07:00:00.000-07:00",
              "to":"2023-08-30T07:00:00.000-07:00"
            },
            "relationships":{
              "event":{
                "data":{
                  "id":"0147a6f6-1526-43bf-a5c9-74b7d84731d9",
                  "type":"event"
                }
              },
              "user":{
                "data":{
                  "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
                  "type":"user"
                }
              }
            }
          },
          {
            "id":"4",
            "type":"event_availability",
            "attributes":{
              "from":"2023-08-31T10:00:00.000-07:00",
              "to":"2023-08-31T11:00:00.000-07:00"
            },
            "relationships":{
              "event":{
                "data":{
                  "id":"0147a6f6-1526-43bf-a5c9-74b7d84731d9",
                  "type":"event"
                }
              },
              "user":{
                "data":{
                  "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
                  "type":"user"
                }
              }
            }
          }
        ]
      },
      "11cbf189-efa9-4bb5-9ddf-0ff07d95930f":{
        "data":[
          {
            "id":"3",
            "type":"event_availability",
            "attributes":{
              "from":"2023-08-31T07:00:00.000-07:00",
              "to":"2023-08-31T19:00:00.000-07:00"
            },
            "relationships":{
              "event":{
                "data":{
                  "id":"0147a6f6-1526-43bf-a5c9-74b7d84731d9",
                  "type":"event"
                }
              },
              "user":{
                "data":{
                  "id":"11cbf189-efa9-4bb5-9ddf-0ff07d95930f",
                  "type":"user"
                }
              }
            }
          }
        ]
      }
    }
  }
```

## GET /events/

```
{
  "upcoming_events":{
    "data":[
      {
        "id":"f0f2cfc4-95c3-42bc-8011-8e1ac754c061",
        "type":"event",
        "attributes":{
          "title":"Event 3",
          "code":"I9MOZX",
          "expires_on":"2023-09-07",
          "description":"blah, blah",
          "common_times":{},
          "common_times_votes":{}
        },
        "relationships":{
          "user":{
            "data":{
              "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
              "type":"user"
            }
          },
          "participants":{
            "data":[]
          },
          "event_availabilities":{
            "data":[]
          }
        }
      },
      {
        "id":"3162c77f-ca35-47c8-adca-069aac0dc840",
        "type":"event",
        "attributes":{
          "title":"Event 2",
          "code":"2MUXOQ",
          "expires_on":"2023-09-08",
          "description":"",
          "common_times":{},
          "common_times_votes":{}
        },
        "relationships":{
          "user":{
            "data":{
              "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
              "type":"user"
            }
          },
          "participants":{
            "data":[]
          },
          "event_availabilities":{
            "data":[]
          }
        }
      },
      {
        "id":"0147a6f6-1526-43bf-a5c9-74b7d84731d9",
        "type":"event",
        "attributes":{
          "title":"Event 1",
          "code":"RVZZF4",
          "expires_on":"2023-09-09",
          "description":"",
          "common_times":{
            "2023-08-31 10:00:00 -0700..2023-08-31 11:00:00 -0700":["d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
            "11cbf189-efa9-4bb5-9ddf-0ff07d95930f"]
          },
          "common_times_votes":{
            "2023-08-31 10:00:00 -0700..2023-08-31 11:00:00 -0700":["d5a59c5b-6b30-496c-b37f-42b1b9013b9c"]
          }
        },
        "relationships":{
          "user":{
            "data":{
              "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c",
              "type":"user"
            }
          },
          "participants":{
            "data":[
              {
                "id":"11cbf189-efa9-4bb5-9ddf-0ff07d95930f",
                "type":"user"
              },
              {
                "id":"d5a59c5b-6b30-496c-b37f-42b1b9013b9c","type":"user"
              }
            ]
          },
          "event_availabilities":{
            "data":[
              {
                "id":"1",
                "type":"event_availability"
              },
              {
                "id":"2",
                "type":"event_availability"
              },
              {
                "id":"3",
                "type":"event_availability"
              },
              {
                "id":"4",
                "type":"event_availability"
              },{
                "id":"5",
                "type":"event_availability"
              }
            ]
          }
        }
      }
    ]
  },
  "upcoming_participating_events":{
    "data":[]
  },
  "closed_events":{
    "data":[]
  }
}
```

## POST /events/:id/event_availabilities

* Request
```
{
  from: "2021-01-01 10:00:00", # iso8601 format
  to: "2021-01-01 12:00:00" # iso8601 format
},
```

* Response

```
{
  event: {
    id: ....
  }
}
```

## POST /events/:id/vote_for_time

* Request
```
{
  commont_time: '2023-08-31 10:00:00 -0700..2023-08-31 11:00:00 -0700',
}
```

* Response

```
{
  event: {
    id: ....
  }
}
```

# TODO

- [ ] Add support for JWT
- [ ] Use JWT for authentication