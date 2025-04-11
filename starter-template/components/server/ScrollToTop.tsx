// app/components/ScrollToTop.tsx (server component)
const ScrollToTop = () => {
    return (
      <>
        <button
          id="scrollToTopBtn"
          className="hidden fixed bottom-8 right-8 bg-octa-base-100 bg-opacity-10 hover:bg-opacity-20 transition-all text-octa-base-100 cursor-pointer rounded-full w-12 h-12 flex justify-center items-center z-50"
          aria-label="Scroll to top"
        >
          <span className="text-xl">↑</span>
        </button>
  
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                const btn = document.getElementById("scrollToTopBtn");
                if (!btn) return;
                window.addEventListener("scroll", () => {
                  if (window.pageYOffset > 300) {
                    btn.classList.remove("hidden");
                  } else {
                    btn.classList.add("hidden");
                  }
                });
  
                btn.addEventListener("click", () => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                });
              })();
            `,
          }}
        />
      </>
    );
  };
  
  export default ScrollToTop;
  