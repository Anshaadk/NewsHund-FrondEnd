import User_Footer from "../components/user_side/Footer/User_Footer";
import User_body from "../components/user_side/body/User_body";
import User_Navbar from "../components/user_side/navbar/User_NavBar";




const Home = () => {
    return(
        <div> 
            
            
           <User_Navbar/>  
            <User_body/>
            <br />        
            <User_Footer/>

     </div>  
  )
}

export default Home;