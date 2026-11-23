# Image hosting server

A small image hosting app: an Express server that serves and accepts PNG images by name, and a React page to search for and upload them. Course assignment, built in five daily steps (see the merged `day3` to `day5` pull requests).

## API

| Method | Route | What it does |
| --- | --- | --- |
| GET | `/api/getImage?name=tom` | Returns `public/tom.png`, or 404 if it does not exist |
| POST | `/api/upload?name=cat` | Accepts a form field `image` and saves it as `public/cat.png` |

Missing names or files return a 400 with a JSON error.

## Run locally

```
cd project
npm install
npm start               # server on http://localhost:3001

cd frontend
npm install
npm start               # React app on http://localhost:3000
```

Built with Node.js, Express 5, Multer and React.
