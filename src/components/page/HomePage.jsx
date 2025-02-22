import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showNavbar, setShowNavbar] = useState(true);
  const sectionsRef = useRef({});

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // 50% of the section must be visible to trigger the intersection
      }
    );

    Object.values(sectionsRef.current).forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top ${
          showNavbar ? "navbar-visible" : "navbar-hidden"
        }`}
      >
        <div className="container">
          <a className="navbar-brand" href="#">
            PHEUNG PHYA
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {["home", "about", "projects", "contact"].map((item) => (
                <li className="nav-item" key={item}>
                  <a
                    className={`nav-link ${
                      activeSection === item ? "active underline" : ""
                    }`}
                    href={`#${item}`}
                    onClick={() => setActiveSection(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <section
        id="home"
        ref={(el) => (sectionsRef.current.home = el)}
        className="row bg-secondary text-white text-center p-5 mt-5"
      >
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="../images/cover.jpg"
            className="img-fluid rounded-circle d-block"
            alt="Profile Pic"
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6  d-flex flex-column justify-content-center bg-dark rounded-5">
          <h1 className="text-start px-3">Welcome to My Portfolio</h1>
          <p className="text-start px-3 font-4">
            I'm a Phnom Penh-based Web Developer. Nowadays, working as a
            programming instructor teaching C, C++, HTML, CSS, Bootstrap,
            JavaScript, jQuery, PHP, MySQL, AJAX, and Laravel.
          </p>
          <a
            href="/path-to-your-cv.pdf"
            download
            className="btn btn-secondary w-25 mt-5"
          >
            Download My CV
          </a>
        </div>
      </section>

      <section
        id="about"
        ref={(el) => (sectionsRef.current.about = el)}
        className="container-fluid row p-5 border bg-secondary m-0"
      >
        <div className="col-12 text-center text-white">
          <h2>
            <strong>About Myself</strong>
          </h2>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="../images/profile.jpg"
            className="img-fluid rounded-circle"
            alt="Profile Pic"
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center bg-dark rounded-3 pb-3">
          <h2 className="text-center mb-3 text-white">About Me</h2>
          <p className="text-center text-white">
            Hi! I'm <strong>PHEUNG PHYA</strong>, a passionate full-stack web
            developer based in Phnom Penh. I specialize in designing and
            developing modern, responsive websites and applications.
          </p>
          <ul className="list-group list-group-flush rounded-3">
            <li className="list-group-item bg-dark text-white">
              🎓 <strong>Education:</strong> 3rd-year Computer Science student
              at Royal University of Phnom Penh.
            </li>
            <li className="list-group-item  text-dark">
              💻 <strong>Programming Skills:</strong> C, C++, HTML, CSS,
              Bootstrap, JavaScript, jQuery, PHP, MySQL, AJAX, Laravel, and
              Flutter.
            </li>
            <li className="list-group-item  text-dark">
              📌 <strong>Experience:</strong> Currently a programming instructor
              teaching web and software development.
            </li>
            <li className="list-group-item  text-dark">
              🏆 <strong>Achievements:</strong> Built multiple web and mobile
              applications, and collaborated on various projects.
            </li>
          </ul>
        </div>
      </section>

      <section
        id="projects"
        ref={(el) => (sectionsRef.current.projects = el)}
        className="container my-5"
      >
        <h2 className="text-center">Projects</h2>
        <div className="row">
          {[1, 2, 3, 4].map((num) => (
            <div className="col-md-3" key={num}>
              <div className="card">
                <img
                  src="../images/mobile.png"
                  className="card-img-top"
                  alt={`Project ${num}`}
                />
                <div className="card-body">
                  <h5 className="card-title">Project {num}</h5>
                  <p className="card-text">
                    This is a brief description of project {num}. It showcases
                    my skills in web development, using various technologies to
                    build functional and responsive web applications. This
                    project involves front-end and back-end integration with
                    dynamic data handling.
                  </p>
                  <a href="#" className="btn btn-primary">
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        ref={(el) => (sectionsRef.current.contact = el)}
        className="container-fluid  row m-0 bg-secondary m-auto pb-5"
      >
        <h2 className="text-center col-12 text-white">Contact Me</h2>
        <div className="col-md-6">
          <form className="w-75 mx-auto">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send
            </button>
          </form>
        </div>
        <div className="col-md-6 d-flex flex-column  align-items-start">
          <div className="w-75  mx-auto">
            <div className="mb-3">
              <h4>Address</h4>
              <p>
                <b>PHEUNG PHYA </b>
                <br />
                Phnom Penh, Cambodia
              </p>
            </div>
            <div className="mb-3">
              <h4>Phone Number</h4>
              <p>+855 88 68 53 732</p>
            </div>
            <div className="mb-3 ">
              <h4>Email</h4>
              <p>phyapheung@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3 ">
        <p>
          &copy; {new Date().getFullYear()} PHEUNG PHYA. All Rights Reserved.
        </p>
      </footer>

      <style>
        {`
          .underline {
            border-bottom: 3px solid white;
          }
          .navbar-visible {
            transform: translateY(0);
            opacity: 1;
            transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
          }
          .navbar-hidden {
            transform: translateY(-100%);
            opacity: 0;
            transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};
export default HomePage;

// import React, { useState, useEffect, useRef } from "react";
// import "tailwindcss/tailwind.css";

// const HomePage = () => {
//   const [activeSection, setActiveSection] = useState("home");
//   const [showNavbar, setShowNavbar] = useState(true);
//   const sectionsRef = useRef({});

//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       if (window.scrollY < lastScrollY) {
//         setShowNavbar(true);
//       } else {
//         setShowNavbar(false);
//       }
//       lastScrollY = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id);
//           }
//         });
//       },
//       {
//         threshold: 0.5, // 50% of the section must be visible to trigger the intersection
//       }
//     );

//     Object.values(sectionsRef.current).forEach((section) => {
//       observer.observe(section);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div>
//       <nav
//         className={`fixed top-0 left-0 w-full bg-black text-white transition-all duration-300 ${
//           showNavbar
//             ? "transform translate-y-0 opacity-100"
//             : "transform -translate-y-full opacity-0"
//         }`}
//       >
//         <div className="container mx-auto px-4 py-2 flex justify-between items-center">
//           <a className="text-2xl font-bold" href="#">
//             PHEUNG PHYA
//           </a>
//           <button
//             className="text-white"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="ml-auto flex space-x-6">
//             {["home", "about", "projects", "contact"].map((item) => (
//               <a
//                 key={item}
//                 href={`#${item}`}
//                 className={`text-white ${
//                   activeSection === item ? "border-b-4 border-white" : ""
//                 }`}
//                 onClick={() => setActiveSection(item)}
//               >
//                 {item.charAt(0).toUpperCase() + item.slice(1)}
//               </a>
//             ))}
//           </div>
//         </div>
//       </nav>

//       <section
//         id="home"
//         ref={(el) => (sectionsRef.current.home = el)}
//         className="flex flex-col md:flex-row bg-gray-700 text-white p-10 mt-20"
//       >
//         <div className="flex justify-center items-center mb-5 md:mb-0 md:w-1/2">
//           <img
//             src="../images/cover.jpg"
//             alt="Profile Pic"
//             className="w-72 h-72 rounded-full object-cover"
//           />
//         </div>
//         <div className="flex flex-col justify-center bg-black text-white p-6 rounded-lg md:w-1/2">
//           <h1 className="text-3xl">Welcome to My Portfolio</h1>
//           <p className="mt-3 text-lg">
//             I'm a Phnom Penh-based Web Developer. Nowadays, working as a
//             programming instructor teaching C, C++, HTML, CSS, Bootstrap,
//             JavaScript, jQuery, PHP, MySQL, AJAX, and Laravel.
//           </p>
//           <a
//             href="/path-to-your-cv.pdf"
//             download
//             className="mt-5 py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-500"
//           >
//             Download My CV
//           </a>
//         </div>
//       </section>

//       <section
//         id="about"
//         ref={(el) => (sectionsRef.current.about = el)}
//         className="container mx-auto p-10 border bg-gray-700 text-white"
//       >
//         <h2 className="text-center text-3xl mb-8">
//           <strong>About Myself</strong>
//         </h2>
//         <div className="flex flex-col md:flex-row">
//           <div className="flex justify-center items-center mb-5 md:mb-0 md:w-1/2">
//             <img
//               src="../images/profile.jpg"
//               alt="Profile Pic"
//               className="w-72 h-72 rounded-full object-cover"
//             />
//           </div>
//           <div className="flex flex-col justify-center bg-black p-6 rounded-lg text-center md:w-1/2">
//             <h2 className="text-xl mb-4">About Me</h2>
//             <p>
//               Hi! I'm <strong>PHEUNG PHYA</strong>, a passionate full-stack web
//               developer based in Phnom Penh. I specialize in designing and
//               developing modern, responsive websites and applications.
//             </p>
//             <ul className="list-none mt-4">
//               <li className="mb-2">
//                 🎓 <strong>Education:</strong> 3rd-year Computer Science student
//                 at Royal University of Phnom Penh.
//               </li>
//               <li className="mb-2">
//                 💻 <strong>Programming Skills:</strong> C, C++, HTML, CSS,
//                 Bootstrap, JavaScript, jQuery, PHP, MySQL, AJAX, Laravel, and
//                 Flutter.
//               </li>
//               <li className="mb-2">
//                 📌 <strong>Experience:</strong> Currently a programming
//                 instructor teaching web and software development.
//               </li>
//               <li className="mb-2">
//                 🏆 <strong>Achievements:</strong> Built multiple web and mobile
//                 applications, and collaborated on various projects.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </section>

// //       <section
// //         id="projects"
// //         ref={(el) => (sectionsRef.current.projects = el)}
// //         className="container my-10"
// //       >
// //         <h2 className="text-center text-3xl mb-8">Projects</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //           {[1, 2, 3, 4].map((num) => (
// //             <div className="card shadow-lg" key={num}>
// //               <img
// //                 src="../images/mobile.png"
// //                 alt={`Project ${num}`}
// //                 className="w-full rounded-t-lg"
// //               />
// //               <div className="p-6">
// //                 <h5 className="text-xl">Project {num}</h5>
// //                 <p className="text-gray-700 mt-4">
// //                   This is a brief description of project {num}. It showcases my
// //                   skills in web development, using various technologies to build
// //                   functional and responsive web applications.
// //                 </p>
// //                 <a
// //                   href="#"
// //                   className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
// //                 >
// //                   View Project
// //                 </a>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       <section
// //         id="contact"
// //         ref={(el) => (sectionsRef.current.contact = el)}
// //         className="container mx-auto bg-gray-700 text-white py-10"
// //       >
// //         <h2 className="text-center text-3xl mb-8">Contact Me</h2>
// //         <div className="flex flex-col md:flex-row">
// //           <div className="md:w-1/2 mx-auto">
// //             <form className="w-full">
// //               <div className="mb-4">
// //                 <label className="block">Name</label>
// //                 <input
// //                   type="text"
// //                   className="w-full p-3 rounded-lg bg-white text-black"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block">Email</label>
// //                 <input
// //                   type="email"
// //                   className="w-full p-3 rounded-lg bg-white text-black"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block">Message</label>
// //                 <textarea
// //                   className="w-full p-3 rounded-lg bg-white text-black"
// //                   rows="4"
// //                 ></textarea>
// //               </div>
// //               <button
// //                 type="submit"
// //                 className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
// //               >
// //                 Send
// //               </button>
// //             </form>
// //           </div>
// //           <div className="md:w-1/2 mx-auto mt-10 md:mt-0">
// //             <h4>Address</h4>
// //             <p>PHEUNG PHYA</p>
// //             <p>Phnom Penh, Cambodia</p>
// //             <h4 className="mt-4">Phone Number</h4>
// //             <p>+855 88 68 53 732</p>
// //             <h4 className="mt-4">Email</h4>
// //             <p>phyapheung@gmail.com</p>
// //           </div>
// //         </div>
// //       </section>

// //       <footer className="bg-black text-white text-center py-3 mt-10">
// //         <p>
// //           &copy; {new Date().getFullYear()} PHEUNG PHYA. All Rights Reserved.
// //         </p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default HomePage;
