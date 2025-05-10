document.addEventListener('DOMContentLoaded', function () {
    // Number of posts per page
    const postsPerPage = 3;
  
    // Get all blog posts
    const posts = document.querySelectorAll('.blog-post');
  
    // Calculate total pages
    const totalPages = Math.ceil(posts.length / postsPerPage);
  
    // Get pagination container
    const pagination = document.getElementById('pagination');
  
    // Initialize current page
    let currentPage = 1;
  
    // Function to display the correct posts based on the page number
    function displayPosts(page) {
      // Hide all posts initially
      posts.forEach((post, index) => {
        post.style.display = 'none';
      });
  
      // Calculate which posts to show for the current page
      const start = (page - 1) * postsPerPage;
      const end = start + postsPerPage;
  
      for (let i = start; i < end; i++) {
        if (posts[i]) {
          posts[i].style.display = 'block';
        }
      }
    }
  
    // Function to generate pagination links
    function generatePagination() {
      // Remove existing pagination numbers
      const paginationNumbers = document.querySelectorAll('.pagination-number');
      paginationNumbers.forEach((number) => number.remove());
  
      // Add page numbers dynamically
      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.classList.add('pagination-number');
        a.textContent = i;
        li.appendChild(a);
        pagination.insertBefore(li, pagination.querySelector('.next'));
  
        // Set active page class
        if (i === currentPage) {
          a.classList.add('active');
        }
  
        // Add event listener for page click
        a.addEventListener('click', function (e) {
          e.preventDefault();
          currentPage = i;
          displayPosts(currentPage);
          updateActivePage();
        });
      }
    }
  
    // Function to update active page number
    function updateActivePage() {
      const pageNumbers = document.querySelectorAll('.pagination-number');
      pageNumbers.forEach((number) => number.classList.remove('active'));
      pageNumbers[currentPage - 1].classList.add('active');
    }
  
    // Event listeners for previous and next buttons
    pagination.querySelector('.prev').addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        displayPosts(currentPage);
        updateActivePage();
      }
    });
  
    pagination.querySelector('.next').addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        displayPosts(currentPage);
        updateActivePage();
      }
    });
  
    // Initial display
    displayPosts(currentPage);
    generatePagination();
  });
  