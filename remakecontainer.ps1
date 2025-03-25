# PowerShell script to remake the Docker container because I am lazy.
# Obviously only works on Windows
# and you need to set ExecutionPolicy to a setting that lets you run it.
echo "Stopping container... (This may take a few seconds.)"
docker stop itsc4155projectcontainer
echo "Removing old container..."
docker remove itsc4155projectcontainer
echo "Rebuilding image..."
docker build -t itsc4155projectimage .
echo "Running container..."
docker run --name itsc4155projectcontainer -p 5000:5000 -p 80:80 -p 443:443 -p 25:25 -d itsc4155projectimage
echo "Container running! Stop with 'docker stop itsc4155projectcontainer'."
echo "Shell in with 'docker exec -it itsc4155projectcontainer bash'."