<h1 align='center' style='font-weight: bold'> Groggo Needs Coffee </h1>
<p align='center'> Groggo, like many software engineers, needs coffee before performing tasks. Unfortunately, he's out of coffee at home and needs your help. This application provides an interface for you to create maps that include Groggo's home, the coffee shop, and any obstacles you'd like to place in between. When you click 'Find Path', the application will translate your unique map to a weighted graph with 2,000+ nodes and 15,000+ edges and use Dijkstra's algorithm to display Groggo's shortest path to coffee along with a heat map so you can visualize relative travel times to any part of your map.</p>
</br>
</br>
</p>

</div>

<h1 align='center' style='font-weight: bold'> Index </h1>
<br>
<div align='center' style='font-weight: bold'>
  <a href='https://groggo-needs-coffee.herokuapp.com'>Live Site</a> - <a href='https://github.com/CameronWhiteside/Groggo-Needs-Coffee/wiki/Feature-List'>Feature List</a> - <a href='https://github.com/CameronWhiteside/Groggo-Needs-Coffee/wiki/Database-Schema'>DB Schema</a> - <a href='https://github.com/CameronWhiteside/Groggo-Needs-Coffee/wiki/API-Documentation'>API Documentation</a> - <a href='https://github.com/CameronWhiteside/Groggo-Needs-Coffee/wiki/Frontend-Routes'> Frontend Routes </a>
<br>
</br>
</div>
<div align='center'>
<h1 align='center' style='font-weight: bold'>Technologies Used </h1>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=20/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=20/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=20/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=20/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=20/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=20/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=20/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=20/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=20/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=20/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=20/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=20/>
</div>
<br>
</br>

<h1 align='center' style='font-weight: bold'>Launching Locally </h1>

<h2 style='font-weight: bold'>Prerequisites </h2>
- <a href='(https://www.python.org/downloads/'> Python 3.10 </a><br/>
- <a href='https://www.postgresql.org/docs/12/index.html'> PostgreSQL 12s </a>

<br/>
<h2  style='font-weight: bold'>Getting Started </h2>

1. Clone the project repository

    * ```https://github.com/CameronWhiteside/Groggo-Needs-Coffee.git```

2. Install Python dependencies from the root directory

    * ``` pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt ```

3. Install Node package dependencies from the react-app directory

    * ```npm install```

3. Create a .env file base on the .env.example given in the root directory

```
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=<you strong secret key>
DATABASE_URL=postgresql://<username>:<password>@<server>/<database>

```

4. Setup your username and database based on what you setup in your .env

5. Migrate and seed the database by intiating the pipenv shell from the root directory.

    * ```pipenv shell```
    * ```flask db upgrade```
    * ```flask seed all```

6. Start the server from the root directory.

    * ```flask run```


7. Start the frontend from the react-app directory.

    * ```npm start```


<br/><br/>
<h1 align='center' style='font-weight: bold'>Site Preview</h1>

<br/><h4 align='left' style='font-weight: bold'>
New users can register for an account by entering a unique email address, a username, and a password.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/HpH1rbS/sign-up.gif" alt="Registration Demo" width="500" />
<br/>
<br/>
</div>

<br/><h4 align='left' style='font-weight: bold'>
Existing users can log in to their account by submitting their credentials via the login form.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/TR48406/login-1.gif" alt="Log-in" width="500"/>
<br/>
<br/>
</div>
<br/><h4 align='left' style='font-weight: bold'>
Logged in users can end their session by clicking the log out button.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/rdkGS3B/logout-1.gif" alt="Log-in"  width="500" />
<br/>
<br/>
</div>


<br/><h4 align='left' style='font-weight: bold'>
Users may log in with an pre-existing demo user account by clicking the link on the login page.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/Wffnh3z/demo-login-1.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>


<br/><h4 align='left' style='font-weight: bold'>
If a user has any previously saved maps, they can load them by clicking the 'Load Maps' button.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/LPzVz7k/load-map.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>


<br/><h4 align='left' style='font-weight: bold'>
Users can create a new map, which will auto-save to their account, and provide a blank grid with the start and stop placed in their default positions.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/LRxt2MT/create-a-new-map.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>


<br/><h4 align='left' style='font-weight: bold'>
Users can add water by clicking and dragging, which will destroy any edges to adjacent nodes.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/WkLGBjn/water-animation.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>

<br/><h4 align='left' style='font-weight: bold'>
Users can add forest by clicking and dragging, which will increase the edge weight by 20% to all adjacent nodes..
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/47kgWzZ/forest-animation.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>

<br/><h4 align='left' style='font-weight: bold'>
Users can add roads, which join non-adjacent nodes with and edge weighted to 20% of their Euclidian distance.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/YPB45S0/street-animation.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>


<br/><h4 align='left' style='font-weight: bold'>
Users can edit any features by entering edit mode, and clicking and dragging the points that appear on the corners to their new location.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/gZKr71n/edit-mode.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>


<br/><h4 align='left' style='font-weight: bold'>
Users can delete individual features by entering delete mode and clicking on the feature
they wish to deltee.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/vqwG5JB/delete-individual.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>

<br/><h4 align='left' style='font-weight: bold'>
Users can clear their map by clicking the 'Clear All Features' button. All optional features will be removed and required features will be reset to their default locations.

</h4>

<div  >
<br/>
<img src="https://i.ibb.co/bKqyQh8/clear-features.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>


<br/><h4 align='left' style='font-weight: bold'>
Users can delete any maps they've created by clicking the 'Delete Map' button and confirming on the popup.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/DVSmzwr/delete-map.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>
</div>



<br/><h4 align='left' style='font-weight: bold'>
Users can edit the start and stop location by dragging the features in edit mode,
or by selecting the feature from the control panel, and clicking on the screen.

</h4>

<div  >
<br/>
<img src="https://i.ibb.co/2k30HcJ/edit-start-stop-1.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>




<br/><h4 align='left' style='font-weight: bold'>
Users can initiate the pathfinding algorithm to search for the shortest route between Groggo's home and the coffee shop by clicking the 'Find Path' button.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/fSLW98Q/feature-combination.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>

<br/><h4 align='left' style='font-weight: bold'>
Simulations can be reset and re-run by clicking the 'Reset' button, selecting a tool from the control panel.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/DV4Dw3h/reset-simulation.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>



<br/><h4 align='left' style='font-weight: bold'>
Once a simulation has been run, a heat map can be toggled to display the relative time it takes from the starting node to all other nodes visited by Dijkstra's algorithm.
</h4>

<div  >
<br/>
<img src="https://i.ibb.co/d2mkBP0/heat-map.gif" alt="Demo User"  width="500"   />
<br/>
<br/>
</div>
