ScarpperZilla - Scarp instagram profiles and store your data.

## Install


### Step 1: open project

The project is splitted in 2 enviroments. One is for backend express, mongoose and mongoDb and one is for for frontend with react.
eloop-react = main react frontend project
eloop-react/backend = our server side api

### Step 2: open eloop-react (react project)

Run `npm install`

After everything is installed run `npm start`, the app should run on localhost:3000

### Step 3: open eloop-react/backend in a different compiler window (server side api)
Run `npm install`

# Step 3.1
        After you installed the packages we need to updated the .env file to be able to connect to our data base.

# Step 3.2
        Go to `https://www.mongodb.com/cloud/atlas/register?utm_content=rlsapostreg&utm_source=google&utm_campaign=gs_emea_rlsamulti_search_brand_dsa_atlas_desktop_rlsa_postreg&utm_term=&utm_medium=cpc_paid_search&utm_ad=&utm_ad_campaign_id=14412646473&adgroup=131761130372&gclid=CjwKCAiAtouOBhA6EiwA2nLKHwVqKHpPuiGg1K4zDRf3IbwNFO78ortn240pru8nP4mRAIGiJyY49BoCJigQAvD_BwE`, login and build a free cluster.

# Step 3.3
        After the cluster is build, press Connect on the cluster and you should see the tab "Connect your application", press it and you should see something like this
        mongodb+srv://bogdanP:<password>@cluster0.e4kwl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

# Step 3.4
        Go to .env and updated ATLAS_URI variable with you cluster connect string.

# Step 3.5 
        After everything is installed run `node serve.js` , I should have used nodemone here but seems that I have some problems with the package.
        The server side should run on localhost:5000


### Step 4: after server is working go write localhost:3000 if the react app is running


## Working on the app

### Step 1: create account
    After you access localhost:5000 you shoul be pinned to the signeup page. Crate an account there to used the app.

### Step 2: login
    After you created the account login in the login page.

### Step 3: WTF IS NOT WORKING
    Wtf, it got you to a black page on /home and if you refresh it goes back to the signup page, what a piece of garbage. Bearth in, 4 sec, breath out, 4 sec, be present.

### Step 4: We need to send Bearer header for authentification on our own api
 # Step 4.1
    To do that go to google and search for "Mod Header extension" and install the extension

 # Step 4.2
    After everything is set up got to mongoDb into the user colletion and serach for the user you logged in with.
    Into the user schema of your user it shoul be a field called tokens, an array, open that and get the last token from that array, it shoul look like this
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzM1OWZkODU1MDkwZjk0ZDUyYmQwMCIsImlhdCI6MTY0MDE5MjUyNH0.pZj1_qy9-0ejhR3-hBbtKNiyh1_q5iQr8sPeKOJp_yw`
# Step 4.3
    Go to Mod Header and in the left field write "Authorization" and in the right one your token
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzA1ODIyYzMzMzdmMGQzOTNlN2QyZiIsImlhdCI6MTY0MDAwNDU3N30.muF3HKb_4An1cL3gimryFy9GXRR3np-NNsJ-bF8lEYk" and press start.
# Step 4.4
    After that got to localhost:3000 and you should see the entier app.


## Using the app

### Scaping
    You should see a field called "Instagram Username", write the username of an instagram user and press "SCRAP"
    This should take a couple of seconds, and it should appear down.
    If in any case is not working check the server to not be down or change the ig user sometimes the html changes, or maybe my dummy user is not loggin in from the first try.

### Searching
    If you would like to search your db for some certain scraped users you should use the "Search Database by name".

Oh, and also if you click the user profile inside the app it should take you to his profile.

If you have any questions I am here to help you.

Thanks and enjoy, hope you guys enjoy it as much as I did developing it.