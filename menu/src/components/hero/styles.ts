export const heroStyles = {
    heroContainer: {
        width: "100%",
        //height: "900px", // Ensure a proper height is set
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", // Ensure it's positioned properly
        backgroundColor: "#000",
        
    },
    paper: {
      display: "flex",
      //backgroundImage: "url('http://localhost:3001/assets/hero-bg.png')",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      height: "300px",
      gap: "2rem",
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
      color: "#FFF",
      // borderRadius: "10px",
      // border: "1px solid #D68240",
    },
    box:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "left",
      gap: "1rem",

    },
    welcome:{
      fontSize: "2rem",
      //fontWeight: "bold",
      color: "#FFF",
      position: "absolute",
      top: "100px",
      left: "50px",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#FFF",
    },
    description: {
      fontSize: "1.2rem",
      color: "#c3c3c3",
    },
    img: {
      width: "250px",
      height: "auto",
      borderRadius: "8px",
    },
    
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      },
      paginationDot: {
        width: 12,
        height: 12,
        borderRadius: "50%",
        margin: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      },
  };
  