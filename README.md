<<<<<<< HEAD
# SMART WASTE BIN


## Web Development

Web development is the work involved in developing a Web site for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development.

Among Web professionals, &quot;Web development&quot; usually refers to the main non-design aspects of building Web sites: writing markup and coding. Web development may use content management systems (CMS) to make content changes easier and available with basic technical skills.

## Programming Languages Used

The programming Language used in creating the Smart Bin web application are HTML, CSS and JavaScript. JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.

Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. Over 97% of websites use it client-side for web page behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on the user&#39;s device.

As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).

(Wikipedia 2021)

## Web Technologies Used

1. **React** (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality. (Wikipedia 2021)

1. **Node.js** is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user&#39;s web browser. Consequently, Node.js represents a &quot;JavaScript everywhere&quot; paradigm, unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.

1. **Socket.IO** is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers. It has two parts: a client-side library that runs in the browser, and a server-side library for Node.js. Both components have a nearly identical API. Like Node.js, it is event-driven. Socket.IO primarily uses the WebSocket protocol with polling as a fallback option, while providing the same interface. Although it can be used as simply a wrapper for WebSocket, it provides many more features, including broadcasting to multiple sockets, storing data associated with each client, and asynchronous I/O.

1. **MongoDB** is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server-Side Public License (SSPL).

## Development Environment

- **Ubuntu Linux**

Ubuntu is a Linux distribution based on Debian and composed mostly of free and open-source software. Ubuntu is officially released in three editions: Desktop, Server, and Core for Internet of things devices and robots. All the editions can run on the computer alone, or in a virtual machine. Ubuntu is a popular operating system for cloud computing, with support for OpenStack. Ubuntu&#39;s default desktop has been GNOME, since version 17.10. Ubuntu is developed by Canonical, and a community of other developers, under a meritocratic governance model (Wikipedia, 2021).

- **Visual Studio Code**

Visual Studio Code is a source-code editor developed by Microsoft for Windows, Linux and macOS. It includes support for debugging, embedded Git control and GitHub, syntax highlighting, intelligent code completion, snippets, and code refactoring. It is highly customizable, allowing users to change the theme, keyboard shortcuts, preferences, and install extensions that add additional functionality. The source code is free and open source and released under the permissive MIT License. The compiled binaries are freeware and free for private or commercial use (Wikipedia, 2021).

- **Postman**

Postman is the world&#39;s leading collaboration platform for API development. Postman&#39;s features simplify each step of building an API and streamline collaboration to help create better APIs—faster. More than 15 million developers and 500,000 organizations worldwide use Postman today.

## Program Structure

The Smart Bin Application is essentially made up of three blocks. A **frontend** user application, a backend socket server and a database. The frontend application built with React.Js holds the UI components which the end user interacts with. Here, the user sees the state of the bin: The level of dirt in it and a notification to signify presence of foul odour. The user also has the ability to change his credentials in the settings tab of the app.

The **backend** server built with Node.Js comprises an HTTP server which handles all data request from the hardware device, and a Socket server which sends the updated state of the waste bin to the frontend interface in realtime. The task performed by this server is broken down into three major parts. It:

- Sends data and serves the UI component to the user.
- Receives data from the Waste Bin through HTTP calls.
- Connects to the database and stores all recorded state of the waste bin.

The **database** system used here is MongoDB, a NoSQL database which stores all received data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time. It is connected directly to the Node.Js server and is used to save the level of dirt as received from the sensor and a two-state variable representing the presence or absence of foul odour. MongoDB is used because of its simple data structuring mechanism and the ease with which data can be stored and retrieved.

The diagram below shows how the three blocks that make up the system are connected.



**Link to Code**

[**odeyNicholas/smart-bin: IoT Project of a smart waste bin to detect volume of dirt and presence of foul smell in the waste bin]

