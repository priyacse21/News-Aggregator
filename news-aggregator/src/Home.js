import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import AuthContext
import './Home.css'; // Import CSS file for styling

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext); // Access isAuthenticated state from AuthContext

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to News Aggregator</h1>
        {!isAuthenticated ? (
          <div>
            <p>Please login to access news</p>
            <Link to="/login" className="home-button">Login</Link>
          </div>
        ) : (
          <p>You are logged in. Navigate to <Link to="/news">News</Link></p>
        )}
      </div>
    </div>
  );
};

export default Home;

































// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from './AuthContext'; // Import AuthContext

// const Home = () => {
//   const { isAuthenticated } = useContext(AuthContext); // Access isAuthenticated state from AuthContext

//   return (
//     <div className="home-container">
//       <h1>Welcome to News Aggregator</h1>
//       {!isAuthenticated ? (
//         <div>
//           <p>Please login to access news</p>
//           <Link to="/login" className="home-button">Login</Link>
//         </div>
//       ) : (
//         <p>You are logged in. Navigate to <Link to="/news">News</Link></p>
//       )}
//     </div>
//   );
// };

// export default Home;
