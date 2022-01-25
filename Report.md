<br />
<p align="center">
  <h1 align="center">Team 13 Report</h1>
  <p align="center">
      The construction process for our deployable web app with front and back-end to
        view the available rental properties in the Netherlands. <br/> <br/>
        Mohammad Al Shakoush (s4274865), Dominic Therattil (s4228952),<br/>
        Tudor Dragan (s4394887), Mohammed Nacer Lazrak (s4335473)
  </p>
</p>
 

## Milestone 1 - API Design
For the development of our API specification we had some trouble in the beginning. This was mainly in trying to understand the OpenAPI syntax. However, once this was overcomed we progressed quickly. We also spent quite a lot of time comping up with the design for the URLs and how they are going to interact. The ones that posed the biggest problem were the endpoints that in the end we decided to merge into one big one. We wanted to offer the user the best experience so we also spent some time on decinding extra functionality and endpoints we would implement. These are listed below:
<ul>
  <li> The main one is the one that returns all the properties in the database. This way the user can navigate through the pagination we implemented.</li>
  <li>The other extra is adding a lot of different search parameters for the endpoint we merged. This way the user can select a lot of different search parameters so he can find the room that fits him best.</li>
</ul>
 
## Milestone 2 - API Implementation
The processes that led to the development of our backend was initially quite challenging and somewhat daunting. This is because we had a great deal of freedom in deciding between what framework to utilize to implement our API endpoints. This led to a lack of direction and had us in standstill since we didn’t know how to actually start.
 
Initially, we planned on using Java since we were all familiar with this language however we were all keen on expanding our skills, this led us down the path of choosing between Django or Flask. After lots of debate we decided to use the Django Framework. This is because Django uses the “Batteries included” philosophy providing almost everything the developers will want out of the box.
 
For example, by default configuration Django uses SQLite which provides us an easy to set-up and fast database connection. Furthermore, Django supports a plethora of plugins most notably the RESTful API plugin, this enables us to quickly serialize the API GET, PUT and POST requests into JSON format for the app's frontend needs.
 
All in all, Django is simple to use and structured, enabling us to focus more time developing instead of re-inventing the wheel.
 
## Milestone 3 - User Interface Implementation
We started by using Django templates to display our data on the frontend although, we quickly found out that the functionalities were slightly limited and there were fewer resources online to aid in debugging.
 
Therefore, we decided to switch to React, we found that React is more scalable coupled with the fact that processing is done on the client side, this made for reduced server side workload and easier code deployment, which was especially useful during collaborative working sessions.
 
## Final Delivery & Evaluation
We find our deployable app to be stable and achieve all the desired functionality expected from the assignment description. Along with additional functionality such as; utilising OpenStreetMap to view the properties geographically, an additional view all properties endpoint with pagination support, a more refined preference endpoint that gives the user more choices when searching for properties and the ability to directly edit a properties parameters.
 
All in all we are extremely satisfied with our final product and proud of all the skills we were able to learn over the duration of this project.
 
## Work Distribution
 
The work distribution was pretty equal. We mostly met up and worked together on the project. We made all the decisions together, specially deciding on the languages/frameworks to use. Everybody did their best to make the best project possible.
