import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Family Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;