window.onload = (event) => {
    console.log('page is fully loaded');
    
  var size = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  console.log(size);
  var pageDiv = document.getElementById("pageDiv");
  pageDiv.style.height.setAttribute("height",size.height);
  pageDiv.style.height.setAttribute("width",size.width);
  };


