import {React , useState ,useEffect} from "react";
import "../style/navStyle.css";
import { Link } from "react-router-dom";
import { useSpring , animated} from 'react-spring';

const Nav = () => {

  const [isLoad, setisLoad] = useState(false);
  
  const props = useSpring({ to: {opacity : 1} , from:{opacity:0}  , delay:500 , config:{ duration : 1000} });

  useEffect(() => {

    console.log("dad")
    setTimeout(()=>{
      console.log("loading")
      setisLoad(true);
    },100)


  }, [isLoad]);



  return (

    <animated.div style={props}>


<div className= "navbar-container">
    <nav className="navbar">
                       <ul>
                       <Link to="/">Home</Link>
                         <Link to="/createemployee">Create New Employee</Link>
                      <Link to="/showemployee">Display All Employee</Link>
                       </ul>
                     </nav>
                 </div>

    </animated.div>


    // <Spring>
    //   {
    //     (props) => (
    //       <div style={props}>
    //         <div className= "navbar-container">
    //                 <nav className="navbar">
    //                   <ul>
    //                     <Link to="/">Home</Link>
    //                     <Link to="/createemployee">Create New Employee</Link>
    //                     <Link to="/showemployee">Display All Employee</Link>
    //                   </ul>
    //                 </nav>
    //               </div>
    //       </div>
        
    //     )
    //   }
  
    // </Spring>

  );
};

export default Nav;
