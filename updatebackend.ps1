# Update the backend
cd .\teamforge-backend\
echo "Pulling changes from backend repo..."
git submodule update --remote
echo "Backend shoudld be updated!"
cd .. # go back to main directory