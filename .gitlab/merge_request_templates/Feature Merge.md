## Dev Summary

Issue link: >>insert link to issue/ticket(Gitlab, Trello, etc.)

In this MR I'm adding the following functionality:

- a new endpoint `/api/hello` to return `"Hello!"`
  - include any relevant technical details not included in the original issue/ticket

I made the following changes:

- Added a simple endpoint function in `main.py`
  - why: to make a code change to show off a simple merge request

## Test Plan

I have verified my changes with the following test plan:

1. run `docker-compose up`
2. visit the docs page on localhost `http://localhost:8000/api/docs#/`
3. verify you can execute the `GET` `/api/hello` endpoint and it return the json response `"Hello!`

## This MR is ready to submit because:

- [ ] It is up-to-date with Feature
- [ ] The "Squash and merge" option is selected
- [ ] I have removed any commented or unused code
- [ ] The gitlab issue is linked to this MR