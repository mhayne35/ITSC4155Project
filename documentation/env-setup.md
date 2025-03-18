# Getting your .env file set up

You need the .env file to get the project to work properly. This is a per-person file - it's not copied over to the repository due to it being in .gitignore, so you need to make this yourself.

It goes in the project directory by the way

```ADMIN_PASS=MHBF&UNCC25
ADMIN_LOGIN=apolloadmin
ADMIN_USER={YOUR @CHARLOTTE.EDU EMAIL HERE}
SECRET_KEY=dev
DEV_MODE=True
```
You can change DEV_MODE to something other than ``True`` if you'd rather use the production (Azure) database instead of the local Postgres one.