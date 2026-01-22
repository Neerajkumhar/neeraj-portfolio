# Deployment Instructions

You have successfully separated your project into two distinct applications: **frontend** and **backend**. This allows you to deploy them as separate projects on Vercel.

## 1. Deploying the Backend
1.  Push your changes to GitHub.
2.  Go to Vercel Dashboard -> Add New -> Project.
3.  Select your repository.
4.  **Important**: In "Root Directory" settings, click "Edit" and select `backend`.
5.  **Environment Variables**: Add your `MONGODB_URI` from your local `.env` file to the Vercel project settings.
6.  Deploy.
6.  Once deployed, copy the **Domain** (e.g., `https://neeraj-portfolio-backend.vercel.app`).

## 2. Connecting Frontend to Backend
1.  **Locally**: Update `frontend/.env`:
    ```properties
    VITE_API_URL=https://<YOUR_NEW_BACKEND_URL>
    ```
    (Or `http://localhost:5000` if running backend locally).
2.  **On Vercel**:
    - Go to Vercel Dashboard -> Add New -> Project.
    - Select your repository.
    - **Important**: In "Root Directory" settings, click "Edit" and select `frontend`.
    - In **Environment Variables**, add:
      - Name: `VITE_API_URL`
      - Value: `https://<YOUR_NEW_BACKEND_URL>` (the URL from Step 1).
3.  Deploy.

## 3. Running Locally
To run both projects locally:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Troubleshooting
- **CORS Errors**: If you see CORS errors, ensure your backend `vercel.json` and `api/index.js` (which we fixed) are deployed correctly.
- **404 Errors**: Ensure `VITE_API_URL` does not have a trailing slash (our code handles this, but it's good practice).
