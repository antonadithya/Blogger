import ejs from "ejs"
import express  from "express"
import bodyParser from "body-parser"
import path from "path";
import multer from "multer";
import { Console } from "console";
import compression from "compression"
import etag from "etag";


const app = express()
const port = process.env.PORT || 3000;

app.use(compression());
app.set('view cache', true);
app.set("etag", etag);


const BloggerPost = [


  {
  Title:"What is Visual ChatGPT?",
  content:`Visual ChatGPT is a new model that combines ChatGPT with VFMs like Transformers, ControlNet, and Stable Diffusion. In essence, the AI model acts as a bridge between users, allowing them to communicate via chat and generate visuals.
  ChatGPT is currently limited to writing a description for use with Stable Diffusion, DALL-E, or Midjourney; it cannot process or generate images on its own. Yet with the Visual ChatGPT model, the system could generate an image, modify it, crop out unwanted elements, and do much more.

ChatGPT has attracted interdisciplinary interest for its remarkable conversational competency and reasoning abilities across numerous sectors, resulting in an excellent choice for a language interface.

It’s linguistic training, however, prohibits it from processing or generating images from the visual environment. Meanwhile, models with visual foundations, such as Visual Transformers or Steady Diffusion, demonstrate impressive visual comprehension and producing abilities when given tasks with one-round fixed inputs and outputs. A new model, like Visual ChatGPT, can be created by combining these two models.`,
 Img :"/chatgpt.png",
 Author: "Adithya",
 tag: "#ChatGPT",
 Badge : "AI",
 date:"2023-06-30"

  },
{
  Title : "What is React ?",
  content:`
  React is a popular JavaScript library for building user interfaces, particularly for single-page applications where the content is dynamically updated as the user interacts with the application. It was developed and is maintained by Facebook.

Here's a beginner-friendly description:

React helps developers create interactive and dynamic user interfaces for web applications. Imagine a website where you can click buttons, fill out forms, and see changes on the page without having to refresh it – that's the kind of experience React enables.

React works by breaking down the user interface into reusable components. These components are like building blocks that you can put together to create the structure of your application. Each component can have its own state, which determines how it looks and behaves, and can be updated in response to user actions.

One of the key features of React is its virtual DOM (Document Object Model). Instead of directly manipulating the browser's DOM, React creates a virtual representation of it in memory. When there's a change, React compares the virtual DOM with the real DOM and only updates the parts that need to change. This makes React applications fast and efficient.

React is often used in conjunction with other tools and libraries, such as Redux for state management and React Router for handling navigation. It's a powerful and flexible library that has gained widespread adoption in the web development community.
   
  `,
Img :"/react.jpg",
Author: "Adithya",
tag: "#React",
Badge : "Codding Tip",
date:"2023-06-20"
},

{
  Title:"Understanding EJS for Beginners",
  content:`If you're just stepping into the world of web development, you might have heard of various tools and technologies that help bring dynamic content to websites. One such tool that's worth exploring, especially for beginners, is EJS or Embedded JavaScript.

What is EJS?
EJS is a simple templating language that lets you embed JavaScript code directly within your HTML markup. Think of it as a way to inject dynamic content into your static web pages. This can be incredibly useful when you want to create dynamic websites without writing extensive JavaScript code.`,
  Img:"/ejs.png",
  Author: "kevin",
  tag:"#JavaScript",
  Badge:"Web Develop",
  date:"2023-05-16"
},
{
  Title:"Why to Use Node.js For Backend ?",
  content:`JavaScript is the universal language for building web applications. It is used in frontend (client-side) and backend (server-side) development as well. But the truth that the beauty of the front-end relies on the back-end can’t be denied. This is when NodeJS comes into the picture. NodeJS is the best choice for server-side application development due to its vast and versatile features. Popular companies like Uber, PayPal, Netflix, Walmart, Twitter, LinkedIn, and even NASA use NodeJS for their server-side development. 
  
  So, what is NodeJS? NodeJS is an event-driven JavaScript runtime built on Chrome’s V8 engine that is used to build traditional and scalable server-side web applications and back-end APIs (Application Program Interfaces). It was developed by Ryan Dahl in 2009, who was inspired by Gmail for having push capability and building real-time applications. Approximately, 36.42% of developers use NodeJS for its libraries, tools, and frameworks. It is open-source and follows a “Single-Threaded” runtime environment. Single-Threaded refers to handling multiple clients simultaneously.
  `,
  Img:"/nodenew.png",
  Author: "sathya",
  tag:"#JavaScript",
  Badge:"Web Develop",
  date:"2023-09-16"
}

]

app.set("view engine", "ejs");
app.use(express.static("public"))
// app.use(express.static("public/images"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/"); // specify the directory for storing images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original name of the file
  },
})

const upload = multer({ storage: storage });



//-------------Routes---------------------------------------------------------------------

app.get( "/" ,(req ,res ) => {

  res.render("Home.ejs",{ BloggerPost: BloggerPost})
})


app.get("/Create",(req ,res) =>{

  res.render("CreatePost.ejs")
});


app.post("/Create", upload.single("Img"), (req, res) => {

  const { Title, content, Author, tag ,Badge} = req.body;
  const Img = req.file ? `/${req.file.originalname}` : ''; // handle the uploaded image

let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

const date = year + "-" + month + "-" + day;

  BloggerPost.push({ Title, content, Img, Author, tag ,Badge,date});
  res.redirect("/");
  
});

app.get("/blogs/:id" , (req, res) =>{
  const {id} = req.params
  const post = BloggerPost[id]
  
  res.render("ReadPost.ejs",{post,id})
});


app.get("/edit/:id" , (req, res) =>{
  const {id} = req.params;
  const post = BloggerPost[id];
  
  res.render("EditPost.ejs", {post, id} )
});



app.post("/edited/:id", upload.single("Img"), (req, res) => {
  const { id } = req.params;
  const { Title, content, Author, tag, Badge } = req.body;

  // Find the post by id
  const existingPost = BloggerPost.find((post, index) => index.toString() === id);

  if (existingPost) {
    // Update the existing post with new values
    existingPost.Title = Title;
    existingPost.content = content;
    existingPost.Author = Author;
    existingPost.tag = tag;
    existingPost.Badge = Badge;

    // Check if a new image file is uploaded
    if (req.file) {
      existingPost.Img = `/${req.file.originalname}`;
    }

    console.log(existingPost); // Log the updated post to the console

    res.redirect("/");
  } else {
    // Handle error - Post not found
    res.status(404).send("Post not found");
  }
});


// Route to handle the form submission for Deleting a blog post
app.post("/delete/:id",(req,res)=>{
  const {id }= req.params

  BloggerPost.splice(id, 1)

  res.redirect("/");
})


app.listen(port ,() =>  {console.log (`sever is running ${port}`)});