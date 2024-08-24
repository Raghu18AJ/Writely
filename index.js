// Todo Usual init
import express from "express";
import bodyParser  from "body-parser";
const app = express();
const port = 3000;

// Data Center
let posts = [];


// Post Constructor
function Post(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

// Add Post
function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}

// Delete Post
function deletePost(index) {
    posts.splice(index, 1);
}
// Edit Post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

// Midleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


// Todo All paths

// Home
app.get("/", (req, res) => {
    res.render("home.ejs", {posts: posts});
});

// View Post
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

// Delete Post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

// Update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

// Create Post Page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Save Post
app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});


// Todo Listen thing
app.listen(port, () => {
    addPost("5 Tips for Effective Time Management in a Digital World", "Managing time effectively in today’s digital age can be challenging with constant distractions from notifications, emails, and social media. To regain control and boost productivity, start by prioritizing your tasks, focusing on the most important ones first. Implement time-blocking to dedicate specific periods to individual tasks, reducing the urge to multitask. Leverage technology to stay organized, using apps that help you manage your time more efficiently. By following these tips, you can make the most of your day and achieve your goals.")
    addPost("The Rise of Sustainable Fashion: What You Need to Know", "Sustainable fashion is transforming the industry by promoting environmentally friendly and socially responsible clothing practices. Unlike fast fashion, which often harms the environment, sustainable fashion focuses on reducing waste and using eco-friendly materials. Brands leading this movement are adopting practices such as recycling and ethical labor standards. As a consumer, you can contribute by choosing quality over quantity, opting for eco-friendly fabrics, and supporting brands that prioritize sustainability. By making mindful choices, you can help drive positive change in the fashion world.")
    console.log(`Breaking News: Our app is all ears at Port ${port}, ready to boogie to the sweet sounds of data! 🎵🕺😄`)
})



