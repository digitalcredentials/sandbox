// Element inserted at root of React DOM
// Makes sure page is scrolled to an anchor if one is specified in hash
// From https://stackoverflow.com/a/59128204

import { useEffect } from "react"; 
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash} = useLocation();
    useEffect(() => {
      // Check if there is a hash and if an element with that id exists
      const el = hash && document.getElementById(hash.substr(1))
      if (el) {    
          el.scrollIntoView()
      }
  }, [hash]) // Fires every time hash changes

  return null;
}