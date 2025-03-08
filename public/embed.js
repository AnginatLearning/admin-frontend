(function () {
    var instituteDomain = window.location.hostname; // Get current institute domain
  
    // Create an iframe
    var iframe = document.createElement("iframe");
    iframe.src = `https://dashboard.yourdomain.com/?origin=${instituteDomain}`; // Pass origin
    iframe.style.position = "fixed";
    iframe.style.bottom = "0";
    iframe.style.right = "0";
    iframe.style.width = "100%";  // Full width
    iframe.style.height = "100vh"; // Full height
    iframe.style.border = "none";
    iframe.style.zIndex = "99999";
    
    // Append iframe to body
    document.body.appendChild(iframe);
  })();
  