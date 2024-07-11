import express from "express"
import bodyParser from "body-parser"
import fs from "fs"

let title = ""
let blog = ""
let preview = ""


const PORT = 3000
const app = express()

//middlewares
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(bodyParser.json());


app.get("/", (req, res)=>{
    res.render("index.ejs")
})


app.post("/new", (req, res)=>{
    res.render("new.ejs")
})


app.post("/blog", (req, res)=>{
    const currentDate = new Date();

const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
const currentYear = currentDate.getFullYear();

const addedTime = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
    title = req.body["title"]
    console.log(title)
    blog = req.body["blog"]
    preview = req.body["preview"]
    let blogData={
        title:title, 
        blog:blog
        ,preview:preview, time:addedTime
    }

    fs.readFile('public/blogs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        let blogs = [];
        if (data) {
            blogs = JSON.parse(data);
        }

        blogs.push(blogData);

        fs.writeFile('public/blogs.json', JSON.stringify(blogs, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Internal Server Error');
            }

            res.render('blog.ejs', { btitle: title, bblog: blog });
        });
    });
    // res.render('blog.ejs', { btitle: title, bblog: blog });

})


app.get('/blog/:title', (req, res) => {
    // console.log("it is I")
    const title = req.params.title;
    //  console.log(req.originalUrl)
    fs.readFile('public/blogs.json', 'utf8', (err, data) => {

        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        let blogs = [];
        if (data) {
            blogs = JSON.parse(data);
        }

        blog = blogs.find(b => b.title === title);

        if (!blog) {
            console.log(title)
            return res.status(404).send('Blog not found');
        }

        // return blog;
        res.render("blog.ejs", { btitle: title,bblog: blog.blog  });

       
    });
    
});

app.get("/edit/:title", (req, res)=>{
     const title = req.params.title;
    console.log(title)
    console.log(`Received request to edit blog with title: ${title}`);

   
    fs.readFile('public/blogs.json', 'utf8', (err, data) => {

        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        let blogs = [];
        if (data) {
            blogs = JSON.parse(data);
        }

        blog = blogs.find(b => b.title === title);

        if (!blog) {
            console.log(title)
            res.render("index.ejs")
        }

        // return blog;

       res.render("edit.ejs", { title: title,blog: blog.blog  });
    });
    
})

app.post("/edit/:title", (req, res)=>{
    const title = req.params.title;
    let n_title = req.body["title"]
    let new_blog = req.body["blog"]
   
    fs.readFile('public/blogs.json', 'utf8',(err, data)=>{
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Internal Server Error");
          }

          const blogs = JSON.parse(data);

          const existingBlogIndex = blogs.findIndex((blog) => blog.title === title); // assume title is unique
      
          if (existingBlogIndex !== -1) {
            blogs[existingBlogIndex].title = n_title;
            blogs[existingBlogIndex].blog = new_blog
          } else {
            blogs.push({ title: n_title, blog: new_blog });
          }


          fs.writeFile("public/blogs.json", JSON.stringify(blogs, null, 2), (err) => {
            if (err) {
              console.error("Error writing file:", err);
              return res.status(500).send("Internal Server Error");
            }
    
        res.render("edit.ejs",  { title: n_title, blog: new_blog})
    })

   
})
})

app.post("/blog/:title", (req, res) => {
    const title = req.params.title; // Extract title from route parameters
    console.log(title)
    fs.readFile('public/blogs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        let blogs = [];
        if (data) {
            blogs = JSON.parse(data);
        }

        const updatedBlogs = blogs.filter(b => b.title !== title);

        fs.writeFile('public/blogs.json', JSON.stringify(updatedBlogs, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Internal Server Error');
            }
            
        });
    });
    
    res.redirect("/")
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error(`Server error: ${error.message}`);
    }
});