# azure-check
Testing azure static apps.
Sources:
https://learn.microsoft.com/en-us/azure/static-web-apps/add-api?tabs=react
https://learn.microsoft.com/en-us/training/modules/publish-static-web-app-api-preview-url/4-exercise-function-app?pivots=react

# CI/CD
Use api as a folder for backend app. If not installed, install command line tools:
npm install -g @azure/static-web-apps-cli

If not installed, install functions command line tools:
https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-python#install-the-azure-functions-core-tools

For backend:
For local development, update file local.settings.json for CORS
You don't need to change anything in code, like const response = await fetch('/api/products')
Run npm start from api folder, so backend now ready.

For frontend:
make build: npm run build from frontend folder.
run: swa start dist --api-location api

Now both app communicating properly. 

