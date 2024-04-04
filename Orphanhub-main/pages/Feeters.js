import React from "react";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

const Feeters = () => {
  return (
    <footer>
      <section className="donation-box">
        <h3>Support Us</h3>
        <div className="logos" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="orphanage_logo.png" alt="OrphanageHub Logo"style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
          <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>OrphanHub</h1>
          <div className="statement"style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>"Transforming Lives, One Click at a Time:<br />
              OrphanHub, Impacting Futures."</p>
          </div>
        </div>

        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Your contribution can make a difference in the lives of these children. Help us create a better future for them.</p>
        <div className="social-icons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <a href="https://www.instagram.com/orphanhub" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    <FaInstagram size={50} style={{ color: "#bc2a8d" }} />
    <p>Orphanhub</p>
  </a>
  <a href="mailto:info@orphanhub.com" style={{ textDecoration: 'none'  }}>
    <FaEnvelope size={50} style={{ color: "#fff" }} />
    <p style={{ color:"#fff"  }}>info@orphanhub.com</p>
  </a>
</div>

      </section>

      <div style={{ color: "#666", textAlign: "center", bottom: '10px' }}>
        © 2024 OrphanHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Feeters;
