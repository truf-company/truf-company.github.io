// Get all sections that have an ID defined
window.addEventListener('load', () => {
  const getScrollOffset = (() => {
    if (window.scrollY) return () => window.scrollY;
    if (window.pageYOffset) return () => window.pageYOffset;
    return () => 0;
  })();
  const forEachHeaders = (callback) => {
    const headers = document.querySelectorAll(".blog-section>h1, .blog-section>h2, .blog-section>h3, .blog-section>h4, .blog-section>h5");
    for (let index = headers.length - 1; index >= 0; index --) {
      callback(headers[index], index < headers.length - 1 ? headers[index + 1] : null, index);
    }
  }

  const highlightTableOfContents = () => {
    const scrollY = getScrollOffset();
    const scrollBottom = scrollY + (window.innerHeight * 0.3);

    let marker = false;
    forEachHeaders((currentHeader, nextHeader) => {
      const currentTop = currentHeader.offsetTop;
      const nextTop = nextHeader ? nextHeader.offsetTop : currentTop + window.innerHeight;

      const headerId = currentHeader.getAttribute("id");
      if (!headerId) return;
      const currentNavItem = document.querySelector(".sidebar-navigation a[href*=" + headerId + "]");
      if (!currentNavItem) return;
      if (!marker && nextTop > scrollY && currentTop < scrollBottom) {
        currentNavItem.classList.add("active-sidelink");
        marker = true;
      } else {
        currentNavItem.classList.remove("active-sidelink");
      }
    });
  };
  highlightTableOfContents();

  document.addEventListener('scroll', highlightTableOfContents);
});
