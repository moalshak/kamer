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
 

## **Milestone 1 - API Design**
For the development of our API specification we had some trouble in the beginning. This was mainly in trying to understand the OpenAPI syntax. However, once we overcame this we progressed quickly. We also spent quite a lot of time comping up with the design for the URLs and how they are going to interact. The ones that posed the biggest problem were the endpoints that in the end we decided to merge into one big one. We wanted to offer the user the best experience so we also spent some time on decinding extra functionality and endpoints we would implement. These are listed below:
<ul>
  <li> The main one is the one that returns all the properties in the database. This way the user can navigate through the pagination we implemented.</li>
  <li>The other extra is adding a lot of different search parameters for the endpoint we merged. This way the user can select a lot of different search parameters so he can find the room that fits him best.</li>
</ul>

### **Learnings:**
<ul>
  <li>How to use OpenAPI specification to model a RESTful API.</li>
  <li>URL design and semantics</li>
  <li>Content negotiation</li>
</ul>
 
## **Milestone 2 - API Implementation**
The processes that led to the development of our backend was initially quite challenging and seemed very daunting. This is because we had a great deal of freedom in deciding between what framework to utilize to implement our API endpoints. This led to a lack of direction and had us in standstill since we didn’t know how to actually start. Processing the data was also quite difficult but fortunately we wrote a script in python that tood the jsson dataset and turned it an SQL database. The script is available in the projects <code>script</code> folder.
 
Initially, we planned on using Java since we were all familiar with this language however we were all keen on expanding our skills, this led us down the path of choosing between Django or Flask. After lots of debate we decided to use the Django Framework. This is because Django uses the “Batteries included” philosophy providing almost everything the developers will want out of the box. Our freedom of development would have been restricted by Flask which is labled as a microframework.
 
For example, by default configuration Django uses SQLite which provides us an easy to set-up and fast database connection. Furthermore, Django supports a plethora of plugins most notably the RESTful API plugin, this enables us to quickly serialize the API GET, PUT and POST requests into JSON format for the app's frontend needs. It also offers libraries for converting responses to CSV which meant we did not have to implement our own.
 
All in all, Django is quite complex but very well structured and comes packed with a lot of functionality out of the box, enabling us to focus more time developing instead of re-inventing the wheel. Even though the learning curve was steep in the beginning, it was more than worth it for the knowledge we aquired.

### **Learnings:**
<ul>
  <li>How to implement a RESTful API</li>
  <li>Back-end framework options</li>
  <li>API testing through Postman</li>
</ul>
 
## **Milestone 3 - User Interface Implementation**
We started by using Django templates to display our data on the frontend although, we quickly found out that the functionalities were limited and there were fewer resources online to aid in debugging. 
 
Therefore, we decided to switch to React, we found that React is more scalable coupled with the fact that processing is done on the client side, this made for reduced server side workload and easier code deployment, which was especially useful during collaborative working sessions. React is used for creating responsice SPAs and this is how envisioned our website.

During the timeframe of this milestone we also decided to learn how to host our application using a third party provider.
We aquired a domain name and a cloud server (addmitedly quite limited with only 1GB or RAM memory and 1 core) and went through all the neccesary steps to set it up: **(the scene is urs Mo)**

### **Learnings:**
<ul>
  <li>How to deploy our web application using cloud hosting</li>
  <li>How to use ReactJs library</li>
  <li>HTML & CSS</li>
  <li>JavaScript</li>
  <li>How to implement a SPA</li>
</ul>
 
## **Final Delivery & Evaluation**
We find our deployable app to be stable and achieve all the desired functionality expected from the assignment description. Along with additional functionality such as; utilising OpenStreetMap to view the properties geographically, an additional view all properties endpoint with pagination support, a more refined preference endpoint that gives the user more choices when searching for properties and the ability to directly edit a properties parameters.
 
All in all we are extremely satisfied with our final product and proud of all the skills we were able to learn over the duration of this project.

## **Main Architectural Decisions**
The first descisions we had to make were centered around the design of the API and its endpoints and for this we used the REST API design steps shown in the lectures. Through this iterative process we were able to design our endpoints conforming to industry standards such that experienced web developers could easly understand them and take advantage of our API.

The central decision that we had to make was the overall structure of our project. We decided to go with MVC as it provides the easiest implementation and allows us to strich to the DRY principle the easiest. To this end we implemented the application using Django which implements the MCV pattern (it is known as MTV in the Django ecosystem). The <code>views.py</code> class acts as the controler of our application while the <code>models.py</code> class contains the models we are working with. We decided to not use the templates provided by Django (see Milstone 3) and instead implement the view as a ReactJS frontend.
 
## Work Distribution
 
The work distribution was pretty equal. We mostly met up and worked together on the project. We made all the decisions together, specially deciding on the languages/frameworks to use. Everybody did their best to make the best project possible.
